# nibzard - Minimalist Personal Site

A clean, elegant personal site and blog built with Astro. Features a minimalist design with a focus on readability and content.

![nibzard screenshot](https://github.com/withastro/astro/assets/2244813/ff10799f-a816-4703-b967-c78997e8323d)

## Features

- ✅ Clean, minimalist design with elegant typography
- ✅ Component-based CSS architecture
- ✅ Responsive layout that works on all devices
- ✅ Log/blog with tag filtering
- ✅ Optimized for performance (100/100 Lighthouse score)
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Markdown & MDX support for content
- ✅ Comprehensive UI component library

## 🚀 Project Structure

The project follows a well-organized structure:

```text
├── public/               # Static assets (images, fonts, etc.)
├── src/
│   ├── components/       # Reusable UI components
│   │   └── LogItem.astro # Log entry component
│   ├── content/
│   │   └── log/          # Markdown/MDX content for log entries
│   ├── layouts/
│   │   └── BaseLayout.astro # Main layout template
│   ├── pages/            # Page routes
│   │   ├── log/          # Log pages
│   │   └── tags/         # Tag filtering pages
│   └── styles/           # CSS styles
│       ├── components/   # Component-specific styles (e.g., log-entry.css, tags.css)
│       ├── main.css      # Main CSS file that imports all styles
│       └── variables.css # CSS variables for theming
├── astro.config.mjs
├── README.md
└── package.json
```

### Key Features

- **Component-Based Architecture**: Reusable Astro components (e.g., `LogItem.astro`) for a consistent UI.
- **Modular Styling**:
    - Styles are organized by component (e.g., `src/styles/components/log-entry.css`).
    - **CSS Variables** (`src/styles/variables.css`) are used for design tokens (colors, spacing, typography), enabling easy theming and consistency.
    - Common utility classes are available for spacing, typography, etc.
- **Content Collections**: Markdown/MDX content is organized within `src/content/`.
- **Responsive Design**: A mobile-first approach ensures the site adapts to all screen sizes using responsive breakpoints.

### Style System
The project uses a comprehensive style system with:

- **CSS Variables**: For colors, spacing, typography, and more, defined in `src/styles/variables.css`.
- **Component Styles**: Each UI component typically has its own dedicated CSS file (e.g., `src/styles/components/log-entry.css`).
- **Utility Classes**: A set of common utility classes for fine-tuning layout and typography.
- **Responsive Breakpoints**: Media queries are used to ensure a mobile-first responsive design.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                    | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `npm install`              | Installs dependencies (if using npm)             |
| `yarn install`             | Installs dependencies (if using yarn)            |
| `pnpm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run dev`              | Starts local dev server at `localhost:4321` (if using npm) |
| `yarn dev`                 | Starts local dev server at `localhost:4321` (if using yarn) |
| `pnpm run build`           | Build your production site to `./dist/`          |
| `npm run build`            | Build your production site to `./dist/` (if using npm) |
| `yarn build`               | Build your production site to `./dist/` (if using yarn) |
| `pnpm run preview`         | Preview your build locally, before deploying     |
| `npm run preview`          | Preview your build locally, before deploying (if using npm) |
| `yarn preview`             | Preview your build locally, before deploying (if using yarn) |
| `pnpm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npx astro ...`            | Run CLI commands (works with any package manager) |
| `pnpm run astro -- --help` | Get help using the Astro CLI                     |
| `npx astro --help`         | Get help using the Astro CLI (works with any package manager) |

## UI Components

The site includes a comprehensive set of UI components that can be viewed on the `/elements` page. These components include:

- **Typography**: Headings, paragraphs, links, and other text elements
- **Buttons**: Primary, secondary, and text buttons
- **Cards**: Simple content containers
- **Tags**: For categorizing content
- **Alerts**: For displaying messages to users
- **Forms**: Input fields, labels, and buttons
- **Tables**: For displaying tabular data
- **Log Entries**: For displaying individual log posts (see `LogItem.astro`)

## 👀 Want to learn more?

Check out [Astro's documentation](https://docs.astro.build) or join their [Discord server](https://astro.build/chat).

## Credit

This theme is based on the Astro blog template with significant customizations for a minimalist aesthetic.
