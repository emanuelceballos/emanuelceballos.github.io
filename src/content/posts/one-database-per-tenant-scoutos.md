---
title: "One database per tenant: isolation without a project per customer"
description: "Why ScoutOS gives every scout group its own Firestore database inside a single Firebase project, which alternatives we weighed, and what the decision costs and buys."
pubDatetime: 2026-01-15T12:00:00-03:00
tags: ["engineering", "architecture", "multi-tenant"]
featured: false
draft: false
reviewed: true
---

ScoutOS is a multi-tenant SaaS for scout groups. The first big architectural question was how to separate one group's data from another's. This note explains what we chose, what else we considered, and where the decision stops being a guarantee.

## The decision

One **Cloud Firestore database per scout group**, with every database living inside a **single Firebase project**. We made the call in January 2026.

The goals were concrete: better isolation of each group's information, and the ability to see how much each group consumes, without taking on the operational weight of a separate Firebase project per tenant.

## The three options

| Option | What it gives you | What it costs | Verdict |
|---|---|---|---|
| One database, a `tenantId` on every document | Lowest initial complexity, centralized management | Only logical isolation; consumption metrics are shared | Not chosen |
| One database per group, in one project | Stronger isolation, consumption visible per database, centralized infrastructure | You must provision databases, rules and indexes for each group | **Chosen** |
| One Firebase project per group | Isolation at project level as well | Much more operational, configuration and maintenance work | Discarded |

The middle option was the balance point: most of the isolation benefit of the third, most of the operational simplicity of the first.

## Why

- **Data isolation.** A group's operational documents never share a database with another group's. That shrinks the surface for multi-tenant filtering mistakes, the kind of bug where one missing `where` clause leaks data across customers.
- **Observable consumption.** Separate databases let us study usage per group and relate it to the economics of each subscription. This is not the same as independent billing per database, and we do not claim it is.
- **Lower operational complexity than a project per tenant.** The application, the runtime service and the Firebase project all stay shared.

## How it fits together

- A central registry, kept in the default database, maps each group to the `databaseId` that holds its data.
- The application resolves that `databaseId` per request and routes to the right database, so feature code never picks a tenant by hand.
- Authentication stays with an external identity provider. The source of truth for memberships, roles and group access moved into Firestore, instead of relying mainly on provider metadata.

## What it costs

Isolation by database is not free, and it is better to know the bill up front:

- **Every new group needs provisioning.** Creating the database, registering the group and its `databaseId`, and deploying indexes. We designed this sequence to be parameterized by `databaseId`, idempotent, observable, and runnable from CI or through a controlled manual step.
- **Indexes, security rules, migrations and backups are per database.** What used to be one thing to maintain becomes N things, so automation stops being optional.
- **Named databases require billing to be enabled on the project.**

## It is not a security guarantee

Separate databases reduce the chance of cross-tenant mistakes. They do not replace authentication, memberships, authorization checks and correctly written security rules. Isolation by database is one layer, and the others still have to be done properly.

## When I would not do this

If you do not need per-tenant consumption visibility, or you are not ready to automate provisioning, indexes, rules and backups across many databases, a single database with a `tenantId` is simpler and perfectly reasonable, especially early on. Per-database isolation pays off when the number of tenants, the sensitivity of their data, or the need to understand each tenant's cost justifies the extra operational work.
