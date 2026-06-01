---
version: alpha
name: nibzard
description: >
  A personal AI engineering publication with a bento-box brutalist interface.
  Dark purple canvas by default, hard rectangular modules, loud electric accents,
  and zero rounded corners. Saans Mono pushes the page toward labels, grids, and
  machine-readable structure; Tobias remains available for article-scale editorial
  moments. Cards sit on a masonry grid with type-coded left rails and hard borders.
  The feel is "developer zine meets brutalist dashboard" — technical, angular,
  high-contrast, and deliberately unsmoothed.

colors:
  # ── Primary ────────────────────────────────────────────────────────
  primary: "#E4FF30"
  primary-deep: "#BEDA24"
  on-primary: "#111111"

  # ── Dark mode (default) ──────────────────────────────────────────
  dark-canvas: "#171323"
  dark-surface: "#362F4F"
  dark-surface-raised: "#433A63"
  dark-border: "#5B23FF"
  dark-border-strong: "#E4FF30"
  dark-text: "#F7F5FF"
  dark-text-secondary: "#C7BEDD"
  dark-text-muted: "#8F84AD"

  # ── Light mode ────────────────────────────────────────────────────
  light-canvas: "#F7F5FF"
  light-surface: "#E9E4FF"
  light-surface-raised: "#FFFFFF"
  light-border: "#362F4F"
  light-border-strong: "#5B23FF"
  light-text: "#171323"
  light-text-secondary: "#51486C"
  light-text-muted: "#766C91"

  # ── Semantic accents (card rails, tags, category markers) ─────────
  accent-red: "#E4FF30"
  accent-red-tint: "#3A4319"
  accent-blue: "#008BFF"
  accent-blue-tint: "#102F5A"
  accent-green: "#E4FF30"
  accent-green-tint: "#3A4319"
  accent-purple: "#5B23FF"
  accent-purple-tint: "#25135A"
  accent-warm-tint: "#3A4319"
  cream: "#F7F5FF"
  cream-deep: "#C7BEDD"

  # ── Code ───────────────────────────────────────────────────────────
  code-bg: "#1c1c1e"
  code-text: "#e2e8f0"

typography:
  display-hero:
    fontFamily: "Tobias, Georgia, 'Times New Roman', serif"
    fontSize: "52px"
    fontWeight: 400
    lineHeight: 1.10
    letterSpacing: "-0.5px"
  display-section:
    fontFamily: "Tobias, Georgia, 'Times New Roman', serif"
    fontSize: "36px"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.3px"
  heading-1:
    fontFamily: "Tobias, Georgia, 'Times New Roman', serif"
    fontSize: "30px"
    fontWeight: 400
    lineHeight: 1.20
    letterSpacing: "-0.02em"
  heading-2:
    fontFamily: "Saans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.30
    letterSpacing: "-0.01em"
  heading-3:
    fontFamily: "Saans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.40
  heading-4:
    fontFamily: "Saans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.40
  body-lg:
    fontFamily: "Saans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.60
  body-md:
    fontFamily: "Saans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "Saans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.50
  mono-label:
    fontFamily: "'Saans Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.40
    letterSpacing: "0.08em"
  mono-caption:
    fontFamily: "'Saans Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.30
    letterSpacing: "0.06em"
  code-md:
    fontFamily: "'Saans Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.50

rounded:
  xs: "0"
  sm: "0"
  md: "0"
  lg: "0"
  xl: "0"
  xxl: "0"
  pill: "0"

