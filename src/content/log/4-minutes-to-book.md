---
title: "4 Minutes to Book: Cutting a Browsing Agent Loop"
description: "A concrete optimization diary: trace the bottlenecks, patch the prompts, rerun the eval. What moved the needle."
tldr: "I built a loop to optimize my Steel browsing skill. First run: 11 minutes. Second run: 8 minutes. Third run: 4 minutes. Here's exactly what changed."
date: 2026-02-24
tags: [AI, AGENTS, PERFORMANCE]
draft: true
author: "Nikola Balić"
topics: [AI Agents, Performance Optimization, Browser Automation]
entities: [Steel, Airbnb, Booking.com]
answers_questions:
  - How do I optimize an AI agent's performance?
  - What bottlenecks slow down browsing agents?
  - How does iterative prompt optimization work?
---

I've been building a Steel browsing skill and running it through an optimization loop. The task: go to Airbnb and Booking.com to find specific accommodation.

First run: **11 minutes.**
Second run: **8 minutes.**
Third run: **4 minutes.**

Same task. Better result. Here's what changed.

## The Baseline

The task was deliberately complex:
- Navigate to Airbnb
- Search with specific criteria (location, dates, guests)
- Filter results
- Extract top options
- Navigate to Booking.com
- Repeat the search
- Compare and report

The initial skill was a straightforward prompt: "Find accommodation meeting these criteria on Airbnb and Booking.com."

11 minutes. Lots of false starts. Multiple retry loops. Confusion about which elements to click.

## The Optimization Loop

I built a small loop inspired by GEPA (Genetic Pareto Optimization)—though "inspired" is generous. It's more like: trace the run, identify bottlenecks, patch the prompt, rerun.

### Iteration 1: Bottleneck Analysis

I reviewed the trace from the 11-minute run. The bottlenecks:

1. **Element selection confusion.** The agent spent time finding the right buttons, often clicking wrong elements first.
2. **Redundant navigation.** It would navigate to a page, then navigate again "to be sure."
3. **Over-verification.** Checking results multiple times before proceeding.

### Iteration 2: Prompt Refinement

I updated the skill prompt with:
- Specific element selectors for key actions
- Clearer state transitions ("once you see X, proceed to Y")
- Explicit "do not" instructions for common mistakes

Result: **8 minutes.** Better, but not great.

### Iteration 3: Workflow Compression

The big win came from rethinking the workflow itself:

1. **Parallel tabs.** Open Airbnb and Booking.com simultaneously, not sequentially.
2. **Skip verification steps.** Trust the first extraction if it meets criteria.
3. **Simplified reporting.** Quick summary instead of detailed comparison.

Result: **4 minutes.**

## What Moved the Needle

**Element selectors.** The biggest single improvement came from adding specific selectors. "Click the search button" became "Click the button with `[data-testid='search-button']`."

**State machine clarity.** Defining clear states and transitions prevented the agent from wandering. "On the results page, immediately apply filters" vs. "On the results page, explore options."

**Removing safety margins.** The agent's tendency to verify and re-verify was well-intentioned but expensive. Explicit "trust first result" instructions cut that down.

**Parallel execution.** Not everything needs to be sequential. Opening both sites in parallel saved real time.

## What Didn't Move the Needle

**Model selection.** I tried faster models (Spark for exploration) but for this task, the bottleneck wasn't token speed—it was decision quality. A faster model making wrong decisions doesn't help.

**More context.** Adding more documentation about the sites didn't help. The agent didn't need more information; it needed clearer instructions.

**Additional tools.** I considered adding screenshot analysis tools, but that would have added overhead. The text-based snapshot was sufficient.

## The Pattern

This optimization loop is repeatable:

1. **Run the task** and capture the trace
2. **Identify bottlenecks** (where did time go?)
3. **Hypothesize fixes** (prompt changes, workflow changes)
4. **Patch and rerun**
5. **Measure improvement**
6. **Repeat until diminishing returns**

The key insight: **the prompt is the code.** I didn't change any implementation. I just refined the instructions the agent follows.

## What's Next

I'm now running this loop automatically. The system:
- Executes the skill
- Captures timing data
- Identifies slow steps
- Suggests prompt patches
- A/B tests improvements

It's meta-optimization: an agent optimizing an agent.

The 4-minute version isn't the ceiling. With better selectors and more workflow compression, I suspect we can get under 2 minutes.

But here's the thing: **the first version shipped.** 11 minutes was slow, but it worked. The optimization came after, not before.

Don't let perfect be the enemy of shipped. Start with something that works. Then make it fast.
