// Run after pnpm run build: verify deployment artifacts, not just source config.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const output = new URL('../.vercel/output/', import.meta.url);
const read = path => readFileSync(new URL(path, output), 'utf8');

test('both legacy article variants reach their handler without capturing the archive', () => {
  const { routes } = JSON.parse(read('config.json'));
  const route = routes.find(route => route.src?.startsWith('^/log/') && route.dest === '_render');
  assert.ok(route, 'Missing legacy redirect handler route');
  for (const slug of ['ssh-tunnel-cloudflare', 'agentic-handbook', 'claude-zhipu']) {
    for (const suffix of ['', '/']) {
      const path = `/log/${slug}${suffix}`;
      assert.ok(new RegExp(route.src).test(path), `Missing handler for ${path}`);
    }
  }
  for (const path of ['/log', '/log/']) {
    assert.equal(new RegExp(route.src).test(path), false);
  }
});

test('sitemap index discovers published articles on the serving hostname', () => {
  assert.ok(read('static/sitemap-index.xml').includes('https://www.nibzard.com/sitemap-articles.xml'));
  const xml = read('static/sitemap-articles.xml');
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  assert.equal(urls.length, new Set(urls).size);
  assert.ok(urls.length > 50);
  assert.ok(urls.every(url => url.startsWith('https://www.nibzard.com/')));
  for (const slug of ['claude-code', 'agentic-handbook', 'claude-zhipu']) {
    assert.ok(urls.includes(`https://www.nibzard.com/${slug}`));
  }
  for (const slug of ['claude', 'proxmox-farm', 'durable-researcher']) {
    assert.ok(!urls.includes(`https://www.nibzard.com/${slug}`), `Excluded content leaked: ${slug}`);
  }
  assert.ok(!read('static/sitemap-0.xml').includes('https://nibzard.com'));
  assert.ok(read('static/robots.txt').includes('https://www.nibzard.com/sitemap-index.xml'));
});

test('prerendered page canonical uses the serving hostname', () => {
  const html = read('static/about/index.html');
  assert.match(html, /rel="canonical" href="https:\/\/www\.nibzard\.com\/about\/?"/);
});
