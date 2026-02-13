import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// Try to import sharp, but make it optional
let sharp;
const SKIP_EXIT_CODE = 10;

function formatOptionalSharpWarning(error) {
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes('Could not load the "sharp" module')) {
    return 'Sharp not available, skipping image optimization. Install optional dependency "sharp" for optimized OG images.';
  }
  return `Sharp not available, skipping image optimization: ${message}`;
}

function isMissingBrowserError(error) {
  const message = error instanceof Error ? error.message : String(error);
  return (
    message.includes('Could not find Chrome') ||
    message.includes('Could not find Chromium') ||
    message.includes('Executable doesn\'t exist')
  );
}

try {
  sharp = (await import('sharp')).default;
} catch (error) {
  console.warn(formatOptionalSharpWarning(error));
}

// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory containing log markdown files
const logDir = path.resolve(__dirname, '../src/content/log');
const templatesDir = path.resolve(__dirname, '../templates');
const outputDir = path.resolve(__dirname, '../public/og');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Simple template replacement function
function replaceTemplate(template, data) {
  let result = template;
  
  // Replace simple variables
  result = result.replace(/\{\{TITLE\}\}/g, data.title || '');
  result = result.replace(/\{\{DESCRIPTION\}\}/g, data.description || '');
  result = result.replace(/\{\{AUTHOR\}\}/g, data.author || 'Nikola Balić');
  result = result.replace(/\{\{DATE\}\}/g, data.date || '');
  
  // Handle conditional blocks and loops
  if (data.description) {
    result = result.replace(/\{\{#if DESCRIPTION\}\}([\s\S]*?)\{\{\/if\}\}/g, '$1');
  } else {
    result = result.replace(/\{\{#if DESCRIPTION\}\}([\s\S]*?)\{\{\/if\}\}/g, '');
  }
  
  if (data.date) {
    result = result.replace(/\{\{#if DATE\}\}([\s\S]*?)\{\{\/if\}\}/g, '$1');
  } else {
    result = result.replace(/\{\{#if DATE\}\}([\s\S]*?)\{\{\/if\}\}/g, '');
  }
  
  if (data.tags && data.tags.length > 0) {
    result = result.replace(/\{\{#if TAGS\}\}([\s\S]*?)\{\{\/if\}\}/g, '$1');
    
    // Replace tags loop
    const tagsHtml = data.tags.map(tag => `<span class="tag">${tag}</span>`).join('\n        ');
    result = result.replace(/\{\{#each TAGS\}\}([\s\S]*?)\{\{\/each\}\}/g, tagsHtml);
  } else {
    result = result.replace(/\{\{#if TAGS\}\}([\s\S]*?)\{\{\/if\}\}/g, '');
  }
  
  return result;
}

// Parse frontmatter from markdown file
function parseFrontmatter(content) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return {};
  
  const frontmatter = {};
  const lines = frontmatterMatch[1].split('\n');
  
  for (const line of lines) {
    if (line.includes(':')) {
      const [key, ...valueParts] = line.split(':');
      let value = valueParts.join(':').trim();
      
      // Remove quotes
      value = value.replace(/^["']|["']$/g, '');
      
      // Handle arrays (basic parsing)
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(item => item.trim().replace(/^["']|["']$/g, ''));
      }
      
      frontmatter[key.trim()] = value;
    }
  }
  
  return frontmatter;
}

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Get all markdown files and their frontmatter
function getLogEntries() {
  const files = fs.readdirSync(logDir).filter(file => file.endsWith('.md'));
  const entries = [];
  
  for (const file of files) {
    const filePath = path.join(logDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatter = parseFrontmatter(content);
    
    if (frontmatter.title && frontmatter.draft !== true && frontmatter.draft !== 'true') {
      entries.push({
        slug: file.replace('.md', ''),
        ...frontmatter,
        date: frontmatter.date ? formatDate(frontmatter.date) : null
      });
    }
  }
  
  return entries;
}

// Generate OG image for a single entry
async function generateOGImage(page, entry, template) {
  const html = replaceTemplate(template, entry);
  
  await page.setContent(html);
  await page.setViewport({ width: 1200, height: 630 });
  
  // Wait for fonts to load
  await page.evaluateHandle('document.fonts.ready');
  
  const imagePath = path.join(outputDir, `${entry.slug}.png`);
  
  // Take screenshot
  await page.screenshot({
    path: imagePath,
    width: 1200,
    height: 630,
    type: 'png'
  });
  
  // Optimize with Sharp if available
  if (sharp) {
    try {
      await sharp(imagePath)
        .png({ quality: 90, compressionLevel: 9 })
        .toFile(imagePath.replace('.png', '-optimized.png'));
      
      // Replace original with optimized
      fs.renameSync(imagePath.replace('.png', '-optimized.png'), imagePath);
    } catch (error) {
      console.warn(`Sharp optimization failed for ${entry.slug}, using unoptimized image:`, error.message);
    }
  }
  
  console.log(`Generated OG image for: ${entry.title} -> ${imagePath}`);
}

// Main execution
(async () => {
  console.log('Starting OG image generation...');
  let browser;
  
  try {
    // Load template
    const templatePath = path.join(templatesDir, 'og-image.html');
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template not found: ${templatePath}`);
    }

    const template = fs.readFileSync(templatePath, 'utf8');

    // Get all log entries
    const entries = getLogEntries();
    console.log(`Found ${entries.length} log entries`);

    try {
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    } catch (error) {
      if (isMissingBrowserError(error)) {
        console.warn('Chrome for Puppeteer is not installed. Skipping OG image generation.');
        console.warn('Install it with: pnpm exec puppeteer browsers install chrome');
        process.exitCode = SKIP_EXIT_CODE;
        return;
      }
      throw error;
    }

    const page = await browser.newPage();

    // Generate OG images
    for (const entry of entries) {
      const ogImagePath = path.join(outputDir, `${entry.slug}.png`);

      // Skip if already exists (unless force flag is set)
      if (fs.existsSync(ogImagePath) && !process.argv.includes('--force')) {
        console.log(`OG image already exists for: ${entry.title}, skipping...`);
        continue;
      }

      try {
        await generateOGImage(page, entry, template);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`Error generating OG image for ${entry.title}: ${message}`);
      }
    }

    console.log('OG image generation completed!');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`OG image generation failed: ${message}`);
    process.exitCode = 1;
  } finally {
    if (browser) {
      await browser.close().catch(() => {
        // No-op on close failures; build should still proceed.
      });
    }
  }
})();
