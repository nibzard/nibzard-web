---
title: "What Makes a Great Coding Agent"
description: "10 principles that separate genuinely useful coding agents from flashy demos—and a north star spec for building them."
tldr: "The best coding agents aren't about smarter models. They're about harness design: minimal core, extension hooks, radical transparency, real sandboxing, session forking, and headless RPC."
date: 2026-02-25
tags: [AI, AGENTS, OPINION, TOOLS]
draft: false
author: "Nikola Balić"
topics: [AI Coding Agents, Developer Tools, Software Architecture, Agent Design]
entities: [Claude Code, Codex, Sourcegraph]
answers_questions:
  - What makes a coding agent genuinely great versus just flashy?
  - How should I design the architecture of an AI coding assistant?
  - What's the difference between permission gates and review gates for agent safety?
---

I've been working with AI coding agents non-stop for over a year now. After building hundreds of projects and watching the ecosystem explode, a pattern has emerged.

The agents that stick aren't the ones with the smartest models. They're the ones with the best *harness*.

Here's what actually matters.

## 1) Treat It as a Harness, Not Magic

The agent isn't special. The leverage is in three things:

**Good defaults.** A prompt that knows what it's doing, a tool set that covers the basics, and safety rails that prevent disaster without being annoying.

**Excellent UX for inspection and control.** You need to see what the agent is doing, pause it, redirect it, and understand *why* it made a choice. This is what I wrote about in [designing CLI tools for AI agents](/agent-ci)—the interface is the contract.

**Tight feedback loops.** Fast iteration, minimal friction between "I want this" and "here's the result." As I learned building [agent-friendly stacks](/agent-stack), the tools that survive are the ones that make iteration painless.

The magic isn't in the model. It's in the system around the model.

## 2) Make Customization First-Class (But Optional)

The winning pattern is **minimal core + extensions/hooks**.

Let users add "skills" without forking the whole project. I wrote about this in [unified skills](/unified-skills)—one source of truth for agent capabilities that works across different tools. No more drift between Claude skills and Codex skills.

Hooks at key stages matter: before and after tool calls, during planning, in summarization and compaction, when reading or writing memory, on errors, when formatting output. These hooks let power users customize behavior without forcing everyone else to care.

But here's the key: **avoid forcing features on everyone.** Subagents, plan mode, multi-file editing—these should be installable extensions, not mandatory complexity.

As I argued in [scaffolding is a tax](/scaffolding-tax), every layer of abstraction between your agent and the model becomes a liability when new models drop. Opinionated workflows age like wine. Agent frameworks age like milk.

## 3) Radical Transparency Beats "Trust Me" Guardrails

People love tools that show their work.

Show what files were read. Show what commands will run. Show tool call parameters. Show streaming output and thinking traces—at least in a developer-visible mode.

This isn't just about debugging. It's about trust. If users can't see what's happening, they'll distrust the tool—or feel like it's fighting them.

In [agents just need good --help](/agent-experience), I wrote about how AI agents succeed or fail based on your help text and output structure. The same principle applies to the agent itself: an agent that shows its reasoning builds confidence. One that hides behind "trust me" creates anxiety.

<blockquote class="featured-quote primary">
If users can't see what's happening, they'll distrust it—or feel it's fighting them.
</blockquote>

## 4) Security: Prompts Aren't a Sandbox

Permission popups degrade into muscle memory. Click enough "allow" dialogs and you stop reading them. That's not security—it's theater.

Better approaches assume **real sandboxing**: containers, VMs, bwrap, landlock. Technical boundaries that the agent literally cannot cross.

Route tool execution through a **policy layer**: allow/deny rules, audit logging, provenance tracking. But here's the distinction that matters—this is about *unrecoverable* harm prevention, not day-to-day permission gates.

For recoverable mistakes, use **review gates** instead. This is what I wrote about in [YOLO is the only honest agent mode](/yolo-agents): let the agent act, but require review before changes become permanent. PRs instead of direct commits. Rollbacks instead of prevention.

The design principle: **the agent should be incapable of causing unrecoverable harm, but free to make recoverable mistakes.**

Not "asked nicely not to exceed boundaries." *Incapable.*

## 5) Build for Branching Work, Not One Linear Chat

Coding work isn't linear. You try approach A, realize it won't work, roll back, try approach B. The best agents support this workflow natively.

**Session trees and checkpoints.** The ability to fork a session, explore in a branch, then merge back or discard.