spacing:
  3xs: "2px"
  2xs: "4px"
  xs: "6px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
  3xl: "48px"
  section: "64px"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.mono-label}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-secondary:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.primary}"
    typography: "{typography.mono-label}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-secondary-hover:
    backgroundColor: "{colors.accent-warm-tint}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-pill:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.mono-label}"
    rounded: "{rounded.xxl}"
    padding: "8px 16px"
  card-dark:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.dark-text}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  card-dark-hover:
    backgroundColor: "{colors.dark-surface-raised}"
    textColor: "{colors.dark-text}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  card-light:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.light-text}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  card-log:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.dark-text}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  card-thought:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.dark-text}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  card-now:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.dark-text}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  card-idea:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.dark-text}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  tag-pill:
    backgroundColor: "{colors.accent-warm-tint}"
    textColor: "{colors.primary}"
    typography: "{typography.mono-caption}"
    rounded: "{rounded.pill}"
    padding: "3px 10px"
  tag-red:
    backgroundColor: "{colors.accent-red-tint}"
    textColor: "{colors.accent-red}"
    typography: "{typography.mono-caption}"
    rounded: "{rounded.pill}"
    padding: "3px 10px"
  tag-blue:
    backgroundColor: "{colors.accent-blue-tint}"
    textColor: "{colors.accent-blue}"
    typography: "{typography.mono-caption}"
    rounded: "{rounded.pill}"
    padding: "3px 10px"
  tag-green:
    backgroundColor: "{colors.accent-green-tint}"
    textColor: "{colors.accent-green}"
    typography: "{typography.mono-caption}"
    rounded: "{rounded.pill}"
    padding: "3px 10px"
  tag-purple:
    backgroundColor: "{colors.accent-purple-tint}"
    textColor: "{colors.accent-purple}"
    typography: "{typography.mono-caption}"
    rounded: "{rounded.pill}"
    padding: "3px 10px"
  code-block:
    backgroundColor: "{colors.code-bg}"
    textColor: "{colors.code-text}"
    typography: "{typography.code-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  nav-header:
    backgroundColor: "{colors.dark-canvas}"
    textColor: "{colors.dark-text-secondary}"
    typography: "{typography.mono-label}"
    height: "56px"
  footer-dark:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.dark-text-secondary}"
    typography: "{typography.body-sm}"
  footer-light:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.light-text-secondary}"
    typography: "{typography.body-sm}"
  input-dark:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.dark-text}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm} {spacing.md}"
  input-dark-focus:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.dark-text}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm} {spacing.md}"
  input-light:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.light-text}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm} {spacing.md}"
  input-light-focus:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.light-text}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm} {spacing.md}"
  logo:
    textColor: "{colors.dark-text}"
    typography: "{typography.heading-2}"
  logo-kicker:
    textColor: "{colors.dark-text-secondary}"
    typography: "{typography.mono-caption}"
---

## Overview

nibzard is Nikola Balić's technical publication — a content site, not a SaaS product. The design language borrows from two reference poles:

- **The Verge** (editorial energy): dark canvas, color-as-elevation, mono-uppercase metadata, timeline/feed rhythm, publication-scale typography hierarchy
- **Brutalist bento systems** (interface posture): hard rectangles, exposed borders, grid rhythm, zero corner softening, loud utilitarian accents

The result is "developer zine meets brutalist dashboard" — a site that feels technical, angular, and intentionally unsmoothed. Dark by default, with a light mode that keeps the same purple/blue/lime system instead of reverting to paper warmth.

**Key characteristics:**

- Dark purple canvas (`#171323`) as the default, with `#362F4F` as the primary bento surface
- Electric lime (`#E4FF30`) as the primary accent — intentionally neon and confrontational
- Electric blue (`#008BFF`) and violet (`#5B23FF`) for links, rails, borders, focus, and secondary states
- Tobias headlines for publication gravitas; Saans for body, Saans Mono for code and labels
- Mono-uppercase labels for metadata, timestamps, tags, nav — The Verge's "hazard label" rhythm
- Color-coded card rails and hard borders instead of soft shadows
- Masonry card grid with timeline energy — content stacks like a feed, not a gallery
- No rounded corners. Cards, pills, controls, images, and code blocks are rectangular.

## Colors

### Brand Accent

- **Primary (`#E4FF30`):** Electric lime. The loud visual anchor. CTAs, active states, link hovers, featured rails.
- **Primary Deep (`#BEDA24`):** Pressed-state CTA, hover emphasis. Darker and more controlled.
- **On Primary (`#111111`):** Text on primary backgrounds. Near-black for maximum contrast.

### Semantic Accents (card rails, tags, category markers)

- **Accent Lime (`#E4FF30`):** Log entries, featured content, active states.
- **Accent Blue (`#008BFF`):** External links, thoughts, references.
- **Accent Violet (`#5B23FF`):** Ideas, borders, focus states, secondary actions.
- **Deep Purple (`#362F4F`):** Bento surfaces and structural panels.
- **Pale Violet (`#F7F5FF`):** Light mode canvas and high-contrast text support.

Tinted background variants (used for tag pills and hover states) are the dark-surface-blended equivalents:
- `accent-blue-tint` (`#102F5A`), `accent-green-tint` (`#3A4319`), `accent-purple-tint` (`#25135A`), `accent-warm-tint` (`#3A4319`)

### Dark Mode Palette

