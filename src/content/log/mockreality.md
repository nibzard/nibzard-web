---
title: "Mock Reality Before You Build It"
description: "Write the API spec first, have an agent simulate the whole service, and find the friction before you build."
tldr: "Design APIs by simulation: write a fantasy OpenAPI spec and an agent role-plays the whole backend. A consumer agent uses it like a real user and surfaces papercuts — missing pagination, awkward auth, wrong granularity — before any code exists. Caveat: simulation validates ergonomics, not feasibility."
date: 2026-09-17
tags: [AI, AGENTS, APIS, PRODUCT]
draft: true
author: "Nikola Balić"
topics: [API design by simulation, agents as design tools, OpenAPI specs, prototyping with LLMs, product surface area design]
entities: [OpenAPI]
answers_questions:
  - How can agents simulate a service before you build it?
  - What API design flaws does an agent mock-up surface?
  - What can design-by-simulation tell you, and what can it not?
---

# DRAFT OUTLINE

<!-- TODO(niko): worked example is the spine of this piece. Need a real session where a consumer agent tripped on a specific papercut (missing pagination, awkward auth, wrong granularity). Also decide: name/link the openapi-agent-cloud project, or keep it abstract? No mention of the product it was used on. -->

## Hook

Option A: "I shipped an API, watched someone use it, and found its worst papercuts — before writing a line of it."

Option B: "The cheapest service you'll ever operate is the one that doesn't exist."

- Open at the moment of watching the agent hit the friction
- Reveal the twist immediately: nothing was deployed

## The technique

- Write the OpenAPI spec of the product you wish existed — a fantasy spec
- Hand it to an agent; it role-plays every endpoint and the service semantics behind them
- Then the same (or a second) agent consumes the API like a real user: explores, integrates, breaks things
- You watch where it struggles. That struggle is the design feedback

## Why this works now

- Agents are world-class at pretending. That used to be a bug; for design it's the feature
- Every mature design field mocks reality first: storyboards, pre-viz, flight simulators, foam architecture models
- Software finally can too — and the cost is tokens, not sprints

## Worked example

<!-- TODO(niko): insert real spec excerpt + simulated session transcript -->

- Small concrete spec (keep it boring: a CRUD service with one tricky resource)
- The simulated session, beat by beat
- The moment the agent trips — and what that papercut would have cost if found post-build

## Where the simulation lies to you

- It validates ergonomics, not feasibility
- The agent will happily pretend the impossible is easy — simulated latency, cost, and scale are fiction
- Use it to shape the surface, never to estimate the build
- This honest-limits section is what makes the piece credible

## Ending

- The spec you end with is the artifact: you iterated on design at zero build cost
- Close on the general move: mock reality, watch an agent live in it, then build what survived

<blockquote class="featured-quote unattributed">
Agents are great at mocking up reality. That used to be a bug. For design, it's the feature.
</blockquote>
