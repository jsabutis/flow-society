import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { formatDateRange } from "@/lib/utils";
import { getT } from "@/lib/i18n/server";

type RouteParams = { tourSlug: string; id: string };

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { tourSlug, id } = await params;
  const booking = await prisma.bookingRequest.findUnique({
    where: { id },
    include: { tour: true, departure: true },
  });
  if (!booking || booking.tour.slug !== tourSlug) notFound();

  const { locale, t } = await getT();
  const firstName = booking.leadName.split(" ")[0];
  const riderWord =
    booking.partySize === 1 ? t.confirmation.riderOne : t.confirmation.riderMany;
  const dates = formatDateRange(
    new Date(booking.departure.startDate),
    new Date(booking.departure.endDate),
    locale,
  );

  return (
    <div className="pb-24 bg-agave-gradient min-h-[80vh]">
      <div className="mx-auto max-w-2xl px-5 lg:px-8 pt-24 text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-[var(--color-agave)]/30 grid place-items-center">
          <Check
            className="h-8 w-8 text-[var(--color-agave-deep)]"
            strokeWidth={2.5}
          />
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
          {t.confirmation.eyebrow}
        </p>
        <h1 className="font-serif text-5xl mt-3 leading-tight">
          {t.confirmation.title.replace("{firstName}", firstName)}
        </h1>
        <p className="mt-5 text-[var(--color-ink-soft)] leading-relaxed">
          {t.confirmation.body
            .replace("{tourName}", booking.tour.name)
            .replace("{dates}", dates)
            .replace("{n}", String(booking.partySize))
            .replace("{riderWord}", riderWord)}
        </p>
        <p className="mt-3 text-[var(--color-ink-soft)] leading-relaxed">
          {t.confirmation.body2.replace("{email}", booking.email)}
        </p>
        <p className="mt-6 text-xs text-[var(--color-ink-muted)]">
          {t.confirmation.reference.replace("{id}", booking.id)}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/tours">{t.confirmation.browseMoreTours}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">{t.confirmation.backHome}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
