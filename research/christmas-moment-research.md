# Research: The Christmas Moment

> The draft argues that the December coding-agent surge was an *experience/adoption* moment (developers finally had holiday free time to try tooling that had existed for months), not a *capability* moment — and that computer-use agents are now in the same pre-moment holding pattern: capable, benchmarked, but missing an intuitive package. The research broadly **confirms** the structural points: Claude Code shipped in early 2025, the harness/loop layer (Aider, Devin, Cursor Composer, the Ralph loop) pre-existed any December spike, and independent evaluation supports the "harness engineering bridges the gap" thesis (METR found ~30% of agent failures were fixable with scaffolding). It **complicates** the headline in two ways: for December *2025* specifically, real frontier model releases (Claude Opus 4.5 on Nov 24, 2025; GPT-5.2 on Dec 11, 2025) straddled the month, and the best-documented expert account (Karpathy, Brockman, Latent Space) credits a capability step-change — so the hook "nothing changed, no model release" is factually wrong for the article's own flagship example. It **corrects** several specifics: "clueso" is an unrelated company; "this happens every year" has no documented prior art; computer-use benchmarks are only *partly* saturated (OSWorld v1 near ceiling, but OSWorld 2.0 from June 2026 shows a ~50-point gap and WebShop is wide open); and Cluely is strong evidence for "retention doesn't follow" but actively *contradicts* "intuitive packaging resonates instantly."

## TL;DR for the author

- **Fix the hook.** "What changed in December? ... nothing" is factually incorrect for December 2025: Claude Opus 4.5 shipped Nov 24, 2025 and GPT-5.2 shipped Dec 11, 2025, and Karpathy, Greg Brockman, and Latent Space all attribute the "flip" to those releases. Reframe as "the harness/loop layer meant most of this value was reachable earlier" rather than "no model release."
- **Drop "clueso."** Clueso (clueso.io, by Desklamp, Inc.) is an unrelated video-documentation company. Cluely was never called Clueso; its predecessor was "Interview Coder."
- **Soften "benchmarks saturated."** OSWorld v1 is near its human ceiling (66.3% vs 72.36% human per the Stanford 2026 AI Index), but OSWorld 2.0 (June 2026) shows the best frontier model at only 20.6%, and WebShop's best agent (~29%) is half the human score (~59%). "Saturated" is true for one aging headline benchmark, false for the field.
- **Cut "this happens every year."** No industry report or dataset documents a recurring holiday-driven adoption spike for developer tools. This is an original speculative mechanism, not established wisdom — present it as such.
- **Re-cast the Cluely example.** Cluely is excellent evidence for "virality ≠ retention" (its own blog admits 50M+-view videos drove "almost zero downloads"; Roy Lee confessed on Mar 5, 2026 to fabricating his $7M ARR). But it is *weak* evidence for "intuitive packaging resonates" — its virality was rage-bait marketing, and the packaging did not convert.
- **Precision on two supporting facts.** Claude Code's Feb 24, 2025 launch was a "limited research preview" (GA came May 22, 2025 with Claude 4). The "compensating with loops" idea is genuinely Geoffrey Huntley's documented thesis, but that exact phrase is not a public quote — keep the "conversations with him" framing, and consider disclosing he now builds the Amp agent at Sourcegraph.

## Claims verification

