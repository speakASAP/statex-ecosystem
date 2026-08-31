# TASK-001-bootstrap-service

completeness_level: complete

status: validated

## Objective
Create and validate the initial IPS onboarding profile for the Statex ecosystem catalog so it has truthful adoption artifacts, governance documentation, and a valid capability review.

## Upstream links
- `../22_goal_impact/GOAL-IMPACT-TASK-001.md`
- `../21_execution_plans/EP-TASK-001-bootstrap-service.md`
- `../12_validation/VAL-TASK-001-bootstrap-service.md`

## Goal impact
The catalog app gains an explicit low-priority boundary and truthful onboarding contract without inventing runtime complexity or business-critical claims.

## Project invariant impact
The project remains aligned with the overarching invariant that repository scope must be honest, reviewable, and traceable.

## Sensitive-data classification
No secret values or production credentials are introduced as part of the onboarding documentation. The profile describes the repo’s low-priority app scope without exposing secret material.

## Contract and schema impact
The adoption profile updates the local project contract and the shared IPS validation schema only at the repository adoption boundary. No runtime service contract is invented as part of the task.

## Replay and determinism impact
The bootstrap task is deterministic and repository-local: it creates or aligns the adoption profile with the real app state and governance artifacts.

## Scope
- Align adoption docs to the real lifecycle and runtime boundaries of the app
- Create or refine the required IPS artifacts and local validation evidence
- Ensure the repository meets the onboarding validator requirements at the planning phase

## Non-goals
- Production rollout or deployment activity beyond the app’s own catalog scope
- Inventing core business or revenue-critical product claims
- Creating a runtime dependency map that the repo does not actually own

## Acceptance criteria
- All required sections exist in each required artifact
- No placeholder or fabricated evidence remains in the profile
- The validator exits successfully for `--phase planning`
- The project has a concrete, truthful adoption profile and repository state record

## Required context
- Existing repository docs and config for the app’s actual scope
- Central IPS adoption standard and validation rules

## Validation task
Run the repository-local validator and verify the profile is valid before committing the repository change.

## Required gates
- `python3 intent-preservation-system/scripts/validate_adoption_profile.py --root statex-ecosystem --phase planning`

## Parallel workstream context
This task touches only the repository adoption profile and governance docs. No runtime deploy work is included beyond the app’s own low-priority operation.
