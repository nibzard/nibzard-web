---
title: "Explore once, script forever: cashing out web runs"
description: "Let an agent discover a messy web UI flow once, then export the exact tool commands as a deterministic bash script."
tldr: "Give the agent a CLI plus a SKILL.md contract, force a snapshot/click/fill loop, then cash out the successful run into a rerunnable bash script."
date: 2026-03-04
tags: [AI, AGENTS, AUTOMATION, BASH, CLI, AX]
draft: true
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

So I started using a pattern that feels obvious in hindsight:

> Let the agent discover the web flow once, then export the exact commands it used as a bash script you can rerun.

That is the whole idea. It turns "agentic browsing" from a one-off demo into something I can re-run, diff, and automate.

---

## The missing layer: agent-native interfaces

The biggest unlock for me was not "a smarter model." It was giving the model an interface that is built for agents.

Browsers are hostile for automation if you only show the model pixels and say "good luck." What you want instead is a CLI that makes the interaction loop explicit:

1. Start (or attach to) a session
2. Open a URL
3. Snapshot the page (get a structured view of the DOM / interactables)
4. Do a small action (click, fill, wait)
5. Snapshot again
6. Repeat until done
7. Stop the session

This is what I mean by "agent experience" (AX): clear inputs, predictable outputs, and failures you can recover from.

---

## Skills are contracts (not vibes)

If you are using Codex, a "skill" is basically a capability with a contract. In practice that means a `SKILL.md` that spells out:

- When the agent should use it (trigger rules)
- The workflow (the command loop)
- The expected output shape (artifacts, extracted data, evidence)
- How to handle blockers (timeouts, missing elements, retries)

The win is simple: you keep "how to drive this tool" out of your prompts, and inside a reusable contract.

---

## My workflow: explore once, script forever

Here is the flow I use.

### 1) Give the agent a CLI

Pick whatever "agent-native browser" you like. The key is that every interaction is a command with output you can review.

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

> Take the exact commands you ran (in order), parameterize what changes (dates, names, IDs), add `set -euo pipefail`, and output a single bash script.

That is the moment the workflow becomes reusable automation.

---

## A concrete walk-through (real run: prompt -> screenshot -> script)

This is a real workflow I ran end-to-end in a Codex session.

Pre-flight friction (the boring kind that kills automation): I had two `steel` binaries installed, and the old one (`/usr/bin/steel`) was winning on PATH. The fix was simply to prioritize the npm global bin dir so `steel --version` matched what I thought I installed.

Prompt I gave the agent:

> Open ChatGPT, paste this prompt "The best headless cloud browser for openclaw", capture the response as a screenshot.

The agent ran the tight command loop (start -> open -> snapshot -> act -> snapshot) until it got to a stable "done" state, then captured evidence (a full-page screenshot).

Then I asked the agent:

> now list all commands line by line that worked

It "cashed out" the run as a literal command list:

```bash
SESSION=chatgpt-openclaw-$(date +%s)
echo "$SESSION" > /tmp/steel_session_name
steel browser start --session "$SESSION"
steel browser open https://chatgpt.com --session "$SESSION"
steel browser snapshot -i --session "$SESSION"
steel browser fill e15 "The best headless cloud browser for openclaw" --session "$SESSION"
steel browser press Enter --session "$SESSION"
steel browser wait --load networkidle --session "$SESSION"
steel browser snapshot -i --session "$SESSION"
for i in {1..20}; do OUT=$(steel browser snapshot -i --session "$SESSION"); echo "$OUT" > /tmp/steel_snapshot_latest.txt; if ! echo "$OUT" | rg -q "Stop streaming"; then echo "stream_complete"; break; fi; sleep 1; done
steel browser screenshot --full /home/agent/steel-tmp/chatgpt-openclaw-response.png --session "$SESSION"
steel browser stop --session "$SESSION"
ls -lh /home/agent/steel-tmp/chatgpt-openclaw-response.png
file /home/agent/steel-tmp/chatgpt-openclaw-response.png
```

Two important details:

- `e15` was the textbox ref in that specific snapshot. In a new session it may be `e7`, `e42`, whatever.
- "Stop streaming" is a useful completion signal. The run polls snapshots until that UI affordance disappears.

At this point you already have something valuable: a deterministic, reviewable run that ends with an artifact you can inspect.

But the `e15` thing is exactly where "agent run" becomes "automation": you harden it.

