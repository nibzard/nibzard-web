# AGENT.md - Guidance for AI coding agents

## Commands
- `pnpm install`: Install dependencies
- `pnpm run dev`: Start development server (localhost:4321)
- `pnpm run build`: Build production site
- `pnpm run preview`: Preview production build
- `pnpm run astro`: Run Astro CLI commands

## Code Guidelines
- **Framework**: Astro with React islands for animations
- **TypeScript**: Strict type checking with strictNullChecks
- **Component Structure**: Keep components small and focused
- **Styling**: CSS modules or scoped styles in Astro components
- **Naming**: kebab-case for files, camelCase for variables/functions, PascalCase for components
- **Layout**: CSS Grid and Flexbox, avoid absolute positioning
- **UI**: Use variables from variables.css for colors/typography
- **Animations**: Framer Motion (keep subtle)
- **Error Handling**: try/catch for async operations
- **UI Elements**: Always reference `src/pages/elements.astro` when creating new pages or components to maintain consistency

## File Organization
- `/src/components/`: Reusable UI components
- `/src/pages/`: Astro page components
- `/src/layouts/`: Page layout templates
- `/src/styles/`: Global styles and CSS variables