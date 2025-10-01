---
title: "The Agent is The Loop"
description: "How the llm-loop-plugin transforms AI from a responsive tool into an autonomous agent that iterates until done."
tldr: "The llm-loop-plugin gives Simon Willison's LLM CLI the ability to loop and iterate autonomously. Instead of being a bottleneck feeding prompts one by one, you can set a goal and watch it work file by file until complete. The magic isn't in the AI model—it's in the loop."
date: 2025-06-07
tags: [HUMAN, INSIGHT, AI, TOOLS]
draft: false
author: "Nikola Balić"
source_url:
  html: https://nibzard.com/theloop
  md: https://nibzard.com/theloop.md
---

There's a moment when a tool stops being a tool and becomes an agent.

For most people, that moment with AI happens in a chat interface. You ask, it answers. You ask again, it answers again.

But what if it could just... keep going?

Simon Willison recently added [tool support to LLM 0.26](https://simonwillison.net/2025/May/27/llm-tools/), enabling models to execute functions and access external capabilities. This was the inspiration for taking it one step further.

The [llm-loop-plugin](https://pypi.org/project/llm-loop-plugin/) does something deceptively simple: it gives Simon Willison's incredible llm CLI the ability to loop. To keep working. To iterate until done.

![The llm-loop-plugin](/images/20250607-llm-loop.jpeg)

Instead of:
- "Write me a Python function"
- Copy the output
- "Now test it"
- Copy that output
- "Now fix the bug"
- Repeat...

You get:
`llm loop "Create a Flask web app with a homepage and about page"`

And it actually does it. File by file. Until it's done.

This is the difference between a calculator and a mathematician.

Between a typewriter and a writer.

Between asking for directions and having a guide.

The magic isn't in the AI model. The magic is in the loop. (well, truth be told, it is in the model)

The ability to persist. To iterate. To work autonomously toward a goal rather than just respond to prompts.

Most AI tools make you the bottleneck--constantly feeding them the next instruction.

The loop removes you from the critical path.

It lets the AI be what it was meant to be: not just intelligent, but **agentic**.

Install the [llm-loop-plugin](https://pypi.org/project/llm-loop-plugin/) and give your [LLM CLI](https://llm.datasette.io/) superpowers:

```bash
llm install llm-loop-plugin
```

Then watch it work:
```bash
llm loop "Create a Flask web app with homepage and about page"
```

LLM is just waiting for you to close the loop.

## Join the Loop

The [llm-loop project is open source on GitHub](https://github.com/nibzard/llm-loop). Whether you want to report bugs, suggest features, or contribute code, your involvement helps make autonomous AI more accessible to everyone.