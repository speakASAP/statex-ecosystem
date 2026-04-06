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

const h = (host: string, path = ""): string => `https://${host}${path}`;

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
    primaryUrl: h("auth.statex.cz"),
    links: [{ label: "Health", href: h("auth.statex.cz", "/health") }],
  },
  {
    slug: "logging-microservice",
    name: "logging-microservice",
    kind: "infrastructure",
    summary: "Centralized structured logging with timestamps and duration.",
    primaryUrl: h("logging.statex.cz"),
    links: [{ label: "Health", href: h("logging.statex.cz", "/health") }],
  },
  {
    slug: "notifications-microservice",
    name: "notifications-microservice",
    kind: "infrastructure",
    summary: "Email, Telegram, WhatsApp notifications.",
    primaryUrl: h("notifications.statex.cz"),
    links: [{ label: "Health", href: h("notifications.statex.cz", "/health") }],
  },
  {
    slug: "ai-microservice",
    name: "ai-microservice",
    kind: "infrastructure",
    summary: "LLM inference, NLP, ASR, Document AI.",
    primaryUrl: h("ai.statex.cz"),
    links: [{ label: "Health", href: h("ai.statex.cz", "/health") }],
  },
  {
    slug: "minio-microservice",
    name: "minio-microservice",
    kind: "infrastructure",
    summary: "S3-compatible object storage.",
    primaryUrl: h("minio.alfares.cz"),
  },
  {
    slug: "messenger",
    name: "messenger",
    kind: "infrastructure",
    summary: "Matrix messaging and LiveKit A/V.",
    primaryUrl: h("messenger.statex.cz"),
  },
  // —— E-commerce & ops microservices ——
  {
    slug: "catalog-microservice",
    name: "catalog-microservice",
    kind: "microservice",
    summary: "Product catalog — source of truth for listings.",
    primaryUrl: h("catalog.statex.cz"),
    links: [{ label: "Health", href: h("catalog.statex.cz", "/health") }],
  },
  {
    slug: "warehouse-microservice",
    name: "warehouse-microservice",
    kind: "microservice",
    summary: "Stock and inventory management.",
    primaryUrl: h("warehouse.statex.cz"),
    links: [{ label: "Health", href: h("warehouse.statex.cz", "/health") }],
  },
  {
    slug: "orders-microservice",
    name: "orders-microservice",
    kind: "microservice",
    summary: "Central order processing.",
    primaryUrl: h("orders.statex.cz"),
    links: [{ label: "Health", href: h("orders.statex.cz", "/health") }],
  },
  {
    slug: "payments-microservice",
    name: "payments-microservice",
    kind: "microservice",
    summary: "PayPal, Stripe, PayU, ComGate, Fio Banka.",
    primaryUrl: h("payments.statex.cz"),
    links: [{ label: "Health", href: h("payments.statex.cz", "/health") }],
  },
  {
    slug: "suppliers-microservice",
    name: "suppliers-microservice",
    kind: "microservice",
    summary: "Supplier API imports and feeds.",
    primaryUrl: h("supplier.statex.cz"),
    links: [{ label: "Health", href: h("supplier.statex.cz", "/health") }],
  },
  {
    slug: "leads-microservice",
    name: "leads-microservice",
    kind: "microservice",
    summary: "Lead intake and CRM-oriented workflows.",
    primaryUrl: h("leads.statex.cz"),
    links: [{ label: "Health", href: h("leads.statex.cz", "/health") }],
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
    primaryUrl: h("aeps.alfares.cz"),
    links: [{ label: "Health", href: h("aeps.alfares.cz", "/health") }],
  },
  {
    slug: "allegro-service",
    name: "allegro-service",
    kind: "microservice",
    summary: "Allegro marketplace integration.",
    primaryUrl: h("allegro.statex.cz"),
  },
  {
    slug: "aukro-service",
    name: "aukro-service",
    kind: "microservice",
    summary: "Aukro marketplace integration.",
    primaryUrl: h("aukro.statex.cz"),
  },
  {
    slug: "bazos-service",
    name: "bazos-service",
    kind: "microservice",
    summary: "Bazoš classifieds automation.",
    primaryUrl: h("bazos.statex.cz"),
  },
  {
    slug: "heureka-service",
    name: "heureka-service",
    kind: "microservice",
    summary: "Heureka XML feed generation.",
    primaryUrl: h("heureka.statex.cz"),
  },
  // —— Applications ——
  {
    slug: "statex",
    name: "statex",
    kind: "application",
    summary: "AI-powered business automation platform.",
    primaryUrl: h("statex.cz"),
  },
  {
    slug: "flipflop-service",
    name: "flipflop-service",
    kind: "application",
    summary: "E-commerce for the Czech market.",
    primaryUrl: h("flipflop.statex.cz"),
  },
  {
    slug: "crypto-ai-agent",
    name: "crypto-ai-agent",
    kind: "application",
    summary: "AI-assisted crypto portfolio tooling.",
    primaryUrl: h("crypto-ai-agent.statex.cz"),
  },
  {
    slug: "beauty",
    name: "beauty",
    kind: "application",
    summary: "Multi-tenant beauty salon franchise platform.",
    primaryUrl: h("beauty.statex.cz"),
  },
  {
    slug: "marathon",
    name: "marathon",
    kind: "application",
    summary: "Intensive learning programs and marathons.",
    primaryUrl: h("marathon.statex.cz"),
  },
  {
    slug: "sgiprealestate",
    name: "sgiprealestate",
    kind: "application",
    summary: "Real estate agency site (RU / EN / AR).",
    primaryUrl: h("sgiprealestate.statex.cz"),
  },
  {
    slug: "shop-assistant",
    name: "shop-assistant",
    kind: "application",
    summary: "AI voice and text shopping assistant.",
    primaryUrl: h("shop-assistant.statex.cz"),
  },
  {
    slug: "speakasap",
    name: "speakasap",
    kind: "application",
    summary: "Online language learning platform.",
    primaryUrl: h("speakasap.statex.cz"),
  },
  {
    slug: "speakasap-portal",
    name: "speakasap-portal",
    kind: "application",
    summary: "Education portal, lessons, and recordings.",
    primaryUrl: h("speakasap.com"),
    links: [{ label: "Portal context", href: h("speakasap.com") }],
  },
  // —— Orchestration (roadmap) ——
  {
    slug: "business-orchestrator",
    name: "business-orchestrator",
    kind: "orchestration",
    status: "future",
    summary:
      "AI agent orchestration: businesses, projects, tasks, workers, and dashboard (in active development).",
    primaryUrl: h("orchestrator.statex.cz"),
    links: [
      {
        label: "Planned API health",
        href: h("orchestrator.statex.cz", "/health"),
      },
    ],
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
    primaryUrl: h("rehtani.alfares.cz"),
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
