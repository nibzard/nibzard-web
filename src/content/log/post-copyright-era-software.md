---
title: "The Post-Copyright Era of Software"
description: "Software was already an awkward fit for copyright. AI turns that mismatch into a full-blown regime change."
tldr: "Copyright does not disappear in the AI era, but it stops functioning as a meaningful scarcity mechanism for software. As reimplementation gets cheap, the real moats shift to trust, governance, provenance, maintenance, and operational legitimacy."
date: 2026-03-06
tags: [AI, SOFTWARE, COPYRIGHT, POLICY, FUTURE]
draft: true
author: "Nikola Balić"
topics:
  - software copyright
  - AI and intellectual property
  - software abundance
  - open source governance
  - reimplementation and interoperability
entities:
  - chardet
  - WIPO
  - European IPR Helpdesk
  - AI coding agents
  - Cloudflare
  - vinext
  - Next.js
  - Vite
  - Mladen Vukmir
answers_questions:
  - Why is software entering a post-copyright era?
  - How does AI change software copyright in practice?
  - What will matter when code becomes easy to reimplement?
  - Why does software look more abundant in the AI era?
---

The latest licensing drama around [`chardet`](https://github.com/chardet/chardet/issues/327) is not an edge case. It is a preview.

What looked like a fight about one library was really a fight about something much larger: what happens when software can be rewritten, restructured, re-targeted, and regenerated faster than ownership can be cleanly argued?

I have a slightly unusual perspective on this. For about a decade, I worked close to Europe's IP machinery. I was a European IPR Helpdesk Ambassador from `2013` to `2023`, picked up more WIPO certificates than I care to count, and advised companies on their IP strategies. I spent years helping people think seriously about how intellectual property protects innovation.

That is exactly why I think software is entering its **post-copyright era**.

Not because the law vanishes. Not because copying becomes morally uncomplicated. Not because attribution stops mattering.

But because copyright is losing its force as a meaningful **scarcity mechanism** for software.

<blockquote class="featured-quote primary">
Software was already a bad fit for copyright. AI does not create that mismatch. It makes it impossible to ignore.
</blockquote>

## Copyright Was Always Strange Here

Copyright makes intuitive sense for novels, music, film, or visual art. Those are expressive works. Their identity is tightly bound to the artifact itself.

Software was never like that.

Yes, code is written text. Yes, specific source files contain expressive choices. But software is also behavior, constraints, interfaces, architectures, protocols, transformations, tests, and expected outputs. It is part text, part machine, part process, part agreement.

That made software an awkward legal object from the start.

The old fault line was always the same: where exactly does **idea** end and **expression** begin in software?

Is an API expression? A protocol? A data model? A benchmark target? A set of expected behaviors? A port to another language? A rewrite with different structure but identical role in a stack?

The industry has been tripping over those questions for decades because software is fundamentally **functional**. People do not care about it the way they care about a poem. They care that it works, that it integrates, that it is reliable, that it is fast enough, that it preserves compatibility, that it does not break production.

That is why software history is full of:

- clean-room implementations
- clones
- ports
- compatible runtimes
- reverse engineering
- forks
- rewrites
- reimplementations of old ideas in new forms

The legal system kept trying to draw hard boundaries around a medium that, in practice, evolves through imitation, compatibility, and recombination.

## Copyright Never Really Solved Software

Even before AI, copyright was not the thing that actually protected most software value.

What mattered in practice was:

- maintainership
- distribution
- trust
- support
- ecosystem compatibility
- brand
- operational continuity
- community legitimacy

That is why so many software businesses and open source projects survived despite clones, forks, and competitors shipping functionally similar things.

The moat was rarely "nobody can write similar code."

The moat was: "nobody can become the canonical thing."

Nobody can inherit the trust graph overnight. Nobody can instantly replicate years of operational history, ecosystem integration, docs, issue triage, namespace legitimacy, and user confidence.

So even in the pre-AI world, copyright already looked less like a true moat and more like a supporting instrument. Useful in some disputes, yes. Important in edge cases, yes. But not the core explanation for why software won or lost.

That core explanation lived elsewhere.

## AI Changes the Cost Curve

What AI changes is not the moral status of copying. What it changes is the **cost of reimplementation**.

That distinction matters.

Before AI, a rewrite was expensive. A redesign was expensive. A port was expensive. A compatible implementation was expensive. Even when legally allowed, these things required a lot of human time, coordination, and patience.

Now a spec, a test suite, a benchmark target, a wire protocol, an API contract, or even a rough product description can become the seed for multiple viable implementations.

That is a massive regime change.

If you want a concrete example, look at [Cloudflare's `vinext`](https://blog.cloudflare.com/vinext/). In February 2026, Cloudflare described using one engineer plus AI to reimplement most of the Next.js API surface on top of Vite, turning a dominant framework into something that could be retargeted toward Cloudflare Workers instead of merely adapted after the fact. That is a very clean example of the shift I am describing here: value moving away from the sanctity of the original source text and toward behavior, compatibility, tests, and deployment context.

And the caveat matters just as much. Cloudflare is explicit that `vinext` is still experimental, not battle-tested at serious scale, and still earning trust. That is the second half of the story. Reimplementation gets cheap much faster than legitimacy does.

Once implementation becomes cheap enough, more and more software gets pulled into an abundance dynamic:

- old projects get revived
- abandoned tools get reimagined
- slow libraries get rewritten
- Python code gets moved to Rust, Go, Zig, or C++
- APIs get recreated behind new internals
- entire categories get recomposed around better ergonomics or better performance

This is why I think we are entering a **software renaissance**.

Not because AI is magically creative in some mystical sense. But because the cost of trying things has collapsed. And when the cost of trying things collapses, experimentation explodes.

We will see more rewrites, not fewer.

We will see more redesigns, not fewer.

We will see more "spiritual successors," more drop-in replacements, more reimplementations, more protocol-compatible alternatives, and more niche optimizations.

That is what abundance looks like.

## The Legal Categories Stop Matching Reality

This is where the whole system starts to wobble.

Take the classic categories software copyright has leaned on:

- original work
- derivative work
- clean room
- independent implementation
- substantial similarity

Those categories were already imperfect. AI makes them increasingly unstable in practice.

Why?

Because provenance gets harder to prove cleanly in either direction.

If a model was trained on public code, what exactly counts as contamination? If a team rewrites a system from tests, behavior, or specifications, where is the meaningful boundary? If two implementations solve the same problem with similar interfaces and constraints, what level of resemblance is legally or socially relevant?

You can keep the vocabulary, but the confidence behind it starts to dissolve.

That does not mean courts disappear. It does not mean lawyers run out of work. It does not mean every dispute becomes unwinnable.

It means the legal framework starts lagging further behind the technical reality it is supposed to govern.

My friend Mladen Vukmir makes a similar point in [The Copyright Dilemma with Claude](https://platforum9.com/the-copyright-dilemma-with-claude/). Mladen is not just any commentator here. He is a longtime IP lawyer, founding partner of VUKMIR + ASSOCIATES, a longstanding member of ECTA and INTA, and someone who has spent decades working across copyright, trademarks, patents, and technology law. His argument is that the **current copyright framework may struggle to survive the AI era in its existing form**, and that the harder question is how the economic value created by AI gets distributed. I think that is exactly the right reframing. The legal argument does not disappear, but it stops being sufficient on its own.

In other words: the law remains, but the leverage fades.

## Copyright Becomes Peripheral

This is the part people tend to resist.

When I say software is entering a post-copyright era, I do **not** mean copyright literally stops existing.

I mean it becomes **peripheral** to the actual dynamics of software production.

It remains on paper. It remains in contracts. It remains in policy. It remains a tool for some disputes and some institutions.

But it stops being the central practical boundary.

Once software can be regenerated from behavior and constraints with enough fidelity, "who owns this text?" stops being the master question.

The master questions become:

- who do users trust?
- who maintains it well?
- who can prove quality?
- who controls the namespace?
- who can absorb liability?
- who has community legitimacy?
- who provides continuity?
- who can operate the system responsibly at scale?

That is the shift.

Scarcity used to sit closer to implementation. Now it moves upward into trust, governance, verification, and operations.

## This Is a Renaissance, Not a Collapse

A lot of people hear this argument and imagine chaos.

I do not.

I think this looks more like the next great flourishing of software.

When implementation gets cheaper, more people can participate. More old ideas can be revisited. More weird experiments can survive long enough to become useful. More niche needs become economically worth serving.

Some of that output will be slop. Of course it will. Abundance always comes with noise.

But abundance also creates selection pressure.

The cheapness of writing code does not remove the difficulty of making software trustworthy, durable, fast, correct, lovable, governable, and worth depending on.

That is why I do not buy the simplistic "AI kills software" line.

It cheapens one layer of the stack. It does not cheapen all of them.

In fact, once raw implementation is less scarce, the market starts caring more about the layers above it:

- editorial taste
- architecture
- validation
- governance
- product judgment
- supply-chain trust
- institutional legitimacy

That is not the death of software.

That is software becoming more abundant, more contested, more fluid, and in many ways more alive.

## What Matters in the Post-Copyright Era

If copyright becomes less central, something else has to carry the weight.

That "something else" is not one thing. It is a new stack of legitimacy:

### 1. Trust

People adopt software they believe will not betray them.

### 2. Provenance

Not in the naive sense of "prove every token's ancestry," which is probably impossible at scale. I mean practical provenance: how this was built, what it depends on, what assurances exist, what was reviewed, what was tested, what can be audited.

### 3. Governance

Who gets to rename, replace, fork, or redirect a project? What continuity do users deserve? What norms should apply when a codebase changes identity but keeps its namespace?

### 4. Verification

Benchmarks, tests, evals, formal guarantees where possible, operational evidence where necessary. In the age of cheap generation, proof of quality matters more than declarations of authorship.

### 5. Operator liability

Someone still owns the outcome. Someone still ships it. Someone still answers when it breaks production, leaks data, corrupts records, or introduces risk into a supply chain.

This is why I keep coming back to the same conclusion: the future of software legitimacy is not textual purity. It is **operational legitimacy**.

## The New Social Contract

None of this means "anything goes."

If anything, the post-copyright era demands better norms, not fewer.

We need stronger expectations around:

- attribution
- disclosure of AI-assisted rewrites
- rename and fork etiquette
- namespace continuity
- user communication
- governance transitions
- supply-chain transparency

The old model assumed the law could carry more of the burden.

The new model requires social, technical, and operational norms to do more of the work.

Because in a world where many equivalent implementations can emerge quickly, legitimacy no longer comes from owning the text alone.

It comes from how you behave around the ecosystem that depends on the text.

## The Post-Copyright Era of Software

Software is not becoming lawless.

It is becoming abundant.

And abundance changes what matters.

For years, we treated copyright as if it were the natural center of software ownership. It never really was. It was a legal layer wrapped around a medium whose real dynamics were always closer to interoperability, iteration, and recombination.

AI does not invent that truth. It just accelerates it beyond plausible denial.

So yes, we are going to see more rewrites, more redesigns, more ports, more compatible reimplementations, more conflicts over lineage, and more discomfort from institutions built around older assumptions.

That is not a temporary glitch.

That is the software renaissance.

And the people who win in that world will not be the ones clinging hardest to textual ownership.

They will be the ones who build trust, govern well, verify aggressively, and give users something more valuable than exclusive access to source text.

They will give them confidence.
