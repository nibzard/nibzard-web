export const prerender = false;

import { Resend } from 'resend';
import type { APIContext } from 'astro';

const resendApiKey = import.meta.env.RESEND_API_KEY;
if (!resendApiKey) {
  console.error('Resend API key is not configured.');
  // Potentially throw an error or handle it, depending on desired behavior at startup
}
const resend = new Resend(resendApiKey!);

export async function POST({ request }: APIContext) {
  try {
    const { email, firstName, lastName } = await request.json();
    if (!email) {
      return new Response(JSON.stringify({ success: false, error: 'Email is required.' }), { status: 400 });
    }
    const audienceId = import.meta.env.RESEND_AUDIENCE_ID;
    if (!audienceId) {
      console.error('Resend Audience ID is not configured.');
      return new Response(JSON.stringify({ success: false, error: 'Audience ID is not configured.' }), { status: 500 });
    }
    const result = await resend.contacts.create({
      email,
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      unsubscribed: false,
      audienceId,
    });
    return new Response(JSON.stringify({ success: true, result }), { status: 200 });
  } catch (error: unknown) {
    let message = 'Unknown error';
    if (error && typeof error === 'object' && 'message' in error && typeof (error as any).message === 'string') {
      message = (error as any).message;
    }
    console.error('Error in subscribe API:', message, error); // Added more detailed logging
    return new Response(JSON.stringify({ success: false, error: message }), { status: 500 });
  }
}