---
title: "Self-Healing Agents: Using Trace Replay as Memory"
description: "Stateless agents stall. Traces are the durable substrate that lets agents learn from their own history."
tldr: "I built a browsing agent that reuses its own traces to self-heal. When it hits a wall, it searches past runs for similar situations and adapts. Here's the pattern."
date: 2026-02-24
tags: [AI, AGENTS, PATTERNS]
draft: true
author: "Nikola Balić"
topics: [AI Agents, Observability, Memory Systems]
entities: [Raindrop, Steel]
answers_questions:
  - How do I make agents that learn from past runs?
  - What's the value of agent traces?
  - How do self-healing agents work?
---

The problem with "stateless agents" is right there in the name: **they have no memory.**

Every run starts from zero. Every failure is a new failure. The agent makes the same mistakes, hits the same walls, retries the same failed approaches.

But what if the agent could remember? What if it could look at past runs, find similar situations, and adapt?

That's what I built. Here's how it works.

## Traces as the Durable Substrate

An agent trace is more than a log. It's:

- **The full context** of what the agent was trying to do
- **The actions taken** in sequence
- **The results** of each action (success or failure)
- **The decision points** where the agent chose one path over another
- **The outcome** of the entire run

This is valuable data. Most agent systems throw it away after the run completes.

I've been capturing traces using Raindrop's tracing system. They have a semantic query API that lets you search traces by meaning, not just keywords. "Show me runs where the agent failed to find a booking button" returns relevant traces regardless of the exact words used.

## The Replay Pattern

Here's the self-healing pattern:

**1. Agent starts a task.** It has a goal and an initial plan.

**2. Agent hits a failure.** Something doesn't work. The plan is blocked.

**3. Agent queries past traces.** "Has anything like this happened before?"

**4. Agent finds similar situations.** The semantic search returns runs with analogous failures.

**5. Agent extracts solutions.** What worked in those past runs? What didn't?

**6. Agent adapts and retries.** Apply the learned approach to the current situation.

This isn't fine-tuning or model training. It's **runtime adaptation** based on historical data.

## Heuristic Selection

The tricky part is knowing which past runs are actually relevant.

Not all failures are the same. A "couldn't find button" failure on Airbnb is different from the same failure on Booking.com. The solution that worked on one might not work on the other.

The heuristic:
- **Same site + same error** → high confidence, copy the solution
- **Same site + different error** → medium confidence, extract the pattern
- **Different site + same error** → low confidence, general approach only
- **Different site + different error** → skip, not relevant

The agent does this reasoning automatically. It's not just retrieving traces; it's evaluating which traces are worth learning from.

## Self-Heal Tactics

When the agent finds relevant traces, it has several tactics:

**Fallback paths.** If approach A failed before, try approach B. "The main search didn't work, try the filters first."

**Retries with variation.** Same action, different parameters. "The button selector was stale, try a different selector."

**Alternative tools.** If one tool failed, try another. "Screenshot analysis didn't help, try DOM inspection."

**Escalation.** Some problems need human input. Recognize when you're stuck and ask for help.

## The Project

I built this as a small browsing agent. Maybe 100 lines of actual logic. The magic isn't in the code complexity—it's in the trace reuse.

The agent:
1. Starts with a basic prompt
2. Executes, capturing detailed traces
3. On failure, queries its own history
4. Learns from past successes
5. Retries with improved approach

Over time, the trace library grows. The agent gets smarter not because the model improves, but because it has more history to learn from.

## Why This Matters

Most agent systems are stateless by design. Clean slate, reproducible results.

But **reproducible doesn't mean optimal.** A stateless agent will make the same mistakes forever. A stateful agent—one that learns from traces—gets better over time.

This is also the foundation for observability. Tools like Raindrop aren't just for debugging; they're for **building memory.** The traces you capture today become the training data for tomorrow's self-healing.

## The Future

Imagine this pattern scaled up:

- Every agent run contributes to a shared knowledge base
- Agents query not just their own history, but all agents' history
- Successful patterns are surfaced automatically
- Failed approaches are avoided proactively

This is how you build agents that improve without retraining. The model stays the same. The memory grows.