- **Dark Canvas (`#171323`):** Page background.
- **Dark Surface (`#362F4F`):** Card backgrounds and bento panels.
- **Dark Surface Raised (`#433A63`):** Hover states and active panels.
- **Dark Border (`#5B23FF`):** Structural borders between modules.
- **Dark Border Strong (`#E4FF30`):** Emphasized borders, focus states, selected modules.
- **Dark Text (`#F7F5FF`):** Primary text.
- **Dark Text Secondary (`#C7BEDD`):** Bylines, timestamps, metadata.
- **Dark Text Muted (`#8F84AD`):** Disabled states, placeholder text.

### Light Mode Palette

- **Light Canvas (`#F7F5FF`):** Page background.
- **Light Surface (`#E9E4FF`):** Card backgrounds and bento panels.
- **Light Border (`#362F4F`):** Structural borders.
- **Light Border Strong (`#5B23FF`):** Emphasized borders.
- **Light Text (`#171323`):** Primary text.
- **Light Text Secondary (`#51486C`):** Secondary text, metadata.
- **Light Text Muted (`#766C91`):** Disabled, placeholder.

### Color-as-Elevation

nibzard uses color, hard borders, and positional offset for visual hierarchy. A card does not become soft or rounded; on hover it can shift against a hard black shadow, like a printed block moving on a grid.

| Depth | Dark Treatment | Light Treatment |
|-------|---------------|-----------------|
| 0 | Canvas — no border | Canvas — no border |
| 1 | `dark-surface` + `2px dark-border` | `light-surface` + `2px light-border` |
| 2 | `dark-surface-raised` + `2px dark-border-strong` | `light-surface-raised` + `2px light-border-strong` |
| 3 | Thick accent rail (lime, blue, violet) | Same accent rail logic |
| 4 | Accent tint fill background | Same accent fill logic |

## Typography

### Font Stack

- **Display:** Tobias (fallback: Georgia, Times New Roman, serif). A neo-grotesque with editorial warmth — distinctive personality at display sizes without the formality of a traditional serif. Loaded from non-trial self-hosted files in `public/assets/fonts/Tobias/`, with `TobiasVF.woff2` covering normal weights.
- **UI / Body:** Saans (fallback: -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif). A modern grotesque that pairs cleanly with Tobias. Loaded from non-trial self-hosted files in `public/assets/fonts/Saans/`, with `SaansCollectionVF.woff2` covering normal weights.
- **Mono:** Saans Mono (fallback: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace). Labels, timestamps, nav links, code. The "metadata voice." Loaded from non-trial Regular/Bold and italic woff2 files.

**Why this pairing works:** Tobias brings personality to headlines — it has the warmth and character of a serif without actually being one. Saans is the clean workhorse that recedes at body sizes. Saans Mono ties the system together for code and metadata. Three faces from a shared design philosophy, not a grab-bag.

### Principles

- **Tobias is for headlines, never for UI.** Tobias appears at `heading-1` and above. Buttons, labels, nav, and metadata are always Saans or Saans Mono.
- **Mono is always uppercase when used as labels.** Nav links, timestamps, category tags, and eyebrow text use `mono-label` or `mono-caption` with `text-transform: uppercase` and positive letter-spacing (0.06–0.08em). Lowercase mono is only for code blocks.
- **Negative tracking on display, positive on labels.** Display sizes tighten (-0.5px to -0.02em). Uppercase labels open up (+0.06–0.08em). Body text is neutral.
- **Generous body leading** (1.55–1.60) for long-form technical reading. Articles run 1500+ words — the reader needs air.
- **Tight display leading** (1.10–1.20) for headlines. Magazine-grade impact.

## Layout & Spacing

### Spacing Scale

8px base unit. Scale: 2, 4, 6, 8, 12, 16, 24, 32, 48, 64px.

Section padding: 48–64px between major sections. Card interiors: 24px. Tight gaps inside cards: 6–12px.

### Container Widths

| Element | Max-width | Why |
|---------|-----------|-----|
| Header inner | 1200px | Matches content grid |
| Masonry grid | 1200px | 3-column cards at 380px minimum |
| Article body | 720px (65ch) | Optimal reading width for long-form |
| Content pages (about, bio) | 960px | Comfortable single-column reading |
| Footer inner | 1200px | Matches header |

### Grid Rhythm

The masonry grid is the homepage's primary structure. Cards stack in a 3-column auto-fit grid with `16px` gaps. Featured items span 2 columns. The grid collapses to 2 columns at 900px and 1 column at 640px.

The feed reads like a timeline — the mono-uppercase timestamps on each card create The Verge's "commit log" rhythm without a literal vertical rail.

### Whitespace Philosophy

Whitespace carries rhythm, not elegance. In dark mode, even `16px` of `#171323` between cards acts as a grid gutter. The page is paced by rectangular modules, thick rails, and loud accents. Whitespace is functional separation, not softness.

