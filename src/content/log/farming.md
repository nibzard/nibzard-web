---
title: "They're Farming Us"
description: "Tokens are cheap because labs harvest use cases. Deprecation is a live lever; the next crunch is the grid, not the chips."
tldr: "We token-max like the bill will never arrive. Labs give capability away because every session is free R&D — they're farming us for use cases. Deprecation is already a live lever. The coming crunch isn't missing chips, it's the grid. And the router gold rush tells you where everyone thinks the margin goes. A crunch is coming."
date: 2026-07-23
tags: [AI, ECONOMICS, OPINION]
draft: true
author: "Nikola Balić"
topics: [Inference economics, Token subsidies, Model deprecation policy, AI market dynamics, LLM routing and commoditization, Data center power constraints]
entities: [OpenRouter, Stripe, Cursor, Ramp, Anthropic, OpenAI, NVIDIA, LiteLLM]
answers_questions:
  - Why are frontier tokens so cheap relative to apparent cost?
  - Is model deprecation a lever the labs are already pulling?
  - Where does the coming inference crunch actually bite?
  - What does the 2026 router gold rush signal about where the margin goes?
---

Watch how we all work now. Every session brute-forces a problem. Every agent spawns subagents that spawn their own. Nobody refactors a prompt when firing a second Opus at the task is effectively free. Token-maxing has become the default culture, and it makes complete sense, as long as the prices hold.

They won't hold. Not because the models get worse, but because today's prices are an investment someone expects to recoup, and the levers to recoup them are already being tested in the open.

This is an opinion piece about incentives, not a forecast with a date. My confidence is in the incentive analysis. The timeline I refuse to give you. Here's the case.

## The farming thesis

