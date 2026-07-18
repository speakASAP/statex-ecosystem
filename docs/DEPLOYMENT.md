# statex-ecosystem — deployment

## Standards

- [shared/docs/DEPLOY_STANDARD.md](../../shared/docs/DEPLOY_STANDARD.md) — `deploy.sh` structure, service configuration, registry behavior
- [shared/docs/CREATE_SERVICE.md](../../shared/docs/CREATE_SERVICE.md) — ecosystem conventions (`.env`, Kubernetes deployment patterns)
- [shared/README.md](../../shared/README.md) — Kubernetes service on standard container port **3000**; exposed via Traefik ingress on standard HTTP/HTTPS ports

## Ports

| Environment | Host port | Variable | Container |
|-------------|-----------|----------|-----------|
| Kubernetes | N/A (via Traefik) | N/A | 3000 (`CONTAINER_PORT`) |
| Docker (local) | 4710 | `PORT` | 3000 |

Health: `GET /api/health` inside the container. Traefik Ingress checks this endpoint for route health.

## Production (Kubernetes)

1. Deploy to Kubernetes: `kubectl apply -f k8s/`
2. The Ingress rules in `k8s/<service>-ingress.yaml` automatically configure Traefik routing
3. Services communicate via Kubernetes DNS: `<service-name>.<namespace>.svc.cluster.local`

No manual service registration needed — Traefik discovers routes from Ingress resources automatically.

## Local

- Dev server: `npm run dev` → <http://localhost:3000>
- Docker (no external network): `docker compose up --build` → <http://localhost:4710>
