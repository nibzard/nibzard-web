---
title: "2025: The Year AI Became a Teammate"
description: "AI became a teammate in 2025. From startups back to academia, advisory, and a summer of full-time AI experimentation."
date: 2025-12-31
tags: [META, YEAR-IN-REVIEW, AI, AGENTS, REFLECTION, STARTUPS, CAREER]
draft: false
featured: false
author: "Nikola Balić"
topics: [AI evolution in 2025, agent orchestration, career transitions, startup advisory, agent labs vs model labs, developer tools transformation]
entities: [Daytona, Codeanywhere, Steel.dev, Profico, Verdent, Claude Code, Anthropic, Bun, Cursor, Sourcegraph Amp, Cognition, MCP, RBCR algorithm, Engram, EngramDB, Agrama, agentprobe, awesome-agentic-patterns, agentic-patterns.com, llm-answer-watcher, agent-perceptions, lmdb-tui, O'Reilly, Simon Willison, Andrej Karpathy]
answers_questions:
  - What happened with AI in 2025?
  - How did AI evolve from assistant to teammate?
  - What does the shift from DX to AX mean?
  - What are the AI predictions for 2026?
---

I've made a habit of taking a "sabbatical" every few years to reset and reinvent. 2025 was the year to do it again.

I left Daytona in May 2025. Three years: one at Codeanywhere, two at Daytona from day zero. We reached product-market fit with AI runtime infrastructure. The foundations were built, the plane was flying, and it was ready to keep going without me.

So I took the summer off. Not to rest—to experiment.

I spent few months coding full-time with AI. Generated so much AI code that it would probably completely confuse any future models if it ever made its way into a training dataset.

That's when it hit me. The bottleneck wasn't AI capability anymore. It was me.

But let's compress 2025 into something that fits in a context window.

> 2025 was the year AI stopped being a tool and started being a teammate. 2026 will be the year we figure out what that means.

---

## The Year in Three Acts

### Act One: The Departure (Jan-May)

Spent February in SF. Enjoyed the conversations, the density of people building. But honestly? Felt like the *fellow kids* meme the entire time.

![Fellow Kids Meme](/images/fellow-kids-meme.jpg)

20-somethings pitching AGI while I'm wondering if anyone remembers how databases work.

When the AI runtime pivot was validated at the first AI Engineer Summit in NYC in March, everything clicked. I was in the audience listening to [Barry's talk](https://www.youtube.com/watch?v=D7_ipDqhtwk) while [live-blogging about runtimes](https://www.daytona.io/dotfiles/ai-agents-need-a-runtime-with-a-dynamic-lifecycle-here-s-why). Both OpenAI and Anthropic redefined AI agents with runtimes.

I was very satisfied that 9 months of nudging the team paid off. The shift was real. We finally saw traction. When I left Daytona in May, it felt like the natural conclusion of 3 years with the team.

Time to move on.

> "Excitable boy," they all said.

### Act Two: The Experimentation (May-Sep)

For the next few months I have dedicated myself full-time to exploring the limits and possibilities of AI coding. One thing became crystal clear: **we're not in the assistant era anymore. We're in the orchestration era.**

The question changed from "which AI writes the best code?" to **"how do I coordinate multiple AI processes effectively?"**

Oh yeah, and I got to enjoy tons of quality time with family over the summer.

### Act Three: The New Chapter (Sept-Dec)

In the meantime I have started advising friends and startups. Steel.dev on growth (cracked team of engineers scaling infinite browser sessions). Profico as AI Engineer in Residence (strategy, architecture, implementation). Verdent, founded by TikTok's former head of algo, was a fun and rewarding short stint.

Somehow, out of the blue, I was invited to join academia as a full-time lecturer. Teaching SWE 101 to 3rd years and Science Engineering to 1st year MSc students revealed something: **the next generation needs foundations more than ever.** AI can write code, but understanding systems? That still requires wrestling with basics.

Through intense experimentation, I gained a deep understanding of both the potential and the limitations. A privileged glimpse into the future—one that will be largely automated and AI-driven. But also confronted with reality: **we're still years, maybe a decade, away from that vision fully materializing.**

---

## The Numbers

**Content**: 44 articles published across AI agents, developer tools, algorithms, growth strategy, research methodology, liability and policy

**GitHub**: 7,761 commits across **158 repositories**. 49.4% AI auto-commited. Primary collaborator: Claude. Most active month: November (994 commits).

![GitHub Activity Heatmap 2025](/images/gh-activity-heatmap.png)
![Monthly Commit Frequency](/images/gh-commit-frequency.png)

**AI vs Solo**:

![AI vs Solo Commits](/images/gh-ai-vs-solo.png)
![AI Agent Breakdown](/images/gh-ai-agents.png)

**X/Twitter**: 2025 was very active for me on Twitter with 608 tweets, 849,159 impressions, 7,935 likes, **737 new followers**. Peak month: August (207,339 impressions) during the intense experimentation period.

**GitHub Stars Growth**:

One of the side projects was me collecting agentic patters I've observed in the wild. It is more bookmarks for myself but kept as [open-source awesome-agentic-patterns project](https://github.com/nibzard/awesome-agentic-patterns/) and a [website](https://agentic-patterns.com/).

![GitHub Star History 2025](/images/star-history-202611.png)

**GitHub Recognition**: Featured 3× on Trending Developers list across Rust (June 17, 19/24), JavaScript (August 6, 20/25), and Python (October 29, 21/24)—all driven by the intense AI agent experimentation. The pattern: heavy AI use → high output → external visibility.

These aren't metrics. They're evidence of a shift in how the interest is moving.

---

## What I Learned

### Agent Labs Overtook Model Labs

The most important strategic insight of the year: product-first AI companies started capturing more value than model-first companies.

> Agent labs ship product first, and then work their way down as they get data, revenue and conviction.

Cursor reported [>$500M ARR](https://cursor.sh/blog/series-c) and "over half of the Fortune 500" usage. Cognition reported Devin ARR growth from $1M (Sep 2024) to [$73M](https://www.cognition.ai/blog/funding) by June 2025.

Cursor, Cognition, Amp—they're not trying to build better models. They're building better workflows. They see the entire trace: file changes, tool calls, test results, user approvals. That operational data is their moat.

As explored in [swyx's "Agent Labs" deep dive](https://www.latent.space/p/agent-labs), this shift represents a fundamental reordering of the AI value chain—product and workflow intelligence now sits above model capability as the primary differentiator.

Model labs optimize for next-token prediction. Agent labs optimize for "feature completion rate." Which one drives more business value?

Nathan Lambert's ["2025 Open Models Year in Review"](https://www.interconnects.ai/p/2025-open-models-year-in-review) (with Florian Brand) documents the flip: Chinese labs like DeepSeek, Qwen, and Moonshot AI now occupy the "Frontier" tier of open models, while Western labs scramble to catch up. **The product-first approach—shipping working models that developers actually use—has won over model-first purity.**

### The Economics Reset

Premium pricing emerged—$200/month became normal for power users. The value shifted from "answers" to "parallelized work." As [Simon Willison](https://simonwillison.net/2025/Dec/31/the-year-in-llms/) puts it, you're no longer paying for an AI tool—you're budgeting for a compute-backed labor multiplier.

### Reasoning Became a Product Knob

The technical foundation for all this: models got "reasoning-ish" in a way that felt like a qualitative shift. RLVR (reinforcement learning from verifiable rewards) moved from novelty to production—enabling "thinking" behavior and introducing a new scaling lever: test-time compute. As [Andrej Karpathy](https://karpathy.bearblog.dev/year-in-review-2025/) framed it, **reasoning became something labs could dial with training + inference strategy.**

> 2026 will see RL expand into non-verifiable domains.

You could now **buy "more thinking" with latency, tokens, and money**. That's what made orchestration possible.

### Orchestration Became the Bottleneck

Mid-year, the realization struck. AI coding tools had become so capable that humans became the constraint.

The three-act framework emerged:

- **Craft Era**: Individual developers writing code
- **Assistant Era**: AI helps humans code faster
- **Orchestration Era**: Humans coordinate AI processes

> The future isn't about humans using AI tools—it's about humans orchestrating AI processes.

Nathan Lambert traces this as: coding has become "the epicenter of AI progress," the best place to feel current model capabilities.

But here's the reality: success is bimodal. Strong in CLI/structured tools, weak in messy GUIs. OpenAI's CUA scored [38.1% on OSWorld](https://openai.com/research/cua) for full computer use, despite 87% on web navigation tasks. We're still far from the 99.999% reliability required for high-stakes production.

Even Marc Benioff shifted tone. At Davos: "digital labor" optimism. By mid-year: [93% accuracy](https://www.salesforceben.com/marc-benioff-claims-93-ai-agent-accuracy-is-this-good-enough/), "100% not realistic." By year's end: calling AGI ["hypnosis"](https://www.businessinsider.com/marc-benioff-extremely-suspect-agi-hypnosis-2025-8). The arc: visionary → operational. Reliability isn't assumed—it's built via data quality, guardrails, and measured accuracy ceilings.

### AX Emerged Alongside DX

Perhaps the most prescient theme: tools needed to work for AI agents, not just humans.

> AI agents don't need fancy MCP. They need good --help.

I built [AgentProbe](https://github.com/nibzard/agentprobe/) to test how AI agents interact with CLI tools. The results, at that time, were sobering: even simple commands like `vercel deploy` showed 16-33 turns across runs with 40% success rates.

The agent-friendly stack emerged from 50+ projects: type safety as inter-agent communication protocol, machine-readable documentation, friction-free workflows.

Simon Willison framed this as **"agents took over the terminal"**—they thrived in text-based environments where LLMs are strongest, even as general-purpose GUI agents struggled.

### Devtools Became AI Infrastructure

The year ended with Anthropic's acquisition of Bun—a move that redefined devtools as infrastructure for AI agents.

> Devtools are no longer a layer on top of the model. They're part of the model stack itself.

The new stack: **Model → Protocol → Runtime → Experience Layer**

### Databases as Agent Infrastructure

Explored databases as the foundation for agent orchestration, communication, and observability. Multiple iterations—[Engram](https://github.com/nibzard/engram-v3), [EngramDB](https://github.com/nibzard/EngramDB), [Agrama](https://github.com/nibzard/agrama-v2)—converged on a key insight: **agents need shared memory with provenance.**

On the sidelines, I've built data exploration tools like [lmdb-tui](https://github.com/nibzard/lmdb-tui) and [claude-threads](https://github.com/nibzard/claude-threads/) to explore context management and observability.

**The lesson: high-performance, inspectable storage is non-negotiable for multi-agent systems.**

---

## So What? Practical Takeaways

**For Founders:**
- Pick a "tool-closed loop" wedge—workflows where success is machine-verifiable
- Instrument the full trace on day 1 (prompts, tool calls, approvals)
- Ship "reliability UX": checkpoints, rollback, human-in-the-loop gates

**For AI Engineers:**
- Build an eval harness before features
- Implement a trace-first runtime
- Default to supervised autonomy until you prove reliability

**For Investors:**
- Underwrite workflow retention, not seat count
- The moat is trace + integration + distribution, not prompts
- Treat reliability/safety as a first-class diligence axis

---

## Technical Deep Dives

I did some explorations just for fun, like [the Berghain Challenge](https://www.nibzard.com/berghain/).

A multi-part algorithm journey that became a case study in AI-human collaboration:

- Naive algorithm: 1,247 rejections
- RBCR algorithm: 781 rejections
- Transformer-based orchestration: 855 best game

Claude wrote 99% of the code. I provided direction. Fully automated training run.

We've built a nice niche model that beats the top algorithm on resource usage and performs well enough for production.

## Research at AI Speed

["When AI Does Research"](https://www.nibzard.com/ai-research/) documented end-to-end AI-augmented research producing an arXiv paper in 2 days of FTE. LaTeX, conversions, translations—all abstracted. What remained was thinking.

## Projects That Shaped My Thinking

- **[agentprobe](https://github.com/nibzard/agentprobe)**: Built to test AI agent interaction with CLIs.
- **[awesome-agentic-patterns](https://github.com/nibzard/awesome-agentic-patterns)**: Curated catalog of real-world agent patterns. Now live at [agentic-patterns.com](https://agentic-patterns.com).
- **[llm-answer-watcher](https://github.com/nibzard/llm-answer-watcher)**: Explored Agentic SEO (AEO or GEO)—optimizing for AI answer engines rather than traditional search.
- **[agent-perceptions](https://github.com/nibzard/agent-perceptions)**: Survey research from [O'Reilly Coding with AI](https://www.oreilly.com/radar/takeaways-from-coding-with-ai/) event I've presented in. Analyzed how developers perceive AI agents.
- **[engram-lite](https://github.com/nibzard/engram-lite)**: Just one of the explorations of agent memory systems.
- **[Northstar DB](https://github.com/nibzard/plandb)**: Latest exploration of DB as place of communication and observability for AI agents.

---

## Looking to 2026: Three Scenarios

> Software is no longer a noun, it's a verb.

The impulse is no longer "find the right app" but "make the environment do what I need, now." Value isn't in the artifact but in task completion velocity.

**Base Case (Most Likely):** Supervised autonomy dominates. Agent products grow with human approvals, scoped tools, strong tracing. We're building teammates, not employees.

**Bull Case:** Rapid reliability gains in constrained domains (coding, IT ops, analytics) enable outcome-priced agent services in B2B.

**Bear Case:** Security incidents + cost overruns + regulatory friction slow deployment. Autonomy remains stuck in demos and low-stakes copilots.

**Early indicators to watch:** Independent evals on OSWorld/WebArena, stable margins on $200 tiers, MCP server counts, contract language allocating "agent outcome" responsibility.

---

## Design Shifts for 2026

- Design for malleability, not features
- Collapse the boundary between using and making
- Make provenance a first-class interface element
- Local agency beats central intelligence
- Shift literacy from "how" to "what and why"

**Multi-agent orchestration will mature.** We'll finally move from single agents to coordinated swarms with shared memory and specialized roles.

**Agent experience becomes first-class.** Tools will be designed for AI agents from day one, with humans as secondary users.

**Outcome-based liability emerges.** As "Outcome Liability" explored, the question isn't who wrote the code—it's who operates the system.

**Mention engineering replaces SEO.** Content strategy shifts from keywords to becoming citation material for AI models.

**Consumer AI tidal wave.** Everyone defaults to an LLM for any problem. AI becomes the interface to reality itself.

**AI slop grows 100x.** As barriers drop, low-quality content floods everything. The signal-to-noise ratio gets worse before it gets better.

**Models become background.** They're already good enough. The value shifts to routing, application layers, smarter use.

**Native AI creatives emerge.** A new creative class that builds with AI from scratch—not using AI as a tool, but thinking in terms of what AI makes possible.

**Engineering discovers autonomy.** More engineers figure out the value of fully automatic coding agents.

---

## The Numbers

**Reliability in 2025:**
- Full desktop automation: 38.1% (OSWorld)
- Web tasks: 58.1% (WebArena)
- Coding: ~65% (SWE-bench Verified, with scaffolding)

**Power-user pricing became normal:**
- ChatGPT Pro, Claude Max, Cursor Ultra, Perplexity Max: $200/month
- Devin Team: $500/month (enterprise positioning)

---

## The Thank Yous

This year wouldn't have been possible without:

- The AI collaborators who made this velocity possible—Claude, GPT-5, Amp, and others
- The teams I've worked with Daytona, Steel.dev, Profico, Verdent—for trusting me with your vision, and some hush-hush
- The communities that formed around these ideas—Hacker News discussions, GitHub contributors, Twitter threads
- The students who forced me to articulate what I know
- The broader AI community—open-source collaborators, everyone building in public

---

## What I'm Doing in 2026

The biggest challenge now is crossing the boundary into real consumer adoption and real use cases, while guaranteeing verifiable validation of products. Observability, control, and review remain essential problems to solve.

These systems don't have to be designed on-premise, but they do need to be understandable and inspectable.

I'm available for advisory and consulting in:
- **AI engineering strategy**—architecture, implementation, evaluation frameworks
- **Agent orchestration**—multi-agent systems, workflow optimization
- **Growth for developer tools**—trust-based marketing, community building
- **Startup advisory**—agent lab strategy, product-market fit for AI-native products

If you're building in this space and need help, reach out.


> 2025 was the year AI stopped being a tool and started being a teammate.
> 2026 will be the year we figure out what that means.

---

*This article synthesizes insights from 44 publications, 7,761 GitHub commits, 608 tweets, and a year of full-time AI experimentation using Claude Code. Each artifact contributed a piece to this puzzle—the result is a map of how AI and software development evolved together over one remarkable year.*