Labs give capability away at prices nobody outside the labs can verify are sustainable. I want to be careful here: no lab discloses per-token cost of goods sold. I don't claim to know the number, and you should distrust anyone who claims to; [Anthropic's pricing page](https://docs.anthropic.com/en/docs/about-claude/pricing) lists what you pay, not what it costs.

But the incentive is legible whether the per-token margin is positive or negative. Every session is free research and development. Every weird prompt chain, every agentic workflow, every "let's see if it can do X" is data about what people will actually use. We are the exploration phase of their product discovery. They're farming us for use cases, and we line up to volunteer.

The trade is real: you get subsidized intelligence, they get your idea maze.

There's a signal worth reading, with the hedge attached. The industry invests far more than it earns. Sequoia's ["$600B Question"](https://www.sequoiacap.com/article/ais-600b-question/) measures an aggregate infrastructure-spend-versus-revenue gap, not per-token margin, so don't cite it as proof that tokens are sold below cost. But look at OpenAI: its losses stayed near [$9 billion even as revenue tripled to roughly $13.1 billion in 2025](https://en.wikipedia.org/wiki/OpenAI). If inference were near-zero marginal cost (pure amortized fixed cost), scaling usage should have narrowed those losses. Instead they scaled with revenue. That is consistent with tokens priced at or below marginal cost. I'm reading a signal, not claiming the books.

<blockquote class="featured-quote primary">You get subsidized intelligence. They get your idea maze.</blockquote>

## The deprecation lever is already live

This is where I have to correct an earlier version of my own thinking. It's tempting to frame deprecation as a control lever the labs haven't fully pulled. That undersells what's happening. The lever is already being pulled, hard.

Look at the cadence. Older-generation Anthropic models got a leisurely runway: Opus 3 had 189 days, Claude 2 and Sonnet 3 had 181. Then 2026 happened, and [every single Anthropic deprecation](https://platform.claude.com/docs/en/docs/about-claude/model-deprecations) sat at the contractual floor of roughly 60 days: Claude 3 Haiku at 60, Claude 3.5 Haiku at 62, Sonnet 4 and Opus 4 at 62, Opus 4.1 at 61. The entire Opus lineage churned in under two years. (OpenAI's floor for generally-available models is a comparatively relaxed [six months](https://developers.openai.com/api/docs/deprecations).)

And the labs now admit the cost of this churn in their own words. Anthropic's deprecations page states plainly that "[r]esearchers lose access to models for ongoing and comparative studies" and that "model retirement introduces safety- and model welfare-related risks." When the farmer publishes a memo about the downsides of rotating the crop, the rotation isn't hypothetical.

So the lever that remains isn't whether to deprecate. It's frontier gating and capability tiering. When the farmer optimizes, access policy becomes the pricing mechanism: keep the harvest running on whatever tier suits them, gate the frontier behind it. The free-flowing era is the part you'll remember fondly.

## The crunch is the grid, not the chips

The bottleneck is not missing inference hardware.

The silicon is shipping at record volume. [NVIDIA just posted $75.2 billion in data-center revenue in a single quarter, up 92% year over year](https://investor.nvidia.com/financial-info/financial-reports/). [Microsoft is spending roughly $30.9 billion a quarter on property and equipment](https://www.microsoft.com/en-us/Investor/earnings/FY-2026-Q3/press-release-webcast). The 2023-era "GPU famine" narrative has subsided; Sequoia's David Cahn said so himself. If you're still picturing a chip shortage, you're a year and a half behind.

The real binding constraint is the power grid. The [IEA](https://www.iea.org/reports/energy-and-ai/executive-summary) finds roughly 20% of planned data-center projects risk delay from grid constraints; transmission lines take four to eight years to build in advanced economies; connection-queue wait times have doubled in three years; and data-center electricity demand is projected to more than double, from 415 TWh in 2024 to 945 TWh by 2030.

You cannot build grid capacity inside one product cycle. Everyone projects drastic market expansion toward end-user agent usage, every consumer running agents continuously. At current per-session appetites, something gives.

## And no, it probably won't be price

This is the strongest counter to the whole crunch story, and I'm not going to pretend it isn't there.

Inference prices are falling, not rising. [Anthropic's Opus went from $15/$75 to $5/$25 per million tokens across three generations](https://docs.anthropic.com/en/docs/about-claude/pricing). [Prompt caching](https://claude.com/blog/prompt-caching) cuts cached input 90%; the Batch API halves cost. [Epoch AI finds FLOP-per-dollar has roughly doubled every 2.1 years](https://epoch.ai/blog/trends-in-machine-learning). A plain "tokens get more expensive" prediction runs straight into that trend.

So the crunch doesn't look like a price spike, and I should stop gesturing at one. It looks like access and capability tiering, which is the deprecation lever, one section up. Those are the same argument told two ways. Price degrades at the commodity tier; the frontier gets gated. That's the recoup mechanism. The bill arrives as "that model is no longer available on your plan," not as a bigger number on your invoice.

## The router gold rush is commoditization panic

Take the 2026 router wave. The first thing to fix is the causality: it was not a reaction.

Ramp shipped its [in-house router on July 20](https://builders.ramp.com/post/thompson-sampling-model-routing). Cursor shipped [Cursor Router on July 22](https://cursor.com/blog/router). The Stripe–OpenRouter news broke the evening of [July 23](https://news.ycombinator.com/item?id=49027985). Both routers predate the deal news by days. What you're watching is a concurrent 2026 wave riding OpenRouter's broader momentum (a [$113 million Series B at a $1.3 billion valuation in May, led by CapitalG](https://openrouter.ai/blog/announcements/series-b/)), not a flinch.

And that deal everyone reacted to isn't a deal. Stripe is [in talks to buy OpenRouter for roughly $10 billion](https://www.wsj.com/tech/ai/stripe-in-talks-to-buy-buzzy-ai-model-marketplace-openrouter-decc6a74); [The Information](https://www.theinformation.com/briefings/stripe-talks-buy-startup-openrouter) reports the talks "could still fall apart." Acquisition-talks, not an acquisition.

So read the wave correctly. Routing became the hottest category of the year because everyone senses margin migrating toward whoever controls model access. Then look at the tell: routing is a thin, self-hostable commodity, and the category leader proves it. [OpenRouter charges zero fees on the first $25,000 a month of bring-your-own-key inference](https://openrouter.ai/pricing), $200,000 a month on Enterprise, before any 5% fee kicks in (pay-as-you-go runs 5.5%). The largest gateway gives its core product away below that line. [LiteLLM](https://github.com/BerriAI/litellm) ships the same unified interface, routing, fallback, and spend tracking, open source, self-hosted, free. The switching cost is near zero.

This isn't a moat being built. It's panic. And it may not even be the right ground to stand on. [a16z argued years ago](https://a16z.com/who-owns-the-generative-ai-platform/) that value accrues to compute and infrastructure while model labs and apps are both squeezed — which would mean routers get pressed from both sides, not crowned.

The individual artifacts are still worth seeing for what they cost to build. Ramp's router uses Thompson sampling over lognormal latency posteriors and reports a 25–30% cost cut, processing what Ramp describes as trillions of tokens a day. (It's a closed beta, not open source, despite the "opens" in the headlines; the post was authored by Kedar Thakkar. Ramp's CTO is Karim Atiyeh. The "100-plus internal use cases" count comes from secondary reporting, not Ramp's own post.) Cursor Router ships three modes: Intelligence, Balance, Cost. These are real engineering artifacts. They're also, structurally, margin defense at a layer with no defensible margin.

## What to do about it (without doomerism)

None of this means stop building. It means build like you've read the fine print.

Build efficiency as a muscle before you need it. Build harnesses that degrade gracefully across model tiers, the kind that keep working when your favorite model gets the 60-day notice. Know your actual per-task token economics now, instead of discovering them during a repricing event.

And run the uncomfortable check: if your product only works at subsidized token prices, you don't have a product. You have a grant.

## Closing

Enjoy the harvest season. Genuinely. Build everything while it's cheap. This is the best deal on intelligence any of us will ever see, and the right move is to use it hard.

Just know which side of the farming you're on. And keep one eye on the silo.

---

*A note on stakes: I work on agent browser infrastructure at [Steel](https://steel.dev), so I watch inference economics from the demand side: we buy it, we don't sell it. The crunch claim above rests on the cited primary evidence, not on authority.*
