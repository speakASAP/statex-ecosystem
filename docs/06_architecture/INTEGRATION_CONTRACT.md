# Integration contract

## Purpose
This contract documents that `statex-ecosystem` is a low-priority catalog app. It defines the ecosystem boundary for service index metadata, curated outbound links, and operational route information without claiming ownership of the service runtimes behind those links.

## Capability decisions
- auth: not-applicable — the app does not own a separate auth service or user identity boundary.
- postgres: not-applicable — no dedicated business database is owned by this app.
- redis: not-applicable — no Redis-backed runtime component is required.
- logging: required — the app emits operational logs and readiness evidence through the standard runtime flow.
- notifications: not-applicable — no user notification workflow is owned by the catalog app.
- ai: not-applicable — no AI runtime is owned by this app.
- payments: not-applicable — no payment flow is included in the catalog app.
- catalog: not-applicable — the app is informational and does not own the authoritative product catalog.
- orders: not-applicable — the app does not own order processing or lifecycle state.
- warehouse: not-applicable — the app does not own stock or inventory truth.
- invoices: not-applicable — invoice ownership is outside the site scope.
- object-storage: not-applicable — the app does not operate object storage or files.
- event-bus: not-applicable — no event-producing or event-consuming contract is owned here.
- docs-rag: required — the app should remain discoverable and indexable through the docs pipeline.
- monitoring: required — runtime health and readiness checks are part of the live service boundary.
- backups: not-applicable — no backup runtime or data retention boundary is owned here.

## Data ownership
The repo stores catalog metadata and link configuration, not customer-facing business data or service runtime data owned elsewhere.

## Authentication and authorization
No service-specific auth boundary is required for the site itself. The catalog is informational and does not own identity or access control flows for the services it links to.

## Synchronous dependencies
- `shared` platform conventions and deployment guidance
- service metadata and routing config defined in repo-local app files

## Asynchronous dependencies
- The app may update external service links as underlying repos change, but it does not own those service runtimes.

## Degraded operation
If the app is unavailable, the catalog may be offline but the underlying service repos remain responsible for their own runtime behavior and deployment health.

## Validation
- `python3 intent-preservation-system/scripts/validate_adoption_profile.py --root statex-ecosystem --phase planning`
- Local app checks and route configuration remain focused on catalog accuracy rather than higher-priority product domain claims
