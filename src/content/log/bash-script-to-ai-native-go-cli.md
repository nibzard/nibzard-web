---
title: "From Bash Script to AI-Native Go CLI in One Session"
description: "Turned a Bash script into a proper Go CLI with Whisper bootstrap and cross-platform releases—all in one AI coding session."
tldr: "A single AI session turned `scribe.sh` into `scriby`: a Go CLI with deterministic output, runtime bootstrap, and cross-platform releases."
date: 2026-02-24
tags: [AI, GO, CLI, TOOLS]
draft: false
author: "Nikola Balić"
topics: [AI coding workflows, CLI design, Go tooling]
entities: [Scriby, whisper.cpp, GitHub Actions]
answers_questions:
  - Can AI help me turn a script into a real CLI quickly?
  - What does it take to package Whisper behind one binary install?
---

We're living in the era of just-in-time software—tools built and shipped in a single AI coding session.

I had `scribe.sh`. It worked, mostly. But every time someone asked "how do I run this?", I felt that familiar shame. You know the one.

So I opened a fresh AI session and said: let's make this real.

## The Shift

**AI collapsed the build cost for tooling.**

> The old path: keep script forever, maybe rewrite later, maybe never ship.
>
> The new path: keep script as behavior spec, pair with AI, ship now.

In one session, we turned `scribe.sh` into [`scriby`](https://github.com/nibzard/scriby)—a Go CLI with explicit commands, deterministic JSON output, proper exit codes, and a release pipeline.

> That's the difference between "a script on my machine" and "a tool agents and humans can trust."

## One Binary, Done

The requirement: you install one binary. No README archaeology, no dependency hell.

`scriby` handles the rest:
1. Detects your platform
2. Downloads the `whisper-cli` runtime from GitHub releases
3. Pulls the model you asked for
4. Transcribes

ggerganov's [whisper.cpp](https://github.com/ggerganov/whisper.cpp) did the heavy lifting. We wrapped it in something you can call without reading a wiki.

## The Gotcha

First release shipped. Users got:

```
Library not loaded: @rpath/libwhisper.1.dylib
```

In 2026, we're still dealing with dylib issues. Feels like 2015.

The fix: bundle fully self-contained binaries. First-run just works now.

> Scripts push this pain onto users. A proper CLI absorbs it.

## Usage

```bash
scriby run --model medium --language en ./meeting.wav
```

## The Takeaway

Look at your `~/bin`. Find the script you keep copying between machines.

If it provides real value, you can now promote it to a proper tool in hours, not weeks. One focused session.

Go build it.
