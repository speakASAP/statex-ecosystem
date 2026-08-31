# Validation debt

## Purpose
This ledger records known gaps, non-blocking exceptions, and validation follow-ups that are intentionally not part of the current low-priority catalog onboarding work. It keeps the project honest and prevents repeated rediscovery of the same issues.

## Rules
- Add entries only when a repo-level issue is real, traceable, and not caused by a placeholder or false claim in the current adoption profile.
- Keep debt entries factual and scoped to a concrete issue or follow-up.
- Link each debt item to the owning action or next task so it can be closed later.
- Do not use placeholder markers such as `REPLACE_ME`, `TBD`, or `TASK-XXX` in the ledger.

## Entries
- No current validation debt is recorded for the Statex ecosystem catalog adoption profile.

## Update format
- Date: 2026-08-31
- Issue: brief summary
- Owner: repository owner or responsible maintainer
- Status: open or resolved
- Next action: concrete closure step

Example:
- Date: 2026-08-31
- Issue: Catalog metadata refresh for a newly added service
- Owner: platform maintainers
- Status: open
- Next action: review the service map and update the route metadata in the app
