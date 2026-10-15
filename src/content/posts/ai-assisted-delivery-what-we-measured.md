---
title: "AI-assisted delivery: what we measured"
description: "How redesigning delivery from sales handoff to production release, with AI built in, cut PR merge time by about half and saved over 25 hours a week in code review (estimate)."
pubDatetime: 2026-03-10T12:00:00-03:00
tags: ["engineering", "ai", "delivery"]
featured: false
draft: false
reviewed: true
---

At Matech Studios I redesigned how we deliver software. Instead of optimizing one step, we treated the whole path as a single system: from the moment sales hands a project over to the product team, to the moment it reaches production. AI is built into that system rather than bolted onto one tool.

This note shares what we measured and the reasoning behind it.

## Results

| Metric | Before | After |
|---|---|---|
| Time to merge a pull request | 75.2 h | 35.3 h (about 53% less) |
| Code review effort | baseline | Over 25 hours saved per week across the team (estimate) |
| Defects | baseline | 12% fewer in the first 3 months |

How we measured, so you can judge the numbers:

- **Time to merge** is the time from the moment a pull request is opened until it is closed, as simple as that.
- **Defects** are Jira issues of a bug-like type, usually found by QA or another developer in a new feature before it reaches the client. We counted them per sprint or per project.
- **The baseline** was the last four sprints (two weeks each) before the change.
- **Review hours saved** is an estimate, not a timer: how long a review used to take, multiplied by how many reviews the team did each week, minus what those reviews cost once AI took over the routine checks.

## The scope: from handoff to release

I looked at the whole flow, from handoff to release, to get an integrated view instead of optimizing one corner. But not every step uses AI. We applied it only where it was needed or genuinely useful, and we never forced the tool just because it was available. That turned out to be one of the most valuable lessons.

Around the pipeline we kept the human rituals that make delivery predictable across parallel projects: backlog grooming, architecture reviews and incident retrospectives.

## Principles that mattered

- **Decide where humans keep control.** The clearest example is the merge to production. The pipeline could technically do it, but it is a non-negotiable rule with the client, so a person always decides.
- **Change what reviews are for.** AI now handles the trivial guards. Humans spend their attention validating that the more complex business logic is respected. Reviews got faster because they became more focused, not because they became less careful.
- **Use AI where it helps, not everywhere.** A step that does not benefit from AI stays as it was.

## If you are starting from zero

Build slowly, but don't reinvent the wheel. You cannot do everything in a day, so be smart about it and go after the most critical problem first: the place where the shoe pinches the most.
