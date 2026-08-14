# deploy.config.sh — declaration consumed by shared/scripts/deploy.sh.
# See shared/docs/DEPLOY_STANDARD.md for the config format.
#
# Replaces a bespoke scripts/deploy.sh that applied manifests and ran
# `kubectl rollout restart` with no docker build/push at all. Against
# `image: :latest` a restart just re-pulls whatever :latest already was, so
# committed source changes never reached production (the pod ran untouched
# from 2026-07-15 while src/data/ecosystem.ts changed on 2026-08-03).
#
# deployment.yaml is applied statically and hardcodes :latest; DEPLOYMENTS
# declares the image name so `kubectl set image` overwrites it with the SHA
# tag after apply.
#
# The Dockerfile runs `npm run build` in its builder stage, so there is no
# deploy_preflight build hook — adding one would duplicate a ~2min Next.js build.
#
# external-secret.yaml is deliberately absent from MANIFESTS: no ExternalSecret
# exists for this service. The Secret statex-ecosystem-secret (DB_PASSWORD) is
# not ESO-managed.

SERVICE_NAME="statex-ecosystem"
PORT="4710"

IMAGES=(
  "statex-ecosystem|.||"
)

DEPLOYMENTS=(
  "statex-ecosystem|app|statex-ecosystem"
)

MANIFESTS=(configmap.yaml deployment.yaml service.yaml ingress.yaml)
