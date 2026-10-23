---
title: "Cheap code, expensive coherence"
description: "A Capra-inspired view of AI-generated software: cheaper parts make the relationships between them more important."
date: 2026-10-23
tags: [AI, SOFTWARE, SYSTEMS]
draft: false
---

You can generate another service in minutes. Understanding what it changes across your system takes longer.

Imagine adding a notification service to a product. It passes its tests, but a timeout causes both it and the billing service to retry. A customer gets the same receipt twice. Support asks which team owns the problem. Both teams point to the other's service.

You can write more code here. You still have to agree on what a retry means.

This is where I find Fritjof Capra's systems thinking useful. In [Principles of life](https://www.fritjofcapra.net/principles-of-life/), he describes how the properties of living systems emerge through relationships between their parts. Feedback helps them regulate themselves. They continually replace components while preserving the organization that keeps them functioning.

The connection to software is my interpretation. Capra isn't making an argument about code generation in that essay.

Complexity alone doesn't explain the duplicate receipt. The services lack an agreement about delivery, and their teams lack an agreement about responsibility. Coherence sounds abstract until you're the person answering that support ticket.

Artificial intelligence (AI) can help implement a shared retry policy. Someone still has to decide what customers should experience when delivery fails, and check whether that happens.

Requiring a central review for every change might catch the mismatch. It can also leave teams waiting for permission to fix problems they already understand. They need room to act, with feedback that shows what their changes do elsewhere.

Ownership continues after the fix. When one team changes its retry behavior, the other needs to know. When someone new joins, the agreement needs to be somewhere they can find it. That takes time, even if the next implementation is cheap.

Before generating another service, ask who can explain how it behaves with the services already running. Give them time to work through the answer.
