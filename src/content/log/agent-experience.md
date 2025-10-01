---
title: "AI Agents Just Need Good --help"
description: "Clear CLI documentation is your agent API. Vague help text costs 2x more in API calls and failed automations."
date: 2025-08-17
tags: [HUMAN, CLI, AI, AGENTS, DOCUMENTATION, API]
tldr: "AI agents succeed or fail based on your --help text. Clear command structure, explicit success signals, and structured output options make the difference between one API call and five retries."
draft: false
author: "Nikola Balić"
source_url:
  html: https://nibzard.com/agent-experience
  md: https://nibzard.com/agent-experience.md
---

AI agents don't need fancy MCP. They need good `--help`.

Watch an agent try to use your CLI tool. It reads the help text once, then executes commands based on that understanding. No trial and error. No man pages. No 100 MCP tool calls. Just `--help` and go.

If your help text is clear, the agent succeeds in one try. If it's ambiguous, the agent burns API calls retrying commands, asking for clarification, or parsing confusing output.

This isn't theoretical. I've watched agents struggle with tools that humans love. A deployment CLI with friendly messages like "Hang tight..." followed by "Hooray! Your site is live!" leaves agents guessing. Did it work? Is there more output coming? Should it wait?

The same deployment with `--json` output and clear exit codes? The agent nails it every time.

## What Makes a Good CLI for Agents

Your `--help` text is your API contract with agents. Here's what works:

**Clear command structure:**
```
$ deploy --help
Usage: deploy [OPTIONS] <directory>

Options:
  --format <json|text>     Output format (default: text)
  --wait                   Wait for deployment to complete
  --url-only              Only output the final URL
  
Exit codes:
  0: Success
  1: Invalid arguments
  2: Deploy failed
```

**Bad help text** is vague:
- "Deploy your awesome project!"
- "Various options available"
- No mention of output format or exit codes

**Good help text** is specific:
- Exact argument formats
- All possible flags
- Clear exit code meanings
- Output format options

## Why CLI Beats MCP

[Mario Zechner tested this](https://mariozechner.at/posts/2025-08-15-mcp-vs-cli/). He compared MCP servers against CLI tools across multiple tasks, measuring token usage, time, and success rates. The results were clear: CLIs often outperform MCPs.

**MCP problems:**
- Many MCPs "flood the context window with unnecessary output"
- Too many tools in one MCP "degrade agent performance"
- MCPs often reimplement functionality that CLIs already provide better

**Example: GitHub workflows**
- GitHub MCP server: Verbose output, multiple tools, context pollution
- GitHub CLI (`gh`): Clean commands, structured output, familiar patterns

The agent doesn't get frustrated. It just burns your budget.

## Token Efficiency Matters

Every word in your help text takes context space. Verbose documentation pollutes the agent's working memory, leaving less room for actual problem-solving. Concise help text means the agent can focus on the task, not parsing unnecessary fluff.

## Three Rules for Agent-Friendly CLIs

**1. Make success explicit**
```bash
# Bad: Silent success
$ deploy ./app
(no output)

# Good: Clear success signal  
$ deploy ./app
{"status": "success", "url": "https://app-xyz.com", "deploy_id": "d123"}
```

**2. Provide structured output**
```bash
# Add --json to everything
$ status --json
{"status": "running", "uptime": 3600, "memory_mb": 512}

# Not this
$ status  
App is running great! Memory usage looks good.
```

**3. Document your exit codes**
```
Exit codes:
  0: Success
  1: Invalid arguments  
  2: Authentication failed
  3: Network error
  4: Resource not found
```

Agents parse exit codes faster than text. Use them.

## Common Agent Failures

Testing CLI tools with agents reveals these patterns:

**Authentication flows** - Browser redirects kill agents. Provide API keys or token-based auth instead.

**Progress indicators** - Spinners and progress bars are invisible to agents. Use `--verbose` with line-by-line updates.

**Interactive prompts** - "Do you want to continue? (y/n)" breaks agent workflows. Add `--yes` flags.

**Ambiguous errors** - "Something went wrong" tells agents nothing. Return specific error codes and messages.

**Context-aware help** - Show different help based on current state. A CI environment might expose different flags than a local development setup.

## Design for Both

You don't have to choose between human and agent users:

```bash
# Human-friendly default
$ deploy
✨ Deploying your app...
🚀 Live at https://app-xyz.com

# Agent-friendly option  
$ deploy --json
{"status": "success", "url": "https://app-xyz.com", "deploy_id": "d123"}
```

Add `--json`, `--quiet`, and `--yes` flags to existing tools. Agents will use them. Humans will stick with the defaults.

## The CLI Advantage

Mario's evaluation revealed a crucial insight: many MCPs produce "much worse results than just letting the agent run the command line tool directly." This isn't surprising when you consider:

**CLIs are already in training data** - Models learned CLI patterns from millions of examples. They understand `git status`, `docker ps`, and `npm install` without explanation.

**MCPs create abstraction overhead** - Each MCP introduces new tool names, schemas, and behaviors. Agents must learn these from scratch in every conversation.

**Single purpose wins** - A focused CLI tool beats a Swiss Army knife MCP with dozens of functions. Fewer choices mean better decisions.

## The Competitive Edge

Companies with agent-friendly CLIs have an advantage. When agents can use your tools reliably on the first try, you capture more automation workflows. When they struggle with unclear interfaces, they move to competitors with better documentation.

## Security for Agent Workflows

Design CLIs with agent access patterns in mind:

**API-first authentication** - Use tokens instead of browser flows. Agents can't click through OAuth screens.

**Scoped permissions** - Let agents authenticate with limited access. A deployment agent doesn't need billing permissions.

**Audit trails** - Log agent actions differently from human actions. You need to know what automated tools are doing.

## When MCP Makes Sense

MCPs aren't always wrong. They work when:
- No CLI tool exists
- Existing CLIs are too verbose or complex
- You need stateful interactions
- The client lacks shell access

But most of the time, a well-designed CLI is simpler, faster, and more reliable.

## The Bottom Line

Good `--help` text isn't just documentation. It's your agent API. Models already know how to use CLI tools. Don't force them to learn a new abstraction layer when the command line works perfectly.

Skip the MCP. Build a better CLI.