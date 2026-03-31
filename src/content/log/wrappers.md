---
title: "Bash Owns the Loop"
description: "A durable wrapper pattern for autonomous agents: Bash owns state, validation, recovery, and completion."
tldr: "After building several personal autonomous loops, I kept returning to the simplest design: treat Codex or Claude as a short-lived worker inside a Bash loop. The shell owns state, scheduling, validation, recovery, and done conditions. The agent does one bounded unit of work and returns JSON."
date: 2026-03-31
tags: [AI, AGENTS, BASH, AUTOMATION, TOOLS]
draft: false
author: "Nikola Balić"
topics: [Autonomous agent wrappers, Bash control planes, non-interactive AI agents, resumable workflows, structured output contracts]
entities: [Looper, Codex CLI, Claude CLI, Bash, jq]
answers_questions:
  - "How do you build a reliable autonomous agent wrapper?"
  - "Why should Codex or Claude run as short-lived worker processes?"
  - "What belongs in the Bash wrapper versus inside the agent?"
  - "How do you make autonomous loops resumable and safe?"
---

While building a pile of personal autonomous loops, I kept coming back to the simplest version: [Looper](https://github.com/nibzard/looper).

Not because it was the coolest one. Usually it wasn't.

I kept coming back because it held up once the novelty wore off.

These notes are mostly for me. I wanted one place I can come back to before I start the next loop project and talk myself into needless complexity again. But if you are building one too, treat this as both a memo and a prompt for a coding agent. When I say "build me a new loop," this is more or less what I mean.

I have used the same shape for coding projects, triage queues, and article writing. The work changes. The control plane mostly doesn't.

<blockquote class="featured-quote primary">
Treat Claude or Codex as a short-lived worker process inside a controlled Bash loop, not as a chat session.
</blockquote>

That's basically the whole article.

Once you accept that framing, half the design debate goes away.

## The smallest version keeps winning

When people talk about autonomous agents, the conversation tends to drift toward swarms, long-lived memory, role systems, model orchestration, special protocols, and a lot of machinery that looks impressive in diagrams.

I like ambitious systems too. I build them. I read them. I steal from them shamelessly.

But whenever I want something I can actually trust on my own machine, I end up back at the smallest durable version: a shell script that owns the loop and an agent process that does one bounded thing before exiting.

Bash is not elegant. Good.

It lives right next to the filesystem, the process model, exit codes, env vars, and all the ugly edges where automation actually breaks. That makes it a very good home for the boring parts you do not want an LLM improvising.

The shell should own:

1. task selection
2. state persistence
3. prompt construction
4. output capture
5. validation
6. retries
7. recovery
8. done conditions

The agent should do one thing: take the current unit of work and come back with something parseable.

That split is why the setup feels solid instead of spooky.

## Stop thinking in conversations

The biggest mistake I see in autonomous wrappers is starting from the mental model of an ongoing chat.

Great for humans. Bad for unattended automation.

In an unattended loop, you do not want context accumulation, conversational drift, half-remembered instructions, or a process that has been "thinking" for three hours and is now operating on its own private mythology.

You want something you could explain to yourself half asleep:

1. Pick one task.
2. Build the prompt around that task.
3. Start a fresh Codex or Claude process.
4. Let it work only on that task.
5. Get back a final JSON summary.
6. Validate it.
7. Apply the state change.
8. The process exits.

Fresh process per iteration wins for the same reason short Unix jobs beat mystery daemons: you can see where the state begins and ends.

If a run goes bad, you kill it.

If the machine reboots, you recover from disk.

If the model drifts, the drift dies with the process.

It matters more than most people admit.

## Bash is the control plane

If I had to reduce the pattern to a handful of moving parts, I would keep the same ones every time:

1. `state file`  
   Usually a `to-do.json` or equivalent file that holds the source of truth for pending work.
2. `schema`  
   Validation rules for both the state file and the agent summary.
3. `runner`  
   The function that invokes `codex exec` or `claude -p` in non-interactive mode.
4. `prompt builder`  
   A template that tells the agent what one run is allowed to do.
5. `summary parser`  
   Logic that extracts the final machine-readable result from raw tool output.
6. `state applier`  
   Deterministic code that updates the task file based on a validated summary.
7. `recovery logic`  
   Paths for interrupted runs, malformed output, invalid state, or missing files.
8. `completion logic`  
   The rule that says the loop is actually done.

That's the engine.

The domain bits are smaller than they look. You swap in a different task schema, different prompt text, different selection policy, maybe a few different hooks. The skeleton stays the same whether you are fixing bugs, triaging issues, drafting sections, or chewing through support queues.

## One task per run or it drifts

The wrapper has to force one bounded task per agent process.

That's the difference between a loop you can recover and one that slowly dissolves into vibes.

Good units of work:

- implement one feature
- fix one bug
- review one repository state
- draft one article section
- classify one email batch

Bad units of work:

- finish the whole project
- keep working until everything feels complete
- do whatever seems most important

If the task is not bounded, the output is hard to validate.

If the output is hard to validate, state transitions become fuzzy.

If state transitions become fuzzy, recovery gets ugly fast.

Minimal external state can be extremely small:

```json
{
  "schema_version": 1,
  "context_files": ["brief.md", "audience.md"],
  "tasks": [
    {
      "id": "T1",
      "title": "Draft introduction for launch article",
      "priority": 1,
      "status": "todo"
    }
  ]
}
```

That's enough. The agent does not need to remember the project. The file does.

## Demand a machine-readable contract

The wrapper should never have to "interpret the vibe" of the final answer.

Ask for JSON. Ask for JSON only. Keep asking for JSON even when the model insists on being chatty.

I want something like this back:

```json
{
  "task_id": "T123",
  "status": "done",
  "summary": "Implemented login form with validation",
  "files": ["src/auth/login.ts", "src/ui/LoginForm.tsx"],
  "blockers": []
}
```

Boring fields win:

- `task_id`
- `status`
- `summary`
- `files`
- `blockers`

And the allowed `status` values should be boring too:

- `done`
- `blocked`
- `skipped`

Put it plainly in the prompt: return only a JSON object.

If the model gives you prose instead, treat that as a parser problem, not as a successful run. Strip fences if you must. Extract JSON from mixed output if you must. But fail closed if you still cannot validate it.

People also skip output capture, then regret it.

You want two artifacts from every run:

1. the raw event stream for debugging
2. the canonical final message for state transitions

That's why JSONL logs matter. Not for observability theater. For the very practical difference between "something weird happened" and "I know exactly which iteration lied to me."

## Build arrays, not strings

This sounds like fussy Bash advice. It isn't.

If you build one huge command string, quoting bugs will eventually eat you alive. Spaces in paths, optional flags, model arguments, prompt piping, shell escaping, all of it.

Build arrays instead:

```bash
CODEX_FLAGS=(
  exec
  -m "$CODEX_MODEL"
  -c "model_reasoning_effort=$CODEX_REASONING_EFFORT"
  --cd "$WORKDIR"
)

if [ "$CODEX_YOLO" -eq 1 ]; then
  CODEX_FLAGS+=(--yolo)
fi

cmd=(
  "$CODEX_BIN"
  "${CODEX_FLAGS[@]}"
  --json
  --output-last-message "$LAST_MESSAGE_FILE"
  -
)

printf "%s" "$prompt" | "${cmd[@]}"
```

It holds up because it is explicit.

It also points to something else: keep per-tool flag builders separate. Codex and Claude do not expose the same interfaces. Pretending they do usually gives you a mushy wrapper full of conditional hacks.

Normalize at the dispatcher layer. Let each runner speak its own dialect underneath.

## Validate before you mutate state

The wrapper is not a passive log collector. It is the scheduler.

So the wrapper, not the agent, decides whether a state transition is allowed.

The agent says what happened.

The wrapper checks:

- Is this valid JSON?
- Does `task_id` match the selected task?
- Is `status` one of the allowed values?
- Are `files` and `blockers` the expected types?

Only then should it touch the task file.

Keep that separation. Otherwise the control plane starts leaking into the model and you end up trusting the most failure-prone part with the most sensitive job.

The right split is simple:

- the agent reports
- the wrapper validates
- the wrapper applies

Deterministic state mutation is what makes loops resumable instead of mystical.

## Recovery is part of the product

If you run these loops long enough, they will fail in every boring way available.

The process will die mid-run.

The task file will drift out of schema.

The model will return prose instead of JSON.

The machine will restart while a task is marked `doing`.

The review step will keep reopening work forever because the done condition is fuzzy.

So build the recovery paths before you need them:

- Reset interrupted `doing` tasks back to `todo`.
- Validate the task file on every iteration.
- Repair or bootstrap state when files are missing or malformed.
- Distinguish orchestration failure from task-result failure.
- Cap iterations and retries.
- Add an explicit final review pass and a real done marker.

You feel the difference fast. One is a neat demo. The other is something you will trust while you go make coffee.

A loop that only works while you are watching it is not autonomous. It is just a brittle demo with better branding.

## The whole shape is small

The thing I keep rediscovering is how little code you need once the responsibilities are split the right way.

Here is the whole skeleton:

```bash
iteration=0

while true; do
  iteration=$((iteration + 1))

  ensure_valid_todo

  if ! has_open_tasks; then
    run_review_pass "$iteration"
    ensure_valid_todo
    if ! has_open_tasks; then
      break
    fi
    continue
  fi

  selected_task_id=$(current_task_id)
  set_task_status "$selected_task_id" "doing"

  prompt=$(build_iteration_prompt "$selected_task_id")
  run_with_agent "$ITER_AGENT" "iter-$iteration" "$prompt"

  if summary_matches_selected "$selected_task_id"; then
    apply_summary_to_todo
  else
    set_task_status "$selected_task_id" "todo"
  fi
done
```

Not some giant orchestration framework.

It's just a deterministic loop with a replaceable worker.

Which is exactly why it keeps working.

## Reuse the engine, swap the domain

This is the part future-me keeps forgetting, so I am writing it down as bluntly as possible.

Do not reinvent the loop for every new project.

Keep these parts:

- config handling
- runner logic
- logging
- summary extraction
- validation
- state application
- recovery
- loop control

Customize these parts:

- state schema
- task fields
- selection policy
- prompt text
- summary schema
- completion criteria
- external hooks

That's really it.

The same wrapper pattern can drive autonomous feature work, bug-fix queues, article drafting, inbox triage, support ticket processing, documentation migrations, review queues, and refactor campaigns.

I know that because I have used it that way.

## The real pattern

<blockquote class="featured-quote secondary">
The durable pattern is not "use AI in Bash." It is: use Bash as the deterministic control plane and use Codex or Claude as replaceable non-interactive workers.
</blockquote>

Every time I get tempted to build something more ornate, I end up back here.

One task.

Fresh process.

JSON contract.

Deterministic state apply.

Recovery.

Done condition.

Usually that's enough to build the next loop.

And if future-me is reading this before starting another one: start here.
