export const prerender = false;

import { Resend } from 'resend';
import type { APIContext } from 'astro';
import { canonicalEmail, isValidEmail, unsubscribeSignature } from '../../lib/newsletter';

const resendApiKey = import.meta.env.RESEND_API_KEY;
if (!resendApiKey) {
  console.error('Resend API key is not configured.');
}
const resend = new Resend(resendApiKey!);

const SITE_URL = import.meta.env.SITE_URL || 'https://nibzard.com';

export async function POST({ request }: APIContext) {
  try {
    const body = await request.json();
    const email = canonicalEmail(String(body?.email ?? ''));
    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ success: false, error: 'A valid email is required.' }), { status: 400 });
    }
    const audienceId = import.meta.env.RESEND_AUDIENCE_ID;
    if (!audienceId) {
      console.error('Resend Audience ID is not configured.');
      return new Response(JSON.stringify({ success: false, error: 'Audience ID is not configured.' }), { status: 500 });
    }
    const result = await resend.contacts.create({
      email,
      firstName: body?.firstName || undefined,
      lastName: body?.lastName || undefined,
      unsubscribed: false,
      audienceId,
    });
    if (result.error) {
      console.error('Resend API Error:', result.error);
      return new Response(JSON.stringify({ success: false, error: result.error.message || 'Failed to subscribe.' }), { status: 400 });
    }

    // One confirmation email to the subscribing address, carrying the signed
    // unsubscribe link that the unsubscribe action verifies.
    const sig = unsubscribeSignature(email);
    const unsubscribeUrl = `${SITE_URL}/unsubscribe?email=${encodeURIComponent(email)}&sig=${sig}`;
    try {
      await resend.emails.send({
        from: 'Niko <wave@nibzard.com>',
        to: [email],
        subject: 'Subscription Confirmation',
        html: `<h1>Thanks for subscribing!</h1><p>You will receive updates from us soon.</p><p><a href="${unsubscribeUrl}">Unsubscribe</a></p>`,
      });
    } catch (sendError) {
      // The contact exists; a failed confirmation email must not surface a
      // confusing error, but it is logged because that address cannot
      // unsubscribe without the signed link.
      console.error('Confirmation email failed for new subscriber:', sendError);
    }

    return new Response(JSON.stringify({ success: true, result }), { status: 200 });
  } catch (error: unknown) {
    let message = 'Unknown error';
    if (error && typeof error === 'object' && 'message' in error && typeof (error as any).message === 'string') {
      message = (error as any).message;
    }
    console.error('Error in subscribe API:', message, error);
    return new Response(JSON.stringify({ success: false, error: message }), { status: 500 });
  }
}
