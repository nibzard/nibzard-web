---
title: "Beside You, Not Between You"
description: "The best agent UX metaphor exists: the anonymous animal cursor in Google Docs. Agents as collaborators, not intermediaries."
tldr: "The best agent UX was shipped by Google Docs over a decade ago: the anonymous animal cursor. Sunil Pai named the thesis — an agent beside you in a shared canvas, not between you and your work. tldraw, Clicky, and my own diagramming project all point the same way. Even Cursor, the autonomy leader, is converging there."
date: 2026-07-23
tags: [AI, AGENTS, UX, OPINION]
draft: true
author: "Nikola Balić"
topics: [Agent UX, Human-AI collaboration, Canvas-based agents, Real-time co-presence, Diagramming with AI]
entities: [Google Docs, Sunil Pai, Pizzo, tldraw, Matt Webb, Clicky, Farza, Cursor, Mermaid, DaVinci Resolve]
answers_questions:
  - Why do most agent interfaces feel wrong despite capable models?
  - What does an "agent beside you" look like concretely in a UI?
  - If autonomy is where the money is, why is the market leader hybridizing toward co-presence?
  - Why are coding agents so bad at producing diagrams?
---

You already know the best agent interface ever shipped. You have used it a hundred times.

Open a Google Doc, share the link, and within seconds someone else's cursor appears — a little alligator, or an axolotl, or one of dozens of [anonymous animals](https://support.google.com/docs/answer/2494822?hl=en) — moving through the same page you are in. They are typing. You are typing. Neither of you is waiting on the other. Google even tells you so, verbatim: viewers who are not signed in "show up as anonymous animals."

