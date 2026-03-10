---
title: "Claude Code with Multiple Accounts on One Machine"
description: "Use Claude Code with your normal login or z.ai via shell wrappers, without swapping config or leaking tokens."
tldr: "The clean way to use Claude Code with both your normal account and z.ai is one neutral config and two simple entry points."
date: 2026-03-10
tags: [CHEATSHEET, Claude, CLI, z.ai, dotfiles, featured]
draft: false
author: "Nikola Balić"
topics: [Claude Code configuration, provider switching, shell wrappers, secret management, dotfiles]
entities: [Claude Code, Anthropic, z.ai, Zhipu AI, pass, GLM-4.7, GLM-5]
answers_questions:
  - How do you switch Claude Code between your normal account and z.ai without editing config files?
  - How do you keep z.ai tokens out of `~/.claude/settings.json`?
  - How do you make a portable Claude setup inside dotfiles?
---

If you want two Claude Code entry points, one for your normal Claude Team or Enterprise login and one for an alternative API provider like z.ai, the cleanest answer is not two installs.

> Tested with **Claude Code 2.1.72**.

What you actually want is one Claude install, one neutral global config, and two explicit commands:

- `claude-team` for your normal first-party Claude login
- `claude-zai` for the z.ai gateway using a token sourced outside Claude settings

The names are arbitrary. You could call them `claude-default` and `claude-zai` if you prefer. The important part is the pattern: use **one Claude install** and **one global Claude config**, and select the provider with wrapper scripts instead of swapping config files or maintaining a second install.

If you want to try z.ai itself, here is the same referral link I used before: [Get GLM Coding Plan](https://z.ai/subscribe?ic=61HSE9HVY6).

Most of the confusion around this topic comes from the fact that Claude Code has two different layers of state. Your saved first-party login lives separately from `settings.json`, but global `env` overrides still affect every session.

That sounds harmless until you realise it means you can be correctly logged into your normal Claude account and still accidentally route every request through z.ai if you set gateway variables globally.

## The mistake to avoid

If you put this in `~/.claude/settings.json`:

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "...",
    "ANTHROPIC_BASE_URL": "https://api.z.ai/api/anthropic"
  }
}
```

then every Claude session goes through that gateway.

You have effectively made z.ai the default for every Claude Code session on that machine.

That is the trap most people hit.

The clean fix is:

- keep `~/.claude/settings.json` provider-neutral
- source the z.ai token outside Claude settings
- use `claude-team` when you want the normal Claude path
- use `claude-zai` when you want the z.ai path

## What to build instead

This is the target end state:

- `~/.claude/settings.json` is provider-neutral
- z.ai token is sourced outside Claude settings
- `claude-team` and `claude-zai` live in `~/bin`
- no repo-local Claude config is required
- no `~/claude-zhipu` install is required
- no legacy `claude-zhipu` wrapper is required

If you keep shell tools in dotfiles, the wrappers can live there and be symlinked into `~/bin`.

Example:

- `~/dev/dotfiles/claude/.claude/settings.json`
- `~/dev/dotfiles/bin/bin/claude-team`
- `~/dev/dotfiles/bin/bin/claude-zai`

Before changing anything, make sure Claude Code is installed and reachable as `claude`, and that `~/bin` is on your `PATH`.

```bash
claude --version
echo $PATH | tr ':' '\n' | grep -x "$HOME/bin"
```

## Where the z.ai token should live

The key rule is simple: do not put the token in `~/.claude/settings.json`.

You have a few reasonable options:

- `pass`, if you already use password-store
- a local secret file such as `~/.config/claude/zai-token`
- an environment variable such as `CLAUDE_ZAI_TOKEN`

`pass` is the most security-conscious option in this guide, but it is not required.

If you want to use `pass`, this guide uses:

```bash
pass show api/zhipu
```

If you do not have one yet:

```bash
pass insert api/zhipu
```

The broader point is simple: Claude settings should stay clean, and the z.ai credential should only be injected when you intentionally choose the z.ai path.

## Keep global Claude settings boring

Your global Claude settings should keep only normal defaults such as status line, plugins, model preference, and harmless flags.

Example:

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  },
  "model": "opus",
  "statusLine": {
    "type": "command",
    "command": "input=$(cat); current_dir=$(echo \"$input\" | jq -r '.workspace.current_dir // .cwd'); model=$(echo \"$input\" | jq -r '.model.display_name'); dir_name=$(basename \"$current_dir\"); printf \"%s %s\" \"$dir_name\" \"$model\""
  }
}
```

Once global settings are neutral, the rest of the setup becomes straightforward. You create one wrapper that clears provider-specific overrides and one wrapper that opts into the z.ai gateway.

## The normal path: `claude-team`

This wrapper clears provider-specific env vars and launches the normal Claude binary.

```bash
#!/usr/bin/env bash
set -euo pipefail

unset ANTHROPIC_API_KEY
unset ANTHROPIC_AUTH_TOKEN
unset ANTHROPIC_BASE_URL
unset ANTHROPIC_DEFAULT_HAIKU_MODEL
unset ANTHROPIC_DEFAULT_SONNET_MODEL
unset ANTHROPIC_DEFAULT_OPUS_MODEL
unset ANTHROPIC_MODEL
unset API_TIMEOUT_MS
unset CLAUDE_CONFIG_DIR

exec claude "$@"
```

Save it as:

```bash
~/bin/claude-team
chmod +x ~/bin/claude-team
```

The entire purpose of this wrapper is to make sure an old API key, gateway URL, or model mapping does not bleed into the first-party Claude path.

## The z.ai path: `claude-zai`

This wrapper resolves the token from an env var, a local token file, or `pass`, then points Claude at the z.ai gateway and sets the model mapping env vars.

```bash
#!/usr/bin/env bash
set -euo pipefail

PASS_ENTRY="${CLAUDE_ZAI_PASS_ENTRY:-api/zhipu}"
TOKEN_FILE="${CLAUDE_ZAI_TOKEN_FILE:-$HOME/.config/claude/zai-token}"

if [[ -n "${CLAUDE_ZAI_TOKEN:-}" ]]; then
    ZAI_TOKEN="$CLAUDE_ZAI_TOKEN"
elif [[ -f "$TOKEN_FILE" ]]; then
    ZAI_TOKEN="$(head -n1 "$TOKEN_FILE")"
elif command -v pass >/dev/null 2>&1; then
    ZAI_TOKEN="$(pass show "$PASS_ENTRY" 2>/dev/null | head -n1 || true)"
else
    ZAI_TOKEN=""
fi

if [[ -z "$ZAI_TOKEN" ]]; then
    echo "Set CLAUDE_ZAI_TOKEN, create $TOKEN_FILE, or store the token in pass at $PASS_ENTRY"
    exit 1
fi

unset ANTHROPIC_API_KEY
unset ANTHROPIC_MODEL
unset CLAUDE_CONFIG_DIR

export ANTHROPIC_AUTH_TOKEN="$ZAI_TOKEN"
export ANTHROPIC_BASE_URL="https://api.z.ai/api/anthropic"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="glm-4.5-air"
export ANTHROPIC_DEFAULT_SONNET_MODEL="glm-4.7"
export ANTHROPIC_DEFAULT_OPUS_MODEL="glm-5"
export API_TIMEOUT_MS="3000000"

exec claude "$@"
```

Save it as:

```bash
~/bin/claude-zai
chmod +x ~/bin/claude-zai
```

If you want the simplest possible version, you can skip `pass` entirely and create a local token file:

```bash
mkdir -p ~/.config/claude
printf '%s\n' 'YOUR_ZAI_TOKEN' > ~/.config/claude/zai-token
chmod 600 ~/.config/claude/zai-token
```

This wrapper is the only place where provider-specific configuration should live.

## Dotfiles are optional, but convenient

If you maintain shell tools in dotfiles, keep the real files there and symlink them into `~/bin`. If you do not use dotfiles, you can skip this section and keep the wrappers directly in `~/bin`.

Example:

```bash
ln -sfn ../dev/dotfiles/bin/bin/claude-team ~/bin/claude-team
ln -sfn ../dev/dotfiles/bin/bin/claude-zai ~/bin/claude-zai
```

This makes the setup portable across machines and keeps the implementation in one place.

## What daily usage feels like

Normal Claude path:

```bash
claude-team
```

z.ai path:

```bash
claude-zai
```

So the mental model becomes:

- `claude-team` means "use the saved first-party Claude login"
- `claude-zai` means "use the z.ai gateway with a token sourced outside Claude settings"

That is what makes this setup pleasant. You are not editing files or trying to remember which provider is currently configured. You are just choosing the right entry point.

## How to verify it actually works

Check the normal path:

```bash
claude-team auth status --text
```

Check the z.ai path:

```bash
claude-zai auth status --text
```

Expected behavior:

- `claude-team` should not show the z.ai base URL
- `claude-zai` should show `https://api.z.ai/api/anthropic`

## The one confusing part: auth banners

This is the subtle part, and it is easy to misread when testing.

`claude-team` only clears env overrides. It does not magically switch your saved Claude account to the correct Team or Enterprise org.

If your saved first-party login is still an API-side account, the banner may still show `Claude API` even though the z.ai gateway is gone. That usually means the wrapper is correct, but the stored Claude login still needs to be switched.

Check it with:

```bash
claude-team auth status --json
```

If needed, re-login with the correct company account:

```bash
claude auth login --sso --email you@company.com
```

Or launch `claude-team` and run:

```text
/login
```

This matters because the wrapper fixes provider overrides, but your stored first-party account state still determines whether Claude sees you as API, Pro, Team, or Enterprise.

In other words, if `claude-team` still says `Claude API`, that does not automatically mean the wrapper failed. It can also mean you are logged into the wrong first-party account context.

## Security

- Do not keep the z.ai token in `~/.claude/settings.json`
- If the token ever lived in a tracked file, rotate it
- Prefer `pass` or a local secret file over hardcoding secrets into wrappers or config

If you want to try z.ai directly, here is the referral link again:

- [Get GLM Coding Plan](https://z.ai/subscribe?ic=61HSE9HVY6)

The short version is this: one Claude install, one boring global config, two explicit entry points.

This is the version I would recommend to anyone who wants one Claude Code setup for their normal Claude account and a second explicit path for z.ai.

## Additional Resources

- [Official Zhipu Claude Development Guide](https://docs.z.ai/scenario-example/develop-tools/claude)
- [GLM-4.7 Model Announcement](https://z.ai/blog/glm-4.7)
- [Get GLM Coding Plan](https://z.ai/subscribe?ic=61HSE9HVY6) — *Affiliate link, gives you additional 10% off*
