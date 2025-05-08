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
│       ├── components/   # Component-specific styles
│       │   ├── elements.css  # UI elements showcase styles
│       │   ├── log-entry.css # Log entry styles
│       │   └── tags.css      # Tag component styles
│       ├── main.css      # Main CSS file that imports all styles
│       └── variables.css # CSS variables for theming
├── astro.config.mjs
├── README.md
└── package.json
```

### Key Features

- **Component-Based Architecture**: Reusable components like `LogItem.astro` for consistent UI
- **CSS Organization**: Modular CSS files organized by component
- **Content Collections**: Markdown/MDX content organized in collections
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Design System**: Consistent design tokens via CSS variables

### Style System

The project uses a comprehensive style system with:

- **CSS Variables**: For colors, spacing, typography, and more
- **Component Styles**: Each component has its own CSS file
- **Utility Classes**: Common utility classes for spacing, typography, etc.
- **Responsive Breakpoints**: Mobile-first media queries

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## UI Components

The site includes a comprehensive set of UI components that can be viewed on the `/elements` page. These components include:

- **Typography**: Headings, paragraphs, links, and other text elements
- **Buttons**: Primary, secondary, and text buttons
- **Cards**: Simple content containers
- **Tags**: For categorizing content
- **Alerts**: For displaying messages to users
- **Forms**: Input fields, labels, and buttons
- **Tables**: For displaying tabular data
- **Log Items**: For displaying log entries

## 👀 Want to learn more?

Check out [Astro's documentation](https://docs.astro.build) or join their [Discord server](https://astro.build/chat).

## Credit

This theme is based on the Astro blog template with significant customizations for a minimalist aesthetic.
