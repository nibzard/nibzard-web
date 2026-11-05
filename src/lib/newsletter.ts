/**
 * Newsletter helpers: email validation and HMAC-signed unsubscribe tokens.
 * The signature binds an unsubscribe link to one address so a bare email
 * can never remove someone from the audience.
 */
import { createHmac, timingSafeEqual } from 'node:crypto';

const astroEnv = (import.meta as any).env ?? {};
const secret: string | undefined =
  astroEnv.UNSUBSCRIBE_SECRET ||
  process.env.UNSUBSCRIBE_SECRET ||
  astroEnv.RESEND_API_KEY ||
  process.env.RESEND_API_KEY;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return typeof email === 'string' && email.length <= 254 && EMAIL_PATTERN.test(email);
}

export function canonicalEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function unsubscribeSignature(email: string): string {
  return createHmac('sha256', String(secret)).update(canonicalEmail(email)).digest('hex');
}

export function verifyUnsubscribeSignature(email: string, signature: string): boolean {
  if (!secret || typeof signature !== 'string' || signature.length === 0) {
    return false;
  }
  const expected = Buffer.from(unsubscribeSignature(email), 'hex');
  let provided: Buffer;
  try {
    provided = Buffer.from(signature, 'hex');
  } catch {
    return false;
  }
  if (provided.length !== expected.length) {
    return false;
  }
  return timingSafeEqual(expected, provided);
}
