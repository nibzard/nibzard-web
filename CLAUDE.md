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