---
name: article-writer
description: "Create or revise nibzard.com log articles and blog posts in the site's voice. Use for full articles; use the dedicated skills for thoughts, ideas, images, and now entries."
allowed-tools: Write Read Bash
---

# Article Writer

Produce an article grounded in the user's material, with nibzard.com's conversational voice and valid site metadata. Match the requested scope: an outline, chat draft, local article, revision, or publication.

## Choose the work

- For a new site article, write `src/content/log/<slug>.md`. Use a unique, short kebab-case slug (one or two words); it becomes the root URL `/<slug>`.
- For revisions, edit the existing file and preserve its slug, publication date, metadata, and argument unless the requested change requires otherwise. Use `updated` for a substantive update when appropriate.
- For an outline or chat-only draft, deliver that format without creating a repository file or running a site build.
- Use the supplied topic, audience, notes, and desired length. Ask only for missing information that materially affects the article; continue work that does not depend on the answer.

Repository paths below are relative to the project root, not this skill's folder. Run project commands from that root. Inspect the working tree before editing so unrelated work remains intact.

## Voice and evidence

Write like an experienced colleague explaining something worth learning: direct, personal when supported, technically precise, and comfortable with uncertainty. Open with a concrete observation or problem. Explain unfamiliar concepts through examples before abstraction, and connect the technical detail to its practical consequence.

Choose a structure that fits the material. A journey works for an actual sequence of experiments; an argument or tutorial need not become a day-by-day story. Let length follow the requested depth. Avoid padding, forced vulnerability, generic AI enthusiasm, and repeated conclusions.

For a new article or substantial voice revision, read one or two relevant examples from `src/content/log/`:

- `theloop.md`: a short, focused insight.
- `agent-experience.md`: practical technical explanation.
- `vacuum.md`: personal opinion.
- `2025-year-in-review.md`: a longer narrative.

Use these for voice, not as evidence for current technical claims. A narrow correction usually needs only the target article and its relevant sources.

Preserve the author's supplied experiences and perspective. Do not invent first-person experiments, customer conversations, failures, measurements, or quotations to make the prose personal. Ask for essential missing experiences or frame examples explicitly as hypothetical. Distinguish sourced facts, the author's interpretation, and open questions.

For current, disputed, or unfamiliar technical claims, research primary sources and read the supporting material. Link claims and quotations directly to their sources in the article; verify dates, versions, benchmark conditions, and attribution. If evidence is unavailable, qualify or omit the claim rather than implying verification. Credit the people and projects whose work the article builds on.

## Site metadata

Check `src/content.config.ts` when creating or changing frontmatter; it is the schema source of truth. The schema accepts sparse log entries, but complete articles should include a title, description, date, tags, and explicit draft state.

Starting shape for a new article awaiting review (replace example values):

```yaml
---
title: "A concrete article title"
description: "The central point and why it matters."
date: 2026-09-30
tags: [AI, AGENTS]
draft: true
---
```

- Keep `title` within 60 characters, `description` within 130, and optional `tldr` within 333. Quote prose values safely in YAML.
- Use the requested publication date, otherwise today's date, in unquoted `YYYY-MM-DD` form. Preserve the original date on revisions.
- Use relevant uppercase tags as the article convention. Keep `tags`, `topics`, `entities`, and `answers_questions` as YAML arrays; do not escape their brackets or underscores as Markdown.
- Add `tldr`, `topics`, `entities`, and `answers_questions` when they improve the article's metadata. Questions should be answered by the text. `author` defaults to `Nikola Balić`; include an explicit value when useful or requested.
- Use `draft: true` for work awaiting review, reporting, or fact checks. Use `draft: false` for a finished article intended for publication. Preserve existing state on revisions unless asked to change it.
- Preserve existing `featured` and `canonical` values unless the task concerns curation or the original publication URL.

## Formatting when needed

Use Markdown headings and fenced code blocks with language identifiers. Include code, diagrams, and tables where they explain the subject; they are not quotas.

Mermaid uses fenced `mermaid` blocks and renders in the browser. Inspect the rendered diagram when adding or changing one; a successful build alone does not prove client-side rendering.

For a featured quotation, use the site's existing markup and a verified attribution:

```html
<blockquote class="featured-quote primary">
  <p>Exact, verified quotation.</p>
  <cite><a href="https://example.com/source">Source name</a></cite>
</blockquote>
```

Existing variants include `primary`, `secondary`, `accent`, and `unattributed`. Use unattributed emphasis only for the author's own point, not to disguise an external quotation.

## Validate and deliver

For a new or revised repository article:

1. Review the result against the request: preserve meaningful arguments, remove repetition, verify claims and metadata, and check image paths and relevant links.
2. Run `pnpm run build` from the repository root after completing the content changes and before any authorized push. For local content validation, `PROJECTS_OFFLINE=1 TINA_SKIP_SEARCH_INDEX=1 pnpm run build` retains the project snapshot and skips the cloud search upload. Consult `LESSONS_LEARNED.md` for relevant runtime failures rather than changing dependencies speculatively.
3. Treat build success as compilation and schema evidence, not proof of factual accuracy, working external links, or correct browser rendering. Inspect affected rendering when changing diagrams, embeds, or custom markup.
4. Check OG output separately for a publishable article. `scripts/prebuild-og.js` can skip or fail image generation without failing the build. Drafts are excluded; existing `public/og/<slug>.png` files are skipped by default. If title changes require a refreshed image, inspect the generator's options and scope before regenerating assets.
5. Report the article path, draft/publication state, checks actually completed, and any unresolved blockers. Do not claim a failed or skipped check passed. Record new maintenance lessons in `LESSONS_LEARNED.md` when applicable.

Commit and push when authorized by the user's request or established session scope; writing an article alone does not require publication. Follow repository commit conventions and stage only task-related files, including an OG image only if it was actually created or updated. Do not repeat an approval request for an already authorized action.
