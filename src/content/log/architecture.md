---
title: "Serving Humans and AI: The Architecture of Content Negotiation"
description: "How I built a dual-format content delivery system that serves the same markdown content to both humans and AI agents with no hidden restrictions."
tldr: "My site serves identical content in HTML for humans and markdown for AI agents, with no hidden content, excellent crawlability, and smart content negotiation based on Accept headers."
date: 2025-10-25
tags: [HUMAN, ARCHITECTURE, AI, WEBDEV]
draft: false
author: "Nikola Balić"
topics: [Content negotiation, dual-format delivery, AI-friendly web architecture, content strategy]
entities: [Astro, content delivery, HTTP headers, SEO optimization]
answers_questions:
  - How can you serve the same content to both humans and AI agents effectively?
  - What's the best architecture for AI-friendly content delivery?
  - Why content negotiation matters for modern web development?
  - How to maintain content parity across different formats?
---

I was staring at my server logs, watching as AI agents crawled my site alongside human visitors. They were all getting the same content, but they were consuming it differently. Humans wanted rich HTML with interactive components. AI agents wanted clean markdown they could parse efficiently.

That's when I realized: content delivery architecture needed an upgrade for the AI era.

## The Problem With Traditional Content Delivery

Most websites today make a fundamental mistake: they optimize content for one audience and hope others adapt. Either you serve beautiful HTML for humans (making AI parsing difficult) or you serve plain text for machines (making the human experience sterile).

But what if you could serve the perfect format for each audience while maintaining complete content parity?

No hidden content. No restricted endpoints. No cloaking. Just smart delivery based on what each visitor actually needs.

## The Dual-Format Solution

My solution was surprisingly simple: serve the same underlying content in two different formats, letting each audience choose what works best for them.

### HTML Version: The Human Experience

When you visit `/some-article`, you get:

- Rich HTML with CSS styling and JavaScript interactions
- Copy markdown button for developers who want to share
- Continue reading section with 2 random related posts
- Author bio with social links and newsletter signup
- Interactive animated tags and smooth transitions
- Beautiful typography and responsive design

Everything you'd expect from a modern web experience.

### Markdown Version: The AI Experience

When an AI agent requests `/some-article.md` or sends an `Accept: text/markdown` header, it gets:

- Raw markdown with a 23-line AI metadata header
- Academic citation format for proper attribution
- Navigation structure and related posts
- Author contact information
- License and attribution details
- Clean, parseable content optimized for machine consumption

The underlying content is identical. Only the presentation changes.

## The Technical Architecture

### Content Organization

First, I structured everything as markdown files in organized collections:

```
/src/content/
├── log/          # Blog posts
├── thoughts/     # Quick insights
├── now/          # Current projects
├── images/       # Visual content
└── idea/         # Brainstorming
```

Each file includes rich metadata: title, description, date, tags, tldr, author, and update dates. Draft entries are automatically filtered from all public views.

### The Middleware Magic

The secret sauce is in the middleware (`src/middleware.ts`). It analyzes each request and decides the best format:

```typescript
const prefersMarkdown = isMdUrl ||
                        ((plainIndex !== -1 || markdownIndex !== -1) &&
                         (htmlIndex === -1 ||
                          (plainIndex !== -1 && plainIndex < htmlIndex) ||
                          (markdownIndex !== -1 && markdownIndex < htmlIndex)));
```

It looks at three things:
1. URL pattern (`.md` extension)
2. `Accept` header preferences
3. Priority ordering if multiple formats are requested

### Content Loading and Filtering

All content queries exclude draft entries automatically:

```typescript
const posts = await getCollection('log', ({ data }) => {
  return !data.draft;
});
```

This ensures consistency across all endpoints - no content accidentally slips through.

## Accessibility and Crawlability: No Hidden Content

Here's the crucial principle: **everything is discoverable**.

- HTML content: All `/{slug}` URLs with rich formatting
- Markdown content: Direct access via `/{slug}.md` URLs
- Content negotiation: Automatic format detection
- Collection pages: `/log/`, `/tags/`, `/now/`, etc.
- Structured data: `/llms.txt`, `/llms-full.txt`, `/rss.xml`
- API endpoints: `/api/raw/[slug]`, `/api/og/[slug]`

