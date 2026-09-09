# Research: Packaging Is the Product Now

The article argues that building (prototyping) is now cheap — "two days and you have something working" — so the scarce, decisive skills are use-case discovery and packaging, and that engineers are structurally bad at this because to them every use case looks equally doable ("the Lego problem"). The research broadly **confirms** the cheap-prototyping phenomenon (Karpathy's "vibe coding," YC's 25%-of-batch-95%-AI figure, Altman's "idea guys" essay) and the Steel "some assembly required" framing is accurate. But it **refutes** two load-bearing claims: the "nothing changed technically in December" line (Opus 4.5, Claude Code for Desktop, background agents, and Claude in Chrome all shipped in the Nov–Dec 2025 window), and the headline "your ability to build has never mattered less" (which conflates throwaway prototypes with durable, secure, maintainable production software). It **complicates** the central thesis in three ways: discovery itself is being productized (Hebbia, Outset.ai), incumbent distribution may be a stronger moat than selection (Sequoia, Elad Gil), and the canonical infra counter-examples (AWS, Stripe, Twilio) are not clean refutations because they all moved up the stack — which arguably supports the article more than it weakens it.

## TL;DR for the author

- **Fix the December claim.** "Nothing changed technically" is refuted by Anthropic's own changelog: Opus 4.5 launched Nov 24, 2025 and reached Pro subscribers Dec 3; Claude Code for Desktop (Nov 24), background agents (Dec 6), and Claude in Chrome (Dec 17) all shipped in the window. Reword to "the capability was there by early December, but adoption still waited for the holidays" — capability AND free time together, not free time alone.
- **Soften "your ability to build has never mattered less."** This is only true for throwaway prototypes. Karpathy limited "vibe coding" to "throwaway weekend projects"; METR's RCT found AI made experienced developers 19% *slower* on mature codebases; Willison documents that production code still needs human review for security/maintainability. Consider "prototyping is commoditized" as the precise headline.
- **Treat the "December moment" as observation, not fact.** No public usage data documents a December 2025 coding-agent viral spike. Either source a concrete data point (Anthropic's "The Making of Claude Code," Jul 6 2026, is the most likely place) or frame it as your own reading.
- **Steel framing is accurate — minor wording watch.** If you expand on Steel's offering, it is browser infrastructure + the Atlas *research harness*, not a general "agent runtime." Do not state founder names, a 2022 founding date, Tel Aviv HQ, or "$17M raised" as fact: none are verifiable from primary sources, and GitHub lists Steel's location as "United States." The verifiable CEO is "Huss" (@hussufo); the legal entity is "Nen Labs, Inc."
- **Strengthen the hook and the packaging thesis with named prior art.** Drop in Karpathy's verbatim "throwaway weekend projects" line (Feb 2, 2025), the YC 25%/95% number (Mar 6, 2025), and Altman's "the idea guys are about to have their day in the sun" (June 11, 2025).
- **Engage the strongest counter-evidence.** The cleanest steelman against you is two-layered: (a) discovery/taste is itself being automated (Hebbia, Outset), and (b) even perfect selection loses to incumbent distribution (Sequoia, Elad Gil). Notably, the "AWS won by selling bricks" counter-example does not work cleanly — AWS repeatedly tried to package the assembled set (Honeycode was shut down in 2022), which supports your thesis more than it refutes it.

## Claims verification

| Claim in draft | Verdict | Evidence | Source |
|---|---|---|---|
| "prototyping shit is super easy — you need two days and you have something working" (line from a conversation) | Personal anecdote | Private conversation; phenomenon is independently confirmed by Karpathy's "vibe coding" and YC W25 data (see next rows). | n/a (anecdote) |
| Building/prototyping is now nearly free and commoditized | Confirmed (for prototyping) | Karpathy coined "vibe coding" Feb 2, 2025 explicitly for cheap builds; YC reported 25% of W25 batch had ~95% AI-generated codebases; Collins named "vibe coding" 2025 Word of the Year. Nuance: true for throwaway work, contested for production (see METR row). | https://x.com/karpathy/status/1886192184808149383 ; https://techcrunch.com/2025/03/06/a-quarter-of-startups-in-ycs-current-cohort-have-codebases-that-are-almost-entirely-ai-generated/ |
| "anyone can build a code review agent this weekend" | Confirmed | Market is genuinely crowded: CodeRabbit, Greptile, Qodo, Bugbot, Sourcery, Codeball, Kodus, Bito all ship PR-review agents; Vercel ships a self-hostable one (1,472 stars); the long tail of independent repos is mostly under ~70 stars. | https://github.com/search?q=code+review+agent&type=repositories&s=stars&o=desc ; https://github.com/vercel-labs/openreview |
| "code review" may be "the legacy shape of something else" (packaging = redefining the thing) | Personal anecdote / opinion | Analytical framing, not externally testable. Consistent with the market-crowding evidence above. | n/a |
| Steel is "infrastructure / some assembly required" (bring your own agent, model, harness, glue) | Confirmed | Steel is an open-source browser API for AI agents (Apache-2.0, 7.4K stars); the Sessions API provides isolated cloud browser instances; customers compose Steel with their own agent/model/harness. Tagline: "Humans use Chrome, Agents use Steel." | https://steel.dev/ ; https://github.com/steel-dev/steel-browser ; https://docs.steel.dev/overview/sessions-api/overview |
| Author's "what I see at Steel" reflects first-hand exposure | Confirmed | Nikola Balić publicly announced joining Steel as "founding growth lead" on 2026-02-02. | https://steel.dev/blog/the-human-web-is-becoming-agent-web |
| Coding agents' "December moment — nothing changed technically; the experience finally got packaged into people's free time" | Refuted | Anthropic's changelog shows major capability/distribution changes in the window: Opus 4.5 launched Nov 24, 2025 (testers: "tasks near-impossible for Sonnet 4.5… now within reach"; 50–75% fewer tool-calling errors); Opus 4.5 reached Pro Dec 3; Claude Code for Desktop Nov 24; background agents Dec 6; Claude in Chrome Dec 17. | https://www.anthropic.com/news/claude-opus-4-5 ; https://code.claude.com/docs/en/changelog |
| Holiday free time drove the December adoption surge | Partly true | Timing is plausible and consistent (capability landed late Nov/early Dec, surge during holidays), but no primary usage data quantifies a December 2025 spike. The "December moment" is widely repeated developer-community narrative, not a documented event with public numbers. | https://www.anthropic.com/news |
| "Capability was never the bottleneck" | Partly true | True in the loose sense that harness/loop tooling existed through 2025; false in that the specific model powering any December surge (Opus 4.5) did not exist before Nov 24, 2025. Claude Code itself shipped as a research preview Feb 24, 2025 and reached GA May 22, 2025. | https://code.claude.com/docs/en/changelog |
| "shipping capability and waiting for use cases" is an unpaid research program for competitors | Partly true | Supported by the clearest documented infra-verticalization failure: AWS Honeycode (a packaged "assembled set" product) was shut down in 2022. Framing is the author's opinion. | https://aws.amazon.com/blogs/aws/amazon-honeycode-to-be-retired/ |
| "work backwards" — know customer, find problem, walk backwards to the stack | Personal anecdote / discipline framing | The draft does NOT attribute this to Amazon/Bezos, so there is no misattribution. It captures the customer-first *spirit* of Amazon's "working backwards" but omits the defining press-release-first PR/FAQ mechanic. The header strongly echoes Amazon's named process without delivering the named mechanic. | https://www.allthingsdistributed.com/2006/11/working_backwards.html |
| "your ability to build has never mattered less" | Refuted (for production) / Partly true (for prototypes) | Conflates prototyping with durable building. Karpathy limited "vibe coding" to "throwaway weekend projects." METR's RCT (16 experienced devs, 246 tasks) found AI made developers 19% slower on mature codebases. Willison: production code must be read/reviewed for security and maintainability. | https://simonwillison.net/2025/Mar/19/vibe-coding/ ; https://arxiv.org/abs/2507.09089 |
| Engineers are bad at picking use cases because everything looks doable | Partly true | The psychological claim ("everything looks doable") is not directly testable, but the crowding evidence is consistent: low barriers produce hundreds of toy clones while leaders pull away on distribution (CodeRabbit 15K+ customers; Greptile $25M Benchmark Series A, Sept 2025). Suggests building is cheap but *winning* still requires more. | https://www.coderabbit.ai ; https://www.greptile.com/blog/series-a |
| (Implied context) Steel founded 2022, Tel Aviv HQ, founders "Hussien Hussien & Nasr Mohamed," ~$17M raised | Unverifiable | None of these appear in the draft body, but all are widely repeated and NONE could be corroborated from primary sources. GitHub org lists location as "United States" (contradicting Tel Aviv). Only verifiable CEO is "Huss" (@hussufo). "$17M" traces to PitchBook-derived search summaries; no primary announcement found. Legal entity: "Nen Labs, Inc." | https://github.com/steel-dev ; https://steel.dev/ |

## Factual corrections needed

1. **"Nothing changed technically" in December** → This is directly contradicted by Anthropic's changelog. Opus 4.5 (a new flagship model Anthropic's testers called a meaningful capability jump) launched Nov 24, 2025 and reached Pro subscribers Dec 3, 2025; Claude Code for Desktop (Nov 24), background agents (Dec 6), and Claude in Chrome Beta (Dec 17) all shipped in the December window. Reword to something like "the capability was there by early December, but the surge still waited for the holidays" — capability AND packaging-together, not packaging alone. → https://www.anthropic.com/news/claude-opus-4-5 ; https://code.claude.com/docs/en/changelog
2. **The "December moment" as a documented viral spike** → No public usage data, telemetry, or named news cycle quantifies a December 2025 coding-agent surge. Present this as the author's observation, not established fact, or cite a specific source. Anthropic's "The Making of Claude Code" (published Jul 6, 2026) is the most likely place such data appears, but its content was not retrievable in the research pass — read it before publishing. → https://www.anthropic.com/news
3. **"Your ability to build has never mattered less" (headline conclusion)** → Over-broad. What is commoditized is throwaway prototyping, not durable building. Karpathy himself limited "vibe coding" to "throwaway weekend projects"; METR's randomized trial found AI made experienced developers 19% *slower* on mature codebases (arXiv:2507.09089); Willison documents that production code still requires human review for security, performance, and maintainability. Consider tightening to "prototyping has never mattered less." → https://simonwillison.net/2025/Mar/19/vibe-coding/ ; https://arxiv.org/abs/2507.09089
4. **Steel offering wording (if expanded)** → The draft does not mischaracterize Steel, but if you describe Steel's product in more detail, it is browser infrastructure (Sessions API, Stealth Browser Chromium fork, Dedicated IPs) plus the Atlas *research harness* — not a general "agent runtime." Steel itself does not market an "agent runtime." → https://steel.dev/blog ; https://docs.steel.dev/overview/sessions-api/overview
5. **Steel corporate facts (if referenced)** → Do not state a 2022 founding date, a Tel Aviv HQ, the founder names "Hussien Hussien / Nasr Mohamed," or a "$17M raise" as fact. All are unverified; the Tel Aviv claim is contradicted by Steel's own GitHub ("United States"). The only verifiable CEO is "Huss" (@hussufo); the legal entity is "Nen Labs, Inc." (per steel.dev footer). → https://github.com/steel-dev ; https://steel.dev/
6. **(Conditional) Corgea is not a code-review agent** → The draft does not list Corgea, but if you enumerate code-review competitors, do NOT include Corgea: it is an application-SECURITY platform (AI SAST + vulnerability remediation + pentesting; YC S23; $2.6M seed), not a PR-review agent. → https://www.ycombinator.com/companies/corgea
7. **(Conditional) "Windsurf" name** → If you reference Windsurf, note it was renamed to Devin Desktop by June 2026 (per the Claude Code changelog v2.1.162), so the name is historical as of your July 2026 publication. → https://code.claude.com/docs/en/changelog

## Strengthening opportunities

- **Opportunity: The "two days" hook is a private anecdote — give it a named public anchor.** → Suggested insertion: pair it with Karpathy's verbatim "vibe coding" tweet (Feb 2, 2025), which literally says "It's not too bad for throwaway weekend projects." Same phenomenon, recognized authority, precise date. → https://x.com/karpathy/status/1886192184808149383
- **Opportunity: Quantify "anyone can build a code review agent."** → Suggested insertion: "Y Combinator reported 25% of its Winter 2025 batch had codebases ~95% AI-generated (Mar 6, 2025)." Adds quantitative punch to the cheap-building premise. → https://techcrunch.com/2025/03/06/a-quarter-of-startups-in-ycs-current-cohort-have-codebases-that-are-almost-entirely-ai-generated/
- **Opportunity: Lend the "packaging/ideas are the product" thesis a high-profile founder voice.** → Suggested insertion: Sam Altman, "The Gentle Singularity" (June 11, 2025) — "the idea guys… are about to have their day in the sun." Note: do NOT attribute a "build in a weekend" line to Altman; that exact phrasing is not in the essay. → https://blog.samaltman.com/the-gentle-singularity
- **Opportunity: Establish this as a broad cultural moment, not just a private observation.** → Suggested insertion: Collins Dictionary named "vibe coding" its 2025 Word of the Year (announced Nov 6, 2025). → https://www.bbc.com/news/articles/cjd5l0ek0y0o
- **Opportunity: Show the cheap-prototyping arc predates 2025.** → Suggested insertion: Karpathy's 2023 claim that "the hottest new programming language is English," framing the shift as an arc rather than a sudden event. → https://en.wikipedia.org/wiki/Vibe_coding
- **Opportunity: The "work backwards" header strongly echoes Amazon's named process — make the reference land or rename it.** → If you intend the Amazon gesture, name it and describe the defining mechanic: Amazon's "working backwards" starts by writing the external-facing press release and FAQ *before* any engineering (Vogels, 2006; Bryar/Carr 2021 book). As written, the section is really an infrastructure-sequencing argument (don't build capability before a proven use case), which is related but distinct. "Amazon's working backwards method (popularized by Bezos's office)" is more accurate than "Bezos's method" if you attribute. → https://www.allthingsdistributed.com/2006/11/working_backwards.html ; https://www.workingbackwards.com
- **Opportunity: Put verified scale behind the "sell bricks vs. sell the assembled set" strategic question.** → Suggested insertion: AWS 2025 revenue was $128.7B ($45.6B operating income); Stripe processed $1.9T in payments in 2025 at 99.999% uptime. Anchors how large the primitives layer can get. → https://en.wikipedia.org/wiki/Amazon_Web_Services ; https://stripe.com/about
- **Opportunity: Add a concrete counter-data-point that actually supports your thesis.** → Suggested insertion: AWS Honeycode — Amazon's packaged no-code "assembled set" product, launched June 2020 — was shut down in 2022, a documented case of an infra company failing specifically by trying to sell the assembled set. → https://aws.amazon.com/blogs/aws/amazon-honeycode-to-be-retired/

## Counter-evidence & risks

### Prototyping ≠ building (the precision problem)
The single sharpest objection to the headline. What is commoditized is *throwaway* prototyping, not durable software. Karpathy limited "vibe coding" to "throwaway weekend projects" and conceded the code "grows beyond my usual comprehension." METR's randomized controlled trial (arXiv:2507.09089, July 2025) had 16 experienced developers do 246 tasks on mature repos and found AI tools increased completion time by 19%, despite participants predicting a 24% speedup. Willison documents that production code still requires review for security, performance, and maintainability. "Your ability to build has never mattered less" is false for anything shipped to production. Best fix: say "prototyping." → https://simonwillison.net/2025/Mar/19/vibe-coding/ ; https://arxiv.org/abs/2507.09089

### The selection skill you elevate is itself being productized
If "your ability to choose has never mattered more," that skill is being automated. Outset.ai runs hundreds of AI-moderated user interviews at once ("the same rigor at 1/20 of the cost"; customers include Microsoft, HubSpot, Coinbase, Nestlé). Hebbia markets agents that "reason over limitless context" across 1,256 documents, automating multi-step analyst workflows (find startups, analyze transcripts, draft slides), processing 1.5B pages and ~200K prompts/day. Both frame themselves as augmentation, not full replacement of judgment — but they directly undercut "taste is the scarce moat." → https://www.outset.ai/ ; https://www.hebbia.com/

### Distribution may be the real moat, not selection
A credible camp argues even perfect use-case selection loses to incumbent distribution. Sequoia's "AI's $600B Question" (David Cahn) frames the bottleneck as adoption, not capability ("Outside of ChatGPT, how many AI products are consumers really using today?"). Elad Gil's "Market Ending Moves" names distribution as king-making, and his "AI Market Clarity" warns startups face "incumbent lock in." This camp is itself contested — Andrew Chen's "Law of Shitty Clickthroughs" argues distribution advantages decay, and a16z advises building defensibility through superior product/data — but the article currently does not engage it at all. → https://www.sequoiacap.com/article/ais-600b-question/ ; https://blog.eladgil.com/p/market-ending-moves ; https://andrewchen.com/the-law-of-shitty-clickthroughs/

### The "AWS/Stripe won by selling bricks" counter-example is not clean — and that helps you
If a reader objects "but horizontal infra primitives captured all the value," note that every canonical counter-example then followed your advice by packaging up the stack: AWS launched (and shut down) Honeycode; AWS Connect, Bedrock, and Amazon One are packaged solutions; Stripe ships Atlas, Tax, and Checkout; Twilio launched Flex and acquired Segment (~$3.2B) and SendGrid; Vercel launched v0 (an AI app generator). Their revenue *core* stays primitive-shaped (EC2/S3, Stripe Payments, Twilio SMS), which is the genuine counter-force — but the cleaner read is "the brick layer keeps compounding revenue long after the packaged layer is added, and packaged products built by infra companies keep dying." The strongest *genuine* counter-example is NVIDIA, which won by selling the compute brick and notably did NOT assemble the end application. → https://aws.amazon.com/blogs/aws/amazon-honeycode-to-be-retired/ ; https://stripe.com/atlas ; https://v0.dev/ ; https://nvidianews.nvidia.com/

### Building well is still a differentiator at the top of the market
The article's own crowding evidence cuts both ways. Greptile raised a $25M Series A led by Benchmark on Sept 23, 2025 (~10 months before the draft) — top-tier VCs do not lead $25M rounds in differentiation-free categories. CodeRabbit markets itself as the "most installed AI app" with 15,000+ customers and NVIDIA as a named user; Qodo reports ~890K VS Code and ~642K JetBrains users. The market is crowded at the bottom (weekend clones) but concentrated and contested at the top, where integration depth, review quality, and enterprise trust still separate winners. The evidence supports "crowded," not "building stopped mattering." → https://www.greptile.com/blog/series-a ; https://www.coderabbit.ai ; https://www.qodo.ai

### Flag: an unverified but commonly-cited stat
A widely-quoted figure that ~80–90% of generative-AI revenue accrues to infrastructure is a real, load-bearing number for the opposing view, but the research could NOT verify it against any primary source this session (search budget exhausted; a16z pages unfetchable). Do not cite this number without re-verifying.

## Related work & prior art

- **Karpathy, "vibe coding" tweet (Feb 2, 2025)** — the canonical public expression of the "build in a weekend" phenomenon, explicitly scoped to "throwaway weekend projects." Pair directly with the author's private "two days" anecdote. → https://x.com/karpathy/status/1886192184808149383
- **Karpathy, "the hottest new programming language is English" (2023)** — earlier prior art framing the same arc. → https://en.wikipedia.org/wiki/Vibe_coding
- **NYT / Kevin Roose, "software for one" (Feb 27, 2025)** — non-coders vibe-coding small, buggy personal apps; coined "software for one." Good example of "working prototype fast, but rough." → https://www.nytimes.com/2025/02/27/technology/not-a-coder-with-ai-just-having-an-idea-can-be-enough.html
- **Altman, "The Gentle Singularity" (June 11, 2025)** — "the idea guys… are about to have their day in the sun." Direct support for the packaging/ideas thesis. → https://blog.samaltman.com/the-gentle-singularity
- **Amazon "working backwards" (Vogels, 2006; Bryar/Carr, 2021)** — the named press-release-first process the draft's header echoes. → https://www.allthingsdistributed.com/2006/11/working_backwards.html ; https://www.workingbackwards.com
- **Bezos API mandate / Yegge "Google Platforms Rant" (2011)** — the founding act of treating a company as a platform of primitives; canonical reference for the "sell bricks" philosophy. (Primary docs were unfetchable this session but the facts are undisputed.) → https://gist.github.com/chitchcock/1241613
- **Jerry Chen, "New Moats" (Greylock, 2018)** — "Systems of Intelligence" as the new moat; influential articulation of the infra-vs-apps value question. (Page is currently a 404; needs re-sourcing.) → https://greylock.com/greylock-perspectives/new-moats/
- **Jeff Lawson, "Ask Your Developer" (2021)** — Twilio's developer-primitives philosophy. → https://www.twilio.com/ask-your-developer
- **"Vibe coding hangover" / "vibe slop" literature** — the durability/quality critique (Fast Company Sept 2025; WSJ May 2026; "Vibe Coding Kills Open Source," arXiv Jan 2026). Useful for nuance. → https://www.fastcompany.com/91349825/vibe-coding-hangover ; https://arxiv.org/abs/2501.12269
- **Vercel openreview (1,472 stars)** — a self-hostable AI code-review bot; concrete evidence that "anyone can build one" is literally true at the toy level. → https://github.com/vercel-labs/openreview

## Source library

**Steel & its market**
- Steel homepage (open-source browser API for AI agents; legal entity "Nen Labs, Inc.") — https://steel.dev/ — 2026-07-24
- steel-dev/steel-browser (GitHub README; Apache-2.0, 7.4K stars) — https://github.com/steel-dev/steel-browser — 2026-07-24
- Steel Sessions API Overview (docs) — https://docs.steel.dev/overview/sessions-api/overview — 2026-07-24
- Steel blog index (Atlas, Stealth Browser, Steel Skills, Dedicated IPs) — https://steel.dev/blog — 2026-07-24
- steel-dev org profile (GitHub; location: United States) — https://github.com/steel-dev — 2026-07-24
- The Human Web Is Becoming Agent Web (Nikola Balić joins Steel as founding growth lead; names CEO "Huss") — https://steel.dev/blog/the-human-web-is-becoming-agent-web — 2026-02-02
- Steel Browser is live in Stripe Projects — https://steel.dev/blog/steel-browser-is-live-in-stripe-projects — 2026
- Steel ships as a browser plugin for Hermes Agent — https://steel.dev/blog/hermes-steel-plugin — 2026
- 11 Best AI Browser Agents in 2026 (Firecrawl; Steel vs Browserbase positioning) — https://www.firecrawl.dev/blog/best-browser-agents — 2026

**Anthropic / Claude Code timeline**
- Claude 3.7 Sonnet and Claude Code announcement (research preview, Feb 24, 2025) — https://www.anthropic.com/news/claude-3-7-sonnet — 2025-02-24
- Claude Code changelog (official; GA v1.0.0 May 22, 2025; Opus 4.5 Dec 3; background agents Dec 6; Claude in Chrome Dec 17; Windsurf→Devin Desktop rebrand) — https://code.claude.com/docs/en/changelog — 2026-07-22
- Introducing Claude Opus 4.5 (Nov 24, 2025; includes Cursor endorsement) — https://www.anthropic.com/news/claude-opus-4-5 — 2025-11-24
- Anthropic Newsroom (lists "The Making of Claude Code," Jul 6, 2026; no late-2025 usage data confirmed) — https://www.anthropic.com/news — 2026-07-06

**Cheap prototyping / vibe coding**
- Andrej Karpathy, "vibe coding" tweet (Feb 2, 2025) — https://x.com/karpathy/status/1886192184808149383 — 2025-02-02
- Vibe coding (Wikipedia; cites Karpathy verbatim; 2023 "English" claim; Roose "software for one") — https://en.wikipedia.org/wiki/Vibe_coding
- Simon Willison, "vibe coding" (durability/security critique; production code needs review) — https://simonwillison.net/2025/Mar/19/vibe-coding/ — 2025-03-19
- Ars Technica, "Will the future of software development run on vibes?" — https://arstechnica.com/ai/2025/03/will-the-future-of-software-development-run-on-vibes/ — 2025-03-05
- TechCrunch, "A quarter of startups in YC's current cohort have codebases that are almost entirely AI-generated" (Mar 6, 2025) — https://techcrunch.com/2025/03/06/a-quarter-of-startups-in-ycs-current-cohort-have-codebases-that-are-almost-entirely-ai-generated/ — 2025-03-06
- Sam Altman, "The Gentle Singularity" ("the idea guys… about to have their day in the sun") — https://blog.samaltman.com/the-gentle-singularity — 2025-06-11
- NYT / Kevin Roose, "Not a Coder? With A.I., Just Having an Idea Can Be Enough." — https://www.nytimes.com/2025/02/27/technology/not-a-coder-with-ai-just-having-an-idea-can-be-enough.html — 2025-02-27
- BBC, "'Vibe coding' named word of the year by Collins Dictionary" (Nov 6, 2025) — https://www.bbc.com/news/articles/cjd5l0ek0y0o — 2025-11-06
- Pieter Levels blog (index; no specific dated "weekend build" quote surfaced) — https://levels.io/blog

**Vibe-coding quality critique**
- METR, "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity" (RCT; 19% slower) — https://arxiv.org/abs/2507.09089 — 2025-07-10
- Fast Company, "The vibe coding hangover is upon us" — https://www.fastcompany.com/91349825/vibe-coding-hangover — 2025-09-09
- "Vibe Coding Kills Open Source" (arXiv) — https://arxiv.org/abs/2501.12269 — 2026-01-21

**Code-review agent market**
- GitHub search: "code review agent" repos by stars — https://github.com/search?q=code+review+agent&type=repositories&s=stars&o=desc — 2026-07-24
- Vercel openreview (self-hosted AI code review bot; 1,472 stars) — https://github.com/vercel-labs/openreview — 2026-07-24
- CodeRabbit homepage (15,000+ customers; NVIDIA; "most installed AI app") — https://www.coderabbit.ai — 2026-07
- CodeRabbit GitHub org (created 2023-04-28; proprietary review engine) — https://github.com/coderabbitai — 2026-07-24
- YC directory — no CodeRabbit entry (404; not a YC company) — https://www.ycombinator.com/companies/coderabbit — 2026-07-24
- Greptile — YC W24 company page — https://www.ycombinator.com/companies/greptile — 2024
- Greptile Series A ($25M, Benchmark; Sept 23, 2025) — https://www.greptile.com/blog/series-a — 2025-09-23
- Qodo homepage (~890K VS Code / ~642K JetBrains users; enterprise customers) — https://www.qodo.ai — 2026-07
- Codium-ai/pr-agent (12.2K stars; community-maintained; MIT) — https://github.com/Codium-ai/pr-agent — 2026-07-24
- Sourcery (1,846 stars) — https://github.com/sourcery-ai/sourcery — 2026-07-24
- Corgea — YC S23 (application-SECURITY platform, NOT code review; $2.6M seed) — https://www.ycombinator.com/companies/corgea — 2023
- Corgea Sighthound (rule-based SAST scanner; 266 stars) — https://github.com/Corgea/Sighthound — 2026-07-24

**Amazon / "working backwards"**
- Werner Vogels, "Working Backwards" (All Things Distributed; press-release-first mechanic) — https://www.allthingsdistributed.com/2006/11/working_backwards.html — 2006-11
- "Working Backwards" (Bryar & Carr book; official site; PR/FAQ template) — https://www.workingbackwards.com — 2021

**Infrastructure primitives & counter-examples**
- Amazon Web Services (2025 revenue $128.7B / $45.6B operating income) — https://en.wikipedia.org/wiki/Amazon_Web_Services — 2026-02-05
- Steve Yegge, "Stevey's Google Platforms Rant" (Bezos API mandate; canonical, UNFETCHABLE this session) — https://gist.github.com/chitchcock/1241613 — 2011-10-12
- Brad Stone, "The Everything Store" (book; primary published source for Bezos API mandate) — https://www.goodreads.com/book/show/17612825-the-everything-store — 2013-10
- Amazon Honeycode shutdown announcement (AWS verticalization failure) — https://aws.amazon.com/blogs/aws/amazon-honeycode-to-be-retired/ — 2022-06-23
- Amazon Connect (packaged contact-center solution) — https://aws.amazon.com/connect/ — 2026-07-24
- Stripe About ($1.9T processed in 2025; 99.999% uptime) — https://stripe.com/about — 2026-07-24
- Stripe Atlas (packaged incorporation product) — https://stripe.com/atlas — 2026-07-24
- Twilio, "Ask Your Developer" (book; developer-primitives philosophy) — https://www.twilio.com/ask-your-developer — 2021-02
- Twilio to acquire Segment (~$3.2B) — https://www.twilio.com/press/releases/twilio-to-acquire-segment — 2020-10-12
- Twilio Flex (packaged contact-center product; UNFETCHED this session) — https://www.twilio.com/flex — 2018
- v0 by Vercel (AI UI/app generator; packaged "assembled set") — https://v0.dev/ — 2026-07-24
- NVIDIA Newsroom (canonical "picks and shovels" counter-example) — https://nvidianews.nvidia.com/ — 2026-07-24
- Greylock / Jerry Chen, "New Moats" (2018; page currently a 404, needs re-sourcing) — https://greylock.com/greylock-perspectives/new-moats/ — 2018-11
- a16z, "The New Business of AI" (verified this session) — https://a16z.com/the-new-business-of-ai-and-how-its-different-from-traditional-software/ — 2020-06-25

**Discovery automation & distribution-as-moat**
- Outset.ai (AI-moderated research platform) — https://www.outset.ai/ — 2026-07-24
- Hebbia (AI agents for market research) — https://www.hebbia.com/ — 2026-07-24
- Sequoia / David Cahn, "AI's $600B Question" — https://www.sequoiacap.com/article/ais-600b-question/ — 2024-06
- Elad Gil, "Market Ending Moves" — https://blog.eladgil.com/p/market-ending-moves — 2019
- Elad Gil, "AI Market Clarity" — https://blog.eladgil.com/p/ai-market-clarity — 2024
- Andrew Chen, "The Law of Shitty Clickthroughs" (distribution decays) — https://andrewchen.com/the-law-of-shitty-clickthroughs/ — 2015

**Draft under review**
- Draft article (section "Work backwards, not forwards") — file:///Users/nikola/dev/nibzard-web/src/content/log/packaging.md — 2026-07-23
