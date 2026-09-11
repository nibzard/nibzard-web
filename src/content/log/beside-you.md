---
title: "Beside You, Not Between You"
description: "The best agent UX metaphor exists: the anonymous animal cursor in Google Docs. Agents as collaborators, not intermediaries."
tldr: "The best agent UX was shipped by Google Docs over a decade ago: the anonymous animal cursor. Sunil Pai named the thesis: an agent beside you in a shared canvas, not between you and your work. tldraw, Clicky, and my own diagramming project all point the same way. Even Cursor, the autonomy leader, is converging there."
date: 2026-07-31
tags: [AI, AGENTS, UX, OPINION]
draft: false
author: "Nikola Balić"
topics: [Agent UX, Human-AI collaboration, Canvas-based agents, Real-time co-presence, Diagramming with AI]
entities: [Google Docs, Sunil Pai, Pizzo, tldraw, Matt Webb, Clicky, Farza, Cursor, Mermaid, DaVinci Resolve]
answers_questions:
  - Why do most agent interfaces feel wrong despite capable models?
  - What does an "agent beside you" look like concretely in a UI?
  - If autonomy is where the money is, why is the market leader hybridizing toward co-presence?
  - Why are coding agents so bad at producing diagrams?
---

You already know the best agent interface ever shipped. Open a Google Doc, share the link, and within seconds someone else's cursor appears, one of the [anonymous animals](https://support.google.com/docs/answer/2494822?hl=en), moving through the same page you're in. They're typing. You're typing. Neither of you is waiting on the other.

