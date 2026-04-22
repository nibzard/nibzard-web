// ABOUTME: Renders CLI-style content as a PNG image using puppeteer
// ABOUTME: Supports tables, code blocks, and mixed terminal-style content

import { createRequire } from 'module';
import path from 'path';

// Resolve puppeteer from common project locations since skills run from anywhere
const require = createRequire(import.meta.url);
let puppeteer;
const tryPaths = [
  '/Users/nikola/dev/nibzard-web/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js',
];
for (const p of tryPaths) {
  try { puppeteer = await import(p); break; } catch {}
}
if (!puppeteer) {
  try { puppeteer = await import('puppeteer'); } catch {}
}
if (!puppeteer) {
  throw new Error('puppeteer not found. Install it in a project and update tryPaths in render.mjs.');
}

const THEMES = {
  'tokyo-night': {
    bg: '#1a1b26',
    fg: '#a9b1d6',
    header: '#7aa2f7',
    accent: '#f7768e',
    highlight: '#ff9e64',
    success: '#9ece6a',
    warning: '#e0af68',
    muted: '#565f89',
    dim: '#414868',
  },
  'dracula': {
    bg: '#282a36',
    fg: '#f8f8f2',
    header: '#bd93f9',
    accent: '#ff79c6',
    highlight: '#ffb86c',
    success: '#50fa7b',
    warning: '#f1fa8c',
    muted: '#6272a4',
    dim: '#44475a',
  },
  'catppuccin': {
    bg: '#1e1e2e',
    fg: '#cdd6f4',
    header: '#89b4fa',
    accent: '#f38ba8',
    highlight: '#fab387',
    success: '#a6e3a1',
    warning: '#f9e2af',
    muted: '#6c7086',
    dim: '#45475a',
  },
  'gruvbox': {
    bg: '#282828',
    fg: '#ebdbb2',
    header: '#83a598',
    accent: '#fb4934',
    highlight: '#fe8019',
    success: '#b8bb26',
    warning: '#fabd2f',
    muted: '#665c54',
    dim: '#3c3836',
  },
  'solarized': {
    bg: '#002b36',
    fg: '#839496',
    header: '#268bd2',
    accent: '#dc322f',
    highlight: '#cb4b16',
    success: '#859900',
    warning: '#b58900',
    muted: '#586e75',
    dim: '#073642',
  },
};

function buildCSS(theme) {
  return `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: ${theme.bg};
      padding: 24px 28px;
      font-family: 'Menlo', 'Monaco', 'Courier New', 'Consolas', monospace;
      font-size: 13px;
      line-height: 1.65;
      color: ${theme.fg};
      -webkit-font-smoothing: antialiased;
    }
    .cli-header {
      color: ${theme.header};
      margin-bottom: 4px;
      font-size: 12px;
    }
    .cli-separator {
      color: ${theme.dim};
      margin-bottom: 12px;
      font-size: 12px;
    }
    table { border-collapse: collapse; width: 100%; }
    th {
      color: ${theme.header};
      text-align: left;
      padding: 2px 16px 2px 0;
      font-weight: normal;
      white-space: nowrap;
    }
    td {
      padding: 2px 16px 2px 0;
      white-space: nowrap;
    }
    .c-dim { color: ${theme.dim}; }
    .c-muted { color: ${theme.muted}; }
    .c-fg { color: ${theme.fg}; }
    .c-header { color: ${theme.header}; }
    .c-accent { color: ${theme.accent}; }
    .c-highlight { color: ${theme.highlight}; }
    .c-success { color: ${theme.success}; }
    .c-warning { color: ${theme.warning}; }
    .c-bold { font-weight: bold; }
    .c-italic { font-style: italic; }
    .c-comment { color: ${theme.muted}; font-style: italic; }
    pre {
      margin: 8px 0;
      white-space: pre;
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
    }
    .prompt { color: ${theme.success}; }
    .prompt .dollar { color: ${theme.muted}; }
  `;
}

/**
 * Render CLI content as a PNG image.
 *
 * @param {object} opts
 * @param {string} opts.outputPath  - Where to save the PNG
 * @param {string} opts.html        - Full HTML body content (pre-styled with CSS classes)
 * @param {string} [opts.theme]     - Theme name (default: 'tokyo-night')
 * @param {number} [opts.width]     - Viewport width (default: 800)
 * @param {number} [opts.scale]     - Device scale factor (default: 2)
 * @param {number} [opts.padding]   - Body padding in px (default: 24)
 */
export async function render(opts) {
  const {
    outputPath,
    html,
    theme = 'tokyo-night',
    width = 800,
    scale = 2,
    padding = 24,
  } = opts;

  const colors = THEMES[theme] || THEMES['tokyo-night'];
  const css = buildCSS(colors);
  const paddingStr = `${padding}px ${padding + 4}px`;

  const fullHtml = `<!DOCTYPE html><html><head><style>${css}body{padding:${paddingStr}}</style></head><body>${html}</body></html>`;

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width, height: 600, deviceScaleFactor: scale });
  await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

  const body = await page.$('body');
  await body.screenshot({ path: outputPath });

  await browser.close();
  return outputPath;
}

export { THEMES };
