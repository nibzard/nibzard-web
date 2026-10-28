// Shared LLM price snapshot logic: upstream transform, validation, ranking,
// cost math, and calculator URL state. Imported by the sync CLI, the tests,
// the Astro build, and the client island — keep it free of node: imports.

export const SNAPSHOT_VERSION = 1;
export const UPSTREAM_URL = 'https://raw.githubusercontent.com/pydantic/genai-prices/main/prices/new_data/v2/data_slim.json';
export const UPSTREAM_SOURCE = 'pydantic/genai-prices data_slim.json v2 (MIT)';

// Model tuple indices into snapshot.models entries.
export const MODEL_KEY = 0;
export const MODEL_INPUT = 1; // $ per million input tokens
export const MODEL_OUTPUT = 2; // $ per million output tokens
export const MODEL_CACHE_READ = 3; // $ per million cached input tokens, null when unknown
export const MODEL_CONTEXT = 4; // context window in tokens, null when unknown
export const MODEL_TIERED = 5; // 1 when tiers[key] carries above-threshold prices

export const DAYS_PER_MONTH = 30;

export const DEFAULT_USAGE = Object.freeze({
  inputTokens: 10000,
  outputTokens: 2000,
  cacheReadTokens: 0,
  steps: 10,
  runsPerDay: 20,
});

// Approximate batch multipliers by provider (fraction of the standard price),
// used as a fallback when no published batch price exists for a model. Most
// variants upstream carry exact batch prices in `price_variants`.
export const BATCH_DISCOUNTS = Object.freeze({
  openai: 0.5,
  anthropic: 0.5,
  google: 0.5,
});

// Ordered `provider:substring` patterns. First match wins; within a pattern
// the shortest model id wins (base ids beat dated snapshots) with newer
// versions preferred on ties. Retune this list here, nothing else.
export const POPULAR_MODELS = Object.freeze([
  'anthropic:claude-sonnet-4',
  'anthropic:claude-opus-4',
  'anthropic:claude-haiku-4',
  'openai:gpt-5',
  'openai:gpt-5-mini',
  'openai:o3',
  'google:gemini-3-pro',
  'google:gemini-3.5-flash',
  'google:gemini-2.5-pro',
  'google:gemini-2.5-flash',
  'deepseek:deepseek-chat',
  'deepseek:deepseek-reasoner',
  'x-ai:grok-4',
  'moonshotai:kimi',
  'zai:glm',
  'mistral:mistral-large',
  'cohere:command-a',
  'aws:nova',
]);

export const POPULAR_LIMIT = 18;

const fail = message => { throw new Error(message); };
const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);

// A price field upstream is either a number or {base, tiers: [{start, price}]}.
function basePrice(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (isObject(value) && typeof value.base === 'number' && Number.isFinite(value.base)) return value.base;
  return null;
}

function tierEntries(value) {
  if (!isObject(value) || !Array.isArray(value.tiers)) return [];
  return value.tiers
    .filter(tier => isObject(tier) && Number.isFinite(tier.start) && Number.isFinite(tier.price))
    .map(tier => [tier.start, tier.price]);
}

// Flattens one price group (a plain prices object) into base prices and tiers.
function readGroup(prices) {
  const result = { input: null, output: null, cacheRead: null, tiers: new Map() };
  const input = basePrice(prices.input_mtok);
  const output = basePrice(prices.output_mtok);
  const cacheRead = basePrice(prices.cache_read_mtok);
  if (input === null || output === null) return null; // chat pricing requires both
  result.input = input;
  result.output = output;
  result.cacheRead = cacheRead;
  for (const [field, key] of [['input_mtok', 'input'], ['output_mtok', 'output']]) {
    for (const [start, price] of tierEntries(prices[field])) {
      if (!result.tiers.has(start)) result.tiers.set(start, {});
      result.tiers.get(start)[key] = price;
    }
  }
  return result;
}

// Upstream `prices` is either one prices object or a list of price groups
// (context-length tiers). Merge groups: first group supplies the base prices,
// every group may contribute tiers.
function readPrices(rawPrices) {
  const groups = (Array.isArray(rawPrices) ? rawPrices : [rawPrices])
    .map(group => isObject(group) && isObject(group.prices) ? group.prices : (isObject(group) ? group : null))
    .map(readGroup)
    .filter(Boolean);
  if (groups.length === 0) return null;
  const merged = { ...groups[0], tiers: new Map() };
  for (const group of groups) {
    if (merged.cacheRead === null && group.cacheRead !== null) merged.cacheRead = group.cacheRead;
    for (const [start, prices] of group.tiers) {
      if (!merged.tiers.has(start)) merged.tiers.set(start, {});
      merged.tiers.set(start, { ...merged.tiers.get(start), ...prices });
    }
  }
  return merged;
}

