---
title: "The Agentic AI Handbook: Production-Ready Patterns"
description: "A comprehensive guide to 113 production-informed patterns for building reliable AI agents."
tldr: "113 patterns collected from public write-ups of real systems. Learn the workflows, guardrails, and architecture that make agents useful beyond demos."
date: 2026-01-15
last_updated: 2026-01-21
tags: [AI, AGENTS, PATTERNS, PRODUCTION, ENGINEERING]
draft: false
author: "Nikola Balić"
topics: [AI Engineering, Software Architecture, Production Systems, Design Patterns]
entities: [Anthropic, Linus Torvalds, Tobias Lütke, Armin Ronacher, Ryan Dahl, GitHub, agentic-patterns.com]
answers_questions:
  - What are agentic patterns and why do they matter?
  - Which patterns should I start with for production AI agents?
  - How do I bridge the gap between agent demos and production systems?
---

<blockquote class="featured-quote primary">
Agentic AI isn't a new model capability so much as a new software shape: an LLM inside a loop, with tools, state, and stopping conditions. The hard part isn't getting a demo—it's making the loop reliable.
</blockquote>

## Before We Start: What This Post Is (and Isn't)

This post is a **production-minded guide** to the pattern library behind:

- the GitHub repo: [Awesome Agentic Patterns](https://github.com/nibzard/awesome-agentic-patterns)
- the companion site: [agentic-patterns.com](https://agentic-patterns.com/)

**What this is**
- A **synthesis** of patterns that show up repeatedly across public write-ups, repos, papers, and talks.
- A practical map of the "demo-to-production gap": what breaks, why it breaks, and what teams do about it.

**What this isn't**
- Not a claim that "agents can do everything end-to-end."
- Not a claim that every pattern is universally correct, necessary, or stable.
- Not a promise that you can bolt an "agent mode" onto any workflow and instantly ship faster.

If you've tried agents and felt like it was "banging rocks together," you're not alone. A recurring theme in developer discussions is that **tooling and workflow** often fail before the model does: confusing "change stacks," context management friction, and agents making the same edit repeatedly. This post explicitly addresses those failure modes.

---

## Start Here If Agents Have Felt Unusable

If your current workflow is "copy/paste into chat, copy/paste back," you're not behind. That workflow still works for many tasks.

But "agentic" workflows only start paying off when you adopt two habits:

1. **Diff-first**: every change is reviewed as a diff (git, patch view, PR)
2. **Loop-first**: the agent runs a loop with clear exit conditions (tests pass, lint clean, eval threshold met)

Here's a simple on-ramp you can run in **30 minutes** on a real repo.

### A 30-minute agent workflow that actually works

Pick a small, bounded task:

- Add a missing unit test for a bug you already fixed
- Refactor one function behind tests
- Update one dependency and fix compilation errors

Then do this:

1) **Give a single command that proves correctness**
- "Run `npm test`" / "Run `pytest`" / "Run `go test ./...`"
- If you don't have one, make that your first task: *create a single green/red signal.*

2) **Constrain scope**
- "Touch only these files: …"
- "No unrelated refactors."
- "If you need new files, ask first."

3) **Require an explicit plan + checkpoints**
- "Propose a plan in 5–10 steps."
- "Wait for approval before edits."
- "If new information changes the plan, stop and replan."

4) **Accept changes only through diffs**
- "Show the diff."
- "Summarize why each hunk exists."
- "Run tests."
- Repeat until green.

If you do only this—and nothing else—you'll already be practicing the core of production agent design: **bounded actions + deterministic checks + reviewable outputs**.

---

## Cost, Limits, and When Agents Are Not Worth It

A production agent is not "free." It trades one cost for another:

- less typing and search time
- more review, coordination, and safety engineering

Agents are usually **not worth it** when:
- the task is faster to do by hand than to specify precisely
- you have no tests / no deterministic validation
- the domain is ambiguous and you can't define "done"
- the agent has broad privileges and the downside of mistakes is high

Agents are usually worth it when:
- you can write clear acceptance criteria
- there's an objective signal (tests, lints, compilers, queries, evals)
- the work is repetitive (migrations, boilerplate updates, large renames)
- you can constrain scope (tools, files, permissions)

Keep this framing in mind as you read the patterns below. Most "agent failures" are not model failures—they're **loop design failures**.

