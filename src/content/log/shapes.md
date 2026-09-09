---
title: "Compute Should Be Agent-Shaped"
description: "Computers are rooms furnished for a person. The agents crashed anyway."
tldr: "Computers were built for one person operating one machine. What I see now is the opposite: one person sets outcomes and boundaries for many agents, while the work decides how compute forks, grows, sleeps, and disappears. The agent's state persists; machines become disposable."
date: 2026-09-01
tags: [AI, AGENTS, INFRASTRUCTURE, OPINION]
draft: true
author: "Nikola Balić"
topics: [Malleable compute, Agent-first infrastructure, Checkpointing and forking, Autonomous agents, Future of computers]
entities: [AgentLab, Proxmox, DHH, Omarchy, Steel]
answers_questions:
  - What does an agent-first computer actually look like?
  - Why does the permission prompt exist, and what makes it unnecessary?
  - How is agent-shaped compute different from a malleable operating system?
  - What stays hard once environments become disposable?
---

Today's computers are built for one person operating one machine. In the agent systems I build and work with, the opposite shape keeps emerging: one person sets outcomes and boundaries for many agents.

There are two Proxmox machines in my house. Most nights something is working on them that I didn't start, and by morning there's a branch pushed, a report in a folder, and a virtual machine that has already deleted itself.

