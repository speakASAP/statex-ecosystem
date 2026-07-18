import { ecosystemItems, type EcosystemItem } from "@/data/ecosystem";

function slugToEnvKey(slug: string): string {
  return `${slug.replace(/-/g, "_").toUpperCase()}_PUBLIC_URL`;
}

async function loadRegistryUrlsBySlug(): Promise<Record<string, string>> {
  return {};
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
