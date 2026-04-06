# System: statex-ecosystem

## Stack

- **Next.js** (see repo `package.json` for version)
- **Docker** blue/green via `docker-compose.blue.yml` / `docker-compose.green.yml` and `./scripts/deploy.sh`
- **nginx-microservice** for TLS and routing

## Ports

| Role | Host port | Notes |
|------|-----------|--------|
| Blue | 4710 | `PORT` in `.env` |
| Green | 4711 | `PORT_GREEN` |
| Container | 3000 | `CONTAINER_PORT` (default) |

## Env

- Copy `.env.example` → `.env`
- Required: `DOMAIN`, `SERVICE_NAME`, `NGINX_NETWORK_NAME`, `PORT`, `PORT_GREEN`, `CONTAINER_PORT`
- Archetype: [shared/docs/ENV_FILE_STANDARD.md](../shared/docs/ENV_FILE_STANDARD.md) (B)

## Docs

- Deploy detail: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
- Ecosystem tables: [shared/ECOSYSTEM_MAP.md](../shared/ECOSYSTEM_MAP.md)
