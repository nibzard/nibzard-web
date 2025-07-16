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

## Adding New Log Articles

### Process for adding new articles to the log:

1. **Create new article file**:
   - Location: `/src/content/log/`
   - Filename: Use kebab-case (e.g., `ssh-tunnel-cloudflare.md`)
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
   - Individual URL: `/{slug}` (e.g., `/ssh-tunnel-cloudflare`)
   - Listed in log index: `/log/`