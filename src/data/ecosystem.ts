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
    slug: "monitoring-microservice",
    name: "monitoring-microservice",
    kind: "infrastructure",
    summary: "Observability platform for metrics, dashboards, and runtime health.",
  },
  {
    slug: "backups-microservice",
    name: "backups-microservice",
    kind: "infrastructure",
    summary: "Centralized backup management for databases, object storage, and Kubernetes resources.",
  },
  {
    slug: "docs-rag-microservice",
    name: "docs-rag-microservice",
    kind: "infrastructure",
    summary: "Documentation RAG for semantic search over ecosystem knowledge.",
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
    slug: "ai-microservice-ollama",
    name: "ai-microservice-ollama",
    kind: "infrastructure",
    summary: "Local Ollama runtime for ecosystem-hosted LLM workloads.",
  },
  {
    slug: "minio-microservice",
    name: "minio-microservice",
    kind: "infrastructure",
    summary: "S3-compatible object storage.",
  },
  {
    slug: "vault-microservice",
    name: "vault-microservice",
    kind: "infrastructure",
    summary: "HashiCorp Vault secrets runtime (Docker permanent, not K8s).",
    primaryUrl: "https://vault.alfares.cz",
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
    slug: "invoices-microservice",
    name: "invoices-microservice",
    kind: "microservice",
    summary: "Proforma and final tax invoices from order/payment lifecycle.",
    primaryUrl: "https://invoices.alfares.cz",
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
    slug: "prompts-microservice",
    name: "prompts-microservice",
    kind: "microservice",
    summary: "Authenticated prompt CRUD and sharing.",
  },
  {
    slug: "agentic-email-processing-system",
    name: "agentic-email-processing-system",
    kind: "microservice",
    summary: "AI email triage and classification.",
  },
  {
    slug: "business-process-control-plane",
    name: "business-process-control-plane",
    kind: "microservice",
    summary: "Process/policy/workflow registry (ClusterIP; Holiday Discount pilot).",
    status: "future",
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
    slug: "chytrakoupe",
    name: "chytrakoupe",
    kind: "application",
    summary: "Czech conversion storefront (ChytraKoupe) on FlipFlop commerce APIs.",
    primaryUrl: "https://chytrakoupe.alfares.cz",
  },
  {
    slug: "cliplot",
    name: "cliplot",
    kind: "application",
    summary: "Czech e-commerce storefront (Cliplot).",
    primaryUrl: "https://cliplot.alfares.cz",
  },
  {
    slug: "rent-a-box",
    name: "rent-a-box",
    kind: "application",
    summary: "Self-storage MVP — web + API rental journey.",
    primaryUrl: "https://rent-a-box.alfares.cz",
  },
  {
    slug: "crypto-ai-agent",
    name: "crypto-ai-agent",
    kind: "application",
    summary: "AI-assisted crypto portfolio tooling.",
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
    status: "future",
    summary: "Real estate agency site (RU / EN / AR) — Non-K8s, no local runtime.",
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
    status: "future",
    summary: "Education portal, lessons, and recordings (legacy speakasap server).",
  },
  {
    slug: "school-committee",
    name: "school-committee",
    kind: "application",
    summary: "Czech primary school parent committee platform.",
  },
  {
    slug: "candidate-blueprism",
    name: "candidate-blueprism",
    kind: "application",
    summary: "Blue Prism candidate exercise and process-flow assessment tool.",
  },
  {
    slug: "domain-research",
    name: "domain-research",
    kind: "application",
    summary: "Domain suggestion, RDAP availability checks, and watch/notify.",
    primaryUrl: "https://domain-research.alfares.cz",
  },
  {
    slug: "ecosystem-console",
    name: "ecosystem-console",
    kind: "application",
    status: "future",
    summary: "Ecosystem console UI (K8s only; no local Github repo).",
    primaryUrl: "https://ecosystem-console.alfares.cz",
  },
  // —— Orchestration ——
  {
    slug: "runlayer",
    name: "runlayer",
    kind: "orchestration",
    summary: "AI agent orchestration brain (businesses, projects, tasks, workers).",
    primaryUrl: "https://runlayer.alfares.cz",
  },
  {
    slug: "goalkeeper",
    name: "goalkeeper",
    kind: "orchestration",
    summary: "Telegram-first IPS-governed autonomous development control plane.",
    primaryUrl: "https://goalkeeper.alfares.cz",
  },
  // —— Hub ——
  {
    slug: "shared",
    name: "shared",
    kind: "hub",
    summary: "Ecosystem documentation, scripts, and standards (repo, not a public site).",
  },
  {
    slug: "k8s-manifests",
    name: "k8s-manifests",
    kind: "hub",
    summary: "Shared Kubernetes manifests SSOT for statex-apps.",
  },
  {
    slug: "vault",
    name: "vault",
    kind: "hub",
    summary: "Vault policies and AppRole bootstrap (not the Vault runtime).",
  },
  {
    slug: "company-evidence-platform-docs",
    name: "company-evidence-platform-docs",
    kind: "hub",
    status: "future",
    summary: "Product docs for company/supplier verification service (docs-only).",
  },
  // —— Static / other ——
  {
    slug: "rehtani",
    name: "rehtani",
    kind: "static",
    summary: "Static site — Řehtání Četechovice.",
    primaryUrl: "https://rehtani.alfares.cz",
  },
  {
    slug: "statex-ecosystem",
    name: "statex-ecosystem",
    kind: "static",
    summary: "Public Next.js ecosystem catalog for Statex applications and services.",
    primaryUrl: "https://statex-ecosystem.alfares.cz",
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
