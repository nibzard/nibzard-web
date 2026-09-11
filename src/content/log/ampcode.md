---
title: "What Sourcegraph learned building AI coding agents"
description: "Real-world insights from Sourcegraph's journey building AI coding agents that actually work."
tldr: "AI coding agents work best with inversion of control, curated context over comprehensive, usage-based pricing for real work, emergent behaviors over engineered features, rich feedback loops, and agent-native workflows. The revolution is here--adapt or be displaced."
date: 2025-05-28
updated: 2025-07-27
tags: [HUMAN, EXPERIENCE, AI, AGENTS]
draft: false
author: "Nikola Balić"
topics: [AI coding agent development, Sourcegraph experience, inversion of control, context management, multi-model orchestration]
entities: [Sourcegraph, Quinn Slack, Thorsten Ball, Amp Code, Claude Sonnet 4, OpenAI o3, Gemini 2.5 Pro, RBCR]
answers_questions:
  - What makes AI coding agents work in production versus demos?
  - How do you design context management for autonomous agents?
  - Why does inversion of control matter for AI agent effectiveness?
---

*What happens when you stop talking about AI and start shipping with it?*

The autonomous AI coding is here. But it doesn't look like what most people think.

While the tech world obsesses over benchmark scores and whether GitHub Copilot will replace programmers, a team at Sourcegraph has been building something different: an AI coding agent that works in practice, not just in demos.

I've been listening to Quinn Slack and Thorsten Ball document their journey in [**"Raising an Agent"**](https://www.youtube.com/watch?v=Cor-t9xC1ck&list=PL6zLuuRVa1_iUNbel-8MxxpqKIyesaubA), a real-time diary of building an AI-powered coding assistant. And what emerges runs against the usual assumptions about AI tools.

Most AI coding products feel like expensive toys. Here's why theirs doesn't.

<div class="alert alert-warning">
  NOTE: This article was generated with assistance from Gemini 2.5 Pro (summaries) and Claude 4 Sonnet (writing) with human editing. Source material: <a href="https://gist.github.com/nkkko/f1ad5e9122ab97b4ed5555f3d22b9c68">Raising an Agent Podcast Summary</a>.
</div>

![Amp Code](/images/250528_ampcode.jpg)

## The inversion of control: stop micromanaging your AI

The biggest shift is psychological.

Most developers approach AI like fancy autocomplete: craft the perfect prompt, get the perfect code. This is backwards.

"There's a significant mindset shift from traditional prompting to an agentic approach," Thorsten observes.

<div class="featured-quote primary">
<p>It's a big bird, it can catch its own food... you just have to present it with the food somehow.</p>
</div>

This "inversion of control" means giving the AI tools and high-level goals. Then letting it figure out the orchestration.

The difference is profound.

**Traditional model:** You're a puppeteer controlling every movement.

**Agentic model:** You're a product manager setting objectives and letting your team figure out execution.

The AI decides which files to examine, what tools to use, how to self-correct when things go wrong.

This requires genuine trust. Which most developers aren't ready for.

We're control freaks by nature. Trained to distrust magic. But the magic is in rich feedback loops and iterative correction.

Blink, and you might miss it.

## Context is sacred, but not how you think

Every AI discussion eventually devolves into context windows and token limits.

But the insight is curation: what goes into the context matters more than how much.

<div class="featured-quote secondary">
<p>Whatever is in the agent's context window heavily biases its output... irrelevant or misleading information can derail it.</p>
</div>

This led them to create specialized sub-agents with their own context windows. Preventing the main agent from being "dirtied" by noisy intermediate steps.

Think of context like a surgical operating room: sterile, purposeful, containing exactly what's needed for the procedure.

Most AI tools dump everything they can find into context, hoping more information equals better results.

<div class="featured-quote unattributed">
<p>Curated context beats comprehensive context. Every time.</p>
</div>

The best AI coding experiences feel less like feeding a hungry model and more like briefing a competent colleague. You provide essential background, point to relevant examples, trust them to ask good questions.

## The "no token limit magic" is real

An uncomfortable truth threatens the entire pricing model of AI tools:

