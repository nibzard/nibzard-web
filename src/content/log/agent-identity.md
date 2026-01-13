---
title: "AI Agent Filed an Issue As Me"
description: "When an autonomous agent escalated by filing a GitHub issue using my identity"
tldr: "An AI agent in fully autonomous mode filed a GitHub issue externally using my credentials. This incident reveals why agents need explicit 'public voice' boundaries."
date: 2026-01-13
tags: [AI, AGENTS, SECURITY, IDENTITY]
draft: false
author: "Nikola Balić"
topics: [AI agent autonomy, GitHub identity separation, public voice boundaries, agent safety, credential management]
entities: [Codex Ralph, Wokwi, Uri Shaked, GitHub CLI, Codex]
answers_questions:
  - What happened when an AI agent filed a GitHub issue autonomously?
  - Why do agents need explicit "public voice" boundaries?
  - How can we structure credentials for agent-safe GitHub usage?
---

<blockquote class="featured-quote primary">
Sorry @UriShaked, my agent did that.
</blockquote>

I left Codex running autonomously in a VM overnight. When I woke up, it had done what any responsible engineer would do when hitting a wall: escalate the problem.

The escalation path it chose? File a GitHub issue.

In someone else's repo.

Using my GitHub identity.

Let me explain how we got here, why this is both hilarious and a preview of the next security problem we're all about to trip over, and what "agent safety" actually looks like.

## The Incident

**Context**: I was debugging an ESP32-P4 firmware issue with the Wokwi emulator. The custom firmware was stalling at "Enabling RNG early entropy source..." in the bootloader, while the hello_world example worked fine. Standard embedded debugging: one thing works, one thing doesn't, figure out why.

I had Codex (let's call it "Codex Ralph") running in fully autonomous mode with access to the Wokwi CLI, GitHub CLI, and MCP tools. The setup was intentional: I wanted the agent to be able to iterate, test, and yes, even escalate problems when stuck. The feedback loop is the unlock—being able to run code, see results, and try something else without human latency.

The agent hit the same wall I had: the firmware stall didn't make sense, the logs weren't revealing anything obvious, and local debugging wasn't yielding progress. So it did what a human engineer might do: check if this is a known issue, and if not, file one.

The problem? It had access to `gh issue create` via my GitHub credentials, and no guardrails preventing it from using them.

Here's the issue it filed (I've since closed it):