// The upstream `price_variants` list carries exact batch prices for some
// models (`when.processing === 'batch'`). Expired variants keep an end_date.
function readBatchPrice(model) {
  for (const variant of Array.isArray(model.price_variants) ? model.price_variants : []) {
    if (!isObject(variant)) continue;
    const when = isObject(variant.when) ? variant.when : {};
    if (when.processing !== 'batch') continue;
    if (variant.constraint && variant.constraint.end_date) continue;
    const prices = readPrices(variant.prices);
    if (prices) return [prices.input, prices.output];
  }
  return null;
}

export function normalizeUpstream(raw, { fetchedAt = new Date().toISOString() } = {}) {
  if (!Array.isArray(raw)) fail('Upstream price data must be a list of providers.');
  const providers = [];
  const providerNames = new Map();
  const models = new Map();
  const tiers = {};
  const batchPrices = {};
  for (const provider of raw) {
    if (!isObject(provider) || typeof provider.id !== 'string' || !provider.id.trim()) fail('Invalid provider entry upstream.');
    if (providerNames.has(provider.id)) continue;
    providerNames.set(provider.id, typeof provider.name === 'string' && provider.name.trim() ? provider.name : provider.id);
    if (!Array.isArray(provider.models)) continue;
    for (const model of provider.models) {
      if (!isObject(model) || typeof model.id !== 'string' || !model.id.trim()) continue;
      const key = `${provider.id}:${model.id}`;
      if (models.has(key)) continue;
      const prices = readPrices(model.prices);
      if (!prices) continue; // audio-only, image-only, or partial listings
      const tierList = [...prices.tiers.entries()]
        .sort((a, b) => a[0] - b[0])
        .map(([start, tier]) => [start, tier.input ?? prices.input, tier.output ?? prices.output]);
      const context = Number.isFinite(model.context_window) && model.context_window > 0 ? model.context_window : null;
      models.set(key, [key, prices.input, prices.output, prices.cacheRead, context, tierList.length ? 1 : 0]);
      if (tierList.length) tiers[key] = tierList;
      const batch = readBatchPrice(model);
      if (batch) batchPrices[key] = batch;
    }
  }
  for (const [id, name] of providerNames) providers.push([id, name]);
  providers.sort((a, b) => a[0].localeCompare(b[0]));
  return validateSnapshot({
    version: SNAPSHOT_VERSION,
    fetchedAt,
    source: UPSTREAM_SOURCE,
    modelCount: models.size,
    providers,
    models: [...models.values()].sort((a, b) => a[0].localeCompare(b[0])),
    tiers,
    batchPrices,
  });
}

