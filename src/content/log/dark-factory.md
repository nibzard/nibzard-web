---
title: "A Software Factory Is No Substitute for Maturity"
description: "The real barrier to the software dark factory isn't agent capability. It's the organizational capability to manage them."
tldr: "Agent fleets don't remove organizational dysfunction, they write it down. Agents still need a clear objective, someone who can make the call, and a rule for when to stop and ask. A shop with its act together gets faster. A shop without one ships its confusion at a much higher rate."
date: 2026-07-31
tags: [HUMAN, OPINION, AI, AGENTS]
draft: false
author: "Nikola Balić"
topics: [Software dark factory, Autonomous agent fleets, Organizational capability, Engineering management, AI-native development, Wish Factory]
entities: [Software dark factory, Steve Yegge]
answers_questions:
  - Why won't autonomous agent fleets fix underperforming software organizations?
  - What do agent fleets require from the organizations that run them?
  - What is the real barrier to the software dark factory?
  - What happens when requesting software becomes nearly free?
---

The pitch for the software dark factory is that you swap the dev team for a fleet of agents and software comes out the other end. Fine. But it skips the question I'd want answered first: why was the team slow?

In the mid-sized companies I've worked in, it was never coding capacity. Nobody was standing around waiting for more hands on keyboards. It was that nobody could say what "done" meant, or who owned the decision, or which of the five priorities was the real one this week. Every rule had an exception. Give it a year and the exceptions were the rule.

Point a fleet of agents at that and it doesn't go away. It gets written down. Agents want the same things the humans weren't getting: a clear objective, someone who can make the call, a rule for when to stop and ask. And they're worse at guessing than a senior engineer who's been in the codebase four years and knows what you actually meant when you said "just make the report faster."

<blockquote class="featured-quote primary">
    An organization that can't coordinate human developers doesn't get better because the developers are artificial.
</blockquote>

Teams and fleets are both shaped by the place they run in, which is the boring version of all this. A shop with its act together gets faster at what it was already good at. A shop without one ships its confusion at a much higher rate, and the debt comes out looking deliberate, which is somehow worse than the usual mess.

So the wall isn't agent capability. It's whether you can run the thing.

## Edit: Yegge gets there too

I read [Yegge](https://yegge.ai/essays/the-shape-of-things-to-come/). Not to my taste. Too much abstraction, too much worldbuilding, Gas Town and Beads and Molecules. But dig through the bible of words and the conclusions are right.

He runs the most aggressive agent fleet in public. Nearly two hundred commits a day, sometimes more. The code was never the bottleneck. The merge queue was. A quarter of his work is now the harness that runs the work. Agentic engineering is organizational engineering, he says. Yeah. That's the thing above.

One thing he adds that I hadn't gotten to. When asking for software is free, the asking doesn't stop. His Wish Factory takes a wish, not a spec. An organization that could never say no now gets to build everything it couldn't say no to. The factory doesn't fix bad judgment. It industrializes it.
