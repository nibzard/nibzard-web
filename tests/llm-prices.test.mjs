import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, copyFile, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { gzipSync } from 'node:zlib';
import {
  DEFAULT_USAGE, MODEL_CACHE_READ, MODEL_INPUT, MODEL_KEY, MODEL_OUTPUT, MODEL_TIERED,
  calculateCost, derivePopular, fetchPrices, formatUSD, parseCalculatorState,
  buildCalculatorSearch, normalizeUpstream, rankModels, validateSnapshot,
} from '../scripts/lib/llm-prices.mjs';

const provider = (id, models, name = id) => ({ id, name, models });
const model = (id, prices, context_window) => ({ id, prices, ...(context_window ? { context_window } : {}) });
const response = (body, status = 200) => ({ ok: status === 200, status, json: async () => body });
const upstream = (...providers) => normalizeUpstream(providers);

test('normalization keeps chat models with full pricing and maps tuples', () => {
  const snapshot = upstream(
    provider('anthropic', [
      model('claude-sonnet-4-5', { input_mtok: 3, output_mtok: 15, cache_read_mtok: 0.3 }, 200000),
      model('partial', { input_mtok: 3 }),
      model('audio-only', { input_audio_mtok: 1 }),
    ], 'Anthropic'),
    provider('unnamed-provider', [model('x', { input_mtok: 1, output_mtok: 2 })]),
  );
  assert.equal(snapshot.modelCount, 2);
  assert.deepEqual(snapshot.providers, [['anthropic', 'Anthropic'], ['unnamed-provider', 'unnamed-provider']]);
  const claude = snapshot.models.find(entry => entry[MODEL_KEY] === 'anthropic:claude-sonnet-4-5');
  assert.deepEqual(claude, ['anthropic:claude-sonnet-4-5', 3, 15, 0.3, 200000, 0]);
  const bare = snapshot.models.find(entry => entry[MODEL_KEY] === 'unnamed-provider:x');
  assert.equal(bare[MODEL_CACHE_READ], null);
  assert.equal(bare[4], null);
  assert.equal(bare[MODEL_TIERED], 0);
});

test('list-style prices mark tiers and store above-threshold prices', () => {
  const snapshot = upstream(provider('google', [model('gemini-big', [{
    prices: { input_mtok: { base: 1.25, tiers: [{ start: 200000, price: 2.5 }] }, output_mtok: { base: 10, tiers: [{ start: 200000, price: 15 }] }, cache_read_mtok: 0.31 },
  }])]));
  const gemini = snapshot.models[0];
  assert.equal(gemini[MODEL_INPUT], 1.25);
  assert.equal(gemini[MODEL_OUTPUT], 10);
  assert.equal(gemini[MODEL_TIERED], 1);
  assert.deepEqual(snapshot.tiers['google:gemini-big'], [[200000, 2.5, 15]]);
});

test('keys stay unique across providers and survive slash-containing ids', () => {
  const snapshot = upstream(
    provider('openrouter', [model('anthropic/claude-sonnet-4.5:batch', { input_mtok: 3, output_mtok: 15 })]),
    provider('anthropic', [model('claude-sonnet-4.5', { input_mtok: 3, output_mtok: 15 })]),
  );
  assert.deepEqual(snapshot.models.map(entry => entry[MODEL_KEY]), ['anthropic:claude-sonnet-4.5', 'openrouter:anthropic/claude-sonnet-4.5:batch']);
  assert.throws(() => validateSnapshot({ ...snapshot, models: [...snapshot.models, snapshot.models[0]], modelCount: 3 }), /Invalid model key/);
});

test('snapshot validation rejects malformed data', () => {
  const good = upstream(provider('p', [model('m', { input_mtok: 1, output_mtok: 2 })]));
  assert.throws(() => validateSnapshot({ ...good, version: 2 }), /Invalid LLM price snapshot/);
  assert.throws(() => validateSnapshot({ ...good, fetchedAt: 'yesterday' }), /fetchedAt/);
  assert.throws(() => validateSnapshot({ ...good, modelCount: 5 }), /modelCount/);
  assert.throws(() => validateSnapshot({ ...good, models: [['ghost:m', 1, 2, null, null, 0]] }), /Invalid model key/);
  assert.throws(() => validateSnapshot({ ...good, models: [['p:m', -1, 2, null, null, 0]] }), /Invalid price/);
  assert.throws(() => validateSnapshot({ ...good, models: [['p:m', 1, 2, null, null, 1]], tiers: {} }), /Missing tiers/);
  assert.throws(() => validateSnapshot({ ...good, tiers: { 'ghost:m': [[100, 1, 1]] } }), /Invalid tier entry/);
});

test('fetch failures reject and success normalizes upstream data', async () => {
  await assert.rejects(fetchPrices({ fetchImpl: async () => response({}, 503) }), /HTTP 503/);
  await assert.rejects(fetchPrices({ fetchImpl: async () => { throw new Error('Network unavailable'); } }), /Network unavailable/);
  await assert.rejects(fetchPrices({ fetchImpl: async () => ({ ok: true, status: 200, json: async () => { throw new Error('Bad JSON'); } }) }), /Bad JSON/);
  const fetched = await fetchPrices({ fetchImpl: async () => response([provider('p', [model('m', { input_mtok: 1, output_mtok: 2 })])]) });
  assert.equal(fetched.modelCount, 1);
  assert.ok(Number.isFinite(Date.parse(fetched.fetchedAt)));
});

