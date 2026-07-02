# BPCP Intent Preservation Pack

Date: 2026-07-02
Target: Business Process Control Plane and Holiday Discount pilot

This pack follows the company Intent Preservation System chain:

Vision -> Goal Impact -> System -> Feature -> Task -> Execution Plan -> Coding Prompt -> Code -> Validation

## Vision

The ecosystem can change bounded business processes dynamically while keeping
domain code stable, auditable, and safe.

## Goal impact

The Holiday Discount pilot proves that promotions, customer-facing messages,
discount evaluation, checkout display, order snapshots, invoice rendering, and
post-purchase notifications can be coordinated by a control plane without
turning Marketing or any frontend into a global decision owner.

## System

`business-process-control-plane` is the proposed system.

[MISSING: repository creation for `business-process-control-plane`]

## Feature

`FEAT-BPCP-001`: Visual process registry and Holiday Discount process.

Feature requirements:

- process registry;
- policy registry;
- workflow registry;
- visual editor;
- simulation API;
- publication lifecycle;
- service capability registry;
- audit log;
- kill switch;
- service-local adoption contracts.

## Task

`TASK-BPCP-001`: Build the documentation and contract foundation for the
Holiday Discount pilot across affected services.

Scope:

- central architecture and contract pack;
- service-local adoption docs;
- visual editor requirements;
- missing owner and runtime blockers;
- validation plan.

Out of scope:

- production activation;
- database migrations;
- code implementation;
- deployment.

## Execution plan

1. Confirm affected service inventory.
2. Add central BPCP documentation in `statex-ecosystem`.
3. Add service-local adoption docs under `docs/business-process-control-plane/`.
4. Preserve dirty worktrees by only adding isolated new files.
5. Validate that expected documents exist remotely.
6. Leave implementation lanes agent-ready.

## Coding prompt

Implement only after the documentation gate is accepted:

```text
Create `business-process-control-plane` as a separate service.
Implement process registry, policy registry, workflow registry, simulation API,
visual process editor, publication lifecycle, audit log, and service capability
registry. Do not move domain ownership from existing services. All monetary
decisions must route to the pricing/order/payment authority. All service
adapters must fail closed.
```

## Code

[MISSING: BPCP service codebase]

## Validation

Documentation validation for this task:

- central docs exist in `statex-ecosystem/docs/business-process-control-plane`;
- affected services have service-local adoption docs;
- docs include `[MISSING: ...]` for unresolved service owners;
- no existing dirty files are overwritten;
- implementation remains blocked on explicit missing owners and repo creation.

Implementation validation for future task:

- schema tests;
- simulation tests;
- service adapter contract tests;
- process editor UI tests;
- activation calendar conflict tests;
- end-to-end Holiday Discount staging smoke.