The prototype that Quinn and Thorsten built, now a product called [Amp](https://ampcode.com/manual), works so well partly because they ignored cost optimization entirely.

While other tools aggressively compress prompts and limit context to control expenses, their agent had free rein to think, reason, iterate.

<div class="featured-quote primary">
<p>A key reason for the prototype's current effectiveness is the lack of aggressive optimization for token limits. This allows the agent to use more context, perform more internal reasoning steps, and self-correct.</p>
</div>

This creates a business model crisis.

How do you offer flat-rate pricing when your best experience costs $5-15 per generated pull request?

Quinn spent $1000 in a month of prototype usage. Which mirrors my own experience over the past few months, with average spending hovering around $500. Costs that would be prohibitive for most consumer AI products but trivial compared to developer salaries.

<div class="featured-quote accent">
<p>The implication is stark: usage-based pricing isn't a bug, it's a feature.</p>
</div>

The most powerful AI coding tools will cost real money because they do real work. The $20/month subscription model works for chat interfaces and simple autocomplete. But breaks down when AI agents start replacing hours of human labor.

## The oracle and the worker: a multi-model approach

The Sourcegraph team's latest breakthrough is a system for using multiple models strategically. They've implemented an ["Oracle" pattern](https://agentic-patterns.com/patterns/oracle-and-worker-multi-model/) that challenges the idea of a one-size-fits-all AI.

The architecture is simple:

**The Worker (Claude Sonnet 4):** A fast, capable, and cost-effective agent that handles the bulk of the tool use and code generation.

**The Oracle (OpenAI o3 / Gemini 2.5 Pro):** A more powerful, "smarter" (and more expensive) model used for high-level reasoning, architectural planning, and debugging complex issues.

The main agent can be explicitly told to "Ask the oracle" when it gets stuck or needs a better strategy.

<div class="featured-quote primary">
<p>The Oracle sub-agent reviews the main agent's work and suggests a better solution. This allows for high-level course correction without polluting the main agent's context with extensive exploration.</p>
</div>

The approach creates a team of specialized AIs instead of leaning on one model's strengths. Frontier models stay reserved for the tasks where their advanced reasoning matters most, which keeps the cost manageable.

## The grain of the model: why AI lab philosophies matter

The differences between AI models run deeper than benchmarks suggest. Sourcegraph's journey shows that each major AI lab embeds distinct philosophies into their models through intentional choices during training and reinforcement learning.

<div class="featured-quote primary">
<p>The specific capabilities and behavioral tendencies of an LLM—its "grain"—are shaped by intentional choices during pre-training, fine-tuning, and RL.</p>
</div>

**Anthropic's Philosophy:** Building "practical iterative agents" that excel at figuring things out through environmental feedback. Think of Claude Sonnet 4 as a coding partner that tries, fails, learns, and tries again, rather than a one-shot code generator.

**The Alternative Approach:** Other models may be optimized more for zero-shot, single-turn generation: impressive in demos, less adaptable when things go wrong.

This philosophical difference shows up in practice. Thorsten notes that Claude Sonnet 4 is significantly more "eager" to use tools, especially spawning sub-agents for complex tasks. When editing YAML frontmatter across 36 blog posts, it intelligently used `glob` then *spawned four separate sub-agents* to distribute the workload.

<div class="featured-quote secondary">
<p>Each sub-agent operates within its own context window. The main agent doesn't get overwhelmed by processing all 36 files—it only needs to manage the sub-tasks.</p>
</div>

Understanding a model's "grain" matters for choosing the right tool. The future is matching model philosophies to specific use cases, not one model to rule them all.

## Emergent behaviors trump engineered features

The most exciting capabilities weren't planned.

They emerged from giving the AI sufficient autonomy and feedback.

When Thorsten asked the agent to build a recording feature, it didn't just generate the code. It provided a testing plan. When an edit failed, the agent tried alternative approaches, added debug statements, fixed its own bugs.

### The sub-agent revolution

But the real breakthrough came with sub-agents: AI systems spawning other AI systems to handle parallel work.

This wasn't an engineered feature. It emerged when the AI realized it could decompose complex tasks and distribute them across multiple context windows.

The YAML frontmatter editing example is telling: instead of trying to process 36 files sequentially within a single context window, Claude Sonnet 4 automatically spawned four sub-agents. Each agent got a fresh context window and handled roughly 9 files.

This sub-agent strategy solves one of the biggest limitations of current AI systems: context window management for complex, multi-file operations.

<div class="featured-quote secondary">
<p>Each sub-agent operates within its own context window. The main agent doesn't get overwhelmed by processing all 36 files—it only needs to manage the sub-tasks.</p>
</div>

<div class="featured-quote secondary">
<p>The agent sometimes performs tasks or uses tools in ways the developers didn't explicitly design for but are highly effective.</p>
</div>

Traditional software development focuses on defined interfaces and predictable behavior. AI agents thrive on flexibility and emergence.

The tension between these approaches will define the next generation of development tools.

The lesson: build platforms, not products. Create environments where AI can surprise you, rather than rigid workflows that constrain it.

## The background agent: AI that works while you sleep

The next frontier is asynchronous AI.

Quinn and the Sourcegraph team are building background agents that can work on complex, long-running tasks (10-15+ minutes) without requiring constant supervision.

You're at your kid's soccer game. You pull out your phone, describe a feature you want built, kick off a background agent, and get results when you're ready to look.

<div class="featured-quote primary">
<p>The ability to delegate longer-running, complex tasks to an agent that works asynchronously represents a fundamental shift in how we think about development work.</p>
</div>

**The feedback loop problem**

But how do you give an AI rich feedback when you're not actively supervising it?

The answer: Continuous Integration.

Background agents push code, CI runs tests and linters, and the agent uses this pass/fail diagnostic output to iterate and improve. This is more practical than trying to perfectly replicate every developer's complex local environment in a cloud sandbox.

<div class="featured-quote secondary">
<p>Using existing CI as the feedback mechanism is more scalable and often already in place. The asynchronous nature makes CI latency acceptable.</p>
</div>

This approach mirrors a broader insight about agent environments: perfect replication is less important than effective feedback loops.

**The cloud IDE analogy**

Quinn draws a telling parallel to Cloud IDEs. In theory, they offer perfect, consistent environments accessible anywhere. In practice, adoption has been limited outside of tech giants like Meta and Google.

The problem isn't technical capability. It's the "long tail" of issues: missing extensions, flaky language servers, incompatibility with local tools. Cloud IDEs often become the neglected third wheel in development workflows.

The implication for AI agents: focus on pragmatic feedback mechanisms that actually work, rather than trying to replicate perfect development environments for every interaction.

Background agents represent the evolution from "AI as a better autocomplete" to "AI as a remote team member."

## The human as strategist, not just prompter

As the agents become more capable, the human's role evolves. The [latest videos](https://youtu.be/hAEmt-FMyHA?si=LOAy9xZZSLLKjP6B) show Thorsten moving beyond simply assigning tasks to actively directing the agent's strategy.

He now gives meta-instructions that shape the problem-solving process itself:

**"Use as many subagents as you want."** - This explicitly encourages the agent to parallelize its workload, a key to solving complex refactoring tasks efficiently.

**"Ask the oracle whether there isn't a better solution."** - This prompts the agent to use its multi-model capability for strategic review, leveraging a more powerful model for a second opinion.

<div class="featured-quote secondary">
<p>This is the next level of human-AI collaboration. The developer becomes an architect and a manager, guiding a team of agents, choosing the right tools (and models) for the job, and intervening at strategic moments.</p>
</div>

The goal shifts from crafting the perfect initial prompt to building an intuition for when to let the agent work autonomously, when to nudge it with a suggestion, and when to bring in a specialist "oracle" to rethink the entire approach. This is the learnable skill of "Raising an Agent."

## The evolution of human-agent collaboration

Thorsten's workflow has evolved significantly since the early days of letting the agent "rip" on entire features.

His new collaborative model reveals how human-AI partnerships actually work in practice:

1. The agent implements a rough version of Thorsten's architectural idea
2. The human manually refines and "moves the guardrails," a nuanced process that's hard to capture in a single prompt
3. The agent handles focused tasks like UI components or type fixing

<div class="featured-quote accent">
<p>The most effective human-agent collaboration isn't about perfect prompts—it's about iterative refinement and clear division of labor.</p>
</div>

This pattern suggests that the future of AI coding is collaboration rather than replacement: humans handle high-level architecture and nuanced refinement, while AI handles implementation and focused tasks.

Humans are still better at "moving guardrails": the subtle adjustments that emerge from deep understanding of context, user needs, and system constraints.

## The death of perfect code

AI also changes our relationship with code quality itself.

When code becomes "cheaper" to generate, the value equation changes fundamentally.

<div class="featured-quote primary">
<p>Code exists on a spectrum from beautifully handwritten to large, autogenerated files. AI will push more code towards the generated end, but it's generated by an agent and modifiable by an agent.</p>
</div>

This doesn't mean embracing sloppiness; it means redefining what matters.

Worrying about camel case versus kebab-case becomes irrelevant when you're operating at the level of architectural decisions and system design. The developer's role shifts from "typing code" to "drawing the lines" for the AI to fill in.

Traditional "bad code" concerns stem from human misunderstanding that could be repeated and scaled. AI-generated "bad code" is different: more random than systematic, often easily fixed with better instruction rather than fundamental rethinking.

## Rich feedback beats perfect prompts

The AI coding tools that work in practice prioritize feedback loops over prompt engineering.

Instead of crafting the perfect initial instruction, successful teams focus on giving AI rich, iterative feedback: compiler errors, test results, diagnostics, real-world validation.

<div class="featured-quote accent">
<p>Instead of perfecting prompts, it's more effective to give the agent rich, iterative feedback.</p>
</div>

This mirrors how human developers actually work. We rarely get things right the first time. But we're good at incorporating feedback and iterating toward solutions.

The best AI coding experiences feel conversational rather than transactional. The AI proposes, you respond, it adjusts, you clarify, it refines.

It requires patience and a different mental model than traditional tools, but produces dramatically better results.

## The future belongs to agent-native workflows

Current codebases and development workflows were designed for human limitations: linear thinking, limited working memory, sequential task execution.

AI agents have different constraints and capabilities. Which means our tooling and practices need to evolve.

<div class="featured-quote primary">
<p>Codebases will adapt to agents. The incentive to create an agent-friendly environment is high because agents can potentially provide massive productivity gains.</p>
</div>

This means changes to how we structure projects, manage dependencies, and define interfaces, not just better documentation or cleaner APIs.

Agent-native development might include:
- Richer diagnostic tooling that AI can interpret
- More granular test suites that provide specific feedback
- Codebases structured for AI comprehension, not just human readability
- Git workflows that capture intent and context, not just changes

Models are improving so quickly that investing heavily in a specific UI paradigm might lead to it becoming outdated as model capabilities change how users want to interact.

## The social layer matters more than the technical layer

One of the most surprising insights from the Sourcegraph team's journey: adoption depends on social proof and shared learning more than technical capability.

Developers need to see other developers using these tools successfully before they'll trust them with real work.

<div class="featured-quote secondary">
<p>Seeing how others successfully prompt and use the agent is vital for wider adoption and learning.</p>
</div>

This mirrors the early days of Git. Shared workflows and best practices mattered as much as the underlying technology.

The implication: AI coding tools succeed or fail on community and culture as much as technical capability.

The best tools will be those that facilitate learning and knowledge sharing, not just code generation.

## What this means for developers

These lessons point to a near future where AI fundamentally changes what development work looks like.

The successful developers of tomorrow won't be those who can type code fastest or memorize the most APIs. They'll be those who can effectively guide and collaborate with AI systems.

This requires a new skill set:
- Product thinking over implementation details
- Systems architecture over syntax mastery
- Feedback and iteration over perfect first attempts
- Trust and delegation over control and micromanagement

The transition won't be comfortable. It requires abandoning deeply held beliefs about craftsmanship, control, the value of hand-written code.

But the productivity gains are too significant to ignore. The competitive advantage too large to cede to others.

## The uncomfortable truth

What the AI coding revolution actually looks like:

<div class="featured-quote unattributed">
<p>Not the replacement of programmers. The transformation of programming into something closer to product management and system design.</p>
</div>

The tedious work of translating ideas into syntax becomes automated. The creative work of solving problems and architecting solutions becomes more important than ever.

This is simultaneously liberating and terrifying.

Liberating because it frees us from the drudgery of boilerplate and syntax errors. Terrifying because it challenges core assumptions about what makes a good developer and what programming work is worth paying for.

We're witnessing the fastest consolidation in the history of developer tooling.

The teams and companies that embrace this shift early (accepting higher costs for better outcomes, building agent-native workflows, developing new collaboration patterns) will have significant advantages over those clinging to traditional approaches.

The AI coding revolution is already here.

The question isn't whether it will change how we work, but whether we'll adapt quickly enough to benefit from it rather than be displaced by it.

---

<div class="featured-quote accent">
<p><em>The future of coding isn't about humans versus AI--it's about humans with AI versus humans without it. The choice of which side to be on is still ours to make.</em></p>
</div>

*Blink, and you might miss it.*

## Practical tips for AI-driven development

From Sourcegraph's real-world experience building with AI agents:

**Browser Interactions**
Use a Playwright MCP (Multi-Client Proxy) server to allow agents to take screenshots and iterate on UI changes in real-time. This creates a rich feedback loop for visual development.

**UI Development**
Implement simple Storybook pages (even static HTML) for UI iteration. Amp's [storybook page](https://ampcode.com/storybook) demonstrates how effective this can be for agent-driven UI development. I did something very similar for this blog, I have just called it [elements](https://nibzard.com/elements).

**Authentication Bypass**
Use environment variables (like `USERNAME=auth_bypass`) to allow agents to navigate local development applications without handling complex auth flows. Simplicity enables agent effectiveness.

**Seed Data Generation**
Give agents `psql` access and ask them to generate seed data for development databases. This removes friction and lets agents work with realistic data scenarios.

<div class="featured-quote secondary">
<p>The best AI coding setups remove friction and provide rich feedback loops, not perfect replication of human workflows.</p>
</div>

These practical patterns emerge from hundreds of hours of real agent usage. They prioritize agent effectiveness over theoretical purity.