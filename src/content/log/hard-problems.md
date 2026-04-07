---
title: "The Hard Problems Nobody Has Solved"
description: "Four unsolved problems blocking the agentic future: correctness, architecture drift, context scaling, and judgment."
tldr: "AI agents can write code, but they can't prove it's correct, maintain architectural coherence, hold institutional context, or make value-laden decisions. These four problems are what stand between today's demos and tomorrow's production systems."
date: 2026-04-07
tags: [AI, AGENTS, ENGINEERING, OPINION]
draft: false
author: "Nikola Balić"
topics:
  - AI agent limitations
  - software correctness
  - architecture drift
  - organizational context
  - human judgment in AI systems
  - formal verification
entities:
  - LLMs
  - RAG
  - AI coding agents
answers_questions:
  - What are the biggest unsolved problems with AI coding agents?
  - Why do agent-written tests still miss production bugs?
  - How do you maintain architectural coherence with multiple agents?
  - What role do humans play when agents can write all the code?
---

The agentic future is seductive. Agents that write features, review PRs, deploy code, fix incidents. You describe what you want, they build it.

I find myself wanting to believe it. But whenever I try to think past the demos, I hit the same walls. Not model limitations, those keep getting better. Not tooling, that's catching up fast enough. The walls are structural. They're the kind of problem that doesn't yield to another round of scaling.

Four of them, specifically.

## 1. The correctness wall

An agent can write a feature. Can it write a *correct* feature? Not "compiles and tests pass" correct. Correct for edge cases you haven't thought of, for users who do things you'd never do, for failure modes that only show up at 3am on a Saturday.

Here's the thing about agent-written tests: they share the same blind spots as the code. The agent imagines a happy path, writes the code for it, then writes tests that confirm the happy path works. Everything is green. The PR gets merged. Then a user hits the edge case nobody modeled, and the system breaks in exactly the way the tests were designed not to catch.

I've seen this enough times now that it doesn't surprise me anymore. What surprises me is how *convincing* the green test suite looks right up until it doesn't matter.

The way out might be formal specification. Not the academic kind that nobody uses, but a practical version where the human describes invariants (no double-charging, no negative balances, every transaction has an audit trail) and the agent has to prove the code satisfies them. Academia has been working on this stuff for decades. The reason it never caught on is that writing formal specs is tedious and nobody wants to do it. Agents, on the other hand, have infinite patience for formalism. That bottleneck might just disappear.

## 2. The architecture drift problem

Put ten agents on one system for a month. Each one makes locally reasonable decisions. The result is a system that works but is architecturally incoherent, the software equivalent of a city where everyone built whatever they wanted.

You know this from human codebases. Legacy code, different authors, shifting requirements. Every file makes sense alone. The whole thing makes no sense together.

Agents make it worse because they're fast and they don't have architectural taste. An agent asked to add caching will add the best caching layer for *this module*, blissfully unaware that three other modules already have caching layers implemented three different ways. Locally optimal, globally incoherent. The codebase works today. Six months from now, nobody can reason about it.

I think the answer is that the architect agent becomes the most important role. Not the agent that writes code. The one that *rejects* code. It maintains a living architecture doc, reviews every PR at the system design level, and pushes back when a worker agent introduces a fourth way to do something you already do three ways.

Encoding architectural taste is genuinely hard. I don't want to hand-wave that. But the cost of *not* encoding it compounds in ways you don't notice until the codebase is a mess and everyone's afraid to touch anything.

## 3. The context scaling problem

A worker agent can hold a module in context. An architect agent can hold a system. But who holds the *business*?

Why does the payment system work that way? Regulatory requirement from 2023. Why does the auth flow have three steps? Security incident in 2024. Why does onboarding ask for a phone number? Because sales figured out that users who give one have 3x higher retention.

None of this is in the code. It lives in Slack threads and design docs and incident post-mortems and the heads of people who were there. If you're lucky, someone wrote an ADR. If you're unlucky, which is most of the time, the context exists only as institutional memory distributed across people who might not even work there anymore.

Agents don't have this. They see the code and the comments. So when an agent looks at the three-step auth flow and thinks "two steps would be cleaner," it's right about the code and wrong about the decision. That gap between *working* code and *appropriate* code is where production incidents come from.

The fix looks like what I'd call a librarian agent. Something that ingests every decision record, every post-mortem, every design doc, and builds a structured knowledge base. When the worker agent is about to "simplify" that auth flow, the librarian says: here's the incident, here's the post-mortem, here's security's sign-off on the current design. You don't need a refactor, you need a security review.

It's RAG over organizational knowledge instead of code. And it's the difference between agents that ship features and agents that ship features without breaking the business.

## 4. The judgment problem

This is the hardest one and I keep going back and forth on how to think about it.

Agents can implement, optimize, test, deploy. But deciding *what* to build? Evaluating whether a feature is worth the effort, or whether a tradeoff favors users or the business, or whether a shortcut now will hurt later?

The human stays in the loop here longest. Not because humans are smarter. In a lot of technical dimensions, they already aren't. But judgment requires values, and values come from the people who live with the consequences.

An agent can frame a tradeoff perfectly. "Option A ships in two days with tech debt. Option B ships in five with clean architecture. Here's what each costs you downstream." That framing is genuinely useful. But the choice between those options depends on things like: do you care more about speed or maintainability this quarter? Do you trust yourself to actually pay down the debt? Is the market window more important than the codebase?

Those are values questions. The agent can lay out the options, but the answer has to come from you.

I think the human's role eventually narrows to three things: vision (what should exist that doesn't), values (what tradeoffs you'll accept), and taste (is this actually good enough). Everything else is agent work. But those three are the part that makes the product *yours* and not just competent.

## What these have in common

None of these are model problems. A better model won't fix architecture drift. A larger context window won't capture institutional knowledge that was never written down. A more capable agent won't develop values on its own.

These are systems problems. They need new roles, new practices, new ways of drawing the line between what the human decides and what the agent executes.

The companies that get this right probably won't be the ones with the best models. They'll be the ones that figure out the boring stuff: how to encode taste, how to preserve context, how to keep ten agents from making a mess of the same codebase. Nobody's fundraising on "we built a really good librarian agent," but maybe they should be.
