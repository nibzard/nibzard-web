---
title: "Stop Using .md for AI Agent Instructions"
description: "Files ending in .md trigger automatic processing that breaks agent instruction files. Use dotfiles instead."
tldr: "Static site generators, formatters, and indexers treat .md files as content. Agent instruction files need dotfiles like .claude to avoid unwanted processing."
date: 2025-10-25
tags: [HUMAN, AI, TOOLS, ARCHITECTURE]
draft: false
author: "Nikola Balić"
topics: [AI agent configuration, file naming conventions, static site generators, development workflow]
entities: [Claude Code, Astro, markdown processors, formatters]
answers_questions:
  - Why shouldn't AI agent instruction files use .md extensions?
  - What problems do .md files cause in modern development stacks?
  - What's the alternative to .md for agent configuration files?
  - How do dotfiles solve the agent instruction problem?
---

I was staring at another build failure, this time with a particularly frustrating error:

```
[InvalidContentEntryDataError] log → claude data does not match collection schema.
  title: Required
  description: Required
  date: Required
  tags: Required
```

All I wanted was a simple instruction file for AI coding agents. A place to document how they should write new articles for my site. I created `CLAUDE.md` in my log folder, dropped in some guidelines, and suddenly my entire static site generator was treating it like a blog post.

This wasn't the first time I'd fought my tools over file naming. But this time, I realized the problem wasn't my tools—it was the `.md` extension itself.

## The Core Problem: .md Isn't Neutral

The moment you name a file `*.md`, you're not just creating a text file. You're sending a signal to every tool in your development stack:

**Static site generators** see content to be published. Astro, Next.js with MDX, Docusaurus, Jekyll—they all glob `**/*.md` by default and want to turn your instruction file into a web page.

**MDX compilers** see potential JSX to execute. In MDX contexts, `.md` can be treated as `.mdx`, meaning innocent code blocks get compiled and break builds.

**Formatters and linters** see prose to be rewritten. Prettier and markdownlint will reflow your code fences, change your quote styles, and generally make assumptions that break machine-readable instructions.

**IDEs and editors** see documentation to preview. They'll auto-render previews, add spellcheck underlines to technical terms, and generally treat your operational contracts as user-facing content.

**Search and indexing tools** see content to be discovered. GitHub search, documentation crawlers, and internal search engines will surface your agent instructions in search results.

**Package managers** see files to be included or excluded. Some packaging flows include `.md` by default, others transform them, creating unpredictable behavior across environments.

## What I Wanted vs What I Got

What I wanted was simple:
- Folder-specific rules for AI agents
- One instruction file per package when needed
- Predictable discovery (nearest file wins)
- Human-readable for code review
- Zero automatic processing or publication

What I got was a cascade of build failures, content validation errors, and the need to fight my tools at every turn.

The problem is that `.md` carries implicit assumptions. It says "I'm content meant for humans to read, format, and publish." But AI agent instruction files are operational contracts. They're meant for machines to execute, not for humans to consume as content.

## The Breakage Pattern

Here's exactly what happened when I added `CLAUDE.md` to my Astro project:

1. **Content collection validation failed**: Astro's content collections automatically picked up `CLAUDE.md` and tried to validate it against my blog post schema
2. **Build errors**: The missing required frontmatter fields (title, description, date, tags) caused the build to crash
3. **Indexing attempts**: Astro tried to generate a page at `/claude` and include it in my sitemap
4. **Search indexing**: The file would have been included in my site search if I hadn't filtered it out

I tried fighting this with exclude globs, schema loopholes, and slug filters. Each solution was brittle, surprising for collaborators, and spread conditional logic across multiple files. The contract became fuzzy, and new tools would inevitably miss my custom exclusions.

## The Simple Solution: Dotfiles

The cleanest solution is also the most obvious: stop using `.md` for agent instruction files.

Use dotfiles with clear names:
- `.claude` for Claude-specific instructions
- `.agents` for general agent rules
- `.ai` for AI workflow guidelines

The benefits are immediate:

**Automatic exclusion**: Most glob patterns (`**/*.md`) skip dotfiles by default, which means static site generators, formatters, and other tools won't accidentally process your instruction files.

**Clear intent**: The filename itself communicates purpose. `.claude` says "this is for Claude agents," not "this is a blog post."

**Human-readable**: You still get Markdown syntax highlighting in editors and can read the files easily during code review.

**Predictable behavior**: No custom exclude patterns, no conditional logic, no fighting your tools.

## Implementation Details

Here's what this looks like in practice:

### File Structure
```
src/
├── content/
│   ├── log/
│   │   ├── article1.md
│   │   ├── article2.md
│   │   └── .claude          # Agent instructions (not published)
│   └── components/
│       ├── button.astro
│       └── .claude          # Component-specific instructions
```

### Ignore Patterns
Add to your `.gitignore` or build ignore patterns:
```
**/.claude
**/.agents
**/.ai
```

### Editor Configuration
For VS Code, add to your settings:
```json
{
  "files.associations": {
    ".claude": "markdown",
    ".agents": "markdown",
    ".ai": "markdown"
  }
}
```

This gives you full Markdown syntax highlighting without triggering any of the automatic processing behaviors.

## Why Not Other Extensions?

You might wonder why not use `.txt` or some other neutral extension.

**`.txt` is too generic**: It's difficult to target in ignore patterns and doesn't communicate purpose. Tools might still try to process it, and it lacks the semantic clarity of a purpose-built filename.

**Custom extensions** require configuration**: You'd need to teach every tool about your custom extension, which defeats the purpose of avoiding configuration.

**Dotfiles are universally understood**: Almost every development tool recognizes that dotfiles are meant for configuration and should be left alone by default.

## The Broader Principle

This isn't just about AI agent files. The same logic applies to any operational file that shouldn't be treated as content:

- `README.md` files in subdirectories can trigger the same problems
- Configuration files that happen to be Markdown
- Technical documentation that's meant for reference, not publication
- Build scripts or deployment instructions in Markdown format

The key insight is that **file extensions carry intent**. `.md` says "publish me," while `.claude` says "execute these instructions."

## What I Learned

This experience taught me something important about modern development: we're not just writing code anymore, we're configuring complex toolchains. File naming isn't just about organization—it's about communicating intent to both humans and machines.

When I renamed `CLAUDE.md` to `.claude`, the build errors disappeared. No more schema validation, no more exclude patterns, no more fighting my tools. The file became what it was meant to be: operational instructions for AI agents, not content for human consumption.

Sometimes the best solution isn't to add more configuration or workarounds. It's to align with the conventions your tools already understand.

## Bottom Line

`.md` is not a neutral container for text. It's a signal that triggers a cascade of automatic processing: publishing, formatting, compiling, and indexing.

AI agent instruction files need the opposite. They should be predictable, stable, and left alone by default.

Give them a distinct filename or use a dotfile. Keep the content readable and Markdown-like for editors, but let the filename communicate their true purpose. Your tools will thank you, your builds will be more reliable, and your AI agents will have clear, unambiguous instructions to follow.