---
name: illustrate-cli
description: "Generate CLI-style PNG images from structured data. Use when the user wants to create terminal-looking tables, command output visualizations, or any data rendered as a CLI screenshot. Triggers on: 'make a table image', 'render as CLI', 'terminal style table', 'screenshot of table', 'CLI visualization', 'illustrate this data', or when user wants to turn tabular data or command output into a shareable image. Also use when creating images for blog posts or articles that show benchmark results, comparison tables, or structured data in terminal style."
---

# illustrate-cli

Render structured data as CLI-style PNG images. Terminal aesthetics, high DPI, zero effort.

## How it works

The skill has a bundled script (`scripts/render.mjs`) that uses puppeteer to screenshot HTML styled as terminal output. You write the HTML body using the CSS classes below, the script handles the rest.

## Workflow

1. **Gather the data** — tables, command output, metrics, whatever the user needs visualized
2. **Write the HTML body** using the CSS classes documented below
3. **Write a small runner script** that imports `render.mjs` and calls `render()` with your HTML
4. **Run it** with node — outputs a PNG to the specified path
5. **Show the user** the result, iterate if needed

## Available themes

| Theme | Style |
|-------|-------|
| `tokyo-night` | Blue/purple tones, easy on the eyes (default) |
| `dracula` | Purple/pink accents, popular dark theme |
| `catppuccin` | Warm pastels on dark, modern |
| `gruvbox` | Earthy warm tones, retro feel |
| `solarized` | Classic solarized dark |

## CSS classes

Use these classes in your HTML to style content. They map to theme colors automatically.

### Text colors
- `.c-dim` — dimmed/hidden text (separator lines, dashes)
- `.c-muted` — secondary text (types, labels, metadata)
- `.c-fg` — default foreground
- `.c-header` — headers, column names, prompts (blue-ish)
- `.c-accent` — important values, alerts (red/pink)
- `.c-highlight` — highlighted rows or key items (orange)
- `.c-success` — positive values, "pass" indicators (green)
- `.c-warning` — notable values, gold/amber (yellow)

### Text styles
- `.c-bold` — bold weight
- `.c-italic` — italic
- `.c-comment` — code comments (muted + italic)

### Structural helpers
- `.cli-header` — styled like a terminal prompt line (`$ cat file.txt`)
- `.cli-separator` — dim separator line between header and content
- `.prompt` — command prompt styling (green text)
- `pre` — preformatted code blocks
- Standard `<table>`, `<tr>`, `<td>`, `<th>` — unstyled tables that inherit theme colors

## Building a table

The most common use case. Structure it like this:

```html
<div class="cli-header">$ cat results/summary.txt</div>
<div class="cli-separator">────────────────────────────────────</div>

<table>
  <!-- Header row -->
  <tr>
    <td class="c-muted">Column A</td>
    <td class="c-muted">Column B</td>
    <td class="c-muted">Column C</td>
  </tr>
  <!-- Separator row (optional, for CLI feel) -->
  <tr>
    <td class="c-dim">────────</td>
    <td class="c-dim">────────</td>
    <td class="c-dim">────────</td>
  </tr>
  <!-- Data rows -->
  <tr>
    <td class="c-fg">Row value</td>
    <td class="c-success">99.1%</td>
    <td class="c-warning">highlighted</td>
  </tr>
  <!-- Use c-highlight on a cell to call attention -->
  <tr>
    <td class="c-highlight c-bold">Important row</td>
    <td class="c-accent">42.0%</td>
    <td class="c-dim">–</td>
  </tr>
</table>

<div style="margin-top: 14px;" class="c-comment">
  // footnote or context line
</div>
```

## Runner script pattern

Create a `.mjs` file that imports the render script and builds the HTML:

```javascript
import { render } from '/Users/nikola/.claude/skills/illustrate-cli/scripts/render.mjs';

const html = `
<div class="cli-header">$ your-command --here</div>
<div class="cli-separator">────────────────────────────────────</div>

<table>
  <tr>
    <td class="c-muted">Name</td>
    <td class="c-muted">Score</td>
  </tr>
  <tr>
    <td class="c-dim">──────</td>
    <td class="c-dim">──────</td>
  </tr>
  <tr>
    <td class="c-fg">Model A</td>
    <td class="c-success">85.2%</td>
  </tr>
</table>
`;

await render({
  outputPath: '/path/to/output.png',
  html,
  theme: 'tokyo-night',  // optional, default
  width: 800,             // optional, default
  scale: 2,               // optional, default (2x DPI)
});
```

Then run: `node /path/to/runner.mjs`

## Tips

- Keep it dense. CLI output is information-dense — that's the aesthetic.
- Use `.c-dim` for dashes and placeholder values (looks like `–` in terminals).
- Header row + dash separator row is the most CLI-authentic table pattern.
- Add a `// comment` footer with context (task count, date, methodology note).
- The `.cli-header` line at the top makes it feel like a real terminal. Use something like `$ cat file.txt` or `$ ./benchmark --results`.
- For non-table content (command output, logs), use `<pre>` blocks with `.c-*` classes on `<span>` elements inside.
- Width auto-adjusts to content height. Set `width` wide enough for your widest row.
