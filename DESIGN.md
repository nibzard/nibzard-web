---
version: alpha
name: nibzard
description: >
  A personal AI engineering publication. Dark canvas by default — developer-native,
  easy on the eyes at midnight. Warm amber accents carry the brand through both modes.
  Tobias headlines give publication gravitas; Saans and Saans Mono handle body and code.
  Cards sit on a masonry grid with type-coded left rails, not shadows. The feel is
  "developer media outlet meets technical zine" — editorial energy filtered through
  warmth and restraint.

colors:
  # ── Primary ────────────────────────────────────────────────────────
  primary: "#D99A5E"
  primary-deep: "#C78649"
  on-primary: "#111111"

  # ── Dark mode (default) ──────────────────────────────────────────
  dark-canvas: "#12110f"
  dark-surface: "#1b1a17"
  dark-surface-raised: "#22201c"
  dark-border: "#302d28"
  dark-border-strong: "#474137"
  dark-text: "#ebe7df"
  dark-text-secondary: "#a49d92"
  dark-text-muted: "#746d62"

  # ── Light mode ────────────────────────────────────────────────────
  light-canvas: "#fbfaf7"
  light-surface: "#fffdf9"
  light-surface-raised: "#fffdf9"
  light-border: "#e5ddd0"
  light-border-strong: "#cec2b0"
  light-text: "#24211c"
  light-text-secondary: "#686156"
  light-text-muted: "#9a9286"

  # ── Semantic accents (card rails, tags, category markers) ─────────
  accent-red: "#B9785F"
  accent-red-tint: "#30241f"
  accent-blue: "#79A8C7"
  accent-blue-tint: "#1f2b32"
  accent-green: "#78A985"
  accent-green-tint: "#202c24"
  accent-purple: "#A38BC8"
  accent-purple-tint: "#292331"
  accent-warm-tint: "#342719"
  cream: "#f6f0e5"
  cream-deep: "#ded3c1"

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
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  xxl: "20px"
  pill: "9999px"

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
- **Mistral AI** (editorial warmth): warm amber palette, generous body leading, cream surfaces in light mode

The result is "developer media outlet" — a site that feels like opening a technical magazine, not a portfolio template. Dark by default (developer-native), with a warm light mode that uses cream and off-white instead of stark hospital white.

**Key characteristics:**

- Dark canvas (`#12110f`) as the default — warm enough to feel like newsprint, not an OLED void
- Warm amber (`#D99A5E`) as the primary accent — distinctive without being neon
- Tobias headlines for publication gravitas; Saans for body, Saans Mono for code and labels
- Mono-uppercase labels for metadata, timestamps, tags, nav — The Verge's "hazard label" rhythm
- Color-coded card rails instead of shadows — elevation through hue, not drop-shadow
- Masonry card grid with timeline energy — content stacks like a feed, not a gallery
- Quiet cream surfaces (`#f6f0e5`) in light mode — warm paper, not yellow panels

## Colors

### Brand Accent

- **Primary (`#D99A5E`):** Warm amber. The visual anchor. CTAs, active states, link hovers, card rails.
- **Primary Deep (`#C78649`):** Pressed-state CTA, hover emphasis. Darker and more saturated.
- **On Primary (`#111111`):** Text on primary backgrounds. Near-black for maximum contrast.

### Semantic Accents (card rails, tags, category markers)

- **Accent Red (`#B9785F`):** Log entries, featured content, alerts.
- **Accent Blue (`#79A8C7`):** External links, thoughts, references.
- **Accent Green (`#78A985`):** Now entries, success states, "shipped" signals.
- **Accent Purple (`#A38BC8`):** Reserved for experiments and occasional supporting accents.
- **Cream (`#f6f0e5`):** Light mode surface accent, especially footer band. Quiet cream, not saturated yellow.
- **Cream Deep (`#ded3c1`):** Light mode borders on cream surfaces.

Tinted background variants (used for tag pills and hover states) are the dark-surface-blended equivalents:
- `accent-red-tint` (`#30241f`), `accent-blue-tint` (`#1f2b32`), `accent-green-tint` (`#202c24`), `accent-purple-tint` (`#292331`), `accent-warm-tint` (`#342719`)

### Dark Mode Palette

