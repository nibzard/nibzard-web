/**
 * Newsletter helper tests: signed unsubscribe tokens must bind to one
 * address, and nothing else may verify.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

process.env.RESEND_API_KEY = 'test-secret-for-newsletter-tests';

const { isValidEmail, unsubscribeSignature, verifyUnsubscribeSignature } = await import(
  '../src/lib/newsletter.ts'
);

test('a signature for an address verifies for that address', () => {
  const sig = unsubscribeSignature('reader@example.com');
  assert.equal(verifyUnsubscribeSignature('reader@example.com', sig), true);
});

test('signatures canonicalize the address', () => {
  const sig = unsubscribeSignature('Reader@Example.com');
  assert.equal(verifyUnsubscribeSignature('reader@example.com', sig), true);
});

test('a signature for one address does not verify for another', () => {
  const sig = unsubscribeSignature('reader@example.com');
  assert.equal(verifyUnsubscribeSignature('victim@example.com', sig), false);
});

test('tampered, malformed, or missing signatures do not verify', () => {
  const sig = unsubscribeSignature('reader@example.com');
  const tampered = sig.slice(0, -1) + (sig.endsWith('0') ? '1' : '0');
  assert.equal(verifyUnsubscribeSignature('reader@example.com', tampered), false);
  assert.equal(verifyUnsubscribeSignature('reader@example.com', 'not-hex'), false);
  assert.equal(verifyUnsubscribeSignature('reader@example.com', ''), false);
});

test('email validation rejects garbage', () => {
  assert.equal(isValidEmail('reader@example.com'), true);
  assert.equal(isValidEmail('not-an-email'), false);
  assert.equal(isValidEmail('a b@example.com'), false);
  assert.equal(isValidEmail(''), false);
});
