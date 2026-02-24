---
title: "Scaffolding Is a Tax"
description: "Agent frameworks age like milk. Prompts + eval loops age like wine. Here's why your scaffolding is a liability."
tldr: "Every layer of abstraction between your agent and the model is a tax that compounds when new models drop. The winning strategy isn't better scaffolding—it's better prompts and tighter feedback loops."
date: 2026-02-24
tags: [AI, AGENTS, OPINION]
draft: true
author: "Nikola Balić"
topics: [AI Agents, Framework Design, Software Architecture]
entities: [OpenAI, Claude, Codex]
answers_questions:
  - Why do agent frameworks become obsolete so quickly?
  - What actually survives model jumps?
  - How should I design agents for model churn?
---

I've watched this pattern repeat enough times to call it: **scaffolding is a tax**.

Every time a new model drops—Sonnet 3.5, Codex 5.3, whatever comes next—the frameworks built around the previous model start to rot. Not immediately. But slowly. The carefully crafted chains, the tool abstractions, the "agent orchestration layers"—they all become either redundant or actively harmful.

Meanwhile, the thing that *does* survive? Good prompts and tight eval loops.

## The Scaffolding Trap

Here's how it goes:

1. **New model arrives** with better reasoning
2. Your carefully architected multi-step chain? The model can now do it in one shot
3. Your abstraction layer that "simplifies" tool calling? Now it's just hiding the model's native capabilities
4. Your "agent framework" becomes legacy code before you've even finished documenting it

I've been working with AI coding agents non-stop for the last 12 months, and I've seen this happen to my own code. I built abstractions that made sense for GPT-4. Then Sonnet 3.5 made them unnecessary. Then Codex 5.3 made them feel actively clunky.

The model got better. My scaffolding got worse.

## What Actually Survives Model Jumps

When I look at what's still valuable across model upgrades, it's not the frameworks. It's:

**Opinionated prompts.** The specific way you phrase a task. The examples you include. The constraints you encode. These are portable across models and often get *more* effective as models improve.

**Eval loops.** The feedback mechanism that tells you if the agent succeeded. This is your moat. A model that's 20% better at reasoning still needs to know what "success" looks like for your specific use case.

**Workflow definitions.** Not the implementation, but the *shape* of the workflow. What steps matter. What the handoffs look like. What "done" means.

**Trace data.** The history of what worked and what didn't. This compounds over time in a way that frameworks don't.

## Opinionated Workflows as the Only Moat

If scaffolding is a tax, what's the alternative?

**Opinionated workflows.** Not frameworks that try to be everything for everyone, but specific, constrained ways of doing things that encode your hard-won knowledge about what works.

The difference is subtle but important:

- A **framework** says "here's a flexible way to build agents"
- A **workflow** says "here's how *we* solve this specific class of problems"

Frameworks abstract. Workflows encode.

When a new model drops, the framework team scrambles to update their abstractions. The workflow team just... runs their evals and sees what improved.

## Designing for Churn

If you're building agent infrastructure today, here's my advice:

**1. Minimize layers.** Every abstraction between you and the model is something that can break when models change.

**2. Invest in evals.** Your evaluation loop is your real infrastructure. The prompt is the code; the eval is the test suite.

**3. Treat prompts as first-class.** Version them, test them, iterate on them. They're more durable than any framework.

**4. Build for replacement.** Assume every abstraction will need to be rewritten. Design your system so that's cheap rather than catastrophic.

**5. Collect traces.** Your history of agent runs is valuable data. It tells you what prompts work, what workflows fail, and what patterns emerge.

## The Hard Truth

The companies winning at AI right now aren't the ones with the most sophisticated agent frameworks. They're the ones with the tightest feedback loops between prompt → execution → evaluation → improvement.

The framework is the easy part. The opinions—the hard-won knowledge about what actually works for your domain—that's the moat.

And that knowledge doesn't live in your scaffolding. It lives in your prompts, your evals, and your traces.

---

*The models will keep getting better. The question is whether your infrastructure will get better with them, or become the thing holding you back.*
