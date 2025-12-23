---
title: "2025: The Year AI Became a Teammate"
description: "My 2025 publications chart AI's evolution from assistant to teammate: code completion to orchestration, DX to AX."
tldr: "Published 44 articles in 2025 exploring AI's evolution from helper to teammate. Key themes: agent labs overtook model labs, orchestration became the bottleneck, AX emerged alongside DX, and devtools transformed into AI infrastructure."
date: 2025-12-23
tags: [META, YEAR-IN-REVIEW, AI, AGENTS, REFLECTION]
draft: false
author: "Nikola Balić"
topics: [AI evolution in 2025, agent orchestration, developer tools transformation, agent experience, year in review]
entities: [Claude Code, Anthropic, Bun, Cursor, Sourcegraph Amp, RBCR algorithm, MCP]
answers_questions:
  - What were the major themes in AI development during 2025?
  - How did AI agents evolve from assistants to teammates?
  - What does the shift from DX to AX mean for developer tools?
---

## The Year Everything Changed

Looking back at 44 articles published across 2025, a clear narrative emerges. We didn't just get better AI tools—we witnessed a fundamental reimagining of how software gets built.

The story isn't about incremental improvements. It's about a phase shift in how humans and AI work together.

## The Three Acts of 2025

**Act One: The Assistant Era** (May-July)

Early articles focused on AI coding assistants as productivity boosters. The questions were tactical: Which tool writes the best code? How do you price token usage? What makes a good autocomplete experience?

**Act Two: The Orchestration Awakening** (August-September)

A shift occurred. The bottleneck wasn't AI capability—it was human orchestration. Articles explored multi-agent systems, parallel workflows, and the "human as bottleneck" problem.

**Act Three: The Infrastructure Transformation** (October-December)

The year ended with a recognition that devtools themselves are becoming AI infrastructure. Anthropic's Bun acquisition cemented this: runtimes and protocols are now part of the AI stack.

## Major Themes That Emerged

### 1. Agent Labs Overtook Model Labs

The most important strategic insight of the year: product-first AI companies started capturing more value than model-first companies.

> "Agent labs ship product first, and then work their way down as they get data, revenue and conviction." — From Agent Labs article, October 28

This wasn't just about startups. It represented a fundamental shift in how AI value accrues. Companies like Cursor, Cognition, and Amp weren't trying to build better models—they were building better workflows.

### 2. Orchestration Became the Bottleneck

Mid-year, a realization struck: AI coding tools had become so capable that humans became the constraint.

> "The future isn't about humans using AI tools—it's about humans orchestrating AI processes." — From The Real Bottleneck in AI Development, September 23

The three-act structure emerged:
- **Craft Era**: Individual developers writing code
- **Assistant Era**: AI helps humans code faster
- **Orchestration Era**: Humans coordinate AI processes

### 3. Agent Experience (AX) Emerged Alongside Developer Experience (DX)

Perhaps the most prescient theme: tools needed to work for AI agents, not just humans.

> "AI agents don't need fancy MCP. They need good --help." — From AI Agents Just Need Good --help, August 17

I built AgentProbe to test how AI agents interact with CLI tools. The results were sobering: even simple commands like `vercel deploy` showed 16-33 turns across runs with 40% success rates.

The agent-friendly stack emerged from 50+ projects: type safety as inter-agent communication protocol, machine-readable documentation, and friction-free workflows.

### 4. Devtools Became AI Infrastructure

The year ended with Anthropic's acquisition of Bun—a move that redefined devtools as infrastructure for AI agents.

> "Devtools are no longer a layer on top of the model. They're part of the model stack itself." — From Anthropic Bought Bun, December 3

The new stack: Model → Protocol (MCP) → Runtime (Bun) → Experience Layer

## The Technical Deep Dives

### Algorithm Adventures

The Berghain Challenge spawned multiple articles documenting a journey from naive algorithms (1,247 rejections) to RBCR (781 rejections) to transformer-based orchestration (855 best game).

This wasn't just optimization—it was a case study in AI-human collaboration. Claude wrote 95% of the code. I provided direction. The results spoke for themselves.

### Production Realities

Articles like FRE in Production and Demos Run on Embeddings explored the gap between AI demos and production systems. The 99% problem became clear: in high-stakes domains, 99% accuracy is a failing grade.

### Research at AI Speed

"When AI Does Research" documented end-to-end AI-augmented research producing an arXiv paper in 2 days of FTE. LaTeX, conversions, translations—all abstracted. What remained was thinking.

## The Meta-Reflections

### Writing About Writing

"AI Ate Its Own Tail" explored what happens when AI analyzes its own git history. The transparency question emerged: how do we show human contribution in a world of AI collaboration?

### The Anti-Playbook

"The Anti-Playbook: Why AI Dev Tools Need Different Growth" became a reference for understanding how traditional SaaS tactics fail with developer audiences. Trust, not conversion, became the north star.

## What 2026 Might Hold

Based on the patterns that emerged, several trajectories seem clear:

**Multi-agent orchestration will mature.** We'll move from single agents to coordinated swarms with shared memory and specialized roles.

**Agent experience becomes first-class.** Tools will be designed for AI agents from day one, with humans as secondary users.

**Outcome-based liability emerges.** As "Outcome Liability" explored, the question isn't who wrote the code—it's who operates the system.

**Mention engineering replaces SEO.** Content strategy shifts from keywords to becoming citation material for AI models.

## The Personal Evolution

Reading through 44 articles, my own thinking evolved dramatically:

- **Early year**: Focused on which AI tool writes the best code
- **Mid year**: Realized orchestration is the real bottleneck
- **Late year**: Recognized that the entire development stack is being rebuilt around AI agents

The articles moved from tactical tool comparisons to strategic infrastructure questions. From "which assistant should I use?" to "how do we build systems where humans and AI collaborate effectively?"

## The Numbers

- **44 articles** published
- **Themes covered**: AI agents, developer tools, algorithms, growth strategy, research methodology, liability and policy
- **Formats**: Technical deep dives, opinion pieces, cheatsheets, case studies, experiment documentation
- **AI collaboration**: Heavy use of Claude Code and other AI tools in writing the articles themselves

## The Thank Yous

This year of writing wouldn't have been possible without:

- The AI collaborators who made this velocity possible—Claude, GPT-5, Amp, and others
- The communities that formed around these ideas—Hacker News discussions, GitHub contributors, Twitter threads
- The readers who engaged, challenged, and refined these thoughts in public

## Looking Forward

2025 was the year AI stopped being a tool and started being a teammate.

2026 will be the year we figure out what that means.

---

*This article synthesizes insights from 44 publications across 2025. Each article contributed a piece to this puzzle—the result is a map of how AI and software development evolved together over one remarkable year.*