- **Dark Canvas (`#12110f`):** Page background. Not pure black — has warmth for extended reading.
- **Dark Surface (`#1b1a17`):** Card backgrounds, raised panels. One step above canvas.
- **Dark Surface Raised (`#22201c`):** Hover states, active panels, code block backgrounds.
- **Dark Border (`#302d28`):** Hairline borders between cards and sections.
- **Dark Border Strong (`#474137`):** Emphasized borders, focused inputs.
- **Dark Text (`#ebe7df`):** Primary text. Off-white to reduce screen glare.
- **Dark Text Secondary (`#a49d92`):** Bylines, timestamps, metadata.
- **Dark Text Muted (`#746d62`):** Disabled states, placeholder text.

### Light Mode Palette

- **Light Canvas (`#fbfaf7`):** Page background. Warm off-white, not clinical.
- **Light Surface (`#fffdf9`):** Card backgrounds.
- **Light Border (`#e5ddd0`):** Hairline borders. Warm gray, not cool.
- **Light Border Strong (`#cec2b0`):** Emphasized borders.
- **Light Text (`#24211c`):** Primary text.
- **Light Text Secondary (`#686156`):** Secondary text, metadata.
- **Light Text Muted (`#9a9286`):** Disabled, placeholder.

### Color-as-Elevation

nibzard uses color, not shadow, for visual hierarchy in dark mode. A card doesn't lift — it separates via a `1px solid` border and a slightly raised surface color. Only light mode uses subtle shadows (because the contrast model is inverted).

| Depth | Dark Treatment | Light Treatment |
|-------|---------------|-----------------|
| 0 | Canvas — no border | Canvas — no border |
| 1 | `dark-surface` + `1px dark-border` | `light-surface` + `1px light-border` |
| 2 | `dark-surface-raised` + `1px dark-border-strong` | `light-surface` + subtle shadow |
| 3 | Accent border (red, blue, green, purple, warm) | Same accent border logic |
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

Whitespace carries rhythm, not elegance. In dark mode, even `16px` of `#12110f` between cards acts as a palette cleanser. The page is paced — accent-colored card rails and neutral tag pills interrupt stretches of near-black. Whitespace is the silence between beats, not the luxury.

## Elevation & Depth

nibzard uses **color-as-elevation** in dark mode — no drop shadows. Hierarchy is carried by surface color graduation and accent-colored borders.

| Depth | Dark Treatment | Light Treatment |
|-------|---------------|-----------------|
| 0 | `dark-canvas` — no border, no shadow | `light-canvas` — no border, no shadow |
| 1 | `dark-surface` + `1px solid dark-border` | `light-surface` + `1px solid light-border` |
| 2 | `dark-surface-raised` + `1px solid dark-border-strong` | `light-surface` + `box-shadow: 0 2px 8px rgba(0,0,0,0.06)` |
| 3 | `4px solid` left rail in accent color (red, blue, green, purple, warm) | Same rail logic |
| 4 | Accent-tint fill (`accent-*-tint`) for tag pills and hover states | Same tint logic at lighter opacity |

No gradients. No glows. No atmospheric blurs. The warm amber system would break if anything faded softly.

## Shapes

All interactive and content containers use rounded corners. The radius scale creates a nested hierarchy:

| Level | Radius | Use |
|-------|--------|-----|
| `xs` | 4px | Inline code, small badges |
| `sm` | 6px | Nested card images |
| `md` | 8px | Buttons, code blocks, inputs |
| `lg` | 12px | Cards, panels |
| `xl` | 16px | Feature cards, large panels |
| `xxl` | 20px | Pill buttons, hero cards |
| `pill` | 9999px | Tag pills, status badges |

No square corners on interactive or content containers. The rounded language is consistent with The Verge's pill-card approach, but with a warmer, less aggressive radius distribution.

## Components

### Buttons

**Primary (`button-primary`):** Warm amber fill (`primary`), near-black text (`on-primary`), `8px` radius, mono-label uppercase typography. Hover (`button-primary-hover`) deepens to `primary-deep`.

**Secondary (`button-secondary`):** Dark surface fill, amber text (`primary`), `8px` radius. Hover (`button-secondary-hover`) shifts to `accent-warm-tint` background.

**Pill (`button-pill`):** Same as primary but with `20px` pill radius. Used for nav CTAs and inline actions.

