---
title: "Packaging Is the Product Now"
description: "Prototyping takes two days now. Picking the use case and packaging it is the real work — and engineers are bad at it."
tldr: "Prototyping is commoditized: two days and you have something working. Use-case discovery and packaging are the scarce skills now. To an engineer every use case looks equally doable — exactly why engineers are bad at picking them. The Lego problem: if your product requires assembly instructions, the instructions are the product."
date: 2026-07-23
tags: [AI, PRODUCT, STARTUPS, OPINION]
draft: true
author: "Nikola Balić"
topics: [Product packaging, Use-case discovery, Developer infrastructure, Commoditization of prototyping, Vibe coding]
entities: [Steel, Claude Code, Anthropic, AWS, Stripe]
answers_questions:
  - What differentiates products when anyone can prototype anything in days?
  - Why are engineers structurally bad at picking use cases?
  - What is the Lego problem in developer infrastructure?
---

A line from a recent conversation keeps replaying in my head: *prototyping shit is super easy — you need two days and you have something working.*

I keep replaying it because it is the truest thing anyone said to me this year, and it stopped being a private observation a while ago. Andrej Karpathy [named the phenomenon](https://x.com/karpathy/status/1886192184808149383) in February 2025 when he coined "vibe coding" — "It's not too bad for throwaway weekend projects." (He'd been on this arc since 2023, when he joked that [the hottest new programming language is English](https://en.wikipedia.org/wiki/Vibe_coding).) Y Combinator reported [a quarter of its Winter 2025 batch](https://techcrunch.com/2025/03/06/a-quarter-of-startups-in-ycs-current-cohort-have-codebases-that-are-almost-entirely-ai-generated/) had codebases roughly 95% AI-generated. Collins Dictionary made "vibe coding" the [2025 Word of the Year](https://www.bbc.com/news/articles/cjd5l0ek0y0o). Sam Altman [wrote](https://blog.samaltman.com/the-gentle-singularity) that "the idea guys… are about to have their day in the sun."

If prototyping is two days and nearly free, what is left? That question is the theme of the rest of this decade.

Let me be precise up front, because it decides everything after. What got commoditized is **prototyping**: getting something working. Not durable software, not production systems, not the kind of code you ship to paying customers and then sleep at night. [Karpathy himself scoped](https://x.com/karpathy/status/1886192184808149383) vibe coding to "throwaway weekend projects" and conceded the result "grows beyond my usual comprehension." A [randomized trial by METR](https://arxiv.org/abs/2507.09089) (16 experienced developers, 246 tasks on mature repos) found AI tools made them **19% slower**, even though the developers themselves predicted a 24% speedup. Simon Willison [has been clear](https://simonwillison.net/2025/Mar/19/vibe-coding/) that production code still has to be read and reviewed for security and maintainability.

So the headline is not "building is free." It is "getting to a working demo is free," and the two get conflated. Building well still matters; the differentiator just moved upstream.

## When everything is doable, doable means nothing

The engineer's curse. You look at any use case and it decomposes into achievable steps. Everything looks doable. Everything looks *the same*.

Which means feasibility stopped being a filter. The filter now is: **does anyone need this, and can you make them feel it?**

Back to that same call: anyone can build a code review agent this weekend. I mean that literally. Vercel ships a self-hostable one ([openreview](https://github.com/vercel-labs/openreview)), and the long tail of independent repos on GitHub stretches past the horizon. But is "code review" the real use case — or is "code review" the legacy shape of something else? Packaging is not naming the thing. It is figuring out what the thing actually *is*.

This is where engineers get into trouble. To an engineer, the code review agent, the test generator, and the docs bot all decompose into the same stack: a model, a tool layer, a loop. They look equally doable because they are. The scarce skill is "which *it* is worth building, and what shape does it need to take for the person who will pay for it."

The market proves the crowding, and it cuts both ways. [CodeRabbit](https://www.coderabbit.ai) markets itself as the "most installed AI app" with 15,000+ customers and NVIDIA as a named user. [Greptile raised a $25M Series A led by Benchmark](https://www.greptile.com/blog/series-a). Qodo reports ~890K VS Code users. The bottom of that market is a thousand weekend clones. The top is concentrated and contested, where integration depth, review quality, and enterprise trust still separate winners. Building is cheap. Winning is not.

## The Lego problem

What I see at Steel: some assembly required.

Steel is browser infrastructure for AI agents: an open-source browser API, isolated cloud browser sessions, [and the Atlas research harness](https://steel.dev/blog). "Humans use Chrome, Agents use Steel." (I joined as founding growth lead earlier this year, so I am not a neutral observer here.) To build with an infrastructure product like this, you already need to know what you are building, *plus* every other piece: the agent, the model, the harness, the glue.

<blockquote class="featured-quote primary">
If your product requires assembly instructions, the instructions are the product.
</blockquote>

The recipe (which model, which harness, which loop for which job) is the actual value. And there is no single recommendation. It really depends. That "it depends" is the moat and the tax at once.

So every infrastructure company hits the same strategic question: **do you keep selling bricks, or do you start selling the assembled set?**

The textbook answer is "sell bricks — that's where AWS, Stripe, Twilio won." And the bricks can get enormous. AWS did [~$128.7B in 2025 revenue](https://en.wikipedia.org/wiki/Amazon_Web_Services) on $45.6B of operating income. [Stripe processed $1.9T in payments in 2025](https://stripe.com/about) at 99.999% uptime.

But look closer and the clean answer falls apart. Every one of those "brick winners" then tried to sell the assembled set too, and the packaged layer keeps dying. AWS launched Honeycode, a no-code "assembled set" product, and [shut it down in 2022](https://aws.amazon.com/blogs/aws/amazon-honeycode-to-be-retired/). Stripe ships Atlas, Tax, Checkout. Twilio launched Flex and bought Segment for ~$3.2B. Vercel shipped [v0](https://v0.dev/), an AI app generator. Their *revenue* stays primitive-shaped, which is the genuine counter-force: EC2/S3, Stripe Payments, Twilio SMS keep compounding long after the packaged layer is bolted on. The cleaner read is: the brick layer keeps earning, and packaged products built by infra companies keep getting killed.

The one genuine counter-example is NVIDIA. They won by selling the compute brick and notably did *not* assemble the end application. So bricks can win on their own. NVIDIA is the exception that proves how hard the assembled set is to get right.

## Capability landed in November. Adoption waited for December.

Here I have to correct myself. I had a story I kept telling about coding agents' December 2025 moment: *nothing changed technically*, the experience finally got packaged into people's free time. Capability was never the bottleneck; packaging was.

Half of that is wrong, and the Anthropic changelog is the receipt. The "nothing changed" half is false. [Opus 4.5 launched November 24, 2025](https://www.anthropic.com/news/claude-opus-4-5) and reached Pro subscribers December 3: testers called it a real capability jump, with tasks "near-impossible for Sonnet 4.5" now within reach and 50–75% fewer tool-calling errors. [Claude Code for Desktop shipped November 24](https://code.claude.com/docs/en/changelog). [Background agents landed December 6](https://code.claude.com/docs/en/changelog). [Claude in Chrome hit beta December 17](https://code.claude.com/docs/en/changelog). The model powering any December surge literally did not exist a month earlier.

So the real story is more interesting, and the thesis survives it. Capability landed in late November. Adoption still waited for the holidays. The packaging was not "free time alone"; it was **capability and free time arriving together**, and both were necessary.

One honest hedge: there is no public usage data that quantifies a December 2025 spike. The "December moment" is my reading of what I watched happen across the developer community, repeated as narrative until it got treated as a chart. Treat it as observation, not a documented event.

The lesson holds, just tighter. Packaging is what converts capability into adoption, but you need the capability *and* the moment. Every "sudden" AI moment is a packaging moment sitting on top of a capability that either just arrived or had been sitting there waiting.

## Work backwards, not forwards

The discipline: know your customer, find the problem, walk backwards to the stack. Then optimize the underlying infrastructure downstream of a proven use case, never the other way around.

This echoes [Amazon's "working backwards"](https://www.allthingsdistributed.com/2006/11/working_backwards.html), and the echo is intentional. Amazon's version has a specific mechanic: you write the external-facing press release and FAQ *before* any engineering. I am not claiming the full PR/FAQ ritual, just its spirit: start from the person and the problem, not from the bricks.

The anti-pattern to name: shipping capability and waiting for use cases to show up. That is an unpaid research program for your competitors. AWS Honeycode is the cleanest documented case: an infra company trying to sell an assembled set nobody had asked for, and [shutting it down](https://aws.amazon.com/blogs/aws/amazon-honeycode-to-be-retired/) inside two years. Capability without a proven use case is a bet that strangers will do your product thinking for you.

## The counter I take seriously

Pretending the opposing view does not exist reads as weak, so here is the strongest version of the argument against me.

First challenge: the selection skill I am elevating is itself being automated. [Hebbia](https://www.hebbia.com/) markets agents that "reason over limitless context": find startups, analyze transcripts, draft slides, processing 1.5B pages and ~200K prompts a day. [Outset.ai](https://www.outset.ai/) runs hundreds of AI-moderated user interviews at once, "the same rigor at 1/20 of the cost." If "your ability to choose has never mattered more," that skill is being productized in real time. Taste may be a moat with a leak.

Second, sharper challenge: distribution may matter more than selection. [Sequoia's "AI's $600B Question"](https://www.sequoiacap.com/article/ais-600b-question/) frames the bottleneck as adoption, not capability: "Outside of ChatGPT, how many AI products are consumers really using today?" [Elad Gil](https://blog.eladgil.com/p/market-ending-moves) names distribution as king-making. On this view you could pick the perfect use case, package it flawlessly, and still lose to an incumbent holding the channel.

I take both seriously. Selection is necessary but not sufficient. You pick well *and* you find a channel, or you lose. The thesis narrows; it does not break. (There is a counter-counter here, which is Andrew Chen's ["Law of Shitty Clickthroughs"](https://andrewchen.com/the-law-of-shitty-clickthroughs/): distribution advantages decay, which is why incumbents do not win forever. That is a longer, messier fight, and the honest answer is that selection, packaging, and distribution are now three separate problems where there used to be one.)

## Everything is cheap except knowing what to make

The uncomfortable summary, tightened from where I started.

Your ability to **prototype** has never mattered less. Your ability to **choose** (what to build, for whom, in what shape) has never mattered more.

Building well, shipping durable software, the part METR measured as still-hard on mature codebases, that still matters, and the top of the code-review market proves it. Benchmark does not lead a $25M round in a differentiation-free category. But getting to a working demo? That is two days and nearly free now. The scarcity moved upstream, and engineers are the people least equipped to feel it move, because to them every use case still looks equally doable.

Everything is cheap except knowing what to make. Price your time accordingly.
