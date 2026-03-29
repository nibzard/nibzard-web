---
title: "What Pretext Reinforced About AI Loops"
description: "Pretext reinforces what serious AI-assisted engineering looks like: hard constraints, real oracles, tiny repros, rejection."
tldr: "Pretext didn't introduce the loop to me. It reinforced the stricter version: lock the architecture, measure against reality, isolate the miss, classify it, and use AI for throughput instead of authority."
date: 2026-03-29
tags: [AI, AGENTS, WORKFLOW, TOOLS]
draft: false
author: "Nikola Balić"
topics: [AI coding agents, iterative development, software engineering, developer workflows, empirical debugging]
entities: [Pretext, Chrome, Safari, Firefox, Codex]
answers_questions:
  - "What can a project like Pretext teach us about working with AI coding agents?"
  - "What does a good iterative loop for AI-assisted engineering look like?"
  - "How do you stop AI from producing plausible but fragile fixes?"
---

The interesting thing about Pretext is not text layout. It is the loop.

And to be clear, this is not some brand new revelation for me. I already wrote a broader version of that argument in [The Agent is The Loop](/theloop). What Pretext did was reinforce a stricter version of it, one that is much less romantic and a lot more useful.

Pretext is, as [Cheng Lou described it](https://x.com/_chenglou/status/2037713766205608234?s=46&t=2kH6NEAzM04KicGZW68bSg), a fast, accurate, comprehensive text measurement algorithm in pure TypeScript that can lay out web pages without leaning on DOM measurement and reflow. You can see the actual work in the [Pretext repository](https://github.com/chenglou/pretext). Fine. That is the obvious part. The part I keep coming back to is what it shows about using AI coding agents on problems that are messy, empirical, and dangerously easy to overfit.

A lot of AI coding talk still boils down to: pick a strong model, write a careful prompt, let it cook, then clean up whatever comes back.

That can work on toy tasks. It falls apart once the real problem sits in the gap between "this should work" and "the browser still disagrees."

Pretext feels like a better pattern. The architecture is pinned down. The engine gets measured against real browser behavior. Broad failures get cut into tiny repros. Mismatches get names. Most fixes do not survive. That, to me, is the useful part.

## Start with a hard constraint

The smartest move in Pretext happened before any clever algorithmic work.

They locked in one rule: `prepare()` can be expensive, but `layout()` has to stay arithmetic-only and cheap.

That sounds small until you realize it decides what kind of project this is. Once that line exists, a lot of bad AI suggestions die instantly. If a patch sneaks measurement, DOM reads, or string rebuilding back into the hot path, it is wrong. You do not need a philosophical debate about it. It is the same reason hard scope matters in [Eager Agents](/eager-agents): once the boundary is real, the model has less room to improvise its way into a mess.

That is the first lesson I'd steal for AI-heavy work: do not start with "make it better." Start with "what is not allowed to move?"

The stronger the invariant, the less room the model has to bluff.

## Give the model an oracle

This is the second thing Pretext gets very right.

It does not trust theory alone. It does not trust Unicode neatness. It definitely does not trust a demo that "looks fine on my machine." It checks itself against real browser behavior in Chrome, Safari, and Firefox.

That changes the role of the model completely. The agent is no longer trying to derive the correct text engine from first principles. It is working inside an empirical loop: suggest a change, run the browser check, inspect the mismatch, keep it or throw it away.

That is a much healthier setup. The AI is not the authority. It is a speed layer wrapped around evidence.

I think most teams still get this backwards. They let the model optimize for plausibility when they should be forcing it to answer to something external and stubborn.

## Shrink the problem before you solve it

One thing I loved in this project: broad failures keep getting squeezed down into tiny probes.

A mismatch shows up in a big sweep? Good. Do not patch the sweep. Cut it down to one width, one font, one browser, one extractor, one snippet, one clean reproducer. Get to the smallest thing that still fails.

AI agents are genuinely useful here. They are good at cranking through experimental chores: building a tiny probe page, running a narrow script, comparing extractors, sweeping five widths instead of five thousand, printing the first divergent line, summarizing what changed after a patch.

That is the part people miss. When the question is fuzzy, the answer is usually not a bigger prompt. It is a smaller problem.

## Name the failure mode

Pretext also does something a lot of AI-heavy workflows skip: it names the kinds of misses.

That matters more than it sounds. Not every mismatch is the same bug. Some are dirty corpus issues. Some are normalization problems. Some are wrong break boundaries, or glue-policy mistakes, or font mismatches, or diagnostics lying to you. Some are real shaping-context limits where the current architecture just stops being exact.

Once the miss has a name, the next move gets narrower. Dirty corpus? Clean it or reject it. Sensitive probe? Fix the diagnostic first. Wrong boundaries? Adjust preprocessing. Shaping-context limit? Stop pretending one more punctuation heuristic is going to save you.

Without that taxonomy, every red row looks like a request for more code. And the model will happily write more code.

## Use AI for throughput, not authority

This is where I think a lot of teams still get confused. They want the model to be the principal engineer.

That is not where the best leverage is.

In a project like this, the agent is most useful as an engine for throughput. Let it build probes, wire diagnostics, run checks, compare outputs, refresh snapshots, and test narrow hypotheses quickly. That is already a lot.

But the acceptance standard has to come from somewhere sturdier than the model itself. In Pretext, that bar comes from the architecture and the browser oracle. The human still has to decide whether a fix is semantic or accidental, durable or flattering, broad or obviously overfit. That is basically the harness argument again, just in a harsher environment than the one I wrote about in [What Makes a Great Coding Agent](/great-coding-agent).

That division of labor feels right to me. The agent speeds up the science. The human still owns the bar.

## Reject more than you keep

One of the healthiest things about Pretext is how much of the work gets thrown away.

That is not a side effect. That is the method.

The project tried things and dropped them: more runtime measurement in the hot path, larger correction schemes, broader shaping-aware experiments, local fixes that looked great until they hit a broader sweep. Good. That is how this kind of work should feel.

When the cost of trying an idea drops, your rejection rate should go up. Otherwise you are just stockpiling plausible changes.

That is the trap with AI-assisted work. It becomes very easy to confuse generated patches with earned improvements. Pretext mostly avoids that. It keeps the small changes that survive pressure and cuts the rest.

## Build a validation stack

Another thing worth stealing is the shape of the validation.

Pretext does not bet everything on one test. It has small invariant tests, browser accuracy sweeps, long-form corpora, product-shaped canaries, benchmark snapshots, and probe tools.

That stack is what makes fast iteration safe. If all you have are unit tests, the model can satisfy them while drifting from reality. If all you have are benchmarks, it can chase the number while missing the behavior. If all you have is visual inspection, you will miss regressions until much later, usually after you have convinced yourself everything is fine.

Layered validation is what lets you move quickly without kidding yourself.

## The real loop

The common fantasy about AI coding is still something like:

`prompt -> patch -> merge`

Pretext points to a better loop:

`constrain -> measure -> isolate -> classify -> test -> reject -> keep only what survives broad pressure`

That is the part I would copy. Not the specific text rules. Not the browser quirks. The loop itself.

If I had to boil the whole thing down into one sentence, it would be this:

> The AI does not make the engineering rigorous. The loop does.

That is the part worth carrying into other projects. The model can help you run the loop faster, but it cannot replace the part that makes the loop trustworthy in the first place.
