import { basename } from "node:path";
import { readdir, readFile } from "node:fs/promises";
import { ecosystemItems, type EcosystemItem } from "@/data/ecosystem";

type RegistryRecord = Record<string, unknown>;

const DEFAULT_REGISTRY_PATH = "../nginx-microservice/service-registry";

function slugToEnvKey(slug: string): string {
  return `${slug.replace(/-/g, "_").toUpperCase()}_PUBLIC_URL`;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function toHttpsUrl(value: string): string {
  const trimmed = value.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

function readUrlFromRegistryRecord(record: RegistryRecord): string | undefined {
  const directCandidates = [
    record.url,
    record.public_url,
    record.primary_url,
    record.publicUrl,
    record.primaryUrl,
  ];
  for (const candidate of directCandidates) {
    if (isNonEmptyString(candidate)) {
      return toHttpsUrl(candidate);
    }
  }

  const domainCandidates = [record.domain, record.DOMAIN, record.host];
  for (const candidate of domainCandidates) {
    if (isNonEmptyString(candidate)) {
      return toHttpsUrl(candidate);
    }
  }

  return undefined;
}

async function loadRegistryUrlsBySlug(): Promise<Record<string, string>> {
  const registryPath =
    process.env.NGINX_SERVICE_REGISTRY_PATH?.trim() || DEFAULT_REGISTRY_PATH;
  const output: Record<string, string> = {};

  try {
    const files = await readdir(registryPath);
    const jsonFiles = files.filter((file) => file.endsWith(".json"));

    await Promise.all(
      jsonFiles.map(async (fileName) => {
        const fullPath = `${registryPath}/${fileName}`;
        const raw = await readFile(fullPath, "utf8");
        const parsed = JSON.parse(raw) as RegistryRecord;
        const fileSlug = basename(fileName, ".json");
        const serviceName = isNonEmptyString(parsed.service_name)
          ? parsed.service_name
          : isNonEmptyString(parsed.name)
            ? parsed.name
            : fileSlug;
        const url = readUrlFromRegistryRecord(parsed);

        if (url) {
          output[serviceName] = url;
          output[fileSlug] = url;
        }
      }),
    );
  } catch {
    // Registry directory may not exist in local dev; env fallback still applies.
  }

  return output;
}

function withResolvedUrl(item: EcosystemItem, resolvedUrl?: string): EcosystemItem {
  if (!resolvedUrl) {
    return item;
  }

  const next: EcosystemItem = {
    ...item,
    primaryUrl: resolvedUrl,
  };

  const hasHealthLink = item.links?.some((link) => link.label === "Health");
  if (!hasHealthLink) {
    next.links = [...(item.links ?? []), { label: "Health", href: `${resolvedUrl}/health` }];
  }

  return next;
}

export async function getEcosystemItems(): Promise<EcosystemItem[]> {
  const registryUrls = await loadRegistryUrlsBySlug();

  return ecosystemItems.map((item) => {
    const envOverride = process.env[slugToEnvKey(item.slug)];
    const resolvedUrl = envOverride || registryUrls[item.slug];
    return withResolvedUrl(item, resolvedUrl);
  });
}