## Elevation & Depth

nibzard uses **color-as-elevation** and hard offset states. Hierarchy is carried by surface color graduation, accent-colored borders, and occasional blocky black hover offsets.

| Depth | Dark Treatment | Light Treatment |
|-------|---------------|-----------------|
| 0 | `dark-canvas` — no border, no shadow | `light-canvas` — no border, no shadow |
| 1 | `dark-surface` + `2px solid dark-border` | `light-surface` + `2px solid light-border` |
| 2 | `dark-surface-raised` + `2px solid dark-border-strong` | `light-surface-raised` + `2px solid light-border-strong` |
| 3 | `10px solid` left rail in accent color (lime, blue, violet) | Same rail logic |
| 4 | Accent-tint fill plus hard black offset on hover | Same tint logic at lighter opacity |

No rounded corners. No glows. No atmospheric blurs. Gradients are only allowed for mechanical grid backgrounds or code syntax treatments, never for soft decoration.

## Shapes

All interactive and content containers use square corners.

| Level | Radius | Use |
|-------|--------|-----|
| All | 0 | Cards, buttons, inputs, tags, images, code blocks, panels |

Rounded pills are banned. Status badges and tags are rectangular labels. Circular icon buttons are only acceptable when the icon itself requires a circular glyph; the container remains square.

## Components

### Buttons

**Primary (`button-primary`):** Electric lime fill (`primary`), near-black text (`on-primary`), square corners, mono-label uppercase typography. Hover (`button-primary-hover`) deepens to `primary-deep`.

**Secondary (`button-secondary`):** Electric blue or violet fill depending on context, square corners, mono-label uppercase typography. Hover states use hard border/fill changes.

**Pill (`button-pill`):** Deprecated. Use square label buttons instead.

### Cards (Masonry Grid Items)

Each content type has a color-coded thick left border rail:

| Component | Rail Color |
|-----------|-----------|
| `card-log` | `accent-lime` / `primary` |
| `card-thought` | `accent-blue` |
| `card-now` | `accent-green` |
| `card-idea` | `accent-purple` / violet |

Dark mode cards use `dark-surface` background, `2px` borders, `10px` left rails, `0` radius, and `24px` padding. Hover shifts to `dark-surface-raised` with a hard black offset. Light mode cards mirror the same rectangular grammar.

**Card metadata:** Timestamp in `mono-caption` uppercase, title in mono-heavy uppercase for feed cards, TLDR in `body-sm`, tags as rectangular mono-caption labels.

### Tags

Tags are neutral rectangular labels by default so the card type rail carries the main color signal. On hover or focus, tags may pick up the lime fill treatment. `tag-blue`, `tag-green`, and `tag-purple` remain available for deliberate semantic states, but cards should not derive their rail color from arbitrary tags. All tags use `0` radius and `mono-caption` uppercase typography.

### Code Blocks

`code-block` uses `#1c1c1e` background (same in both light and dark modes — code blocks are always dark), `#e2e8f0` text, `code-md` typography (14px mono, 1.50 leading), and `0` radius. Header bar is slightly darker, filename in `mono-caption`. Copy button top-right with `primary` on hover.

### Navigation

`nav-header` spans full width with a hard bottom border and no soft shadow. Logo (`logo`) is a wordmark: `Nikola Balić`, with "Nikola" in the active accent and a desktop-only `Writings` mono kicker separated by a thin border. Do not expand the wordmark into a full sentence in the nav; it should remain compact.

Nav links use `mono-label` uppercase, `dark-text-secondary` color, hover to `primary`. Active state: `2px solid primary` bottom border. Max-width `1200px`, centered. Search and theme toggle controls live inside the same `<nav class="site-nav">` list as the links; both are 40px square icon buttons with centered icons.

### Footer

Dark mode: `footer-dark` with `dark-surface` background and a hard `dark-border` top border. Light mode: `footer-light` with pale violet surfaces and strong borders. Content centered, links in `accent-blue`, ASCII divider ornament.

### Inputs

`input-dark`: `dark-surface` background, `dark-text` text, `0` radius. Focus (`input-dark-focus`) gets `primary` lime border. `input-light` / `input-light-focus` mirror the pattern in light mode.

## Do's and Don'ts

### Do