test('popular ranking pins curated models first and prefers shortest, newest ids', () => {
  const snapshot = upstream(
    provider('anthropic', [
      model('claude-sonnet-4-0', { input_mtok: 3, output_mtok: 15 }),
      model('claude-sonnet-4-5', { input_mtok: 3, output_mtok: 15 }),
      model('claude-sonnet-4-6', { input_mtok: 3, output_mtok: 15 }),
      model('claude-haiku-4-5', { input_mtok: 1, output_mtok: 5 }),
    ]),
    provider('openai', [
      model('gpt-5', { input_mtok: 1.25, output_mtok: 10 }),
      model('gpt-5.2', { input_mtok: 1.25, output_mtok: 10 }),
    ]),
    provider('no-match-here', [model('zzz', { input_mtok: 1, output_mtok: 1 })]),
  );
  const ranked = rankModels(snapshot.models).map(entry => entry[MODEL_KEY]);
  assert.equal(ranked[0], 'anthropic:claude-sonnet-4-6'); // tie on length, newest wins
  assert.ok(ranked.indexOf('anthropic:claude-haiku-4-5') < ranked.indexOf('no-match-here:zzz'));
  assert.ok(ranked.indexOf('openai:gpt-5') < ranked.indexOf('openai:gpt-5.2')); // shortest id wins
  assert.equal(ranked[ranked.length - 1], 'openai:gpt-5.2'); // unpinned models trail in key order
});

test('derivePopular builds a validating subset with referenced providers only', () => {
  const snapshot = upstream(
    provider('anthropic', [model('claude-sonnet-4-6', { input_mtok: 3, output_mtok: 15 })]),
    provider('unused', [model('never-pinned', { input_mtok: 1, output_mtok: 1 })]),
  );
  const popular = derivePopular(snapshot, 1);
  assert.equal(popular.modelCount, 1);
  assert.deepEqual(popular.providers, [['anthropic', 'anthropic']]);
  assert.deepEqual(popular.models, [snapshot.models[0]]);
  assert.ok(validateSnapshot(popular));
});

test('cost math covers cache rates, batch factors, and period scaling', () => {
  const claude = ['anthropic:claude-sonnet-4-5', 3, 15, 0.3, 200000, 0];
  const cost = calculateCost(claude, { inputTokens: 10000, outputTokens: 2000, cacheReadTokens: 50000, steps: 10, runsPerDay: 20 });
  assert.equal(cost.lines.input, 0.03); // 10k tokens at $3/MTok
  assert.equal(cost.lines.output, 0.03); // 2k tokens at $15/MTok
  assert.equal(cost.lines.cacheRead, 0.015); // 50k tokens at $0.30/MTok
  assert.equal(cost.perRun, 0.75); // (0.03 + 0.03 + 0.015) x 10 steps
  assert.equal(cost.perDay, 15); // x 20 runs
  assert.equal(cost.perMonth, 450); // x 30 days
  const batched = calculateCost(claude, { ...DEFAULT_USAGE, cacheReadTokens: 0 }, { batch: true });
  assert.equal(batched.batchSource, 'approximate'); // provider fallback
  assert.equal(batched.lines.input, (DEFAULT_USAGE.inputTokens / 1e6) * 3 * 0.5);
  const published = calculateCost(['google:gemini-2.5-pro', 1.25, 10, 0.125, null, 0], { inputTokens: 1e6, outputTokens: 1e6, cacheReadTokens: 1e6, steps: 1, runsPerDay: 1 }, { batch: true, batchPrice: [0.625, 5] });
  assert.equal(published.batchSource, 'published');
  assert.equal(published.lines.input, 0.625);
  assert.equal(published.lines.output, 5);
  assert.equal(published.lines.cacheRead, 0.0625); // 0.125 scaled by the 0.5 batch ratio
  const uncached = calculateCost(['p:m', 2, 6, null, null, 0], { inputTokens: 1000, outputTokens: 0, cacheReadTokens: 1000, steps: 1, runsPerDay: 0 });
  assert.equal(uncached.lines.cacheRead, 0.002); // falls back to the input rate
  assert.equal(uncached.perDay, 0);
  assert.throws(() => calculateCost(['deepseek:chat', 1, 2, null, null, 0], DEFAULT_USAGE, { batch: true }), /not available/);
});

