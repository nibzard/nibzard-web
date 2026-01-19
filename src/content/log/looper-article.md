---
title: "Looper: The AI Junior That Never Forgets the Backlog"
description: "Why treating AI like a junior engineer—with a backlog, a schema, and a review gate—beats giving it free-form leeway."
tldr: "I don't want a vibe-coder. I want a deterministic, auditable teammate that ships one task at a time, leaves a trail, and doesn't stop until it delivers. Looper: a Codex-powered loop runner with JSON backlog, single-task iterations, and forced review pass."
date: 2026-01-19
tags: [AI, ENGINEERING, TOOLS, PRODUCTION]
draft: false
author: "Nikola Balić"
topics: [AI coding agents, deterministic workflows, software architecture, audit trails]
entities: [Codex CLI, Simon Willison, Geoffrey Huntley, GLM-4.5, GLM-4.7, llm-loop]
answers_questions:
  - How can AI agents be made deterministic and auditable?
  - Why is a backlog-driven approach better than free-form AI coding?
  - What makes a review-gated workflow reliable?
---

I don't want a vibe-coder.

I want a deterministic, auditable teammate that ships one task at a time, leaves a trail, and doesn't stop until it delivers.

This obsession started last June. I built [llm-loop](https://github.com/nibzard/llm-loop), a plugin for [Simon Willison's LLM CLI](https://llm.datasette.io/) that gave it the one thing it was missing: the ability to keep going. Published to PyPI, it turned a single-turn tool into something that could iterate autonomously.

Around the same time, I had a great chat with [Geoffrey Huntley](https://ghuntley.com/). We'd converged in the same universe—he was pioneering what he called the **Ralph Wiggum Loop**: autonomous agents that maintain codebases indefinitely. Geoff saw the future before most of us even knew there was a problem to solve.

In September, when [Z.ai released GLM-4.5](https://z.ai/subscribe?ic=61HSE9HVY6) (referral link), I built `loop.sh`—the first version of a simple looping script that used skills to move work forward. It worked, but it was still missing something.

Now, with **Codex 5.2 in xhigh mode**, everything clicked. The new Looper is built entirely around it—harnessing the power of observability through logs, traceability through a JSON task list, and script flags for tail and status. It's not just an autonomous coder anymore. It's an auditable workflow.

Most AI coding tools give you a chatty assistant that's helpful but forgetful, that re-explains context you've already established, that drifts when tasks get complex.

I wanted something else. So I built Looper.

## What Looper Actually Is

At its core, Looper is a tiny bash wrapper around Codex that enforces a strict loop:

- **One task per iteration**—no partial work, no multitasking, no drift
- **JSON backlog as source of truth**—the plan and the audit surface are the same file
- **Schema-driven updates**—every change flows through jq, so nothing is implicit
- **JSONL logging**—replay, diff, and measure every run
- **Forced review pass**—a senior-style gate that either adds work or marks the project done

The rule is boring on purpose. **Boring scales.**

## Why a Backlog Changes Everything

<blockquote class="featured-quote primary">
Most AI tools make you the bottleneck—constantly feeding them the next instruction. A backlog removes you from the critical path.
</blockquote>

Here's the problem with free-form AI coding: you become the project manager. You're breaking down tasks, checking completeness, deciding what's next. The AI is smart, but you're doing the orchestration.

A backlog inverts this. The AI pulls tasks, completes them, and then—crucially—*runs a review pass* that either adds new work or marks the project complete.

The review pass behaves like a senior dev: read the whole repo, check against source specs, decide what's missing. Only the review pass can append the `project-done` marker.

This means the system can run indefinitely, but still has a hard stop when the backlog is truly exhausted.

## What the Numbers Look Like

From my local `~/.looper` logs:

- 17 task iterations completed (status=done)
- 12 review passes completed (status=reviewed)
- ~300 command executions total
- Roughly 13 shell commands per task iteration, ~8 per review pass

These are local test runs, not production. But they show the shape: short, consistent loops with predictable tool usage.

## The Anti-Magic Approach

<blockquote class="featured-quote secondary">
The gap between AI that demos well and AI that ships is a reliability gap, not a capability gap. Structure is how you bridge it.
</blockquote>

There's a seductive idea in AI development right now: just give the model more context, better tools, and let it figure things out. But **99% reliability is a failing grade** in production engineering.

You need to answer: what changed, why, and in which iteration?

When every task is explicit and every update flows through a schema, you get traceability for free. No task can sprawl because each iteration has a single objective. The system either completes the work or admits it needs more work.

It's honest.

## From Prototype to Production

The first Looper prototype was built with Claude—you can see the [original gist here](https://gist.github.com/nibzard/a97ef0a1919328bcbc6a224a5d2cfc78). The [live repo is on GitHub](https://github.com/nibzard/looper).

I wrapped the release flow into a project skill and a helper script so the whole process is repeatable: test, bump version, tag, push, publish release, update the Homebrew formula.

Because production is what you ship, not what you demo.

## What This All Means

If you're building with AI, don't give it free-form leeway. Give it:

- **A backlog**—so the work is explicit
- **A schema**—so the updates are mechanical
- **A review gate**—so completion is honest

Looper is the smallest working proof that this style is not only possible, it's reliable.

The magic isn't in the model. The magic is in the constraints.

## What's Next: Model Interleaving

Here's something becoming increasingly clear: **iteration beats perfection**.

A non-SOTA model that can iterate will outperform a SOTA model that can't. The loop matters more than the model.

[GLM-4.7](https://z.ai/subscribe?ic=61HSE9HVY6) (referral link) is impressive—the speed, the interleaved thinking pattern, the token efficiency. I'm adding a feature to let you choose: use GLM for task iterations, then run the review pass with Codex xhigh.

This maps to the **Oracle-Worker pattern** from [agentic-patterns.com](https://agentic-patterns.com/patterns/oracle-and-worker-multi-model/): cheap models handle bulk work while an expensive model handles planning and review. It's cost-effective because most compute happens on workers, but quality is preserved because the oracle sets the direction.

But there's something deeper here. Cursor 2.0's multi-model ensemble approach shows that **combining predictions from multiple models significantly improves final output, especially for harder tasks**. Different models have different failure modes, different strengths. When you alternate them, those blind spots cancel out.

The future of Looper isn't just one model looping. It's multiple models, interleaved strategically, each covering the others' weaknesses.

Because reliability isn't about having the best model. It's about having the best *system*.