| Claim in draft | Verdict | Evidence | Source |
|---|---|---|---|
| "What changed in December? Which model release did it? Answer: nothing." | Refuted | Claude Opus 4.5 shipped Nov 24, 2025 (state-of-the-art on SWE-bench Verified, first to break 80%); GPT-5.2 shipped Dec 11, 2025. Karpathy wrote agents "crossed some kind of threshold of coherence around December 2025"; Brockman cited "a step function improvement"; Latent Space credited Opus 4.5, GPT-5, and Gemini 2.0 shipping within weeks. | https://www.anthropic.com/news/claude-opus-4-5 ; https://help.openai.com/en/articles/9624314-model-release-notes ; https://x.com/aarthir/status/2016015841171480875 ; https://medium.com/@NMitchem/something-flipped-in-december-423e8b808262 |
| "Claude Code shipped in early 2025." | Confirmed (with nuance) | Launched Feb 24, 2025 alongside Claude 3.7 Sonnet as a "limited research preview." GA came May 22, 2025 with Claude 4. "Early 2025" is correct; it was a research preview at launch, not a finished ship. | https://www.anthropic.com/news/claude-3-7-sonnet ; https://www.anthropic.com/news/claude-4 |
| "The loops, the harnesses, everything existed well before the holiday spike." | Confirmed | Aider (May 2023), Devin (Mar 12, 2024), Cursor Composer multi-file agent (Nov 2024) all predate both Claude Code and the Dec 2025 spike. Claude Code itself (Feb 2025) predates it by ~10 months. | https://github.com/aider-ai/aider ; https://en.wikipedia.org/wiki/Devin_AI ; https://forum.cursor.com/t/multi-file-edits-0-37-update/6425 |
| "Christmas break. People had time... This happens every year." | Refuted (as established fact) | No documented prior art, dataset, or industry report (Cursor insights, GitHub Octoverse, Stack Overflow Survey, OpenAI usage) supports a recurring holiday-driven developer-tool adoption spike. Only anecdotal student threads exist. This is an original mechanism, not established wisdom. | https://www.reddit.com/r/csMajors/comments/zunrc2/ideas-for-projects-to-work-on-over-winter-break/ ; https://blog.codacy.com/do-developers-write-code-even-on-christmas-what-about-weekends |
| "Conversations with Geoffrey Huntley (Ralph loop)... you could compensate for weaker agent capability with more loops." | Partly true + Personal anecdote | The "conversation" is a personal anecdote. The underlying idea is genuinely Huntley's documented thesis ("everything is a ralph loop"). BUT the exact phrase "compensating with loops" is not a verbatim public quote, and the Ralph loop is specifically a *Claude Code* technique — it postdates (not predates) Claude Code's Feb 2025 launch (earliest artefact ~July 2025). | https://ghuntley.com/loop/ ; https://github.com/ghuntley/how-to-ralph-wiggum ; https://linearb.io/dev-interrupted/podcast/inventing-the-ralph-wiggum-loop |
| "The capability curve is smoother than the adoption curve. Harness engineering was always the bridge." | Confirmed (with support) | Independently corroborated by METR's evaluation of Claude 3.5 Sonnet: ~30% of agent failures were fixable with scaffolding improvements, and the model had "not definitively crossed a threshold for robust autonomous agency." | https://metr.org/evaluations/claude-3-5-sonnet-report/ |
| Computer-use "benchmarks: saturated. Models are great, harnesses are great." | Mixed | OSWorld v1: 66.3%, "within 6 percentage points of human" (72.36%) per Stanford 2026 AI Index — near ceiling. BUT OSWorld 2.0 (June 2026) best frontier model = 20.6% vs ~72% human; WebShop best agent ~29% vs human 59%. Stanford notes agents "still fail roughly one in three attempts." Anthropic computer-use went 14.9% (Oct 2024) → ~66%. | https://hai.stanford.edu/ai-index/2026-ai-index-report/technical-performance ; https://arxiv.org/abs/2606.29537 ; https://benchmarklist.com/benchmarks/webshop/ ; https://www.anthropic.com/news/3-5-models-and-computer-use |
| "Nobody is waiting on technology." | Partly true | Defensible for OSWorld v1-style tasks; undermined by OSWorld 2.0 (50-point gap) and WebShop. Technology is much-improved but not "done" on harder/long-horizon tasks. | https://arxiv.org/abs/2606.29537 |
| "The Cluely/clueso-style viral moments as proof: intuitive packaging resonates instantly, even when retention doesn't follow." | Partly true | Retention half: confirmed (Cluely's blog admits 50M+-view videos drove "almost zero downloads"; Lee confessed Mar 5, 2026 to fabricating $7M ARR). "clueso": refuted — Clueso (clueso.io, Desklamp Inc.) is unrelated; Cluely's predecessor was "Interview Coder." "Intuitive packaging resonates": contradicted — Cluely's virality was rage-bait, and its own data shows packaging did not convert. | https://cluely.com/blog/virality ; https://techcrunch.com/2026/03/05/cluely-ceo-roy-lee-admits-to-publicly-lying-about-revenue-numbers-last-year/ ; https://www.clueso.io/ ; https://techcrunch.com/2025/11/05/cluelys-roy-lee-hints-that-viral-hype-is-not-enough/ |
| "The computer-use moment... will not coincide with any model release." | Unverifiable (prediction) | A forward-looking bet. Note the historical analogy cuts against it: the Dec 2025 coding-agent flip *did* coincide with model releases. | https://medium.com/@NMitchem/something-flipped-in-december-423e8b808262 |
| (Implied) ChatGPT's December rise is a precedent for holiday-driven adoption. | Refuted (as a causal claim) | ChatGPT hit ~1M users in 5 days and ~100M MAU by Jan 2023, but no source attributes this to holiday time — it was a consumer product; growth is attributed to novelty, capability, and virality. December timing is coincidental, not causal. | https://www.explodingtopics.com/blog/chatgpt-users ; https://www.reuters.com/technology/chatgpt-sets-record-fastest-growing-user-base-analyst-note-2023-02-01/ |

## Factual corrections needed

1. **"Nothing changed in December / no model release"** → For December 2025, two frontier releases straddled the month: Claude Opus 4.5 (Nov 24, 2025) and GPT-5.2 (Dec 11, 2025), and heavyweight consensus credits them. → https://www.anthropic.com/news/claude-opus-4-5 ; https://x.com/aarthir/status/2016015841171480875
2. **"Cluely/clueso-style"** → "Cluely-style." Clueso (clueso.io, Desklamp, Inc.) is an unrelated video-documentation company; Cluely was never called Clueso (its predecessor was "Interview Coder"). → https://www.clueso.io/ ; https://en.wikipedia.org/wiki/Cluely
3. **"Claude Code shipped in early 2025"** → Accurate as "early 2025," but the Feb 24, 2025 launch was a "limited research preview"; general availability was May 22, 2025 with Claude 4. Soften if the text implies a finished product. → https://www.anthropic.com/news/claude-3-7-sonnet ; https://www.anthropic.com/news/claude-4
4. **"This happens every year"** → No documented prior art supports a recurring holiday-driven adoption spike for developer tools. Recast as an original observation/hypothesis, not established pattern. → (absence of supporting evidence across Cursor insights, GitHub Octoverse, Stack Overflow Survey)
5. **"Benchmarks saturated"** → Only OSWorld v1 is near its ceiling (66.3% vs 72.36% human). OSWorld 2.0 (June 2026) shows 20.6% best-model completion, and WebShop is ~29% vs ~59% human. Replace "saturated" with something like "the headline benchmark is near ceiling." → https://hai.stanford.edu/ai-index/2026-ai-index-report/technical-performance ; https://arxiv.org/abs/2606.29537
6. **Cluely as proof "intuitive packaging resonates instantly"** → Cluely's own data refutes this (50M+-view videos drove "almost zero downloads"), and its virality was rage-bait marketing, not intuitive UX. Keep Cluely only for the "retention doesn't follow" half. → https://cluely.com/blog/virality

## Strengthening opportunities

- **Opportunity:** The "harnesses existed before" point lands harder with concrete dates and the Cursor naming trap. → Suggested insertion: name Aider (May 2023), Devin (Mar 2024), and Cursor's Composer *agent feature* (Nov 2024) — noting Cursor later reused "Composer" for a *model* (Oct 29, 2025), a different thing. → https://github.com/aider-ai/aider ; https://en.wikipedia.org/wiki/Devin_AI ; https://forum.cursor.com/t/multi-file-edits-0-37-update/6425 ; https://cursor.com/blog/2-0
- **Opportunity:** The "harness engineering was the bridge" thesis has independent empirical support most authors miss. → Suggested insertion: cite METR's finding that ~30% of Claude 3.5 Sonnet's agent failures were fixable with scaffolding improvements — direct evidence that harness work, not just weights, moved the needle. → https://metr.org/evaluations/claude-3-5-sonnet-report/
- **Opportunity:** The Ralph loop's mainstream legitimacy is a strong credibility signal. → Suggested insertion: Anthropic ships an official `ralph-wiggum` plugin in the first-party `anthropics/claude-code` repo (`/ralph-loop`, `/cancel-ralph` commands), confirming the pattern moved from Huntley's blog into Anthropic's own tooling. → https://github.com/anthropics/claude-code/tree/main/plugins/ralph-wiggum
- **Opportunity:** The Cluely "retention doesn't follow" point is much stronger with the 2026 confession. → Suggested insertion: on Mar 5, 2026 Roy Lee publicly admitted he fabricated Cluely's $7M ARR figure (real consumer ARR was ~$2.7M) — the cleanest possible support for "viral hype outran substance." → https://techcrunch.com/2026/03/05/cluely-ceo-roy-lee-admits-to-publicly-lying-about-revenue-numbers-last-year/
- **Opportunity:** The computer-use progress arc is striking with the real numbers. → Suggested insertion: Anthropic's computer-use OSWorld score went from 14.9% at launch (Oct 22, 2024) to ~66.3% per the 2026 Stanford AI Index — a 4x climb that still leaves a gap to the 72.36% human baseline and a much larger one on OSWorld 2.0. → https://www.anthropic.com/news/3-5-models-and-computer-use ; https://hai.stanford.edu/ai-index/2026-ai-index-report/technical-performance
- **Opportunity:** If you want a sharper "experience vs. announcement" distinction, the 2024 o3 case is a clean parallel. → Suggested insertion: OpenAI o3 was *announced* Dec 20, 2024 but not usable by developers until 2025 (o3-mini Jan 31; full o3 April 16) — an announcement shaped the narrative months before anyone could run it. (Use carefully: this is the 2024 cycle, not the Dec 2025 one the article centers on.) → https://en.wikipedia.org/wiki/OpenAI_o3

## Counter-evidence & risks

### The capability-step-change view is the consensus, and it names real releases

The single biggest risk: the most-cited account of the December 2025 "flip" credits a genuine capability step-change, not idle time. Karpathy wrote that agent capabilities "crossed some kind of threshold of coherence around December 2025 and caused a phase shift"; Greg Brockman described "a step function improvement"; Latent Space attributed it to Opus 4.5, GPT-5, and Gemini 2.0 each representing "a step-function improvement in long-horizon coherence." Because real models shipped Nov 24 and Dec 11, 2025, the author is making a strong contrarian claim against heavyweight consensus without currently citing the consensus being rebutted. Best evidence: https://x.com/aarthir/status/2016015841171480875 ; https://medium.com/@NMitchem/something-flipped-in-december-423e8b808262 ; https://www.anthropic.com/news/claude-opus-4-5

### Computer-use benchmarks are not actually saturated

The "nobody is waiting on technology" thesis rests on "saturated," which is only half-true. OSWorld 2.0 (arXiv 2606.29537, June 2026) was built precisely because v1 was being solved, and the best frontier model (Claude Opus 4.8) completes only 20.6% of long-horizon tasks vs a ~72% human baseline — a ~50-point gap. WebShop shows a similar gap (best agent ~29% vs human ~59%). A skeptic can argue the technology is still meaningfully progressing on harder tasks. Best evidence: https://arxiv.org/abs/2606.29537 ; https://benchmarklist.com/benchmarks/webshop/

### The holiday-break mechanism has no precedent

A careful reader (or critic) will note the article's central mechanism — discretionary holiday time draining a "capability queue" — is presented as "this happens every year" but is not documented anywhere. No industry dataset supports it. If challenged, the author has only assertion, not evidence. The ChatGPT-December precedent does not help: it was a consumer product whose growth is universally attributed to novelty and virality, not developer idle time. Best evidence (absence): https://blog.codacy.com/do-developers-write-code-even-on-christmas-what-about-weekends ; https://www.reuters.com/technology/chatgpt-sets-record-fastest-growing-user-base-analyst-note-2023-02-01/

### Beware fabricated/SEO benchmark numbers

A swarm of 2026 leaderboard sites (benchlm.ai, codesoto.com, coasty.ai, o-mega.ai) publish inflated, mutually contradictory computer-use scores for hypothetical models (e.g., "Claude Opus 4.8 at 83.4%," "Claude Mythos 93.9%"). Citing any of them would undermine credibility. Anchor on the Stanford 2026 AI Index and the OSWorld/arXiv primary sources. Hazard reference (do not cite as fact): https://o-mega.ai/articles/top-10-anchor-browser-alternatives-2026

## Related work & prior art

- **"Something Flipped in December"** (NMitchem, Medium) — the canonical piece naming the Dec 2025 coding-agent flip; useful to cite as the view being rebutted. https://medium.com/@NMitchem/something-flipped-in-december-423e8b808262
- **Ethan Mollick, "What just happened"** (Dec 19, 2024) — the best-named public proponent of the "late-2024 was genuine breakthroughs, not hype" view (broad, not coding-specific). https://www.oneusefulthing.org/p/what-just-happened
- **Geoffrey Huntley, "everything is a ralph loop"** (Jan 17, 2026) and **"how to build a coding agent"** workshop — the primary source for the harness/loop thesis; an earlier treatment at ghuntley.com/ralph/ is dated Jul 14, 2025. https://ghuntley.com/loop/ ; https://ghuntley.com/agent/ ; https://ghuntley.com/ralph/
- **METR evaluation of Claude 3.5 Sonnet** — independent empirical support for the harness-engineering thesis (~30% of failures fixable with scaffolding). https://metr.org/evaluations/claude-3-5-sonnet-report/
- **OSWorld 2.0** (arXiv 2606.29537, June 2026) — the benchmark community's own move to a harder v2, direct counter-evidence to "saturated." https://arxiv.org/abs/2606.29537
- **Stanford 2026 AI Index (Technical Performance)** — authoritative source for the OSWorld v1 66.3% figure and the "one in three failures" framing. https://hai.stanford.edu/ai-index/2026-ai-index-report/technical-performance
- **"The Hardest Easy Problem in AI: The State of Computer Use Agents"** (Adnan Masood) — accessible overview of the computer-use landscape. https://medium.com/@adnanmasood/the-hardest-easy-problem-in-ai-the-state-of-computer-use-agents-a7e3aea7fa3a
- **Cluely's own virality thesis** — primary-source admission that viral attention did not convert. https://cluely.com/blog/virality

## Source library

**Anthropic / model releases**
- Introducing Claude 3.7 Sonnet (Claude Code research preview) — https://www.anthropic.com/news/claude-3-7-sonnet — 2025-02-24
- Introducing Claude 4 (Claude Code GA) — https://www.anthropic.com/news/claude-4 — 2025-05-22
- Claude Opus 4.5 announcement — https://www.anthropic.com/news/claude-opus-4-5 — 2025-11-24
- Introducing computer use, a new Claude 3.5 Sonnet (14.9% OSWorld at launch) — https://www.anthropic.com/news/3-5-models-and-computer-use — 2024-10-22
- Claude's SWE-bench Sonnet performance — https://www.anthropic.com/engineering/swe-bench-sonnet — 2025-01-06
- Claude Help Center release notes — https://support.claude.com/en/articles/12138966-release-notes
- OpenAI Help Center model release notes (GPT-5.2) — https://help.openai.com/en/articles/9624314-model-release-notes

**Coding harnesses & the Ralph loop**
- aider-ai/aider (terminal AI pair programming) — https://github.com/aider-ai/aider — 2023-05
- Devin AI (Wikipedia, March 2024 launch) — https://en.wikipedia.org/wiki/Devin_AI — 2024-03-12
- Cursor Forum — Multi-file edits (Composer), 0.37 update — https://forum.cursor.com/t/multi-file-edits-0-37-update/6425 — 2024-11
- Cursor Blog — Introducing Cursor 2.0 and Composer (the model) — https://cursor.com/blog/2-0 — 2025-10-29
- Geoffrey Huntley — "everything is a ralph loop" — https://ghuntley.com/loop/ — 2026-01-17
- Geoffrey Huntley — "Ralph Wiggum as a software engineer" — https://ghuntley.com/ralph/ — 2025-07-14
- Geoffrey Huntley — "how to build a coding agent" workshop — https://ghuntley.com/agent/
- Geoffrey Huntley — six-month recap (Canva → Sourcegraph/Amp) — https://ghuntley.com/six-month-recap/
- ghuntley/how-to-ralph-wiggum (GitHub) — https://github.com/ghuntley/how-to-ralph-wiggum — 2025
- ralph-wiggum plugin (official, anthropics/claude-code) — https://github.com/anthropics/claude-code/tree/main/plugins/ralph-wiggum
- Dev Interrupted (LinearB) — "Inventing the Ralph Wiggum Loop" — https://linearb.io/dev-interrupted/podcast/inventing-the-ralph-wiggum-loop — 2026-01-13
- Codacy — "What Everyone Gets Wrong About The Ralph Loop" — https://blog.codacy.com/what-everyone-gets-wrong-about-the-ralph-loop
- METR — evaluation of Claude 3.5 Sonnet on autonomous tasks — https://metr.org/evaluations/claude-3-5-sonnet-report/ — 2024-10

**The December "flip" and capability debate**
- "Something Flipped in December" (NMitchem, Medium) — https://medium.com/@NMitchem/something-flipped-in-december-423e8b808262
- Karpathy quote on the December 2025 threshold (via aarthir on X) — https://x.com/aarthir/status/2016015841171480875
- Ethan Mollick — "What just happened" (One Useful Thing) — https://www.oneusefulthing.org/p/what-just-happened — 2024-12-19
- OpenAI o3 (Wikipedia, announcement vs. availability) — https://en.wikipedia.org/wiki/OpenAI_o3 — 2024-12-20
- OpenAI — early access for safety testing — https://openai.com/index/early-access/ — 2024-12-20
- Reddit r/csMajors — winter break project ideas (anecdote only) — https://www.reddit.com/r/csMajors/comments/zunrc2/ideas-for-projects-to-work-on-over-winter-break/
- Codacy — do developers write code on Christmas (no adoption-spike data) — https://blog.codacy.com/do-developers-write-code-even-on-christmas-what-about-weekends

**ChatGPT adoption**
- Exploding Topics — ChatGPT users (1M in 5 days; 100M by Jan 2023) — https://www.explodingtopics.com/blog/chatgpt-users
- Reuters — ChatGPT sets record for fastest-growing user base (UBS note) — https://www.reuters.com/technology/chatgpt-sets-record-fastest-growing-user-base-analyst-note-2023-02-01/ — 2023-02-01

**Cluely**
- Cluely homepage — https://cluely.com/ — 2026-07-24
- Cluely — Thesis on Virality and Hype (own blog) — https://cluely.com/blog/virality — 2025-09-18
- TechCrunch — Cluely raises $15M from a16z — https://techcrunch.com/2025/06/20/cluely-a-startup-that-helps-cheat-on-everything-raises-15m-from-a16z/ — 2025-06-20
- TechCrunch — Roy Lee hints viral hype is not enough — https://techcrunch.com/2025/11/05/cluelys-roy-lee-hints-that-viral-hype-is-not-enough/ — 2025-11-05
- TechCrunch — Roy Lee joins Disrupt 2025 on rage-baiting — https://techcrunch.com/2025/10/23/cluelys-roy-lee-joins-techcrunch-disrupt-2025-to-show-how-rage-baiting-cuts-through-the-ai-noise/ — 2025-10-23
- TechCrunch — Roy Lee admits lying about $7M ARR — https://techcrunch.com/2026/03/05/cluely-ceo-roy-lee-admits-to-publicly-lying-about-revenue-numbers-last-year/ — 2026-03-05
- Clueso homepage (the unrelated company) — https://www.clueso.io/ — 2026-07-24
- Wikipedia — Cluely — https://en.wikipedia.org/wiki/Cluely

**Computer-use benchmarks**
- Stanford HAI — 2026 AI Index Report, Technical Performance — https://hai.stanford.edu/ai-index/2026-ai-index-report/technical-performance — 2026
- OSWorld 2.0 (arXiv 2606.29537) — https://arxiv.org/abs/2606.29537 — 2026-06
- OSWorld official benchmark site — https://osworld-v1.xlang.ai/ — 2026
- WebArena (arXiv 2307.13854) — https://arxiv.org/abs/2307.13854 — 2023-07-25
- WebArena official site — https://webarena.dev/ — 2026
- WebShop (NeurIPS 2022 paper) — https://proceedings.neurips.cc/paper_files/paper/2022/file/82ad13ec01f9fe44c01cb91814fd7b8c-Paper-Conference.pdf — 2022
- WebShop leaderboard (BenchmarkList) — https://benchmarklist.com/benchmarks/webshop/ — 2026
- "The Hardest Easy Problem in AI" (Adnan Masood, Medium) — https://medium.com/@adnanmasood/the-hardest-easy-problem-in-ai-the-state-of-computer-use-agents-a7e3aea7fa3a — 2026

**Browser/computer-use infrastructure (disclosure context only)**
- Steel — open-source browser API for AI agents — https://steel.dev/ — 2026-07-24
- steel-dev/steel-browser (GitHub, Apache 2.0) — https://github.com/steel-dev/steel-browser — 2026-07-24
- Anchor — Secure Infrastructure for Computer Use Agents — https://anchorbrowser.io/ — 2026-07-24
- CTech — Google's AI fund backs $6M seed in Anchor — https://www.calcalistech.com/ctechnews/article/b1k00f48all — 2026-07-24
- Blumberg Capital — Anchor launches reliable browser automation — https://blumbergcapital.com/news-insights/anchor-launches-reliable-browser-automation/ — 2026-07-24
- Browserbase — Give your agents access to the whole web — https://www.browserbase.com/ — 2026-07-24
- Steel StartupHub aggregator profile (non-primary; $17M unverified) — https://www.startuphub.ai/startups/steel-dev — 2026-07-24
- Steel PitchBook profile — https://pitchbook.com/profiles/company/711810-37 — 2026-07-24
