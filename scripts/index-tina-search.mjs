import { spawnSync } from 'node:child_process';

// Local previews do not need to upload an index to Tina Cloud.
if (process.env.TINA_SKIP_SEARCH_INDEX === '1') {
  console.log('Tina Cloud search upload skipped for this local build.');
} else {
  const result = spawnSync('pnpm', ['exec', 'tinacms', 'search-index'], { stdio: 'inherit' });
  if (result.error) console.error(result.error.message);
  process.exit(result.status ?? 1);
}
