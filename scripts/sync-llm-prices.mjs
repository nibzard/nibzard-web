import { readFile, writeFile, rename, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { fetchPrices, validateSnapshot } from './lib/llm-prices.mjs';

const canonicalPath = new URL('../src/data/llm-prices.json', import.meta.url);
const publicPath = new URL('../public/data/llm-prices.json', import.meta.url);

async function readSnapshot(path) {
  try { return validateSnapshot(JSON.parse(await readFile(path, 'utf8'))); }
  catch { return null; } // A first sync can create the snapshots.
}

async function writeAtomically(path, text) {
  await mkdir(new URL('./', path), { recursive: true });
  const temporary = fileURLToPath(path) + '.tmp';
  await writeFile(temporary, text);
  await rename(temporary, path);
}

// The public copy must stay byte-identical to the canonical snapshot.
async function ensurePublicCopy(text) {
  let current = null;
  try { current = await readFile(publicPath, 'utf8'); } catch { /* First sync creates it. */ }
  if (current !== text) await writeAtomically(publicPath, text);
}

const previous = await readSnapshot(canonicalPath);
const render = snapshot => JSON.stringify(snapshot, null, 2) + '\n';

if (process.env.PRICES_OFFLINE === '1') {
  if (!previous) throw new Error('Offline price builds require a valid saved snapshot.');
  console.log(`Prices: using ${previous.modelCount} saved models (offline).`);
  await ensurePublicCopy(render(previous));
} else {
  let next = null;
  try {
    next = await fetchPrices();
  } catch (error) {
    if (!previous || process.argv.includes('--strict')) throw error;
    console.warn(`Prices: ${error.message}. Keeping the saved snapshot.`);
  }
  if (next) {
    // An unchanged price list keeps the previous fetchedAt, so the weekly
    // cron only commits when tracked prices actually moved.
    const dataOf = snapshot => JSON.stringify({ providers: snapshot.providers, models: snapshot.models, tiers: snapshot.tiers, batchPrices: snapshot.batchPrices });
    if (previous && dataOf(previous) === dataOf(next)) {
      console.log(`Prices: ${next.modelCount} models unchanged.`);
      await ensurePublicCopy(render(previous));
    } else {
      const text = render(next);
      await writeAtomically(canonicalPath, text);
      await ensurePublicCopy(text);
      console.log(`Prices: saved ${next.modelCount} models (${previous ? 'updated' : 'initial sync'}).`);
    }
  } else if (previous) {
    await ensurePublicCopy(render(previous));
  }
}
