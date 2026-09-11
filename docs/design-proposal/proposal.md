# Nibzard: personal workbench

Status: proposed direction. This document does not replace the current DESIGN.md.

## Recommendation

Make the site a collection of work by Nikola Balić. Let visitors move from a tool to its experiment and explanation.

The proposed first impression is: this person builds things, tests them, and explains the results clearly.

Working assumption: the main goal is reputation as a builder and writer. The user has not confirmed the priority. If readership leads, move selected writing above the project specimen. If consulting leads, add a short description of the work Nikola can help with.

## What exists today

Reviewed the homepage on desktop and mobile, an article, source styles, navigation, About, projects, and DESIGN.md.

- The current identity is deliberately angular: purple, violet, lime, rectangular panels, thick borders, and a background grid.
- The homepage combines articles, thoughts, images, ideas, and now entries through a paginated feed.
- Large uppercase monospace headings dominate the live homepage. Article titles use Tobias, a serif family. Token declarations alone miss the later style overrides.
- Saans, Saans Mono, and Tobias are already available locally. The fonts are useful assets.
- The introduction describes topics. It gives little space to Nikola's actual tools or working method.
- Dates, tags, borders, and summaries compete with titles. The mixed feed asks new visitors to choose without much guidance.
- The mobile capture contains the introduction and one large article card in the first viewport. The article card has substantial empty space.
- The article page starts with sharing tools, a title, a summary panel, and boxed tags. The prose arrives after several competing elements.

Keep the direct voice, deep articles, small projects, now entries, search, and existing links. Give each a clear role.

## References checked on September 11, 2026

These observations describe the pages inspected today. They are a small reference sample, not an industry-wide trend study.

| Reference | Current observation | Use for nibzard |
| --- | --- | --- |
| [SF Compute](https://sfcompute.com/) | Quiet light canvas, compact left navigation, restrained heading, detailed compute illustration | Calm navigation and an illustration that explains real work |
| [PlanetScale](https://planetscale.com/) | Dense monospace content, direct claims, bright announcement strip, technical diagrams | Specific explanations and technical evidence |
| [OpenAI](https://openai.com/) | Homepage content separates featured stories, recent news, and research | Editorial selection and clear destinations |
| [fal](https://fal.ai/) | Cyan canvas, bold black typography, lime and violet graphics | One recognizable accent and confidence in visual identity |

OpenAI's browser page returned a verification screen. Its structure was reviewed through readable web content; its current visual appearance was not verified. The other references were inspected in browser screenshots.

The useful shared quality is deliberate hierarchy. These companies use very different palettes and levels of decoration.

## Proposed visual system

Scene: a developer opens an article on a laptop during the working day, then looks for the tool behind it. Start with a light reading surface and offer a dark appearance.

Voice: direct, curious, exact.

- Neutral near-white canvas, near-black text, and quiet separators.
- Keep violet for links and focus. Use lime for one primary action. Content provides the remaining color.
- Use existing Saans for navigation, headings, and body text. Reserve Saans Mono for code and compact technical details.
- Homepage title: 44–76 pixels depending on viewport. Article title: 40–56 pixels. Article body: 19–20 pixels, around 65 characters per line.
- Desktop navigation occupies a narrow left column. Mobile navigation becomes a visible row under the name.
- Use open sections and compact article rows. Give actual screenshots and figures a frame only when they need one.
- Use short hover transitions. A real diagram can animate when that helps explain behavior. Respect reduced motion.

Proposed homepage copy:

> Tools for agents. Notes for humans.
>
> I build AI systems and write about what I learn. Experiments, useful tools, and the details that make them work.

This line connects the two strongest parts of the site. Growth and startup experience can appear in the About page and relevant articles.

## The distinctive element

Pair one real tool specimen with a related article. The concept uses the published AgentProbe terminal screenshot, dated as an archive item.

The image is evidence of a real experiment. Its caption explains what readers are seeing. The text alternative includes the key result.

Later specimens could show an annotated agent trace, a tool interaction, or a benchmark chart. Each must come from real work and link to its explanation. Avoid simulated live status or invented measurements.

This recurring pairing gives the site an identity that comes from Nikola's work. Refresh the selection by hand when a new project deserves attention.

## Information architecture

| Surface | Proposed behavior |
| --- | --- |
| Home | Short introduction, one project specimen, three selected articles, a few tools, and a route to Now |
| Writing | Searchable archive. Separate selected starting points from the chronological list. Offer type and topic filters without displaying every tag at once. |
| Projects | Curated projects first. Each includes its purpose, actual status, source link, and related writing. Place the full repository list below. |
| Article | Title, short description, date, and author before the prose. Use a narrow reading column with wider figures when needed. Put optional sharing and AI tools in a quiet utility menu. |
| Now | Current entry with its real date. Keep older entries available as an archive. |
| About | Personal introduction, selected work, background, and contact links. |

Preserve current article URLs, feed pagination links, content collections, RSS, Markdown negotiation, and search behavior during implementation. Labels can change without changing routes.

## Article design

Use a quiet reading page with a 65-character measure. Remove the outer framed panel and the background grid. Present the description as plain text. Show a table of contents only on longer pieces, collapsed on mobile.

Keep code copy controls, figures, and clear inline links. Place tags after the article. End with one related project and one related article, followed by the existing subscription form.

A reader should reach the opening paragraph quickly. The proposed homepage is only one part of this change.

## Other possible directions

- A monochrome research index: typography and compact lists, with figures inside articles. Strong for reading, but weaker at showing the builder behind the work.
- A bright creative lab: occasional large color fields and interactive experiments. Strong for memorable launches, but requires more art direction and can compete with long articles.

The personal workbench gives the best balance for the stated brief. It supports both writing and a large collection of small tools.

## Review artifact and implementation scope

Open index.html next to this document. It is a responsive homepage concept using local fonts and a published screenshot. Its links lead to existing destinations. The desktop appearance button switches themes. Mobile currently shows the light concept.

The selected articles and projects are examples for composition, not a confirmed editorial selection. No application route or source stylesheet has changed.

An implementation should proceed in this order:

1. Confirm the site priority and choose the initial project specimen.
2. Consolidate the current style overrides into the new tokens and shared layout.
3. Build Home, Writing, and the article template together.
4. Apply the same system to Projects, Now, and About.
5. Verify keyboard access, contrast, mobile layouts, reduced motion, and preserved content routes.
6. Run the full production build before publishing.

Acceptance checks: visible keyboard focus, at least 4.5:1 body text contrast, readable figures, no horizontal page overflow, and no decorative runtime dependency.

## Concept checks

Checked the concept in a browser at 1440, 768, 390, and 320 pixels wide. The document has no horizontal overflow at those widths. Local fonts and the screenshot loaded. The desktop appearance button switched to dark. Saved desktop, mobile, and dark screenshots alongside the HTML.

These are concept checks. A full accessibility audit, article implementation, and production build remain part of the implementation phase.
