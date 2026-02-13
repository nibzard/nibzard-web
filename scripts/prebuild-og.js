import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ogDir = path.resolve(__dirname, '../public/og');
const SKIP_EXIT_CODE = 10;

console.log('Pre-build: Generating OG images...');

try {
  // Ensure OG directory exists
  if (!fs.existsSync(ogDir)) {
    fs.mkdirSync(ogDir, { recursive: true });
  }

  // Generate OG images
  const result = spawnSync('node', ['scripts/generate-og-images.js'], {
    cwd: path.resolve(__dirname, '..'),
    stdio: 'inherit',
  });

  if (result.error) {
    console.warn(`Pre-build: Skipping OG image generation (${result.error.message})`);
    process.exit(0);
  }

  if (result.status === 0) {
    console.log('Pre-build: OG images generated successfully');
    process.exit(0);
  }

  if (result.status === SKIP_EXIT_CODE) {
    console.warn('Pre-build: OG image generation skipped due to missing browser dependency.');
    process.exit(0);
  }

  console.warn(`Pre-build: OG image generation failed with exit code ${result.status}. Continuing build without OG updates.`);
  process.exit(0);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.warn(`Pre-build: Skipping OG image generation (${message})`);
  // Don't fail the build if OG image generation fails
  process.exit(0);
}
