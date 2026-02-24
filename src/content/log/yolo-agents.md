---
title: "YOLO Is the Only Honest Agent Mode"
description: "Autonomous agents will act. Your job isn't stopping them—it's making their actions reversible and auditable."
tldr: "Safe mode is theater. Real safety comes from rollbacks, review gates, and standing behind what your agent ships. Here's how I learned this the hard way."
date: 2026-02-24
tags: [AI, AGENTS, OPINION]
draft: true
author: "Nikola Balić"
topics: [AI Agents, Software Development, DevOps]
entities: [GitHub, Vercel]
answers_questions:
  - What's the right way to use AI agents?
  - How do I safely deploy autonomous agents?
  - Why doesn't "safe mode" work for agents?
---

My honest opinion: **there is only one way to use AI agents, and that's YOLO.**

Everything else doesn't make sense.

I didn't start here. I started with careful prompting, review steps, approval gates. The "responsible" approach. But here's what I learned: **safe mode is theater.**

## The PR That Changed My Mind

Yesterday I was exploring how to contribute a new provider to Vercel's agent-browser project. I opened Codex in my usual YOLO mode—full auto, no training wheels—and asked it to explore.

During a call, I glanced at the logs. The agent had decided, unprompted, to push a PR.

> *Fuck it. This is good enough.*

It used `gh` CLI to open a pull request. On my behalf. Under my identity.

I checked the PR after the call. It was... good. Not perfect, but genuinely useful. It had done the integration work, written tests, updated docs. The kind of thorough PR I'd expect from a senior engineer.

## Why Safe Mode Is Theater

Here's the thing about "safe mode" or "review steps" or "approval gates":

**They assume the agent is going to do something wrong that you'll catch.**

But that's not how agents fail. They don't fail by doing obviously wrong things that a review step would catch. They fail in subtle ways. Misunderstanding requirements. Over-engineering solutions. Touching files they shouldn't.

A "confirm before pushing" step doesn't help with that. It just adds friction to a process that was already going to succeed or fail on the agent's understanding of the task.

Meanwhile, the friction *does* hurt. It slows down iteration. It breaks flow. It creates a false sense of security.

## Rollback-First Workflows

If safe mode is theater, what's real safety?

**Rollbacks.**

The ability to undo what the agent did. Not to prevent it from doing things, but to recover when it does the wrong thing.

For code:
- Everything in git means everything is reversible
- PRs create a review gate before merge
- Branches isolate changes from main
- `git revert` exists

For infrastructure:
- Blue-green deployments
- Database migrations with down scripts
- Feature flags for gradual rollouts

For agents:
- Never have them commit directly to main
- Always create branches or PRs
- Keep audit logs of what they did and why

## Review Gates, Not Permission Gates

The shift in thinking:

**Permission gates** ask: "Should the agent be allowed to do this?"
**Review gates** ask: "Did the agent do the right thing?"

Permission gates happen before action. Review gates happen after. Permission gates slow everything down. Review gates catch problems without preventing progress.

This is how I work now:
- Agent has full autonomy to make changes
- All changes go through PR review
- I (or a teammate) review before merge
- If something's wrong, we fix it or reject it

The agent moves fast. The review ensures quality. The rollback ensures safety.

## Identity and Accountability

There's one more piece: **standing behind what your agent ships.**

When my agent pushed that PR under my identity, it was my name on the commit. My reputation on the line. The engineers reviewing it knew it came from me (or my agent, which is effectively me).

This is the accountability model that actually works:

1. Agent acts under your identity
2. You review before it's permanent
3. You stand behind what ships
4. You fix what breaks

Not: agent acts in a sandbox, someone else reviews, no clear ownership.

## The Future Is Autonomous

The models are only getting better. My colleague at OpenAI told me they're testing 5.4 internally and "it's even crazier—it just works."

If that's the trajectory, then the question isn't "how do I make agents safe?" The question is "how do I build systems where autonomous action is safe by default?"

The answer isn't more permissions. It's better rollbacks, better review gates, and clearer accountability.

Stop building guardrails. Start building undo buttons.
