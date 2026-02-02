---
title: The Human Web Is Becoming Agent Web
description: I'm joining Steel as founding growth lead. The web is shifting from human clicks to agent-run workflows.
date: 2026-02-02
tags: [Agents, AI, Growth, Steel]
featured: true
draft: false
tldr: "I'm joining Steel as founding growth lead. The web is shifting from human clicks to agent-run workflows. Steel aims to be the execution layer that makes agents reliable via traces + trust."
author: Nikola Balić
---

> Viewed through a Capra-like systems lens: the web is shifting from interface to organism, from clicks to feedback loops.

I almost didn't join [Steel](https://steel.dev/).

Not because I wasn’t sold. The opposite. I was _too_ convinced, and that's a dangerous state. When you’re convinced, your brain starts treating decisions like inevitabilities. You stop stress‑testing your own narrative. You stop asking what you’re missing. You start buying your own pitch.

So I did what I always do when I’m not sure if I’m about to make a great decision or a stupid one: **I tried to slow time down.**

I dictated a messy note into ChatGPT, half thinking, half arguing with myself, about what Steel _really_ is, what the browser means in the agent era, and what happens when the web stops being a place humans click… and becomes a place agents act.

The next morning, I had a calendar invite from [Huss](https://x.com/hussufo) (Steel co-founder and CEO).

He didn’t mince words: **we should work together**. I pasted him the ChatGPT transcript. And we had one of those rare moments where two different paths converge on the same idea in the same spacetime.

Convergence on mechanism beats convergence on vibes.

**So I’m joining Steel full-time.**

This is the thesis that made it obvious:

> **Steel is the translation layer that turns the human web into an agent-operable substrate; it's an agent lab disguised as infrastructure, because infrastructure is the only credible way to earn the traces, trust, and distribution needed to make digital labor reliable.**

That’s a mouthful. It’s also the whole game.

Let me unpack it.

---

## Agents aren’t chat. They’re labor.

Most people still talk about “agents” as if they’re a slightly smarter chatbot.

OpenAI’s own framing is much closer to the truth: agents are “**systems that independently accomplish tasks on behalf of users**.” ([OpenAI](https://openai.com/index/new-tools-for-building-agents/))

Those lines are polite, corporate ways of saying something that makes people uncomfortable:

**Software is turning into labor.**

Not metaphorically. Economically.

The unit of value shifts from:

- _outputs_ (answers, suggestions, drafts)  
    to:
- _outcomes_ (booked, filed, reconciled, shipped, deployed, resolved)

This is why the definitions that matter aren't philosophical; they're operational. After much struggle, Simon Willison nailed the most useful one:

> **An LLM agent runs tools in a loop to achieve a goal.** ([Simon Willison](https://simonwillison.net/2025/Sep/18/agents/))

That loop is everything. The loop is where value is created, and where value collapses when the system becomes brittle.

If you can’t replay the loop, inspect the loop, and improve the loop… you don’t have an agent.

You have a demo.

> The difference between LLM in a loop and a system you can delegate real work to is the remaining 10%: relentless integration polish, enterprise edge cases, and the unglamorous reliability work that turns a demo into a coworker.

---

## The browser is the frontier because the world refuses to become an API

The web is not “content.” The web is workflows.

Agents don’t need prettier UIs. They need interfaces that behave like tools.

Every dashboard, form, checkout flow, admin panel, billing portal, B2B back-office UI: these are not web pages. They’re frozen procedures. They’re “how work gets done” encoded into clicks.

And most of it will never get a clean API.

Not because it’s hard. Because it’s _organizationally expensive_.

The last 20 years of software produced a planet‑scale layer of human-oriented interfaces. And that layer is the most valuable training ground for agents precisely because it’s ugly: inconsistent UI, flaky state, anti-bot measures, permission ambiguity, login flows that behave differently every third Tuesday.

This is why “computer use” matters. OpenAI’s computer-using agent is explicit that it can operate interfaces “without using OS- or web-specific APIs,” by perceiving the screen and acting through mouse and keyboard. ([OpenAI CUA](https://openai.com/index/computer-using-agent/))

This is the correct direction because it aligns with how the world actually works. But OpenAI’s own evals also show the hard truth: current general agents are simultaneously impressive and far from production-grade reliability in messy environments (e.g., results like **38.1%** on OSWorld and **58.1%** on WebArena are both proof-of-viability _and_ a loud alarm bell). ([OpenAI CUA](https://openai.com/index/computer-using-agent/))

So the bottleneck isn’t “can the model see pixels.”

The bottleneck is: **can the system execute reliably in the world we already have.**

That is not a model problem. That is a loop problem. An orchestration problem. A trust problem.

It’s a systems problem.

---

## Steel’s wedge looks like infra. That’s the strategy.

Steel started as browser infrastructure because that’s the wedge the market will pay for immediately. Fast, scalable, reliable browser sessions. Web scraping. Automation. Testing. The classic stuff.

And yes, Steel is extremely good at that.

But what matters is what happened next.

A new cohort emerged: builders from the “AI agent world” who are using Steel as the execution substrate for agents that act on behalf of users.

That distribution isn’t random.

It’s an adoption ladder.

- First: **extract data** (scraping)
- Then: **automate actions** (workflow automation)
- Then: **delegate work** (agents)

This is the same inversion I watched all year: product-first teams beat model-first teams because they own the workflow trace. Infra is the quiet way to own the trace.

This is the same pattern we’ve seen in every platform shift: capability arrives as a tool, becomes a workflow, then becomes labor.

Steel’s positioning means it gets to sit _inside_ the transition instead of chasing it.

And that’s why Steel is an agent lab disguised as infrastructure. ([As I've written before](/agent-labs), agent labs ship product first and work their way down—turning traces into compounding reliability.)

Not because “agent lab” is a better buzzword.

Because the _mechanics_ force it.

---

## The translation loop: human web → agent web

I want to anchor the rest of this piece on one diagram, because it captures what’s actually happening and what must be built next.

![The Human Web → Agent Web Translation Loop](/images/20260202_translation-loop-human-to-agent-web.jpeg)

<div style="text-align: center; font-style: italic; color: var(--color-text-secondary); margin-top: 0.5rem;">Fig1: The Human Web → Agent Web Translation Loop.</div>

It’s a loop with a simple claim:

### **Traces → Reliability → Autonomy**

At the center is the _translation layer_: **human intent → executable actions**.

Around it are the components that make agent execution real:

- **Perception** (observe UI/state)
- **Planning & orchestration** (decompose tasks, assign roles, delegate)
- **Execution** (tools + browser actions)
- **Verification** (tests, checks, screenshots, receipts, audits)
- **Recovery** (retry, fallback, escalate)

And on the right side is the compounding engine: a **trace reservoir**, the compounding moat.

This is the part most people miss.

They think the product is the agent UI.

In the agent era, **execution is the product**.

And traces are what make execution improve.

Because traces give you:

- success/failure labels
- drift events
- human approvals
- cost/latency profiles
- replayable evidence

Traces are not “logs.” They are training signals.

Traces are how you turn stochastic systems into reliable systems.

Traces are how you build what I’ve been calling **reliable curves**: predictable success rate improvements over time, not just viral demos.

If you want to know why I believe in Steel, it’s because Steel is structurally positioned to produce that trace reservoir as a byproduct of doing real work.

---

## Tools are the contract between probability and reality

Anthropic stated the core law plainly:

> **Agents are only as effective as the tools we give them.** ([Anthropic](https://www.anthropic.com/engineering/writing-tools-for-agents))

This is the unsexy truth behind most agent hype.

The browser is the richest tool surface humans ever built. Which means browser infrastructure is not “headless browsing.” It’s **agent tooling**.

And tooling quality becomes agent quality.

This is why Steel's infrastructure primitives matter so much. For example, Steel's Sessions API frames a session as a controlled, isolated lifecycle boundary, "like a fresh incognito window," but running in the cloud and controlled through code. ([Steel Docs](https://docs.steel.dev/overview/sessions-api/overview))

That sounds like implementation detail until you try to build real agents.

Agents don’t just need a page.

They need:

- state continuity
- cookie/session stability
- identity boundaries
- replayability
- lifecycle control
- concurrency without chaos

At scale, clicking is the easy part.

Everything around clicking is the product.

---

## The moat isn’t models. The moat is outcomes.

The market loves to argue about models. It’s the laziest argument because it’s legible.

But model advantage decays fast.

The moat that compounds is **workflow ownership** and **outcome visibility**.

This is why swyx’s “Agent Labs” framing resonated so hard with me:

> **Agent labs ship product first, and then work their way down.** ([swyx](https://www.swyx.io/cognition))

That’s not a vibe. That’s a strategy under uncertainty.

You ship product first because product generates:

- distribution
- revenue
- feedback
- constraints
- real-world traces

Then you “work your way down” because only then do you understand what you should even train, fine-tune, evaluate, or harden.

Cursor forked VSCode, spent two years understanding users, then built the model.([latent.space](https://www.latent.space/p/agent-labs))

Agent labs don’t win by having a model.

They win by owning the loop.

Steel is set up to own the most important loop on earth: **the loop that operates the web.**

---

## Trust is not a policy. Trust is a product surface.

If you believe agents are labor, you also have to accept the next sentence:

**Autonomy is cheap. Mistakes are expensive.**

Reliability and security aren’t optional; error rates become product-breaking.

And the security risks are not theoretical. Simon Willison’s “lethal trifecta” is the cleanest threat model I’ve seen:

> If your agent combines these three features, an attacker can easily trick it into accessing your private data and sending it to that attacker. ([Simon Willison](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/))

Anthropic explicitly warns that prompt injection is one of the biggest security challenges for browser-based agents. ([Anthropic](https://www.anthropic.com/research/prompt-injection-defenses))

So the path forward is not “full autonomy everywhere.”

The path forward is what the diagram calls **supervised autonomy**: checkpoints, audits, explicit permissions, reversible actions, and clean handoff between agent and human.

This is why I care so much about the “trust design” layer in the diagram:

- identity / policy / consent
- human approvals
- drift events
- traceability and replay

OpenAI’s own agent deployments reflect this principle: systems that request permission before sensitive actions, keep users in control, and constrain the agent’s operating environment. ([OpenAI agent tools](https://openai.com/index/new-tools-for-building-agents/), [OpenAI ChatGPT agent](https://openai.com/index/introducing-chatgpt-agent/))

This is not a temporary compromise.

It’s the product.

Trust design is how you move from novelty to delegation.

---

## The endgame: web twins and action models

Once you see the loop, the endgame becomes obvious.

If you run enough browser sessions, you stop seeing sessions.

You start seeing **patterns**.

Repeated actions. Repeated failures. Repeated drift. Repeated verification checks. Repeated approvals.

That repetition is the raw material for something bigger than “automation scripts.”

It’s the raw material for **web twins**: learned, organization-specific proxies that can operate the web the way your organization operates it.

DeepMind’s Project Mariner hints at this direction explicitly: once agents learn a task, they can replicate the workflow in the future with minimal input. ([DeepMind Project Mariner](https://deepmind.google/technologies/project-mariner/))

We can call this the UI → AX transition:

- UI is human experience
- AX is agent experience

The UX of the next decade will not just be designed for humans. It will be designed so agents can operate it reliably, with humans supervising where needed.

And as traces compound, you get the possibility of **action models**: narrow, execution-focused models trained not on internet text, but on successful task completions and verified workflows.

This is the “agent lab” part of Steel’s thesis.

Not because Steel wants to cosplay as a research lab.

But because the economics force a move up the stack:

1. Provide infra people pay for,
2. Capture traces + build evals (reliability becomes measurable),
3. Turn policies + action models into dependable outcomes.

That’s a compounding mechanism.

---

## Why I joined: the team, the taste, the pace

I first met the Steel founders and we clicked immediately. What was meant to be a simple meeting turned into two people passionately arguing for the same future.

It felt eerily familiar. I’ve learned to recognize that pivotal moment: the perfect storm before the story snaps into place.[^1]

After that first call, I joined Steel in a semi-formal advisory capacity, helping think through growth levers, positioning, and what the product wants to become. But the real signal wasn't the market; it was the **cadence**.

Daily standups. Weekly demos. Discord debates. The kind of engineering taste that’s hard to fake: **fast iteration without magical thinking.** A love for clean primitives. A refusal to lie to ourselves about the state of things.

Over the time before and through holidays I tried to take a step back for health, family, a bit of recovery. But the question wouldn't leave:

**What’s the cost of not joining?**

When the answer became “the cost is missing **the most important loop of the decade**,” the decision was already made.

I also made the decision under a constraint I can’t pretend isn’t real: I’m now effectively **locked in** for 2026. My job at Steel will be to help set up growth, team, and momentum. Not to dabble. That constraint is clarifying. It forces me to choose a thesis that can compound, not a project that needs constant reinvention.

---

## What I’m doing at Steel: growth as value flow

I’m joining Steel as a foundational growth lead, but I don’t mean “growth” in the vanity-metrics sense.

I’ve said it bluntly before: **growth is value flow, not dashboards.**

In the agent era, distribution is not “channels.” It’s **trust design + community + proof**.

Content shifts too: less keyword SEO, more ‘citation-worthiness.’ You win by becoming the thing agents and humans reference as the reliable path.

If you want the world to delegate work to software, you need:

- clear boundaries
- visible failure modes
- replayable traces
- measurable outcomes
- reliable curves

So the plan is not “market harder.”

The plan is to make Steel legible as the execution substrate for real agent work, and to build the ecosystem around it.

2026, for us, is not “the year of agent demos.”

It’s the year of **browser agent labs**: translating human UI into agent-operable workflows, and turning execution traces into compounding reliability.

---

## The punchline

Here’s the simplest version of my belief:

**The web won’t be replaced. It will be operated.**

Every legacy interface becomes an API once an agent can operate it reliably. Every workflow becomes programmable once you can trace it, verify it, and replay it.

Steel is an agent lab disguised as infrastructure because the fastest path to the lab is through the infrastructure.

And 2026 is the year we stop asking “do agents work?” and start asking the only question that matters:

**Who owns the loops that make them reliable?**

---

[^1]: Three years ago, I was invited to help turn around **[Codeanywhere](https://codeanywhere.com/)**. After a year of experiments, what appeared to be a struggling B2C CDE product was actually something different, an opportunity for a fresh new startup that became **[Daytona](https://daytona.io/)**. Today it has over 50k GitHub stars and a rapidly growing customer base.

