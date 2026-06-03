---
title: "The Model Is the Smallest Decision You'll Make"
description: "Everyone building agents asks which model to use first. Wrong first question. The harness is where the agent lives or dies."
tldr: "Picking a model feels like an architecture decision. It mostly isn't. Swap a model under a fixed harness and your numbers wiggle; rebuild the harness under a fixed model and they move a lot. The only benchmark that gets a vote is your own workflow. A leaderboard orients you; it can't tell you what survives your production loop."
date: 2026-06-03
tags: [HUMAN, OPINION, AI, AGENTS]
draft: false
author: "Nikola Balić"
topics: [Agent harness design, model selection, benchmarks and leaderboards, browser agents, evals, OSWorld]
entities: [Steel, Claude Opus 4.8, OSWorld, Claude Code]
answers_questions:
  - What should you decide first when building an agent — the model or the harness?
  - Why does the same model show different scores on the same leaderboard?
  - How should you actually read a benchmark before trusting its numbers?
  - What is a leaderboard good for, and what can it never tell you?
---

Everyone building agents asks the same thing first: which model should I use?

Wrong first question. Understandable, but wrong.

I build browser agents. I also ask this question more often than I should. It feels productive. You look at the board, find the current winner, plug it in, and pretend you made an architecture decision.

You mostly didn't.

The model matters. Of course it does. But the model is the smallest decision you'll make. The harness is where the agent lives or dies.

By harness I mean all the deeply unsexy stuff around the model:

- retries
- tool design
- state
- timeouts
- step limits
- error recovery
- human handoff
- trace quality
- evals
- when to reset
- when to keep going
- when to stop before it creates another beautiful pile of slop

That stuff is the agent. The model is inside the loop. The loop is the product.

<blockquote class="featured-quote primary">
    Swap a model under a fixed harness and your numbers wiggle. Rebuild the harness under a fixed model and the numbers move. Sometimes a lot.
</blockquote>

## What the benchmark screenshot hides

This is the thing benchmark screenshots mostly hide from you. You see "82% on OSWorld" and your brain files it as: *model X is 82% good.*

Nope.

It's model X, inside harness Y, on task set Z, scored by methodology Q, on some date, with some source, probably with a few caveats hiding in a PDF nobody read. Change any one of those and the 82 becomes a different number.

This is why the same model can show up multiple times on the same leaderboard with different scores. People flag this as an error. It's not. It's the most honest thing on the page. That's the harness talking.

"Which model is best?" is usually a cope question. It sounds concrete because model names are concrete. Claude this, GPT that, Qwen something, Gemini something, whatever is winning the timeline this week.

But agents don't run in the timeline. They run in your weird workflow, against your broken sites, your auth, your modals, your flaky selectors, your half-documented edge cases, your product decisions, your customer's data, your team's tolerance for chaos.

The only benchmark that gets a vote is your own workflow.

## The practical version

So the practical version is:

**Find the benchmark that looks like your work.** Not the biggest number. The closest work.

**Read how it scores a pass.** "Pass" is not a universal word. It barely means the same thing across rows.

**Check who reported the result.** Self-reported, vendor-reported, paper-reported, third-party verified — these are not the same kind of evidence.

**Then run your own agent and watch where it breaks.**

That last part is the actual work. Annoying, I know. Would be much nicer if a leaderboard could absolve us from thinking. It can't.

A leaderboard can orient you. It can show what has been pulled off, by whom, under what conditions. It can save you from 15 tabs of model cards, papers, launch posts, Discord screenshots, and random benchmark archaeology. But it cannot tell you what survives contact with your production loop.

## A leaderboard with trust issues

That's the lens Huss and I rebuilt the [Steel browser agent leaderboard](https://leaderboard.steel.dev) through. We've kept it running since February 2025 and rebuilt it from scratch more times than I want to admit.

This version is basically a leaderboard with trust issues.

- Every row has provenance.
- Every benchmark page explains what the agent is actually asked to do.
- Every score has source context.
- Dates are visible, because stale numbers are still numbers, but they should smell stale.

And the caveat is no longer hidden in the basement: **scores across different benchmarks do not compare.** A 92 on one benchmark and an 80 on another is not a ranking. It's two different exams. This sounds obvious until you watch everyone immediately compare them anyway.

We also built the update workflow the way we build agents. There's a Claude Code skill that reads new model cards, papers, and releases, then drafts possible leaderboard updates. It finds candidates fast. It also cannot decide whether a source is good enough to trust. So we still read the source. We still write the note. We still decide what belongs.

<blockquote class="featured-quote secondary">
    The model does the finding. The harness and the human do the judging. Recursion all the way down.
</blockquote>

One result did jump the line for launch: Claude Opus 4.8 hit #1 on OSWorld at 83.4%, above the 72.36% human baseline. Cool result. Worth knowing. Still not a reason to skip your own evals — especially with browser agents, where the difference between "works" and "lol no" is often one popup, one slow page, one auth edge case, one hidden button, one tiny environment mismatch.

## Where the useful numbers are

The leaderboard is not the answer. It's a map of where to start digging.

Use it to orient. Use it to see which harnesses are working. Use it to understand where the field is moving. Then go break your own thing on real work.

That's where the useful numbers are.

---

*See it: [leaderboard.steel.dev](https://leaderboard.steel.dev). Writeup: [How we rebuilt browser agent leaderboards](https://steel.dev/blog/browser-agent-leaderboards-rebuilt). More on why the harness is the product, not the model: [A Harness for Every Run](/harness).*
