import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { findSeedTourBySlug } from "@/lib/static-preview-data";
import { isStaticPreviewMode } from "@/lib/static-preview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AvailabilityCalendarWrapper } from "@/components/site/availability-calendar-wrapper";
import { getTourAvailability } from "@/lib/availability";
import { formatUsd, parseJson } from "@/lib/utils";
import type { ItineraryDay } from "@/lib/types";
import { ArrowRight, Check, MapPin, Mountain, Users, X, Activity } from "lucide-react";
import { getTourReviews, getTourReviewStats } from "@/lib/reviews";
import { getRecommendedBikesForTour } from "@/lib/tour-bikes";
import { ReviewCard } from "@/components/site/review-card";
import { TourFaqAccordion } from "@/components/site/tour-faq-accordion";
import { TourRecommendedBikes } from "@/components/site/tour-recommended-bikes";
import { TourMobileBookBar } from "@/components/site/tour-mobile-book-bar";
import { Star } from "lucide-react";
import { getT } from "@/lib/i18n/server";
import { SiteBreadcrumbs } from "@/components/site/site-breadcrumbs";

type RouteParams = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = isStaticPreviewMode()
    ? findSeedTourBySlug(slug)
    : await prisma.tour.findUnique({ where: { slug } });
  if (!tour) return { title: "Tour" };
  return {
    title: tour.name,
    description: tour.summary,
    openGraph: {
      title: tour.name,
      description: tour.summary,
      images: [tour.heroImage],
    },
  };
}

function difficultyDiamondCount(difficulty: string) {
  const u = difficulty.toUpperCase();
  if (u === "BEGINNER") return 1;
  if (u === "INTERMEDIATE") return 2;
  return 3;
}

