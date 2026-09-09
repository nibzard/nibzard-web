# Research: They're Farming Us

> The article argues that frontier AI tokens are subsidized because labs are "farming" users for use cases (free R&D), that model deprecation is a control lever the labs haven't fully pulled, and that a "crunch" is coming because the inference infrastructure for end-user-scale agents doesn't yet exist — with the router gold rush (OpenRouter, Ramp, Cursor) read as evidence of commoditization panic. The research broadly *confirms* the deprecation-acceleration thesis (and makes it stronger than the draft's soft wording), confirms the industry is burning cash, and confirms the commoditization/router wave is real. It *corrects* three load-bearing facts: the "OpenRouter acquisition" is actually acquisition-*talks* (Stripe, ~$10B, no deal closed) and the "everyone shipped a router in reaction" framing is chronologically impossible; the "inference infrastructure doesn't exist" premise misidentifies the bottleneck (hardware is shipping at record volume — the real constraint is the power grid); and the Ramp/Cursor specifics contain several errors (not open-sourced, wrong author/title, wrong feature name). It *complicates* the subsidy claim: no lab discloses per-token COGS, so "tokens below marginal cost" is unverifiable as stated, and Sequoia's $600B figure measures infra spend vs. revenue, not per-token margin (a category error to cite as subsidy proof). It also flags a conflict-of-interest: the author is Steel's growth lead (browser infra), so the inference-crunch claim sits outside both his product domain and stated expertise and should be sourced rather than asserted.

## TL;DR for the author
- **Lead correction — "OpenRouter acquisition news broke" is acquisition-TALKS, not a deal.** Stripe is in talks to buy OpenRouter for ~$10B (WSJ/The Information, Jul 23, 2026 — the draft's own date); no transaction has closed and the talks "could still fall apart." Reframe precisely.
- **The causal "everyone shipped a router in reaction" is chronologically impossible.** Ramp shipped Jul 20 and Cursor Jul 22; the Stripe–OpenRouter news broke the evening of Jul 23. Both routers *predate* the news. Reframe as a concurrent 2026 wave, not a reaction.
- **The deprecation thesis is STRONGER than the draft's wording.** Every 2026 Anthropic deprecation ran at the ~60-day contractual floor (vs. ~6 months for older-gen models); the entire Opus lineage churned in under two years. Use the specific dates — they land harder than "notice how fast."
- **The "inference infrastructure doesn't exist" frame is misidentified.** Hardware is shipping at record volume (NVIDIA $75.2B/qtr data-center revenue); the genuine binding constraint is the power grid (4–8 year transmission lead times, ~20% of projects at risk). Reframe the crunch around grid buildout vs. product cycles.
- **Fix the Ramp/Cursor specifics:** Ramp's router is NOT open-sourced (closed beta); the primary author is Kedar Thakkar, not "CTO Rahul Sengottuvelu" (Ramp's CTO is Karim Atiyeh); Cursor's feature is "Cursor Router," not "Premium model routing."
- **Keep the subsidy hedge; don't overclaim Sequoia.** "I don't claim to know the number" is the correct posture (no lab discloses per-token COGS). Cite Sequoia's $600B for "the industry invests far more than it earns," not as proof of per-token subsidy. And disclose the Steel affiliation in the frontmatter (currently absent).

## Claims verification

| Claim in draft | Verdict | Evidence | Source |
|---|---|---|---|
| "Token-maxing as the default culture… nobody optimizes a prompt" | Personal anecdote | Author's characterization of his own working environment; not independently checkable as an external fact | — |
| "Labs give capability away at prices nobody can verify are sustainable" | Confirmed | No lab discloses per-token COGS or inference unit economics; the hedge ("I don't claim to know the number") is the correct posture | https://docs.anthropic.com/en/docs/about-claude/pricing |
| Tokens are subsidized / sold below cost (the farming thesis) | Unverifiable | Industry losses are documented (OpenAI ~$5B loss 2024, ~$9B loss 2025), but no per-token margin data exists; Sequoia's $600B measures infra spend vs. revenue, not per-token margin | https://www.sequoiacap.com/article/ais-600b-question/ ; https://en.wikipedia.org/wiki/OpenAI |
| "Every session is free R&D… they're farming us for use cases" | Personal anecdote | Framing/thesis, not an externally checkable fact; the *incentive* logic is internally coherent | — |
| "Notice how fast models get deprecated already" | Confirmed | Cadence is accelerating: older-gen models got ~6 months, every 2026 Anthropic deprecation ran at the ~60-day floor | https://platform.claude.com/docs/en/docs/about-claude/model-deprecations |
| Deprecation today is "the gentle version" / notice ~6–12 months | Partly true | OpenAI GA floor is 6 months; Anthropic's floor is 60 days and is actively used. "6–12 months" / "gentle" overstates Anthropic's actual practice | https://developers.openai.com/api/docs/deprecations ; https://platform.claude.com/docs/en/docs/about-claude/model-deprecations |
| Deprecation is "a control lever they haven't fully pulled yet" | Partly true | It's already being pulled hard: Opus 4 retired, Opus 4.1 deprecated, Opus lineage churned in <2 years; "not fully pulled" undersells the current state | https://platform.claude.com/docs/en/docs/about-claude/model-deprecations |
| "The inference infrastructure for end-user-scale agent usage doesn't exist yet" | Partly true | Inference hardware is shipping at record volume (NVIDIA $75.2B/qtr DC revenue); the real binding constraint is the power grid, not silicon | https://investor.nvidia.com/financial-info/financial-reports/ ; https://www.iea.org/reports/energy-and-ai/executive-summary |
| "The moment OpenRouter acquisition news broke" | Refuted | No acquisition has closed. What broke Jul 23, 2026 is acquisition-TALKS: Stripe in talks to buy OpenRouter for ~$10B; "talks could still fall apart" | https://www.wsj.com/tech/ai/stripe-in-talks-to-buy-buzzy-ai-model-marketplace-openrouter-decc6a74 ; https://www.theinformation.com/briefings/stripe-talks-buy-startup-openrouter |
| "Everyone shipped a router [in reaction] — Ramp, Cursor" | Refuted (causally) | Ramp shipped Jul 20, Cursor Jul 22; Stripe–OpenRouter news broke Jul 23. Both routers predate the news — not a reaction | https://builders.ramp.com/post/thompson-sampling-model-routing ; https://cursor.com/blog/router ; https://news.ycombinator.com/item?id=49027985 |
| Ramp shipped a real AI model router | Confirmed | Ramp Builders blog, Jul 20, 2026; Thompson sampling over lognormal latency posteriors; ~25–30% cost reduction | https://builders.ramp.com/post/thompson-sampling-model-routing |
| Ramp router processes "trillions of tokens/day" | Confirmed | Stated directly in Ramp's primary blog post | https://builders.ramp.com/post/thompson-sampling-model-routing |
| Ramp router serves "100+ internal use cases" | Partly true | Token volume is Ramp-sourced; the 100+ count comes only from secondary reporting (RuntimeWire), not the primary post | https://runtimewire.com/article/ramp-router-ai-model-gateway-llm-costs |
| Ramp router is "open-sourced" | Refuted | No Ramp GitHub org exists; "opens" in headlines means opened beta access, not open-sourced code | https://api.github.com/orgs/ramp |
| "CTO Rahul Sengottuvelu" built/announced the Ramp router | Refuted | Post authored by Kedar Thakkar; Ramp's CTO is co-founder Karim Atiyeh. Sengottuvelu is an AI leader but not CTO and did not author the post | https://builders.ramp.com/post/thompson-sampling-model-routing ; https://runtimewire.com/article/ramp-router-ai-model-gateway-llm-costs |
| Cursor has "Premium model routing" | Refuted | Feature is "Cursor Router" (Jul 22, 2026); phrase "Premium model routing" does not exist (likely confused with "Premium requests" billing quota) | https://cursor.com/blog/router |
| "Everyone senses margin migrating to whoever controls model access" | Confirmed | a16z argues value skews to compute/infra; routers are demonstrably thin (OpenRouter 5.5% fee, free up to $25k/mo BYOK) | https://a16z.com/who-owns-the-generative-ai-platform/ ; https://openrouter.ai/pricing |
| "If your product only works at subsidized token prices, you don't have a product — you have a grant" | Personal anecdote | Framing/aphorism; not externally checkable | — |
| (Frontmatter, implicit) Author's expertise sits in the inference-infra layer | Personal anecdote / COI | Author is founding growth lead at Steel (browser infra, not inference); no Steel affiliation is disclosed in the frontmatter | file:///Users/nikola/dev/nibzard-web/src/content/log/agent-web.md |

## Factual corrections needed

1. **"OpenRouter acquisition news broke" → acquisition-TALKS.** No deal has closed. Stripe is in talks to buy OpenRouter for ~$10B (WSJ, Berber Jin/Lauren Thomas/Kate Clark; The Information, Jul 23, 2026); kernel.news (Jul 24) calls them "advanced discussions," and The Information says the talks "could still fall apart." Reframe as "acquisition-talks news" or "when Stripe's ~$10B OpenRouter bid became public." → https://www.wsj.com/tech/ai/stripe-in-talks-to-buy-buzzy-ai-model-marketplace-openrouter-decc6a74

2. **"Everyone shipped a router in reaction to OpenRouter news" → a concurrent wave, not a reaction.** Ramp shipped Jul 20 21:09 UTC, Cursor shipped Jul 22 18:50 UTC; the Stripe–OpenRouter talks news broke Jul 23 ~20:59 UTC. Both routers predate the deal news by 1–3 days. A defensible framing: routing became 2026's hottest category on the back of OpenRouter's broader momentum (Series B May 30; Fusion API; Dec 2025 100T-token study). → https://news.ycombinator.com/item?id=49027985

3. **Ramp router "open-sourced" → closed beta, not open source.** No Ramp GitHub organization exists (api.github.com/orgs/ramp returns Not Found; rampinc/ramp-ai show 0 public repos). The "opens" in "Ramp opens AI model router" headlines means opened beta access, not open-sourced code. → https://api.github.com/orgs/ramp

4. **"CTO Rahul Sengottuvelu" → author is Kedar Thakkar; Ramp's CTO is Karim Atiyeh.** The router post's `<meta name=author>` is Kedar Thakkar. Sengottuvelu is a real Ramp AI leader who co-authors other posts, but he did not author this one and the "CTO" label appears only in secondary reporting (RuntimeWire). Drop the title or verify it. → https://builders.ramp.com/post/thompson-sampling-model-routing

5. **Cursor "Premium model routing" → "Cursor Router."** The actual feature is Cursor Router, launched Jul 22, 2026, with three modes (Intelligence, Balance, Cost). "Premium model routing" returns zero hits and is likely confused with Cursor's pre-existing "Premium requests" billing quota. → https://cursor.com/blog/router

6. **Implied "~6–12 month notice windows" / "the gentle version" → Anthropic's floor is 60 days and is being used.** OpenAI's GA floor is genuinely 6 months (specialized variants 3 months), but Anthropic's stated floor is only 60 days, and every 2026 Anthropic deprecation sat at that floor. "Gentle" undersells reality. → https://platform.claude.com/docs/en/docs/about-claude/model-deprecations ; https://developers.openai.com/api/docs/deprecations

7. **"The inference infrastructure… doesn't exist" → hardware exists; the grid is the bottleneck.** NVIDIA data-center revenue was $75.2B in Q1 FY2027 (+92% YoY); Microsoft is spending ~$30.9B/quarter on property and equipment. The real binding constraint is power: IEA finds ~20% of planned data-center projects risk delay from grid constraints, transmission takes 4–8 years to build, and connection-queue wait times have doubled. → https://www.iea.org/reports/energy-and-ai/executive-summary ; https://investor.nvidia.com/financial-info/financial-reports/

8. **(Preemptive — if cited) OpenRouter "~$50M ARR, April" → Sacra third-party ESTIMATE, March 2026.** The $50M figure originates with Sacra (private-markets research), dated March 2026 (not April), at a ~5% take rate. It is not company-reported. Attribute as "an estimated $50M ARR per Sacra" and use March/early-2026. → https://sacra.com/c/openrouter/

9. **(Preemptive — do NOT cite as per-token proof) Sequoia's $600B → measures infra CAPEX vs. total revenue, not per-token margin.** A lab can be unprofitable in aggregate while pricing tokens above marginal cost. Use it for "the industry invests far more than it earns," not for "tokens are sold below cost." → https://www.sequoiacap.com/article/ais-600b-question/

## Strengthening opportunities

**The deprecation lever is being pulled harder than the draft admits** → Replace "notice how fast… and that's the gentle version" with the documented acceleration: older-gen Anthropic models got ~6 months (Opus 3: 189 days; Claude 2/Sonnet 3: 181 days), but every 2026 deprecation ran at the ~60-day floor (Claude 3 Haiku 60d, Claude 3.5 Haiku 62d, Sonnet 4/Opus 4 62d, Opus 4.1 61d). The entire Opus lineage churned in under two years (Opus 3 released Feb 29, 2024; its official recommended replacement is now claude-opus-4-8). → https://platform.claude.com/docs/en/docs/about-claude/model-deprecations

**Labs are now openly acknowledging the harvest's costs** → The "farming / control lever" thesis gets corroboration from Anthropic's own deprecations page, which now explicitly states: "Researchers lose access to models for ongoing and comparative studies… Model retirement introduces safety- and model welfare-related risks." → https://platform.claude.com/docs/en/docs/about-claude/model-deprecations

**The crunch is real, but it's the grid** → Reframe "the inference infrastructure doesn't exist" as "you can't build grid capacity inside one product cycle": IEA finds ~20% of planned data-center projects risk delay from grid constraints, transmission takes 4–8 years to build in advanced economies, and connection-queue wait times have doubled in three years; data-center electricity demand is projected to more than double from 415 TWh (2024) to 945 TWh by 2030. → https://www.iea.org/reports/energy-and-ai/executive-summary

**The below-marginal-cost reading has a surprising backer** → If you want to push the subsidy claim, the strongest data point cuts your way: OpenAI's losses stayed near ~$9B even as revenue tripled to ~$13.1B in 2025. If inference were near-zero marginal cost (pure amortized fixed cost), scaling usage should have narrowed losses; instead they scaled with revenue — consistent with tokens priced near or below marginal cost. → https://en.wikipedia.org/wiki/OpenAI

**The commoditization panic has a smoking gun** → For "routing is a thin commodity," cite the category leader's own pricing: OpenRouter charges ZERO fees on the first $25,000/month of BYOK inference ($200k/month on Enterprise) before any 5% fee kicks in (pay-as-you-go is 5.5%). The largest gateway giving its core service away free to mid-size customers is the most damning datapoint. → https://openrouter.ai/pricing

**"The bill will come" has concrete industry numbers** → Sequoia's $600B Question (infra-spend-vs-revenue gap; the earlier $200B version put it at $125B nine months prior) and OpenAI's projected ~$115B spend through 2029 are concrete, citable figures for "someone expects to recoup this" — just frame them as aggregate-investment-gap, not per-token proof. → https://www.sequoiacap.com/article/ais-600b-question/ ; https://en.wikipedia.org/wiki/OpenAI

## Counter-evidence & risks

### Inference prices are falling, not rising
The pure "price crunch" (tokens get more expensive) is contradicted by primary pricing. Anthropic Opus fell from $15/$75 to $5/$25 per MTok across three generations; Sonnet 5 launched at an introductory $2/$10; prompt caching cuts cached input to 0.1x (90% off); the Batch API is 50% off. Epoch AI finds ML-GPU price-performance (FLOP/$) has doubled roughly every 2.1 years. The author's hedge — that the crunch takes the form of "access or capability tiering" rather than price — is the defensible version; the plain "prices go up" prediction runs against the observed trend. → https://docs.anthropic.com/en/docs/about-claude/pricing ; https://epoch.ai/blog/trends-in-machine-learning

### a16z: value accrues to compute, not to gateways or model labs
The article's "everyone senses margin migrating to whoever controls model access" assumes gateways/routers are where the defense gets built. a16z's "Who Owns the Generative AI Platform?" (Casado et al.) argues the opposite: infrastructure/compute vendors are "likely the biggest winners, capturing the majority of dollars," while model providers face commoditization and "graduation risk" and apps suffer eroding margins. So the cleanest counter to "routing is the moat" is not a flip to "frontier models are the moat" (a16z undercuts that too) but "gateways are squeezed from both sides; compute wins." The article should engage this rather than present model-layer-vs-router as the only axis. → https://a16z.com/who-owns-the-generative-ai-platform/

### Routing is a self-hostable commodity (LiteLLM)
The gateway function has no proprietary moat: LiteLLM (open source) provides the same unified OpenAI-format interface, retry/fallback routing, spend tracking, virtual keys, multi-tenant cost controls, and admin dashboard as commercial gateways — free, self-hosted, 100+ models across 11+ providers. Switching cost to self-host is near zero, which undercuts the "routing is where the defense gets built" framing. → https://github.com/BerriAI/litellm

### The GPU-shortage premise is a 2023-era narrative
The crunch thesis leans on an inference-hardware scarcity premise that has largely subsided. Sequoia's David Cahn noted the GPU supply shortage had subsided by mid-2024; NVIDIA data-center revenue hit $75.2B in a single quarter (+92% YoY); Blackwell (B100/B200, ~2.5x performance for ~25% more cost) is shipping in volume. No 2025–2026 primary source located describes a current GPU famine for inference — the constraint narrative migrated from chips to power. Drop "GPU shortage" framing if present. → https://www.sequoiacap.com/article/ais-600b-question ; https://investor.nvidia.com/financial-info/financial-reports/

### Sequoia's $600B is a category error for the per-token claim
Sequoia's figure compares total datacenter spend (Nvidia run-rate × 2 for non-GPU costs × 2 for cloud gross margin) to total AI revenue (~$100B at the time). It is a macro investment-risk argument about "investment incineration" and GPU commoditization — David Cahn does not assert that API tokens are individually underpriced relative to marginal cost. Citing it as direct evidence for the per-token subsidy overstates what it shows; reserve it for the aggregate-investment-gap claim. → https://www.sequoiacap.com/article/ais-600b-question/

### Author conflict-of-interest / expertise scope
The author is founding growth lead at Steel, a browser-infrastructure company (managed cloud browser sessions for agents), not an inference/compute company. The article's headline "crunch" claim concerns the inference layer — adjacent to, but outside, both his product domain and his stated role. It is not directly self-serving (Steel does not sell inference), but the claim rests on adjacent rather than direct expertise, so it should be sourced to primary evidence (lab financials, GPU capacity data, IEA grid figures) rather than asserted from authority. The Steel affiliation should also be disclosed in the frontmatter, which it currently is not. → file:///Users/nikola/dev/nibzard-web/src/content/log/agent-web.md ; https://docs.steel.dev/

## Related work & prior art

- **a16z, "Who Owns the Generative AI Platform?" (Martin Casado et al., 2023)** — the canonical value-stack/margin-distribution analysis; argues compute/infra captures value while models and apps are squeezed. Essential counter-position to engage. → https://a16z.com/who-owns-the-generative-ai-platform/
- **Sequoia / David Cahn, "AI's $600B Question" (Jun 2024)** and the earlier **"AI's $200B Question" (Sep 2023)** — the infra-spend-vs-revenue gap framing (gap roughly quadrupled in nine months). → https://www.sequoiacap.com/article/ais-600b-question/
- **Ben Thompson, "AI and the Big Five" (Stratechery, Jan 2023)** — compute-as-moat framing complementary to a16z. → https://stratechery.com/2023/ai-and-the-big-five/
- **Epoch AI trends** (compute ~5x/yr, training cost ~3.5x/yr since 2020; software efficiency ~3x/yr) and **"Can AI scaling continue through 2030?" (Aug 2024)** — cost trajectories; the scaling report explicitly declines to answer the revenue/economics question. → https://epoch.ai/trends ; https://epoch.ai/publications/can-ai-scaling-continue-through-2030
- **Anthropic, "Commitments on Model Deprecation and Preservation"** — labs acknowledging the researcher-access and model-welfare costs of retirement; commits to preserving weights "for the lifetime of Anthropic." A useful counterpoint to cite. → https://www.anthropic.com/research/deprecation-commitments
- **IEA, "Energy and AI" (Apr 2025)** and **"Electricity 2025" (Feb 2025)** — the power/grid constraint data underpinning the reframed crunch. → https://www.iea.org/reports/energy-and-ai/executive-summary ; https://www.iea.org/reports/electricity-2025
- **LiteLLM** — open-source router/gateway as the commodity baseline that defines the routing layer's low ceiling. → https://github.com/BerriAI/litellm
- **Ramp's "Online Learning for Cost-Efficient LLM Routing"** — a peer example of an in-house gateway (Thompson sampling over latency posteriors) worth citing as the pattern, not just the news. → https://builders.ramp.com/post/thompson-sampling-model-routing
- **Gap to flag:** no prior-art source for the "farming" metaphor itself surfaced in the research; if the author develops the attention-economy/harvest analogy, no canonical reference was found to credit.

## Source library

**OpenRouter / Stripe acquisition talks & funding**
- WSJ — Stripe in Talks to Buy Buzzy AI-Model Marketplace OpenRouter (Jul 23, 2026) — https://www.wsj.com/tech/ai/stripe-in-talks-to-buy-buzzy-ai-model-marketplace-openrouter-decc6a74
- The Information — Stripe in Talks to Buy Startup OpenRouter (Jul 23, 2026) — https://www.theinformation.com/briefings/stripe-talks-buy-startup-openrouter
- Techmeme aggregation — Sources: Stripe is in talks to acquire OpenRouter (Jul 23, 2026) — https://www.techmeme.com/260723/p52
- PYMNTS — Stripe Eyes $10 Billion Deal for AI Model Marketplace OpenRouter (Jul 23, 2026) — https://www.pymnts.com/news/artificial-intelligence/2026/stripe-eyes-10-billion-deal-for-ai-model-marketplace-openrouter/
- kernel.news — Stripe Nears $10 Billion OpenRouter Acquisition (Jul 24, 2026) — https://kernel.news/2026/07/24/stripe-nears-10-billion-deal-for-ai-startup-openrouter/
- citybiz — Stripe Reportedly Nears $10B Acquisition of AI Startup OpenRouter (Jul 23, 2026) — https://www.citybiz.co/article/878774/stripe-reportedly-nears-10b-acquisition-of-ai-startup-openrouter/
- techflier — OpenRouter draws multibillion-dollar takeover interest from big tech (Jul 19, 2026) — https://techflier.com/2026/07/19/openrouter-draws-multibillion-dollar-takeover-interest-from-big-tech/
- OpenRouter Blog — Raises $113M Series B, led by CapitalG (May 26, 2026, official) — https://openrouter.ai/blog/announcements/series-b/
- arr.club — OpenRouter valuation doubles to $1.3B (May 27, 2026) — https://www.arr.club/openrouter/openrouter-valuation-doubles-to-1-3b-driven-by-5x-token-processing-growth
- aidb.digital — OpenRouter raises $113M Series B led by CapitalG ($1.3B valuation) (May 27, 2026) — https://aidb.digital/blog/2026-05-27-openrouter-raises-113m-series-b-led-by-capitalg-for-ai-model-routing/
- Sacra — OpenRouter revenue, valuation & funding (primary source of the ~$50M ARR estimate, dated March 2026) — https://sacra.com/c/openrouter/
- Sacra PDF — OpenRouter at $100M GMV (historical $5M ARR May 2025 baseline) (Jul 4, 2025) — https://sacra-pdfs.s3.us-east-2.amazonaws.com/openrouter-100m-gmv.pdf
- PitchBook — OpenRouter company profile (total funding ~$164M) — https://pitchbook.com/profiles/company/593134-93
- OpenRouter — Pricing (5.5% fee; free up to $25k/mo BYOK; $200k/mo Enterprise) — https://openrouter.ai/pricing

**Ramp & Cursor routers**
- Ramp Builders — Online Learning for Cost-Efficient LLM Routing (Jul 20, 2026, primary) — https://builders.ramp.com/post/thompson-sampling-model-routing
- RuntimeWire — Ramp opens AI model router, says it cut internal LLM costs 30% (Jul 20, 2026) — https://runtimewire.com/article/ramp-router-ai-model-gateway-llm-costs
- Ramp Builders — You're Spending Too Much on AI (co-authored by Sengottuvelu; Jun 17, 2026) — https://builders.ramp.com/post/ai-spend-value
- GitHub API — orgs/ramp (Not Found; confirms no open-sourcing) — https://api.github.com/orgs/ramp
- Hacker News — Ramp opens AI model router (= opens beta access) (Jul 20, 2026) — https://news.ycombinator.com/item?id=48984923
- Cursor Blog — Introducing Cursor Router (Jul 22, 2026, official) — https://cursor.com/blog/router
- Cursor changelog (Jul 22, 2026) — https://www.cursor.com/changelog
- Cursor forum — Introducing Cursor Router (Jul 22, 2026) — https://forum.cursor.com/t/introducing-cursor-router/166386
- Hacker News — Stripe in talks to buy OpenRouter (deal-news timestamp, Jul 23, 2026) — https://news.ycombinator.com/item?id=49027985

**Model deprecation (primary docs)**
- Anthropic — Model deprecations (official; full history table) — https://platform.claude.com/docs/en/docs/about-claude/model-deprecations
- OpenAI — Model deprecations (official; notice periods) — https://developers.openai.com/api/docs/deprecations
- Anthropic — Claude on Google Cloud Vertex AI (model table) — https://platform.claude.com/docs/en/build-with-claude/claude-on-vertex-ai
- Anthropic — Commitments on Model Deprecation and Preservation — https://www.anthropic.com/research/deprecation-commitments

**Inference economics / subsidy**
- Sequoia / David Cahn — AI's $600B Question (Jun 20, 2024) — https://www.sequoiacap.com/article/ais-600b-question/
- OpenAI financials 2024–2025 (Wikipedia, compiling primary reporting/filings) — https://en.wikipedia.org/wiki/OpenAI
- GPT-4 (Wikipedia; cites Altman/Forbes "> $100M" training cost) — https://en.wikipedia.org/wiki/GPT-4
- Anthropic — API pricing (caching/batch/tiers, July 2026) — https://docs.anthropic.com/en/docs/about-claude/pricing
- Anthropic — Prompt Caching announcement (90% reduction, Aug 2024) — https://claude.com/blog/prompt-caching
- Epoch AI — Trends (compute ~5x/yr; cost ~3.5x/yr; software efficiency ~3x/yr) — https://epoch.ai/trends
- Epoch AI — Can AI scaling continue through 2030? (Aug 2024) — https://epoch.ai/publications/can-ai-scaling-continue-through-2030
- Epoch AI — Trends in Machine Learning Hardware (Nov 9, 2023; FLOP/$ ~doubles every 2.1 yrs) — https://epoch.ai/blog/trends-in-machine-learning

**Infrastructure / power grid**
- NVIDIA Investor Relations — Q1 FY2027 financial results — https://investor.nvidia.com/financial-info/financial-reports/
- Microsoft — FY26 Q3 earnings press release (~$30.9B property/equipment additions) — https://www.microsoft.com/en-us/Investor/earnings/FY-2026-Q3/press-release-webcast
- IEA — Energy and AI, executive summary (Apr 10, 2025) — https://www.iea.org/reports/energy-and-ai/executive-summary
- IEA — Electricity 2025 (Feb 14, 2025) — https://www.iea.org/reports/electricity-2025

**Routers as commodity / value-stack theory**
- LiteLLM documentation (open-source proxy/router/gateway) — https://docs.litellm.ai/
- BerriAI/litellm (GitHub) — https://github.com/BerriAI/litellm
- a16z — Who Owns the Generative AI Platform? (Casado et al., 2023) — https://a16z.com/who-owns-the-generative-ai-platform/
- Stratechery / Ben Thompson — AI and the Big Five (Jan 2023) — https://stratechery.com/2023/ai-and-the-big-five/

**Steel / author entity (conflict-of-interest context)**
- Steel homepage (steel.dev) — https://steel.dev
- Steel documentation (browser-only scope, no inference/compute) — https://docs.steel.dev/
- steel-dev/steel-browser (GitHub) — https://github.com/steel-dev/steel-browser
- steel-dev GitHub organization — https://github.com/steel-dev
- Author's "Why I joined Steel" post (local mirror, Feb 2, 2026) — file:///Users/nikola/dev/nibzard-web/src/content/log/agent-web.md
- LESSONS_LEARNED.md — author bio entry (Oct 31, 2025) — file:///Users/nikola/dev/nibzard-web/LESSONS_LEARNED.md
- Steel blog index — https://steel.dev/blog
- Draft article (local, Jul 23, 2026) — file:///Users/nikola/dev/nibzard-web/src/content/log/farming.md
- Crunchbase — Steel.dev profile (access blocked; no verifiable funding figure found) — https://www.crunchbase.com/organization/steel-dev
- TechCrunch search — "steel.dev" (zero results) — https://techcrunch.com/?s=steel.dev