export function validateSnapshot(snapshot) {
  if (!isObject(snapshot) || snapshot.version !== SNAPSHOT_VERSION || !Array.isArray(snapshot.models) || !Array.isArray(snapshot.providers) || !isObject(snapshot.tiers)) fail('Invalid LLM price snapshot.');
  if (typeof snapshot.fetchedAt !== 'string' || !Number.isFinite(Date.parse(snapshot.fetchedAt))) fail('Invalid fetchedAt in LLM price snapshot.');
  if (typeof snapshot.source !== 'string' || !snapshot.source.trim()) fail('Invalid source in LLM price snapshot.');
  if (snapshot.modelCount !== snapshot.models.length) fail('modelCount does not match models in LLM price snapshot.');
  const keys = new Set();
  const providerIds = new Set(snapshot.providers.map(([id]) => id));
  for (const [id, name] of snapshot.providers) {
    if (typeof id !== 'string' || !id || typeof name !== 'string' || !name) fail('Invalid provider in LLM price snapshot.');
  }
  if (providerIds.size !== snapshot.providers.length) fail('Duplicate provider in LLM price snapshot.');
  for (const model of snapshot.models) {
    if (!Array.isArray(model) || model.length !== 6) fail('Invalid model tuple in LLM price snapshot.');
    const [key, input, output, cacheRead, context, tiered] = model;
    const provider = key.slice(0, key.indexOf(':'));
    const modelId = key.slice(key.indexOf(':') + 1);
    if (!/^[^\s:]+:[^\s]+$/.test(key) || keys.has(key) || !providerIds.has(provider) || modelId.length === 0) fail(`Invalid model key in LLM price snapshot: ${key}`);
    keys.add(key);
    for (const price of [input, output]) if (!(Number.isFinite(price) && price >= 0)) fail(`Invalid price in LLM price snapshot: ${key}`);
    if (!(cacheRead === null || (Number.isFinite(cacheRead) && cacheRead >= 0))) fail(`Invalid cache price in LLM price snapshot: ${key}`);
    if (!(context === null || (Number.isInteger(context) && context > 0))) fail(`Invalid context window in LLM price snapshot: ${key}`);
    if (tiered !== 0 && tiered !== 1) fail(`Invalid tier flag in LLM price snapshot: ${key}`);
    if (tiered === 1 && !Array.isArray(snapshot.tiers[key])) fail(`Missing tiers for tiered model: ${key}`);
  }
  for (const [key, tierList] of Object.entries(snapshot.tiers)) {
    if (!keys.has(key) || !Array.isArray(tierList) || tierList.length === 0) fail(`Invalid tier entry in LLM price snapshot: ${key}`);
    for (const [start, input, output] of tierList) {
      if (!(Number.isFinite(start) && start > 0) || !(Number.isFinite(input) && input >= 0) || !(Number.isFinite(output) && output >= 0)) fail(`Invalid tier prices in LLM price snapshot: ${key}`);
    }
  }
  if (snapshot.batchPrices !== undefined) {
    if (!isObject(snapshot.batchPrices)) fail('Invalid batchPrices in LLM price snapshot.');
    for (const [key, batch] of Object.entries(snapshot.batchPrices)) {
      if (!keys.has(key) || !Array.isArray(batch) || batch.length !== 2 || !(Number.isFinite(batch[0]) && batch[0] >= 0) || !(Number.isFinite(batch[1]) && batch[1] >= 0)) fail(`Invalid batch price in LLM price snapshot: ${key}`);
    }
  }
  return snapshot;
}

export async function fetchPrices({ fetchImpl = fetch } = {}) {
  const response = await fetchImpl(UPSTREAM_URL, { signal: AbortSignal.timeout(15000) });
  if (!response.ok) fail(`Upstream price list returned HTTP ${response.status}.`);
  const raw = await response.json();
  return normalizeUpstream(raw);
}

function popularMatch(models) {
  const candidates = new Map(); // pattern index -> chosen model
  for (const pattern of POPULAR_MODELS) {
    const [provider, substring] = pattern.split(':');
    const hits = models.filter(model => {
      const key = model[MODEL_KEY];
      return key.startsWith(`${provider}:`) && key.slice(provider.length + 1).toLowerCase().includes(substring.toLowerCase());
    });
    if (hits.length === 0) continue;
    hits.sort((a, b) => {
      const idA = a[MODEL_KEY].length;
      const idB = b[MODEL_KEY].length;
      if (idA !== idB) return idA - idB; // shortest id wins
      return b[MODEL_KEY].localeCompare(a[MODEL_KEY]); // ties prefer newer versions
    });
    candidates.set(pattern, hits[0]);
  }
  return candidates;
}

// Popular matches first in curation order, everything else alphabetical.
export function rankModels(models) {
  const popular = popularMatch(models);
  const pinned = [...popular.values()];
  const pinnedKeys = new Set(pinned.map(model => model[MODEL_KEY]));
  const rest = models.filter(model => !pinnedKeys.has(model[MODEL_KEY]));
  return [...pinned, ...rest];
}

// Compact subset snapshot for inlining into the page. Same shape, fewer models.
export function derivePopular(snapshot, limit = POPULAR_LIMIT) {
  validateSnapshot(snapshot);
  const ranked = rankModels(snapshot.models).slice(0, limit);
  const usedKeys = new Set(ranked.map(model => model[MODEL_KEY]));
  const usedProviders = new Set(ranked.map(model => model[MODEL_KEY].slice(0, model[MODEL_KEY].indexOf(':'))));
  return {
    version: snapshot.version,
    fetchedAt: snapshot.fetchedAt,
    source: snapshot.source,
    modelCount: ranked.length,
    providers: snapshot.providers.filter(([id]) => usedProviders.has(id)),
    models: ranked,
    tiers: Object.fromEntries(Object.entries(snapshot.tiers).filter(([key]) => usedKeys.has(key))),
    batchPrices: Object.fromEntries(Object.entries(snapshot.batchPrices || {}).filter(([key]) => usedKeys.has(key))),
  };
}

