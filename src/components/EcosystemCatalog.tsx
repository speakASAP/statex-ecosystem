"use client";

import { useMemo, useState } from "react";
import type { AccessKind, EcosystemItem, EcosystemKind } from "@/data/ecosystem";
import { accessLabels, allKinds, kindLabels } from "@/data/ecosystem";

type Filter = "all" | EcosystemKind;

const filters: Filter[] = ["all", ...allKinds];

const kindStyles: Record<EcosystemKind, string> = {
  top: "bg-amber-500/20 text-amber-100 ring-amber-400/40",
  infrastructure: "bg-zinc-500/20 text-zinc-200 ring-zinc-400/30",
  microservice: "bg-sky-500/15 text-sky-200 ring-sky-400/30",
  application: "bg-violet-500/15 text-violet-200 ring-violet-400/30",
  orchestration: "bg-fuchsia-500/15 text-fuchsia-200 ring-fuchsia-400/30",
  hub: "bg-orange-500/15 text-orange-200 ring-orange-400/30",
  static: "bg-teal-500/15 text-teal-200 ring-teal-400/30",
};

function KindBadge({ kind }: { kind: EcosystemKind }) {
  return (
    <span
      className={`rounded-md px-2 py-0.5 text-xs font-medium ring-1 ${kindStyles[kind]}`}
    >
      {kindLabels[kind]}
    </span>
  );
}

function AccessBadge({ access }: { access: AccessKind }) {
  const styles: Record<AccessKind, string> = {
    ui: "bg-emerald-500/15 text-emerald-200 ring-emerald-400/30",
    api: "bg-sky-500/15 text-sky-200 ring-sky-400/30",
    internal: "bg-zinc-500/20 text-zinc-300 ring-zinc-400/30",
    docs: "bg-amber-500/15 text-amber-200 ring-amber-400/30",
  };
  return (
    <span className={`rounded-md px-2 py-0.5 text-xs font-medium ring-1 ${styles[access]}`}>
      {accessLabels[access]}
    </span>
  );
}

function orderedKinds(kinds: EcosystemKind[]): EcosystemKind[] {
  return allKinds.filter((kind) => kinds.includes(kind));
}

function Card({ item }: { item: EcosystemItem }) {
  const isFuture = item.status === "future";
  const hasPrimary = Boolean(item.primaryUrl);
  const hasLinks = Boolean(item.links?.length);

  return (
    <article
      className="flex flex-col rounded-xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur-sm transition hover:border-violet-400/40 hover:bg-white/[0.07]"
      id={item.slug}
    >
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <h3 className="text-lg font-semibold text-white">{item.name}</h3>
        {orderedKinds(item.kinds).map((kind) => (
          <KindBadge key={kind} kind={kind} />
        ))}
        <AccessBadge access={item.access} />
        {isFuture ? (
          <span className="rounded-md bg-amber-500/20 px-2 py-0.5 text-xs font-medium text-amber-200 ring-1 ring-amber-400/40">
            Coming soon
          </span>
        ) : null}
      </div>
      <p className="mb-3 flex-1 text-sm leading-relaxed text-zinc-300">
        {item.summary}
      </p>
      {(item.domain || item.ports) ? (
        <p className="mb-2 font-mono text-xs text-zinc-500">
          {item.domain}
          {item.domain && item.ports ? " · " : null}
          {item.ports ? `port ${item.ports}` : null}
        </p>
      ) : null}
      {item.note ? (
        <p className="mb-3 text-xs leading-relaxed text-zinc-500">{item.note}</p>
      ) : null}
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {hasPrimary ? (
          <a
            href={item.primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500"
          >
            Open
          </a>
        ) : null}
        {item.links?.map((link) => (
          <a
            key={link.href + link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:border-violet-400/50 hover:text-white"
          >
            {link.label}
          </a>
        ))}
        {!hasPrimary && !hasLinks ? (
          <span className="inline-flex items-center rounded-lg border border-white/15 px-4 py-2 text-sm text-zinc-400">
            No public URL
          </span>
        ) : null}
      </div>
    </article>
  );
}

export function EcosystemCatalog({ items }: { items: EcosystemItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((i) => {
      if (filter !== "all" && !i.kinds.includes(filter)) return false;
      if (!q) return true;
      const hay = [
        i.name,
        i.slug,
        i.summary,
        i.domain,
        i.note,
        i.ports,
        accessLabels[i.access],
        ...i.kinds.map((kind) => kindLabels[kind]),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [filter, items, query]);

  return (
    <div className="w-full max-w-6xl">
      <div className="mb-6">
        <label htmlFor="catalog-search" className="sr-only">
          Search catalog
        </label>
        <input
          id="catalog-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, domain, category, or notes"
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 outline-none ring-violet-400/0 transition focus:border-violet-400/50 focus:ring-2 focus:ring-violet-400/30"
        />
      </div>
      <div
        className="mb-8 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter by category"
      >
        {filters.map((f) => {
          const label =
            f === "all" ? "All" : kindLabels[f as EcosystemKind];
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                active
                  ? f === "top"
                    ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-900/40"
                    : "bg-violet-600 text-white shadow-md shadow-violet-900/40"
                  : f === "top"
                    ? "bg-amber-500/20 text-amber-100 hover:bg-amber-500/30"
                    : "bg-white/10 text-zinc-200 hover:bg-white/15"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {visible.map((item) => (
          <Card key={item.slug} item={item} />
        ))}
      </div>
      {visible.length === 0 ? (
        <p className="mt-8 text-center text-zinc-400">Nothing in this filter.</p>
      ) : null}
    </div>
  );
}
