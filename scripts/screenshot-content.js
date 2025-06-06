import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory containing log markdown files
const logDir = path.resolve(__dirname, '../src/content/log');
const baseUrl = 'http://localhost:4321';

// Get all .md files in the log directory and generate URLs
const logItems = fs.readdirSync(logDir)
  .filter(file => file.endsWith('.md'))
  .map(file => ({
    slug: file.replace(/\.md$/, ''),
    url: `${baseUrl}/${file.replace(/\.md$/, '')}`
  }));

const MAX_HEIGHT = 2000;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Ensure screenshots directory exists
  const outDir = path.resolve(__dirname, '../screenshots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  for (const { slug, url } of logItems) {
    try {
      // Check if screenshots already exist for this log item
      const firstSegmentPath = path.join(outDir, `${slug}-1.png`);
      if (fs.existsSync(firstSegmentPath)) {
        console.log(`Screenshots already exist for ${slug}, skipping...`);
        continue;
      }

      await page.goto(url, { waitUntil: 'networkidle0' });
      // Hide astro-dev-toolbar, dev-bar, read-more-section, and newsletter-card with CSS
      await page.addStyleTag({
        content: `astro-dev-toolbar, #dev-bar, .read-more-section, .newsletter-card { display: none !important; }`
      });
      // Remove astro-dev-toolbar and dev-bar elements if they exist
      await page.evaluate(() => {
        const astroToolbar = document.querySelector('astro-dev-toolbar');
        if (astroToolbar) astroToolbar.remove();
        const devBar = document.getElementById('dev-bar');
        if (devBar) devBar.remove();
      });
      await page.waitForSelector('.content-container', { timeout: 5000 });
      const element = await page.$('.content-container');
      if (!element) {
        console.error(`No .content-container found on ${url}`);
        continue;
      }
      // Save full screenshot as slug-full.png
      const fullPath = path.join(outDir, `${slug}-full.png`);
      await element.screenshot({ path: fullPath });
      console.log(`Saved full screenshot for ${url} to ${fullPath}`);
      // Split the image into proportional segments close to MAX_HEIGHT
      const imageBuffer = fs.readFileSync(fullPath);
      const image = sharp(imageBuffer);
      const metadata = await image.metadata();
      const totalHeight = metadata.height;
      const width = metadata.width;
      if (totalHeight > MAX_HEIGHT) {
        // Calculate number of segments and their heights
        const numSegments = Math.ceil(totalHeight / MAX_HEIGHT);
        const baseHeight = Math.floor(totalHeight / numSegments);
        let remainder = totalHeight - baseHeight * numSegments;
        let top = 0;
        for (let i = 0; i < numSegments; i++) {
          let segmentHeight = baseHeight + (i < remainder ? 1 : 0);
          const segmentPath = path.join(outDir, `${slug}-${i + 1}.png`);
          // Use a new sharp instance for each segment
          await sharp(imageBuffer)
            .extract({ left: 0, top, width, height: segmentHeight })
            .toFile(segmentPath);
          console.log(`Saved segment ${i + 1} for ${url} to ${segmentPath}`);
          top += segmentHeight;
        }
      } else {
        // If not split, just save as slug-1.png for consistency
        const segmentPath = path.join(outDir, `${slug}-1.png`);
        fs.copyFileSync(fullPath, segmentPath);
        console.log(`Saved screenshot for ${url} to ${segmentPath}`);
      }
    } catch (err) {
      console.error(`Error processing ${url}:`, err.message);
    }
  }

  await browser.close();
})();