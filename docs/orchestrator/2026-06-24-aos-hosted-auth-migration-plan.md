# StateX Ecosystem Hosted Auth Compatibility Plan

Date: 2026-06-24
Owner role: StateX Ecosystem hosted-auth compatibility worker
Repo: `/home/ssf/Documents/Github/statex-ecosystem`
Mode: remote-only documentation and validation

## IPS Chain

Vision: Alfares product and education applications use one central hosted Auth surface and one shared AOS/Auth identity instead of app-local credential forms or service-owned user JWTs.

Goal Impact: StateX Ecosystem remains a public catalog that can safely link to ecosystem services while avoiding duplicate login, registration, token storage, or local credential authority.

System: `statex-ecosystem` Next.js catalog app, `auth-microservice` hosted UI, and public service metadata links.

Feature: hosted-auth compatibility verification for a static/catalog app.

Task: verify this repo has no current user-auth surface that needs hosted-auth code migration, then record future rules for any admin/edit surfaces.

Execution Plan: inspect only static remote repository files, avoid secrets and runtime data, run a static auth scan, run supported build validation, and add repo-local docs only.

Coding Prompt: do not add local login/register forms, do not persist Auth tokens in this app, do not mint or validate user JWTs locally, and do not touch legacy `speakasap-portal`.

Code: documentation-only change in `docs/orchestrator/2026-06-24-aos-hosted-auth-migration-plan.md`.

Validation: static auth scan, `npm run build`, and `git diff --check` on changed files.

## Current Auth Surface

`statex-ecosystem` is a public Next.js catalog:

- Public page: `src/app/page.tsx`
- Catalog UI: `src/components/EcosystemCatalog.tsx`
- Catalog metadata: `src/data/ecosystem.ts`
- Runtime public URL resolution: `src/data/ecosystemRuntime.ts`
- Health route: `src/app/api/health/route.ts`

Static inspection found no login page, registration page, auth callback route, protected dashboard, admin editor, user profile flow, local credential POST, bearer-token guard, Auth token parser, browser token storage, or user JWT minting.

Auth appears only as catalog metadata for `auth-microservice` in `src/data/ecosystem.ts`, where the service is listed as ecosystem infrastructure. Repo docs also contain generic bearer-token examples for agent/RAG tooling, but those examples are not an app authentication surface and were not changed by this lane.

## Hosted Auth Decision

Decision: no hosted-auth code migration is required for the current `statex-ecosystem` app.

Reasoning:

- The app is a static/catalog experience with public links and filters.
- It does not collect human credentials.
- It does not call Auth login/register endpoints.
- It does not parse hosted Auth token fragments.
- It does not store access or refresh tokens.
- It does not protect routes with app-local user identity checks.
- Its Auth reference is catalog content, not an authentication implementation.

Compatibility status: Auth-compatible as a public static/catalog app.

## Safety Boundaries

This lane did not:

- Read `.env` values.
- Read Kubernetes Secret data.
- Read live database data.
- Read or record raw JWTs, refresh tokens, passwords, contact codes, reset links, or user PII.
- Modify application source, package/dependency files, deploy files, or Kubernetes files.
- Run deploys.
- Touch legacy `speakasap-portal`.

Unavailable runtime facts:

- `[UNKNOWN: whether any private/admin route exists outside the inspected repository source]`
- `[MISSING: approved production Auth client registry source of truth for any future StateX Ecosystem admin callback]`

## Future Implementation Rules

If StateX Ecosystem later gains admin, edit, submission, moderation, preview, or internal-control surfaces:

1. Human login/register must redirect to hosted Auth:
   - `https://auth.alfares.cz/login?client_id=statex-ecosystem&return_url=<https callback url>&state=<opaque state>`
   - `https://auth.alfares.cz/register?client_id=statex-ecosystem&return_url=<https callback url>&state=<opaque state>`
2. Callback handling must parse tokens only from the URL fragment, validate returned `state`, strip the fragment from browser history, and route back to a safe in-app path.
3. Prefer a server/BFF session using HTTP-only, Secure, SameSite cookies. If a transitional browser-token adapter is approved, document it as debt and avoid long-lived localStorage refresh-token exposure.
4. Backend or route-handler authorization must validate Auth-issued access tokens through `POST /auth/validate` unless an approved repo-local local-verifier exception exists.
5. Product-local records may store catalog/editor profiles and permissions, but they must reference Auth identity and must not become credential authority.
6. Do not introduce app-local password, phone-code, magic-link, reset, or registration flows that duplicate hosted Auth.
7. Do not log, screenshot, commit, or document raw token fragments, contact values, or user data during validation.
8. Keep service/catalog links public unless a specific route is intentionally protected; do not gate the whole static catalog without a product decision.

## Validation Evidence

Remote preflight:

```text
cd /home/ssf/Documents/Github/statex-ecosystem
git status --short --branch
git branch --show-current
git log -1 --oneline
```

Result:

```text
## main...origin/main
main
407e8e0 docs: mark project completed frozen
```

Static auth scan:

```text
rg -n "auth\.alfares\.cz|/login|/register|Authorization|Bearer|localStorage|sessionStorage|access_token|refresh_token|JWT|jwt|password|callback|auth/callback|useAuth|auth" . --glob "!node_modules/**" --glob "!.git/**" --glob "!.next/**" --glob "!.env" --glob "!**/.env" --glob "!k8s/secret*"
```

Relevant result:

```text
./AGENTS.md:22:  -H "Authorization: Bearer $JWT_TOKEN" \
./CLAUDE.md:29:  -H "Authorization: Bearer $(cat ~/.claude/rag-token)" \
./src/data/ecosystem.ts:57:    slug: "auth-microservice",
./src/data/ecosystem.ts:58:    name: "auth-microservice",
./src/data/ecosystem.ts:60:    summary: "JWT authentication and user management.",
./k8s/configmap.yaml:14:  # Add environment variables from .env that are non-sensitive (no secrets, API keys, passwords)
./package-lock.json:142:      "integrity": "sha512-l5XkZK7r7wa9LucGw9LwZyyCUscb4x37JWTPz7swwFE/0FMQAGpiWUZn8u9DzkSBWEcK25jmvubfpw2dnAMdbw==",
```

Interpretation:

- No app login/register/callback/token-storage implementation was found.
- `AGENTS.md` and `CLAUDE.md` matches are documentation examples, not app user-auth code.
- `src/data/ecosystem.ts` match is service catalog metadata for `auth-microservice`.
- `k8s/configmap.yaml` and `package-lock.json` matches are unrelated static text/dependency metadata.

Build validation:

```text
npm run build
```

Result: passed.

Safe excerpt:

```text
> statex-ecosystem@0.1.0 build
> next build

✓ Compiled successfully
✓ Generating static pages using 6 workers (5/5)
Route (app)
┌ ○ /
├ ○ /_not-found
└ ƒ /api/health
```

Diff validation:

```text
git diff --check -- docs/orchestrator/2026-06-24-aos-hosted-auth-migration-plan.md
git diff --no-index --check /dev/null docs/orchestrator/2026-06-24-aos-hosted-auth-migration-plan.md
```

Result: passed with no whitespace errors. The no-index form was used because the changed file is newly added and currently untracked.
