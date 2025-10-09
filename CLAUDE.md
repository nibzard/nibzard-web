# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- `pnpm install`: Install dependencies
- `pnpm run dev`: Start development server at localhost:4321
- `pnpm run build`: Build production site to ./dist/
- `pnpm run preview`: Preview production build locally
- `pnpm run astro`: Run Astro CLI commands

## Code Style Guidelines
- **Framework**: Astro with React islands for animations
- **TypeScript**: Use strict type checking with strictNullChecks enabled
- **CSS**: Use CSS modules or scoped styles in Astro components
- **Naming**: Use kebab-case for filenames, camelCase for variables/functions, PascalCase for components
- **Components**: Keep components small and focused on a single responsibility
- **Animations**: Use Framer Motion for animations, keep them subtle
- **Formatting**: Follow Astro's default formatting guidelines
- **Layout**: Use CSS Grid and Flexbox for layouts, avoid absolute positioning
- **Colors/Typography**: Use CSS variables from variables.css for consistency
- **Error Handling**: Use try/catch blocks for async operations
- **Commits**: Write clear, concise commit messages describing changes

## Git Workflow
- Before pushing to git always test the build with: npm run build

## Performance Testing with Lighthouse

Use Lighthouse to audit site performance, accessibility, SEO, and best practices during development:

### Quick Setup
```bash
# One-time install
npm install -g lighthouse

# Start dev server (if not running)
pnpm run dev
```

### Running Audits
```bash
# Full audit with HTML report
lighthouse http://localhost:4321 \
  --output html --output-path ./lighthouse-report.html \
  --chrome-flags="--headless --no-sandbox --disable-gpu"

# Quick JSON scores only
lighthouse http://localhost:4321 \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=json --quiet

# Test production build (more accurate performance)
pnpm run build && pnpm run preview
lighthouse http://localhost:4322 --output html --output-path ./lighthouse-prod.html
```

### Performance Notes
- Development server results will show slower performance than production
- Focus on accessibility, SEO, and best practices during development
- Test production build (`pnpm run preview`) for accurate performance metrics
- Reports are saved as `lighthouse-report.html` in project root

## Adding New Log Articles

### Process for adding new articles to the log:

1. **Create new article file**:
   - Location: `/src/content/log/`
   - Filename: Use kebab-case with short, unique names (1-2 words max) for clean URLs and OG image generation (e.g., `vacuum.md`, `blink.md`, `theloop.md`)
   - Required frontmatter fields:
     - `title`: Main title (max 60 characters)
     - `description`: Brief description (max 130 characters)
     - `date`: Publication date (YYYY-MM-DD format)
     - `tags`: Array of tags (e.g., [CHEATSHEET, SSH, Security])
     - `draft`: Boolean, defaults to false
   - Optional frontmatter fields:
     - `tldr`: Brief summary (max 333 characters)
     - `author`: Defaults to "Nikola Balić"

2. **Git workflow**:
   - Stage the new article: `git add src/content/log/filename.md`
   - Commit with descriptive message following repository conventions
   - Push to remote: `git push origin main`

3. **Article will be available**:
   - Individual URL: `/{slug}` (e.g., `/vacuum`, `/blink`)
   - Listed in log index: `/log/`
   - Custom OG image: `/api/og/{slug}` (auto-generated)

## Mermaid Diagrams

This site supports Mermaid diagrams in markdown files. Mermaid diagrams are rendered as SVG graphics with proper styling and colors.

### Setup and Dependencies
- **Required packages**: `rehype-mermaid`, `playwright`
- **Playwright browsers**: Must be installed with `pnpm exec playwright install --with-deps chromium`
- **Configuration**: Already configured in `astro.config.mjs` with:
  - `excludeLangs: ['mermaid']` to prevent syntax highlighting interference
  - `rehype-mermaid` with `img-svg` strategy and dark mode support

### Usage in Markdown
```markdown
\`\`\`mermaid
graph TD
    A[Start] --> B[Process]
    B --> C[End]
\`\`\`
```

### Troubleshooting
- If Mermaid diagrams show as code blocks: Run `pnpm exec playwright install --with-deps chromium`
- If content is truncated after Mermaid blocks: Check that Playwright browsers are installed
- Mermaid blocks are processed during build time, not in the browser

## Style and Voice

When writing content for this site, follow these style guidelines:

### Writing Voice
- **Conversational & Direct**: Write as if having a conversation with the reader. Use "you" frequently and maintain a casual, approachable tone even with complex technical topics
- **Technical Depth Made Accessible**: Make highly technical topics (optimization algorithms, AI agents, mathematical concepts) intuitive through concrete examples and analogies
- **Narrative-Driven Structure**: Use story/journey formats ("Day 1, Day 2, Day 3"), build suspense gradually, and weave personal experience throughout
- **Authentic Voice**: Show vulnerability, admit failures, share thought processes and uncertainties. Be humorous and self-aware when appropriate
- **Practical Focus**: Emphasize real-world applications and lessons learned. Balance theory with practical implementation
- **Community-Oriented**: Reference and build on work by others, credit contributors, position as part of broader conversation

### Content Structure
- Start with a hook or provocative observation
- Use effective blockquotes for key insights
- Integrate code examples naturally into explanations
- Use personal anecdotes to illustrate larger points
- Go deep on technical details when warranted
- End with actionable insights or reflections

### Tone Guidelines
- Be knowledgeable without being pretentious
- Be detailed without being pedantic
- Be personal without being self-indulgent
- Make complex topics engaging and accessible to broader audiences while still satisfying technical experts
- Show passion and enthusiasm for the subject matter