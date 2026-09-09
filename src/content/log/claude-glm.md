---
title: "Claude Code with GLM-5.3: The Setup That Works"
description: "Run GLM-5.3 through Z.ai on Claude Code 2.1.266. Fix the 400 error, model warning, and context window."
tldr: "Use a provider wrapper, disable the incompatible Artifact tool for Z.ai, and register GLM models with behavesAs. Test an interactive tool call: print mode alone missed the failure."
date: 2026-09-09
tags: [CHEATSHEET, CLAUDE, CLI, GLM, Z.AI]
draft: false
author: "Nikola Balić"
topics: [Claude Code configuration, Z.ai gateway compatibility, model configuration]
entities: [Claude Code, Z.ai, GLM-5.3, GLM-5.3-Flash, pass]
answers_questions:
  - How do you configure Claude Code to use GLM-5.3 through Z.ai?
  - What caused the Z.ai 400 error in Claude Code 2.1.266?
  - How do you fix the unknown model warning and verify the setup?
---

My Z.ai setup broke with the latest CC update. Claude Code warned about an unknown model, then returned `400 [1210] Invalid API parameter`.

The warning and the failure had separate fixes. Z.ai was rejecting Claude Code's built-in `Artifact` tool definition. Removing that tool made the same request succeed. Changing the effort level was not the fix, though I spent a while convinced it was.

> Tested on September 9, 2026 with Claude Code 2.1.266 and GLM-5.3. This is what worked on that version. Gateways change, so re-check if you are reading this later.

This follows my [multiple-provider setup](/claude-dual-provider): one Claude install, shared settings, and a `claude-zai` wrapper that selects the provider.

## 1. Update Claude Code

Use your existing installation:

```bash
claude update
claude --version
```

## 2. Configure the Z.ai wrapper

Keep the API key in your existing secret store. This example uses [pass](https://www.passwordstore.org/):

```bash
pass insert api/zhipu
mkdir -p ~/bin
```

Save this as `~/bin/claude-zai`. If you already have a wrapper, update it and keep your existing credential lookup.

```bash
#!/usr/bin/env bash
set -euo pipefail

ZAI_TOKEN="$(pass show "${CLAUDE_ZAI_PASS_ENTRY:-api/zhipu}")"
ZAI_TOKEN="${ZAI_TOKEN%%$'\n'*}"
: "${ZAI_TOKEN:?Z.ai API key is empty}"

unset ANTHROPIC_API_KEY ANTHROPIC_MODEL CLAUDE_CONFIG_DIR

export ANTHROPIC_AUTH_TOKEN="$ZAI_TOKEN"
export ANTHROPIC_BASE_URL="https://api.z.ai/api/anthropic"
export ANTHROPIC_DEFAULT_OPUS_MODEL="glm-5.3"
export ANTHROPIC_DEFAULT_SONNET_MODEL="glm-5.3-flash"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="glm-5.3-flash"
export API_TIMEOUT_MS="3000000"

# Work around the Artifact tool schema rejected by Z.ai on 2.1.266.
export CLAUDE_CODE_DISABLE_ARTIFACT=1

# Use the models' 1M-token context window.
export CLAUDE_CODE_MAX_CONTEXT_TOKENS=1000000

exec claude "$@"
```

Make it executable and ensure `~/bin` is on your shell's `PATH`:

```bash
chmod +x ~/bin/claude-zai
command -v claude-zai
```

Keep these exports inside the wrapper. Putting the gateway URL and token in global Claude settings routes your normal Claude sessions through Z.ai too.

`CLAUDE_CODE_DISABLE_ARTIFACT=1` disables Claude's Artifact tool for this entry point. File editing and shell tools still work. The context setting follows [Z.ai's 1M configuration](https://docs.z.ai/devpack/tool/claude).

## 3. Register the models

Merge this into `~/.claude/settings.json`. Preserve your existing settings and any other `modelPicker.options` entries.

```json
{
  "modelPicker": {
    "options": [
      {
        "model": "glm-5.3",
        "label": "GLM-5.3",
        "behavesAs": "claude-opus-4-7"
      },
      {
        "model": "glm-5.3-flash",
        "label": "GLM-5.3 Flash",
        "behavesAs": "claude-sonnet-4-6"
      }
    ]
  }
}
```

`behavesAs` tells Claude Code which known model's client-side handling to use. Requests still go to GLM. These entries remove the catalog warning. They do not fix the Artifact error; that fix is the env var from step 2.

I kept my saved `xhigh` setting. The gateway accepted it during testing. What GLM does with that number on its side, I do not know.

## 4. Test interactive mode

Exit existing sessions and start a new one:

```bash
claude-zai --model opus
```

Ask:

```text
Use Bash to run pwd once, then return the directory path.
Do not change any files.
```

You should see GLM-5.3 without the catalog warning, a successful tool call, and a final response without the 400 error. Approve the shell call if prompted.

Do not skip this test. `claude-zai -p` succeeded while interactive mode failed, and interactive mode is what I actually use. The print test nearly convinced me everything worked.

## Give this to your agent

> Configure Claude Code using this article. Inspect and back up my existing settings and provider wrapper first. Reuse my credential store, merge the model entries, and keep Z.ai environment variables scoped to the wrapper. If files are symlinked, edit their source. Verify the installed version and run the interactive `pwd` test. Preserve my other settings and report what changed.
