# Claude Instructions

Shared rules live here:

- Claude profile: `/home/ssf/.claude/CLAUDE.md`
- Shared ecosystem instructions: `/home/ssf/Documents/Github/CLAUDE.md`
- Codex profile: `/home/ssf/.codex/AGENTS.md`
- Cross-agent standard: `/home/ssf/.ai-agent-standards/CROSS_AGENT_AUTOMATION_STANDARD.md`
- Repository operations: `AGENT_OPERATIONS.md`

Read those first, then follow the repository-specific notes below and the current planning/status files.


## Repository-Specific Notes

# CLAUDE.md (statex-ecosystem)

→ Ecosystem: [../shared/CLAUDE.md](../shared/CLAUDE.md) | Reading order: `BUSINESS.md` → `SYSTEM.md` → `AGENTS.md` → `TASKS.md` → `STATE.json`

---

## Knowledge Retrieval

Use `docs-rag-microservice` for bounded discovery when it is healthy, then
verify deployment, security, database, integration and public-contract facts
against the cited Git source. Git remains authoritative.

Authority and fallback rules:
`/home/ssf/Documents/Github/shared/docs/DOCUMENTATION_AUTHORITY.md`.

Do not generate tokens in documentation or assume an unconfident/failed RAG
response means that source documentation does not exist.

## statex-ecosystem

**Purpose**: Ecosystem dashboard and service directory — unified portal for the Statex microservices platform.  
**Port**: 4710 · **Domain**: https://statex-ecosystem.alfares.cz  
**Stack**: Next.js · Kubernetes (`statex-apps`)

### Key constraints
- This is NOT the standard Next.js — APIs, conventions, and file structure may differ from training data. Read guides in `node_modules/next/dist/docs/` before writing any code.

### Secrets
All secrets in Vault at `secret/prod/statex-ecosystem` → ESO → K8s Secret `statex-ecosystem-secret`.

**Ops**: `kubectl logs -n statex-apps -l app=statex-ecosystem -f` · `kubectl rollout restart deployment/statex-ecosystem -n statex-apps` · `./scripts/deploy.sh`
