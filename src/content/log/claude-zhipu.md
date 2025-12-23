---
title: "Claude-Zhipu Parallel CLI Setup"
description: "Complete setup guide for running Claude Code CLI with Zhipu API alongside your existing Anthropic installation"
tldr: "This setup allows you to use Claude Code CLI with Zhipu's API (api.z.ai) in parallel with your existing Claude Max / Anthropic CLI installation using a separate command called claude-zhipu."
date: 2025-12-23
tags: [CHEATSHEET, Claude, CLI, API, featured]
draft: false
author: "Nikola Balić"
topics: [Multi-API setup, Claude Code configuration, parallel CLI installations, API provider switching]
entities: [Claude Code, Zhipu AI, GLM-4.7, Anthropic, Node.js, npm]
answers_questions:
  - How do you run multiple Claude Code instances with different API providers?
  - What's the complete setup for using Zhipu's API with Claude tools?
  - How can you maintain parallel AI coding environments without conflicts?
---

> **📡 Updated Guide**: This article has been updated to reflect the release of **GLM-4.7**, which introduces **interleaved thinking** — a new reasoning pattern that interleaves thoughts with actions and responses. See the [What's New in GLM-4.7](#whats-new-in-glm-47) section below.

---

This setup allows you to use **Claude Code CLI** with **Zhipu's API** (`api.z.ai`) **in parallel** with your existing Claude Max / Anthropic CLI installation.
The new command is called `claude-zhipu` and it won't interfere with your normal `claude`.

Zhipu AI recently launched their [GLM-4.7](https://z.ai/blog/glm-4.7) model with native support for Claude's API format, making it seamless to use existing Claude tools with their infrastructure.

![Zhipu AI GLM-4.7 Architecture](https://z-cdn-media.chatglm.cn/prompts-rich-media-resources/4.7-blog/20251223-004432.png)

---

## 📦 Installation Steps

### 1. Prerequisites
- Node.js v18+ and npm installed:
  ```bash
  node -v && npm -v
  ```

If missing, install via [nvm](https://github.com/nvm-sh/nvm) or your system package manager.

* Ensure `~/bin` exists and is in your `$PATH`:

  ```bash
  mkdir -p ~/bin
  echo $PATH | tr ':' '\n' | grep -x "$HOME/bin" || echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc
  ```

### 2. Create a Local Install Folder

```bash
mkdir -p ~/claude-zhipu
cd ~/claude-zhipu
npm init -y
npm install @anthropic-ai/claude-code
```

### 3. Create a Separate Config Folder

```bash
mkdir -p ~/.claude-zhipu
```

Optional: pre-seed `settings.json` (not required if using env vars in wrapper):

```bash
cat > ~/.claude-zhipu/settings.json <<'JSON'
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "YOUR_ZHIPU_API_KEY",
    "ANTHROPIC_BASE_URL": "https://api.z.ai/api/anthropic",
    "API_TIMEOUT_MS": 3000000
  }
}
JSON
chmod 600 ~/.claude-zhipu/settings.json
```

### 4. Create a Wrapper Script

```bash
cat > ~/bin/claude-zhipu <<'BASH'
#!/usr/bin/env bash
# Wrapper for Claude Code CLI using Zhipu API

CLAUDE_BIN="$HOME/claude-zhipu/node_modules/.bin/claude"

# Inject API credentials
export ANTHROPIC_AUTH_TOKEN="YOUR_ZHIPU_API_KEY"
export ANTHROPIC_BASE_URL="https://api.z.ai/api/anthropic"
export ANTHROPIC_MODEL="GLM-4.7"
export API_TIMEOUT_MS=3000000

# Keep a separate config dir (optional)
export CLAUDE_CONFIG_DIR="$HOME/.claude-zhipu"

exec "$CLAUDE_BIN" "$@"
BASH

chmod +x ~/bin/claude-zhipu
```

---

## ▶️ Usage

Run the Zhipu-connected CLI with:

```bash
claude-zhipu --version
claude-zhipu chat
```

Your original Anthropic/Max subscription CLI is still available as:

```bash
claude
```

So you now have **two parallel Claude CLIs**:

* `claude` → uses your existing Anthropic account / subscription
* `claude-zhipu` → uses Zhipu API with your custom key

---

## 🆕 What's New in GLM-4.7

GLM-4.7 introduces **interleaved thinking** — a new reasoning pattern that interleaves thoughts with actions and responses. Instead of generating all thinking at once, the model can now reason iteratively, interacting with tools and refining its approach in real-time.

### Interleaved Thinking

The key improvement is the ability to interleave reasoning with tool calls and responses across multiple turns:

![Interleaved Thinking Pattern](https://z-cdn-media.chatglm.cn/prompts-rich-media-resources/4.7-blog/upload_058e166eb117f1c394d0505429b6248c.png)

**How it works:**

1. **Turn 1** — The model processes your query and generates initial reasoning, then makes a tool call
2. **Tool Result** — The tool returns data, which feeds back into the model's next reasoning step
3. **Step 2+** — Based on tool results, the model refines its reasoning and may make additional tool calls
4. **Answer** — After iterative reasoning, the model generates a response

This pattern continues across multiple turns, with each turn building on the full context of previous reasoning, tool calls, and responses.

**Why it matters:**

- More accurate results from iterative refinement
- Better tool use with context-aware decision making
- Multi-turn conversations maintain full reasoning history
- Smoother experience with natural back-and-forth

See the [official GLM-4.7 announcement](https://z.ai/blog/glm-4.7) for full technical details.

---

## 🔄 Updating

To update the Zhipu CLI:

```bash
cd ~/claude-zhipu
npm update @anthropic-ai/claude-code
```

---

## 🗑️ Uninstall

Remove everything with:

```bash
rm -rf ~/claude-zhipu
rm -f ~/bin/claude-zhipu
rm -rf ~/.claude-zhipu
```

---

## ⚠️ Security

* Keep your API key secret. The wrapper file contains it in plain text.
* Restrict permissions if needed:

  ```bash
  chmod 700 ~/bin/claude-zhipu
  ```

For more security, you can modify the wrapper to **prompt for the key at runtime** instead of hardcoding.

---

## 📚 Additional Resources

- [Official Zhipu Claude Development Guide](https://docs.z.ai/scenario-example/develop-tools/claude) - Complete documentation for developing with Claude-compatible APIs
- [GLM-4.7 Model Announcement](https://z.ai/blog/glm-4.7) - Technical details about Zhipu's latest model with interleaved thinking