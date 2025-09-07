---
title: "Outcome Liability: Why Agent Authorship Misses the Point"
description: "The future of code liability isn't about who wrote it, but who operates it. Provable assurance beats authorship tracking."
date: 2025-08-20
tags: [HUMAN, AI, AGENTS, LIABILITY, POLICY, DEVELOPMENT]
tldr: "As agents abstract away development like HLLs did assembly, 'human liability for authored code' becomes meaningless. The future is operator liability backed by provable assurance—signed attestations, property tests, and runtime monitoring matter more than keystrokes."
draft: false
---

The discourse around AI-generated code liability sounds reasonable until you play it forward.

"Humans must have liability for any code they participate in authoring" feels like the right north star—today. But when agents dominate development, the axis that matters won't be who typed it but what assurance we have that it's safe and does what we said.

**Key Points:**

- Agents will abstract development like HLLs did assembly—economic pressure drives adoption
- Continuous agent authorship makes blame assignment meaningless—system operators become accountable
- Security and robustness depend on assurance evidence, not authorship traces
- Current disclosure policies are reasonable bridges toward outcome-based accountability
- Future: focus on provable guarantees (attestations, tests, monitoring) over keystrokes

The Ghostty project's recent discussion about requiring AI disclosure in pull requests captures the current moment perfectly. Mitchell Hashimoto's rationale is sound: transparency helps maintainers "assess how much attention to give a PR." It's a reasonable bridge policy for managing today's uncertainty.

But bridges are temporary. Here's how this actually plays out long-term.

## Why Agents Will Abstract Development

Economic gravity is simple: most code is boilerplate, integration, and refactoring. Autonomous agents that turn specs → working services → ops will be cheaper and faster. Cost wins.

We're following the same abstraction pressure that moved us from registers → functions → frameworks → infra-as-code. Agents are the next layer: you specify outcomes, constraints, SLOs, and policies; they synthesize, wire, test, and ship.

As agents pair with property tests, fuzzing, type systems, and formal verification, "write code" becomes "prove properties and monitor." Humans curate specs and guardrails. The toolchain converges around assurance, not authorship.

## What's Different This Time

The assembly → HLL shift was deterministic. Compilers are predictable. Agents are stochastic planners.

This changes everything about liability.

**Determinism vs. Stochasticism:** When a compiler generates machine code, the process is reproducible. When an agent generates code, it's planning under uncertainty. The meaningful artifact isn't authorship—it's the assurance evidence: tests, proofs, evaluations, runbooks, rollbacks.

**Continuous Authorship:** Agents won't just write code once. They'll keep editing live systems, optimizing deployments, patching vulnerabilities. Pinning liability to a specific "author" becomes meaningless when the system is constantly evolving. The operator of the system becomes the only stable locus of accountability.

**Practical Reality:** You can't blame a model for system failures. Accountability naturally flows to whoever operates the system. Think product liability—when a car fails, we don't blame the assembly line worker, we examine the manufacturer's processes and quality controls.

The question isn't who wrote the code. It's who owns the outcome.

## The Likely End State

**Humans own outcomes, not lines.** You'll be liable for the behavior of the system you operate—regardless of whether an agent, a compiler, or a contractor produced the bytes.

**Provenance is for forensics, not blame.** We'll maintain rich, signed traces (attestations) of agent steps for audits and recourse, but external liability focuses on harms caused by the shipped system.

**Pipelines become "assurance factories."** The workflow becomes: Spec → generate → verify → deploy, with gates at every step:

- Contract/spec first (types, invariants, SLAs)
- Property-based tests, fuzzing, static analysis, formal checks where feasible
- Sandboxed evaluation & canarying with automatic rollback
- Signed SBOM + ABOM (AI bill of materials): models, prompts, training data lineage, agent plans, reviewers
- Continuous runtime monitors with kill switches

## Where Disclosure Still Makes Sense

**Near-term transition:** The Ghostty approach is smart—while agent assurance tooling is immature, disclosure provides signal and helps with risk triage. It acknowledges that AI-generated code might need "heavy supervision," as Hashimoto puts it.

But it's a bridge policy, not the destination. Long-term, we need to replace "who wrote it?" with "what guarantees and operational controls back it?"

The suggestion in that PR for a "standard AI byline that all AI tools can write to" points toward the right infrastructure—comprehensive, automated provenance tracking rather than manual disclosure.

## If You're Betting on the Agent Future

Start optimizing for this now:

**Treat agents as autonomous build systems.** Require signed attestations for every step (SLSA/in-toto/Sigstore style).

**Make specs executable.** Types, contracts, TLA+, Dafny, property tests—anything that gives agents unambiguous goals to optimize against.

**Enforce verification gates.** Agents must pass measurable assurance checks to merge or deploy.

**Shift reviews from style to risk.** Focus on hazards, blast radius, and rollback procedures instead of code aesthetics.

**Align contracts properly.** Operators own user-facing liability; vendors share it via warranties and SLAs tied to measurable assurance.

## The Abstraction Is Coming

Yes, agents will abstract away most development—just like HLLs abstracted assembly. When they do, the sane liability regime is operator/outcome responsibility backed by provable assurance, not perpetual human-authorship liability.

The policy should focus on guarantees, not keystrokes.

The transition will be messy. Some domains will require human oversight longer than others. Critical infrastructure, medical devices, financial systems—these will have hybrid models for years.

But the direction is clear. We're moving from a world where humans write code and take responsibility for every line, to one where humans specify outcomes and take responsibility for system behavior.

**Focus the policy on guarantees, not keystrokes.**

The sooner we start building the infrastructure for outcome-based liability—the attestation systems, the assurance pipelines, the monitoring frameworks—the smoother this transition will be.

The question isn't whether this future is coming. It's whether we'll be ready for it.