function fitnessDotCount(difficulty: string) {
  const u = difficulty.toUpperCase();
  if (u === "BEGINNER") return 2;
  if (u === "INTERMEDIATE") return 3;
  return 4;
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const tour = isStaticPreviewMode()
    ? findSeedTourBySlug(slug)
    : await prisma.tour.findUnique({ where: { slug } });
  if (!tour) notFound();

  const { locale, t } = await getT();

  const [departures, reviews, reviewStats, recommendedBikes] = await Promise.all([
    getTourAvailability(slug),
    getTourReviews(tour.id, 5),
    getTourReviewStats(tour.id),
    getRecommendedBikesForTour(tour.bikeTypes, 6),
  ]);

  const gallery = parseJson<string[]>(tour.gallery, []);
  const highlights = parseJson<string[]>(tour.highlights, []);
  const itinerary = parseJson<ItineraryDay[]>(tour.itinerary, []);
  const included = parseJson<string[]>(tour.included, []);
  const notIncluded = parseJson<string[]>(tour.notIncluded, []);

  const bookable = departures
    .filter((d) => d.status === "OPEN" || d.status === "FILLING")
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  const nextDep = bookable[0];
  const nextStartLabel = nextDep
    ? new Intl.DateTimeFormat(locale, {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(nextDep.startDate))
    : null;

  const diamonds = difficultyDiamondCount(tour.difficulty);
  const fitness = fitnessDotCount(tour.difficulty);
  const reviewWord = reviewStats.count === 1 ? t.tourDetail.reviewOne : t.tourDetail.reviewMany;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Trip",
    name: tour.name,
    description: tour.summary,
    touristType: "Mountain bikers",
    offers: {
      "@type": "Offer",
      price: tour.basePriceUsd,
      priceCurrency: "MXN",
      availability: "https://schema.org/InStock",
      url: `https://flowsociety.mx/tours/${tour.slug}`,
    },
  };
  if (reviewStats.count > 0) {
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: String(reviewStats.avg),
      reviewCount: String(reviewStats.count),
    };
  }

  return (
    <div className="pb-28 lg:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <TourMobileBookBar
        basePriceUsd={tour.basePriceUsd}
        nextStartLabel={nextStartLabel}
        calendarSectionId="tour-pick-date"
      />

      <section className="relative min-h-[72vh] overflow-hidden text-white">
        <Image
          src={tour.heroImage}
          alt={tour.name}
          fill
          priority
          sizes="100vw"
          className="object-cover -z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70 -z-10" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8 pt-24 md:pt-36 pb-20 min-h-[72vh] flex flex-col justify-end">
          <div className="max-w-3xl">
            <div className="mb-5">
              <SiteBreadcrumbs
                items={[
                  { href: "/", label: t.ux.breadcrumbHome },
                  { href: "/tours", label: t.ux.breadcrumbTours },
                  { label: tour.name },
                ]}
                className="text-white/75 [&_a]:text-white/90 [&_a:hover]:text-white"
              />
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              {tour.bikeTypes.split(",").map((bt) => (
                <Badge key={bt} variant="terracotta">
                  {bt}
                </Badge>
              ))}
              <Badge variant="outline" className="text-white border-white/30">
                {tour.difficulty.toLowerCase()}
              </Badge>
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/85">
              {tour.region}
            </p>
            <h1 className="font-serif text-5xl md:text-7xl mt-4 leading-[1.05] tracking-tight">
              {tour.name}
            </h1>
            <p className="mt-6 text-lg max-w-2xl text-white/85 leading-relaxed">
              {tour.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={`/book/${tour.slug}`}>
                  {t.tourDetail.bookThisTour} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b border-[var(--color-pine)]/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          <Stat icon={<Mountain className="h-5 w-5" />} label={t.tourDetail.statDifficulty}>
            <span
              className="flex items-center gap-1"
              aria-label={t.tourDetail.difficultyOf3.replace("{n}", String(diamonds))}
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-lg leading-none ${i < diamonds ? "text-[var(--color-pine)]" : "text-[var(--color-ink-muted)]/25"}`}
                >
                  ◆
                </span>
              ))}
            </span>
            <span className="block text-sm text-[var(--color-ink-muted)] mt-1 capitalize">
              {tour.difficulty.toLowerCase()}
            </span>
          </Stat>
          <Stat icon={<Activity className="h-5 w-5" />} label={t.tourDetail.statFitness}>
            <span
              className="flex items-center gap-1.5"
              aria-label={t.tourDetail.fitnessOf5.replace("{n}", String(fitness))}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full ${i < fitness ? "bg-[var(--color-terracotta)]" : "bg-[var(--color-ink-muted)]/20"}`}
                />
              ))}
            </span>
            <span className="block text-sm text-[var(--color-ink-muted)] mt-1">
              {t.tourDetail.statFitnessSub}
            </span>
          </Stat>
          <Stat icon={<Users className="h-5 w-5" />} label={t.tourDetail.statGroupSize}>
            {t.tourDetail.statUpTo.replace("{n}", String(tour.maxGroup))}
          </Stat>
          <Stat icon={<MapPin className="h-5 w-5" />} label={t.tourDetail.statDriveFromGdl}>
            {Math.round(tour.driveTimeMin / 60) > 0
              ? t.tourDetail.driveHours.replace("{n}", String(Math.round(tour.driveTimeMin / 60)))
              : t.tourDetail.driveMinutes.replace("{n}", String(tour.driveTimeMin))}
          </Stat>
          <Stat icon={null} label={t.tourDetail.statFrom}>
            <span className="font-serif text-2xl">
              {formatUsd(tour.basePriceUsd, locale)}
            </span>{" "}
            <span className="text-sm text-[var(--color-ink-muted)]">{t.tourDetail.statPerRider}</span>
          </Stat>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-3xl md:text-4xl">{t.tourDetail.highlights}</h2>
            <ul className="mt-6 space-y-3">
              {highlights.map((h) => (
                <li key={h} className="flex gap-3 text-[var(--color-ink-soft)]">
                  <Check
                    className="h-5 w-5 mt-0.5 text-[var(--color-terracotta)] shrink-0"
                    strokeWidth={2.5}
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {gallery.slice(0, 4).map((src) => (
              <div
                key={src}
                className="relative aspect-square rounded-xl overflow-hidden bg-[var(--color-sand-deep)]"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {itinerary.length > 0 && (
        <section className="py-20 bg-[var(--color-sand)]">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className="font-serif text-3xl md:text-4xl">{t.tourDetail.dayByDay}</h2>
            <ol className="mt-10 space-y-8 max-w-3xl">
              {itinerary.map((d) => (
                <li key={d.day} className="grid grid-cols-12 gap-4">
                  <div className="col-span-2 md:col-span-1">
                    <div className="font-serif text-3xl text-[var(--color-terracotta)]">
                      {String(d.day).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="col-span-10 md:col-span-11">
                    <h3 className="font-serif text-xl">{d.title}</h3>
                    {(d.distanceKm || d.ascentM) && (
                      <p className="text-xs uppercase tracking-wide text-[var(--color-ink-muted)] mt-1">
                        {d.distanceKm ? `${d.distanceKm} km` : ""}
                        {d.distanceKm && d.ascentM ? " · " : ""}
                        {d.ascentM
                          ? t.tourDetail.climbingMetres.replace("{n}", String(d.ascentM))
                          : ""}
                      </p>
                    )}
                    <p className="mt-3 text-[var(--color-ink-soft)] leading-relaxed">
                      {d.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl">{t.tourDetail.pricingTitle}</h2>
          <p className="mt-3 max-w-3xl text-[var(--color-ink-soft)] leading-relaxed">
            {t.tourDetail.pricingBody.split(t.tourDetail.pricingBodyNoCharge).map((part, i, arr) =>
              i < arr.length - 1 ? (
                <span key={i}>
                  {part}
                  <strong>{t.tourDetail.pricingBodyNoCharge}</strong>
                </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </p>
          <div className="mt-10 grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-serif text-xl">{t.tourDetail.includedTitle}</h3>
              <ul className="mt-6 space-y-3">
                {included.map((item) => (
                  <li key={item} className="flex gap-3 text-[var(--color-ink-soft)]">
                    <Check
                      className="h-5 w-5 mt-0.5 text-[var(--color-agave-deep)] shrink-0"
                      strokeWidth={2.5}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-xl">{t.tourDetail.notIncludedTitle}</h3>
              <ul className="mt-6 space-y-3">
                {notIncluded.map((item) => (
                  <li key={item} className="flex gap-3 text-[var(--color-ink-soft)]">
                    <X
                      className="h-5 w-5 mt-0.5 text-[var(--color-ink-muted)] shrink-0"
                      strokeWidth={2.5}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {reviews.length > 0 && (
        <section className="py-20 bg-[var(--color-sand)]">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                  {t.tourDetail.reviewsEyebrow}
                </p>
                <h2 className="font-serif text-3xl md:text-4xl mt-3">{t.tourDetail.reviewsTitle}</h2>
              </div>
              {reviewStats.count > 0 && (
                <p className="flex items-center gap-2 text-[var(--color-pine)]">
                  <Star className="h-5 w-5 text-amber-500 fill-amber-400" aria-hidden />
                  <span className="font-serif text-2xl">{reviewStats.avg.toFixed(1)}</span>
                  <span className="text-[var(--color-ink-soft)]">
                    ({reviewStats.count} {reviewWord})
                  </span>
                </p>
              )}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((r) => (
                <ReviewCard
                  key={r.id}
                  riderName={r.riderName}
                  riderLocation={r.riderLocation}
                  rating={r.rating}
                  quote={r.quote}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <TourFaqAccordion tourName={tour.name} />

      <TourRecommendedBikes bikes={recommendedBikes} />

      <section
        id="tour-pick-date"
        className="scroll-mt-28 py-14 md:py-20 bg-[var(--color-pine)] text-[var(--color-sand-soft)]"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-3xl mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-sand-soft)]/70">
              {t.tourDetail.pickDateEyebrow}
            </p>
            <h2 className="font-serif text-3xl md:text-5xl mt-3 leading-tight">
              {t.tourDetail.pickDateTitle}
            </h2>
            <p className="mt-4 text-[var(--color-sand-soft)]/85 leading-relaxed">
              {t.tourDetail.pickDateBody.replace("{price}", formatUsd(tour.basePriceUsd, locale))}
            </p>
            <p className="mt-3 text-[var(--color-sand-soft)]/80 leading-relaxed text-sm">
              {t.tourDetail.pickDateBodyNote}
            </p>
          </div>

          <div className="bg-[var(--color-sand-soft)] rounded-3xl p-6 md:p-10 text-[var(--color-pine)]">
            <AvailabilityCalendarWrapper
              tourSlug={tour.slug}
              basePriceUsd={tour.basePriceUsd}
              departures={departures}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-[var(--color-terracotta)]">
        {icon}
        <p className="text-xs uppercase tracking-wide">{label}</p>
      </div>
      <div className="mt-2 text-lg text-[var(--color-pine)]">{children}</div>
    </div>
  );
}
