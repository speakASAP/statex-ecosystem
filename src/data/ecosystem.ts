/**
 * Curated catalog aligned with shared/README.md and shared/ECOSYSTEM_MAP.md.
 * When you add a service there, update this file (no auto-parse in v1).
 */

export type EcosystemKind =
  | "application"
  | "microservice"
  | "infrastructure"
  | "orchestration"
  | "hub"
  | "static";

/** live = publicly promoted; future = roadmap / not fully productized yet */
export type ServiceStatus = "live" | "future";

export interface EcosystemLink {
  label: string;
  href: string;
}

export interface EcosystemItem {
  slug: string;
  name: string;
  kind: EcosystemKind;
  summary: string;
  primaryUrl?: string;
  links?: EcosystemLink[];
  status?: ServiceStatus;
}

export const kindLabels: Record<EcosystemKind, string> = {
  infrastructure: "Infrastructure",
  microservice: "Microservices",
  application: "Applications",
  orchestration: "Orchestration",
  hub: "Hub",
  static: "Static sites",
};

export const ecosystemItems: EcosystemItem[] = [
  // —— Infrastructure ——
  {
    slug: "nginx-microservice",
    name: "nginx-microservice",
    kind: "infrastructure",
    summary:
      "Reverse proxy, SSL (Let’s Encrypt), blue/green deployment routing.",
  },
  {
    slug: "database-server",
    name: "database-server",
    kind: "infrastructure",
    summary: "Shared PostgreSQL and Redis for the ecosystem.",
  },
  {
    slug: "auth-microservice",
    name: "auth-microservice",
    kind: "infrastructure",
    summary: "JWT authentication and user management.",
  },
  {
    slug: "logging-microservice",
    name: "logging-microservice",
    kind: "infrastructure",
    summary: "Centralized structured logging with timestamps and duration.",
  },
  {
    slug: "notifications-microservice",
    name: "notifications-microservice",
    kind: "infrastructure",
    summary: "Email, Telegram, WhatsApp notifications.",
  },
  {
    slug: "ai-microservice",
    name: "ai-microservice",
    kind: "infrastructure",
    summary: "LLM inference, NLP, ASR, Document AI.",
  },
  {
    slug: "minio-microservice",
    name: "minio-microservice",
    kind: "infrastructure",
    summary: "S3-compatible object storage.",
  },
  {
    slug: "messenger",
    name: "messenger",
    kind: "infrastructure",
    summary: "Matrix messaging and LiveKit A/V.",
  },
  // —— E-commerce & ops microservices ——
  {
    slug: "catalog-microservice",
    name: "catalog-microservice",
    kind: "microservice",
    summary: "Product catalog — source of truth for listings.",
  },
  {
    slug: "warehouse-microservice",
    name: "warehouse-microservice",
    kind: "microservice",
    summary: "Stock and inventory management.",
  },
  {
    slug: "orders-microservice",
    name: "orders-microservice",
    kind: "microservice",
    summary: "Central order processing.",
  },
  {
    slug: "payments-microservice",
    name: "payments-microservice",
    kind: "microservice",
    summary: "PayPal, Stripe, PayU, ComGate, Fio Banka.",
  },
  {
    slug: "suppliers-microservice",
    name: "suppliers-microservice",
    kind: "microservice",
    summary: "Supplier API imports and feeds.",
  },
  {
    slug: "leads-microservice",
    name: "leads-microservice",
    kind: "microservice",
    summary: "Lead intake and CRM-oriented workflows.",
  },
  {
    slug: "marketing-microservice",
    name: "marketing-microservice",
    kind: "microservice",
    summary: "Campaigns and segmentation engine (internal routing).",
  },
  {
    slug: "agentic-email-processing-system",
    name: "agentic-email-processing-system",
    kind: "microservice",
    summary: "AI email triage and classification.",
  },
  {
    slug: "allegro-service",
    name: "allegro-service",
    kind: "microservice",
    summary: "Allegro marketplace integration.",
  },
  {
    slug: "aukro-service",
    name: "aukro-service",
    kind: "microservice",
    summary: "Aukro marketplace integration.",
  },
  {
    slug: "bazos-service",
    name: "bazos-service",
    kind: "microservice",
    summary: "Bazoš classifieds automation.",
  },
  {
    slug: "heureka-service",
    name: "heureka-service",
    kind: "microservice",
    summary: "Heureka XML feed generation.",
  },
  // —— Applications ——
  {
    slug: "statex",
    name: "statex",
    kind: "application",
    summary: "AI-powered business automation platform.",
  },
  {
    slug: "flipflop-service",
    name: "flipflop-service",
    kind: "application",
    summary: "E-commerce for the Czech market.",
  },
  {
    slug: "crypto-ai-agent",
    name: "crypto-ai-agent",
    kind: "application",
    summary: "AI-assisted crypto portfolio tooling.",
  },
  {
    slug: "beauty",
    name: "beauty",
    kind: "application",
    summary: "Multi-tenant beauty salon franchise platform.",
  },
  {
    slug: "marathon",
    name: "marathon",
    kind: "application",
    summary: "Intensive learning programs and marathons.",
  },
  {
    slug: "sgiprealestate",
    name: "sgiprealestate",
    kind: "application",
    summary: "Real estate agency site (RU / EN / AR).",
  },
  {
    slug: "shop-assistant",
    name: "shop-assistant",
    kind: "application",
    summary: "AI voice and text shopping assistant.",
  },
  {
    slug: "speakasap",
    name: "speakasap",
    kind: "application",
    summary: "Online language learning platform.",
  },
  {
    slug: "speakasap-portal",
    name: "speakasap-portal",
    kind: "application",
    summary: "Education portal, lessons, and recordings.",
  },
  // —— Orchestration (roadmap) ——
  {
    slug: "business-orchestrator",
    name: "business-orchestrator",
    kind: "orchestration",
    status: "future",
    summary:
      "AI agent orchestration: businesses, projects, tasks, workers, and dashboard (in active development).",
  },
  // —— Hub ——
  {
    slug: "shared",
    name: "shared",
    kind: "hub",
    summary: "Ecosystem documentation, scripts, and standards (repo, not a public site).",
  },
  // —— Static / other ——
  {
    slug: "rehtani",
    name: "rehtani",
    kind: "static",
    summary: "Static site — Řehtání Četechovice.",
  },
  {
    slug: "openclaw",
    name: "openclaw",
    kind: "application",
    summary: "OpenClaw application (see openclaw/CLAUDE.md in workspace).",
  },
];

export const allKinds: EcosystemKind[] = [
  "infrastructure",
  "microservice",
  "application",
  "orchestration",
  "hub",
  "static",
];