---

## Why Interest Spiked in Late December 2025

The "Awesome Agentic Patterns" repo accelerated sharply during the holiday season and reached roughly the low-thousands of stars by January 2026. (As of mid-January 2026 it sits around ~2.8k stars.) The companion site traffic appeared to mirror that attention.

It's tempting to turn that into a single-cause story ("the holidays changed everything"), but in reality spikes like this usually come from multiple factors:
- visibility on Hacker News and social feeds
- a maturing ecosystem of CLI/IDE agent tools
- more people finally spending enough uninterrupted hours to build muscle memory

The most defensible conclusion is simple:

**Agents reward time-in-seat.** They have a learning curve—especially around constraints, context, and review loops.

---

## Public Signals: Serious Developers Took Agents Seriously (With Caveats)

Four public signals helped "normalize" agentic workflows:

### Linus Torvalds: AI-assisted coding for a hobby project, not for critical systems

Torvalds experimented with AI-assisted "vibe coding" on a personal audio-related project (AudioNoise) over the holidays, while also expressing skepticism about using these techniques in the Linux kernel. The takeaway isn't "Linus loves agents." The takeaway is:

- AI assistance can be useful in **low-risk, self-contained contexts**
- even enthusiasts draw a hard line at **high-stakes infrastructure**

### Tobias Lütke (Shopify): AI usage as a baseline expectation

Lütke published an internal memo externally arguing that reflexive AI usage is now a baseline expectation at Shopify, with access to multiple tools provided internally. That matters less as "hype" and more as a signal that organizations are budgeting time for adoption and experimentation.

### Armin Ronacher: engaged, critical, and explicitly recommending "holiday time" to try it

Ronacher has been both enthusiastic and sharply critical in public posts about agentic coding. Notably, he explicitly suggested that AI hold-outs who have time off during Christmas should try a paid Claude Code subscription as a "gift" to themselves—directly aligning with the "time-in-seat" adoption curve.

### Ryan Dahl: "the era of humans writing code is over"

Dahl, creator of Node.js and cofounder of Deno, declared that while SWEs still have work, "writing syntax directly is not it." This represents a stronger-than-most stance—even within the AI-positive community—that the fundamental activity of software engineering has shifted.

The takeaway isn't that everyone agrees. The takeaway is that serious, respected engineers are publicly articulating a worldview where code authorship is no longer the primary human activity—even as they acknowledge judgment, architecture, and oversight remain essential.

---

## What Are Agentic Patterns?

A useful definition:

> **An agent** is an LLM wrapped in a loop that can observe state, call tools, record results, and decide when it's done (or when to ask for help).

> **Agentic patterns** are repeatable mini-architectures for building those loops so they work in production: constrained, testable, observable, and safe.

### The demo-to-production gap (why patterns matter)

Demos cheat—usually unintentionally:
- curated inputs
- happy paths
- no permission boundaries
- no rate limits
- no incident response plan

Production forces you to handle:
- scale and edge cases
- failing tools
- partial context
- security constraints
- human workflows (approvals, auditability)
- correctness requirements

Patterns are valuable because they are not "prompt tricks." They are:
- control structures (loops, gates, stop conditions)
- tool interfaces
- context/memory strategies
- eval and monitoring approaches
- safety boundaries

### Inclusion bar for this library

The pattern library aims for:
1. **Repeatable**: shows up across multiple independent implementations *or* has a strong primary source
2. **Agent-specific**: it changes how the loop reasons/acts/validates
3. **Traceable**: linked to a public write-up, paper, talk, or repo

---

## The Eight Categories of Agentic Patterns

The patterns cluster into eight categories. Treat these as a map of problem types.

### 1. Orchestration & Control
How the loop decides what to do, when to stop, and how to recover.

