import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDateRange, formatUsd } from "@/lib/utils";
import { getAllUpcomingDepartures } from "@/lib/availability";
import { Reveal } from "./reveal";
import { getT } from "@/lib/i18n/server";

export async function CalendarStrip({ limit = 6 }: { limit?: number }) {
  const { locale, t } = await getT();
  const all = await getAllUpcomingDepartures();
  const items = all
    .filter((d) => d.departure.status !== "BLOCKED")
    .slice(0, limit);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal as="div" className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
              {t.home.calendarStrip.eyebrow}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl mt-3 leading-tight">
              {t.home.calendarStrip.title}
            </h2>
          </div>
          <Link
            href="/calendar"
            className="hidden md:inline-block text-sm underline underline-offset-4 hover:text-[var(--color-terracotta)]"
          >
            {t.home.calendarStrip.viewAll}
          </Link>
        </Reveal>

        <Reveal
          as="div"
          delay={0.1}
          className="rounded-2xl overflow-hidden border border-[var(--color-pine)]/10 bg-white"
        >
          {items.map((d, idx) => {
            const start = new Date(d.departure.startDate);
            const end = new Date(d.departure.endDate);
            const isLast = idx === items.length - 1;
            return (
              <Link
                key={d.departure.id}
                href={`/tours/${d.tour.slug}`}
                className={`grid grid-cols-12 gap-4 items-center px-5 md:px-6 py-5 hover:bg-[var(--color-sand)] transition-colors ${
                  isLast ? "" : "border-b border-[var(--color-pine)]/10"
                }`}
              >
                <div className="col-span-3 md:col-span-2 text-sm">
                  <p className="font-medium">{formatDateRange(start, end, locale)}</p>
                </div>
                <div className="col-span-6 md:col-span-5">
                  <p className="font-serif text-lg leading-tight">{d.tour.name}</p>
                  <p className="text-xs text-[var(--color-ink-muted)] mt-0.5">
                    {d.tour.region}
                  </p>
                </div>
                <div className="col-span-3 md:col-span-2 hidden md:block text-sm capitalize">
                  {d.tour.difficulty.toLowerCase()}
                </div>
                <div className="col-span-3 md:col-span-1 text-right md:text-left">
                  {d.departure.status === "FILLING" ? (
                    <Badge variant="terracotta">{t.calendar.statusFilling}</Badge>
                  ) : d.departure.status === "SOLD_OUT" ? (
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
          {items.length === 0 && (
            <div className="p-8 text-sm text-[var(--color-ink-muted)]">
              {t.home.calendarStrip.empty}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
