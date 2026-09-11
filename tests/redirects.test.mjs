// ABOUTME: Verifies /log/:slug permanently redirects to /:slug in Astro config
// ABOUTME: Guards against duplicate-content URLs for log articles returning
import test from 'node:test';
import assert from 'node:assert/strict';
import config from '../astro.config.mjs';

test('/log/:slug permanently redirects to /:slug', () => {
  assert.equal(config.redirects?.['/log/:slug'], '/:slug');
});

test('/log index route is not redirected', () => {
  assert.equal(config.redirects?.['/log'], undefined);
  assert.equal(config.redirects?.['/log/'], undefined);
});
