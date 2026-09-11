---
title: "From Shower Ideas to Production: Autonomous AI Agents"
description: "Running 100% autonomous AI agents in VMs to go from idea to implementation without touching a keyboard"
tldr: "I've solved the idea-to-code friction by running autonomous AI agents in VMs. Every shower idea gets spec'd and implemented automatically using loop.sh orchestration, specialized subagents, and proper tooling."
date: 2025-09-22
tags: [AI, AUTOMATION, TOOLS, WORKFLOW]
draft: false
author: "Nikola Balić"
topics: [Autonomous AI agents, voice-to-spec workflows, automated development, VM-based execution, loop orchestration]
entities: [WisprFlow, Claude Code, Termius, tmux, loop.sh, task-master, git-master]
answers_questions:
  - How do you go from idea to implementation without touching a keyboard?
  - What does 100% autonomous AI agent development look like?
  - How can you orchestrate long-running AI development sessions?
---

Every great project starts with a crazy idea in the shower.

Getting from lightbulb moment to working code takes weeks of stop-start development, lost context, and soul-crushing context switching.

I've solved this by running 100% autonomous AI agents in VMs. Every shower idea gets spec'd and implemented without me touching a keyboard.

It sounds like science fiction. It's surprisingly straightforward.

## The philosophy: maximize autonomous execution

The core insight is simple: agents run on structure, not supervision. Give them clear objectives, proper tooling, and robust error handling, and they'll outperform traditional development workflows.

The goal is to eliminate the friction between ideas and implementation. When you remove the overhead of project setup, environment configuration, and todo management, you can focus on the creative and strategic work.

## The stack: three tools, maximum impact

**WisprFlow + Claude**: Every idea gets spec'd in a tmux session using Termius. WisprFlow captures the voice-to-text brain dump, Claude structures it into actionable requirements. This conversation becomes the project foundation.

**[loop.sh](https://gist.github.com/nibzard/a97ef0a1919328bcbc6a224a5d2cfc78)**: The orchestration engine. This bash script runs Claude Code in fully autonomous mode (e.g. dangerously-skip-commits flag), handling task selection, implementation, git commits, and error recovery. It's designed to run for hours without intervention.

**Specialized Subagents**: The two critical pieces are [task-master](https://gist.github.com/nibzard/d4f97d0cade5b7204afe5ed862e42ae4) for todo file management and [git-master](https://gist.github.com/nibzard/1e5266b86c75418ce836106c607e21de) for version control. These handle the mundane but essential work that keeps projects moving forward.

## How it actually works

Here's the real workflow:

1. **Ideation Phase**: Voice dump the entire concept to WisprFlow while walking or in the shower (VoiceInk works too on Mac). No structure needed, just stream of consciousness.

2. **Specification**: Claude takes the voice transcript and creates a comprehensive project spec with architecture decisions, technology choices, and a structured todo file.

3. **Autonomous Implementation**: Launch loop.sh pointing at the todo file. The agent runs for hours, selecting tasks, implementing features, handling errors, and committing progress.

4. **Rate Limit Management**: When the 5-hour Claude limit hits, the system gracefully stops with clear restart instructions. No lost work, no confused state.

5. **Resume and Repeat**: Restart the loop when limits reset. The agent picks up exactly where it left off using session continuity.

## Production patterns that emerged

**Spec Driven Development**: The voice-to-spec pipeline becomes the single source of truth. Every project starts with a comprehensive specification that includes architecture decisions, tech stack choices, and acceptance criteria. This investment pays off when the agent hits implementation: less ambiguity, no mid-flight architecture changes, and less scope creep.

**Failure Recovery**: The system distinguishes between recoverable errors (missing files, syntax issues) and hard failures (rate limits, fundamental blockers). It attempts recovery for the former and gracefully stops for the latter.

**Task Management**: The task-master subagent maintains the todo file, breaks down complex features into atomic tasks, and selects the next task based on current context and dependencies. No human has to think about what to work on next; the system handles prioritization, estimation, and progress tracking on its own.

**Git Discipline**: Every completed task gets committed with meaningful messages. This creates a clean history and enables easy rollbacks if the agent takes a wrong turn.

**Cost Tracking**: Real-time monitoring of API costs and execution time. You know exactly what each feature costs to implement.

## What works (and what doesn't)

**Wins**: 
- Complex refactoring that would take days gets done in hours
- Consistent code quality through enforced patterns
- Zero context switching between projects
- Complete project history with detailed commit messages

**Limitations**:
- Requires well-structured initial specs
- Works best with established tech stacks
- Can get stuck on ambiguous requirements
- Still needs human oversight for architectural decisions

## The bigger picture

This approach fundamentally changes how I think about project work. Instead of batching development into dedicated coding sessions, every idea gets immediate implementation. The latency between concept and working prototype drops from weeks to hours.

AI agents excel at execution and struggle with ambiguity. Leave them to figure out requirements or handle edge cases, and they'll burn API credits spinning their wheels.

## Implementation details

The loop.sh script handles the orchestration:

```bash
# Autonomous execution with subagent delegation
$CLAUDE_CMD \
    -p "Use task-master subagent to review $TODO_FILE and select the next task. Implement completely. Use git-master subagent to commit changes." \
    --append-system-prompt "You are an autonomous coding agent operating without human supervision..."
```

Key behaviors encoded in the system prompt:
- Always use specialized subagents for todo and git management
- Never ask for confirmation; make decisions and execute
- Document blockers but keep moving forward
- Update task status immediately when starting/completing work
- Make reasonable assumptions when facing ambiguity

## Results and next steps

Six months in, I've shipped every idea and side project. The removal of development friction unlocks a different kind of productivity: ideas flow directly into working code.

Next up: multi-agent collaboration. Instead of a single agent working through a todo list, imagine specialized agents for frontend, backend, testing, and documentation working in parallel on different aspects of the same project.

Even the current single-agent approach changes the shape of the work: when implementation becomes as frictionless as having an idea, the bottleneck moves from execution to creativity.

---

*The [loop.sh script](https://gist.github.com/nibzard/a97ef0a1919328bcbc6a224a5d2cfc78) and [subagent configurations](https://gist.github.com/nibzard/d4f97d0cade5b7204afe5ed862e42ae4) are available as open-source tools. They're public to prove that autonomous development is practical today with existing tools.*
