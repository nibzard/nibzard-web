---
title: "Claude-Zhipu Parallel CLI Setup"
description: "Complete setup guide for running Claude Code CLI with Zhipu API alongside your existing Anthropic installation"
tldr: "This setup allows you to use Claude Code CLI with Zhipu's API (api.z.ai) in parallel with your existing Claude Max / Anthropic CLI installation using a separate command called claude-zhipu."
date: 2025-09-01
tags: [CHEATSHEET, Claude, CLI, API]
draft: false
---

This setup allows you to use **Claude Code CLI** with **Zhipu's API** (`api.z.ai`) **in parallel** with your existing Claude Max / Anthropic CLI installation.  
The new command is called `claude-zhipu` and it won't interfere with your normal `claude`.

Zhipu AI recently launched their [GLM-4.5](https://z.ai/blog/glm-4.5) model with native support for Claude's API format, making it seamless to use existing Claude tools with their infrastructure.

![Zhipu AI GLM-4.5 Architecture](https://z-cdn.chatglm.cn/z-blog/20250729-141203.png)

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
- [GLM-4.5 Model Announcement](https://z.ai/blog/glm-4.5) - Technical details about Zhipu's latest model