**"Try A, roll back, try B" without losing project context.** You shouldn't have to re-explain the codebase every time you pivot.

**Isolated sub-sessions for exploration.** Spin off a side investigation, let it complete, then bring back only the relevant findings.

This is more useful than subagents for most workflows. Subagents are great for parallel execution, but session forking handles the more common case: serial exploration with backtracking.

I touched on this in [self-healing agents](/self-healing-agents)—the value of traces as a durable substrate. Your session history isn't just a log; it's the foundation for rollback and replay.

## 6) Planning Should Exist, But as a Workflow You Can Shape

Two good patterns exist:

**Plan artifact (PLAN.md / SPEC.md).** A document you iterate on with the agent. The plan lives in version control, evolves as you learn, and becomes part of the project's documentation.

**Planning as an extension.** A module that can enforce a protocol—"no edits until spec approved"—without being baked into the core.

The [agentic handbook](/agentic-handbook) covers Plan-Then-Execute extensively, and the lesson is clear: planning matters, but there's no single right way to do it.

Don't hard-code a single ideology. Some users want "always plan first." Others want "just do it, ask if you're stuck." Let the workflow shape the planning, not the other way around.

## 7) Tooling > Bigger Model (Surprisingly Often)

Agents feel "smart" when their tools are reliable, deterministic, and well-scoped. When they get structured tool results. When they have fast search, good repo navigation, clean diffs, and a responsive test runner.

A mediocre model with great tools often beats a great model with janky tools.

This is the core insight from [the agent-friendly stack](/agent-stack): winners won't be the most powerful tools. They'll be the most agent-friendly ones. Type safety becomes a communication protocol. Documentation becomes machine-readable contracts. The stack adapts to agents, not the other way around.

<blockquote class="featured-quote secondary">
Agents feel "smart" when their tools are reliable, deterministic, and well-scoped.
</blockquote>

## 8) Headless/RPC Mode Is a Superpower

If you want the "greatest" agent, it should work in three modes:

**Interactive TUI/GUI.** The normal human-facing interface.

**JSON-RPC over stdio.** For automation, IDEs, CI pipelines, and bots. This is how you build an ecosystem around your agent.

**Testable with dummy models / canned responses.** For extension testing and development without burning API credits.

This third mode is underrated. If you can't test your agent's tool integrations without calling OpenAI, you can't iterate fast enough. Mock the model, test the harness.

Headless mode is also how agents become infrastructure, not just tools. The agent that only works in a terminal is a dead end. The agent that speaks JSON-RPC is a platform.

## 9) Costs + ToS Reality Must Be Designed In

People care a lot about:

**Subscription vs API economics.** The $20/month subscription model breaks down when agents do real work. As I wrote in [what Sourcegraph learned](/ampcode), usage-based pricing isn't a bug—it's a feature. Agents that replace hours of human labor will cost real money.

**Provider ToS ambiguity.** Can you use the output commercially? Can you train on the interactions? What happens to your data? These questions matter for production use.

**Easy support for local/open models.** Not everyone wants to send their codebase to a cloud provider. The best agents make model swapping painless.

A great agent makes it easy to swap models mid-session and keeps costs visible. You shouldn't be surprised by your bill.

## 10) Default Toolset Should Be Small, Safe, and Sharp

Start tight:

- **Read/write/edit** with patch-style edits (not full file rewrites)
- **Search/ripgrep** for code navigation
- **Tests/build** for validation
- **Git status/diff/commit** (with review gates, not permission popups)

Then let people add web access, issue trackers, PR tools, deployment systems, and whatever else they need.

The [eager agents problem](/eager-agents) shows what happens when tools are too powerful: agents over-deliver, touching ten files when you needed one. A constrained default toolset prevents this. Expansion is opt-in.

Small, safe, sharp. Add complexity only when you need it.

## The North Star Spec

Here's the synthesis:

**Minimal core + extension hooks + radical transparency + real sandbox integration + session forking + headless RPC.**

Everything else is implementation detail. Model choice, UI preferences, specific tool integrations—these are downstream decisions. The architecture is what matters.

The agents that win won't be the smartest. They'll be the ones that best amplify human intent through disciplined design.

---

*Building [agent-native CLIs](/agent-ci) and watching the [AI coding agent ecosystem fracture into niches](/ai-coding-agents) taught me this: the fundamental unit of leverage isn't the model. It's the loop around the model. Design that loop well, and any model becomes useful. Design it poorly, and even GPT-7 won't save you.*