test('published batch prices are extracted from price variants and validated', () => {
  const snapshot = upstream(provider('google', [
    model('gemini-2.5-pro', { input_mtok: 1.25, output_mtok: 10, cache_read_mtok: 0.125 }, 1048576),
    { id: 'gemini-expired', prices: { input_mtok: 1, output_mtok: 2 }, price_variants: [
      { when: { processing: 'batch' }, prices: { input_mtok: 0.5, output_mtok: 1 }, constraint: { end_date: '2026-01-01' } },
    ] },
    { id: 'gemini-priority', prices: { input_mtok: 1, output_mtok: 2 }, price_variants: [
      { when: { service_tier: 'priority' }, prices: { input_mtok: 10, output_mtok: 20 } },
    ] },
    { id: 'gemini-batch', prices: { input_mtok: 1.25, output_mtok: 10 }, price_variants: [
      { when: { processing: 'batch' }, prices: { input_mtok: { base: 0.625 }, output_mtok: { base: 5 } }, constraint: { start_date: '2026-10-14' } },
    ] },
  ]));
  assert.deepEqual(snapshot.batchPrices, { 'google:gemini-batch': [0.625, 5] }); // expired and non-batch variants excluded
  assert.throws(() => validateSnapshot({ ...snapshot, batchPrices: { 'ghost:m': [1, 1] } }), /Invalid batch price/);
  assert.throws(() => validateSnapshot({ ...snapshot, batchPrices: { 'google:gemini-batch': [1] } }), /Invalid batch price/);
  const popular = derivePopular(snapshot);
  assert.deepEqual(popular.batchPrices['google:gemini-batch'], [0.625, 5]);
});

test('currency formatting handles normal, tiny, and zero values', () => {
  assert.equal(formatUSD(0), '$0');
  assert.equal(formatUSD(15), '$15');
  assert.equal(formatUSD(0.015), '$0.015');
  assert.equal(formatUSD(1234.5), '$1,235');
});

test('calculator state round-trips through the URL and clamps garbage input', () => {
  const defaults = { defaultModelKey: 'anthropic:claude-sonnet-4-6' };
  const state = { modelKey: 'google:gemini-2.5-pro', usage: { inputTokens: 100000, outputTokens: 8000, cacheReadTokens: 50000, steps: 4, runsPerDay: 100 }, batch: true };
  const search = buildCalculatorSearch(state, defaults);
  assert.equal(search, 'm=google%3Agemini-2.5-pro&in=100000&out=8000&cache=50000&steps=4&runs=100&batch=1');
  assert.deepEqual(parseCalculatorState(`?${search}`, defaults), state);
  assert.equal(buildCalculatorSearch({ modelKey: defaults.defaultModelKey, usage: { ...DEFAULT_USAGE }, batch: false }, defaults), '');
  const garbage = parseCalculatorState('?m=not%20a%20key&in=-5&out=nope&steps=20000000&runs=&batch=yes', defaults);
  assert.equal(garbage.modelKey, defaults.defaultModelKey);
  assert.deepEqual(garbage.usage, { inputTokens: 0, outputTokens: DEFAULT_USAGE.outputTokens, cacheReadTokens: 0, steps: 1e6, runsPerDay: DEFAULT_USAGE.runsPerDay });
  assert.equal(garbage.batch, false);
});

test('the committed snapshot stays valid and compact', async () => {
  const text = await readFile(new URL('../src/data/llm-prices.json', import.meta.url), 'utf8');
  const snapshot = validateSnapshot(JSON.parse(text));
  assert.ok(snapshot.modelCount > 500);
  assert.ok(text.length < 500000, `snapshot grew to ${text.length} bytes`);
  const gzipped = gzipSync(text).length;
  assert.ok(gzipped < 60000, `snapshot gzips to ${gzipped} bytes`);
  const publicCopy = await readFile(new URL('../public/data/llm-prices.json', import.meta.url), 'utf8');
  assert.equal(publicCopy, text);
});

test('CLI preserves the saved file on failed refresh and supports offline builds', async () => {
  const root = await mkdtemp(join(tmpdir(), 'price-sync-'));
  try {
    for (const dir of ['scripts/lib', 'src/data', 'public/data']) await mkdir(join(root, dir), { recursive: true });
    for (const file of ['scripts/sync-llm-prices.mjs', 'scripts/lib/llm-prices.mjs']) await copyFile(file, join(root, file));
    const saved = JSON.stringify(upstream(provider('p', [model('m', { input_mtok: 1, output_mtok: 2 })])));
    await writeFile(join(root, 'src/data/llm-prices.json'), saved);
    await writeFile(join(root, 'public/data/llm-prices.json'), saved);
    await writeFile(join(root, 'offline.mjs'), "globalThis.fetch = async () => { throw new Error('Test network failure'); };\n");
    const run = (args = [], extra = {}) => spawnSync(process.execPath, ['--import', join(root, 'offline.mjs'), join(root, 'scripts/sync-llm-prices.mjs'), ...args], { encoding: 'utf8', env: { ...process.env, PRICES_OFFLINE: '0', ...extra } });
    assert.equal(run().status, 0);
    assert.equal(await readFile(join(root, 'src/data/llm-prices.json'), 'utf8'), saved);
    assert.notEqual(run(['--strict']).status, 0);
    assert.equal(run([], { PRICES_OFFLINE: '1' }).status, 0);
    await rm(join(root, 'src/data/llm-prices.json'));
    assert.notEqual(run([], { PRICES_OFFLINE: '1' }).status, 0);
  } finally { await rm(root, { recursive: true, force: true }); }
});
