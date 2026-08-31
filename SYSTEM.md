# SYSTEM.md

completeness_level: complete

status: validated

## Purpose
The Statex ecosystem catalog is a low-priority Next.js application that surfaces service metadata, curated outbound links, and deployment information for the wider ecosystem.

## Responsibilities
- Host the Statex ecosystem catalog and curated links
- Track operational metadata used by the catalog app
- Keep the service boundary honest as a low-priority informational app rather than a core application domain

## Non-responsibilities
- Owning business-domain services, order processing, or warehouse state
- Acting as the primary runtime for any core product workflow
- Claiming a high-priority production role that the repo does not actually hold

## Inputs
- Service metadata and ecosystem configuration for the catalog app
- Shared deployment and platform conventions used by the wider ecosystem
- Local app configuration and route metadata needed for the catalog experience

## Outputs
- Catalog pages and runtime metadata used by operators and engineers
- Health and readiness evidence for the low-priority app itself
- Cross-repo linkage information for the wider service landscape

## Dependencies
- `shared` documentation and deployment conventions
- The platform app hosting and monitoring flow for the low-priority service
- The repo’s local metadata and route definitions for service discovery

## Upstream traceability
- The catalog app relies on ecosystem conventions and shared deployment standards rather than a major domain-specific runtime.
- Service ownership remains with the repos behind each ecosystem entry rather than this catalog app.

## Downstream artifacts
- Public site pages, health checks, and catalog metadata
- Ecosystem documentation and operational references consumed by the service map

## Validation criteria
- The repo remains a low-priority informational application without claiming a higher business criticality.
- The app is valid under the IPS standard for targeted runtime capability decisions.
- No placeholders or invented service scope remain in the adoption profile.

## Open questions
- Whether the catalog should expand into a larger operations dashboard in the future
- Whether any service entries need additional metadata curation as the ecosystem grows
