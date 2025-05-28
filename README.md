# nibzard - Minimalist Personal Site

A clean, elegant personal site and blog built with Astro. Features a minimalist design with a focus on readability and content.

## Features

- ✅ Clean, minimalist design with elegant typography
- ✅ Component-based CSS architecture with Pico CSS framework
- ✅ Responsive layout that works on all devices
- ✅ Multiple content types: log/blog, thoughts, now page, and images
- ✅ Tag-based content filtering and organization
- ✅ Full-text search functionality with Fuse.js
- ✅ Optimized for performance with Astro's static generation
- ✅ SEO-friendly with sitemap and RSS feed generation
- ✅ Markdown & MDX support for content
- ✅ Server-side rendering with Vercel adapter
- ✅ React integration for interactive components
- ✅ Comprehensive UI component library
- ✅ Email subscription/unsubscription functionality

## 🚀 Project Structure

The project follows a well-organized structure:

```text
├── public/               # Static assets (images, fonts, etc.)
├── src/
│   ├── actions/          # Server actions for form handling
│   ├── components/       # Reusable UI components
│   ├── config/           # Configuration files
│   ├── content/          # Content collections
│   │   ├── log/          # Blog/log entries (Markdown/MDX)
│   │   ├── thoughts/     # Thought entries
│   │   ├── now/          # "Now" page content
│   │   ├── images/       # Image content
│   │   └── config.ts     # Content collection schemas
│   ├── layouts/          # Layout templates
│   ├── pages/            # Page routes
│   │   ├── api/          # API endpoints
│   │   ├── log/          # Log pages
│   │   ├── tags/         # Tag filtering pages
│   │   ├── index.astro   # Homepage
│   │   ├── about.astro   # About page
│   │   ├── search.astro  # Search page
│   │   ├── elements.astro # UI component showcase
│   │   ├── now.astro     # Current activities page
│   │   └── [...slug].astro # Dynamic content pages
│   ├── plugins/          # Custom Astro plugins
│   ├── styles/           # CSS styles
│   ├── utils/            # Utility functions
│   └── consts.ts         # Site constants
├── astro.config.mjs      # Astro configuration
├── package.json          # Dependencies and scripts
└── README.md
```

### Key Features

- **Content Collections**: Four distinct content types (log, thoughts, now, images) with TypeScript schemas
- **Component-Based Architecture**: Reusable Astro and React components for consistent UI
- **Search Functionality**: Full-text search across content using Fuse.js
- **Modular Styling**: Built on Pico CSS framework with custom component styles
- **Server-Side Rendering**: Deployed on Vercel with server adapter for dynamic functionality
- **SEO Optimization**: Automatic sitemap generation, RSS feeds, and meta tags

### Content Types

The site supports multiple content types through Astro's content collections:

- **Log**: Blog posts with title, description, TLDR, date, tags, and draft status
- **Thoughts**: Short-form content with date and draft status
- **Now**: Current activities and status updates
- **Images**: Image-based content with URLs and metadata

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                    | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm run build`           | Build your production site to `./dist/`          |
| `pnpm run preview`         | Preview your build locally, before deploying     |
| `pnpm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

*Note: This project uses pnpm as the package manager. You can also use npm or yarn with the equivalent commands.*

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build) v5.8.0
- **UI Library**: [React](https://react.dev) v19.1.0 for interactive components
- **CSS Framework**: [Pico CSS](https://picocss.com) v2.1.1 for minimal styling
- **Search**: [Fuse.js](https://fusejs.io) v7.1.0 for fuzzy search
- **Animations**: [Framer Motion](https://www.framer.com/motion/) v12.10.2
- **Email**: [Resend](https://resend.com) v4.5.1 for email functionality
- **Deployment**: [Vercel](https://vercel.com) with server adapter
- **Content**: Markdown/MDX with content collections

## 📄 Pages

The site includes the following main pages:

- **Homepage** (`/`): Landing page with recent content
- **About** (`/about`): Personal information and background
- **Log** (`/log`): Blog posts and articles
- **Search** (`/search`): Full-text search across all content
- **Now** (`/now`): Current activities and status
- **Elements** (`/elements`): UI component showcase and style guide
- **Tags** (`/tags/*`): Tag-based content filtering

## UI Components

The site includes a comprehensive set of UI components that can be viewed on the `/elements` page. These components include:

- **Typography**: Headings, paragraphs, links, and other text elements
- **Buttons**: Primary, secondary, and text buttons
- **Cards**: Simple content containers
- **Tags**: For categorizing content
- **Alerts**: For displaying messages to users
- **Forms**: Input fields, labels, and buttons
- **Tables**: For displaying tabular data
- **Search**: Interactive search component with real-time results

## 🚀 Deployment

The site is configured for deployment on Vercel with server-side rendering enabled. The configuration includes:

- Server adapter for dynamic functionality
- Automatic sitemap generation
- RSS feed generation
- External link processing

## 👀 Want to learn more?

Check out [Astro's documentation](https://docs.astro.build) or join their [Discord server](https://astro.build/chat).

## Credit

This site is built from scratch using Astro with a focus on minimalist design and optimal performance.
