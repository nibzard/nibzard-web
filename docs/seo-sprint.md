# SEO Sprint — nibzard.com

> Persistent plan. Lives at `docs/seo-sprint.md`. Updated after every phase. **Do not delete.**

**Created:** 2026-05-13
**Last updated:** 2026-05-13
**Domain:** https://nibzard.com
**Domain Rating (Ahrefs Free):** STUBBED — Ahrefs Free Authority Checker was Cloudflare-CAPTCHA-blocked under the hobby-tier Steel session (no CAPTCHA solving on hobby plan). Ubersuggest and Open PageRank also gated. **Action required:** Niko has Ahrefs access from past Daytona work — please paste DR here, OR sign up for a free Open PageRank API key (https://www.domcop.com/openpagerank/) and re-run Recipe A. Heuristic estimate based on age + activity: DR ~10-25 (do not act on this number).
**Persona:** AI engineers + indie devs shipping production agent systems; secondary growth marketers in dev-tools / AI infra.
**Free tier:** N/A (free content site)
**Adaptation note:** This is a personal site, not a SaaS product. Phase 1 (alternatives) and Phase 2 (compare) are **N/A** for this site shape — covered in `.seo/brand.md`.

---

## Phase tracker

### Phase 0 — Technical foundations

**Status:** pending (real findings from `scripts/tech_audit.py`)
**Why first:** content phases on a broken technical base waste effort.
**Acceptance:** every item below resolved.

- [ ] **Homepage has no `<h1>` tag** — `src/pages/index.astro` renders content collections but no top-level H1. Add `<h1>nibzard</h1>` or similar above the feed. Otherwise Google has no obvious topical anchor on the most-linked page.
- [ ] **Meta description on homepage is 41 chars** — "all things AI agents, growth and startups". Expand to 140-160 chars. Suggest: "Detailed writeups on multi-agent orchestration, AI engineering patterns, and what actually works in production. From Nikola Balić (nibzard) — 50+ shipped AI projects."
- [ ] **`og:description` missing on homepage** — add it to `BaseLayout.astro`'s OG block. Without it, link previews on social are blank/auto-filled.
- [ ] **HTTPS check FAIL** — flagged by `tech_audit.py` ("HTTP works without redirecting to HTTPS"). May be a script false positive (Vercel handles HTTP→HTTPS at the edge, our script doesn't follow Vercel-style edge redirects perfectly). **Verify manually**: `curl -I http://nibzard.com` and confirm response is 301/308 → https://. If yes, this is the script's gap, not a real issue.
- [ ] **101 broken internal links** — from `scripts/link_audit.py`. Run cleanup pass: `python3 /Users/nikola/.claude/skills/seo-sprint/scripts/link_audit.py /Users/nikola/dev/nibzard-web --base-host nibzard.com --broken-only`. Fix each (correct slug or remove link). Examples: `/log/architecture` links to `/some-article` (placeholder); `/log/hn-hug` references several `/images/...` files that don't exist in `public/images/`.

### Phase 1 — Alternatives pages

**Status:** **N/A — skipped for personal blog**
**Reason:** No SaaS competitors. Adaptation captured in `.seo/brand.md`.

### Phase 2 — Comparison pages

**Status:** **N/A — skipped for personal blog**
**Reason:** No "X vs Y" purchase intent for a personal blog.

### Phase 3 — Use-case / `/for/` pages

**Status:** optional (low priority for personal blogs; revisit after pillars ship)

If pursued later, candidate pages:
- `/for/ai-engineers` — landing the AI-engineer audience explicitly
- `/for/growth-marketers` — bridging Niko's growth + AI lanes (rare positioning)

Skip until Phase 4 has shipped 3+ pillars.

### Phase 4 — Pillar + cluster playbooks **(MAIN PLAY)**

**Status:** pending
**Pattern:** `references/patterns/playbooks.md`
**Why this is the main play:** for a content site, long-form authority pillars + cluster posts are the SEO engine. Niko already has ~50+ log posts that can be re-organized into clusters around 3-4 pillars. Each pillar absorbs the topical authority of its cluster.

**Pillar candidates** (with real Google Autocomplete signal from Recipe C):

| Pillar URL | Target keyword | Autocomplete signal | Status |
|---|---|---|---|
| `/playbooks/multi-agent-orchestration` | multi-agent orchestration patterns | strong (autocomplete: "patterns", "frameworks", "claude") | pending |
| `/playbooks/claude-code-skills` | claude code skills guide | strong (autocomplete: "marketplace", "examples", "library", "directory", "folder") | pending |
| `/playbooks/ai-agent-design-patterns` | ai agent design patterns | moderate (autocomplete: "github", "anthropic", "book", "react") | pending |
| `/playbooks/agent-loop-architecture` | agent loop architecture | niche (autocomplete: "diagram", "claude code", "anthropic", "design") | pending |

**Acceptance per pillar:**
- ≥1500 words
- TL;DR callout in first 100 words
- Table of contents with anchor links
- 5-10 H2 sections, each 200-300 words minimum
- Links to 5+ existing log posts (as the cluster supporting it)
- Schema.org Article (or HowTo where applicable) + FAQPage + BreadcrumbList
- ≥5 inbound links from existing log posts within 30 days of shipping

**Cluster identification:**

Run `git ls-files src/content/log/` and group by pillar. Approximate clusters (verify by reading post titles):

- **Multi-agent orchestration cluster** (~15-20 posts): theloop, transformer-orchestration, self-healing-agents, yolo-agents, structure, wrappers, search-translator, etc.
- **Claude Code skills cluster** (~5-10 posts): unified-skills, "one skill to rule them all", related Claude Code writing
- **AI engineering / production cluster** (~10-15 posts): startup-moat, embeddings-vs-structure, demos-vs-production, vacuum, etc.
- **AI agent design patterns cluster** (~5-10 posts): agentic-ai-handbook material, agent design patterns
- **AI startup growth cluster** (~5-10 posts): 20-year-playbook, developer-trust, 10-touchpoint-rule

### Ongoing — Striking-distance boosts

**Status:** **active — GSC data analyzed 2026-05-13**
**Pattern:** `references/striking-distance.md`
**Source:** `.seo/gsc-snapshots/2026-05-13/` (last 90 days, Web search)
**Why this is the #1 priority now:** the GSC data reveals **~1,500 clicks/quarter on the table** — current ~450 clicks could be ~1,950 if striking-distance pages move from pos 5-10 to pos 1-3. That's 3-4x traffic from work on pages that **already rank**, no new content needed.

#### Critical Phase 0 prerequisite (do BEFORE the boosts)

**`www.nibzard.com` vs `nibzard.com` split.** GSC data shows multiple URLs appearing twice — once as `www.nibzard.com/claude-zhipu/` (51 clicks, 13,527 imp, pos 6.9) and once as `nibzard.com/claude-zhipu/` (0 clicks, 270 imp, pos 9.1). **Google is splitting authority between the two hostnames.** Until this is fixed, striking-distance work is leaking value. **Fix:** verify both versions in GSC, pick one as canonical (suggest non-www, more common in dev tooling), and redirect the other with a 301 in `vercel.json`:

```json
{
  "redirects": [
    { "source": "/(.*)", "has": [{"type": "host", "value": "www.nibzard.com"}], "destination": "https://nibzard.com/$1", "permanent": true }
  ]
}
```

#### The boost backlog (sorted by clicks-on-the-table, top 12)

Methodology: current clicks vs estimated clicks at pos 1-3 (assuming 4% CTR top-3). "Lost" = unrealized clicks per quarter.

| Page | Top query | Pos | Impr | CTR | Lost | Suggested boost |
|------|-----------|-----|------|-----|------|----------------|
| `/claude-zhipu/` | zhipu claude code | 6.9 | 13,527 | 0.4% | **~490** | Rewrite title — CTR is 1/10 of normal. Likely competing with a featured snippet or stronger result. Try title: "Zhipu GLM via Claude Code — setup, gotchas, and what works (2026)". Add a TL;DR table. Verify schema. |
| `/claude-code` | mastering claude code | 7.5 | 9,412 | 1.3% | ~250 | Multiple queries hitting this (Boris Cherny talk-related). Add an H2 with exact phrase "Mastering Claude Code in 30 minutes (Boris Cherny)" if relevant, plus FAQ entries on the top 5 specific questions. Add internal links from `/log/unified-skills` and `/log/theloop`. |
| `/ssh-tunnel-cloudflare` | ssh tunnel cloudflare | 8.6 | 6,814 | 0.6% | ~235 | Title + meta likely too generic. Try: "SSH Tunneling via Cloudflare Tunnels — the 2026 setup that actually works". Add a code block at top (people skim for the command). |
| `/x-grok-algorithm` | x grok algorithm | 7.0 | 2,422 | **0.1%** | ~95 | **Disaster CTR — 2 clicks on 2,422 imp.** Title/meta failing entirely. Rewrite both. Try: "X's Grok Algorithm: how the January 2026 rewrite works (full breakdown)". Add a date in title — algorithm queries want freshness. |
| `/agentic-handbook` | agentic ai handbook | 6.5 | 4,896 | 2.1% | ~91 | Already converting. Add author markup, ratings/social proof, and an H2 for "is it free / where to read it" (queries suggest informational intent). |
| `/berghain/` | berghain challenge | 7.9 | 2,223 | 0.6% | ~76 | Multiple Berghain queries — game / challenge / listen labs. Audience is broader than expected. Add an H2 "What is the Berghain challenge?" with a 100-word direct answer, then your detailed take below. |
| `/ampcode` | ampcode | 9.5 | 1,152 | 0.2% | ~44 | Audit what people expect from this query — probably the AmpCode tool. Make sure post title contains "AmpCode" prominently. |
| `/looper-article` | looper ai | 10.2 | 1,254 | 1.0% | ~38 | Add FAQ schema. Title might need year ("Looper: my autonomous coding system (2026)"). |
| `/dotfiles/` | nibzard dotfiles | 10.8 | 1,495 | 1.5% | ~38 | Lower-priority pos 10+ ranks. Add internal links from `/about` and `/projects`. |
| `/projects` | nikola balic projects | 5.6 | 840 | 0.5% | ~30 | Title should include "Nikola Balić" — brand search behavior. Add a recent-projects block at the top (right now it may be stale-looking). |
| `/log` | nikola balic blog | 5.7 | 555 | 0.2% | ~21 | Add H1 "Nikola Balić's blog — AI engineering, agents, growth". Surface 3 most-recent + 3 most-popular posts above the fold. |
| `/about` | nikola balic about | 4.7 | 369 | 1.9% | ~9 | Already near top-3. Tighten the lede to win the snippet — "Nikola Balić builds AI systems and writes about what works in production." First 160 chars should be punchy. |

**Brand-name issue worth noting:** "nikola balic" search puts nibzard.com at pos 9.6 (83 imp, 7.2% CTR). Someone else with the same name is outranking you on your own name. Add structured Person schema to homepage with name variations (already done on /bio per audit). Build a few external citations (LinkedIn About link to nibzard, X bio link, GitHub bio link — all already there per about.astro). Should self-correct over 4-6 weeks.

#### High-CTR-anomaly queries (already converting, just need a small push)

Different category — these are **already converting well at striking-distance positions**. Easiest wins.

| Query | Page (likely) | Pos | CTR | Action |
|-------|---------------|-----|-----|--------|
| awesome agentic ai | `/awesome-agentic-patterns`? | 6.7 | 5.6% | Add 2 internal links to this page from related log posts |
| awesome agentic | same | 7.3 | 7.5% | Same boost lifts both queries |
| nibzard awesome agentic patterns | same | 2.0 | 6.0% | Already top-3; just keep it indexed |
| agentic ai handbook | `/agentic-handbook` | 5.4 | 4.4% | Already covered in main backlog |
| nikola balic | `/about` or `/` | 9.6 | 7.2% | Brand-name fix per above |

#### Action sequence

1. **Fix www vs non-www redirect first** (Phase 0 prerequisite — without this, boosts leak value)
2. **Pick 3 highest-leverage pages** for the first boost session: `/claude-zhipu/`, `/claude-code`, `/x-grok-algorithm`. Together: ~835 clicks/quarter on the table.
3. **Per page, 30-60 min**: rewrite title + meta description, add a TL;DR or H2 matching the top query, verify schema. Don't do anything else (surgical edits only — wholesale rewrites lose existing ranking signal).
4. **Wait 2-4 weeks** for re-indexing + rank stabilization. Track position changes in GSC.
5. **Re-export GSC** and update this section. Repeat.

Re-pull cadence: every 4-6 weeks on a content site this active.

---

## Keyword research snapshot

### Recipe A — Domain Rating
- **STUBBED** — see roadmap header. Hobby-tier Steel hit Cloudflare CAPTCHA on Ahrefs Free; Ubersuggest gates results behind sign-in. Pull real DR via Niko's existing Ahrefs access or Open PageRank free API key.

### Recipe B — Competitor reverse-lookup
- **N/A** — personal blog, no SaaS competitors. See `.seo/brand.md` "Competitors" section for the comparable-blogs list (Simon Willison, Eugene Yan, Lilian Weng, Latent.Space, Hamel Husain).

### Recipe C — Topic cluster discovery (Google Autocomplete, real)

Pulled live via `suggestqueries.google.com` on 2026-05-13. Top suggestions per seed:

- **"multi-agent orchestration"** → patterns, frameworks, system, platform, **claude**, copilot studio, github
- **"claude code skills"** → marketplace, github, examples, repo, library, directory, folder
- **"ai agent patterns"** → github, anthropic, book, google, react, **design patterns**, **architecture patterns**
- **"ai engineering production"** → polluted by manufacturing-context results; pivot to "ai engineering patterns" or "ai engineering blog" as future seeds
- **"agent loop"** → diagram, ai, **claude**, **claude code**, **architecture**, anthropic, design
- **"ai startup moat"** → mostly informational ("most profitable", "most successful"); not a strong commercial-intent target

**Implication:** the cluster names should align with what people actually search. Use "patterns" and "architecture" and "design" as anchor words in pillar URLs/titles. "claude code skills" autocomplete strongly suggests there's a real audience searching for what Niko already writes about.

### Recipe D — Comparison volume
- **N/A** — personal blog has no comparison-purchase intent.

### Recipe E — Striking distance (GSC pos 5-20)
- **Active.** Analyzed 2026-05-13 from `.seo/gsc-snapshots/2026-05-13/`. **30 striking-distance queries** with impressions ≥30; **12 pages with ≥100 impressions** account for an estimated 1,500 clicks/quarter on the table. See Phase tracker → "Ongoing — Striking-distance boosts" for the full backlog.

---

## Technical foundations findings

From `scripts/tech_audit.py` run on 2026-05-13 against https://nibzard.com:

| Check | Status | Detail |
|---|---|---|
| robots.txt | PASS | references sitemap |
| sitemap.xml | PASS | found at /sitemap-index.xml |
| HTTPS redirect | FAIL (likely script false positive) | needs manual verification |
| Homepage title | PASS | 14 chars, "nibzard - Home" |
| Meta description | WARN | 41 chars (under 140) |
| Canonical | PASS | self-referencing |
| Mobile viewport | PASS | width=device-width |
| H1 | **FAIL** | no `<h1>` on homepage (real issue) |
| Schema | PASS | WebSite, Person |
| OG tags | WARN | og:description missing |

**Phase 0 items derived from this audit** are listed at the top of the Phase tracker.

---

## Off-page checklist

See `references/off-page.md` for the full playbook. Personal-blog adaptation:

- [x] Sitemap exists at `/sitemap-index.xml` (Astro sitemap integration is wired)
- [ ] Submit sitemap to Google Search Console + Bing Webmaster Tools
- [ ] Brand citations: nibzard.com is already linked from Niko's other profiles (about.astro shows X, GitHub, LinkedIn). Add Substack, dev.to, HackerNoon profile bio links if applicable.
- [ ] Strategic outreach (Phase 4 dependency): once a pillar ships, reach out to one of the comparable-blog authors (Simon Willison, Eugene Yan, etc.) — not for a link beg, but with a relevant data point that complements something they're writing about. 1-2 of these per quarter is plenty.
- [ ] Consider repurposing top log posts as guest posts on dev.to / HackerNoon / Medium with canonical link back to nibzard.com (passes SEO juice without losing the readership).

---

## What this skill did and didn't do (dogfood notes for the skill itself)

**Worked well:**
- Stack detection (Astro 5) — clean
- Brand context inference from README + about/bio pages — produced a coherent `.seo/brand.md` without `AskUserQuestion`, all inferences tagged `[INFERRED]`
- Google Autocomplete (Recipe C) — no auth, no browser, real signal
- `scripts/tech_audit.py` — surfaced **real** issues (missing H1, short meta description, missing og:description). This is the script earning its keep.
- Personal-blog adaptation handled gracefully — the skill correctly identified that Phase 1/2 don't apply, instead of force-fitting them

**Hit real-world limits:**
- **Recipe A (DR) blocked by Cloudflare CAPTCHA** under hobby-tier Steel. Marked STUBBED per skill's "never fabricate" rule. Recommendation: Niko has Ahrefs access from past work; pull DR manually, or use Open PageRank free API.
- **Recipe B and D** correctly skipped as N/A for a personal blog.
- **Recipe E (striking-distance)** correctly deferred — depends on GSC connection.

**Surfaced skill limitations (worth filing for iteration 3):**
- `link_audit.py` treats every `.astro` file as a routable URL → many false-positive orphan reports for components/layouts. Fix: scope orphan detection to `src/pages/` and `src/content/` only.
- `tech_audit.py`'s HTTPS check uses `urllib` which doesn't follow Vercel-style edge redirects accurately. Either improve the check, or label the WARN clearly as "verify manually."
- Skill doesn't have a "personal blog" mode in references/methodology.md. The adaptation here was inferred. Worth adding a personal-blog playbook (or a "non-SaaS" branch in methodology).

---

## Next steps for Niko

In order of priority:

1. **Fix Phase 0 items** — especially the missing H1 and short meta description on the homepage. 30-60 minutes of work, immediate SEO benefit.
2. **Run broken-link cleanup** — `link_audit.py --broken-only` and fix the 101 broken links. Half-day of work.
3. **Pull real DR** — paste it into the roadmap header.
4. **Connect GSC** — single highest unlock for ongoing work. Even before pillars ship, current posts will reveal striking-distance opportunities.
5. **Pick the first pillar** — recommend `/playbooks/claude-code-skills` (autocomplete signal is strong + Niko has the most-recent material to cluster around). Single pillar in 1-2 weeks, then re-evaluate before starting the next.
