import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { findSeedBikeBySlug } from "@/lib/static-preview-data";
import { isStaticPreviewMode } from "@/lib/static-preview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatUsd, parseJson } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { getToursForBikeCategory } from "@/lib/tour-bikes";
import { TourCard } from "@/components/site/tour-card";
import { getT } from "@/lib/i18n/server";
import { SiteBreadcrumbs } from "@/components/site/site-breadcrumbs";

type RouteParams = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bike = isStaticPreviewMode()
    ? findSeedBikeBySlug(slug)
    : await prisma.bike.findUnique({ where: { slug } });
  if (!bike) return { title: "Bike" };
  return {
    title: `${bike.brand} ${bike.model}`,
    description: `${bike.travelMm} mm travel · ${bike.wheelSize === "MX" ? "Mullet" : `${bike.wheelSize}"`} · ${bike.drivetrain}.`,
    openGraph: {
      title: `${bike.brand} ${bike.model}`,
      description: `${bike.travelMm} mm travel · ${bike.drivetrain}.`,
      images: [bike.heroImage],
    },
  };
}

const labelForCategory: Record<string, string> = {
  TRAIL: "Trail",
  ENDURO: "Enduro",
  XC: "XC",
  "E-MTB": "E-MTB",
  DOWN_COUNTRY: "Down-country",
};

export default async function BikeDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const bike = isStaticPreviewMode()
    ? findSeedBikeBySlug(slug)
    : await prisma.bike.findUnique({ where: { slug } });
  if (!bike) notFound();

  const { locale, t } = await getT();
  const sizes = parseJson<string[]>(bike.sizesAvail, []);
  const gallery = parseJson<string[]>(bike.gallery, []);

  const relatedTours = await getToursForBikeCategory(bike.category, 6);

  return (
    <div className="pb-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-12 space-y-4">
        <SiteBreadcrumbs
          items={[
            { href: "/", label: t.ux.breadcrumbHome },
            { href: "/bikes", label: t.ux.breadcrumbBikes },
            { label: `${bike.brand} ${bike.model}` },
          ]}
          className="text-[var(--color-ink-muted)] [&_a]:text-[var(--color-pine)] [&_a:hover]:text-[var(--color-terracotta)]"
        />
        <Link
          href="/bikes"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-pine)]"
        >
          <ArrowLeft className="h-4 w-4" /> {t.bikeDetail.backToFleet}
        </Link>
      </div>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 mt-8 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <div className="relative aspect-[5/4] rounded-2xl overflow-hidden bg-[var(--color-sand-deep)]">
            <Image
              src={bike.heroImage}
              alt={`${bike.brand} ${bike.model}`}
              fill
              priority
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
          {gallery.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-3">
              {gallery.slice(0, 3).map((src) => (
                <div
                  key={src}
                  className="relative aspect-square rounded-xl overflow-hidden bg-[var(--color-sand-deep)]"
                >
                  <Image src={src} alt="" fill sizes="33vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="lg:col-span-5">
          <Badge variant="terracotta">{labelForCategory[bike.category] ?? bike.category}</Badge>
          <p className="mt-4 text-sm uppercase tracking-wide text-[var(--color-ink-muted)]">
            {bike.brand}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl mt-1 leading-tight">
            {bike.model}
          </h1>
          {bike.notes && (
            <p className="mt-4 text-[var(--color-ink-soft)] leading-relaxed">
              {bike.notes}
            </p>
          )}

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-[var(--color-pine)]/10 pt-6">
            <SpecRow label={t.bikeDetail.specRearTravel}>
              {bike.travelMm} {t.bikeDetail.specTravelUnit}
            </SpecRow>
            <SpecRow label={t.bikeDetail.specWheels}>
              {bike.wheelSize === "MX"
                ? t.bikeDetail.specWheelsMullet
                : `${bike.wheelSize}"`}
            </SpecRow>
            <SpecRow label={t.bikeDetail.specSuspension} wide>
              {bike.suspension}
            </SpecRow>
            <SpecRow label={t.bikeDetail.specDrivetrain} wide>
              {bike.drivetrain}
            </SpecRow>
            <SpecRow label={t.bikeDetail.specBrakes} wide>
              {bike.brakes}
            </SpecRow>
            <SpecRow label={t.bikeDetail.specTires} wide>
              {bike.tires}
            </SpecRow>
            <SpecRow label={t.bikeDetail.specSizesAvail}>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {sizes.map((s) => (
                  <Badge key={s} variant="outline">
                    {s}
                  </Badge>
                ))}
              </div>
            </SpecRow>
            <SpecRow label={t.bikeDetail.specRiderHeight}>
              {bike.riderHeightCm} {t.bikeDetail.specRiderHeightUnit}
            </SpecRow>
          </dl>

          <div className="mt-8 flex items-end justify-between border-t border-[var(--color-pine)]/10 pt-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-[var(--color-ink-muted)]">
                {t.bikeDetail.dailyRateLabel}
              </p>
              <p className="font-serif text-3xl mt-1">
                {formatUsd(bike.dailyRateUsd, locale)}
                <span className="text-sm text-[var(--color-ink-muted)] font-sans">
                  {" "}
                  {t.bikeDetail.perDay}
                </span>
              </p>
            </div>
            <Button asChild>
              <Link href="/tours">{t.bikeDetail.pickATour}</Link>
            </Button>
          </div>
        </aside>
      </section>

      {relatedTours.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 lg:px-8 mt-16">
          <h2 className="font-serif text-2xl md:text-3xl">{t.bikeDetail.relatedTripsTitle}</h2>
          <p className="mt-2 text-sm text-[var(--color-ink-soft)] max-w-2xl">
            {t.bikeDetail.relatedTripsBody}
          </p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedTours.map((tour) => (
              <TourCard key={tour.slug} {...tour} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function SpecRow({
  label,
  children,
  wide,
}: {
  label: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "col-span-2" : ""}>
      <dt className="text-xs uppercase tracking-wide text-[var(--color-ink-muted)]">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-[var(--color-pine)]">{children}</dd>
    </div>
  );
}
