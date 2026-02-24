---
title: "Native AI CLI for Web Automation"
description: "Agent-friendly CLI design requires semantic refs, snapshot workflows, and repeatable commands—not just JSON output."
tldr: "I built steel-ai-cli as an experiment in agent-friendly CLI design. Here's what makes a CLI usable by agents—and what breaks in practice."
date: 2026-02-24
tags: [AI, CLI, TOOLS]
draft: true
author: "Nikola Balić"
topics: [CLI Design, Browser Automation, AI Agents]
entities: [Steel, Vercel, agent-browser]
answers_questions:
  - How do I design a CLI for AI agents?
  - What makes a CLI "agent-friendly"?
  - Why do screenshots fail for browser automation?
---

I've been obsessed with CLI design for agents. The AI-NATIVE principles I wrote about—structured output, deterministic exit codes, explicit sessions—those are the foundation.

But what does "agent-friendly" actually mean in practice?

I built [steel-ai-cli](https://github.com/steel-experiments/steel-ai-cli) to find out. It's a native AI CLI for browser automation. Here's what I learned.

## The Constraints

A CLI for agents has different constraints than a CLI for humans:

**No interactive prompts.** Agents can't answer "are you sure?" without breaking the flow.

**Deterministic output.** The same command should produce the same result structure, every time.

**Parseable formats.** JSON (or JSONL) is mandatory. Plain text is for debugging.

**Semantic references.** "Click the third button" is fragile. "Click button with id='submit'" is durable.

**Stateless by default.** Each command should be self-contained. Session state is opt-in, not required.

## Snapshot/Ref Workflow

The key insight from Vercel's agent-browser: **don't use screenshots for element identification.**

Screenshots are:
- Large (bandwidth overhead)
- Ambiguous (which pixel is "the button"?)
- Fragile (UI changes break them)
- Opaque (hard to debug when they fail)

Instead, use **text snapshots with semantic refs:**

```
$ steel snapshot
[1] <button id="search">Search</button>
[2] <input id="query" placeholder="Enter search...">
[3] <a href="/help">Help</a>

$ steel click 1
Clicked element [1]: button#search
```

The snapshot gives the agent a menu. The agent picks by ref number. No ambiguity, no OCR, no fragile selectors.

This is **repeatable.** The same page produces the same refs (in order). The agent can plan: "click 1, then type in 2, then click 1 again."

## What Breaks in Practice

**Dynamic content.** Pages that change between snapshots. The refs shift. The agent's plan becomes invalid.

Solution: Include stable identifiers in the snapshot. Even if order changes, the agent can find "button with id='search'".

**Authentication flows.** Browser automation often requires login. Handling OAuth, CAPTCHAs, MFA is complex.

Solution: Pre-authenticated sessions. The agent inherits a logged-in browser context.

**Rate limiting.** Agents can hammer APIs faster than humans. Sites notice and block.

Solution: Built-in rate limiting. The CLI enforces delays between requests.

**Error recovery.** When something fails, the agent needs enough context to retry intelligently.

Solution: Detailed error output. Not "command failed" but "element [5] not found; page may have changed. Run `snapshot` to refresh."

## The Design Principles

From building and using steel-ai-cli:

**1. Output should be self-documenting.** Every response includes enough context to understand what happened and what to do next.

**2. Errors should be actionable.** Include the specific failure, why it happened, and what command might fix it.

**3. Refs beat selectors.** Stable element references are more robust than CSS selectors or XPath.

**4. Sessions are explicit.** Start, resume, end. No implicit state that accumulates mysteriously.

**5. Commands are idempotent.** Running the same command twice should be safe (or at least detectable).

## Schemas and Verification

The next level: **output schemas.**

Each command declares what it will output. The CLI validates before returning. The agent knows exactly what shape to expect.

```json
{
  "command": "click",
  "args": {"ref": 1},
  "result": {
    "success": true,
    "element": "button#search",
    "action": "clicked",
    "page_changed": true
  }
}
```

This enables **verification harnesses.** The agent can:
- Parse the output with confidence
- Check for expected fields
- Detect unexpected changes
- Build retry logic around known failure modes

## What's Next

The current steel-ai-cli is an experiment. But the patterns are solid:

- Snapshot/ref for element interaction
- JSON output with stable schemas
- Explicit session management
- Actionable error messages
- Idempotent commands

These aren't specific to browser automation. They apply to any CLI that agents might use.

The future is agents executing commands we haven't written yet. The least we can do is make those commands usable.
