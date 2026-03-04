---
title: "Explore once, script forever: cashing out web runs"
description: "Let an agent discover a messy web UI flow once, then export the exact tool commands as a deterministic bash script."
tldr: "Give the agent a Steel CLI plus a SKILL.md contract, force a snapshot/click/fill loop, then convert the successful run into a rerunnable bash script."
date: 2026-03-04
tags: [AI, AGENTS, AUTOMATION, BASH, CLI, AX]
draft: false
featured: false
author: "Nikola Balić"
topics: [agent experience, skills as contracts, deterministic automation, browser workflows, bash scripting]
entities: [Codex, SKILL.md, Steel, ChatGPT, OpenClaw, bash, CLI, DOM, bot checks]
answers_questions:
  - Why do agents struggle with real websites?
  - How do you make agent web runs predictable and reviewable?
  - How do you turn a successful agent run into a bash script?
---

Agents can write code, reason through ambiguity, and call tools. And then you point them at a real website and everything gets messy:

- Login walls and MFA.
- Dynamic DOM.
- Cookie banners that move buttons around.
- Session state that leaks between attempts.
- Bot checks and random flakiness.

What is a five-minute human task becomes a twenty-minute agent debugging session.

A lot of this came from real pain while working on the Steel CLI release. I was experimenting heavily with how agents browse the web, including OpenClaw runs where I tried to get the agent to do something actionable, like obtain an email for itself.

In my tests, OpenClaw failed every actionable flow (effectively a 100% failure rate). That pressure pushed us to ship the redesigned, re-architected CLI and skill.

CLIs are a good surface for coding agents like Claude Code and Codex because they are native to terminal workflows.
With a strong model, a capable coding agent, and an agent-friendly CLI contract, you can overcome most web-flow chaos once and codify the winning path into a repeatable script.
I wrote more about this in [Making CLIs Agent-Friendly with Loops and Schemas](/agent-ci).

A pattern that worked for me:

> Let the agent discover the web flow once, then export the exact commands it used as a bash script you can rerun.

This turns "agentic browsing" from a one-off demo into something reproducible, reviewable, and automatable.

One practical addition while testing that made this way of working easier was a small Steel web UI for live/recording session preview. It helped me observe every first-run decision the agent was making and catch issues before they became script logic.

![Steel web session preview during first-run debugging](/images/20260303_bash-article-steel-session.png)


## The missing layer: agent-native interfaces

This is less about a smarter model and more about an interface designed for agents.

Browsers are hostile if you only give pixels. A CLI makes the interaction loop explicit:

1. Start (or attach to) a session
2. Open a URL
3. Snapshot the page (get a structured view of the DOM / interactables)
4. Do a small action (click, fill, wait)
5. Snapshot again
6. Repeat until done
7. Stop the session

