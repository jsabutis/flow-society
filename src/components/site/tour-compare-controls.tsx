"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type TourOpt = { slug: string; name: string };

export function TourCompareControls({ tours }: { tours: TourOpt[] }) {
  const [picked, setPicked] = React.useState<string[]>([]);

  const toggle = (slug: string) => {
    setPicked((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug].slice(0, 3),
    );
  };

  const href =
    picked.length >= 2
      ? `/tours/compare?slugs=${picked.map(encodeURIComponent).join(",")}`
      : null;

  return (
    <>
      <div className="mb-8 rounded-2xl border border-[var(--color-pine)]/10 bg-white p-4">
        <p className="text-sm font-medium text-[var(--color-pine)]">Compare up to 3 tours</p>
        <p className="text-xs text-[var(--color-ink-muted)] mt-1">
          Tick tours below, then open the comparison table.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {tours.map((t) => (
            <label
              key={t.slug}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                picked.includes(t.slug)
                  ? "border-[var(--color-terracotta)] bg-[var(--color-terracotta)]/10"
                  : "border-[var(--color-pine)]/15 hover:border-[var(--color-pine)]/30"
              }`}
            >
              <input
                type="checkbox"
                className="rounded border-[var(--color-pine)]/30"
                checked={picked.includes(t.slug)}
                onChange={() => toggle(t.slug)}
              />
              <span className="truncate max-w-[12rem]">{t.name}</span>
            </label>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3">
          {href ? (
            <Button asChild size="sm">
              <Link href={href}>Compare {picked.length} tours</Link>
            </Button>
          ) : (
            <Button size="sm" type="button" disabled>
              Pick at least 2 tours
            </Button>
          )}
          {picked.length > 0 && (
            <button
              type="button"
              onClick={() => setPicked([])}
              className="text-sm text-[var(--color-ink-muted)] underline underline-offset-4"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </>
  );
}
