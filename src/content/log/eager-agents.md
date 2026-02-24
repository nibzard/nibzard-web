---
title: "Minimum Viable PR vs. Eager Agents: Stop Touching 10 Files"
description: "Agents over-deliver. They write tests, update docs, refactor nearby code—when all you wanted was a surgical fix."
tldr: "LLMs are eager by nature. Give them an inch, they'll take 10 files. Here's how to scope agent work and prevent PR bloat."
date: 2026-02-24
tags: [AI, AGENTS, WORKFLOW]
draft: true
author: "Nikola Balić"
topics: [AI Agents, Software Development, Code Review]
entities: [GitHub, Vercel, Claude]
answers_questions:
  - Why do AI agents touch too many files?
  - How do I scope agent changes to just what's needed?
  - What is a "minimum viable PR"?
---

Here's a phenomenon you'll recognize if you've worked with AI coding agents:

You ask for a small fix. The agent delivers a small fix... plus tests, plus documentation updates, plus some refactoring it noticed "would be nice," plus—

**Ten files changed.** When you needed one.

I saw this clearly when my agent pushed a PR to Vercel's agent-browser project. Comparing it to the three existing provider integrations, ours was notably more thorough. Tests. Docs. The works.

Was that better? Sort of. But it also wasn't what was asked for.

## Why LLMs Overreach

This isn't a bug. It's a feature of how language models work.

**They're eager.** Not in a malicious way, but in a "I want to be helpful" way. If you give an agent access to a codebase and ask it to solve a problem, it will solve *every related problem it can find.*

Different models have different personalities:
- Claude is famously eager
- Codex is a bit more reserved
- But at their core, they all want to "complete" the task

The problem is: **your definition of complete and the model's definition of complete are different.**

## Minimum Viable PR

What I wanted in that agent-browser case was a minimum viable PR:

- Add the Steel provider
- Make it work
- Stop

What I got was:
- Add the Steel provider
- Write tests for the provider
- Update documentation
- Improve some nearby code
- Add some helper functions "for consistency"

The other three integrations in that repo? They did the minimum. Tests and docs were added later by maintainers.

My agent did more work. But more work isn't always better work.

## Definition-of-Done Contracts

The fix isn't to make agents less eager. It's to give them clearer contracts.

A **definition-of-done contract** explicitly states:
- What files should be touched
- What files should NOT be touched
- What deliverables are required (code only? tests? docs?)
- What's out of scope

Example:

```
Task: Add Steel provider to agent-browser

Scope:
- Modify: src/providers/steel.ts (new file)
- Modify: src/providers/index.ts (register provider)

Deliverables:
- Working implementation only
- No tests (maintainers add those)
- No docs (maintainers add those)

Out of scope:
- Any other provider files
- README changes
- Type definition improvements
```

This is the kind of constraint that makes eager agents useful rather than overwhelming.

## Change Budgets

Another pattern: **change budgets.**

Instead of listing specific files, set limits:
- Maximum files changed: 3
- Maximum lines added: 100
- Maximum time spent: 10 minutes

The agent works within the budget. If it hits the limit, it surfaces what it accomplished and what's left.

This is harder to enforce technically but creates the right mental model: **agents work within constraints, not unlimited scope.**

## PR Scope Policy

For teams, this becomes a **PR scope policy:**

1. All agent-generated PRs must declare their scope upfront
2. PRs that exceed scope require explicit approval
3. "Scope creep" is flagged in review

This isn't about limiting agents. It's about making their work predictable. A 10-file PR is fine if you expected a 10-file PR. It's a problem when you expected a 1-file PR.

## The Hard Part

Here's the honest truth: **in software, everything is one-off.**

You're solving a specific problem that probably won't be repeated in the same shape. That makes it hard to have general policies.

The best you can do:
- Be explicit about scope when you prompt
- Review changes against scope before merging
- Give feedback to the agent (or adjust your prompts) when scope drifts

And remember: **an agent that touches 10 files when you asked for 1 is trying to help.** It's not being malicious. It just has a different definition of done than you do.

Your job is to align those definitions.
