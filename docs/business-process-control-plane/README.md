# Business Process Control Plane

Status: proposed architecture and implementation documentation
Date: 2026-07-02
Owner: ecosystem architecture
Pilot: Holiday Discount

## Purpose

The Business Process Control Plane, abbreviated BPCP, is the ecosystem-level
control plane for dynamic business processes. It must allow business rules,
process versions, campaign schedules, and visual workflow definitions to change
without requiring code changes in storefronts or core commerce services.

The control plane does not replace domain services. Each service remains the
owner of its data, invariants, and execution safety. BPCP publishes validated
process decisions and invokes existing capabilities through explicit contracts.

## Core decision

BPCP must be a separate service, not a module inside marketing-microservice.

Marketing owns campaigns, copy, banners, audience language, and upsell content.
BPCP owns process versioning, policy publication, workflow orchestration,
simulation, validation, audit, and visual editing. Pricing, orders, invoices,
payments, catalog, notifications, and storefront services keep their own
bounded ownership.

## Layer model

| Layer | Owner | Responsibility |
|---|---|---|
| Capability layer | Existing services | Stable capabilities such as calculate price, create order, render invoice, send notification |
| Policy layer | BPCP plus domain fact providers | Rules, eligibility, priorities, date windows, stackability, kill switches |
| Process layer | BPCP | Event-to-action workflows, process version lifecycle, scheduling, simulation |
| Campaign layer | marketing-microservice | Campaign content, banners, messaging, upsell content references |
| Experience layer | Storefronts and channel services | Render approved slots and messages, never calculate authoritative discounts |
| Commerce authority layer | Pricing, orders, payments, invoices | Final monetary decisions, immutable order snapshots, legal documents, payment capture |
| Observability layer | Logging and monitoring | Audit log, metrics, alerts, process health |
| Intent layer | docs/intent-preservation and service-local adoption docs | Traceability from vision to validation |

## Non-negotiable boundaries

- BPCP must not directly mutate another service database.
- BPCP must not be the source of legal invoice totals.
- BPCP must not be the source of payment capture amount.
- Frontends must not calculate authoritative discounts.
- Marketing must not own global workflow execution.
- Service adapters must fail closed when a process version, policy, or schema is invalid.
- Every active process must be versioned, auditable, reversible, and simulatable.

## Repository status

As of discovery on 2026-07-02, no repository named
`business-process-control-plane` exists under `/home/ssf/Documents/Github`.
This documentation reserves the service boundary and gives affected services an
adoption contract.

[MISSING: create and initialize `/home/ssf/Documents/Github/business-process-control-plane`]

## Pilot scope

The first bounded pilot is `holiday-discount-2026`.

The pilot covers:

- annual or scheduled discount process;
- category and product eligibility;
- campaign and frontend messaging;
- cart and checkout discount visibility;
- authoritative final price evaluation;
- immutable order discount snapshot;
- invoice discount line rendering;
- post-purchase holiday notification;
- optional upsell offer in checkout and post-purchase flows;
- visual process editor requirements.

The pilot does not cover:

- arbitrary scripting in production;
- direct database writes to domain services;
- changing payment processor behavior beyond receiving a final amount;
- tax policy calculation;
- merchant onboarding;
- new inventory ownership.

## Documentation map

- `holiday-discount-pilot.md`: bounded implementation plan.
- `contracts.md`: cross-service APIs, events, schemas, and fail-closed rules.
- `process-editor.md`: visual editor requirements and UI capability contract.
- `intent-preservation/README.md`: Vision -> Goal Impact -> System -> Feature -> Task -> Execution Plan -> Coding Prompt -> Code -> Validation trace.
