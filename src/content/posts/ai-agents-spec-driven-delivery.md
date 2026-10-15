---
title: "Specialized AI agents and a spec per ticket: how we build features at Matech"
description: "How we split AI work into planner, executor, validator, reviewer, sentinel and documenter agents, and why a written spec per Jira ticket is the backbone of the whole flow."
pubDatetime: 2026-06-01T12:00:00-03:00
tags: ["engineering", "ai", "delivery", "process"]
featured: false
draft: false
reviewed: true
---

At Matech Studios we use AI agents to build new features and fix bugs, and we do it across all of our projects. The interesting part is not that agents write code. It is how we divided the work among them, and what we hand them before they start.

## One agent, one job

Instead of a single assistant that does everything, we use specialized agents with narrow responsibilities, much like the roles on a team:

1. **Planner.** Reads the Jira ticket and writes the spec. It writes no code.
2. **Executor.** Implements only what the spec says is in scope, then runs the project's build, formatting and tests.
3. **Validator.** Checks the implementation against the spec's acceptance criteria. Read-only.
4. **Reviewer.** Reviews the diff for code quality and security. Read-only.
5. **Sentinel.** An adversarial security pass over the change, or a deep scan of the whole repository. Read-only.
6. **Documenter.** Exists in projects that have a user interface. It turns what was built into documentation the end user can read, reusing the spec and the acceptance criteria.

Two rules keep the system honest. A wrong plan goes back to the planner: the executor never improvises around a bad spec. And the agents that judge the work (validator, reviewer, sentinel) never edit code, so they cannot quietly "fix" what they were supposed to flag.

## The spec is the backbone

Every Jira ticket that changes a repository gets its own spec, written before implementation and committed on the same branch as the change. Jira holds the request. The spec holds what was actually agreed and built: scope, what is explicitly out of scope, behavior, acceptance criteria and open questions.

Why it matters:

- **Requirements live next to the code.** The spec is versioned with the implementation, so the two cannot drift into different places, and it survives changes of tooling or team.
- **A decision history you can defend.** Months later, "why does it work this way?" has a written, dated answer tied to a ticket and a commit, instead of someone's memory or a chat thread.
- **Verifiable delivery.** Acceptance criteria are written as GIVEN / WHEN / THEN statements, so a validator, or a human reviewer, can check the work mechanically against what was promised.
- **Context for agents.** Agents start every task with no memory of previous work. The repository's rules tell them how to behave; the specs tell them what was decided before, so they extend the system consistently instead of guessing or re-litigating old decisions.
- **Controlled scope.** Writing the plan first, with an explicit out-of-scope section, keeps changes small and reviewable. A scope change becomes a visible spec update instead of a silent expansion.

## How a ticket flows

1. The planner creates the spec from the ticket. If one already exists, it updates it instead of duplicating it.
2. Ambiguities go under Open Questions and are settled with the ticket owner before any code is written.
3. The executor implements the in-scope section; the validator checks it against the acceptance criteria.
4. If reality diverges from the spec during implementation, the spec is updated first, so it always reflects what was actually delivered.
5. Specs are never deleted. A later ticket that changes the behavior gets its own spec that references the earlier one.

## One side effect we did not plan for: real documentation

Because the acceptance criteria are already written clearly, the documenter can reuse them. Information that originally came from Jira becomes user-facing documentation for a feature, without anyone rewriting it from scratch. The documentation reflects what was built, because it comes from the same source the validator used to check it.

## If you want to try this

- Start with the spec, not the agents. A written, reviewable plan with explicit scope is what makes everything downstream checkable.
- Give every agent a narrow job, and make the ones that judge the work read-only.
- Write acceptance criteria as statements you could test mechanically.
- Treat the spec as a living file: when reality changes, change the spec first.