export function providerMap(snapshot) {
  return Object.fromEntries(snapshot.providers.map(([id, name]) => [id, name]));
}

// Cached tokens bill at the cache-read rate when the provider publishes one,
// and at the full input rate otherwise (the uncached worst case).
export function cacheReadRate(model) {
  return model[MODEL_CACHE_READ] ?? model[MODEL_INPUT];
}

export function batchRate(model) {
  const provider = model[MODEL_KEY].slice(0, model[MODEL_KEY].indexOf(':'));
  return BATCH_DISCOUNTS[provider] ?? null;
}

export function calculateCost(model, usage, { batch = false, batchPrice = null } = {}) {
  let inputRate = model[MODEL_INPUT];
  let outputRate = model[MODEL_OUTPUT];
  let cacheRate = cacheReadRate(model);
  let batchSource = null;
  if (batch) {
    if (Array.isArray(batchPrice)) {
      // Published batch price: apply its input/output rates directly, and the
      // same discount ratio to the cache rate (rarely published for batch).
      const ratio = model[MODEL_INPUT] > 0 ? batchPrice[0] / model[MODEL_INPUT] : 1;
      inputRate = batchPrice[0];
      outputRate = batchPrice[1];
      cacheRate *= ratio;
      batchSource = 'published';
    } else {
      const factor = batchRate(model);
      if (factor === null) fail('Batch pricing is not available for this provider.');
      inputRate *= factor;
      outputRate *= factor;
      cacheRate *= factor;
      batchSource = 'approximate';
    }
  }
  const steps = Math.max(1, usage.steps);
  const lines = {
    input: (usage.inputTokens / 1e6) * inputRate,
    output: (usage.outputTokens / 1e6) * outputRate,
    cacheRead: (usage.cacheReadTokens / 1e6) * cacheRate,
  };
  const perRun = (lines.input + lines.output + lines.cacheRead) * steps;
  const perDay = perRun * Math.max(0, usage.runsPerDay);
  return {
    lines,
    steps,
    perRun,
    perDay,
    perMonth: perDay * DAYS_PER_MONTH,
    batchSource,
  };
}

export function formatUSD(value) {
  if (!Number.isFinite(value)) return '—';
  if (value === 0) return '$0';
  if (Math.abs(value) < 0.01) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 4 }).format(value);
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 4 }).format(value);
}

// Calculator URL state. Params: m, in, out, cache, steps, runs, batch.
const LIMITS = {
  inputTokens: [0, 1e9],
  outputTokens: [0, 1e9],
  cacheReadTokens: [0, 1e9],
  steps: [1, 1e6],
  runsPerDay: [0, 1e6],
};

function clampInt(raw, [min, max], fallback) {
  const value = Number.parseInt(raw, 10);
  if (!Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, value));
}

export function parseCalculatorState(searchString, { defaultModelKey, usage = DEFAULT_USAGE } = {}) {
  const params = new URLSearchParams(searchString);
  const next = { modelKey: defaultModelKey, usage: { ...usage }, batch: false };
  const model = params.get('m');
  if (model && /^[^\s:]+:[^\s]+$/.test(model)) next.modelKey = model;
  const mapping = { in: 'inputTokens', out: 'outputTokens', cache: 'cacheReadTokens', steps: 'steps', runs: 'runsPerDay' };
  for (const [param, field] of Object.entries(mapping)) {
    const raw = params.get(param);
    if (raw !== null) next.usage[field] = clampInt(raw, LIMITS[field], usage[field]);
  }
  next.batch = params.get('batch') === '1';
  return next;
}

export function buildCalculatorSearch(state, { defaultModelKey, usage = DEFAULT_USAGE } = {}) {
  const params = new URLSearchParams();
  if (state.modelKey !== defaultModelKey) params.set('m', state.modelKey);
  const mapping = { in: 'inputTokens', out: 'outputTokens', cache: 'cacheReadTokens', steps: 'steps', runs: 'runsPerDay' };
  for (const [param, field] of Object.entries(mapping)) {
    if (state.usage[field] !== usage[field]) params.set(param, String(state.usage[field]));
  }
  if (state.batch) params.set('batch', '1');
  return params.toString();
}
