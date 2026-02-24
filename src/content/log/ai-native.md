---
title: "The Hidden Users: Designing CLI Tools for AI Agents"
description: "Most 'AI-native' tools are built with AI features. But what about tools designed FOR AI agents to use? Here's the playbook."
tldr: "AI agents are now power users of your CLI tools. If you want them to succeed, you need structured output, deterministic exit codes, explicit sessions, and recovery primitives. Here's the complete checklist."
date: 2026-02-24
tags: [AI, AGENTS, TOOLS, DEVELOPER-EXPERIENCE]
draft: false
author: "Nikola Balić"
topics: [AI Agents, CLI Design, Developer Tools, Software Architecture]
entities: [Steel, Claude Code]
answers_questions:
  - What makes a CLI tool "AI-native"?
  - How should I design tools that AI agents will use?
  - What output format works best for AI agents?
  - How do I make my tools recoverable for automated systems?
---

When you run `claude code` or use Cursor's agent mode or any of the growing fleet of AI coding assistants, those agents aren't just chatting with you. They're executing commands, parsing output, making decisions, and retrying when things fail.

And most of our tools? They're designed for humans.

## The Problem with "Hooray!"

You know that moment when a CLI tool succeeds and prints something like:

```
✓ Deployment successful!
Your app is now live at https://myapp.example.com
```

Great for humans. Terrible for agents.

An AI agent sees that and thinks: *Okay, but did it work? What's the machine-readable status? Can I parse that URL reliably? What if the format changes next version?*

This is the core insight behind AI-native tool design: **agents shouldn't have to infer state from prose**.

<blockquote class="featured-quote primary">
    The "API" an agent uses is the command surface + help text + output shapes + exit codes.
</blockquote>

## The Nine Principles

I've [written before about agent experience](/agent-experience)—the idea that AI agents need tools designed for them, not just humans. These principles crystallize that thinking into something actionable. Here's the distilled version:

### 1. Treat Interfaces as Contracts

Your `--help` text isn't documentation. It's a **contract**.

Include everything an agent needs: usage, args, flags, examples, output modes, and exit codes. Make it explicit and complete. Version it and keep it stable.

### 2. Default to Structured Output

Make JSON the default, or at least ensure `--json` works everywhere.

Better yet, use a **single envelope shape** across all commands:

```json
{
  "schema_version": "1.0",
  "command": "deploy",
  "status": "succeeded",
  "run_id": "abc123",
  "data": { ... },
  "errors": [],
  "warnings": [],
  "metrics": { ... }
}
```

Now the agent writes one parser. One. Every command follows the same shape.

### 3. Make Success/Failure Unambiguous

Agents need reliable stopping conditions and branching logic.

Every failure should include:
- **Error class**: input? auth? network? session?
- **Error code**: machine-readable identifier
- **Retryable**: true or false
- **Hint**: bounded guidance on what to try next

Not "something went wrong." But *what* went wrong, *why*, and *what to do about it*.

### 4. Design for Recovery, Not Perfection

Agents are iterative systems. Your tool should make retries cheap and safe.

- Add **idempotency keys** so the same operation can run twice safely
- Support **bounded retries** with `--max-retries` and `--timeout-ms`
- Split **validate** from **run** (`task validate` vs `task run`)
- Provide **diagnose and replay** primitives

That last one is underrated. A `doctor` command that gives deterministic remediation suggestions. A `replay` command that lets you reproduce failure at a specific step.

### 5. Make State Explicit

Hidden state causes agent confusion.

Support clear session policies: `ephemeral`, `sticky`, `resume`. Always emit `session_id` when sessions are used. Make lifecycle operations idempotent. Surface expiry and conflicts as typed errors.

### 6. Provide Strictness and Escape Hatches

Agents need guarantees in production and flexibility in exploration.

Offer `--strict` to prevent silent fallbacks and enforce schema completeness. Keep a low-level escape hatch for edge cases, but ensure the agent path is still contract-driven.

### 7. Minimize Context Pollution

Every unnecessary token in help text or output competes with the agent's reasoning capacity.

- Keep `--help` concise but complete
- Avoid spinners, progress bars, and chatty narratives in machine modes
- Use line-delimited events (`--output jsonl`) for streaming

### 8. Avoid Interaction Traps

Agents break on anything that assumes a human at a terminal.

- No mandatory prompts; provide `--yes`, `--non-interactive`
- Avoid browser/OAuth redirects as primary auth; offer token/key flows
- Don't make help vary based on environment in surprising ways

### 9. Measure the Right Outcomes

"AI-native" should be validated with agent benchmarks, not vibes.

Track:
- Commands per successful task
- Schema-valid output rate
- Session churn
- Automatic recovery rate on retryable errors

## The Practical Checklist

If you implement only these, you get most of the benefit:

1. **Complete `--help`**: usage + args/flags + examples + output modes + exit codes
2. **`--output json`** (or default JSON) with a versioned envelope
3. **Deterministic exit codes** + `retryable` field + bounded hints
4. **Split validate/run**, add `doctor`/`replay` equivalents
5. **Explicit session policy** + idempotency + timeouts
6. **Non-interactive by default** in agent mode (`--yes`, no spinners)

The synthesis: **clarity + structure + determinism + recovery**.

## Why This Matters Now

I've been working with AI coding agents non-stop extensively for the last 12 months, and I notice the friction points. The commands that work beautifully from a human terminal but confuse an agent. The tools that require interactive prompts. The outputs that need natural language parsing to extract meaning.

The tools that *do* work well with agents feel almost boring. Predictable. Reliable. They give you the same envelope shape every time. They tell you exactly what went wrong. They make it easy to retry.

Here's the thing: **AI agents are becoming power users of your tools**.

Not as a future prediction. Right now. Today. Every time someone runs an AI assistant to execute commands, that's an agent using your interface.

The question isn't whether to design for agents. The question is whether you'll do it intentionally or discover the friction points one confusing output at a time.

## A Mental Model

Think of it this way:

**Human users want delight.** Clear explanations, helpful hints, friendly messages, progress indicators.

**Agent users want contracts.** Structured output, unambiguous status, deterministic behavior, recovery paths.

You can support both. `--output text` for humans, `--output json` for agents. `--help` that works for both. Non-interactive defaults with interactive options.

But the agent path has to be first-class. Not an afterthought. Not a hack.

Because agents don't complain. They just fail silently, retry uselessly, or hallucinate workarounds.

And that's worse.

## Putting It Into Practice

I'm building [agentprobe](https://github.com/nibzard/agentprobe) to test CLI tools exactly this way—by having agents use them and measuring what works. If you're curious about how your tools perform under agent load, that's the place to start.