That feature is [over a decade old](https://evert.meulie.net/faqwd/complete-list-anonymous-animals-on-google-drive-docs-sheets-slides/). It's still the cleanest mental model for what an AI agent in your work should feel like. So here's the question I keep turning over: why isn't the agent just one of the animals?

The title isn't mine. Three days before I started drafting, [Sunil Pai](https://sunilpai.dev/about) published [*one document, two hands*](https://sunilpai.dev/posts/one-document-two-hands/), about Pizzo, his collaborative music app, and the subtitle is the whole argument:

<blockquote class="featured-quote primary">
The agent belongs beside you, not between you and the app.
</blockquote>

I arrived at the feeling independently; Sunil named it better than I would have. (Disclosure: I work at [Steel](https://steel.dev), browser infrastructure for AI agents. Take the opinion as partisan.)

## The agent as a toll booth

You write a prompt. The agent disappears into a chat box, does the work where you can't see, comes back with a diff or a pile of edited files. You review, approve, repeat. The agent is a toll booth between you and your work.

Sunil draws the two shapes side by side. The bad pattern is a relay:

`you → chat box → agent → application → your thing`

The good pattern collapses it into co-presence:

`you + your agent → application → your thing`

The relay is the default because it's the easiest thing to build: wrap a model in a background job, hand it a goal, wait. Cursor, [Devin](https://www.cognition.ai/blog), [Claude Code's subagents](https://code.claude.com/docs/en/sub-agents), [OpenAI Codex](https://github.com/openai/codex): every serious coding tool ships some version of "the agent goes away and comes back with the answer." Capability isn't the problem. The problem is that every run through the relay widens a gap, and the gap is the expensive part. I'll get to the gap.

## The canvas is where co-presence gets real

This isn't hypothetical. [tldraw offline](https://tldraw.dev/blog/tldraw-offline) shipped in July 2026 as "the local whiteboard for you and your agents," with agents that "drive the canvas to create shapes, import assets, listen to changes." Not generate a file and hand it back. *Drive the canvas.* The earlier [tldraw MCP App](https://tldraw.dev/blog/tldraw-mcp-app) (March 2026) was even more direct: "your agent can interact with the canvas in the same way that you could as a user." It shipped into Cursor, VS Code, ChatGPT, and Claude.

A shared canvas beats a chat because of shared spatial context. There's no diff to review afterward because there was no afterward. The agent moved a node, you saw it move, you moved the next one. The agent is just *there*, in the document, working. Not between you and the work. In the work.

The idea is older than the current wave. [Matt Webb's October 2023 piece for PartyKit](https://blog.partykit.io/posts/ai-interactions-with-tldraw) built proactive NPCs (a poet, a painter, a maker) on the tldraw canvas that "put their hand up to offer" help, cursor movement signaling "the locus of attention of the NPC." He named this thesis three years before the rest of us caught up. The lineage is tidy: Webb published that piece on the blog of PartyKit, the multiplayer-infrastructure company Sunil founded (Cloudflare acquired it in 2024). The thesis grew up in Sunil's house before Sunil named it.

## Watch-and-coach, not watch-and-wait

There's a lighter variant that doesn't need a canvas. [Clicky](https://www.heyclicky.com/) is a Mac app by [Farza](https://www.farza.com/) (buildspace's founder): a cursor that lives next to yours, looks at your screen when you press a hotkey, and coaches you through software you don't know. It found me while I was fighting DaVinci Resolve. For twenty minutes I had a thing that actually looked at my timeline and told me what to click next. No prompting grammar, no context window, just a cursor paying attention to the same screen I am.

The public reception is good: [XDA called it](https://www.xda-developers.com/someone-built-tiny-ai-that-lives-next-to-your-cursor-the-most-useful-thing-ive-tried-this-year/) "the most useful thing I've tried in months," and it claims 25,000+ users. My reservation, which I can't prove: a few people I showed it to saw the cursor wake up and didn't know what to ask. The friction moved from operating the software to knowing what to want. Resonance is not retention. But that's an observation, not a measurement.

## My agents can't draw

The confession that sent me down this path: agents are inexplicably bad at diagrams. Ask a coding agent for a brainstorming diagram and you get Mermaid soup. It's a tracked failure mode. [Mermaid issue #7590](https://github.com/mermaid-js/mermaid/issues/7590): ChatGPT-generated Mermaid renders fine in ChatGPT's own preview, then throws syntax errors in the real editor, with [several](https://github.com/mermaid-js/mermaid/issues/5990) [siblings](https://github.com/mermaid-js/mermaid/issues/6166) in the tracker. Meanwhile, image models of the [Nano Banana](https://developers.googleblog.com/en/introducing-gemini-2-5-flash-image/) class will just *draw* you the diagram. The model that reasons about code produces worse diagrams than the model that reasons about pixels.

But an image is a raster: non-editable, non-versionable, invisible to a screen reader. Mermaid is semantic, diff-able code. That's why my own side project points the other way: an agent that drives tldraw directly, producing diagrams that are editable and in the canvas. Not solved yet. The point isn't the artifact, it's the shape: something working beside you in the canvas, not a vending machine for SVG you clean up afterward.

## The expensive gap is your own comprehension

The biggest barrier to agent-speed work isn't the model. It's your own comprehension. Projects outgrow the understanding of the person who wrote the first prompt, even when that person is you. An intermediary agent widens that gap with every run: each result is one more thing to trust blind or spend an hour reconstructing. An adjacent agent closes it, because you watched the work happen. [Sunil's earlier post](https://sunilpai.dev/posts/a-letter-from-the-orchestra-pit/), *a letter from the orchestra pit*, says it as a story: "there is a difference between understanding a thing and being inside its making."

It's also why most people handed this power don't know what to ask for. An adjacent agent teaches by showing. It does the move in front of you, and next time you know the move.

## The money is still on the other side

The steelman is strong. The relay is where the money and the measured capability are: [Cursor hit roughly $2B in ARR by March 2026](https://cursor.com/blog) (per Bloomberg) with cloud agents as the flagship, [Cognition raised Devin at a $26B valuation](https://www.cognition.ai/blog), [Codex sits at 72.80% on SWE-bench Verified](https://www.swebench.com/), and [METR](https://metr.org/research/) finds the length of task an AI can complete autonomously doubling roughly every seven months. So no, I'm not claiming beside beats between. It doesn't, not on any metric anyone is funding.

Then there's the awkward number. [METR's randomized trial](https://metr.org/research/) (July 2025) found AI tools made experienced open-source developers 19% *slower*. That undercuts the autonomy bull case, and also the naive "copilot is just better" case, which is my side of the argument. (METR has flagged selection effects and is redesigning the study.) We still don't know whether any of these patterns reliably makes experienced people faster.

## Convergence, not victory

Here's why I hold the thesis as a prediction anyway. [Cursor](https://cursor.com/blog), the company held up as proof that autonomy wins, is drifting toward beside. "Demos, not diffs" (March 2026): the agent shows you what it will build instead of handing you a diff to reverse-engineer. Design Mode (June 2026): "point, draw, or narrate UI changes… while agents edit the code underneath." You point, the agent edits, you watch. The canvas pattern, smuggled into the autonomy leader.

So the strongest version of this argument isn't "beside wins." It's convergence: the products that stick will do the work asynchronously while keeping you oriented. Between for the throughput. Beside for the comprehension. Even when the agent goes away, it leaves a cursor in your document, and the cursor comes back having shown you the move.

Google Docs shipped this a decade ago. Matt Webb's [poet, painter, and maker](https://blog.partykit.io/posts/ai-interactions-with-tldraw) raised their hands in 2023. Sunil named it last week. Somebody just has to make it the default: not a demo mode, not a curiosity, the thing you reach for first.

Make the agent one of the animals.
