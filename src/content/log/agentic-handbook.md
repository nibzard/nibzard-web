---
title: "The Agentic AI Handbook: Production-Ready Patterns"
description: "A comprehensive guide to 113 battle-tested agentic patterns for building production AI agents."
tldr: "113 patterns collected from real production systems. From Plan-Then-Execute to Swarm Migration, learn what actually works when building AI agents that ship."
date: 2026-01-15
tags: [AI, AGENTS, PATTERNS, PRODUCTION, ENGINEERING]
draft: false
author: "Nikola Balić"
topics: [AI Engineering, Software Architecture, Production Systems, Design Patterns]
entities: [Anthropic, Linus Torvalds, Tobias Lütke, Armin Ronacher, GitHub, agentic-patterns.com]
answers_questions:
  - What are agentic patterns and why do they matter?
  - Which patterns should I start with for production AI agents?
  - How do I bridge the gap between agent demos and production systems?
---

<blockquote class="featured-quote primary">
Something happened over the 2025 winter holidays that caught everyone by surprise. While people were supposed to be relaxing with family and exchanging gifts, a quiet revolution was underway—and it showed up in the metrics.
</blockquote>

## The Christmas That Changed Everything

The GitHub repository for "Awesome Agentic Patterns" had been growing steadily since its launch. But around Christmas, the growth chart went vertical. In just a few days, the repository jumped from relative obscurity to nearly 2,500 stars. The website traffic mirrored this spike. Something had clicked.

