---
title: "From spreadsheets to a multi-tenant platform: a hospitality case study"
description: "How we replaced emails, paper checklists and spreadsheets with a multi-tenant platform and a repeatable onboarding playbook."
pubDatetime: 2026-10-14T12:00:00-03:00
tags: ["case-study", "architecture", "multi-tenant"]
featured: true
draft: false
reviewed: true
---

I had the opportunity to work for a hospitality client whose high-touch events business was run through emails, paper checklists and spreadsheets. The goal was to turn that high-revenue line into a single platform that sales teams, planners, operations staff and end customers could rely on.

## The problem

- No purpose-built product existed for this niche.
- Our team had no hospitality background, and stakeholders came from four very different worlds: sales, planners, operations and end customers.
- The platform had to be **multi-tenant from day two**, because more properties were expected to follow.

## How we solved it

1. **Domain discovery first.** We interviewed each stakeholder group to build a shared vocabulary before writing code.
2. **Three surfaces, one platform.** We split the product into a back office, a customer-facing app and a public microsite, each with role-based access.
3. **Business rules as configuration.** Rules that vary per property were isolated in a configurable engine instead of being hard-coded.
4. **A predictable cadence.** Biweekly releases with semantic versioning kept every stakeholder aligned.
5. **A playbook, not a project.** When a second group joined, we turned the first rollout into a templated onboarding process.

## Outcome

- MVP in production in **under eight months**.
- **60+ releases** in nearly three years, on a biweekly cadence.
- **Multiple properties** across more than one organization live on a single platform.

## What I would do differently

One of the forms had to be dynamic. Because the platform was multi-tenant, each property could eventually need different inputs, so we built it to be configurable from the start. But that need would not appear until after the MVP, and the dynamic form took close to a month to build.

Today I would take a different approach: build only what is strictly necessary to go live, then adjust once real properties show what actually varies. Preparing for a future you can't yet see has a real cost, and in a first release that cost is time to market.
