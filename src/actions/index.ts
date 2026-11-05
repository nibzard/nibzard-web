import { ActionError, defineAction } from 'astro:actions';
import { Resend } from 'resend';
import { canonicalEmail, isValidEmail, verifyUnsubscribeSignature } from '../lib/newsletter';

// Only initialize Resend if API key is available
const resend = import.meta.env.RESEND_API_KEY
  ? new Resend(import.meta.env.RESEND_API_KEY)
  : null;

const AUDIENCE_ID = import.meta.env.RESEND_AUDIENCE_ID || '4f9f7e57-e4dd-43da-b661-1cfbe3d0e5b4';

export const server = {
  unsubscribe: defineAction({
    accept: 'form',
    handler: async (formData) => {
      if (
        !formData ||
        typeof formData.get('email') !== 'string' ||
        typeof formData.get('sig') !== 'string'
      ) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: 'Email and signature are required for unsubscribe.',
        });
      }

      const email = canonicalEmail(formData.get('email') as string);
      const sig = formData.get('sig') as string;

      if (!isValidEmail(email) || !verifyUnsubscribeSignature(email, sig)) {
        throw new ActionError({
          code: 'FORBIDDEN',
          message:
            'This unsubscribe link is not valid. Use the unsubscribe link from a newsletter email.',
        });
      }

      // Check if Resend is configured
      if (!resend) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Newsletter service is not configured.',
        });
      }

      try {
        // First, find the contact by email to get their ID
        const { data: contacts, error: findError } = await resend.contacts.list({
          audienceId: AUDIENCE_ID,
        });

        if (findError) {
          console.error('Resend API Error (find contact):', findError);
          throw new ActionError({
            code: 'BAD_REQUEST',
            message: findError.message || 'Failed to find contact.',
          });
        }

        const contact = contacts?.data.find((c) => c.email === email);

        if (!contact || !contact.id) {
          // Return a generic response so the endpoint cannot be used to probe
          // which addresses are subscribed.
          return { success: true, message: 'Unsubscribe request processed.' };
        }

        const { data, error } = await resend.contacts.update({
          id: contact.id,
          unsubscribed: true,
          audienceId: AUDIENCE_ID,
        });

        if (error) {
          console.error('Resend API Error (unsubscribe):', error);
          throw new ActionError({
            code: 'BAD_REQUEST',
            message: error.message || 'Failed to unsubscribe.',
          });
        }

        return { success: true, data };
      } catch (e: any) {
        if (e instanceof ActionError) {
          throw e;
        }
        console.error('Error in unsubscribe action:', e);
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: e.message || 'An unexpected error occurred during unsubscribe.',
        });
      }
    },
  }),
};
