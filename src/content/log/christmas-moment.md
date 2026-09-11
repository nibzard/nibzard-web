---
title: "The Christmas Moment"
description: "Models shipped in December 2025, but the felt moment came from time and harness, not weights. Computer use awaits its own."
tldr: "Yes, real models shipped in December 2025. But the harness layer meant most of that value was reachable months earlier — what changed was people finally had time to sit down and feel it. Computer use is in the same holding pattern: capable, waiting for an experience that makes it obvious."
date: 2026-07-23
tags: [AI, AGENTS, OPINION]
draft: true
author: "Nikola Balić"
topics: [AI adoption dynamics, Computer use agents, Capability vs perception, Harness engineering]
entities: [Claude Code, Geoffrey Huntley, Claude Opus 4.5, OSWorld, Cluely]
answers_questions:
  - "Did coding agents really get better in December 2025, or did people just get time?"
  - "What is blocking computer use agents from mainstream adoption?"
  - "Does adoption follow capability or experience?"
---

Everyone asks the same question about December. What changed? Which model release finally did it?

I can't tell you the clean version of that story, because the clean version is wrong.

Real models shipped. [Claude Opus 4.5](https://www.anthropic.com/news/claude-opus-4-5) landed November 24, 2025, first to break 80% on SWE-bench Verified. [GPT-5.2](https://help.openai.com/en/articles/9624314-model-release-notes) followed on December 11. Andrej Karpathy wrote that agents "crossed some kind of threshold of coherence around December 2025" [(via aarthir on X)](https://x.com/aarthir/status/2016015841171480875). ["Something Flipped in December"](https://medium.com/@NMitchem/something-flipped-in-december-423e8b808262) became the canonical telling. The consensus is real, and it names real releases.

So let me argue the harder thing instead. The releases mattered. They did not, by themselves, produce the moment. Most of what people *felt* in December was reachable months earlier through harness work, and what finally lit the fuse was people sitting down long enough to feel it. Adoption moments are not capability moments. They're experience moments, and the experience layer was already built.

I think computer use is sitting in exactly that pre-moment gap right now.

## December shipped models. The harness shipped earlier.

If the December flip were purely a weights story, the loops and harnesses would have arrived with it. They didn't. [Aider](https://github.com/aider-ai/aider) has been a terminal pair-programmer since May 2023. [Devin](https://en.wikipedia.org/wiki/Devin_AI) shipped March 2024. Cursor's Composer *agent feature*, multi-file edits, [landed in November 2024](https://forum.cursor.com/t/multi-file-edits-0-37-update/6425). (Don't get tripped up: Cursor later [reused "Composer" for a model](https://cursor.com/blog/2.0) in October 2025. Different thing entirely.)

[Claude Code](https://www.anthropic.com/news/claude-3-7-sonnet) itself launched as a "limited research preview" on February 24, 2025; general availability came [May 22 with Claude 4](https://www.anthropic.com/news/claude-4). So when December arrived, the tool people were suddenly raving about had been sitting there for ten months. The capability was in the room. People just hadn't spent a Saturday with it.

This is where I part ways with the clean capability narrative. There's independent evidence that the gap between "the model can do this" and "people experience it doing this" is mostly harness, not weights. METR's evaluation of Claude 3.5 Sonnet found [roughly 30% of agent failures were fixable with scaffolding improvements](https://metr.org/evaluations/claude-3-5-sonnet-report/): better scaffolding, not a smarter model. The model, in their words, had "not definitively crossed a threshold for robust autonomous agency." And yet, with the right loop around it, it did useful work. That's the bridge.

Now the part I have to flag honestly. I keep wanting to say "this happens every year": the holiday break is when developers finally clear the backlog of "I should really try that." Capability accrues all year; it drains all at once when people have a free week and nowhere to be. I find that mechanism persuasive. I cannot find a Cursor insights report, a GitHub Octoverse chart, or any dataset that actually documents a recurring holiday adoption spike for developer tools. It's not there. So treat the holiday-break story as my hypothesis, not established industry wisdom. The ChatGPT precedent doesn't rescue it either: that was a consumer product whose explosion is universally attributed to novelty and virality, not to developers with idle time.

The direction holds either way. The capability curve is smoother than the adoption curve. December is when the two caught up.

## Compensating with loops

The clearest version of this idea I've heard came out of conversations with [Geoffrey Huntley](https://ghuntley.com/loop/). His thesis, roughly: you can compensate for weaker agent capability with more loops, more structure, more control. The model doesn't have to be brilliant on the first try if the harness lets it try, fail, and try again inside a deterministic shell. "Everything is a ralph loop."

That wasn't a throwaway blog post. The pattern moved from Huntley's writing into Anthropic's own first-party tooling; there's an official [`ralph-wiggum` plugin](https://github.com/anthropics/claude-code/tree/main/plugins/ralph-wiggum) in the `anthropics/claude-code` repo, with `/ralph-loop` and `/cancel-ralph` commands. (Geoffrey has since moved on to Sourcegraph to work on the Amp agent, worth knowing where the loop gospel is being preached from.)

<blockquote class="featured-quote primary">
The capability curve is smoother than the adoption curve. The harness was always the bridge.
</blockquote>

That's the half of the story the "which model did it?" framing erases. Opus 4.5 is a better model. Of course it is. But a weaker model in a good loop was already producing most of the value people attributed to the December step-change. Experience changed the narrative. The weights just made it easier to tell.

## Computer use is sitting in the same gap

Same setup, one holiday break short of its moment.

The headline benchmark is basically solved. On OSWorld v1, the best agent sits at [66.3%](https://hai.stanford.edu/ai-index/2026-ai-index-report/technical-performance), within six points of the 72.36% human baseline, per the 2026 Stanford AI Index. Anthropic's own computer-use score climbed from [14.9% at launch in October 2024](https://www.anthropic.com/news/3-5-models-and-computer-use) to that ~66%. A 4x rise in under two years. Read that number alone and "nobody is waiting on the technology" feels defensible.

It's only half-true, and I want to be honest about the other half. Stanford notes agents still fail roughly one in three attempts even on those tasks. And the benchmark community built [OSWorld 2.0](https://arxiv.org/abs/2606.29537) (June 2026) precisely because v1 was getting solved; on those longer-horizon tasks the best frontier model completes only 20.6% versus a ~72% human baseline. A fifty-point canyon. [WebShop](https://benchmarklist.com/benchmarks/webshop/) shows the same shape: best agent ~29% against a human ~59%. The technology is much-improved on what we've been measuring, and still meaningfully broken on the harder things we're only now measuring.

Here's the part I find more interesting than the benchmark fight, though. The hardest remaining blocker is embarrassingly non-technical. It's figuring out the use cases.

For an engineer, everything in computer use looks doable, and everything looks the same. That's exactly the problem. "Doable" stopped being the filter a while ago. Nobody is purely waiting on the model. They're waiting on the thing they can *experience*, the equivalent of typing a wishlist into a terminal and watching it happen. The capability overhang is sitting right there. The package that turns it into a felt moment is not.

## What a Christmas moment actually needs

Three ingredients. Capability: mostly there, with real gaps on long-horizon tasks I'm not going to hand-wave away. Idle time to try it: that comes free with the break, if my holiday-break hypothesis holds. And an intuitive package: this is the one that's missing, and it's the whole ballgame.

This is where I have to walk back something I wanted to be true. I'd love to point at Cluely and say "see, intuitive packaging resonates instantly." I can't, in good conscience. Cluely's own data refutes it: their blog admits that [50M+-view videos drove "almost zero downloads."](https://cluely.com/blog/virality) The virality was rage-bait marketing, not intuitive UX, and the packaging did not convert. On March 5, 2026, [Roy Lee publicly admitted he'd fabricated the $7M ARR figure](https://techcrunch.com/2026/03/05/cluely-ceo-roy-lee-admits-to-publicly-lying-about-revenue-numbers-last-year/). Real consumer ARR was closer to $2.7M. (And to clear up a persistent confusion: this has nothing to do with [Clueso](https://www.clueso.io/), an unrelated video-documentation company. Different outfit entirely. Cluely's predecessor was "Interview Coder," never Clueso.)

So Cluely doesn't prove "packaging wins." It proves the sharper half: virality and retention are not the same thing, and a moment that trends without keeping people is not the moment I'm predicting. The Christmas moment for computer use has to do both: package the capability so intuitively that the first experience sticks, not just spikes.

Here's the prediction I'll commit to, with one honest caveat stapled to it.

The computer-use moment will look obvious in retrospect. And I know the historical analogy cuts against me: the December 2025 coding flip *did* coincide with real model releases. So "it won't coincide with any release" is a bet I'm making against my own best example. I'm making it anyway. When the computer-use moment lands, I expect people to explain it with whatever model shipped that month, and I expect that explanation to be as incomplete as "Opus 4.5 did it" is for coding agents. The release will be the excuse. The package and the free weekend will be the cause.

## Stop watching the announcements

If you're building in this space, here's the practical version of all this. Stop refreshing model announcement pages and start watching what people actually do with their discretionary time. The capability overhang is the story of this whole era: the gap between what models can do and what people have experienced them doing. That gap doesn't close when the next benchmark drops. It closes when someone builds the package that makes a regular person sit down on a free afternoon and *feel* it.

Computer use is fully capable of that moment. It's waiting on the package, and on the break.

I'm biased, obviously: I work on browser infrastructure for agents at [Steel](https://steel.dev/), so I have a horse in this race. But the bias runs toward the thesis, not away from it: the longer the capability sits there underutilized, the more convinced I am that the bottleneck is experience, not intelligence. The model isn't waiting. We are.
