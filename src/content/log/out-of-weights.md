---
title: "Out of Weights"
description: "What happens when you use AI tools so new they weren't in the training data."
tldr: "AI-native tools win, but there's a chasm: new tech isn't in LLM weights yet. The bridge? Strong feedback loops, GitHub issues as task management, and LESSONS_LEARNED.md."
date: 2026-02-03
tags: [HUMAN, AI, AGENTS, TOOLS, LESSONS]
draft: false
author: "Nikola Balić"
topics: [AI-native tools, LLM knowledge gaps, feedback loops, task management, developer workflow]
entities: [Convex, exa.ai, GitHub, ESP32-P4, M5Stack, GLM 4.7, Vercel]
answers_questions:
  - What happens when you use tools newer than LLM training data?
  - How do you bridge the gap when AI lacks knowledge about new tools?
  - Why do strong feedback loops beat pre-trained knowledge?
---

<blockquote class="featured-quote primary">
    AI-native tools win. But everything new is out of weights.
</blockquote>

I've been working with some cutting-edge tools lately—Convex for auth, exa.ai for search, ESP32-P4 for hardware. Each time, I hit the same wall: the tool wasn't in the training data.

The AI agent flailed. It made assumptions. It hallucinated APIs. We burned time debugging things that would have been obvious if the model had ever seen the documentation before.

But some projects worked anyway. And the difference wasn't the tool—it was the workflow.

## The Chasm

Convex has this beautiful auth flow. You drop it in, it works. The agent can set up the project without blocking you—just let it do its thing.

But then the problems start. Convex is relatively new. It wasn't well-represented in LLM training datasets. Much of it is **outside the weights**.

The agent doesn't know:
- The exact API signatures
- The file structure conventions
- The edge cases that only appear in real usage

You end up debugging and manually providing context that should have been there from the start. There's a gap between the initial onboarding and the fully functional experience. This chasm exists because information is missing—knowledge that needs to be augmented by humans.

Once the project is bootstrapped and everything works, it becomes easier. But getting there? Painful.

<blockquote class="featured-quote secondary">
    The bridge across the chasm is simple: strong feedback loops.
</blockquote>

## Feedback Loops Beat Weights

I built Scribe, a distraction-free typewriter on an M5Stack Tab 5 device using the ESP32-P4 chip. New hardware, new tooling, definitely not in the training data.

But we had something else: a build-flash-monitor loop.

Every change got compiled, flashed to the device, and monitored via serial logs. The AI could see immediately whether its code worked. The logs didn't lie—either the text appeared on the screen or it didn't.

The ESP32-P4 is outside the weights. But the **feedback loop** made it irrelevant. The agent learned from reality, not from pre-trained knowledge.

Strong feedback loops beat pre-trained knowledge every time.

## GitHub Issues as Task Management

Here's something that surprised me: using GitHub issues for task management actually works.

I created a skill that takes an idea, analyzes the project's current state, and creates a GitHub issue with all the details. I just dump thoughts into the system and it figures out:

- What needs to happen
- What context is missing
- How to break it down into tractable work

This became the central nervous system for Scribe. Ideas flowed in, issues got created, work happened.

The AI doesn't need to know everything about the project. It just needs to be able to read the issues and understand what to do next.

<blockquote class="featured-quote accent">
    Good task management is better than complete documentation.
</blockquote>

This makes me think more and more about the future of GitHub in AI-driven development. Will it suffer Stack Overflow's fate—becoming a ghost town as AI agents learn to answer questions without ever visiting the site? Or will GitHub manage to redefine itself as the coordination layer for human-AI collaboration?

Issues as task management feels like a hint. But is it enough?

## Scraping with Agents

I needed to research leads—people who had reached out to me. Could have built some complex scraping pipeline. Could have manually clicked through profiles.

Instead, I pointed a pure CLI agent (Claude with GLM 4.7) at the problem and let it figure it out.

No complex flow. No fragile scraping infrastructure. Just an agent with a browser and a goal.

Agentic scraping beats complex flows because the agent can adapt when the site changes. Complex flows break when the HTML shifts. Agents just look for the new pattern.

## The LESSONS_LEARNED.md Trick

This one's simple but powerful.

I add one line to my `AGENTS.md` or `CLAUDE.md`:

```markdown
Always read LESSONS_LEARNED.md before starting work.
```

The file contains a few bullet points about what's been learned on this project—gotchas, patterns that don't work, things to avoid.

The agent checks it before every task. It catches mistakes before they happen. It's not a comprehensive documentation file—it's just enough to keep us on the right track.

<blockquote class="featured-quote unattributed">
    LESSONS_LEARNED.md is gold.
</blockquote>

## The Configuration Mess

Here's what sucks right now: `.claude` vs `.codex` vs `.agents` vs everything else.

Skills marketplaces are confusing. Vercel has one. There's a skill for finding skills. Everyone has their own format, their own discovery mechanism, their own installation process.

I mostly use agents to create and update skills at this point. I manage different agents with different configurations. It works, but it's messy.

The ecosystem is still figuring itself out. We're in the messy middle—innovation outpaces standardization.

## What Works

After a week of bumping into the edges of what AI knows, here's what I'm taking forward:

**AI-native tools win** when they're designed for agents. Convex and exa.ai get this—their onboarding flows assume an AI coding agent is involved.

**Everything new is out of weights**—accept this, build feedback loops instead of relying on pre-trained knowledge.

**Strong feedback loops beat weights**—build-flash-monitor made ESP32-P4 development possible despite zero training data.

**GitHub issues are decent task management**—when paired with skills that can read project state and create structured issues.

**Agents beat complex flows**—scraping, research, exploration: give an agent a goal and let it figure out the how.

**LESSONS_LEARNED.md is a simple force multiplier**—a few bullet points save hours of wrong turns.

**The skills ecosystem is messy**—we're in early days, use agents to create agents until the tooling catches up.

The tools are getting better. The workflows are getting clearer. But the fundamental lesson remains: when you're working outside the weights, build systems that learn from reality rather than relying on what the model already knows.
