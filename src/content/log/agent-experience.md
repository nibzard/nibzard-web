---
title: "The Empty Terminal: From User Experience to Agent Experience"
description: "How CLI design must evolve from human-friendly to agent-friendly interfaces in the age of AI automation."
date: 2025-08-17
tags: [UX, AI, CLI, AGENTS, DEVELOPER-TOOLS]
tldr: "The shift from User Experience to Agent Experience requires fundamental changes in CLI design. Tools built for human convenience confuse AI agents with ambiguous outputs, conversational text, and implicit success signals. The future belongs to deterministic, structured, token-efficient interfaces."
draft: false
---

The command line was a secret language.

It was a world of precision. Of pipes and redirects. Of muscle memory baked into fingertips. For fifty years, we built tools for ourselves. We, the builders, the system administrators, the developers. We crafted CLIs with an implicit understanding of the human on the other side. A legacy deployment tool, with its colorful progress bars and friendly, conversational output, felt like the pinnacle of this craft.

Then we gave it to an agent.

We gave it a simple task: deploy the application and confirm the final URL. The agent started. The tool replied, "Okay, starting your build! Hang tight..." The agent waited. It saw a spinner, a series of log lines, and finally, "Hooray! Your site is live at `example-123.app`." To a human, this is a clear success. To the agent, it was ambiguous. It was a token mess. Was "Hooray!" the signal? Was the URL on the last line the definitive output, or was there more? It took another turn, another API call, just to ask, "Are you done?"

It wasn't a bug in the tool. It wasn't a flaw in the agent. It was a category error. The tool was speaking a dialect of human convenience. The agent needed a language of pure, predictable logic. This is the heart of a new discipline.

## The New Rules of the Craft

Matt Biilmann of Netlify gave it a name: **AX**, or [Agent Experience](https://biilmann.blog/articles/introducing-ax/). It's a fundamental shift in how we must think about our interfaces. The old rules of UX, designed to delight and guide a human, are being replaced by the stark requirements of a machine. The contrast is not subtle.

| User Experience (UX) | Agent Experience (AX) |
| :--- | :--- |
| **Values discoverability:** Helpful `--help` text, intuitive subcommands. | **Values predictability:** Deterministic outputs, strict APIs, zero ambiguity. |
| **Values helpful dialogue:** Friendly error messages, conversational prose. | **Values structured data:** Machine-readable errors (JSON), meaningful exit codes. |
| **Adheres to the Unix philosophy:** "Silence is success." No output means it worked. | **Requires an explicit signal:** "Success must be stated." Silence is unknown. |
| **Values rich feedback:** Colorful spinners, detailed progress logs. | **Values token efficiency:** Minimalist output, every character has a cost. |
| **Goal: Make the human feel smart.** | **Goal: Make the agent's job simple.** |

This is not a theoretical problem. We need the methods to measure it.

## The New Discipline of Measurement

To build for this new world, we need a new discipline of evaluation. It requires two distinct instruments.

First, we need a stethoscope. A way to measure the friction of an interaction. This is a qualitative art. It requires a framework that can run an agent through a task and then analyze the full execution trace. It looks for moments of confusion: where did the agent get stuck? Did it have to retry a command? Did it misuse a flag because the help text was unclear? From these observations, we can generate a score—a grade that tells us how a tool *feels* to an agent. It measures the pain.

But feel is not enough. We need a ledger.

This is the quantitative science, shown in the methodical benchmark work of engineers like [Mario Zechner](https://mariozechner.at/posts/2025-08-15-mcp-vs-cli/). He didn't just measure success; he measured the cost. He proved that a confusing interface is an expensive one. In his tests, a tool that forced an agent to take extra steps could more than double the cost of completing a task. The agent's bar tab is real, and it's paid in API calls, wasted time and polluted context. This approach measures the price.

A complete benchmark requires both. The stethoscope tells us *why* the agent struggled. The ledger tells us *how much* that struggle cost.

## Designing for the Empty Terminal

The logical conclusion is that we must start designing for a new user. **A user who is fast, literal, and has a budget.** A user who will never appreciate a clever animation but will reward a tool that returns clean JSON.

The great developer tools of the next decade will be built differently.

They will honor the spirit of the Unix philosophy—no unnecessary chatter—but will break its cardinal rule. For an agent, silence is not success. Silence is ambiguity. Success must be stated, clearly and concisely.

They will not have a sprawling, multi-page `man` file. They will have a concise tool definition that can be consumed in a single prompt.

They will not return a flowery, human-readable paragraph upon success. They will return a single line of structured data with an exit code of 0.

This is the craft of Agent Experience. It is a return to a kind of minimalism. A focus on designing clean, deterministic, and token-efficient interfaces for a user that doesn't have hands. A user that sits alone, in the empty terminal.

<blockquote class="featured-quote primary">
The craft is not gone. It has changed. We are no longer building for our hands. We are building for a new kind of mind.
</blockquote>

## The Practical Implications

I've tested dozens of CLI tools with AI agents through [AgentProbe](/agentprobe). The results are stark. Tools designed for human convenience consistently confuse agents:

- Authentication flows requiring browser interaction
- Success states indicated only by visual cues
- Error messages lacking actionable specificity
- Multi-turn wizards instead of single commands

The cost is measurable. A simple deployment that takes a human 30 seconds can require 20+ agent turns and multiple API calls. The monetary cost matters, but the real cost is reliability.

## Building for Both Worlds

The future isn't about choosing between human-friendly and agent-friendly design. The winners will master both.

Consider these parallel design principles:

**For humans**: Rich help text, intuitive workflows, forgiving error recovery.

**For agents**: Structured output modes, deterministic behavior, explicit success signals.

A well-designed CLI in 2025 offers both paths. `--json` flags for structured output. `--quiet` modes that speak only success or failure. Clear exit codes that agents can parse without ambiguity.

The tools that embrace this duality won't just survive the agent revolution—they'll become force multipliers in it.

## The Empty Terminal Awaits

The terminal is becoming empty of human hands, but it's filling with artificial minds. They think differently. They parse differently. They succeed and fail by different rules.

The craft of building for them is just beginning. It requires new principles, new measurements, and new empathy for users who experience our tools as streams of tokens rather than visual interfaces.

The command line was a secret language between humans and machines. Now we must teach it to speak to the machines themselves.