# statex-ecosystem — deployment

## Standards

- [shared/docs/DEPLOY_STANDARD.md](../../shared/docs/DEPLOY_STANDARD.md) — `deploy.sh` structure, nginx-api-routes, registry behavior
- [shared/docs/CREATE_SERVICE.md](../../shared/docs/CREATE_SERVICE.md) — ecosystem conventions (`.env`, blue/green, nginx-network)
- [shared/README.md](../../shared/README.md) — port **47xx**: **4710** (blue), **4711** (green); container **3000**

## Ports

| Role | Host port | Variable | Container |
|------|-----------|----------|-----------|
| Blue | 4710 | `PORT` | 3000 (`CONTAINER_PORT`) |
| Green | 4711 | `PORT_GREEN` | 3000 |

Health: `GET /api/health` inside the container. Traefik Ingress checks this endpoint for route health.

## Production (Kubernetes)

1. Deploy to Kubernetes: `kubectl apply -f k8s/`
2. The Ingress rules in `k8s/<service>-ingress.yaml` automatically configure Traefik routing
3. Services communicate via Kubernetes DNS: `<service-name>.<namespace>.svc.cluster.local`

No manual service registration needed — Traefik discovers routes from Ingress resources automatically.

## Local

- Dev server: `npm run dev` → <http://localhost:3000>
- Docker (no external network): `docker compose up --build` → <http://localhost:4710>
