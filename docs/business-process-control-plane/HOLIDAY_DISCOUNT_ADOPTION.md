# BPCP Holiday Discount Adoption

Status: service-local adoption contract
Date: 2026-07-02
Service: `statex-ecosystem`
Central contract pack: `statex-ecosystem/docs/business-process-control-plane/`

## Role

Ecosystem architecture and coordination home for the BPCP documentation pack.

## Responsibilities

- Own the central BPCP architecture docs.
- Track unresolved cross-service owners.
- Keep the service adoption matrix current.
- Preserve the Intent Preservation chain for the pilot.

## Required interfaces

- Central docs under `docs/business-process-control-plane/`.
- Future links to BPCP repo once created.
- Cross-service validation summary.

## Boundaries

- This service must not become the global owner of BPCP process definitions.
- This service must fail closed on invalid or unknown BPCP process versions.
- This service must keep existing domain ownership and invariants.
- This service must expose or document dry-run behavior before live execution.
- This service must not overwrite existing service contracts without an
  explicit integration owner and validation owner.

## Holiday Discount pilot expectations

- Recognize `holiday-discount-2026` only through versioned BPCP contracts.
- Preserve `processId`, `processVersion`, and `policyId` in every relevant
  decision, event, snapshot, log, or rendered experience.
- Support rollback by respecting BPCP pause and retired states.
- Keep process display and process execution separate where applicable.

## Blockers and unknowns

- [MISSING: `business-process-control-plane` repository]
- [MISSING: pricing owner]
- [MISSING: cart/checkout owner]

## Validation evidence required before implementation is accepted

- Remote file existence check.
- Markdown grep for required sections.
- Cross-service adoption docs present.

## Parallel handoff

This adoption doc is safe for a focused service owner to implement in parallel
after the central BPCP schemas are accepted. The service owner must not edit
shared BPCP schemas directly; schema changes go through the BPCP integration
owner.
