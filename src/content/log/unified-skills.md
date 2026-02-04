---
title: "One Skill to Rule Them All"
description: "How I eliminated drift between AI code assistants using GNU Stow and a unified skills directory"
tldr: "Managing AI agent skills across Claude and Codex used to mean maintaining duplicate copies. Now a single source of truth with symlinks keeps everything in sync."
date: 2026-01-16
tags: [DEVTOOLS, DOTFILES, SYMLINKS]
draft: false
author: "Nikola Balić"
topics: [Dotfiles, Configuration Management, GNU Stow, AI Assistants]
entities: [Claude, Codex, GNU Stow]
answers_questions:
  - How do you manage AI agent skills across multiple code assistants?
  - What's the best way to keep dotfiles in sync across different tools?
  - How can GNU Stow help with configuration management?
---

<blockquote class="featured-quote primary">
    The assistants don't care where the files live, as long as they're in their expected skills path.
</blockquote>

## The Drift Problem

I've been using multiple AI code assistants for a while now—Claude and Codex, each with their own strengths. Both support custom skills: reusable prompts and workflows that extend their capabilities.

But here's where things got messy: each tool wants its skills in a different location.

- `~/.claude/skills/` — Claude-specific skills
- `~/.codex/skills/` — Codex-specific skills

I had useful skills I wanted both assistants to have access to: git conventional commits, release runbooks, todo management. So I did what any pragmatic developer would do—I copied the files.

Big mistake.

Every time I improved a skill, I had to remember to update it in both places. Sometimes I'd forget. Sometimes the versions would drift apart in subtle ways. One assistant would get the improved version, the other would be stuck with the old buggy one.

It was manual, error-prone work. The kind of thing automation exists to solve.

## The Single Source of Truth

The solution hit me like most good solutions do: **why am I duplicating this at all?**

I already keep my dotfiles in a git repository. That's the single source of truth for my entire development environment. Why shouldn't AI skills live there too?

So I created a unified directory structure:

```
dotfiles/agents/.agents/skills/
├── git-conventional-commit/
├── release-runbook/
└── todo-json-manager/
```

One place to edit. One place to commit. The skills live alongside the rest of my configuration, versioned and tracked.

But how do both assistants find them?

## Enter GNU Stow

GNU Stow is this neat little tool that manages symlinks for you. Instead of manually creating a web of symlinks, you give it a directory structure and it figures out the rest.

Here's the setup:

1. Stow symlinks `dotfiles/agents/.agents/` to `~/.agents/`
2. Both Claude and Codex get their `skills/` directory symlinked to `~/.agents/skills/`

```
~/.claude/skills → ~/.agents/skills
~/.codex/skills → ~/.agents/skills
```

The assistants don't know and don't care that they're looking at a symlink. They just see files in their expected location.

## Why This Works So Well

**Single update point.** Edit a skill once in the dotfiles repo and both assistants see the change immediately. No more copy-paste, no more "did I update both copies?"

**Version controlled.** Skills live in git alongside the rest of my dotfiles. I can track changes, roll back if I break something, see the history of how a skill evolved.

**Portable setup.** My `./setup.sh` script handles the entire configuration. When I set up a new machine, I clone the dotfiles repo, run the script, and everything is where it needs to be—including my AI skills.

**No drift.** It's now impossible for skills to diverge between tools. They're literally the same files.

## The Pattern Scales

This is the part I really like: adding a new skill is trivial.

Just drop a folder in the unified directory. No symlinks to create manually, no copies to keep in sync, no configuration files to update. The assistants pick it up automatically.

I've since added more skills to the shared directory—workflow helpers, project management tools, custom prompts. Each one is available to both assistants instantly.

The key insight is that the **interface is a contract**. Each assistant expects skills at a specific path. As long as you honor that contract, they don't care whether it's a real directory or a symlink pointing somewhere else entirely.

## The Bigger Lesson

This pattern isn't just about AI skills. It's about recognizing when you're fighting against duplication and choosing a simpler path.

Whenever you find yourself maintaining multiple copies of the same thing—config files, scripts, prompts—ask yourself: can I have a single source of truth instead?

Symlinks are cheap. Version control is powerful. Your future self, who forgot which copy they updated, will thank you.

---

*Want to see how this actually works? The skills mentioned in this article—`git-conventional-commit`, `release-runbook`, and `todo-json-manager`—are all available in my dotfiles repo. Check the setup script for the Stow configuration.*
