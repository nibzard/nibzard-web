---
title: "2025: The Year AI Became a Teammate"
description: "AI became a teammate in 2025. From Daytona to academia, advisory, and a summer of full-time AI experimentation."
tldr: "Left Daytona after 3 years, joined academia as full-time lecturer, advised Steel.dev, Profico, and Verdent, published 44 articles, 7,761 GitHub commits (27% AI-assisted). 2025 was the year orchestration replaced assistance."
date: 2025-12-31
tags: [META, YEAR-IN-REVIEW, AI, AGENTS, REFLECTION, STARTUPS, CAREER]
draft: false
featured: true
author: "Nikola Balić"
topics: [AI evolution in 2025, agent orchestration, career transitions, startup advisory, agent labs vs model labs, developer tools transformation]
entities: [Daytona, Codeanywhere, Steel.dev, Profico, Verdent, Claude Code, Anthropic, Bun, Cursor, Sourcegraph Amp, Cognition, MCP, RBCR algorithm, Engram, EngramDB, Agrama, agentprobe, awesome-agentic-patterns, agentic-patterns.com, llm-answer-watcher, agent-perceptions, lmdb-tui, O'Reilly]
answers_questions:
  - What happened in 2025?
  - How did AI evolve from assistant to teammate?
  - What were the major career transitions?
  - What does the shift from DX to AX mean?
  - What are the predictions for 2026?
---

I left Daytona in early 2025. Three years—one at Codeanywhere, two at Daytona from day zero. We reached product-market fit with AI runtime infrastructure. The foundations were built, the plane was flying, and it was ready to keep going without me.

So I took the summer off. Not to rest—to experiment.

I spent two months coding full-time with AI. Generated so much AI-written and AI-swapped code that it would probably completely confuse any future models if it ever made its way into a training dataset.

That's when it hit me. The bottleneck wasn't AI capability anymore. It was me.

2025 was the year AI stopped being a tool and started being a teammate. 2026 will be the year we figure out what that means.

---

## The Year in Three Acts

### Act One: The Departure (Jan-Jul)

Left Daytona when the AI runtime pivot was validated at the first AI Engineer Summit in NYC. Both OpenAI and Anthropic redefined AI agents with runtimes. The shift was real. We finally saw traction. It felt like the natural conclusion.

Spent February in SF. Enjoyed the conversations, the density of people building. But honestly? Felt like the *fellow kids* meme the entire time.

![Fellow Kids Meme](/images/fellow-kids-meme.jpg)

20-somethings pitching AGI while I'm wondering if anyone remembers how databases work.

"Excitable boy," they all said.

### Act Two: The Experimentation (Aug-Sep)

Dedicated myself full-time to exploring the limits and possibilities of AI coding. What I found: we're not in the assistant era anymore. We're in the orchestration era.

The question changed from "which AI writes the best code?" to "how do I coordinate multiple AI processes effectively?"

### Act Three: The New Chapter (Oct-Dec)

Joined academia as a full-time lecturer—teaching SWE 101 and Science Engineering to 3rd year BSc and 1st year MSc students.

Started advising. Steel.dev on growth (cracked group scaling infinite browser sessions). Profico as AI Engineer in Residence (strategy, architecture, implementation). Verdent, founded by the ex-head of algo at TikTok.

Teaching SWE 101 to 3rd years and Science Engineering to 1st year MSc students revealed something: the next generation needs foundations more than ever. AI can write code, but understanding systems? That still requires wrestling with basics.

Through intense experimentation, I gained a deep understanding of both the potential and the limitations. A privileged glimpse into the future—one that will be largely automated and AI-driven. But also confronted with reality: we're still years, maybe a decade, away from that vision fully materializing.

---

## The Numbers

**Content**: 44 articles published across AI agents, developer tools, algorithms, growth strategy, research methodology, liability and policy

**GitHub**: 7,761 commits across 158 repositories. 26.9% AI-assisted (2,087 commits). Primary collaborator: Claude (1,872 commits). Most active month: November (994 commits).

![GitHub Activity Heatmap 2025](/images/gh-activity-heatmap.png)
![Monthly Commit Frequency](/images/gh-commit-frequency.png)

**AI vs Solo**:

![AI vs Solo Commits](/images/gh-ai-vs-solo.png)
![AI Agent Breakdown](/images/gh-ai-agents.png)

**Twitter**: 608 tweets, 849,159 impressions, 7,935 likes, 737 new followers. Peak month: August (207,339 impressions) during the experimentation period.

**GitHub Stars Growth**:

![GitHub Star History 2025](/images/star-history-20251231.png)

These aren't vanity metrics. They're evidence of a shift in how I work—and how the industry is moving.

---

## What I Learned

### Agent Labs Overtook Model Labs

The most important strategic insight of the year: product-first AI companies started capturing more value than model-first companies.

> "Agent labs ship product first, and then work their way down as they get data, revenue and conviction."

Cursor, Cognition, Amp—they're not trying to build better models. They're building better workflows. They see the entire trace: file changes, tool calls, test results, user approvals. That operational data is their moat.

Model labs optimize for next-token prediction. Agent labs optimize for "feature completion rate." Which one drives more business value?

### The Economics Reset

Premium pricing emerged—$200/month became normal for power users. The value shifted from "answers" to "parallelized work." You're no longer paying for an AI tool; you're budgeting for a compute-backed labor multiplier.

### Reasoning Became a Product Knob

The technical foundation for all this: models got "reasoning-ish" in a way that felt like a qualitative shift. RLVR (reinforcement learning from verifiable rewards) moved from novelty to production—enabling "thinking" behavior and introducing a new scaling lever: test-time compute.

You could now buy "more thinking" with latency, tokens, and money. That's what made orchestration possible.

### Orchestration Became the Bottleneck

Mid-year, the realization struck. AI coding tools had become so capable that humans became the constraint.

The three-act framework emerged:

- **Craft Era**: Individual developers writing code
- **Assistant Era**: AI helps humans code faster
- **Orchestration Era**: Humans coordinate AI processes

> "The future isn't about humans using AI tools—it's about humans orchestrating AI processes."

### AX Emerged Alongside DX

Perhaps the most prescient theme: tools needed to work for AI agents, not just humans.

> "AI agents don't need fancy MCP. They need good --help."

I built AgentProbe to test how AI agents interact with CLI tools. The results were sobering: even simple commands like `vercel deploy` showed 16-33 turns across runs with 40% success rates.

The agent-friendly stack emerged from 50+ projects: type safety as inter-agent communication protocol, machine-readable documentation, friction-free workflows.

Simon Willison framed this as "agents took over the terminal"—they thrived in text-based environments where LLMs are strongest, even as general-purpose GUI agents struggled.

### Devtools Became AI Infrastructure

The year ended with Anthropic's acquisition of Bun—a move that redefined devtools as infrastructure for AI agents.

> "Devtools are no longer a layer on top of the model. They're part of the model stack itself."

The new stack: **Model → Protocol (MCP) → Runtime (Bun) → Experience Layer**

### Databases as Agent Infrastructure

Explored databases as the foundation for agent orchestration, communication, and observability. Multiple iterations—[Engram](https://github.com/nibzard/engram-v3), [EngramDB](https://github.com/nibzard/EngramDB), [Agrama](https://github.com/nibzard/agrama-v2)—converged on a key insight: agents need shared memory with provenance.

Built [lmdb-tui](https://github.com/nibzard/lmdb-tui) to explore efficient embedded databases. The lesson: high-performance, inspectable storage is non-negotiable for multi-agent systems.

---

## Technical Deep Dives

### The Berghain Challenge

A multi-part algorithm journey that became a case study in AI-human collaboration:

- Naive algorithm: 1,247 rejections
- RBCR algorithm: 781 rejections
- Transformer-based orchestration: 855 best game

Claude wrote 95% of the code. I provided direction. The results spoke for themselves.

### Projects That Shaped My Thinking

- **[agentprobe](https://github.com/nibzard/agentprobe)**: Built to test AI agent interaction with CLIs. Found that even `vercel deploy` takes 16-33 turns with 40% success rates.
- **[awesome-agentic-patterns](https://github.com/nibzard/awesome-agentic-patterns)**: Curated catalog of real-world agent patterns. Now live at [agentic-patterns.com](https://agentic-patterns.com).
- **[llm-answer-watcher](https://github.com/nibzard/llm-answer-watcher)**: Explored Agentic SEO (AEO)—optimizing for AI answer engines rather than traditional search.
- **[agent-perceptions](https://github.com/nibzard/agent-perceptions)**: Survey research from O'Reilly coding agents event. Analyzed how developers perceive AI agents.
- **[engram-lite](https://github.com/nibzard/engram-lite)**: Lightweight exploration of agent memory systems.

### Production Realities

Articles like FRE in Production and Demos Run on Embeddings explored the gap between AI demos and production systems. The 99% problem became clear: in high-stakes domains, 99% accuracy is a failing grade.

### Research at AI Speed

"When AI Does Research" documented end-to-end AI-augmented research producing an arXiv paper in 2 days of FTE. LaTeX, conversions, translations—all abstracted. What remained was thinking.

---

## Looking to 2026

Based on 44 articles and a year of experimentation, here's what I'm watching:

### From AI Design Principles

> "Software is no longer a noun, it's a verb."

The impulse is no longer "find the right app" but "make the environment do what I need, now." Value isn't in the artifact but in task completion velocity.

**Design shifts for 2026:**
- Design for malleability, not features
- Collapse the boundary between using and making
- Make provenance a first-class interface element
- Local agency beats central intelligence
- Shift literacy from "how" to "what and why"

### From Agent Labs Analysis

**Multi-agent orchestration will mature.** We'll move from single agents to coordinated swarms with shared memory and specialized roles.

**Agent experience becomes first-class.** Tools will be designed for AI agents from day one, with humans as secondary users.

**Outcome-based liability emerges.** As "Outcome Liability" explored, the question isn't who wrote the code—it's who operates the system.

**Mention engineering replaces SEO.** Content strategy shifts from keywords to becoming citation material for AI models.

---

## The Personal Evolution

Reading through 44 articles, my own thinking evolved dramatically:

- **Early year**: Focused on which AI tool writes the best code
- **Mid year**: Realized orchestration is the real bottleneck
- **Late year**: Recognized that the entire development stack is being rebuilt around AI agents

The articles moved from tactical tool comparisons to strategic infrastructure questions. From "which assistant should I use?" to "how do we build systems where humans and AI collaborate effectively?"

---

## The Thank Yous

This year wouldn't have been possible without:

- The AI collaborators who made this velocity possible—Claude, GPT-5, Amp, and others
- The teams I advised—Steel.dev, Profico, Verdent—for trusting me with your vision
- The communities that formed around these ideas—Hacker News discussions, GitHub contributors, Twitter threads
- The students who forced me to articulate what I know
- The broader AI community—[daytonaio/ai-enablement-stack](https://github.com/daytonaio/ai-enablement-stack) contributors, open-source collaborators, everyone building in public

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

---

2025 was the year AI stopped being a tool and started being a teammate.

2026 will be the year we figure out what that means.

---

*This article synthesizes insights from 44 publications, 7,761 GitHub commits, 608 tweets, and a year of full-time AI experimentation. Each artifact contributed a piece to this puzzle—the result is a map of how AI and software development evolved together over one remarkable year.*
