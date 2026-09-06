import { ecosystemItems, type EcosystemItem } from "@/data/ecosystem";

function slugToEnvKey(slug: string): string {
  return `${slug.replace(/-/g, "_").toUpperCase()}_PUBLIC_URL`;
}

export async function getEcosystemItems(): Promise<EcosystemItem[]> {
  for (const item of ecosystemItems) {
    if (!item.kinds.length) {
      throw new Error(`Catalog entry ${item.slug} has no categories`);
    }
  }
  return ecosystemItems.map((item) => {
    const envOverride = process.env[slugToEnvKey(item.slug)];
    if (!envOverride) {
      return item;
    }
    return { ...item, primaryUrl: envOverride };
  });
}
