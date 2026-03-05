---
name: now-writer
description: Create "now" page entries showing current focus areas. Use when the user says "create a now post", "update my now page", "write about what I'm doing now", "now entry", "current status update", or wants to document what they're focused on right now. Triggers for periodic life updates with multiple focus areas.
allowed-tools:
  - Write
  - Read
  - Bash
---

# Now Page Writer

This skill creates entries for the `/now` page - a "what I'm doing now" page inspired by [nownownow.com](https://nownownow.com/about).

## File Location

Create new entries in: `src/content/now/`

## Filename Format

Use the format `YYMMDD.md` where:
- `YY` = 2-digit year (e.g., `25` for 2025, `26` for 2026)
- `MM` = 2-digit month (e.g., `01`, `12`)
- `DD` = 2-digit day (e.g., `05`, `31`)

Example: `260305.md` for March 5, 2026

**Duplicate dates**: If a file with today's date already exists, append a suffix: `260305b.md`, `260305c.md`, etc.

## Frontmatter Schema

```yaml
---
date: YYYY-MM-DD
draft: false  # optional, defaults to false
author: Nikola Balić  # optional, defaults to Nikola Balić
---
```

The `date` field is **required** and must be in ISO format (YYYY-MM-DD).

## Content Format

Use markdown with `##` headings to organize different areas of focus:

```markdown
## Section Title

Your content here. Write in a conversational, direct voice. Be authentic and show what's genuinely on your mind.
```

## Style Guidelines

- **Conversational tone**: Write as if talking to a friend
- **Multiple sections**: Use `##` headings for different topics (work, personal, learning, etc.)
- **Authentic voice**: Share real thoughts, uncertainties, and reflections
- **Present tense**: Focus on what's happening NOW, not past achievements
- **Brief updates**: Each section should be 1-3 paragraphs
- **Be specific**: Include concrete progress, blockers, and next steps

## When to Create a New Entry

Create a new now entry when:
- Your major focus areas have shifted significantly
- It's been 2-4 weeks since your last entry
- You're starting a new chapter (job, project, life change)
- You want to capture a snapshot of your current state

## Example Entry

```markdown
---
date: 2026-03-05
---

## Product Work

I am currently shipping a new skill and testing it against three real repos. The evaluation framework is coming together nicely.

## Research

I am validating how different models handle failure states in long-running loops. Early results are surprising.

## Notes

I'm spending more time on instrumentation than prompts now. The meta-game is real.
```

## How It Works

1. The `/now` page automatically shows the **most recent** entry (sorted by date)
2. Old entries remain in the directory but aren't displayed on the main page
3. The page renders with "What I'm Currently Focused On" header and "Last updated" timestamp

## Process

1. Check if today's file already exists in `src/content/now/`
2. Determine filename (append suffix if duplicate)
3. Ask the user what they'd like to share about their current focus
4. Draft the content with appropriate sections
5. Create the file in `src/content/now/`
6. Confirm creation with the user
