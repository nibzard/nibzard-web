# Brand context for SEO sprint — nibzard.com

> Captured during Initialize. Source: README.md, AGENTS.md, src/pages/{about,bio,cv}.astro, LESSONS_LEARNED.md.
> **Note: this is a personal site, not a SaaS product.** Several brand-template fields are adapted accordingly — see comments. Direct competitors don't exist in the alternatives-page sense; the SEO play here is pillars + striking-distance, not competitive landing pages.

## Product (the site itself)

- **Name:** nibzard (personal site of Nikola Balić)
- **One-liner (≤20 words):** Nikola Balić's technical blog — detailed writeups on multi-agent orchestration, AI-native development, and what actually ships.
- **Category:** personal site, developer blog, AI engineering writing
- **URL:** https://nibzard.com
- **Free tier?** N/A (free content site)
- **Pricing model:** N/A

## Audience

- **Primary persona:** AI engineers + indie developers shipping production agent systems — people who want concrete patterns, not hype
- **Secondary persona:** Growth marketers in developer-tools / AI infrastructure who care about both the technical and the GTM side
- **Tertiary persona:** Academic / research readers (Niko has a doctoral background in digital transformation, complex network analysis)
- **Job-to-be-done:** Find concrete, battle-tested patterns and analysis that aren't yet another LinkedIn thinkpiece or marketing-driven AI content

## Competitors (adapted: comparable blogs / authority sites in the niche)

> Personal blogs don't compete in the SaaS sense, but they compete for **attention + topical authority** in shared topic clusters. These are reference points for what high-authority writing in the niche looks like, not "rip-and-replace" targets.

1. **Simon Willison's blog** — simonwillison.net — high-frequency technical AI writing, strong topical authority on LLMs
2. **Eugene Yan** — eugeneyan.com — ML engineering, applied AI patterns, similar audience
3. **Lilian Weng (OpenAI)** — lilianweng.github.io — deep technical AI essays, research-adjacent
4. **Latent.Space (swyx + Alessio)** — latent.space — AI engineering newsletter + podcast
5. **Hamel Husain** — hamel.dev — ML practitioner writing, evals + production patterns

**[INFERRED]** This list is reasonable from the about/bio context (AI engineering, multi-agent systems, production patterns). Verify with Niko before using as a research baseline.

## Voice

> Distilled from about.astro lede ("I build AI systems and write about what I learn"), LESSONS_LEARNED.md tone (precise, action-oriented), and existing /log posts (referenced from about.astro: "no fluff, just detailed technical writeups").

- **Honest** — "what works, what doesn't, and why" is the explicit framing
- **Technical, not academic** — assumes reader has shipped code, not assumes they need terms defined
- **Specific over abstract** — "5x improvements through strategic coordination" not "significant performance gains"
- **No marketing fluff** — about.astro explicitly says "no fluff, just detailed technical writeups"
- **Practitioner-first** — written from "I shipped this and here's what happened" not "you should consider"
- **Slightly opinionated** — Niko has takes (e.g. on multi-agent orchestration patterns)
- **[INFERRED]** Some slight dryness / Croatian-direct sensibility — verify by reading a few /log posts

**Words/phrases to avoid:** revolutionary, game-changer, seamless, robust, leverage (as a verb), synergy, paradigm shift, unprecedented, "thought leadership," "in today's fast-paced world"

**Reference voice examples (in this repo):** any post in `src/content/log/` — pick 2-3 recent ones to anchor cadence.

## Anti-positioning

> What this site explicitly does NOT do. Used for trust-building and topical focus.

- **Not a thinkpiece blog** — concrete patterns + actual code, not abstract takes on "the future of AI"
- **Not a tutorial site** — assumes the reader can write code; doesn't re-explain basics
- **Not a corporate / SaaS marketing blog** — no product to sell on the site itself
- **Not generalist** — focused on agent systems / AI engineering / dev infrastructure; not data science, ML research, or AGI safety per se
- **Not optimizing for traffic at the expense of signal** — `LESSONS_LEARNED.md` shows iterative refinement of voice over reach

## Context for honest comparisons (adapted: complementary, not competitive)

Personal-blog adaptation: instead of "when Competitor X is the better pick," map the topic clusters to **whose writing is the better starting point** for a given subtopic. Mention these by name where relevant in pillar posts:

- **Pure LLM/foundation-model news + tooling:** Simon Willison
- **ML production engineering / evals depth:** Eugene Yan, Hamel Husain
- **AI research deep-dives:** Lilian Weng
- **AI engineering ecosystem / podcast interviews:** Latent.Space
- **nibzard niche:** multi-agent orchestration patterns, agent-friendly infrastructure (type safety, CLIs, machine-readable docs), AI-native development workflow, growth-meets-product

This positioning is **complementary**, not competitive — linking out to these in pillar pages strengthens topical authority through co-citation.

---

## Skill adaptations for personal blog

Because nibzard is a personal site, not a SaaS, the standard sprint sequence is adapted:

| Phase | Standard playbook | Adapted for nibzard |
|---|---|---|
| Phase 0 | Technical foundations | **Same** — robots/sitemap/canonical/schema audit |
| Phase 1 | Alternatives pages | **Skipped** — no competitors in the SaaS sense |
| Phase 2 | Comparison pages | **Skipped** — no comparable "X vs Y" intent |
| Phase 3 | Use-case / /for/ pages | **Optional** — could do `/for/ai-engineers`, `/for/growth-marketers` landing pages, but typically not high-ROI for personal blogs |
| Phase 4 | Pillar + cluster playbooks | **Main play** — long-form authority content in Niko's topic clusters is the SEO engine for a personal site |
| Ongoing | Striking-distance via GSC | **Critical** — for a content site, this is the highest-ROI continuous work once enough pages are indexed |

This adaptation is captured in `docs/seo-sprint.md`'s Phase tracker.
