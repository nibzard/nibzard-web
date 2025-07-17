import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ogDir = path.resolve(__dirname, '../public/og');

console.log('Pre-build: Generating OG images...');

try {
  // Ensure OG directory exists
  if (!fs.existsSync(ogDir)) {
    fs.mkdirSync(ogDir, { recursive: true });
  }

  // Generate OG images
  execSync('node scripts/generate-og-images.js', {
    cwd: path.resolve(__dirname, '..'),
    stdio: 'inherit'
  });

  console.log('Pre-build: OG images generated successfully');
} catch (error) {
  console.error('Pre-build: Error generating OG images:', error.message);
  // Don't fail the build if OG image generation fails
  process.exit(0);
}