No authentication. No cloaking. No user agent discrimination. Format based on capabilities, not identity.

## SEO Implementation: Both Formats Canonicalized

Both HTML and markdown versions declare the HTML version as canonical:

```html
<link rel="canonical" href="https://nibzard.com/some-article">
```

This tells search engines which version to index while still allowing AI agents to access the markdown format directly.

The sitemap includes all content, robots.txt is permissive (`Allow: /`), and structured data includes both BlogPost and Breadcrumb schemas.

## Content Parity Analysis

The core content is identical across both formats:

| Format | Additional Content | Purpose |
|--------|-------------------|---------|
| HTML | Interactive UI components | Enhanced user experience |
| Markdown | AI metadata header | Machine-readable context |
| Both | Author info, navigation, related posts | Complete information access |

No content is restricted or hidden between formats. Every piece of information is available in both versions.

## Performance Optimization

The system includes smart caching:

- `Cache-Control: public, max-age=3600` for content
- `Vary: Accept` for proper content negotiation
- Build-time optimization with static generation
- Dynamic content negotiation at request time

This means fast delivery for humans and efficient parsing for AI agents.

## Standards Compliance

The implementation follows industry standards:

- HTTP Content Negotiation (RFC 7231)
- llms.txt specification for AI-friendly content
- RSS 2.0 for feed readers
- Schema.org for structured data
- Open Graph for social media

## Why This Matters for the AI Era

As AI agents become more sophisticated readers of web content, we need to rethink how we deliver information. The old model of "optimize for humans, let machines figure it out" is no longer sufficient.

AI agents need:
- Clean, parseable content
- Proper attribution and citations
- Context about the content and author
- Machine-readable metadata

Humans still need:
- Beautiful, engaging presentations
- Interactive elements and navigation
- Rich media and visual design
- Responsive, accessible experiences

My architecture delivers both without compromise.

## Lessons Learned

### Start With Content Parity

The most important principle is identical core content across all formats. Don't create different information for different audiences. Create different presentations of the same information.

### Be Explicit About Format Detection

Don't rely on user agent strings. Use standard HTTP mechanisms like Accept headers and URL patterns. This makes your system more predictable and standards-compliant.

### Think About Attribution

AI agents need to know who created content and how to cite it properly. The academic citation format and comprehensive metadata header make this straightforward.

### Don't Forget Performance

Content negotiation can add complexity, but it shouldn't slow down delivery. Proper caching headers and build-time optimization keep everything fast.

## The Future of Content Delivery

This architecture isn't just about serving AI agents today. It's about preparing for a future where content consumption is increasingly diverse and multi-format.

Imagine:
- Voice assistants requesting structured data
- AR/VR browsers needing spatial layouts
- Educational platforms wanting curriculum-aligned content
- Research tools requiring citation-ready formats

By building a flexible content negotiation system now, you're future-proofing your content delivery strategy.

## Getting Started

If you want to implement similar architecture:

1. **Organize content in structured collections** with rich metadata
2. **Implement content negotiation middleware** that respects HTTP standards
3. **Maintain content parity** across all formats
4. **Think about attribution and citations** for AI consumption
5. **Optimize for both discoverability and performance**

The code is all open source and the patterns are transferable to any static site generator or content management system.

## Beyond Technical Architecture

What's really interesting about this approach is how it changes the relationship between content creators and their audiences.

When you optimize for both humans and AI agents, you're forced to be more intentional about:
- Clear structure and organization
- Proper attribution and context
- Consistent information delivery
- Accessibility across different consumption methods

These aren't just technical improvements—they make your content better for everyone, regardless of how they're accessing it.

## The Human Element

At the end of the day, this is still about connecting with people. Whether they're reading your content directly through a browser or having an AI agent summarize it for them, the goal is the same: share valuable ideas and insights.

The architecture I've built removes the friction between these consumption methods. The same ideas, the same stories, the same insights—delivered in the format that works best for each reader, human or machine.

And isn't that what the web has always been about? Making information accessible to everyone, in whatever way they need to consume it.

The technology changes, but the mission stays the same.