This is what I mean by ["agent experience" (AX)](https://biilmann.blog/articles/introducing-ax/): clear inputs, predictable outputs, and failures you can recover from.


## Skills are contracts (not vibes)

A "skill" is basically a capability with a contract. In practice that means a `SKILL.md` that spells out:

- When the agent should use it (trigger rules)
- The workflow (the command loop)
- The expected output shape (artifacts, extracted data, evidence)
- How to handle blockers (timeouts, missing elements, retries)

The win is simple: you keep "how to drive this tool" out of your prompts, and inside a reusable contract.


## My workflow: explore once, script forever

Here is the flow I use.

### 1) Give the agent a CLI

I used the brand-new [Steel CLI with its redesigned `steel-browser` skill](https://steel.dev/blog/steel-cli-and-agent-skill).
It is built for agent workflows: explicit session lifecycle commands, structured snapshots, and action primitives with predictable outcomes.
That contract makes discovery fast and reruns boringly consistent. See the [Steel CLI docs](https://docs.steel.dev/overview/steel-cli).

### 2) Add a SKILL.md contract

The skill is what forces discipline. It should bias the agent toward:

- A tight open -> snapshot -> act -> snapshot loop
- Small actions, one at a time
- Evidence artifacts (screenshots, PDFs, extracted text) at the end

### 3) Run a real task (not a toy)

Good prompts are tasks where the website is the source of truth:

- Download last month's invoice PDF from a portal
- Create something, then verify it exists
- Fill a multi-step checkout form up to (but not including) payment

### 4) Cash out the run into a bash script

Once the agent finally nails the flow, I ask for a conversion:

> Take the exact commands you ran (in order), parameterize what changes (dates, names, IDs), and output a single bash script.

That is the moment the workflow becomes reusable automation.


## A concrete walk-through (real run: prompt -> screenshot -> script)

Prompt:

> Open ChatGPT, paste this prompt "The best headless cloud browser for OpenClaw", capture the response as a screenshot.

The agent ran the tight command loop (start -> open -> snapshot -> act -> snapshot) until it got to a stable "done" state, then captured evidence (a full-page screenshot).

Then I asked the agent:

> Now list all commands line by line that worked

It returned the successful run as a literal command list:

```bash
SESSION=chatgpt-openclaw-$(date +%s)
echo "$SESSION" > /tmp/steel_session_name
steel browser start --session "$SESSION"
steel browser open https://chatgpt.com --session "$SESSION"
steel browser snapshot -i --session "$SESSION"
steel browser fill e15 "The best headless cloud browser for OpenClaw" --session "$SESSION"
steel browser press Enter --session "$SESSION"
steel browser wait --load networkidle --session "$SESSION"
steel browser snapshot -i --session "$SESSION"
for i in {1..20}; do
  OUT=$(steel browser snapshot -i --session "$SESSION")
  echo "$OUT" > /tmp/steel_snapshot_latest.txt
  if ! echo "$OUT" | rg -q "Stop streaming"; then
    echo "stream_complete"
    break
  fi
  sleep 1
done
steel browser screenshot --full /home/agent/steel-tmp/chatgpt-openclaw-response.png --session "$SESSION"
steel browser stop --session "$SESSION"
ls -lh /home/agent/steel-tmp/chatgpt-openclaw-response.png
file /home/agent/steel-tmp/chatgpt-openclaw-response.png
```

Two important details:

- `e15` was the textbox ref in that specific snapshot. In a new session it may be `e7`, `e42`, whatever.
- "Stop streaming" is a useful completion signal. The run polls snapshots until that UI affordance disappears.

The `e15` detail is where an "agent run" becomes automation: you harden variable refs before rerunning.

### Turn it into a reusable script

Next prompt:

> save it as bash script and test it

The full script is in this gist:
[chatgpt_openclaw_capture.sh gist](https://gist.github.com/nibzard/ac0424ffdd3365d8c72a54584bc3b45c)

I tested it like this:

```bash
bash -ic '/home/agent/steel-tmp/chatgpt_openclaw_capture.sh "The best headless cloud browser for OpenClaw" "/home/agent/steel-tmp/chatgpt-openclaw-response-test2.png"'
```

Result: `chatgpt-openclaw-response-test2.png` created successfully (PNG, 1915 x 989, 167K).

![Captured response: The best headless cloud browser for OpenClaw](/images/chatgpt-openclaw-response-test2.png)

*Screenshot evidence from a successful rerunnable run: the same command loop captured this exact assistant response in-chat.*

After capture, I verified by asking the agent to read the screenshot and transcribe the visible response text.


## Why this works (and why it scales)

It separates discovery, execution, and recovery.

- Discovery is messy. The agent experiments, snapshots, retries, and learns where the UI moved.
- Execution should be boring. Same commands, same session discipline, same evidence capture.
- Recovery stays adaptive. You can run the deterministic script inside an agent, and if the page changes, the agent can resnapshot, patch the step, and continue.

The output is no longer just a transcript. It is a deterministic, reviewable procedure with a self-healing wrapper.


## Skill overlays: the next layer

I expect a lot from what I call skill overlays.

- Base skill: a strong generic skill that works across many sites and communicates CLI usage clearly to the agent.
- Skill overlay: domain-specific or domain-plus-action-specific guidance that captures the website's quirks.
- Codified run: the deterministic bash procedure exported from a successful run.

In practice, `base skill + skill overlay + codified run` is more deterministic than prompting alone, while still letting the agent self-heal when UI details drift.

- We are experimenting with skill overlays as first-class artifacts.
- Early internal runs suggest up to 10x fewer tokens and about 2x faster execution when overlays are combined with a codified bash run.
- These numbers are still directional, not formally benchmarked yet, but the outcome quality is already noticeably better.


## From bash runbook to reusable Node CLI

Another outcome from this workflow: I took the hardened bash script plus logs from previous sessions and used them as reference context for an agent to build a dedicated Node CLI for the same task.

That changed the operating model:

- The bash runbook stays the deterministic baseline.
- The Node CLI wraps it as a reusable productized interface for that specific job.
- The agent can execute the CLI, observe failures, and self-heal by adjusting steps when the site changes.

I also used Steel credentials so authenticated state could be reused safely across runs, instead of hardcoding account details in scripts.
With that in place, I can use my ChatGPT subscription through the CLI and hand it to agents for repeatable research workflows like agentic optimization, answer engine optimization (AEO), and generative engine optimization (GEO).
Related context: [The Hidden Language of Search](/search-translator).


## Practical notes

- Permissions and ToS: automate only what you are allowed to automate; treat credentials as sensitive secrets.
- Parameterize early: dates, IDs, cities, names; turn them into variables so the script does not fossilize.
- Verify outputs: prefer scripts that end with evidence artifacts you can inspect.
- Keep sessions disciplined: name them, stop them, and do not let one run leak state into the next.


## The punchline

This is not just "run a bash script."
It is deterministic automation with an adaptive agent wrapper.
The script gives repeatability, and the agent gives self-healing.
