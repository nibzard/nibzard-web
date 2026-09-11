# Nibzard workbench design

The user approved the homepage concept in docs/design-proposal on September 11, 2026. This document describes the shared implementation.

## Composition

A 210px navigation column sits beside the page on desktop. At 760px, navigation moves above the content. Main content has fluid horizontal padding. Reading pages have a maximum width of 780px; the homepage and project directory use more space.

Home pairs a short personal introduction with a documented command example from the lead featured project. Selected articles appear in compact rows. Projects and Now follow. The complete mixed feed remains available at /?page=1.

## Typography

Use the existing self-hosted Saans family for headings, navigation, and prose. Use Saans Mono for code and compact technical details. Titles use sentence case. Homepage display text ranges from 44px to 76px. Article text is 19px, or 18px on mobile, with a 1.75 line height.

## Color

Tokens live in src/styles/variables.css.

| Role | Light | Dark |
| --- | --- | --- |
| Canvas | #fcfcfc | #191919 |
| Surface | #f3f3f3 | #232323 |
| Text | #191919 | #f3f3f3 |
| Secondary text | #626262 | #b5b5b5 |
| Links and focus | #6426d9 | #c4a7ff |
| Primary action | #defa36 | #defa36 |
| Text on primary action | #191919 | #191919 |
| Separator | #dedede | #393939 |

Light is the default. The appearance control stores an explicit choice. The header applies that choice before first paint.

## Components

Use ordinary links for article rows, project names, and navigation. Use thin separators between entries. Screenshots have a 4px radius. Controls have a 3px radius. Use lime for the primary action and violet for links and focus.

Article pages start with the title, description, author, and date. Share and AI tools sit inside a disclosure. Topic links follow the prose. Related writing and the subscription form remain available below the article.

## Motion and accessibility

Content renders visibly without hydration. Use short hover transitions for arrows and specimen images. Disable transitions when reduced motion is requested. Use visible focus, labeled inputs, and native links. Keep mobile navigation and appearance controls visible.

## Source of truth

BaseLayout.astro loads global.css, which imports only variables.css and fonts.css. Older modular CSS files are retained as historical source and are no longer loaded. Route-specific visual exceptions should use the shared tokens.

## About and career record

About is a short personal introduction with a small portrait. It links to the CV, Now, and Projects. A native disclosure holds the speaker paragraph and headshot download. It replaces Bio, which returns an HTTP 301 redirect to About.

The CV uses dated rows and open sections. A compact section index helps readers navigate the long record. Publications distinguish journal articles, preprints, and reports. Print styles remove site navigation and force a white page, including when dark appearance is selected. Print and save-to-PDF use the same page and shared career data.

`src/config/career.ts` holds the record used by About, CV, and author metadata. `docs/career-sources.md` records evidence and missing dates.

## Project data

GitHub metadata is fetched before the build and saved in `src/data/github-projects.json`. The editorial sidecar at `src/config/projects.json` controls visibility, feature order, homepage selection, and copy overrides. The page and homepage share one selector. Hidden projects never appear in either location. Primary language and archive status use the existing quiet topic labels. No client-side GitHub requests or statistics widgets are added.
