---
title: "Explore once, script forever: turning web runs into scripts"
description: "Let an agent discover a messy web UI flow once, then export the exact tool commands as a deterministic bash script."
tldr: "Give the agent a Steel CLI and SKILL.md contract, force a snapshot/click/fill loop, then turn the successful run into a rerunnable bash script."
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

Agents can write code, reason through ambiguity, and call tools. But point them at a real website and everything falls apart:

- Login walls and MFA.
- Dynamic DOM.
- Cookie banners that move buttons around.
- Session state that leaks between attempts.
- Bot checks and random flakiness.

A five-minute human task becomes a twenty-minute agent debugging session.

A lot of this came from real pain while working on the Steel CLI release. I was experimenting heavily with how agents browse the web, including OpenClaw runs where I tried to get the agent to do something actually useful — like obtain an email for itself.

In my tests at the time, OpenClaw failed every end-to-end flow. That pressure pushed us to redesign the CLI and skill from scratch.

That pressure forced a hard lesson: CLIs are a good surface for coding agents like Claude Code and Codex because they are native to terminal workflows. With a strong model, a capable coding agent, and an agent-friendly CLI contract, you can overcome most web-flow chaos once and codify the winning path into a repeatable script. I wrote more about this in [Making CLIs Agent-Friendly with Loops and Schemas](/agent-ci).

A pattern that worked for me:

> Let the agent discover the web flow once, then export the exact commands it used as a bash script you can rerun.

This turns "agentic browsing" from a one-off demo into something reproducible, reviewable, and automatable.

One practical addition while testing that made this way of working easier was a small Steel web UI for live/recording session preview. It helped me observe every first-run decision the agent was making and catch issues before they became script logic.

![Steel web session preview during first-run debugging](/images/20260303_bash-article-steel-session.png)


## The missing layer: agent-native interfaces

This is less about model intelligence and more about interface design.

Browsers are hostile if you only give pixels. A CLI makes the interaction loop explicit:

1. Start (or attach to) a session
2. Open a URL
3. Snapshot the page (get a structured view of the DOM / interactables)
4. Take one action (click, fill, wait)
5. Snapshot again
6. Repeat until done
7. Stop the session

This is what I mean by ["agent experience" (AX)](https://biilmann.blog/articles/introducing-ax/): clear inputs, predictable outputs, and failures you can recover from.


## Skills are contracts (not vibes)

A "skill" is a capability with a contract. In practice that means a `SKILL.md` that spells out:

- When the agent should use it (trigger rules)
- The workflow (the command loop)
- The expected output shape (artifacts, extracted data, evidence)
- How to handle blockers (timeouts, missing elements, retries)

The win is simple: you keep "how to drive this tool" out of your prompts, and inside a reusable contract.


## My workflow: explore once, script forever

### 1) Give the agent a CLI

I used the brand-new [Steel CLI with its redesigned `steel-browser` skill](https://steel.dev/blog/steel-cli-and-agent-skill).
It is built for agent workflows: explicit session lifecycle commands, structured snapshots, and action primitives with predictable outcomes.
That contract makes discovery fast and reruns boringly consistent. See the [Steel CLI docs](https://docs.steel.dev/overview/steel-cli).

### 2) Add a SKILL.md contract

The skill enforces discipline. It biases the agent toward:

- A tight open -> snapshot -> act -> snapshot loop
- Small actions, one at a time
- Evidence artifacts (screenshots, PDFs, extracted text) at the end

### 3) Run a real task (not a toy)

Good test prompts are tasks where the website is the only source of truth:

- Download last month's invoice PDF from a portal
- Create something, then verify it exists
- Fill a multi-step checkout form up to (but not including) payment

### 4) Cash out the run into a bash script

Once the agent completes the flow, I ask it to convert:

> Take the exact commands you ran (in order), parameterize what changes (dates, names, IDs), and output a single bash script.

## Walk-through: prompt → screenshot → script

Prompt:

> Open ChatGPT, paste this prompt "The best headless cloud browser for OpenClaw", capture the response as a screenshot.

The agent ran the tight command loop (start -> open -> snapshot -> act -> snapshot) until it got to a stable "done" state.
Then it captured evidence as a full-page screenshot.

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

The **`e15` detail is where an "agent run" becomes automation**: you harden variable refs before rerunning.

### Turn it into a reusable script

Next prompt:

> save it as bash script and test it

The full script is in this gist:
[chatgpt_openclaw_capture.sh gist](https://gist.github.com/nibzard/ac0424ffdd3365d8c72a54584bc3b45c)

I tested it like this:

```bash
bash -ic '/home/agent/steel-tmp/chatgpt_openclaw_capture.sh "The best headless cloud browser for OpenClaw"'
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

The output isn't a transcript. It's a deterministic, reviewable procedure with a self-healing wrapper.


## Skill overlays: the next layer

The next layer is what I call skill overlays.

- Base skill: a strong generic skill that works across many sites and communicates CLI usage clearly to the agent.
- Skill overlay: domain-specific or domain-plus-action-specific guidance that captures the website's quirks.
- Codified run: the deterministic bash procedure exported from a successful run.

In practice, `base skill + skill overlay + codified run` is more deterministic than prompting alone, while still letting the agent self-heal when UI details drift.

- We are experimenting with skill overlays as first-class artifacts.
- Early internal runs suggest up to 10x fewer tokens and about 2x faster execution when overlays are combined with a codified bash run (roughly 10+ runs).
- These numbers are directional — not formally benchmarked — but outcome quality is noticeably better.


## From bash runbook to reusable Node CLI

Another outcome from this workflow: I took the hardened bash script plus logs from previous sessions and used them as reference context for an agent to build a dedicated Node CLI for the same task.

That gave me three layers:

- The bash runbook stays the deterministic baseline.
- The Node CLI wraps it as a reusable productized interface for that specific job.
- The agent can execute the CLI, observe failures, and self-heal by adjusting steps when the site changes.

I also used Steel credentials so authenticated state could be reused safely across runs, instead of hardcoding account details in scripts.
With that in place, I can use my ChatGPT subscription through the CLI and hand it to agents for repeatable research workflows like search and optimization workflows tied to content ranking, as covered in [The Hidden Language of Search](/search-translator).


## Practical notes

- Permissions and ToS: check the site's terms before automating and never commit credentials to version control.
- Parameterize early: dates, IDs, cities, names; turn them into variables so the script does not fossilize.
- Verify outputs: prefer scripts that end with evidence artifacts you can inspect.
- Keep sessions disciplined: name them, stop them, and do not let one run leak state into the next.


## The punchline

The script gives repeatability.
The agent gives self-healing.
Together, you get deterministic automation that adapts.