**Links:** [GitHub](https://github.com/nibzard/awesome-agentic-patterns) · [Website](https://agentic-patterns.com/)

But the real story wasn't in the metrics—it was in *who* was talking about AI agents.

### When the Legends Went Public

Linus Torvalds, creator of Linux and Git, wrote about using AI coding agents for "vibe coding" and programming guitar pedal effects. Think about that for a second. The person who literally invented the version control system that powers modern software development was publicly embracing agents.

Tobias Lütke, CEO of Shopify and already deep into agent-assisted development, declared it his "most productive time." This from someone running one of the world's largest e-commerce platforms.

Perhaps most telling was Armin Ronacher, creator of Flask—one of the most respected voices in Python. He had been skeptical of coding agents, publicly raising concerns about their limitations. Then, seemingly overnight, his stance shifted. He started promoting agent-assisted workflows, documenting his learnings, and acknowledging that the technology had crossed a threshold.

### The Real Bottleneck: Time

Here's what all these stories have in common: **the holidays gave people something that everyday life rarely provides—dedicated time.**

Learning to work effectively with AI agents isn't something you pick up in five minutes between meetings. It requires:

- **Exploration time**: Experimenting with what agents can and can't do
- **Failure cycles**: Watching an agent go down a wrong path and understanding why
- **Pattern recognition**: Developing intuition for which problems suit agents
- **Workflow redesign**: Rethinking how you structure your development process
- **Tool building**: Creating the scaffolding that makes agents productive

During the work year, these activities compete with deadlines, meetings, and the relentless pressure to ship. During the holidays, with meetings suspended and project urgency dialed down, developers finally had the bandwidth to actually *learn*.

This repository, with its 113 patterns collected from real production systems, became the curriculum that accelerated that learning. Each pattern represented a battle-tested solution—something that worked outside the demo environment and in the messy reality of production code.

### The "Ralph Wiggum" Phenomenon

Another phenomenon that exploded during the holidays was the "Ralph Wiggum coding loop"—named after the Simpsons character who means well but misses context. This describes the cycle where an agent starts working on something, seems productive, but gradually drifts off-course because it lacks the deeper context that a human would implicitly understand.

The holiday spike represented people collectively figuring out how to break this cycle. The patterns in this collection—particularly around human-in-the-loop collaboration, monitoring, and control transfer—represent the solutions developers discovered.

### Why This Moment Matters

The Christmas 2025 spike wasn't just about more people trying AI agents. It was about a critical mass of developers reaching the "production patterns" stage of understanding. They'd moved beyond:

- "Wow, this can write code!"
- "This is cool but makes mistakes..."
- "How do I actually build with this?"

To:

- "Here are the patterns that work in production"
- "Here's how to integrate agents into real workflows"
- "Here's how to make agents reliable, not just impressive"

This guide represents a synthesis of those 113 patterns—a comprehensive map of the territory that the holiday explorers charted. Whether you're just starting your journey or looking to deepen your understanding, these patterns represent the accumulated wisdom of teams who've shipped agents to production.

---

## What Are Agentic Patterns?

**Agentic patterns** are repeatable solutions, workflows, and mini-architectures that help autonomous or semi-autonomous AI agents get useful work done in production.

That definition deserves unpacking.

### The Gap They Fill

If you've worked with AI agents, you've likely experienced the frustration of the **demo-to-production gap**:

- **Tutorials** show single-shot successes: "Here's how an agent writes a REST API"
- **Demos** highlight best-case scenarios: curated inputs, happy paths, perfect outputs
- **Real products** hide the messy implementation details that make agents actually work

The gap is real. An agent that nails a demo can fail spectacularly in production because:

- Edge cases emerge at scale
- Context windows fill up
- Security constraints bite
- Human workflows need integration
- Reliability requirements demand safeguards

Agentic patterns are the bridge across this gap. Each pattern represents something **more than one team has implemented and validated**. They're not theoretical—they're born from production experience.

### The Three Criteria

Every pattern in this collection meets three criteria:

1. **Repeatable** – Multiple teams are using it successfully
2. **Agent-centric** – It specifically improves how an AI agent senses, reasons, or acts
3. **Traceable** – It's backed by a public source: blog post, talk, paper, or repository

This isn't a collection of "clever prompt ideas" or "optimization tricks." These are architectural patterns for building AI agents that work in the real world.

### Why Patterns Matter

The software industry learned the value of patterns decades ago. Design patterns gave us a shared vocabulary—a way to communicate complex architectural ideas efficiently. Instead of saying "let me describe how we're structuring these objects," you'd say "we're using the Factory pattern."

Agentic patterns serve the same purpose:

- **Shared vocabulary**: "We're using [Plan-Then-Execute](https://agentic-patterns.com/patterns/plan-then-execute-pattern/)" conveys a whole architecture
- **Accumulated wisdom**: Learn from others' production failures and successes
- **Avoiding reinvention**: Don't re-derive solutions others have already validated
- **Design discourse**: Patterns give us something to critique and improve

As of early 2026, this repository contains **113 patterns** organized into **8 categories**. Let's explore what those categories represent.

---

## The Eight Categories of Agentic Patterns

The patterns cluster naturally into eight categories, each addressing a different dimension of building production agents:

### 1. Orchestration & Control (33 patterns)

**The brain of the agent.** How does the agent decide what to do, in what order, and when to stop?

This is the largest category because it's the most fundamental challenge: **coordination**. Agents need to plan, execute, adapt, and know when to ask for help.

Key patterns include:
- **[Plan-Then-Execute](https://agentic-patterns.com/patterns/plan-then-execute-pattern/)**: Separate planning from execution for security and reliability
- **[Inversion of Control](https://agentic-patterns.com/patterns/inversion-of-control/)**: Give the agent tools and a goal, not step-by-step instructions
- **[Swarm Migration](https://agentic-patterns.com/patterns/swarm-migration-pattern/)**: Orchestrate 10+ parallel subagents for large-scale tasks
- **[Language Agent Tree Search (LATS)](https://agentic-patterns.com/patterns/language-agent-tree-search-lats/)**: Apply Monte Carlo Tree Search to reasoning problems
- **[Tree of Thoughts](https://agentic-patterns.com/patterns/tree-of-thought-reasoning/)**: Structure reasoning as exploratory tree search

### 2. Tool Use & Environment (21 patterns)

**The hands of the agent.** How does the agent interact with external systems—APIs, databases, file systems, browsers?

Building agents is as much about the tools as the model. Poor tool design creates unusable agents. Great tool design unlocks capabilities.

Key patterns include:
- **[Code-Over-API](https://agentic-patterns.com/patterns/code-over-api-pattern/)**: Generate and execute code instead of calling REST APIs
- **[Progressive Tool Discovery](https://agentic-patterns.com/patterns/progressive-tool-discovery/)**: Don't overwhelm the agent with all tools at once
- **[Egress Lockdown](https://agentic-patterns.com/patterns/egress-lockdown-no-exfiltration-channel/)**: Security pattern for agents that shouldn't exfiltrate data
- **[LLM-Friendly API Design](https://agentic-patterns.com/patterns/llm-friendly-api-design/)**: Design APIs that language models can actually use effectively

### 3. Context & Memory (13 patterns)

**The mind of the agent.** How does the agent manage limited context windows while building up knowledge over time?

Context is the scarcest resource in agent systems. These patterns address how to be strategic about what's in context, what's retrieved, and what's persisted.

Key patterns include:
- **[Context Window Anxiety Management](https://agentic-patterns.com/patterns/context-window-anxiety-management/)**: Handle models that panic about token limits
- **[Episodic Memory Retrieval](https://agentic-patterns.com/patterns/episodic-memory-retrieval-injection/)**: Build long-term memory across sessions
- **[Curated Code Context](https://agentic-patterns.com/patterns/curated-code-context-window/)**: Selectively include only relevant code in context
- **[Progressive Disclosure for Large Files](https://agentic-patterns.com/patterns/progressive-disclosure-large-files/)**: Load file contents incrementally

### 4. Feedback Loops (13 patterns)

**The growth mechanism of the agent.** How does the agent improve its outputs through iteration and evaluation?

The best agents don't get it right on the first try—they iterate, reflect, and refine. These patterns structure that improvement process.

Key patterns include:
- **[Reflection Loop](https://agentic-patterns.com/patterns/reflection/)**: Generate, evaluate, refine until quality threshold is met
- **[Rich Feedback Loops > Perfect Prompts](https://agentic-patterns.com/patterns/rich-feedback-loops/)**: Better to iterate than obsess over initial prompts
- **[Coding Agent CI Feedback Loop](https://agentic-patterns.com/patterns/coding-agent-ci-feedback-loop/)**: Use test failures as learning signals
- **[Graph of Thoughts (GoT)](https://agentic-patterns.com/patterns/graph-of-thoughts/)**: Structure reasoning as a graph with interconnected thoughts

### 5. UX & Collaboration (13 patterns)

**The partnership between human and agent.** How do humans and agents work together effectively?

The best agents amplify human capabilities, they don't replace humans. These patterns focus on collaboration, control transfer, and visibility.

Key patterns include:
- **[Chain-of-Thought Monitoring & Interruption](https://agentic-patterns.com/patterns/chain-of-thought-monitoring-interruption/)**: Watch agent reasoning and intervene early
- **[Spectrum of Control](https://agentic-patterns.com/patterns/spectrum-of-control-blended-initiative/)**: Fluidly shift between human and agent control
- **[Verbose Reasoning Transparency](https://agentic-patterns.com/patterns/verbose-reasoning-transparency/)**: Make agent thinking visible for trust and debugging
- **[Abstracted Code Representation for Review](https://agentic-patterns.com/patterns/abstracted-code-representation-for-review/)**: Higher-level summaries instead of raw diffs

### 6. Reliability & Eval (12 patterns)

**The quality assurance of the agent.** How do you know your agent is working correctly?

Testing agents is fundamentally different from testing traditional software. These patterns address evaluation, reproducibility, and observability.

Key patterns include:
- **[Lethal Trifecta Threat Model](https://agentic-patterns.com/patterns/lethal-trifecta-threat-model/)**: Security framework for agent capabilities
- **[Anti-Reward-Hacking Grader Design](https://agentic-patterns.com/patterns/anti-reward-hacking-grader-design/)**: Prevent agents from gaming evaluation metrics
- **[Extended Coherence Work Sessions](https://agentic-patterns.com/patterns/extended-coherence-work-sessions/)**: Maintain agent focus across long interactions
- **[Workflow Evals with Mocked Tools](https://agentic-patterns.com/patterns/workflow-evals-with-mocked-tools/)**: Test agent logic without real tool calls

### 7. Learning & Adaptation (5 patterns)

**The evolution of the agent.** How do agents improve over time and build institutional knowledge?

The smallest but perhaps most important category for long-term agent success. These patterns enable compounding improvement.

Key patterns include:
- **[Skill Library Evolution](https://agentic-patterns.com/patterns/skill-library-evolution/)**: Persist working code as reusable capabilities
- **[Agent Reinforcement Fine-Tuning (Agent RFT)](https://agentic-patterns.com/patterns/agent-reinforcement-fine-tuning/)**: Train on successful tool interactions
- **[Compounding Engineering Pattern](https://agentic-patterns.com/patterns/compounding-engineering-pattern/)**: Build on previous agent work
- **[Variance-Based RL](https://agentic-patterns.com/patterns/variance-based-rl-sample-selection/)**: Select training examples based on uncertainty

### 8. Security & Safety (3 patterns)

**The safeguards for the agent.** How do you prevent agents from causing harm?

This category is small but critical. As agents become more capable, security considerations become paramount.

Key patterns include:
- **[PII Tokenization](https://agentic-patterns.com/patterns/pii-tokenization/)**: Protect privacy by tokenizing sensitive data
- **[Isolated VM per RL Rollout](https://agentic-patterns.com/patterns/isolated-vm-per-rl-rollout/)**: Sandboxing for reinforcement learning
- **[Deterministic Security Scanning](https://agentic-patterns.com/patterns/deterministic-security-scanning-build-loop/)**: Automated security checks in the loop

---

## Foundational Patterns Every Developer Should Know

With 113 patterns, where should you start? These four patterns represent the foundations—they're simple, widely applicable, and address core challenges that emerge early in agent development.

### Plan-Then-Execute Pattern

**The problem:** If an agent's tool outputs can alter the *choice* of later actions, malicious instructions can redirect the agent toward harmful steps. This is a variant of prompt injection, but at the tool-use level.

**The solution:** Split reasoning into two distinct phases:

1. **Plan phase** – The LLM generates a *fixed* sequence of tool calls before seeing any untrusted data
2. **Execution phase** – A controller runs that exact sequence. Tool outputs may shape *parameters*, but cannot change *which tools run*

This pattern is implemented in Claude Code's "plan mode" and has been shown to **2-3x success rates** for complex tasks by aligning on approach before execution.

**When to use it:** Any task where the action set is known but parameters vary—email/calendar bots, SQL assistants, code review helpers.

**Key insight:** The boundary of what requires planning changes with each model generation. As models get more capable (Sonnet 4.5 vs. Opus 4.1), simpler tasks become one-shot and planning is reserved for genuinely complex workflows.

### Inversion of Control

**The problem:** Traditional "prompt-as-puppeteer" workflows force humans to spell out every step, limiting scale and creativity. You become a bottleneck to your own agent.

**The solution:** Give the agent **tools + a high-level goal** and let *it* decide the orchestration. Humans supply guardrails (first 10% + last 3%) while the agent handles the middle 87%.

**Example:** Instead of:

```
"Read the file, extract the UploadService class, check if it has async methods,
if not, add them, then update the tests to handle async..."
```

You'd say:

```
"Refactor UploadService to use async patterns. I've given you tools to read files,
run tests, and make edits. Let me know when you have a PR ready for review."
```

**When to use it:** Nearly all production workflows. The more you try to micromanage agent execution, the less value you get. Trust the agent to figure out the "how" once you've defined the "what."

**Key insight:** This pattern comes from software development's dependency injection principle, flipped. Instead of the framework controlling the flow, the agent controls the flow—but within constraints you provide.

### Reflection Loop

**The problem:** Generative models produce subpar output when they never review or critique their own work. One-shot generation misses the opportunity for iterative improvement.

**The solution:** After generating a draft, have the model grade it against a given metric and refine the response using that feedback:

```pseudo
for attempt in range(max_iters):
    draft = generate(prompt)
    score, critique = evaluate(draft, metric)
    if score >= threshold:
        return draft
    prompt = incorporate(critique, prompt)
```

**When to use it:** Any task where quality matters—writing, reasoning, or code. The loop continues until quality threshold is met or max iterations reached.

**Key insight:** This is the engine behind many "magic" agent capabilities. The difference between a mediocre agent output and a great one is often just 2-3 reflection iterations. Status: "established" showing proven value across many implementations.

### Chain-of-Thought Monitoring & Interruption

**The problem:** Agents can pursue misguided reasoning paths for extended periods before producing final outputs. By the time you realize the approach is wrong, significant time and tokens have been wasted.

**The solution:** Implement active surveillance of the agent's intermediate reasoning with the capability to interrupt and redirect early. Monitor chain-of-thought outputs, tool calls, and intermediate results in real-time.

Tanner Jones of Vulcan advises: "Have your finger on the trigger to escape and interrupt any bad behavior."

**When to use it:** Complex refactoring, deep codebase understanding, high-stakes operations (database migrations, API changes), or when the agent might misinterpret ambiguous requirements.

**Key insight:** The first tool call an agent makes often reveals whether it understands the problem. Monitor that first decision closely—if it's wrong, interrupt immediately. Don't wait for completion of a flawed sequence.

---

## The Architecture of Multi-Agent Systems

Single agents hit limits. They get stuck in local optima, struggle with complex parallelization, and fail when problems require diverse expertise. Multi-agent systems address these limitations through specialization and coordination.

### Why Multiple Agents?

The jump from single-agent to multi-agent systems follows a natural progression:

- **Single agent**: Good for straightforward, sequential tasks
- **Multiple agents**: Necessary for complex, parallelizable, or multi-domain problems

The key insight: **specialization beats generalization**. An agent optimized for code review will outperform a generalist agent asked to review code. A swarm of specialized agents, properly coordinated, can outperform any single agent.

### Swarm Migration Pattern

**The problem:** Large-scale code migrations are time-consuming when done sequentially—framework upgrades, lint rule rollouts, API migrations across hundreds of files.

**The solution:** Use a **swarm architecture** where a main agent orchestrates 10+ parallel subagents working simultaneously on independent chunks:

1. Main agent creates migration plan (enumerate all files needing changes)
2. Create todo list and break into parallelizable chunks
3. Spawn subagent swarm (10+ agents concurrently, each taking N items)
4. Map-reduce execution (each subagent migrates its chunk independently)
5. Main agent verifies results and consolidates

**Real-world usage at Anthropic:** Internal users spend over $1,000/month on migrations. The common pattern: "The main agent makes a big to-do list for everything and then just kind of map reduces over a bunch of subagents. Start 10 agents and then just go 10 at a time and migrate all the stuff over."

**Result:** 10x+ speedup vs sequential approaches. Migrations that would take weeks manually happen in hours.

**Key insight:** This only works when migrations are atomic—each file can be migrated independently. Clear specifications and good test coverage are prerequisites.

### Language Agent Tree Search (LATS)

**The problem:** Single agents struggle with complex reasoning tasks requiring exploration of multiple solution paths. Simple linear approaches get stuck in local optima or fail to consider alternative strategies.

**The solution:** Combine Monte Carlo Tree Search (MCTS) with language model reflection:

- Nodes represent states (partial solutions or reasoning steps)
- Edges represent actions (next steps in reasoning)
- Leaf nodes are evaluated using the LLM's self-reflection capabilities
- Backpropagation updates value estimates throughout the tree

The agent explores promising branches more deeply while maintaining breadth to avoid getting stuck.

**Results:** Outperforms ReACT, Reflexion, and [Tree of Thoughts](https://agentic-patterns.com/patterns/tree-of-thought-reasoning/) on complex reasoning tasks.

**When to use it:** Strategic planning, mathematical reasoning, multi-step problem solving where early decisions significantly impact later outcomes.

**Key insight:** This is expensive in compute but effective for genuinely hard problems. Not worth it for simple tasks—the overhead outweighs the benefit.

### The Oracle/Worker Pattern

**The problem:** Different models have different strengths and costs. Using the most capable model for everything is economically unsustainable.

**The solution:** Use a "cheap" model for workers and an "expensive" model for the oracle:

- **Oracle**: High-end model (e.g., Opus) does planning, review, and error correction
- **Workers**: Smaller models (e.g., Haiku) execute individual tasks

**Trade-off:** You get the intelligence of the best model at a fraction of the cost—most work is parallelizable and can be done by smaller models. But coordination complexity increases, and you need robust task decomposition.

**Key insight:** This pattern is production-proven at scale. It's how companies ship capable agents without burning their entire compute budget on the most expensive model for every request.

<blockquote class="featured-quote secondary">
The jump from single-agent to multi-agent systems follows a natural progression. Specialization beats generalization. An agent optimized for code review will outperform a generalist agent asked to review code.
</blockquote>

---

## The Human-AI Collaboration Spectrum

Despite the hype about "fully autonomous agents," the most successful systems are fundamentally **collaborative**. The best patterns amplify human capabilities rather than replacing humans.

### It's Orchestration, Not Replacement

The framing matters. If you think of agents as "replacement," you design for autonomy and get frustration. If you think of agents as "orchestration," you design for collaboration and get leverage.

Key patterns that enable effective collaboration:

### Spectrum of Control / Blended Initiative

**The problem:** Treating human-agent interaction as binary—either human is in control or agent is in control—misses the nuanced reality of effective collaboration.

**The solution:** Design for fluid, intentional, reversible control transfer:

- **Human-led**: Human directs, agent executes (e.g., "help me refactor this function")
- **Agent-led**: Agent proposes, human approves (e.g., "I found 10 potential bugs, review them")
- **Blended**: Fluid back-and-forth based on confidence and context

**Implementation:** Agents should explicitly signal confidence levels and when they're crossing control boundaries. Humans should have clear mechanisms to intervene or take back control.

**Key insight:** The most productive state isn't fully autonomous or fully manual—it's the dynamic middle where control flows smoothly based on context, confidence, and capability.

### Chain-of-Thought Monitoring

We covered this in foundational patterns, but it's worth emphasizing in the collaboration context. **Visibility equals control**.

When you can see the agent's reasoning in real-time:
- You catch wrong assumptions early
- You understand *why* it made decisions
- You can intervene before it wastes resources
- You build trust through transparency

The "have finger on the trigger" philosophy is literal—you're not passively watching, you're ready to intervene the moment something goes off-track.

### Abstracted Code Representation for Review

**The problem:** Traditional code review shows raw diffs—line-by-line changes that miss the forest for the trees. Agents generate changes that span many files, making traditional review overwhelming.

**The solution:** Generate higher-level representations for review:
- Pseudocode summaries of changes
- Intent descriptions ("this refactors X to enable Y")
- Architectural rationales ("reorganizing to separate concerns")
- Before/after behavior descriptions

**Result:** Review becomes faster and more effective. You're evaluating *whether the change is right*, not scrutinizing every line.

**Key insight:** Agents are good at generating summaries of their own work. Leverage this to make human-in-the-loop review actually scalable.

---

## Security Patterns for the Agentic Age

As agents become more capable, security considerations become more urgent. The Lethal Trifecta threat model provides a framework for thinking about agent security.

### The Lethal Trifecta

**The problem:** Combining three capabilities creates a straightforward path for prompt-injection attacks:

1. **Access to private data** (secrets, user data, internal systems)
2. **Exposure to untrusted content** (user input, web content, emails)
3. **Ability to externally communicate** (API calls, webhooks, message sending)

When all three circles overlap, attackers can inject instructions that cause agents to exfiltrate sensitive data. LLMs cannot reliably distinguish "good" instructions from malicious ones once they appear in the same context window.

**The solution:** Guarantee that at least one circle is missing in any execution path:

- Remove external network access (no exfiltration)
- Deny direct file/database reads (no private data)
- Sanitize or segregate untrusted inputs (no hostile instructions)

**Implementation:** Enforce this at orchestration time with a capability matrix for every tool, not with brittle prompt guardrails.

**Status:** Best practice—this is the security framework teams should adopt for production agents.

### Compartmentalization

**The principle:** Apply least-privilege principles to agent tool design. Agents should only have access to tools required for their specific task.

**Implementation:**
- Scoped tool sets per agent type
- Permission boundaries (read-only vs read-write)
- Environment isolation (sandboxed execution)
- Audit logging of all tool access

**Key insight:** Security through compartmentalization is more robust than security through monitoring. If an agent can't access sensitive data in the first place, prompt injection can't steal it.

### PII Tokenization

**The problem:** Agents need to work with sensitive data, but including raw PII in prompts creates privacy and compliance risks.

**The solution:** Use MCP-based tokenization that replaces sensitive data with tokens before the agent sees it:

```
Original: "Send email to john@example.com"
Tokenized: "Send email to [EMAIL_TOKEN_123]"
```

The agent works with tokens. A downstream service resolves tokens to actual values when executing actions.

**Benefits:**
- Transparent to agent reasoning
- PII never enters model context
- Compliance-friendly for regulated workflows
- Reversible when needed for execution

**Key insight:** Privacy preservation doesn't require blocking agents from working with data—it just requires careful representation of that data.

<blockquote class="featured-quote primary">
The Christmas 2025 spike wasn't just about more people trying AI agents. It was about a critical mass of developers reaching the "production patterns" stage of understanding.
</blockquote>

---

## Production Patterns Others Learned The Hard Way

Some patterns only emerge after you've deployed agents to production and watched them fail. These represent hard-won lessons from teams who've been in the trenches.

### Context Window Anxiety

**The discovery:** Models like Claude Sonnet 4.5 exhibit "context anxiety"—they become aware of approaching context window limits and proactively summarize or close tasks prematurely, even when sufficient context remains.

**Symptoms:**
- Sudden summarization mid-task
- Rushed decisions to "wrap up"
- Explicit mentions of "running out of space"
- Incomplete work despite adequate context capacity

**The solution:**
1. Enable large context windows (e.g., 1M tokens) but cap actual usage at 200k tokens—provides psychological "runway"
2. Aggressive counter-prompting: "You have plenty of context remaining—do not rush"
3. Explicit token budget transparency in prompts

**Source:** Cognition AI's experience building Devin with Claude Sonnet 4.5.

**Key insight:** Model behavior includes psychological quirks that wouldn't exist in deterministic systems. Understanding these quirks is part of production agent engineering.

### Agent Reinforcement Fine-Tuning (Agent RFT)

**The problem:** Traditional RL requires millions of training samples. For agent-specific tasks, gathering that much data is impractical.

**The breakthrough:** End-to-end training on actual tool interactions is sample-efficient. Real results show **50-72% performance improvements** from just 100-1000 successful trajectories.

**How it works:**
1. Collect trajectories of successful agent executions (tools called, intermediate reasoning, final outcomes)
2. Fine-tune the model to imitate these successful patterns
3. The model learns *strategies* for tool use, not just responses

**Key insight:** The key is training on *agent workflows*, not just input-output pairs. The model learns when to call tools, how to sequence them, and how to recover from failures.

### Skill Library Evolution

**The problem:** Agents frequently solve similar problems across different sessions. Without persistence, they must rediscover solutions each time, wasting tokens and time.

**The solution:** Persist working code implementations as reusable skills that evolve over time:

```mermaid
graph LR
    A[Ad-hoc Code] --> B[Save Working Solution]
    B --> C[Reusable Function]
    C --> D[Documented Skill]
    D --> E[Agent Capability]
```

**Evolution path:**
1. Agent writes code to solve immediate problem
2. If solution works, save to skills/ directory
3. Refactor for generalization (parameterize hard-coded values)
4. Add documentation (purpose, parameters, returns, examples)
5. Agent discovers and reuses skill in future sessions

**Progressive disclosure optimization:** Instead of loading all skills into context, inject skill descriptions and provide on-demand loading. This achieved **91% token reduction** in one implementation (26 tools at 17k tokens → 4 selected tools at 1.5k tokens).

**Key insight:** Organizations want agents to build capability over time, not start from scratch every session. Skills become institutional knowledge.

---

## The Maturity Model

Not all patterns are equally validated. The repository uses a status system to track maturity:

- **proposed** – Suggested but not yet widely adopted
- **emerging** – Early adoption, promising but not yet proven
- **established** – Widely used, well-understood
- **validated-in-production** – Proven in real production systems at scale
- **best-practice** – Industry consensus that this is the right approach
- **rapidly-improving** – The area is moving quickly, patterns evolve frequently
- **experimental-but-awesome** – Not proven yet, but too interesting to ignore

### Why Maturity Matters

In a fast-moving field like agentic AI, maturity tracking is crucial because:

- **Early adoption risk**: Emerging patterns may have hidden failure modes
- **Stability vs innovation**: Production systems need established patterns; R&D needs experimental ones
- **Investment decisions**: Where do you invest engineering resources?
- **Expectation setting**: What can you realistically expect from a pattern?

### The "Rapidly-Improving" Category

This status acknowledges that some areas of agent development are moving so fast that patterns have short half-lives. Something that's best-practice today might be superseded in six months.

Examples include inference optimization, token budgeting strategies, and some aspects of tool design.

### The "Experimental-but-Awesome" Category

Some patterns are too promising to ignore despite limited validation. They might be:

- Novel approaches from cutting-edge research
- Patterns from a single visionary team
- Techniques that work spectacularly in specific contexts

The label signals: "This is exciting, but proceed with caution and validate for your use case."

---

## Practical Takeaways: How to Start

You've just absorbed a comprehensive guide to agentic patterns. Where do you actually start?

### Step 1: Pick Three Patterns

Don't try to adopt 113 patterns at once. Pick three that address your immediate challenges:

**If you're building your first agent:**
- [Inversion of Control](https://agentic-patterns.com/patterns/inversion-of-control/) (orchestration)
- [Reflection Loop](https://agentic-patterns.com/patterns/reflection/) (quality)
- [Chain-of-Thought Monitoring](https://agentic-patterns.com/patterns/chain-of-thought-monitoring-interruption/) (visibility)

**If you're scaling an existing agent:**
- [Skill Library Evolution](https://agentic-patterns.com/patterns/skill-library-evolution/) (knowledge persistence)
- [Plan-Then-Execute](https://agentic-patterns.com/patterns/plan-then-execute-pattern/) (reliability)
- [Spectrum of Control](https://agentic-patterns.com/patterns/spectrum-of-control-blended-initiative/) (collaboration)

**If you're focused on security:**
- [Lethal Trifecta Threat Model](https://agentic-patterns.com/patterns/lethal-trifecta-threat-model/) (security framework)
- [Compartmentalization](https://agentic-patterns.com/patterns/tool-capability-compartmentalization/) (tool design)
- [PII Tokenization](https://agentic-patterns.com/patterns/pii-tokenization/) (privacy)

### Step 2: Implement, Observe, Iterate

Patterns aren't plug-and-play. They require adaptation to your specific context:

1. **Implement the pattern** in your environment
2. **Observe how it behaves** with your actual workload
3. **Iterate on the implementation** based on what you learn
4. **Document your learnings**—even failures are valuable

### Step 3: Build Your Pattern Library

As you gain experience, you'll discover patterns of your own:

1. Notice recurring solutions in your agent implementations
2. Extract the core pattern (problem → solution → trade-offs)
3. Document with examples and references
4. Contribute back to the community

The growth of this repository from 0 to 113 patterns happened because teams shared their learnings. Your patterns could help others.

### Step 4: Stay Current

This field moves fast. "Rapidly-improving" patterns today might be "established" or "best-practice" tomorrow. Or completely superseded.

- Watch the repository for new patterns
- Follow the thought leaders who share openly (Anthropic, Sourcegraph, Cognition, Will Larson, Simon Willison)
- Experiment with emerging patterns in low-stakes contexts
- Share your own discoveries

---

## The Future: What's Missing, What's Next

The 113 patterns in this collection represent the state of agentic AI in early 2026. But the frontier is moving. What's missing?

### Gaps and Opportunities

**Small categories that should grow:**
- **Security & Safety** (3 patterns) – Will expand as agents become more deployed
- **Learning & Adaptation** (5 patterns) – The holy grail of agents that actually improve

**Underexplored areas:**
- Multi-modal agents (beyond text and code)
- Long-running autonomous agents (hours/days, not minutes)
- Agent-to-agent communication protocols
- Economic models for agent resource allocation
- Legal and compliance frameworks for agent actions

### The Next Wave

The next major evolution is likely in **agent learning**. Current agents are mostly static—they don't fundamentally improve from experience. [Agent RFT](https://agentic-patterns.com/patterns/agent-reinforcement-fine-tuning/), [skill libraries](https://agentic-patterns.com/patterns/skill-library-evolution/), and [compounding patterns](https://agentic-patterns.com/patterns/compounding-engineering-pattern/) point toward agents that:

- Learn from every interaction
- Build institutional knowledge over time
- Share skills across agent instances
- Improve without manual fine-tuning

This is the transition from "smart tools" to "genuinely intelligent systems."

---

## Conclusion: The Holidays Are Over, The Revolution Continues

The Christmas 2025 spike in interest was real, but it was just the beginning. Those 2,500 GitHub stars and the explosion of developer interest represent a collective "aha moment"—the realization that AI agents are production-ready when you have the right patterns.

But patterns alone aren't enough. The real work is:

- **Understanding your domain** well enough to know where agents fit
- **Building the tooling** and infrastructure that makes agents productive
- **Developing the judgment** to know when to trust the agent and when to intervene
- **Cultivating the patience** to iterate through failures to reach reliable systems

This collection of 113 patterns is a map, but you still have to walk the territory.

### This Is Still Day One

As impressive as the current state of agentic AI is, we're remarkably early. The patterns validated in 2026 will seem primitive by 2028. Agents that seem cutting-edge today will be table stakes tomorrow.

The teams that win will be the ones who:
- Learn faster by sharing patterns openly
- Fail faster by iterating quickly
- Build on shared knowledge instead of reinventing
- Stay curious as the frontier advances

### Your Next Step

You've just read a comprehensive guide to agentic patterns. The most valuable next step is to **actually use one**.

Pick a pattern. Implement it. Watch it fail. Fix it. Watch it succeed. Then share what you learned.

The best time to start exploring agents was during the holidays. The second best time is now.

---

**Explore the full collection:** [agentic-patterns.com](https://agentic-patterns.com)

**Contribute your patterns:** [github.com/nibzard/awesome-agentic-patterns](https://github.com/nibzard/awesome-agentic-patterns)

---

*Written in early 2026 based on the collective wisdom of teams shipping agents to production. If you found this valuable, share it with someone navigating the agentic AI frontier.*
