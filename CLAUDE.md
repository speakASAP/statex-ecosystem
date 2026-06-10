# CLAUDE.md (statex-ecosystem)

→ Ecosystem: [../shared/CLAUDE.md](../shared/CLAUDE.md) | Reading order: `BUSINESS.md` → `SYSTEM.md` → `AGENTS.md` → `TASKS.md` → `STATE.json`

---

## Knowledge Retrieval — docs-rag-microservice (MANDATORY, query before reading files)

**Query the RAG before reading source files** — saves 2000-5000 tokens per answer.

```bash
kubectl -n statex-apps exec deployment/statex-ecosystem -- curl -s -X POST http://docs-rag-microservice:3397/retrieval/agent-context \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $(cat ~/.claude/rag-token)" \
  -d '{"query": "YOUR QUESTION HERE", "maxTokens": 3000}'
```


---

## statex-ecosystem

**Purpose**: Ecosystem dashboard and service directory — unified portal for the Statex microservices platform.  
**Port**: 4710 · **Domain**: https://statex-ecosystem.alfares.cz  
**Stack**: Next.js · Kubernetes (`statex-apps`)

### Key constraints
- This is NOT the standard Next.js — APIs, conventions, and file structure may differ from training data. Read guides in `node_modules/next/dist/docs/` before writing any code.
- Never commit or push; follow workspace `.cursor/rules/no-git-commit.mdc`

### Secrets
All secrets in Vault at `secret/prod/statex-ecosystem` → ESO → K8s Secret `statex-ecosystem-secret`.

**Ops**: `kubectl logs -n statex-apps -l app=statex-ecosystem -f` · `kubectl rollout restart deployment/statex-ecosystem -n statex-apps` · `./scripts/deploy.sh`
