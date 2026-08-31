# Agent operations

## Roles
- Readiness scanner: determine whether a change is catalog/metadata scope or service-level runtime scope.
- Worker agent: implement one catalog or operational metadata change with explicit scope awareness.
- Worker monitor: watch for drift between the app’s catalog role and the service repos it points to.
- Integration validator: confirm the repo remains a low-priority catalog with truthful app boundaries.

## Before work
- Confirm the change is truly catalog scope rather than a business-domain runtime change.
- Inspect the app metadata or service list before editing.
- Preserve the repo’s low-priority, informational role.

## Parallel work
- Catalog metadata updates should be coordinated with the referenced service repos when they affect service ownership or linkage accuracy.
- No parallel workstream should claim runtime ownership for a service entry that belongs elsewhere.

## Validation debt
- Known runtime issues belong to the service repo that owns the underlying app, not the catalog repo.
- Documentation-only changes do not upgrade the site to a higher-priority product domain.

## Handoff
- Document any service link or metadata update that affects ecosystem navigation or operator workflows.

## Project-specific operations
- Catalog changes must remain factual, low-priority, and easy to maintain.
- Adoption and validation updates must remain truthful about the repo’s informational role.