### Cards (Masonry Grid Items)

Each content type has a color-coded `4px solid` left border rail:

| Component | Rail Color |
|-----------|-----------|
| `card-log` | `accent-red` |
| `card-thought` | `accent-blue` |
| `card-now` | `accent-green` |
| `card-idea` | `primary` / `accent3` (warm amber) |

Dark mode cards use `dark-surface` background, `dark-border` hairline, `12px` radius, `24px` padding. Hover (`card-dark-hover`) shifts to `dark-surface-raised`. Light mode cards (`card-light`) use `light-surface` + `light-border`.

**Card metadata:** Timestamp in `mono-caption` uppercase, title in `heading-2`, TLDR in `body-sm`, tags as mono-caption uppercase pills.

### Tags

Tags are neutral by default so the card type rail carries the main color signal. On hover or focus, tags may pick up the warm tint/text treatment. `tag-red`, `tag-blue`, `tag-green`, and `tag-purple` remain available for deliberate semantic states, but cards should not derive their rail color from arbitrary tags. All tags use `pill` radius (9999px) and `mono-caption` uppercase typography.

### Code Blocks

`code-block` uses `#1c1c1e` background (same in both light and dark modes — code blocks are always dark), `#e2e8f0` text, `code-md` typography (14px mono, 1.50 leading), `8px` radius. Header bar is slightly darker, filename in `mono-caption`. Copy button top-right with `primary` on hover.

### Navigation

`nav-header` spans full width with the page canvas background and no shadow, so the header feels integrated rather than boxed. Logo (`logo`) is a wordmark: `Nikola Balić`, with "Nikola" in the warm accent and a desktop-only `Writings` mono kicker separated by a thin border. Do not expand the wordmark into a full sentence in the nav; it should remain compact.

Nav links use `mono-label` uppercase, `dark-text-secondary` color, hover to `primary`. Active state: `2px solid primary` bottom border. Max-width `1200px`, centered. Search and theme toggle controls live inside the same `<nav class="site-nav">` list as the links; both are borderless 40px square icon buttons with centered icons and no persistent outline.

### Footer

Dark mode: `footer-dark` with `dark-surface` background, `dark-border` top border. Light mode: `footer-light` with quiet `cream` background, `cream-deep` top border. The footer must read as warm paper, not saturated yellow. Content centered, links in `accent-blue`, ASCII divider ornament.

### Inputs

`input-dark`: `dark-surface` background, `dark-text` text, `8px` radius. Focus (`input-dark-focus`) gets `primary` amber border. `input-light` / `input-light-focus` mirror the pattern in light mode.

## Do's and Don'ts

### Do

- **Do** use `#12110f` as the default canvas. It's warm enough for extended reading.
- **Do** use warm amber (`#D99A5E`) as the primary accent — CTAs, active states, link hovers.
- **Do** use Tobias for headlines at `heading-1` (30px) and above. It signals "publication."
- **Do** use mono-uppercase for nav links, timestamps, tags, and eyebrow labels. The tracking (0.06–0.08em) is the voice.
- **Do** use color-coded card rails (red, blue, green, purple, amber) to distinguish content types.
- **Do** use quiet cream (`#f6f0e5`) for the light-mode footer and occasional panels. It's warm paper, not yellow.
- **Do** use `primary` (`#D99A5E`) as a consistent hover response for all interactive elements.
- **Do** keep generous body leading (1.55–1.60) for long-form technical reading.

### Don't

- **Don't** use pure black (`#000000`) as a background. It's too harsh for reading sessions.
- **Don't** use drop shadows in dark mode. Borders and color fills are the elevation system.
- **Don't** use Tobias for UI elements (buttons, labels, nav, metadata). Tobias is for display only.
- **Don't** use lowercase mono for labels. Mono labels are always uppercase with positive tracking.
- **Don't** use neon/saturated accents (`#3cffd0`, `#5200ff`, etc.). This is a warm amber system, not a hazard-tape system.
- **Don't** use gradients. The system is solid color blocks and borders.
- **Don't** use pure white (`#FFFFFF`) as a light-mode canvas. Use warm off-white (`#fbfaf7`).
- **Don't** introduce new accent colors outside the declared palette (warm, red, blue, green, purple).
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
