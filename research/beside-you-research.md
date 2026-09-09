# Research: Beside You, Not Between You

> **Orientation.** The article argues that agent UX should follow the Google Docs anonymous-animal-cursor model: an agent *beside* you in a shared canvas, not an intermediary *between* you and your work. The research broadly confirms the metaphor and the core examples (Google Docs animals, tldraw's agent-capable canvas, Clicky, Mermaid fragility) are real. It corrects three factual problems — a mischaracterized Sunil Pai project, a misattributed (and misquoted) framing, and a "Rough Magic" essay that appears not to exist — and complicates the thesis with a serious steelman: the autonomous/intermediary pattern is where the money and measured capability growth actually are (Cursor ~$2B ARR, METR's 7-month task-horizon doubling), while the one randomized trial of inline AI tools found they made experienced developers *slower*. The most useful nuance: the market leader held up as proof autonomy wins — Cursor — is itself hybridizing toward "beside" (demos-not-diffs, visual Design Mode). Finally, the draft omits a Steel disclosure despite the thesis serving an agent economy the author's employer monetizes.

## TL;DR for the author

- **Fix the Sunil Pai attribution (line 28).** The project is **Pizzo**, a collaborative music app, not a "MIDI synthesizer project." The phrase "agents as collaborators, not proxies" is *your* paraphrase, not Sunil's words — he never writes "collaborator," "proxy," or "intermediary." His actual slogan is **"the agent belongs beside you, not between you and the app."** Use his words; they're stronger. Source: [sunilpai.dev/posts/one-document-two-hands/](https://sunilpai.dev/posts/one-document-two-hands/) (2026-07-20).
- **Your title is a near-verbatim lift of Sunil's slogan** (published 3 days before your draft). An explicit citation/link is owed, and the frontmatter "answers_questions" item ("What does 'agent as collaborator' look like") should acknowledge the phrase derives from him.
- **Cut or replace the "Steve Ruiz Rough Magic" essay** if it appears in your notes — it appears not to exist (404 on his site; zero search results; the Substack of that name is a different author). The strongest real prior-art source for your anonymous-animal-cursor thesis is **Matt Webb's October 2023 PartyKit post**, which already articulates proactive NPCs that "put their hand up to offer" help — not Sunil Pai, and nearly three years old.
- **Add a one-line Steel disclosure.** Your normal practice (agent-web.md leads with "I'm joining Steel as founding growth lead") is to disclose prominently. The omission here is the anomaly, and the thesis accelerates the agent economy Steel monetizes.
- **Soften the Clicky "viral" specifics and the retention critique.** "3 million views in the first week" conflicts with the only source citing real tweet analytics (1.15M), and the retention critique ("didn't know what to ask it") is your observation, not a documented trend — the one substantive independent review (XDA) is glowing.
- **Engage the autonomy counter-evidence honestly.** Cursor and Devin are winning commercially with the exact intermediary pattern you critique, and METR shows exponential autonomy growth — but METR's RCT also found inline AI made experienced devs 19% slower (a problem for *your* "beside" premise too), and Cursor is itself moving toward visual "demos, not diffs." The defensible claim is *convergence*, not "beside wins."

## Claims verification

| Claim in draft | Verdict | Evidence | Source |
|---|---|---|---|
| The anonymous-animal cursor in Google Docs is the perfect agent UX metaphor | Confirmed | Feature is real and works exactly as described. Google support docs state verbatim that viewers "who aren't signed in to a Google Account show up as anonymous animals." Icons verified live on Google's CDN. | [support.google.com/docs/answer/2494822](https://support.google.com/docs/answer/2494822?hl=en); [howtogeek.com](https://www.howtogeek.com/google-docs-anonymous-animals/) |
| Description: "Agents as collaborators, not intermediaries" | Refuted (as a Sunil Pai phrase) | Sunil never uses "collaborator," "intermediary," or "proxy." His actual words: "the agent belongs beside you, not between you and the app." | [one document, two hands](https://sunilpai.dev/posts/one-document-two-hands/) |
| Title "Beside You, Not Between You" is original | Refuted | It is a faithful, near-verbatim lift of Sunil Pai's subtitle ("the agent belongs beside you, not between you and the app"), published 2026-07-20, three days before the draft. | [sunilpai.dev/posts/one-document-two-hands/](https://sunilpai.dev/posts/one-document-two-hands/); [RSS pubDate](https://sunilpai.dev/rss.xml) |
| "Most agent products put the AI between you and your work — you prompt, it acts, you review" | Confirmed (as the dominant vendor pattern) | Cursor, Cognition/Devin, OpenAI Codex, and Claude Code all ship autonomous/background agents that go away and return output. Cursor's stated north star is "self-driving codebases." | [cursor.com/blog](https://cursor.com/blog); [code.claude.com/docs/en/sub-agents](https://code.claude.com/docs/en/sub-agents); [github.com/openai/codex](https://github.com/openai/codex) |
| Line 28: "Credit where due: Sunil Pai's writing on this (his MIDI synthesizer project — agents as collaborators, not proxies)" | Partly true | Sunil's post *is* the source of the thesis (confirmed), but (a) the project is **Pizzo**, a collaborative music app (chords, drums, bass, synth, MIDI as one input), not a "MIDI synthesizer project"; (b) "agents as collaborators, not proxies" is your paraphrase, not his phrase. | [one document, two hands (Pizzo description)](https://sunilpai.dev/posts/one-document-two-hands/) |
| Sunil Pai's PartyKit/Cloudflare background | Confirmed | Sunil founded PartyKit; Cloudflare acquired it (announced 2024-04-05); he is now a Principal Systems Engineer at Cloudflare working on agents. | [blog.cloudflare.com/cloudflare-acquires-partykit](https://blog.cloudflare.com/cloudflare-acquires-partykit); [sunilpai.dev/about](https://sunilpai.dev/about) |
| "tldraw's agents working visibly on the infinite canvas while you watch — the 'offline collaborator' feel" | Confirmed | tldraw offline (2026-07-16) is "the local whiteboard for you and your agents"; agents "drive the canvas to create shapes, import assets, listen to changes." MCP App (2026-03-03) lets agents interact "in the same way that you could as a user." | [tldraw.dev/blog/tldraw-offline](https://tldraw.dev/blog/tldraw-offline); [tldraw.dev/blog/tldraw-mcp-app](https://tldraw.dev/blog/tldraw-mcp-app) |
| "shared spatial context means you never lose track of what the agent did. No diff to review, you watched it happen" | Confirmed (alignment) | MCP App: "we pass the current state of the canvas back into the chat context so your agent will understand changes as they happen." Aligns with watching the live canvas. | [tldraw MCP App](https://tldraw.dev/blog/tldraw-mcp-app) |
| Clicky is "the viral screen-watching cursor app… by Farza (FarzaTV)" | Confirmed (mostly) | Clicky is real, Mac-only, by Farza (Farza Majeed, @FarzaTV, buildspace founder), views your screen, coaches you. A demo did go viral in April 2026. Nuance: viewing is **on-demand** (press a hotkey), not continuous "screenshots your actions." | [heyclicky.com](https://www.heyclicky.com/); [farza.com](https://www.farza.com/) |
| Clicky "screenshots your actions, comments, guides you" | Partly true | It guides and comments, but the FAQ clarifies viewing is on-demand: "we only see your screen when you press the hotkey, and screenshots are never stored." "Screenshots your actions" overstates it to continuous capture. | [heyclicky.com FAQ](https://www.heyclicky.com/) |
| Clicky supported the author's DaVinci Resolve use case | Confirmed | Product Hunt lists DaVinci Resolve among supported apps, directly corroborating the personal scenario. | [Product Hunt /products/clicky-2](https://www.producthunt.com/products/clicky-2) |
| "it hit me personally while I was fighting DaVinci Resolve" | Personal anecdote | The author's own experience; the fact that Clicky lists DaVinci Resolve as supported makes it plausible. | [Product Hunt listing](https://www.producthunt.com/products/clicky-2) |
| "People downloaded it and then didn't know what to ask it. The gap between resonance and retention." | Unverifiable (as a trend); Personal anecdote (as observation) | No independent source documents this as a widespread retention problem. The only substantive independent review (XDA) is glowing: "the most useful thing I've tried in months." heyclicky.com claims "25,000+ happy users." | [XDA Developers](https://www.xda-developers.com/someone-built-tiny-ai-that-lives-next-to-your-cursor-the-most-useful-thing-ive-tried-this-year/) |
| "agents are inexplicably bad at diagrams… you'll get Mermaid soup needing endless hand-holding" | Confirmed | Documented in Mermaid's own open GitHub issues, including first-party LLM output that breaks. | [Mermaid #7590](https://github.com/mermaid-js/mermaid/issues/7590); [Mermaid #5990](https://github.com/mermaid-js/mermaid/issues/5990); [Mermaid #6166](https://github.com/mermaid-js/mermaid/issues/6166) |
| "image models (nano-banana-class) draw better diagrams natively than coding agents produce through markup" | Partly true | "Nano Banana" is official Google branding and the API docs list "diagrams" as a text-rendering use case (confirmed). But "better" is your subjective observation — no benchmark exists, and Google itself concedes long-form text rendering is still WIP. Image output is opaque/non-editable pixels vs. editable Mermaid. | [developers.googleblog.com](https://developers.googleblog.com/en/introducing-gemini-2-5-flash-image/); [ai.google.dev image docs](https://ai.google.dev/gemini-api/docs/image-generation) |
| "nano-banana-class" refers to a real image model | Confirmed | Official Google branding since Aug 26, 2025: "(aka nano-banana)." Now a model family (Nano Banana 2 Lite/2/Pro + legacy). Not author slang. | [Google Developers Blog](https://developers.googleblog.com/en/introducing-gemini-2-5-flash-image/) |
| "My side project: an agent that drives tldraw directly to build diagrams" | Personal anecdote | Author's own project. The shape (agents driving tldraw) has real public prior art regardless. | [tldraw offline](https://tldraw.dev/blog/tldraw-offline); [tldraw MCP App](https://tldraw.dev/blog/tldraw-mcp-app) |
| "the biggest barrier to agent-speed work is your own comprehension. Projects outgrow your understanding" | Partly true (original extension; restated theme) | Your specific application ("teach by showing," "don't know what to ask for") is original. But the underlying comprehension-gap theme closely tracks Sunil Pai's earlier "a letter from the orchestra pit" (2026-06-24): "there is a difference between understanding a thing and being inside its making." | [sunilpai.dev — a letter from the orchestra pit](https://sunilpai.dev/posts/a-letter-from-the-orchestra-pit/) |
| "the future of agent UX was shipped by Google Docs years ago" | Confirmed | The anonymous-animals feature is documented existing by at least 2015-12-04 and almost certainly predates that. "Years ago" is safe; "over a decade ago" is defensible. | [evert.meulie.net enumeration](https://evert.meulie.net/faqwd/complete-list-anonymous-animals-on-google-drive-docs-sheets-slides/) |
| (Implied) "73 anonymous animals" — a count folklore would invite | Refuted (not in draft, flagged) | The draft does not state a count, so it is already safe. If one is ever added: a reproducible CDN extraction yields 71 icons; a curated 2018 list yields 83. "Aardvark" returns HTTP 404 on the CDN. Google publishes no official count. | [wayou/anonymous-animals](https://github.com/wayou/anonymous-animals); [evert.meulie.net](https://evert.meulie.net/faqwd/complete-list-anonymous-animals-on-google-drive-docs-sheets-slides/) |
| "Steve Ruiz's 'Rough Magic' essay" (if referenced in notes) | Unverifiable / likely nonexistent | Zero search results; steveruiz.me/rough-magic returns 404; roughmagic.substack.com belongs to a different author (David Calloway). Steve Ruiz's blog lists no such post. | [steveruiz.me](https://steveruiz.me/) |
| PartyKit tldraw NPC work is by Sunil Pai (if attributed) | Refuted | The post "Exploring AI interaction design and multiplayer with tldraw" was written by **Matt Webb**, dated **October 4, 2023**. It is the single strongest grounding for your thesis and predates everything else by ~3 years. | [blog.partykit.io — Matt Webb](https://blog.partykit.io/posts/ai-interactions-with-tldraw) |

## Factual corrections needed

1. **"MIDI synthesizer project" (line 28)** → **Pizzo, a collaborative music app** (chord progression, tempo, drums, bass, synth, MIDI controller as one input). "MIDI synthesizer project" centers synthesis and misleads readers to expect a post about building a synth. → [sunilpai.dev/posts/one-document-two-hands/](https://sunilpai.dev/posts/one-document-two-hands/)

2. **"agents as collaborators, not proxies" (line 28) presented as Sunil Pai's framing** → Replace with Sunil's actual slogan: **"the agent belongs beside you, not between you and the app."** A precise word check confirms he never writes "collaborator," "proxy," or "intermediary." (The body says "not proxies," the description says "not intermediaries" — neither is his.) → [one document, two hands (full text)](https://sunilpai.dev/posts/one-document-two-hands/)

3. **Title presented as original** → The title and thesis are a near-verbatim lift of Sunil Pai's subtitle (published 2026-07-20, three days before the draft). Add an explicit citation/link to the source post. → [sunilpai.dev/posts/one-document-two-hands/](https://sunilpai.dev/posts/one-document-two-hands/)

4. **"Clicky… screenshots your actions" (line 37)** → **Clicky views your screen on-demand when you press a hotkey** (FAQ: "we only see your screen when you press the hotkey, and screenshots are never stored"). It is not continuous recording. → [heyclicky.com FAQ](https://www.heyclicky.com/)

5. **"Steve Ruiz's Rough Magic essay" (if present in source notes)** → **Cut.** No such writing by Ruiz is findable (404 on his site; the Substack of that name is a different author). Replace with the confirmed Steve Ruiz "Agents on the Canvas" talk or Matt Webb's 2023 PartyKit post. → [steveruiz.me](https://steveruiz.me/); [youtube.com — Agents on the canvas](https://www.youtube.com/watch?v=7Sy2gSoxu7o)

6. **Any attribution of the PartyKit tldraw-NPC post to Sunil Pai** → It was written by **Matt Webb, October 4, 2023**, and is ~3 years old, not recent. → [blog.partykit.io — Matt Webb](https://blog.partykit.io/posts/ai-interactions-with-tldraw)

7. **Any specific "73 anonymous animals" count** (not currently in draft, but adjacent) → **Drop or hedge.** A reproducible CDN extraction yields 71; a curated 2018 list yields 83; "aardvark" returns 404. Google publishes no official count. Use "dozens" if a number is needed. → [wayou/anonymous-animals](https://github.com/wayou/anonymous-animals); [evert.meulie.net](https://evert.meulie.net/faqwd/complete-list-anonymous-animals-on-google-drive-docs-sheets-slides/)

8. **Missing Steel disclosure** → Add a one-line disclosure ("I work at Steel, a browser-infrastructure company for AI agents"). This matches the author's own established disclosure pattern (agent-web.md) and standard opinion-piece practice. The thesis indirectly serves the agent economy Steel monetizes. → [steel.dev](https://steel.dev); [agent-web.md](src/content/log/agent-web.md)

## Strengthening opportunities

- **Opportunity: the Mermaid claim is currently a broad assertion.** → Suggested insertion: cite **Mermaid issue #7590** (2026-04-08, still open): *"A Mermaid diagram generated in ChatGPT (native Mermaid support) renders correctly in the ChatGPT preview. However, when the exact same Mermaid code is copied and pasted into the Mermaid code editor, the editor shows a syntax error."* — first-party LLM output that does not survive contact with real Mermaid. This is the perfect concrete proof point for "Mermaid soup needing endless hand-holding." → [github.com/mermaid-js/mermaid/issues/7590](https://github.com/mermaid-js/mermaid/issues/7590)

- **Opportunity: the tldraw claim is generic.** → Suggested insertion: cite **tldraw offline (2026-07-16)** and its own framing — *"the local whiteboard for you and your agents"*; *"Agents are able to drive the canvas to create shapes, import assets, listen to changes."* And **tldraw MCP App (2026-03-03)**: *"your agent can interact with the canvas in the same way that you could as a user"* (rolling out to Cursor, VS Code, ChatGPT, Claude). These are shipped, dated products, not just demos. → [tldraw.dev/blog/tldraw-offline](https://tldraw.dev/blog/tldraw-offline); [tldraw.dev/blog/tldraw-mcp-app](https://tldraw.dev/blog/tldraw-mcp-app)

- **Opportunity: the strongest prior-art source for your thesis is hiding in plain sight.** → Suggested insertion: cite **Matt Webb's October 2023 PartyKit post**, which already articulates the whole thesis — proactive NPCs that *"put their hand up to offer"* help, use cursor movement to signal *"the locus of attention of the NPC,"* and lean on *"proxemics."* This predates Fairydraw and tldraw offline by years and is the cleanest primary source for "agent as teammate, not intermediary." → [blog.partykit.io — Matt Webb](https://blog.partykit.io/posts/ai-interactions-with-tldraw); companion repo [github.com/partykit/sketch-tldraw-npcs](https://github.com/partykit/sketch-tldraw-npcs)

- **Opportunity: the "understanding gap" section restates Sunil's earlier metaphor.** → Suggested insertion: cite **Sunil Pai's "a letter from the orchestra pit" (2026-06-24)** alongside the Pizzo post — its explicit moral is *"there is a difference between understanding a thing and being inside its making,"* which is the comprehension-gap argument made vivid (a silent-film orchestra musician facing talking pictures). → [sunilpai.dev/posts/a-letter-from-the-orchestra-pit](https://sunilpai.dev/posts/a-letter-from-the-orchestra-pit/)

- **Opportunity: the Clicky lineage is a great color detail.** → Suggested insertion: note that Farza previously built **Visor, a real-time vision model that coached Overwatch players** — a direct conceptual precursor to Clicky's watch-and-coach design and to your "beside you" argument. → [farza.com](https://www.farza.com/)

- **Opportunity: the strongest counter-argument is also your strongest closing.** → Suggested insertion: note that **Cursor** — the market leader held up as proof autonomy wins (~$2B ARR) — is itself moving toward "beside," shipping **"demos, not diffs"** (~March 2026) and **Design Mode** (2026-06-05: *"Point, draw, or narrate UI changes… while agents edit the code underneath"*). The products sticking are the ones merging the two. → [cursor.com/blog](https://cursor.com/blog)

- **Opportunity: the Google Docs metaphor could carry more weight.** → Suggested insertion: the anonymous-animals feature is documented existing by **2015-12-04** and almost certainly older — so "years ago" can be strengthened to **"over a decade ago."** (The animal icons were designed by illustrator Jefferson Cheng, if you want the human detail.) → [evert.meulie.net](https://evert.meulie.net/faqwd/complete-list-anonymous-animals-on-google-drive-docs-sheets-slides/)

- **Opportunity: Clicky's real reception includes a high-profile endorsement.** → Suggested insertion: **Greg Brockman** (OpenAI co-founder) is quoted on the GPT Realtime 2 demo: *"GPT Realtime 2 unlocks some real magic."* Other named testimonials include Lenny Rachitsky and Sharif Shameem. → [explainx.ai](https://explainx.ai/blog/heyclicky-voice-control-mac-gpt-realtime-2-demo-2026); [heyclicky.com](https://www.heyclicky.com/)

## Counter-evidence & risks

### The autonomous/intermediary pattern is where the money and capability growth are

The strongest steelman against "beside you" is that the pure intermediary pattern — the exact thing the article critiques — is commercially and technically dominant. **Cursor** hit ~**$2B ARR by March 2026** (Bloomberg) with cloud agents as its flagship; customer stories credit Cloud Agents specifically (Faire "doubles PR throughput"; Coinbase "reduces time from idea to production by 90%"). **Cognition/Devin** raised at a **$26B valuation (May 2026)** claiming "thousands of companies." **Claude Code** ships a full autonomous stack (subagents, background agents, agent teams). **OpenAI Codex** (CLI + Web) scores 72.80% on SWE-bench Verified. **METR's** primary research finds the length of tasks AI can complete autonomously has **doubled roughly every 7 months for 6 years**, and that agents "can complete weeks-long coding tasks." The article should engage this rather than assert "beside wins."
Sources: [cursor.com/blog](https://cursor.com/blog); [cognition.com/blog](https://www.cognition.ai/blog); [code.claude.com/docs/en/sub-agents](https://code.claude.com/docs/en/sub-agents); [github.com/openai/codex](https://github.com/openai/codex); [swebench.com](https://www.swebench.com/); [metr.org/research](https://metr.org/research/)

### The leader held up as proof autonomy wins is itself hybridizing toward "beside"

This is the most useful complication: **Cursor** is simultaneously moving *toward* the article's thesis — shipping **"demos, not diffs"** (~March 2026) and **"Design Mode — Direct agents with visual prompts"** (2026-06-05: *"Point, draw, or narrate UI changes… while agents edit the code underneath"*). So the strongest version of the debate is not "autonomy vs. co-pilot" but **convergence**: the products sticking merge both — keeping you oriented (beside) while doing the work asynchronously (between). The article's prediction is more defensible if framed as convergence than as "beside beats between."
Sources: [cursor.com/blog](https://cursor.com/blog)

### The one randomized trial cuts against BOTH the article's premise and its counter

**METR's RCT** ("Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity," July 10, 2025) found **inline AI tools made experienced OSS developers 19% slower** — *"when developers use AI tools, they take 19% longer than without."* This undercuts the counter-argument (autonomy beats copilot) *and* the article's own "beside/copilot is better" premise. METR has flagged selection effects and is redesigning the study (Feb 24, 2026). Cite the 19% figure *only* with that caveat.
Sources: [metr.org/research](https://metr.org/research/)

### Devin's benchmark claims are shakier than they sound

If the article cites Devin as proof autonomy works, caveat it: **Devin is absent from the public SWE-bench Verified leaderboard** (top: Claude 4.5 Opus 76.80%, GPT-5-2 Codex 72.80%); the widely-repeated ~13.86% figure could not be re-verified from Cognition's primary report this session; and Cognition offered a remarkable **"$10M value guarantee"** in June 2026 — a concession that only makes sense if buyers are skeptical of ROI. Do not cite Devin benchmark numbers without a fresh primary check.
Sources: [swebench.com](https://www.swebench.com/); [cognition.com/blog](https://www.cognition.ai/blog)

### The "image models draw better diagrams" claim is an opinion, not a measured result

No benchmark, study, or head-to-head comparison of image-model diagrams vs. LLM-generated Mermaid exists. The two produce categorically different artifacts: a raster image (non-editable, non-versionable, inaccessible to screen readers) vs. editable semantic code (diff-able, accessible, deterministic). "Better for a throwaway brainstorming sketch" is defensible; "better" as a general claim is not. There is also a mild internal tension: the author's own tldraw side-project builds *editable* canvas diagrams (the structured approach), the opposite philosophy from lauding raster image output. Present this as personal experience, and acknowledge the tradeoff.
Sources: [ai.google.dev image docs](https://ai.google.dev/gemini-api/docs/image-generation); [developers.googleblog.com](https://developers.googleblog.com/en/introducing-gemini-2-5-flash-image/); [Mermaid #7590](https://github.com/mermaid-js/mermaid/issues/7590)

### The retention critique is personal observation, not a documented trend

The Clicky honesty hook ("people downloaded it and then didn't know what to ask it") is fine as a flagged personal aside, but targeted searches returned **no independent third-party review or user discussion making this complaint**. The only substantive independent review (XDA) is glowing; heyclicky.com claims 25,000+ users. Do not frame this as a documented or widely-reported retention problem.
Sources: [XDA Developers](https://www.xda-developers.com/someone-built-tiny-ai-that-lives-next-to-your-cursor-the-most-useful-thing-ive-tried-this-year/)

## Related work & prior art

- **Matt Webb / PartyKit — "Exploring AI interaction design and multiplayer with tldraw" (Oct 4, 2023).** The single strongest, most quotable grounding for the anonymous-animal-cursor thesis. Proactive NPCs (a poet, a painter, a maker) that "put their hand up to offer" help; cursor movement as "the locus of attention"; "proxemics"; "AI as teammate." Nearly three years old and ahead of its time. Companion repo: github.com/partykit/sketch-tldraw-npcs. [blog.partykit.io](https://blog.partykit.io/posts/ai-interactions-with-tldraw)

- **Sunil Pai — "one document, two hands" (Jul 20, 2026).** The source of the title/thesis. Pizzo music app; the bad pattern "you → chat box → agent → application → your thing" vs. the good "you + your agent → application → your thing." [sunilpai.dev](https://sunilpai.dev/posts/one-document-two-hands/)

- **Sunil Pai — "a letter from the orchestra pit" (Jun 24, 2026).** The comprehension-gap metaphor the "understanding gap" section restates. [sunilpai.dev](https://sunilpai.dev/posts/a-letter-from-the-orchestra-pit/)

- **Steve Ruiz — "Agents on the Canvas" (AI Native DevCon, Jun 2026).** The real tldraw talk on agents on the infinite canvas; covers Fairydraw (Dec 2025, "fairies" as virtual collaborators). [YouTube](https://www.youtube.com/watch?v=7Sy2gSoxu7o)

- **tldraw shipped products.** tldraw MCP App (2026-03-03) and tldraw offline (2026-07-16), plus "Building with tldraw offline" (Lake Faith, 2026-07-22, showing agents building a data visualizer, kanban, task tracker, local-LLM playground). [tldraw.dev/blog/tldraw-mcp-app](https://tldraw.dev/blog/tldraw-mcp-app); [tldraw.dev/blog/tldraw-offline](https://tldraw.dev/blog/tldraw-offline); [tldraw.dev/blog/building-with-tldraw-offline](https://tldraw.dev/blog/building-with-tldraw-offline)

- **Google anonymous-animals icon designer.** Illustrator Jefferson Cheng is credited as the original designer of the animal icons (jeffersoncheng.com/Anonymous-Animals, now redirecting to legalcakes.com — a JS-rendered portfolio with no reachable dated text, so cite with care).

- **Farza's prior project Visor** (real-time vision model coaching Overwatch players) — direct lineage to Clicky's watch-and-coach design. [farza.com](https://www.farza.com/)

- **METR task-horizon research.** The 7-month doubling of autonomous task length and the "MirrorCode" weeks-long-coding result ground the autonomy counter-argument. [metr.org/research](https://metr.org/research/)

## Source library

**Sunil Pai / PartyKit / Cloudflare**
- one document, two hands — https://sunilpai.dev/posts/one-document-two-hands/ — 2026-07-20
- a letter from the orchestra pit — https://sunilpai.dev/posts/a-letter-from-the-orchestra-pit/ — 2026-06-24
- Sunil Pai — About — https://sunilpai.dev/about — 2026
- Sunil Pai — RSS feed — https://sunilpai.dev/rss.xml — 2026-07-20
- Cloudflare acquires PartyKit — https://blog.cloudflare.com/cloudflare-acquires-partykit — 2024-04-05
- Matt Webb — Exploring AI interaction design and multiplayer with tldraw — https://blog.partykit.io/posts/ai-interactions-with-tldraw — 2023-10-04
- partykit/sketch-tldraw-npcs (GitHub) — https://github.com/partykit/sketch-tldraw-npcs — 2023
- PartyKit docs — https://docs.partykit.io/ — 2026-07-24
- Sunil Pai — tldraw-sync-cloudflare repo — https://github.com/threepointone/tldraw-sync-cloudflare — 2025-05-27

**tldraw**
- tldraw offline — https://tldraw.dev/blog/tldraw-offline — 2026-07-16
- tldraw MCP App — https://tldraw.dev/blog/tldraw-mcp-app — 2026-03-03
- Building with tldraw offline — https://tldraw.dev/blog/building-with-tldraw-offline — 2026-07-22
- Steve Ruiz — Agents on the canvas (AI Native DevCon) — https://www.youtube.com/watch?v=7Sy2gSoxu7o — 2026-06-15
- Steve Ruiz — Agents on the Canvas in tldraw — https://www.youtube.com/watch?v=sPUjIBH5Cwg — 2026
- Steve Ruiz blog index (no "Rough Magic") — https://steveruiz.me/ — 2023-11-09

**Clicky / Farza**
- heyclicky.com (product + FAQ) — https://www.heyclicky.com/ — 2026-07-24
- Farza's personal site — https://www.farza.com/ — 2026
- Clicky on Product Hunt — https://www.producthunt.com/products/clicky-2 — 2026
- Farza on X — https://x.com/FarzaTV — 2026
- XDA Developers — "tiny AI that lives next to your cursor" — https://www.xda-developers.com/someone-built-tiny-ai-that-lives-next-to-your-cursor-the-most-useful-thing-ive-tried-this-year/ — 2026-04-19
- explainx.ai — HeyClicky viral demo analysis — https://explainx.ai/blog/heyclicky-voice-control-mac-gpt-realtime-2-demo-2026 — 2026-05-31
- Aakash Gupta — Cursor Layer newsletter (1.15M tweet views) — https://www.news.aakashg.com/p/cursor-layer-toolkit — 2026
- Hacker News Algolia — heyclicky search (no launch post) — https://hn.algolia.com/api/v1/search?query=heyclicky — 2026

**Google Docs anonymous animals**
- Google Support — Share files from Google Drive — https://support.google.com/docs/answer/2494822?hl=en — accessed 2026-07-24
- HowToGeek — What Are Anonymous Animals in Google Docs? — https://www.howtogeek.com/google-docs-anonymous-animals/ — accessed 2026-07-24
- wayou/anonymous-animals — 71 icons extracted from CDN — https://github.com/wayou/anonymous-animals — accessed 2026-07-24
- Evert Meulie — 83-name enumeration — https://evert.meulie.net/faqwd/complete-list-anonymous-animals-on-google-drive-docs-sheets-slides/ — 2015-12-04
- Google CDN icon (live check) — https://ssl.gstatic.com/docs/common/profile/alligator_lg.png — 2026-07-24

**Nano Banana / Mermaid**
- Google Developers Blog — Introducing Gemini 2.5 Flash Image (aka nano-banana) — https://developers.googleblog.com/en/introducing-gemini-2-5-flash-image/ — 2025-08-26
- Gemini API image generation docs — https://ai.google.dev/gemini-api/docs/image-generation — accessed 2026-07-24
- Mermaid Issue #7590 — ChatGPT Mermaid breaks in real editor — https://github.com/mermaid-js/mermaid/issues/7590 — 2026-04-08
- Mermaid Issue #5990 — LLM pie chart crashes — https://github.com/mermaid-js/mermaid/issues/5990 — 2024-10-22
- Mermaid Issue #6166 — non-deterministic layout — https://github.com/mermaid-js/mermaid/issues/6166 — 2025-01-06

**Autonomy counter-evidence / benchmarks**
- Cursor blog (Bloomberg $2B ARR; demos-not-diffs; Design Mode) — https://cursor.com/blog — 2026-07-22
- Cursor docs — Cloud agents — https://cursor.com/docs — 2026-07-01
- Cognition blog (Devin GA, $26B valuation, $10M guarantee) — https://www.cognition.ai/blog — 2026-05-01
- SWE-bench Verified leaderboard (Devin absent; Claude 4.5 Opus 76.80%) — https://www.swebench.com/ — 2026-02-17
- Claude Code docs — subagents / background agents / agent teams — https://code.claude.com/docs/en/sub-agents — 2026-07-01
- OpenAI Codex (GitHub) — https://github.com/openai/codex — 2026-07-01
- METR research index (7-month doubling; 19% slower RCT; MirrorCode) — https://metr.org/research/ — 2025-03-19 to 2026-04-10

**Steel / author context**
- Steel — Browser Infrastructure for AI Agents — https://steel.dev — 2026-07-24
- steel-dev/steel-browser (7,377 stars) — https://github.com/steel-dev/steel-browser — 2026-07-24
- Show HN: Steel.dev launch (founders Nas and Huss) — https://news.ycombinator.com/item?id=42245573 — 2024-11-26
- Draft article (no Steel disclosure) — /Users/nikola/dev/nibzard-web/src/content/log/beside-you.md — 2026-07-23
- Niko's "why I joined Steel" (disclosure template) — /Users/nikola/dev/nibzard-web/src/content/log/agent-web.md — 2026-02-02