Most of that work runs through [AgentLab](https://github.com/nibzard/agentlab), a tool I built with coding agents to run coding agents in dangerous mode. An agent asks for a machine, does the work, returns the artifacts, and kills the machine. That turned out to be the boring part.

What mattered was what I removed. Each improvement stripped away another assumption that a person was sitting there.

The person had left the room. The furniture was still arranged for them.

*(I work on agent infrastructure at [Steel](https://steel.dev), so read the rest with that in mind.)*

That work has made the pattern easier to see. Steel has served millions of browser sessions for agents. Human browsing is mostly serial; agent browsing arrives in bursts and fans out around a task. The browser is the first part of the computer where we can already see the shape changing.

## What I kept removing

The first thing to go was the permission prompt.

For me, it went on day one. I made `claude` and `codex` aliases for their YOLO modes and have used them that way ever since.

`--dangerously-skip-permissions` is an honestly named flag. The danger is the laptop. You have one machine, full of state you may never reconstruct. Every `rm` can be final. So we make a human tap *yes* four hundred times a day and call it safety.

The fix is to make the machine disposable: isolated, rebuilt from a template in under a minute, safe to lose. Once the body costs nothing, the prompt has one less thing to protect. But a disposable machine cannot unsend an email or undo a production write.

<blockquote class="featured-quote primary">
The agent didn't get safer. The body got cheap.
</blockquote>

The next thing to go was size.

You choose the machine before you know the work: four cores or eight, GPU or not. People do this because they live with one computer for years. The agent merely inherits the guess.

Then the screen. Windows, cursor, file manager, tabs. They exist for eyes and hands. An agent thinks in structured calls, yet we make it operate an interface built for a primate. Then we sell that as a feature.

We handed a human computer to something inhuman, then congratulated it for learning our tools.

## The word is already in the air

I'm not the only one circling this. DHH has been building [Omarchy](https://omarchy.org) around what he calls the malleable computer. I love the term. Ask the agent and the operating system changes.

I ran my own small experiment on an old laptop. It boots straight into Claude Code. No desktop. No launcher. Claude Code is the only interface. I wanted to see what personal compute feels like when the machine can change through conversation.

But. His computer is malleable **to you**. You remain the author. The agent carries out the change.

The malleability I'm describing points the other way. The agent reshapes the machine **for itself**, in the middle of a task, because the work turned out to need something the box didn't have. No person chooses the machine shape or approves each fork. You find out afterwards, if you read the log at all.

## What's left when nobody is sitting there

Strip out the prompt, the fixed size, and the screen, and what remains is closer to a body: something a persistent self grows into the shape of the work and then sheds.

The self stays: memory, credentials, live sessions, and the history of what the agent knows and may touch. The machine does not.

I keep one of these. Cassandra is a memory agent for a Discord server with 367 channels. Several agents built her on top of Pi Agent. She reads what she's permitted to read, tracks what got decided and why, and answers when addressed.

Most of the time Cassandra does almost nothing. She still can't start from zero. Her memories, channel map, and authenticated sessions are the reason she is useful.

Then she blooms. During one run, she spent a day rebuilding an answer path. She forked adversarial copies of herself and told them to break it. They returned with four race conditions she had missed. By evening she was one thing again.

That's an organism's schedule. She lives on a cloud service with a fifty-gigabyte volume, running around the clock, sized by me, in advance, before I had any idea what she'd turn out to need.

Research shows the shape most clearly because a question rarely knows its own size. One question becomes five. Today the context window fills and a person decides whether to start over.

An agent-shaped machine would fork instead. Twenty investigators could leave the same checkpoint, follow separate threads, then merge what they found. Each branch could acquire the tools and authenticated sessions its work required.

The topology is discovered during the work.

## How small can a body get

Push that far enough and the question turns uncomfortable. If the durable part is files and credentials and history, why is there a machine at all? What if the sandbox is just a filesystem?

Most of the hard-sounding verbs turn out to be filesystem operations that are already close to free. A checkpoint is a snapshot. A fork is copy-on-write. A mount is a mount. Git has been doing all three on text for twenty years. ZFS does the same on raw bytes. A container image is already a stack of filesystem layers with a process aimed at it.

So the body might be a tree you can branch, with compute attached to whichever branch currently needs to think.

Except a filesystem holds no live state. Browser cookies in memory, a half-finished process, an open socket: none of them is a file. The work may depend on all three. A filesystem also enforces no boundary. Isolation is a kernel property. Yolo mode needs a wall, and a tree of files is not a wall.

The filesystem is the right unit for identity and the wrong unit for isolation and for anything still running. The distance between those two is where the real engineering lives.

I built the cheap half. [AWC](https://nibzard.github.io/awc-docs/) stores a prepared workspace once and lets agents fork it without copying the common data.

The documentation also carries a list of things AWC is not, and sitting on that list is *a sandbox*. The identity layer was a tractable problem and I solved my version of it. The wall and the living state were never on the table.

## The bitter lesson eats half of this

We're early. Compute keeps getting cheaper. We can afford to be inefficient now and optimize later, and the bitter lesson has a long record of flattening people who got clever before they got scale.

That takes out the cost half of everything above. Cassandra's total spend to date is eighteen dollars, and nobody needs a machine that changes shape to save that. So strike the thrift argument. It was the weakest thing I had.

The bitter lesson says general computation and search tend to beat systems built around human assumptions. Fixed provisioning is one of those assumptions: a person chooses four cores before the problem has begun.

Forking makes the same case from the other side. Twenty investigators off one checkpoint use *more* compute. That is parallel search. A fixed box caps how much an agent can throw at something hard. You can't spend your way out of a rectangle you picked in advance.

Cheap, disposable machines make autonomy possible because mistakes become reversible. I keep a [map of forty-odd internal agents](https://github.com/steel-experiments/internal-agents-map) at Stripe, Uber, DoorDash, Shopify, GitHub, and elsewhere. Many stop at the same place: a draft reviewed by a person. They stop there because undo is the expensive part.

## The part that doesn't work yet

Two problems.

The first is that if you build this properly, it looks like absolutely nothing. Work goes in. Output comes back. Everything interesting happens where nobody is watching. I still don't know how to make that visible.

The second problem is control. An agent that can fork itself can also fork the bill. Permission does not disappear. Four hundred prompts become a policy envelope: what the agent may touch, what it may spend, and what still needs a human. Mine works because there's exactly one user and I know where he lives.

The hard verbs are checkpoint, fork, merge, mount, wake, and sleep. Filesystems make branching cheap. They do not make the branches agree. Nor do they carry live state and isolation across those moves. Nobody yet has made that half look easy.

Something is running in my house tonight. Its machine is the size I guessed before I knew the job. It works through a desktop it cannot see. When it finishes, the machine will die and leave a folder behind.

Every one of those constraints is furniture arranged for someone who isn't in the room.

The box was never for the agent. It was for you.
