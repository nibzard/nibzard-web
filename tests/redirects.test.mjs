// Set SEO_TEST_URL to a running dev or preview server to verify HTTP behavior.
import test from 'node:test';
import assert from 'node:assert/strict';

const base = process.env.SEO_TEST_URL;
test('legacy redirects preserve the archive and query string', { skip: !base }, async () => {
  for (const slug of ['ssh-tunnel-cloudflare', 'agentic-handbook', 'claude-zhipu']) {
    for (const suffix of ['', '/']) {
      const response = await fetch(`${base}/log/${slug}${suffix}?ref=test`, { redirect: 'manual' });
      assert.equal(response.status, 301);
      assert.equal(response.headers.get('location'), `/${slug}?ref=test`);
    }
  }
  for (const path of ['/log', '/log/']) {
    const response = await fetch(`${base}${path}`, { redirect: 'manual' });
    assert.equal(response.status, 200);
  }
});
