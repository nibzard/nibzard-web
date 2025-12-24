import { ActionError, defineAction } from 'astro:actions';
import { Resend } from 'resend';

// Only initialize Resend if API key is available
const resend = import.meta.env.RESEND_API_KEY
  ? new Resend(import.meta.env.RESEND_API_KEY)
  : null;

// Define a type for the expected form data
interface SubscribeFormData {
  email: string;
}

export const server = {
  subscribe: defineAction({
    accept: 'form',
    handler: async (formData) => {
      // Validate form data (basic example)
      if (!formData || typeof formData.get('email') !== 'string') {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: 'Email is required.',
        });
      }

      const email = formData.get('email') as string;

      // Check if Resend is configured
      if (!resend) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Newsletter service is not configured.',
        });
      }

      try {
        const { data, error } = await resend.contacts.create({
          email: email,
          // You can add firstName, lastName if you collect them
          // firstName: 'Steve',
          // lastName: 'Wozniak',
          unsubscribed: false,
          audienceId: '4f9f7e57-e4dd-43da-b661-1cfbe3d0e5b4', // IMPORTANT: Replace with your actual Audience ID
        });

        if (error) {
          console.error('Resend API Error:', error);
          throw new ActionError({
            code: 'BAD_REQUEST',
            message: error.message || 'Failed to subscribe.',
          });
        }

        // Optionally, send a confirmation email
        await resend.emails.send({
          from: 'Niko <wave@nibzard.com>', // Replace with your verified sender
          to: [email],
          subject: 'Subscription Confirmation',
          html: '<h1>Thanks for subscribing!</h1><p>You will receive updates from us soon.</p><p><a href="https://nibzard.com/unsubscribe">Unsubscribe</a></p>', // Add unsubscribe link
        });

        return { success: true, data };
      } catch (e: any) {
        console.error('Error in subscribe action:', e);
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: e.message || 'An unexpected error occurred.',
        });
      }
    },
  }),
  unsubscribe: defineAction({
    accept: 'form', // Or 'json' if you prefer to send data differently from the unsubscribe page
    handler: async (formData) => {
      if (!formData || typeof formData.get('email') !== 'string') {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: 'Email is required for unsubscribe.',
        });
      }
      const email = formData.get('email') as string;

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
          audienceId: '4f9f7e57-e4dd-43da-b661-1cfbe3d0e5b4', // Use the same audience ID
        });

        if (findError) {
          console.error('Resend API Error (find contact):', findError);
          throw new ActionError({
            code: 'BAD_REQUEST',
            message: findError.message || 'Failed to find contact.',
          });
        }

        const contact = contacts?.data.find(c => c.email === email);

        if (!contact || !contact.id) {
          // It's good practice not to reveal if an email exists or not for privacy reasons
          // So, we can return a generic success-like message or a specific one if preferred.
          // For now, let's indicate the email was not found in this audience for debugging,
          // but in production, you might want to handle this more gracefully.
          // throw new ActionError({
          //   code: 'NOT_FOUND',
          //   message: 'Email not found in our records.',
          // });
          // Alternatively, just return success as if unsubscribed to prevent address fishing
          console.warn(`Unsubscribe attempt for non-existent email: ${email}`);
          return { success: true, message: 'Unsubscribe request processed.' };
        }

        const { data, error } = await resend.contacts.update({
          id: contact.id,
          unsubscribed: true,
          audienceId: '4f9f7e57-e4dd-43da-b661-1cfbe3d0e5b4', // Audience ID is required for update too
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
        console.error('Error in unsubscribe action:', e);
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: e.message || 'An unexpected error occurred during unsubscribe.',
        });
      }
    },
  }),
};