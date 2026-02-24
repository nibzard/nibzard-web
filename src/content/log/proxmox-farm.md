---
title: "My Proxmox Agent Farm: Ephemeral VMs for Parallel Autonomy"
description: "Parallelism beats cleverness. I built a farm of ephemeral VMs to run multiple agents simultaneously."
tldr: "I have two Proxmox machines running an orchestrator that spins up ephemeral VMs on demand. Tens of agents running at once, different projects, isolated failures. Here's the architecture."
date: 2026-02-24
tags: [AI, INFRASTRUCTURE, HOMELAB]
draft: true
author: "Nikola Balić"
topics: [AI Agents, Virtualization, Infrastructure]
entities: [Proxmox, agentlab]
answers_questions:
  - How do I run multiple AI agents in parallel?
  - What's the architecture for an agent farm?
  - Why use VMs instead of containers for agents?
---

Parallelism beats cleverness.

That's the lesson I've learned working with AI agents. A single agent thinking harder about a problem rarely beats multiple agents trying different approaches simultaneously.

So I built infrastructure for it: **a Proxmox agent farm that spins up ephemeral VMs on demand.**

## The Setup

Two Proxmox machines in my homelab. An orchestrator that manages them. The ability to spin up isolated VMs in seconds.

At any point in time, I might have:
- Multiple agents working on the same problem, trying different approaches
- Agents working on different projects entirely
- Long-running background tasks while I work on something else
- Experiments that might fail catastrophically—without affecting anything else

## Why VMs Instead of Containers?

Containers are lighter. But VMs provide **stronger isolation.**

When an agent goes wrong—installs weird packages, modifies system files, fills disk space—I want that contained to the VM. Kill it, spawn a new one. Clean slate.

Containers share a kernel. A sufficiently determined agent can escape container isolation. VMs have hypervisor-level boundaries.

For agent workloads, the overhead of VMs is worth it for the isolation guarantee.

## The Orchestrator Design

The orchestrator is relatively simple:

**Queue.** Tasks come in, get queued. Each task specifies:
- What to do (the prompt/instructions)
- What resources it needs (CPU, RAM, time limit)
- What success looks like (the acceptance criteria)

**VM Pool.** A set of VM templates ready to be cloned:
- Base template with common tools installed
- Pre-configured with credentials and access
- Ready to run in seconds

**Worker.** Pulls tasks from queue, clones VM, runs agent, collects results:
- Streams logs back in real-time
- Captures artifacts (code, files, screenshots)
- Handles timeout and resource limits
- Cleans up VM when done (success or failure)

**Aggregator.** Collects results from multiple workers:
- Identifies the best solution among parallel attempts
- Merges partial successes
- Reports overall status

## Cost and Latency

This isn't free. Each VM has overhead:
- Memory allocation
- CPU contention
- Network I/O
- Storage for clones

But it's cheaper than you'd think. Most agent tasks are I/O bound (waiting for APIs, browsing, thinking). The actual CPU usage is low.

Latency is acceptable. Cloning a VM takes seconds. Boot time is minimal with pre-warmed templates. The agent starts working almost immediately.

## Failure Containment

The key advantage: **failures don't cascade.**

If an agent goes into an infinite loop, it hits the time limit and dies. The VM is cleaned up. The queue moves on.

If an agent installs conflicting packages or corrupts its environment, that's contained. The next task gets a fresh VM.

If an agent tries something genuinely dangerous—recursive file deletion, system modification, network attacks—the VM is the blast radius.

## What I Run

Typical workloads:

**Parallel exploration.** "Find the best approach to this problem." Spin up 5 VMs, try 5 different strategies, take the best result.

**Long-running tasks.** "Refactor this codebase." Kick it off, check back in an hour. My main machine stays free.

**Risky experiments.** "Try this wild idea." If it breaks everything, who cares? Fresh VM next time.

**Multi-project work.** Agent working on nibzard-web while another works on agentlab. Isolated, parallel progress.

## The Code

The orchestrator is [agentlab](https://github.com/nibzard/agentlab)—a work in progress, but functional. It's designed to be:

- **Simple.** No Kubernetes, no complex orchestration. Just a queue and some VMs.
- **Flexible.** Works with different agent frameworks and models.
- **Observable.** Every run is logged, traced, and auditable.

## The Future

I'm working toward **fully autonomous parallelism:**

1. A backlog of tasks
2. An orchestrator that pulls tasks and dispatches agents
3. Multiple agents running simultaneously
4. Results aggregated and reviewed
5. Me checking in periodically to steer

Not there yet. But the infrastructure is in place.

The models are good enough. The parallelism is available. The question now is: **what do you do with tens of agents at once?**

I'm still figuring that out. But having the farm ready means I can find out.
