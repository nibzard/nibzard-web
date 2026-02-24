---
title: "AI Adoption Is a Culture Test"
description: "Agents don't fix cowboy engineering—they amplify it. Your existing culture is the multiplier, for better or worse."
tldr: "Working with Croatian outsourcing teams taught me a hard truth: the speed of AI tooling doesn't matter if your org can't absorb it. Culture is the bottleneck."
date: 2026-02-24
tags: [AI, CULTURE, ENTERPRISE]
draft: true
author: "Nikola Balić"
topics: [AI Adoption, Engineering Culture, Organizational Change]
entities: []
answers_questions:
  - Why is AI adoption hard in organizations?
  - What cultural problems does AI expose?
  - How do you prepare an organization for AI tools?
---

I've been helping teams in Croatia—mostly outsourcing shops, 50-100 engineers—figure out AI adoption. These are smart people. Good engineers. Companies you've heard of as clients.

And here's what I've learned: **AI doesn't fix culture. It amplifies it.**

If your team already has problems—unclear ownership, poor review discipline, cowboy engineering—AI will make them worse. Not because AI is dangerous, but because AI accelerates everything. Including the bad stuff.

## The Speed Gap

The contrast is painful:

**Tool speed.** Models improve monthly. New agents drop weekly. Capabilities that seemed impossible a year ago are table stakes now.

**Org speed.** Teams move quarterly. Decisions take meetings. Process changes require buy-in from people who've never written code.

This gap is widening. The tools get faster; the orgs stay the same.

The result: **frustration.** Engineers who want to use AI productively but can't get organizational support. Managers who see AI demos but can't figure out how to adopt them safely. Companies that fall further behind every month.

## What's Missing

The teams that struggle aren't missing AI tools. They're missing the practices that make AI tools useful:

**Definition of done.** What does "finished" look like for a task? If you can't articulate it to a human, you can't prompt it to an agent.

**Ownership.** Who owns the output? When an agent ships code under your name, you're responsible. Many orgs aren't ready for this.

**Review discipline.** Can your team actually review agent output? Or is it rubber-stamp approval because "the AI probably got it right"?

**Observability.** Can you see what your agents are doing? Or is it a black box that occasionally produces pull requests?

**Rollback capability.** When something goes wrong—and it will—can you undo it?

These aren't AI problems. These are engineering problems. AI just makes them visible.

## Cowboy Engineering, Amplified

Here's the pattern I see:

A team adopts AI tools without changing any practices. Engineers start using agents for everything. Output velocity increases. Everyone celebrates.

Then the cracks appear:
- Code that no one understands because an agent wrote it
- Bugs that are hard to fix because the original reasoning is lost
- Technical debt that compounds because agents don't refactor
- Knowledge silos because the agent "knows" things no human documented

This isn't the AI's fault. This is cowboy engineering at scale. The team was already shipping without process. AI just let them ship *more* without process.

## The Cultural Forcing Function

But there's a positive version too:

Teams with strong practices—clear ownership, good reviews, solid observability—adopt AI and get *better* at those practices. AI becomes a forcing function:

- Agents require clear specifications → team gets better at writing specs
- Agents generate code that needs review → team gets better at reviewing
- Agents produce traces that need monitoring → team gets better at observability
- Agents make mistakes that need rollback → team builds better safety nets

The tool isn't the solution. The tool exposes whether you have a solution.

## What to Do

If you're in a 50-100 person team trying to adopt AI:

**1. Don't start with tools.** Start with practices. Can you articulate what "done" means? Can you review code thoroughly? Can you roll back when things break?

**2. Start small.** One team, one workflow, one type of task. Learn what works before scaling.

**3. Make ownership explicit.** When an agent ships code, a human owns it. No exceptions.

**4. Build observability from day one.** You need to see what agents are doing. Traces, logs, metrics. Before you need them.

**5. Accept that culture change is slow.** The tools will keep improving. The org will move at org speed. That's okay, as long as you're moving.

## The Hard Truth

I can recommend tools, workflows, subscriptions, prompts. But I can't recommend culture.

If a team doesn't have the practices to absorb AI productively, no amount of tooling will help. The AI will just accelerate their existing dysfunction.

The teams that win with AI aren't the ones with the best tools. They're the ones with the best foundation to build on.

Culture is the multiplier. AI is just the force being multiplied.

Make sure you're multiplying something good.