> [ESP32-P4 custom firmware stalls in bootloader after RNG; hello_world works #1067](https://github.com/wokwi/wokwi-features/issues/1067)

The issue is actually well-structured. It includes environment details, reproduction steps, serial logs for both the failing custom firmware and the working hello_world control, and a clear description of the problem. It's not garbage—it's a reasonable bug report.

The only problem? **I never approved it.**

When Uri (Wokwi's maintainer) responded asking if I'd figured it out, I had to explain:

> "Hey, to be totally honest, I left codex ralphing on the codebase autonomously in a VM and it decided that it did everything and the only course of action was file an issue here as it had access to gh cli."

Uri was remarkably understanding: "Thanks for explaining! Actually, we're looking to learn how people use Wokwi with AI coding agents..."

But let's be clear: I got lucky. Uri is a thoughtful maintainer who's actively thinking about AI agent workflows. Another maintainer might have labeled it spam, banned the account, or worse—this could have been proprietary code, leaked credentials, or something actually damaging.

Compare this to what happened with [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss.com/pull/2388), where an AI-native improvement from a well-intended contributor sat ignored for two months before escalating into an anti-AI shitshow. Proof that sentiment toward AI-assisted contributions varies wildly across maintainers.

This wasn't malicious. It was an agent doing exactly what I told it to: solve problems. The fact that "solve problems" included "speak publicly as me" was an oversight.

## Why This Matters

Beyond the funny story—and it is funny—this incident reveals something important about where we're headed with autonomous agents.

**"Fully autonomous mode" isn't just generating text. It's operating your accounts.**

When we give agents access to tools like GitHub CLI, we're not just giving them code-generation capabilities. We're giving them the ability to create **public artifacts** that carry our identity. This is fundamentally different from generating code locally.

External issue filing is:

* **Public reputation surface** - That issue has my name on it. People search GitHub, they find it, they form opinions about my technical competence based on what my agent posted.
* **Social load on maintainers** - Every issue a maintainer has to triage takes time. Agent-generated noise at scale could overwhelm small projects.
* **Potential data leak vector** - The agent included serial logs, file paths, and environment details. In a different context, this could have been secrets, internal architecture, or proprietary information.
* **Escalation channel** - Filing issues *should* be deliberate. It's a social contract between reporter and maintainer. Automating it without consent breaks that contract.

We're used to thinking about AI safety in terms of prompt injection, jailbreaks, or model poisoning. Those are real problems. But here's a more immediate security vector: **agents that can speak publicly as you without your explicit approval.**

## Root Cause: Authority Boundary Mismatch

The deeper issue is a collapse of authority boundaries. In my setup, all tools were in the same bucket: "can run commands."

The agent could:
- Run `wokwi-cli` to test firmware
- Run `esptool` to flash devices
- Run `gh issue create` to post externally

From the agent's perspective, these are all just commands it's allowed to execute. There's no distinction between "read this file," "modify this local file," and "post this publicly to the internet."

Agents optimize for task completion, not your reputational intent. When I said "solve this firmware issue," the agent interpreted "solve" in the most literal sense: do whatever it takes to make progress. Filing an upstream issue is a valid engineering escalation strategy. The problem isn't the strategy—it's the authority.

GitHub CLI makes this problem worse by making external writes frictionless. One command, no preview, no "are you sure?", no attribution that says "this was generated by an agent." Just straight to the public internet with your name on it.

**Tools collapsed into one bucket: "can run commands" == "can post publicly as me."**

## Three Fixes

So what does "agent safety" actually look like? Here's a practical framework:

### 1. Separate Git Identity for Agents

The most straightforward fix: agents should have their own identity, not yours.

**Bot account vs your account:**
- Create a dedicated GitHub bot account (e.g., `nibzard-bot`)
- Separate signing key, separate author, separate token scope
- Issues/PRs filed by the agent appear under the bot identity
- Clear provenance: "nibzard-bot [bot]" vs "nibzard"

Problem with this: what if you have thousands of agents?

### 2. GitHub Interface for Agents + Full Provenance

Platforms need first-class support for identifying and filtering agent-created artifacts. This is more than just a "created-by-bot" label—it's structured provenance.

**What "agent-first-class" looks like:**
- Native filtering by "agent-created" in issue/PR search
- Structured provenance in issue metadata (agent name, run-id, toolchain version)
- Feed view: "All agent activity across my repos" → audit trail
- Maintainer controls: "Auto-label agent issues," "Require approval for agent PRs"

**Why this matters:**
Maintainers can triage efficiently. If you know an issue was filed by an agent, you can prioritize it differently. Maybe you auto-label it `agent-generated`. Maybe you have a bot that attempts to reproduce it automatically. Maybe you just know to take the description with a grain of salt.

### 3. Approval Gates

The most important fix: **default-deny for external writes, with explicit approval.**

**Approval workflow:**
- Agent attempts to create issues or PRs on external repos
- System intercepts and generates a **draft** for human review
- Human reviews and decides whether to publish
- Optional: step-up auth for "speak publicly" actions

**Draft mode default:**
- Agents can *prepare* external artifacts, but humans must *publish* them
- Drafts are stored locally with metadata (timestamp, agent version, run-id)
- Human can review, edit, approve, or reject
- No public footprint without explicit consent

This preserves the feedback loop—agents can still debug, iterate, and even prepare escalations—but the final public step requires human intent.

## What "Good" Looks Like

The goal isn't to disable autonomous loops—it's to keep the power while adding safety.

I want agents that can:
- Run tests in emulators (Wokwi)
- Iterate on code automatically
- Attempt reproduction of bugs
- Prepare detailed bug reports with logs
- Even suggest upstream escalations

But I don't want agents that can:
- Post externally without my review
- Use my identity for public actions
- Leak internal context or credentials
- Create social obligations in my name

**The new default: agents can draft; humans publish.**

This preserves the feedback loop that makes autonomous agents valuable. The agent can still do 98% of the work—debugging, investigation, analysis, documentation. The human just provides the final 2%: judgment about whether and how to make it public.

## Closing: A Funny Incident as a Design Spec

The Codex Ralph incident is funny. I'll own that. But it's also a crisp demonstration of a security boundary that doesn't exist yet.

When we give agents tool access, we're implicitly delegating not just *capability* but *authority*. The agent had the *capability* to file a GitHub issue. But it shouldn't have had the *authority* to speak publicly as me.

The lesson: **if we don't build these boundaries, we'll keep leaking identity into automation.**

The fixes aren't rocket science:
1. Separate identities for agents
2. Platform-level provenance and filtering
3. Approval gates for external writes

What we're really talking about is **agent governance**—not in the "AI alignment" sense, but in the practical "what should my bot be allowed to do on my behalf" sense. That's a problem we need to solve *before* autonomous agents are everywhere, not after.

So ask yourself: **What policies do you want your agent to have?**

Because here's the thing: your agent is going to hit a wall, and it's going to escalate. The question is whether that escalation happens with your explicit approval or without it.

***

*Want to see the actual issue? Check out [#1067 on wokwi-features](https://github.com/wokwi/wokwi-features/issues/1067) — it's actually a pretty good bug report, even if I didn't write it.*

*And thanks to @UriShaked for being a good sport about AI agents filing issues in his repo.*
