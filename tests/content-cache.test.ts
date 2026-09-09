import assert from 'node:assert/strict';
import test from 'node:test';
import { applyContentCache } from '../src/utils/content-cache';

test('HTML and Markdown declare every format-selection input and cache only on Vercel', () => {
  for (const type of ['text/html', 'text/markdown; charset=utf-8']) {
    const response = new Response('public content', { headers: { 'Content-Type': type, Vary: 'Accept-Encoding' } });
    applyContentCache(new Request('https://nibzard.com/article'), response, true);
    assert.deepEqual(new Set(response.headers.get('Vary')!.split(', ')), new Set(['accept-encoding', 'accept', 'user-agent', 'sec-fetch-dest']));
    assert.equal(response.headers.get('Vercel-CDN-Cache-Control'), 'public, s-maxage=3600');
    assert.equal(response.headers.get('CDN-Cache-Control'), 'no-store');
    assert.equal(response.headers.get('Cache-Control'), 'public, max-age=0, must-revalidate');
  }
});

test('raw Markdown does not add format negotiation variants', () => {
  const response = new Response('markdown', { headers: { 'Content-Type': 'text/markdown', Vary: 'Accept-Encoding' } });
  applyContentCache(new Request('https://nibzard.com/api/raw/article'), response, false);
  assert.equal(response.headers.get('Vary'), 'accept-encoding');
  assert.equal(response.headers.get('Vercel-CDN-Cache-Control'), 'public, s-maxage=3600');
});

test('HTML without an existing Vary and legacy Markdown use an identical variation policy', () => {
  const html = new Response('html', { headers: { 'Content-Type': 'text/html' } });
  const markdown = new Response('markdown', { headers: { 'Content-Type': 'text/markdown', Vary: 'Accept, Accept-Encoding' } });
  const request = new Request('https://nibzard.com/article');
  applyContentCache(request, html, true);
  applyContentCache(request, markdown, true);
  assert.equal(html.headers.get('Vary'), markdown.headers.get('Vary'));
  assert.equal(html.headers.get('Vary'), 'accept, accept-encoding, sec-fetch-dest, user-agent');
});

test('image and other non-content responses retain their existing cache policy', () => {
  const response = new Response('image', { headers: { 'Content-Type': 'image/webp', 'Cache-Control': 'public, max-age=86400' } });
  const originalHeaders = Array.from(response.headers);
  applyContentCache(new Request('https://nibzard.com/_image'), response, true);
  assert.deepEqual(Array.from(response.headers), originalHeaders);
});

test('errors, private responses, authenticated requests and mutations are never made cacheable', () => {
  const cases: [RequestInit, ResponseInit][] = [
    [{ method: 'POST' }, {}],
    [{ headers: { Authorization: 'Bearer test' } }, {}],
    [{ headers: { Range: 'bytes=0-5' } }, {}],
    [{}, { status: 404 }],
    [{}, { status: 500 }],
    [{}, { headers: { 'Set-Cookie': 'session=test' } }],
    [{}, { headers: { 'Cache-Control': 'private, max-age=60' } }],
    [{}, { headers: { 'CDN-Cache-Control': 'no-store' } }],
    [{}, { headers: { 'Vercel-CDN-Cache-Control': 'no-cache' } }],
    [{}, { headers: { Vary: '*' } }],
  ];
  for (const [requestInit, responseInit] of cases) {
    const headers = new Headers(responseInit.headers);
    headers.set('Content-Type', 'text/html');
    const response = new Response('content', { ...responseInit, headers });
    applyContentCache(new Request('https://nibzard.com/article', requestInit), response, true);
    assert.equal(response.headers.get('Vercel-CDN-Cache-Control'), 'no-store');
    assert.equal(response.headers.get('Cache-Control'), 'private, no-store');
  }
});
