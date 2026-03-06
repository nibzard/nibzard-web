---
title: "The Post-Copyright Era of Software"
description: "Software was already an awkward fit for copyright. AI turns that mismatch into a full-blown regime change."
tldr: "Copyright does not disappear in the AI era, but it stops functioning as a meaningful scarcity mechanism for software. As reimplementation gets cheap, the real moats shift to trust, governance, provenance, maintenance, and operational legitimacy."
date: 2026-03-06
tags: [AI, SOFTWARE, COPYRIGHT, POLICY, FUTURE]
draft: false
author: "Nikola Balić"
topics:
  - software copyright
  - AI and intellectual property
  - software abundance
  - open source governance
  - reimplementation and interoperability
entities:
  - chardet
  - European IPR Helpdesk
  - Cloudflare
  - vinext
  - Next.js
  - Vite
  - Mladen Vukmir
  - Gergely Orosz
answers_questions:
  - Why is software entering a post-copyright era?
  - How does AI change software copyright in practice?
  - What will matter when code becomes easy to reimplement?
  - Why does software look more abundant in the AI era?
---

The licensing fight around [`chardet`](https://github.com/chardet/chardet/issues/327) is not really about one library. `chardet` is a small but widely used text-encoding detection library, and the dispute around it is a preview of something larger.

Software can now be reimplemented, restructured, and re-targeted faster than ownership can be cleanly argued.

Copyright does not disappear in the AI era, but it stops functioning as software's main scarcity mechanism. As reimplementation gets cheaper, the real moats move to trust, governance, provenance, maintenance, and operational legitimacy.

I think that partly because I spent about a decade working close to Europe's IP system: advising companies on IP strategy and serving as a European IPR Helpdesk Ambassador from `2013` to `2023`.

<blockquote class="featured-quote primary">
Software was already a bad fit for copyright. AI does not create that mismatch. It makes it impossible to ignore.
</blockquote>

## AI Changes the Cost Curve

What AI changes is not the moral status of copying. What it changes is the **cost of reimplementation**.

Before AI, a rewrite was expensive. A redesign was expensive. A compatible implementation was expensive. Even when legally allowed, these things required a lot of human time, coordination, and patience.

Now a spec, a test suite, a benchmark target, a wire protocol, an API contract, or even a rough product description can seed multiple viable implementations.

If you want a concrete example, look at [Cloudflare's `vinext`](https://blog.cloudflare.com/vinext/). In February 2026, Cloudflare described using one engineer plus AI to reimplement most of the Next.js API surface on top of Vite, retargeting a dominant framework toward Cloudflare Workers instead of merely adapting it after the fact.

Cloudflare is also explicit that `vinext` is experimental and not battle-tested at serious scale. That matters. As [Gergely Orosz noted](https://newsletter.pragmaticengineer.com/p/the-pulse-cloudflare-rewrites-nextjs), the important signal is not that `vinext` is already production-perfect. It is that a major reimplementation like this is now suddenly plausible.

Once implementation gets cheap enough, software enters an abundance dynamic: old projects get revived, abandoned tools get reimagined, slow libraries get rewritten, and compatible alternatives show up much faster than before.

Some of that output will be slop. But abundance also creates selection pressure. The cheapness of writing code does not remove the difficulty of making software trustworthy, durable, correct, lovable, and worth depending on. Once raw implementation is less scarce, the market starts caring more about the layers above it: editorial taste, architecture, validation, governance, and product judgment. That is not the death of software. That is software becoming more abundant, more contested, and in many ways more alive.

## Software Was Never Well-Protected by Copyright

Software was always an awkward object for copyright. Yes, source code is written text. But software is also behavior, interfaces, protocols, tests, architectures, and expected outputs. It is part text, part machine, part agreement.

That is why the old fault line never really stayed settled: where does **idea** end and **expression** begin in software? Is an API expression? A protocol? A benchmark target? A rewrite with different structure but identical behavior in a stack?

The industry has been answering those questions in practice for decades through clean-room implementations, ports, compatible runtimes, reverse engineering, forks, and rewrites. People rarely care about software the way they care about a poem. They care that it works, integrates, preserves compatibility, and does not break production.

That is also why copyright never really explained most software defensibility. What mattered in practice was maintainership, distribution, trust, support, brand, ecosystem fit, and operational continuity. The moat was rarely "nobody can write similar code." The moat was "nobody can become the canonical thing."

Once software can be regenerated from behavior and constraints with enough fidelity, "who owns this text?" stops being the master question. The master questions become who users trust, who maintains it well, who can prove quality, who controls the namespace, and who can operate responsibly at scale.

## The Legal Categories Start to Slip

The classic categories still exist: original work, derivative work, clean room, independent implementation, substantial similarity. But AI makes them much harder to apply with confidence.

If a model was trained on public code, what counts as contamination? If a team rewrites a system from tests, behavior, or specifications, where is the meaningful boundary? If two implementations solve the same problem with the same constraints, what level of resemblance is legally or socially relevant?

To steelman the other side: copyright still matters where distribution rights, license compatibility, and litigation risk shape behavior. If you are shipping GPL-incompatible code, negotiating enterprise contracts, or raising money around messy provenance, legal exposure still changes choices. It just matters less as a barrier to functional substitution.

My friend Mladen Vukmir, a veteran IP lawyer and founding partner of VUKMIR + ASSOCIATES, makes a similar point in [The Copyright Dilemma with Claude](https://platforum9.com/the-copyright-dilemma-with-claude/). His argument is that the **current copyright framework may struggle to survive the AI era in its existing form**, and that the harder question is how the economic value created by AI gets distributed. That is exactly the right reframing. The legal argument does not disappear, but it stops being sufficient on its own.

## What Matters Instead

If copyright becomes less central, something else has to carry more weight. For maintainers, founders, and open-source communities, that means a new legitimacy stack:

### 1. Trust

People adopt software they believe will not betray them.

### 2. Provenance

Not perfect token ancestry, but practical traceability: how it was built, what it depends on, what was reviewed, and what can be audited.

### 3. Governance

Who gets to rename, replace, fork, or redirect a project, and what continuity users can expect.

### 4. Verification

Benchmarks, tests, evals, and operational evidence. In the age of cheap generation, proof of quality matters more than declarations of authorship.

### 5. Accountability

Someone still ships the thing, answers when it breaks, and absorbs the consequences.

This is why I keep coming back to the same conclusion: the future of software legitimacy is not textual purity. It is **operational legitimacy**.

That also means better norms, not fewer: attribution, disclosure of AI-assisted rewrites, fork etiquette, namespace continuity, governance transitions, and supply-chain transparency all matter more in a world where equivalent implementations can appear quickly.

## The Software Renaissance

This is what a renaissance looks like. More rewrites, more redesigns, more spiritual successors, more niche optimizations that were never economically worth attempting before. More weird experiments that survive long enough to become useful.

Software is not becoming lawless. It is becoming abundant.

For years, we treated copyright as if it were the natural center of software ownership. It never really was. AI does not invent that truth. It just accelerates it beyond plausible denial.

So yes, we are going to see more rewrites, more ports, more compatible reimplementations, and more conflicts over lineage. That is the software renaissance.

The people who win in that world will not be the ones clinging hardest to textual ownership. They will be the ones who build trust, govern well, verify aggressively, and give users something more valuable than exclusive access to source text.

They will give them confidence.
