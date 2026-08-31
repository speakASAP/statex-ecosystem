# statex-ecosystem

## Status
Status: active
Lifecycle: implementation
Repository focus: low-priority Next.js ecosystem catalog for Statex applications and microservices with curated outbound links and deployment metadata.

## Documentation authority
This repository keeps project intent and onboarding evidence in the repo itself and follows the shared IPS standard in `intent-preservation-system` for cross-repository traceability.

## Capabilities
- auth: not-applicable — The site does not own a separate auth service or user identity boundary.
- postgres: not-applicable — This repo does not maintain a dedicated database runtime for application state.
- redis: not-applicable — No Redis cache service is required for the catalog site.
- logging: required — Structured logs and operational evidence are part of the runtime service flow.
- notifications: not-applicable — The site does not own service notifications or user messaging flows.
- ai: not-applicable — The site does not own an AI reasoning runtime.
- payments: not-applicable — Payment processing is intentionally not part of the catalog repo.
- catalog: not-applicable — The ecosystem catalog is informational and not the authoritative product catalog software for the business domains.
- orders: not-applicable — This repo does not own order lifecycle processing.
- warehouse: not-applicable — Warehouse authority is outside the catalog repo’s boundary.
- invoices: not-applicable — Invoice processing does not live in this repo.
- object-storage: not-applicable — The site does not operate object storage.
- event-bus: not-applicable — No event-bus producer or consumer contract is owned here.
- docs-rag: required — The repo should remain discoverable through the shared docs-RAG pipeline and platform indexing conventions.
- monitoring: required — The service exposes health and readiness evidence through the platform monitoring boundary.
- backups: not-applicable — This repo does not maintain a backup runtime for business data.

## Interfaces
- Repository: https://github.com/speakASAP/statex-ecosystem
- Standard: https://github.com/speakASAP/intent-preservation-system
- Primary operator boundary: low-priority ecosystem catalog site for Statex services and links.
- Runtime health contract: GET /api/health when the app is running.

## Development
- Source of truth lives in the repository-local Next.js app and deployment metadata.
- Runtime changes should stay aligned to the project’s actual catalog purpose rather than broad product claims.
- Validation runs from the repo root with the central IPS validator and service-local checks.

## Configuration
- Project configuration is stored in the repository and environment files used by the app runtime.
- Secrets remain outside the repo and are injected via the platform secret flow.

## Deployment
- This repository follows the platform deployment and validation conventions for the low-priority ecosystem catalog service.
- Deploys are gated by the standard service workflow for the app and the central IPS validation pass.

## Health and observability
- The application exposes `/api/health` and should remain truthful about service readiness.
- Operational evidence is captured in local validation and the repository state file.