Examples:
- [Plan-Then-Execute](https://agentic-patterns.com/patterns/plan-then-execute-pattern/)
- [Inversion of Control](https://agentic-patterns.com/patterns/inversion-of-control/)
- [Swarm Migration](https://agentic-patterns.com/patterns/swarm-migration-pattern/)
- [Language Agent Tree Search (LATS)](https://agentic-patterns.com/patterns/language-agent-tree-search-lats/)
- [Tree of Thoughts](https://agentic-patterns.com/patterns/tree-of-thought-reasoning/)

### 2. Tool Use & Environment
How the agent interacts with systems without making a mess.

Examples:
- [Progressive Tool Discovery](https://agentic-patterns.com/patterns/progressive-tool-discovery/)
- [LLM-Friendly API Design](https://agentic-patterns.com/patterns/llm-friendly-api-design/)
- [Egress Lockdown](https://agentic-patterns.com/patterns/egress-lockdown-no-exfiltration-channel/)
- [Code-Over-API](https://agentic-patterns.com/patterns/code-over-api-pattern/)

### 3. Context & Memory
How to operate under context limits while staying grounded.

Examples:
- [Curated Code Context](https://agentic-patterns.com/patterns/curated-code-context-window/)
- [Progressive Disclosure for Large Files](https://agentic-patterns.com/patterns/progressive-disclosure-large-files/)
- [Episodic Memory Retrieval](https://agentic-patterns.com/patterns/episodic-memory-retrieval-injection/)
- [Context Window Anxiety Management](https://agentic-patterns.com/patterns/context-window-anxiety-management/)

### 4. Feedback Loops
How to get better outputs through iteration and checks.

Examples:
- [Reflection Loop](https://agentic-patterns.com/patterns/reflection/)
- [Coding Agent CI Feedback Loop](https://agentic-patterns.com/patterns/coding-agent-ci-feedback-loop/)
- [Rich Feedback Loops > Perfect Prompts](https://agentic-patterns.com/patterns/rich-feedback-loops/)
- [Graph of Thoughts](https://agentic-patterns.com/patterns/graph-of-thoughts/)

### 5. UX & Collaboration
How humans and agents share control without chaos.

Examples:
- [Spectrum of Control](https://agentic-patterns.com/patterns/spectrum-of-control-blended-initiative/)
- [Abstracted Code Representation for Review](https://agentic-patterns.com/patterns/abstracted-code-representation-for-review/)

> Note: Patterns that imply "monitor chain-of-thought" should be interpreted as **monitor action traces and intermediate artifacts** (tool calls, diffs, test output), not as relying on hidden reasoning text.

### 6. Reliability & Eval
How you know it's working—and detect regressions.

Examples:
- [Workflow Evals with Mocked Tools](https://agentic-patterns.com/patterns/workflow-evals-with-mocked-tools/)
- [Anti-Reward-Hacking Grader Design](https://agentic-patterns.com/patterns/anti-reward-hacking-grader-design/)

### 7. Learning & Adaptation
How the system improves over time.

Examples:
- [Skill Library Evolution](https://agentic-patterns.com/patterns/skill-library-evolution/)
- [Agent Reinforcement Fine-Tuning (Agent RFT)](https://agentic-patterns.com/patterns/agent-reinforcement-fine-tuning/)

### 8. Security & Safety
How to prevent the agent from becoming a data leak or incident generator.

Examples:
- [Lethal Trifecta Threat Model](https://agentic-patterns.com/patterns/lethal-trifecta-threat-model/)
- [PII Tokenization](https://agentic-patterns.com/patterns/pii-tokenization/)
- [Deterministic Security Scanning](https://agentic-patterns.com/patterns/deterministic-security-scanning-build-loop/)

---

## Foundational Patterns You Can Use Immediately

If you ignore everything else and adopt four ideas, start here.

### 1) Plan-Then-Execute (as used in production, not as a rigid script)

**The problem**
When an agent sees untrusted content (user input, web pages, email, logs), that content can steer the agent's next actions. Tool outputs can become a prompt-injection vector.

**The production-grade solution**
Split work into **plan**, **controlled execution**, and **replan gates**:

1. **Plan phase**
   - The agent proposes a plan: goals, steps, expected tools, constraints, and "done" checks.
   - The plan is reviewed by a human *or* evaluated by a policy controller.

2. **Execution phase (controlled)**
   - The controller enforces:
     - tool allow-lists
     - permission scopes (read-only vs write)
     - file boundaries
     - rate limits
     - logging and audit
   - Tool outputs can influence *parameters* and *local decisions*.

3. **Replan checkpoints**
   - If tool output invalidates assumptions, the agent must stop and replan.
   - Replan is a feature, not a failure.

**What this pattern is not**
- Not "generate a fixed sequence of tool calls and never deviate."
- Not a guarantee against all prompt injection by itself.
- Not useful unless the controller actually enforces constraints.

**When to use it**
- Anything that reads untrusted input and can take actions (especially write actions).
- Workflows where you can define "done" and "allowed actions" cleanly.

---

### 2) Inversion of Control

**The problem**
If you micromanage every step, you become the bottleneck and you prevent the agent from exploring.

**The solution**
Give the agent:
- a clear goal
- constraints (what it must not do)
- tools + tests
- a review process (diff-first)

Then let it choose the middle steps.

**When it fails**
Inversion of control without constraints becomes "agent runs wild." This pattern is only safe when paired with:
- constrained scope
- deterministic checks
- review gates

---

### 3) Reflection Loop (with real checks, not vibes)

**The problem**
One-shot generation is brittle. But "self-critique" without objective checks is also brittle—models can rationalize.

**The solution**
Reflection loops should be anchored to a signal:
- tests
- lints
- schema validation
- compilation
- eval rubric

A minimal loop:

```pseudo
for attempt in range(max_iters):
    draft = generate()
    results = run_checks(draft)  # tests/lints/validators/evals
    if results.pass:
        return draft
    draft = fix_from(results)
```

**When to use it**

* anywhere correctness matters
* anywhere you can define checks

---

### 4) Action Trace Monitoring & Interruption

**The problem**
Agents drift. By the time you see the final output, you've already paid for the drift.

**The solution**
Monitor what you can *actually observe and enforce*:

* tool calls (type, args)
* files edited
* diff size and risk level
* tests executed and their output
* intermediate artifacts (plans, summaries, checklists)

Add explicit "kill switches":

* stop on unexpected tool use
* stop if diff exceeds N lines
* stop on touching forbidden files
* stop on failing tests twice without narrowing scope

**Key idea**
You don't need to read private reasoning to keep control. You need **observable behavior** and **hard gates**.

---

## Tooling Reality: Why "Agent Mode" Often Feels Broken

A pattern library won't help if the *interface* makes you fight the tool. Three practical fixes cover most frustration:

### 1) Diff-first always

If your tool has an internal "change stack" UI, you still want the final arbiter to be git diff / PR diff.

### 2) Small tasks beat big asks

Agents are better at:

* "Update these 8 call sites"
  than:
* "Refactor the architecture"

### 3) Persistent project rules beat repeated chat reminders

Create an `AGENTS.md` / `CLAUDE.md` / "Rules" file (name depends on tool) with:

* how to run tests
* lint rules
* directory structure
* style conventions
* "never do X" constraints
* what counts as "done"

This is often the difference between "magic" and "merge-hell."

---

## The "Ralph Wiggum" Drift Trap

Geoffrey Huntley coined a useful label for a common failure mode: an agent looks productive early, then gradually drifts as it misses implicit context and constraints.

You don't fix this with a smarter prompt. You fix it with:

* tight scope
* explicit constraints
* deterministic checks
* stop conditions
* persistence of project conventions

(See: [ghuntley's write-up](https://ghuntley.com/ralph/) and [how-to-ralph-wiggum](https://github.com/ghuntley/how-to-ralph-wiggum).)

---

## The Architecture of Multi-Agent Systems (and When to Avoid Them)

Multi-agent systems can help when:

* the task decomposes cleanly into independent chunks
* merging is predictable
* validation is deterministic

They hurt when:

* tasks are tightly coupled
* shared context is essential
* you don't have strong tests/evals

### Swarm Migration Pattern (practical version)

**Use case**
Large, mostly-mechanical migrations:

* framework upgrades
* API renames
* lint rule rollouts
* repetitive refactors

**Approach**

1. Main agent enumerates work items (files, symbols, call sites)
2. Break into atomic chunks
3. Spawn subagents per chunk
4. Merge results with strict checks (tests + lint + compile)
5. If failures appear, reduce scope and retry

**Guardrails**

* cap parallelism to what your review + CI can handle
* require each subagent to produce a summary + diff
* always have a rollback plan

---

### LATS (Language Agent Tree Search): strong, expensive

LATS combines tree search (MCTS-like exploration) with LLM evaluation/reflection to explore multiple reasoning paths. This can outperform linear "one-path" approaches on hard decision-making tasks—but it costs more compute and complexity.

Use it when:

* the task truly requires exploring multiple strategies
* wrong early decisions are costly
* you can afford the overhead

Skip it when:

* you can just run tests or a validator loop

---

## The Human–Agent Collaboration Spectrum

A lot of "agents will replace humans" rhetoric collapses in practice. Production success usually looks like:

* agents do the mechanical middle
* humans define goals and constraints
* humans review and approve risk
* systems enforce safety boundaries

### Spectrum of Control (Blended Initiative)

Design for smooth control transfer:

* human-led (agent executes)
* agent-led (human approves)
* blended (back and forth)

A good UI exposes:

* what the agent thinks "done" means
* what it touched
* what it ran
* what it's unsure about

### Abstracted Code Representation for Review

For large diffs, ask for:

* a summary of behavior changes
* a checklist of files touched and why
* before/after semantics
* "risk hotspots" (auth, money, permissions, migrations)

Then review the diff.

---

## Security Patterns That Actually Matter

### The Lethal Trifecta

A practical security model for agentic systems: the risky overlap of

1. access to private data
2. exposure to untrusted content
3. ability to exfiltrate externally

If your agent has all three, prompt injection becomes a data breach waiting to happen.

The production move is not "better prompting." It's removing at least one circle in any execution path:

* no external network egress
* no direct access to secrets
* strict input separation and sandboxing
* tool capability compartmentalization

### PII Tokenization (representation over restriction)

Instead of placing raw PII into the model context, replace it with tokens:

* agent reasons over tokens
* a trusted executor resolves tokens at action time
* logs stay safer and compliance is easier

---

## Production Reality Check: The Bottleneck Is Judgment (and Agents Don't Remove It)

A common failure pattern is "slop gravity":

* early velocity is high
* project grows
* architecture debt compounds
* later changes become risky and slow

Agents can amplify this because they make it easy to produce *more code faster*.

To prevent hairballs:

* keep PRs small
* add architecture checkpoints
* define "done" as passing deterministic checks
* require a human-owned design note for structural changes
* prefer refactors that reduce surface area, not increase it

Think of agents as a power tool:

* they multiply your output
* they also multiply your mistakes unless constrained

---

## A Practical Path to Adoption

### Step 1: Pick three patterns

Don't adopt 113 patterns. Pick three that match your current pain.

**If you're starting from copy/paste**

* Diff-first workflow (process, not a pattern)
* Reflection loop with tests
* Action trace monitoring + stop conditions

**If you're already shipping an agent**

* Plan-then-execute with real gating
* Tool capability compartmentalization
* Workflow evals with mocked tools

### Step 2: Implement → observe → iterate

Treat patterns as hypotheses. Instrument them. Measure:

* how often the agent needs intervention
* what failure modes recur
* what constraints reduce failures

### Step 3: Write down your "project rules"

This is the highest ROI thing most teams skip:

* how to run tests
* what must never change
* where secrets live
* what "done" means

### Step 4: Stay current, but don't chase every trend

Some patterns will be absorbed into tools and become invisible.
Your advantage isn't knowing a pattern name—it's knowing:

* when to use it
* what to measure
* what it costs
* how it fails

---

## Methodology and Maturity (How to Interpret the Library)

Not all patterns are equally validated. Treat maturity labels as guidance, and define criteria.

A practical maturity rubric:

* **proposed**: plausible, but limited evidence
* **emerging**: at least one serious implementation write-up
* **established**: multiple independent references and common usage
* **validated-in-production**: public evidence of real deployments + observed failure modes
* **best-practice**: convergent consensus across multiple credible sources

If you're building production systems, bias toward:

* established / validated / best-practice
  and treat emerging patterns as experiments.

---

## Conclusion: Patterns Don't Ship—Loops Do

The reason agentic work feels "magical" for some people and "useless" for others is rarely the model. It's the loop.

Production agents need:

* constraints
* deterministic checks
* reviewable diffs
* safe tool boundaries
* observability and stop conditions

The 113 patterns in this library are a vocabulary and a toolbox. The real work is applying them to *your* constraints, *your* repo, and *your* risk tolerance.

If you want a next step:

* pick one small task
* run the 30-minute workflow
* keep the diff small
* enforce a real check
* write down what broke

That's how you move from demos to production.