### Cashing it out into a reusable script

Next prompt:

> save it as bash script and test it

The script below does the same flow, but makes textbox detection dynamic by parsing the snapshot output for the first textbox ref.

Gist: https://gist.github.com/nibzard/ac0424ffdd3365d8c72a54584bc3b45c

```bash
#!/usr/bin/env bash
set -euo pipefail

if ! command -v steel >/dev/null 2>&1; then
  echo "error: steel CLI not found in PATH" >&2
  exit 1
fi

if ! command -v rg >/dev/null 2>&1; then
  echo "error: rg (ripgrep) is required" >&2
  exit 1
fi

PROMPT="${1:-The best headless cloud browser for openclaw}"
OUTPUT_PATH="${2:-/home/agent/steel-tmp/chatgpt-openclaw-response.png}"
CHATGPT_URL="${3:-https://chatgpt.com}"
MAX_WAIT_SECONDS="${MAX_WAIT_SECONDS:-30}"

SESSION="chatgpt-openclaw-$(date +%s)"
TMP_DIR="$(mktemp -d)"

cleanup() {
  steel browser stop --session "$SESSION" >/dev/null 2>&1 || true
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT

echo "Starting session: $SESSION"
steel browser start --session "$SESSION" >/dev/null

echo "Opening ChatGPT..."
steel browser open "$CHATGPT_URL" --session "$SESSION" >/dev/null
SNAPSHOT_FILE="$TMP_DIR/snapshot.txt"
steel browser snapshot -i --session "$SESSION" >"$SNAPSHOT_FILE"

TEXTBOX_REF="$(rg -o 'textbox \[ref=e[0-9]+\]' "$SNAPSHOT_FILE" | head -n1 | rg -o 'e[0-9]+')"
if [[ -z "${TEXTBOX_REF:-}" ]]; then
  echo "error: could not find textbox ref in snapshot output" >&2
  exit 1
fi

echo "Submitting prompt..."
steel browser fill "$TEXTBOX_REF" "$PROMPT" --session "$SESSION" >/dev/null
steel browser press Enter --session "$SESSION" >/dev/null
steel browser wait --load networkidle --session "$SESSION" >/dev/null || true

echo "Waiting for response to finish..."
for ((i=1; i<=MAX_WAIT_SECONDS; i++)); do
  steel browser snapshot -i --session "$SESSION" >"$SNAPSHOT_FILE"
  if ! rg -q "Stop streaming" "$SNAPSHOT_FILE"; then
    break
  fi
  sleep 1
done

echo "Capturing screenshot: $OUTPUT_PATH"
steel browser screenshot --full "$OUTPUT_PATH" --session "$SESSION" >/dev/null
echo "Saved: $OUTPUT_PATH"
```

I tested it like this (note the `bash -ic` so the script runs with my interactive PATH):

```bash
bash -ic '/home/agent/steel-tmp/chatgpt_openclaw_capture.sh "The best headless cloud browser for openclaw" "/home/agent/steel-tmp/chatgpt-openclaw-response-test2.png"'
```

Result: `chatgpt-openclaw-response-test2.png` created successfully (PNG, 1915 x 989, 167K).

![Captured response: The best headless cloud browser for OpenClaw](/images/chatgpt-openclaw-response-test2.png)

*Screenshot evidence from a successful rerunnable run: the same command loop captured this exact assistant response in-chat.*

And because we ended with an artifact, we can keep the verification loop honest: after capture, I asked "read the screenshot" and the agent transcribed the visible response text from the image.

---

## Why this works (and why it scales)

It separates discovery from execution.

- Discovery is messy. The agent experiments, snapshots, retries, and learns where the UI moved.
- Execution should be boring. Same commands, same session discipline, same evidence capture.

The "cash out" step is what makes it real: the end product is not the chat transcript. It is a deterministic, reviewable script.

---

## Practical notes

- Permission and ToS: automate what you are allowed to automate; treat credentials as radioactive.
- Parameterize early: dates, IDs, cities, names; turn them into variables so the script does not fossilize.
- Verify outputs: prefer scripts that end with evidence artifacts you can inspect.
- Keep sessions disciplined: name them, stop them, and do not let one run leak state into the next.

---

## The punchline

The best part of this pattern is psychological:

I stop thinking of the agent as the automation.
I treat the agent as the automation author.

The agent explores the website, figures out the reliable path, and hands me a script. After that, the script is the product.
