"use client";

import { useMemo, useState } from "react";
import type { EcosystemItem, EcosystemKind } from "@/data/ecosystem";
import { allKinds, kindLabels } from "@/data/ecosystem";

type Filter = "all" | EcosystemKind;

const filters: Filter[] = ["all", ...allKinds];

function KindBadge({ kind }: { kind: EcosystemKind }) {
  return (
    <span className="rounded-md bg-violet-500/15 px-2 py-0.5 text-xs font-medium text-violet-200 ring-1 ring-violet-400/30">
      {kindLabels[kind]}
    </span>
  );
}

function Card({ item }: { item: EcosystemItem }) {
  const isFuture = item.status === "future";
  const hasPrimary = Boolean(item.primaryUrl);

  return (
    <article
      className="flex flex-col rounded-xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur-sm transition hover:border-violet-400/40 hover:bg-white/[0.07]"
      id={item.slug}
    >
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <h3 className="text-lg font-semibold text-white">{item.name}</h3>
        <KindBadge kind={item.kind} />
        {isFuture ? (
          <span className="rounded-md bg-amber-500/20 px-2 py-0.5 text-xs font-medium text-amber-200 ring-1 ring-amber-400/40">
            Coming soon
          </span>
        ) : null}
      </div>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-300">
        {item.summary}
      </p>
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
        ) : (
          <span className="inline-flex items-center rounded-lg border border-white/15 px-4 py-2 text-sm text-zinc-400">
            No public URL
          </span>
        )}
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
      </div>
    </article>
  );
}

export function EcosystemCatalog({ items }: { items: EcosystemItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((i) => i.kind === filter);
  }, [filter, items]);

  return (
    <div className="w-full max-w-6xl">
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
                  ? "bg-violet-600 text-white shadow-md shadow-violet-900/40"
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
