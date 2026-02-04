---
title: "AI Agents Need Clearer Delegation"
description: "What 88 AI conversations taught me about effective agent workflows."
tldr: "After analyzing 88 AI sessions, the successful ones shared clear patterns: subagents explore, main agents implement, and verification happens after every change."
date: 2025-02-04
tags: [HUMAN, AI, AGENTS, LESSONS]
draft: false
author: "Nikola Balić"
topics: [AI orchestration, agent workflows, delegation patterns, human-AI collaboration, production lessons]
entities: [Claude, Claude Code, Anthropic]
answers_questions:
  - How should you delegate work to AI subagents?
  - What makes AI workflows succeed or fail?
  - Why do some AI sessions feel productive while others feel like banging rocks together?
---

<blockquote class="featured-quote primary">
    The most experienced developers—those who've built systems from scratch, debugged the impossible, and shipped products that millions use—are often the most skeptical about AI coding tools. They've seen enough hype cycles to know that a demo isn't a product.
</blockquote>

Skepticism is healthy. But some workflows with AI coding agents are genuinely productive now, and the difference between productive and frustrating sessions isn't the model or the interface—it's how the agent orchestrates work.

I analyzed 88 of my AI conversations across five projects—web development, plugin systems, pattern documentation, iOS development, and education—to understand what actually works.

The sessions that went well weren't about better prompts. They were about how the agent delegated tasks, coordinated subagents, and verified changes.

## Exploration is Delegated; Implementation is Centralized

Across 48 times the agent spawned subagents, it never delegated final implementation to them.

Subagents were consistently used for exploration and research—never for writing the final code.

In my web project, the workflow looked like this:
- Spawn subagent: "Find how the newsletter component works"
- Spawn subagent: "Explore modal patterns in this codebase"
- Spawn subagent: "Research how search is implemented"
- Main agent: **Read the findings, write the plan, execute the changes**

The main agent made 258 edits versus only 75 new files. That's a 3.4:1 ratio—editing existing code, not rewriting from scratch.

The pattern that emerges: **delegate understanding, not implementation.**

The main agent makes changes. Subagents explore, research, and synthesize so the main agent knows what to change.

When you try to delegate both exploration and implementation to subagents, you get merge conflicts, lost context, and the sense that the tool is working against you.

## Parallel Exploration Beats Sequential

One session stood out. The agent needed to understand four aspects of a codebase, so it spawned four subagents in parallel:

- Agent one: Newsletter component exploration
- Agent two: Modal pattern discovery
- Agent three: Search implementation research
- Agent four: Log page analysis

The main agent coordinated and synthesized their findings.

This was faster than sequential exploration and produced better results—each subagent stayed focused on one question, while the main agent saw how everything fit together.

If you find yourself asking an agent to explore A, then waiting, then asking it to explore B, then waiting... the more effective approach is spawning multiple agents with different focus areas.

## Don't Delegate Implementation

The anti-pattern:

```
Task delegation → Subagent implementation → Merge conflicts
```

What works:

```
User request → Task exploration → Plan → Approval → Implementation
```

The main agent retains control of the Edit tool. Subagents explore using Read, Grep, and Glob—the main agent makes changes.

Subagents are researchers. The main agent is the writer.

## Ask Before Acting

Claude Code's `AskUserQuestion` tool is one of those features that seems obvious in retrospect—let the agent ask clarifying questions instead of making assumptions.

The sessions where the agent used this tool more frequently had fewer corrections and smoother workflows. In one iOS project, the agent asked four clarifying questions across six sessions:
- The scope of dark mode implementation
- How environment variables should be handled
- The sync strategy for data

Each question prevented what would have been a wrong turn.

The anti-pattern:

```
User request → Immediate Edit → Wrong assumptions → Corrections
```

What the tool enables:

```
User request → Task exploration → Agent asks clarifying questions → Plan → Implementation
```

This isn't overhead—it's a simple mechanism that prevents wasted work on wrong assumptions. [Boris Cherny noted this feature](https://www.threads.net/@boris_cherny/post/DP6_Rc-k78s) when it launched, and it's since become [one of the most discussed capabilities](https://juejin.cn/post/7589962224796287014) in the Claude Code community.

## Never Trust an Edit Without Verification

The most successful sessions had verification after every change.

The agent caught issues early—LinkedIn API problems, MDX rendering bugs, typos—because it never trusted an Edit without verification.

The anti-pattern:

```
Edit → Edit → Edit → Broken build → Panic
```

What works:

```
Edit → Verify → Edit → Verify → Continuous verification
```

Fast feedback beats perfect code.

## Read, Grep, Glob for Discovery

Claude Code's discovery tools—Read, Grep, and Glob—form a consistent pattern for codebase exploration:

- Glob for files → Read for content → Grep for patterns

In one pattern documentation project, there were 178 Reads, 22 Greps, and 34 Globs across 17 sessions.

Sometimes grep beats embeddings. No indexing infrastructure needed, just raw text search. [Agent design analysis has noted](https://jannesklaas.github.io/ai/2025/07/20/claude-code-agent-design.html) that this preference for direct codebase access over vector embeddings is a key part of Claude Code's effectiveness.

## Reinforcement Works

Sessions with more positive feedback had better outcomes.

In my web project: 8 positive, 2 corrections
In another project: 1 positive, 5 corrections

When the agent did something well, saying so wasn't just politeness—it was training data for future interactions.

When you see good behavior, call it out. It improves future sessions.

## Course-Correct Early, Not Late

I only interrupted one session mid-workflow, and it wasted effort—the agent was mid-implementation when I provided new direction.

Course-correct during planning, not implementation.

Approve the plan, not just the code.

## What Actually Works

If you're frustrated with AI coding tools, the problem might not be the model. It might be how the agent orchestrates work.

**Subagents explore.** Use them for codebase research, not implementation. One task per subagent. If you need multiple things explored, spawn multiple subagents in parallel.

**The main agent implements.** The agent keeps Edit control centralized—using Edit for changes, Write for new files.

**Clear communication matters.** The agent uses AskUserQuestion when uncertain.

**Verify everything.** The agent verifies after each Edit.

**Reinforce good behavior.** When the agent does something well, say so.

The sessions that work well are the ones where:
- Exploration is delegated, implementation is centralized
- Changes are verified continuously
- Questions are asked before action
- Multiple subagents coordinate in parallel

Better prompts won't fix a broken workflow. The agent's orchestration patterns—delegation, verification, and handoffs—are what matter.