That feature is [over a decade old](https://evert.meulie.net/faqwd/complete-list-anonymous-animals-on-google-drive-docs-sheets-slides/). And it is still the cleanest mental model we have for what an AI agent in your work should feel like.

So here is the question I keep turning over: **why is the agent not just one of the animals?**

I want to name where this thesis comes from, because the title of this piece is not mine. Three days before I started drafting, [Sunil Pai](https://sunilpai.dev/about) published [*one document, two hands*](https://sunilpai.dev/posts/one-document-two-hands/) — written about Pizzo, his collaborative music app — and the subtitle is the whole argument:

<blockquote class="featured-quote primary">
The agent belongs beside you, not between you and the app.
</blockquote>

I am not going to pretend I arrived at that phrasing independently. I arrived at the *feeling* independently — then Sunil named it better than I would have. This piece is me pointing at the same thing from a different angle and asking what it would take to actually ship it.

(One disclosure up front, since it shapes how you read me: I work at [Steel](https://steel.dev), a browser-infrastructure company for AI agents. The agent economy is the thing I am paid to think about. Take the opinion as partisan — but that is the disclosure.)

## The agent as a toll booth

Here is the dominant agent pattern today. You write a prompt. The agent disappears into a chat box. It does the work somewhere you cannot see. It comes back with a diff, or a document, or a pile of edited files. You review. You approve. You repeat.

The agent is a toll booth between you and your work.

Sunil draws the two shapes side by side, and it is the clearest version of the contrast I have seen. The bad pattern is a relay:

`you → chat box → agent → application → your thing`

The good pattern collapses the relay into co-presence:

`you + your agent → application → your thing`

The relay is the default because it is the easiest thing to build. You wrap a model in a background job, hand it a goal, and wait. Cursor, [Devin](https://www.cognition.ai/blog), [Claude Code's subagents](https://code.claude.com/docs/en/sub-agents), [OpenAI Codex](https://github.com/openai/codex) — every serious coding tool ships some version of "the agent goes away and comes back with the answer." Cursor's stated north star is a self-driving codebase.

The model can handle that now. The problem is not capability. The problem is that every run through the relay widens a gap, and the gap is the expensive part.

## The canvas is where co-presence gets real

The reason the animal-cursor metaphor has stuck with me is that it solves something the diff review never can: **you never lose track of what just happened, because you watched it happen.**

This is not hypothetical anymore. [tldraw offline](https://tldraw.dev/blog/tldraw-offline) shipped in July 2026 as "the local whiteboard for you and your agents," and the description is blunt about what the agents do: they "drive the canvas to create shapes, import assets, listen to changes." Not generate a file and hand it back. *Drive the canvas.* The earlier [tldraw MCP App](https://tldraw.dev/blog/tldraw-mcp-app) (March 2026) put it even more directly: "your agent can interact with the canvas in the same way that you could as a user" — and it rolled out into Cursor, VS Code, ChatGPT, and Claude. These are dated, shipped products, not concept videos.

The thing that makes a shared canvas different from a chat is shared spatial context. There is no diff to review afterward because there was no "afterward." The agent moved a node, you saw it move, you moved the next one. The [MCP App's own framing](https://tldraw.dev/blog/tldraw-mcp-app) is that it passes "the current state of the canvas back into the chat context so your agent will understand changes as they happen." The state is the conversation.

I keep calling this the offline-collaborator feeling. You know how, in a multiplayer doc, you sometimes can't tell whether the other person stepped away or is just thinking? That ambiguity is the point. The agent is just *there*, in the document, working. Not between you and the work. In the work.

And credit where it is due — this idea is older and more articulated than I realized. The single best primary source for it is not a 2026 post at all. It is [Matt Webb's October 2023 piece for PartyKit](https://blog.partykit.io/posts/ai-interactions-with-tldraw), "Exploring AI interaction design and multiplayer with tldraw." Webb built proactive NPCs on the tldraw canvas — a poet, a painter, a maker — that "put their hand up to offer" help, and used cursor movement to signal "the locus of attention of the NPC." He was naming this thesis almost three years before the rest of us caught up. If anyone deserves the "first" label on agent-as-teammate, it is him.

## Watch-and-coach, not watch-and-wait

There is a lighter variant of "beside you" that hit me personally, and it does not need a canvas at all.

[Clicky](https://www.heyclicky.com/) is a Mac-only app by [Farza](https://www.farza.com/) (Farza Majeed, buildspace's founder). It is a cursor that lives next to yours, watches your screen, and coaches you through software you do not know. It went viral in April 2026, and the lineage is not random — Farza previously built Visor, a real-time vision model that coached Overwatch players. Clicky is the same watch-and-coach instinct, pointed at apps instead of games.

It hit me because I was fighting DaVinci Resolve at the time, and DaVinci Resolve is on [Clicky's supported-apps list](https://www.producthunt.com/products/clicky-2). For twenty minutes I had a thing that actually looked at my timeline and told me what to click next. That is the most intuitive version of "beside you" I have felt — no prompting grammar, no context window, just a cursor that is paying attention to the same screen I am.

The mechanics matter here, because it is easy to overstate. Clicky is not continuously recording you. Its [FAQ](https://www.heyclicky.com/) is explicit: "we only see your screen when you press the hotkey, and screenshots are never stored." It is on-demand coaching, not surveillance.

And I want to be honest about the reception, because my skepticism is a hunch, not a finding. The one substantive independent review I can find, [from XDA](https://www.xda-developers.com/someone-built-tiny-ai-that-lives-next-to-your-cursor-the-most-useful-thing-ive-tried-this-year/), is glowing — "the most useful thing I've tried in months." Clicky claims 25,000+ happy users, and Greg Brockman called GPT Realtime 2 — the model behind its viral demo — "real magic." So by the public record, it landed.

My personal reservation — and I cannot prove this — is that intuitive is not the same as sufficient. A few people I showed it to downloaded it, saw the cursor wake up, and then did not know what to ask. The friction moved from *operating the software* to *knowing what you wanted from the coach*. Resonance is not retention. But I will flag that as my own observation, not a documented trend, because nobody has measured it.

## My agents cannot draw

Here is the confession that sent me down this whole path: **agents are inexplicably bad at diagrams.**

Ask a coding agent for a high-quality brainstorming diagram and you get Mermaid soup that needs endless hand-holding. This is not a vibe — it is a tracked failure mode. [Mermaid issue #7590](https://github.com/mermaid-js/mermaid/issues/7590), opened in April 2026 and still open, puts it perfectly: a Mermaid diagram "generated in ChatGPT (native Mermaid support) renders correctly in the ChatGPT preview. However, when the exact same Mermaid code is copied and pasted into the Mermaid code editor, the editor shows a syntax error." First-party LLM output that does not survive contact with the real renderer. There are [several](https://github.com/mermaid-js/mermaid/issues/5990) [siblings](https://github.com/mermaid-js/mermaid/issues/6166) in the tracker.

Meanwhile, image models — [Nano Banana](https://developers.googleblog.com/en/introducing-gemini-2-5-flash-image/)-class — will just *draw* you a diagram. Google even lists "diagrams" as a text-rendering use case in its own docs. Sit with how weird that is: the model that has to reason about code produces worse diagrams than the model that has to reason about pixels.

The tradeoff is real, and worth naming. An image is a raster — non-editable, non-versionable, invisible to a screen reader. Mermaid is editable semantic code, diff-able and deterministic. There is no benchmark comparing the two, and "image models draw better diagrams" is my subjective experience for a throwaway brainstorming sketch, not a measured result.

The tension is that my actual side project points the opposite way from lauding raster output. I have been building an agent that drives tldraw directly to produce diagrams — editable, structured, in the canvas. It is not solved yet, and that is fine. The point is not the artifact, it is the *shape*: a force multiplier working in your canvas alongside you, not a vending machine for SVG you then have to clean up. tldraw itself has been [showing this off](https://tldraw.dev/blog/building-with-tldraw-offline) — agents building a data visualizer, a kanban, a task tracker on the canvas in real time. That is the target.

## The expensive gap is your own comprehension

Here is the deeper reason "beside" matters, and it is the part I care most about.

The biggest barrier to agent-speed work is not the model. It is **your own comprehension.** Projects outgrow the understanding of the person who wrote the first prompt — even when that person is you. You ship faster than you can keep up, and at some point you are editing a codebase or a document you no longer fully hold in your head.

An intermediary agent widens that gap with every run. It does the work in the dark and hands you a result, and each result is one more thing you have to either trust blind or spend an hour reconstructing. An adjacent agent closes the gap, because you see the work as it happens — you stay inside the making of the thing.

I am restating an argument someone else made vivid here. [Sunil's earlier post](https://sunilpai.dev/posts/a-letter-from-the-orchestra-pit/), *a letter from the orchestra pit*, lands the same point through a silent-film orchestra musician watching talking pictures arrive: "there is a difference between understanding a thing and being inside its making." That is the comprehension gap, said as a story instead of a claim.

This is also why most people who now have access to this power do not know what to ask for. They have been handed an intermediary and a blank prompt box. An adjacent agent teaches by showing — it does the move in front of you, and next time you know the move. The interface is the lesson.

## The money is still on the other side

I would not write any of this if I thought "beside" was obviously winning. It is not. Here is the honest steelman, and it is strong.

The pure intermediary pattern — the exact relay I am critiquing — is where the money and the measured capability are. [Cursor hit roughly $2B in ARR by March 2026](https://cursor.com/blog) (per Bloomberg) with cloud agents as the flagship; customers credit those agents directly, Faire "doubles PR throughput" and Coinbase "reduces time from idea to production by 90%." [Cognition raised Devin at a $26B valuation](https://www.cognition.ai/blog) in May 2026. [OpenAI Codex sits at 72.80% on SWE-bench Verified](https://www.swebench.com/). And [METR's research](https://metr.org/research/) finds the length of task an AI can complete autonomously has doubled roughly every seven months for six years. The relay is printing money and getting better on a curve.

So let me not pretend "beside beats between." It does not, not yet, not on the metrics anyone is funding.

There is one finding I have to carry carefully because it cuts both ways. [METR's randomized trial](https://metr.org/research/) (July 2025) found that inline AI tools made experienced open-source developers **19% slower** — "when developers use AI tools, they take 19% longer than without." That undercuts the autonomy bull case. It also undercuts any naive "copilot is just better" claim, which is the side of the argument I am closer to. METR itself has flagged selection effects in the study and is redesigning it as of February 2026, so I cite the 19% with that caveat attached. The honest read is: we still do not know, at population scale, whether any of these patterns reliably make experienced people faster.

## Convergence, not victory

But here is the detail that makes me think the thesis is still worth holding, and holding as a prediction rather than a preference.

[Cursor](https://cursor.com/blog) — the company held up as proof that autonomy wins — is itself moving toward "beside." Around March 2026 it started shipping "demos, not diffs": the agent shows you what it is going to build instead of handing you a diff to reverse-engineer. Then in June 2026 came Design Mode: "point, draw, or narrate UI changes… while agents edit the code underneath." You point. The agent edits. You watch it happen. That is the canvas pattern, smuggled into the autonomy leader.

So the strongest defensible version of this argument is not "beside wins" or "autonomy wins." It is **convergence.** The products that stick will be the ones that do the work asynchronously — the relay's leverage is real — while keeping you oriented while they do it. Between for the throughput. Beside for the comprehension.

That is the prediction I will put a stake on. Not that the agent stops going away to work. That even when it goes away, it leaves a cursor in your document, and the cursor comes back having shown you the move.

The future of agent UX was shipped by Google Docs over a decade ago. A poet, a painter, and a maker already [put their hands up](https://blog.partykit.io/posts/ai-interactions-with-tldraw) on a tldraw canvas in 2023. Sunil named it a few days ago. Somebody just has to take it seriously enough to make it the default — not a demo mode, not a Design Mode, not a curiosity. The thing you reach for first.

Make the agent one of the animals.
