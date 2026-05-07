---
title: "Agent-Native Extensibility"
description: "How extensibility shifts from packaged plugins to agent-readable recipes, and why the connector is the new extension point."
tldr: "The next evolution of extensibility isn't a better plugin system. It's agent-readable recipes that teach coding agents how to adapt external capabilities into your app's contracts. The extension is no longer just code — it's an installation procedure plus judgment."
date: 2026-05-07
tags: [AI, AGENTS, ARCHITECTURE, OPINION]
draft: false
author: "Nikola Balić"
topics: [Agent extensibility, Plugin architecture, Software connectors, Agent-native development]
entities: []
answers_questions:
  - How does agent-native extensibility differ from traditional plugins?
  - What is a connector recipe and why does it matter?
  - How do agents become installers for external capabilities?
  - What makes agent connectors auditable and safe?
---

I've been thinking about what happens when extensibility stops being about loading code and starts being about teaching agents.

We've spent decades building plugin systems. Registries, package managers, dependency resolvers, runtime loaders. All solving the same problem: *how do I add new capabilities to an existing application without rewriting it?*

Agents change the question. It's no longer "how do I load this package?" but "how do I teach an agent to adapt this capability into my project?"

## Plugins say install. Connectors say adapt.

A plugin is a prebuilt package with a fixed interface. The host loads it, the developer maintains compatibility, the user configures settings. The host has to support the plugin shape in advance. Every plugin system is a bet on what the interface will look like years from now.

An agent-native connector is closer to an instruction document: a standard contract, a project-aware installer, adapter code, verification steps, auth guidance. The agent reads the project, figures out where the connector belongs, writes the file, installs missing dependencies, checks imports, and tells you what's left.

The host doesn't need a plugin runtime. It needs a *contract* and an agent that can adapt code to fit.

## Artifacts vs recipes

A plugin has to be universally correct before distribution. Every project layout, every dependency version, every auth configuration. That's why plugin APIs are so rigid. Rigidity is the price of universality.

A recipe adapts to the project in front of it:

> If the project uses layout A, write the file here. If layout B, there. If neither, ask. If a dependency is missing, install it using the detected package manager. If auth runs locally, load credentials from env. Then verify with the typechecker.

That isn't a plugin. It's an installation script written in natural language, designed to be executed by an agent.

It works because agents can make judgment calls that conventional tooling can't. "Pick the right location based on project layout." "Don't improve this file; write it verbatim because it matches a published contract." "The user owns the provider lifecycle; this connector only adapts an already-initialized resource."

Extensibility happens at the level of *project semantics*, not file copying.

## The connector as translator

Think of it as a translation layer:

```
external capability → standard internal contract → agent runtime
```

Take sandboxes. The capability is "a remote execution environment." The agent framework doesn't care about every provider's SDK. It wants a generic shape: read file, write file, list directory, run command, destroy session. The connector wraps a provider-specific object into that shape, and providers become interchangeable. (The agent integrates with contracts, not providers.)

A plugin wraps one specific provider. A connector recipe describes the *pattern* of wrapping, and the agent adapts it to whichever provider you're using. Same recipe, different outcomes, depending on context. I like this because it means the recipe author doesn't need to anticipate every project layout. The agent does that work.

## The agent becomes the installer

A connector isn't just consumed by runtime code. It's consumed by a *coding agent*. Markdown becomes installation intent: what to create, where, when to ask, what not to change, how to handle auth, how to verify.

The registry doesn't need an npm package per provider. It can host agent instructions. A markdown file. A contract description. A set of steps.

Instead of publishing `@acme/sandbox-adapter`, `@otherco/sandbox-adapter`, `@startup/sandbox-adapter` (each with their own package, versioning, compatibility matrix) you publish a recipe: "here's the `SandboxApi` contract, here's how to adapt any provider that matches this shape."

One recipe, many providers. The agent handles local adaptation.

## Bring your own lifecycle

A bad plugin tries to own everything: create the resource, configure it, authenticate it, adapt it, destroy it. You've seen these. They work great in the demo, then fall apart the moment your setup differs from the demo's assumptions.

A good agent connector says: *You own the resource. You own auth. You own lifecycle. I only adapt it into the agent runtime.*

This keeps connectors small and composable. No magic-plugin trap of hiding too much behind abstractions that leak at the worst possible time.

The connector doesn't create your sandbox. It doesn't provision your database. It doesn't generate your API keys. You bring an already-initialized resource, and the connector adapts it into the standard contract.

## Extensions become auditable

Because the connector is a plain instruction file, you can inspect what files will be written, what packages installed, what auth vars needed, what cleanup happens, what verifies success.

A plugin asks for trust. You install it, it runs code in your process, you hope it behaves. An agent-readable connector exposes the exact transformation it wants performed. You can read the recipe before the agent executes it. Approve each step. Modify it.

Trust is the bottleneck for any extensibility system. Plugins ask you to trust the author. Connectors let you verify the intent.

## The shape of the ecosystem

```
Capability registry
  └── connector recipe
        ├── contract explanation
        ├── target file
        ├── adapter implementation
        ├── dependency + auth instructions
        └── verification checklist

Coding agent
  └── reads recipe → inspects project → writes adapter
      → installs deps → verifies → reports

Runtime
  └── consumes standard contract
```

Sandboxes are the first obvious category. The same pattern fits databases, queues, browser automation, email, object storage, vector stores, payments, observability, deployment targets, internal APIs.

The work is defining small, stable contracts: `StorageApi`, `QueueApi`, `EmailApi`, `DeployApi`. Let recipes adapt providers into them.

## The risk

This becomes "plugins, but worse" if every connector is just an agent writing arbitrary code. I'm aware of that.

The system needs constraints: standard contracts, verbatim reference implementations, clear file placement rules, explicit auth instructions, verification steps, no invented secrets, no silent lifecycle ownership.

Agents get freedom only where project-specific adaptation is required. Everything else stays deterministic. The recipe tells the agent exactly what to write, where to write it, and how to verify it worked. Judgment is scoped to "where does this file go in *this* project?" not open-ended code generation.

Without those constraints, you've just invented a very expensive way to write bad plugins.

## What this adds up to

I keep coming back to this: the extension is no longer just code. It's the whole process. Understanding project structure, making local changes, installing dependencies, respecting auth models, choosing import paths, running verification, explaining next steps.

A future connector registry isn't a package registry. It's a library of capability installation recipes. Plugins extend apps by adding code. Agent connectors extend apps by teaching agents how to adapt capabilities into the app's contracts. I think that distinction is worth getting right early.
