import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { formatDateRange, formatUsd } from "@/lib/utils";
import { getAllUpcomingDepartures } from "@/lib/availability";
import { getT } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return {
    title: t.calendar.metaTitle,
    description: t.calendar.metaDescription,
  };
}

export default async function CalendarPage() {
  const { locale, t } = await getT();
  const all = await getAllUpcomingDepartures();
  const visible = all.filter((d) => d.departure.status !== "BLOCKED");

  return (
    <div className="pb-24">
      <section className="bg-agave-gradient">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-24 pb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
            {t.calendar.eyebrow}
          </p>
          <h1 className="font-serif text-5xl md:text-6xl mt-3 leading-tight max-w-3xl">
            {t.calendar.title}
          </h1>
          <p className="mt-5 max-w-2xl text-[var(--color-ink-soft)] leading-relaxed text-lg">
            {t.calendar.intro}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="rounded-2xl overflow-hidden border border-[var(--color-pine)]/10 bg-white">
            {visible.map((d, idx) => {
              const start = new Date(d.departure.startDate);
              const end = new Date(d.departure.endDate);
              const isLast = idx === visible.length - 1;
              const isSold = d.departure.status === "SOLD_OUT";
              return (
                <Link
                  key={d.departure.id}
                  href={`/tours/${d.tour.slug}`}
                  className={`grid grid-cols-12 gap-4 items-center px-5 md:px-6 py-5 transition-colors ${
                    isSold
                      ? "bg-[var(--color-sand)] text-[var(--color-ink-muted)]"
                      : "hover:bg-[var(--color-sand)]"
                  } ${isLast ? "" : "border-b border-[var(--color-pine)]/10"}`}
                >
                  <div className="col-span-4 md:col-span-2 text-sm">
                    <p
                      className={`font-medium ${
                        isSold ? "line-through" : ""
                      }`}
                    >
                      {formatDateRange(start, end, locale)}
                    </p>
                  </div>
                  <div className="col-span-8 md:col-span-5">
                    <p className="font-serif text-lg leading-tight">
                      {d.tour.name}
                    </p>
                    <p className="text-xs text-[var(--color-ink-muted)] mt-0.5">
                      {d.tour.region}
                    </p>
                  </div>
                  <div className="col-span-4 md:col-span-2 hidden md:block text-sm capitalize">
                    {d.tour.difficulty.toLowerCase()} ·{" "}
                    {d.tour.durationDays}{" "}
                    {d.tour.durationDays === 1 ? t.calendar.dayOne : t.calendar.dayMany}
                  </div>
                  <div className="col-span-4 md:col-span-1">
                    {d.departure.status === "FILLING" ? (
                      <Badge variant="terracotta">{t.calendar.statusFilling}</Badge>
                    ) : isSold ? (
                      <Badge variant="soldout">{t.calendar.statusSoldOut}</Badge>
                    ) : (
                      <Badge variant="agave">{t.calendar.statusOpen}</Badge>
                    )}
                  </div>
                  <div className="col-span-12 md:col-span-2 hidden md:block text-right text-sm font-medium">
                    {formatUsd(d.tour.basePriceUsd)}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
