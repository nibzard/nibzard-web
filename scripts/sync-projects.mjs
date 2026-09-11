import { readFile, writeFile, rename } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { fetchRepositories, validateConfig, validateSnapshot } from './lib/github-projects.mjs';

const configPath = new URL('../src/config/projects.json', import.meta.url);
const snapshotPath = new URL('../src/data/github-projects.json', import.meta.url);
const config = validateConfig(JSON.parse(await readFile(configPath, 'utf8')));
let previous;
try { previous = validateSnapshot(JSON.parse(await readFile(snapshotPath, 'utf8'))); }
catch { /* A first sync can create the snapshot. */ }

if (process.env.PROJECTS_OFFLINE === '1') {
  if (!previous) throw new Error('Offline project builds require a valid saved snapshot.');
  console.log(`Projects: using ${previous.repositories.length} saved repositories (offline).`);
} else {
  let next;
  try {
    next = await fetchRepositories(config, { token: process.env.GITHUB_TOKEN || process.env.GH_TOKEN });
  } catch (error) {
    if (!previous || process.argv.includes('--strict')) throw error;
    console.warn(`Projects: ${error.message}. Keeping the saved snapshot.`);
  }
  if (next) {
    const text = JSON.stringify(next, null, 2) + '\n';
    if (JSON.stringify(previous) !== JSON.stringify(next)) {
      const temporary = fileURLToPath(snapshotPath) + '.tmp';
      await writeFile(temporary, text);
      await rename(temporary, snapshotPath);
      console.log(`Projects: saved ${next.repositories.length} public repositories.`);
    } else {
      console.log(`Projects: ${next.repositories.length} repositories unchanged.`);
    }
  }
}
