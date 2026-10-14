---
title: "Agent Autonomy Starts With Undo"
description: "Give agents more freedom when they can fix mistakes without erasing other people's work. Recovery should shape autonomy."
tldr: "An agent should be able to fix its mistake without erasing what everyone else did afterward. The freedom we give it should depend on how well we can recover when it is wrong."
date: 2026-10-14
updated: 2026-10-14
tags: ["AI", "AGENTS", "UX"]
draft: false
author: "Nikola Balić"
topics: ["Agent autonomy", "Recovery design", "Concurrent changes", "Approval integrity"]
entities: ["Git"]
answers_questions:
  - "How should recovery shape agent autonomy?"
  - "How can undo preserve other people's later work?"
  - "When does a proposed correction need another review?"
---

An agent should be able to fix its mistake without erasing what everyone else did afterward.

Before letting an agent merge your contacts, ask what happens when it merges the wrong two.

"You can undo it" sounds reassuring. But while the agent works, other people and agents keep changing those records. Going back to yesterday may erase something correct that happened today.

The amount of freedom we give an agent should depend on how well we can recover from its mistakes.

Suppose your agent merges two contacts who share a surname. My agent adds a phone number. A person corrects the address. Then you spot the bad merge.

You click undo. Where does the new number go? Does the corrected address survive?

Yesterday's records cannot tell you where today's phone number belongs.

## Undo is another change

[`git revert`](https://git-scm.com/docs/git-revert) records a new commit that reverses an earlier change while preserving history. Later work can conflict with that reversal.

I'm building a workspace for people and their agents. A correction becomes a new proposal against the current state, subject to the same permission, review, and validation checks as any other change.

A proposed undo preview could read:

> Restore the two contacts. Keep the corrected address on the contact it belongs to. Choose where the new phone number goes.

If the person cannot place the number or address, keep it unresolved, with its source and history. Being in the same mistakenly merged record does not establish who owns it.

Show the resulting records before applying the correction. The person should be able to see which changes will survive and which decisions remain open.

The original merge stays in history. The correction follows it.

## Review the correction that will actually happen

Suppose you approve placing the phone number on Alice's record. The agent then decides it belongs to Alex. That correction needs fresh approval. The interface should show the changed assignment: "This correction changed. Review it again."

The records can change too. While you review the undo, another agent updates one of the contacts. Pause and show what changed before applying the correction.

The same applies to information used to decide where the number belongs. If that information changes, the agent needs to read it again and reconsider.

Approval covers the correction you saw. Before applying it, the app still needs to check that its inputs and your permissions hold.

## Some consequences cannot be undone

Reverting a field called `emailSent` does not unsend the email. Restoring an agent checkpoint does not reverse the effects of an earlier run.

If the bad merge caused an email to go to the wrong person, restoring the contacts leaves that consequence unresolved. A clarification may address a misleading message. It cannot recall information disclosed to the wrong person.

The interface should make that limit clear when it offers undo.

## Test what survives

Start with a bad merge. Let someone add correct information before you undo it.

Does the correction preserve that later work?

Then change a contact while the undo is being reviewed. The app should pause for another review. Anything it cannot confidently assign should remain visible and unresolved.

Before giving the agent more freedom, make sure this recovery works. Let it correct an unambiguous field on its own while leaving a disputed phone number for review. Expand its autonomy as you establish which mistakes it can repair.

Two contacts restored. The later address correction preserved. The phone number assigned or still awaiting a decision. Everyone else's agents keep working.
