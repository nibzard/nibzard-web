# nibzard - Minimalist Personal Site

A clean, elegant personal site and blog built with Astro.

## 🚀 Quick Start

```bash
pnpm install      # Install dependencies
pnpm run dev      # Start dev server at localhost:4321
pnpm run build    # Build production site to ./dist/
```

## Project Structure

```text
src/
├── content/          # Content collections
│   ├── log/          # Blog articles
│   ├── thoughts/     # Short-form thoughts
│   ├── now/          # "Now" page entries
│   ├── images/       # Image posts
│   └── idea/         # Product/service ideas
├── pages/            # Routes
├── components/       # Reusable UI components
├── layouts/          # Page layouts
└── styles/           # CSS
```

## Content Types

| Type | Description |
|------|-------------|
| **Log** | Full articles with title, description, tags, TLDR |
| **Thoughts** | Quick insights and observations |
| **Now** | Current activities and status updates |
| **Images** | Visual content with captions |
| **Ideas** | Product/service concepts |

## Pages

- `/` - Homepage
- `/about` - About me
- `/bio` - Biography
- `/cv` - CV/Resume
- `/projects` - Project showcase
- `/log` - Blog articles
- `/now` - Current focus
- `/search` - Full-text search
- `/elements` - UI component showcase

## Tech Stack

- **Framework**: [Astro](https://astro.build) v5.17
- **UI**: [React](https://react.dev) v19 + [Framer Motion](https://www.framer.com/motion/)
- **CSS**: [Pico CSS](https://picocss.com) v2
- **Search**: [Fuse.js](https://fusejs.io)
- **Email**: [Resend](https://resend.com)
- **Deployment**: [Vercel](https://vercel.com)

## Commands

| Command | Action |
|---------|--------|
| `pnpm install` | Install dependencies |
| `pnpm run dev` | Start dev server at `localhost:4321` |
| `pnpm run build` | Build to `./dist/` |
| `pnpm run preview` | Preview production build |
| `pnpm run validate:schema` | Validate content schemas |

## AI-Friendly Content

The site serves markdown to AI agents via content negotiation:

```bash
# HTML for browsers
curl https://nibzard.com/article-slug

# Markdown for AI agents
curl -H "Accept: text/markdown" https://nibzard.com/article-slug
curl https://nibzard.com/article-slug.md
```

Benefits: 10x token reduction, same URL, SEO-friendly canonical links.

## AI Agent Files

- `AGENTS.md` - Instructions for AI assistants (CLAUDE.md is a symlink)
- `LESSONS_LEARNED.md` - Knowledge base of solutions and insights