- **Do** use `#171323` as the default canvas and `#362F4F` as the main bento surface.
- **Do** use electric lime (`#E4FF30`) as the primary accent — CTAs, active states, link hovers.
- **Do** use Tobias for headlines at `heading-1` (30px) and above. It signals "publication."
- **Do** use mono-uppercase for nav links, timestamps, tags, and eyebrow labels. The tracking (0.06–0.08em) is the voice.
- **Do** use color-coded card rails (lime, blue, violet) to distinguish content types.
- **Do** use hard borders and square modules everywhere.
- **Do** use `primary` (`#E4FF30`) as a consistent hover response for key interactive elements.
- **Do** keep generous body leading (1.55–1.60) for long-form technical reading.

### Don't

- **Don't** use pure black (`#000000`) as the page background. It is reserved for hard offset shadows and text on lime.
- **Don't** use soft drop shadows in dark mode. Borders, fills, and hard offsets are the elevation system.
- **Don't** use Tobias for UI elements (buttons, labels, nav, metadata). Tobias is for display only.
- **Don't** use lowercase mono for labels. Mono labels are always uppercase with positive tracking.
- **Don't** add rounded corners, including pills.
- **Don't** add soft decorative gradients. The system is solid color blocks, hard grid lines, and borders.
- **Don't** use pure white (`#FFFFFF`) as a light-mode canvas. Use pale violet (`#F7F5FF`).
- **Don't** introduce new accent colors outside the declared purple/blue/lime palette.
- **Don't** make mono labels smaller than 11px. They become unreadable.
- **Don't** let tags determine card rail colors. Rail color comes from content type.
- **Don't** place the theme toggle outside the nav list on desktop. It should align with search and menu links.

## Theme Switching

Dark mode is the default. Light mode is opt-in via toggle.

### Implementation

- HTML `<html>` element gets `data-theme="dark"` (default) or `data-theme="light"`
- CSS variables switch based on `[data-theme]` attribute
- `prefers-color-scheme` is respected on first visit (no toggle set)
- Toggle state persists in `localStorage`
- Toggle is a sun/moon icon button inside the header nav list, aligned with search and links

### Variable Mapping

Each color token has a `dark-*` and `light-*` variant. The active theme maps them to shared semantic names:

```css
[data-theme="dark"] {
  --color-background: var(--dark-canvas);
  --color-background-alt: var(--dark-surface);
  --color-text: var(--dark-text);
}

[data-theme="light"] {
  --color-background: var(--light-canvas);
  --color-background-alt: var(--cream);
  --color-text: var(--light-text);
}
```

Components reference the shared semantic tokens, never the mode-specific ones directly.

## Responsive Behavior

### Breakpoints

| Name | Width | Key changes |
|------|-------|-------------|
| Mobile | <640px | Single column, nav hamburger, card padding 16px, type scales down 10% |
| Tablet | 640–899px | 2-column grid, double-width collapses to single |
| Desktop | 900–1199px | 3-column grid, full nav visible |
| Wide | ≥1200px | Max-width capped at 1200px, centered, margin expands |

### Type Scaling on Mobile

- Display sizes scale down to ~85% of desktop values
- Mono labels stay pinned at 11–12px (they become unreadable smaller)
- Body text stays at 16px (never go below for readability)
- Card titles drop from 22px to 18px

### Touch Targets

- All interactive elements: minimum 44px height
- Nav links: padded to 44px on mobile
- Card tap targets: full card area (already implemented)

## Implementation Notes

### Phase 1 — CSS Variable Migration (Low effort, high impact)

Move from flat CSS variables to the `[data-theme]` pattern. All existing component styles reference `var(--color-text)` etc. — no changes needed in component CSS, only in the root variable definitions.

### Phase 2 — Typography Refresh (Medium effort)

Load Tobias, Saans, and Saans Mono as non-trial self-hosted woff2 files. Add `@font-face` declarations with `font-display: swap`. Use variable fonts where available (`TobiasVF.woff2`, `SaansCollectionVF.woff2`) for single-file normal-weight coverage. Update heading styles to use Tobias at `heading-1` and above. Saans handles body and UI. Saans Mono handles code and mono labels.

### Phase 3 — Dark Mode Default (Medium effort)

Flip the default from light to dark. Add the theme toggle to the header. Implement `localStorage` persistence. Ensure all components look correct in both modes.

### Phase 4 — Component Polish (Ongoing)

Refine card rails, tag pills, button styles, and code blocks to match the token values above. This is incremental — each component can be updated independently.

### CSS Ordering Rule

The global stylesheet currently keeps a final "Design System Final Layer" at the bottom of `src/styles/global.css`. Keep it last unless the legacy page-level CSS has been fully removed. This final layer is the implementation guardrail that prevents older card, footer, and nav styles from overriding the current design tokens.
