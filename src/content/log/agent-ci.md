---
title: "CI for Agent Behavior: Bullying a CLI Into Being Useful"
description: "Building reliable agent tooling through loops, logs, and schemas."
date: 2025-02-17
tags: [AGENTS, AUTOMATION, CLI, TOOLING]
draft: false
---

CLIs are great if you have fingers, patience, and a decent tolerance for "RTFM." Agents have none of those. They don't "remember" that one flag you always forget, they don't infer intent from vibes, and they will happily brick your flow by hallucinating a subcommand that never existed.

I wanted a CLI that I can hand to my web automation agent (OpenClaw) and say: go find things online, do actions, report back. Not "click around and hope," but execute with enough structure that I can debug what went wrong when it inevitably goes wrong.

So I started where boring people start: the OpenAPI JSON. Steel already has it. From there, I built a "looper." It's a bash script. Yes. It runs a single prompt in a loop. Think RALPH loop, but with a little more structure. I named it German Cousin Ralf, because if you're going to rely on a bash script, you might as well give it a name that sounds like it files taxes on time.

The loop's output isn't just code. The main artifact is a todo JSON file that becomes the project's living backlog. The agent scaffolds tasks from a spec you give it (I began with a SPECS.md brain dump referencing the official Steel.dev API), then it picks what to do next. Crucially, it can add tasks as it discovers missing pieces. The list snowballed to ~140 tasks. That's not scope creep; that's reality being more detailed than your first draft.

Observability matters. A loop that produces "some code" is cute. A loop that produces a verifiable task graph is useful. To keep the agent from turning the backlog into abstract art, I added a schema file that the agent maintains and validates against. Boring constraint, huge payoff: less randomness, more determinism, and re-runs that don't feel like rolling dice in production.

Then I let it run. For two to three days. Codex 5.3 Spark (the super fast OpenAI model) chewing through tasks, wiring up commands, cleaning edges. At the end, I ran a second loop: the review loop. Prompt: "Review this as a senior engineer. Fix bugs. Simplify. Add missing tasks." You'd be surprised how much "polish" is just "remove the weird thing you thought was clever at 2am."

Finally, the third loop: Steel Web Loop. This one is a verification harness disguised as chaos. Each run, the agent picks a random useful web action—read headlines, scrape a page, navigate Wikipedia, whatever—and executes it end to end using the CLI it just built. After each run, it updates a lessons file: task chosen, commands used, what succeeded, what failed, what was learned. Fifty runs per loop. Some succeed, some eat glass, all leave a paper trail.

And that's the point. Iteration beats perfection. Every time. Agent reliability isn't a philosophical stance. It's loops, logs, schemas, and your tooling getting bullied into competence. Your opinion about AI won't matter. Your competitor's cycle time will.

<iframe src="https://platform.twitter.com/embed/Tweet.html?dnt=true&embedId=twitter-widget-0&frame=false&hideCard=false&hideThread=false&id=2023807296095076773&lang=en&origin=file%3A%2F%2F%2Fhome%2Fniko%2Fnibzard-web%2Fsrc%2Fcontent%2Flog%2Fagent-ci.md&sessionId=9e5b5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c&theme=dark&widgetsVersion=2615f7e52b7e0%3A1702314776719&width=550px" style="border: none; max-width: 100%; min-width: 180px; margin: 0 auto; display: block;" width="550" height="400" data-tweet-url="https://x.com/nibzard/status/2023807296095076773"></iframe>
