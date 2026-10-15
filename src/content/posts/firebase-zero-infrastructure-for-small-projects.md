---
title: "When infrastructure should be zero: Firebase for projects that don't need a platform team"
description: "Why we started deploying some Matech products on Firebase App Hosting and Functions, what we gain in simplicity and cost, and where the approach stops fitting."
pubDatetime: 2026-05-24T12:00:00-03:00
tags: ["engineering", "infrastructure", "firebase", "delivery"]
featured: false
draft: false
reviewed: true
---

At Matech Studios, the infrastructure we create and manage for each project is robust by design: enterprise grade, built on Kubernetes and Terraform. It is the right answer for many projects. It is also expensive in a way that is easy to overlook: it needs at least one specialist dedicated to it, full time.

Some projects do not justify that role, and some clients are not willing to pay for it. For those, we needed another option.

## The problem is the role, not the tooling

Kubernetes and Terraform are not the issue. The issue is that running them well requires a person who knows pipelines, Terraform, Kubernetes and infrastructure in general. When a project's size or budget cannot carry that person, you end up with one of two bad outcomes: infrastructure nobody owns, or a cost the client never agreed to.

## What changed: connecting code directly to the service

Platforms like Firebase now cover a large part of this ground. With App Hosting and Cloud Functions on Google Cloud, you connect a GitHub repository, choose a branch, and every change on that branch deploys automatically. There is no cluster to operate, no Terraform to write, and no pipeline to design.

Under the hood, App Hosting builds the app into a container on Google Cloud and rolls out a new revision once it is healthy, reporting the result back to GitHub. The point is that nobody on our side has to build or maintain any of that machinery.

For the right project, that turns infrastructure into something close to zero effort: no dedicated specialist, a deployment process that is straightforward, and a pipeline that is just "push to the branch".

## What it looked like in practice

Two real projects show the gap.

On the one hand, the platform behind [the hospitality case study](/posts/multi-tenant-platform-for-a-hospitality-client/) runs on infrastructure managed by a specialist. Standing it up and getting it production-ready took about one sprint.

On the other, [ScoutOS](https://scoutos.com.ar/) runs on Firebase [App Hosting](https://firebase.google.com/products/app-hosting), which uses Google Cloud services behind the scenes. Its whole infrastructure setup came down to configuration files: an `apphosting.yaml` for production and an `apphosting.<env>.yaml` for a pre-production environment. That was it.

One sprint of specialist work versus a couple of configuration files is not a fair fight for every project, and the full platform buys things Firebase does not. But for the right project, the difference is the one that matters.

## The downside: not every technology fits

This is the trade-off to know before you commit. App Hosting supports Angular and Next.js natively. Other frameworks can work too, as long as they produce the build output that App Hosting expects, usually through an adapter: Nuxt and Analog (via Nitro), TanStack Start, SolidStart, and Astro through community adapters.

If your stack is outside that list, you will spend effort on adapters or fall back to the heavier setup.

## How we decide

- **Choose the Firebase path** when the project does not warrant a dedicated infrastructure role, or the client will not fund one, and the stack fits what App Hosting supports.
- **Choose the full platform** when requirements demand it: enterprise constraints, unsupported technology, or needs that go beyond what a managed service gives you.

The decision is not "simple versus serious". It is matching the amount of infrastructure to what the project can actually justify.

## If you want to try this

- Check framework support first; it is the quickest way to rule the approach in or out.
- Start with one branch connected to one environment and add more only when needed.
- Revisit the decision if the project grows: moving up to a fuller platform later is a normal step, not a failure.
