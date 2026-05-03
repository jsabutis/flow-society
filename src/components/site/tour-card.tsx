import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatUsd } from "@/lib/utils";
import { Star } from "lucide-react";
import { getT } from "@/lib/i18n/server";

type Props = {
  slug: string;
  name: string;
  region: string;
  bikeTypes: string;
  difficulty: string;
  durationDays: number;
  basePriceUsd: number;
  heroImage: string;
  /** Aggregate rating when reviews exist */
  ratingAvg?: number;
  reviewCount?: number;
  /** Next departure is filling fast */
  fillingFast?: boolean;
};

export async function TourCard({
  slug,
  name,
  region,
  bikeTypes,
  difficulty,
  durationDays,
  basePriceUsd,
  heroImage,
  ratingAvg,
  reviewCount,
  fillingFast,
}: Props) {
  const { locale, t } = await getT();
  const showRating =
    ratingAvg != null && reviewCount != null && reviewCount > 0;

  const reviewWord =
    reviewCount === 1 ? t.tourCard.reviewOne : t.tourCard.reviewMany;
  const dayWord =
    durationDays === 1 ? t.tourCard.dayOne : t.tourCard.dayMany;
  const priceLabel = t.tourCard.fromPrice.replace(
    "{price}",
    formatUsd(basePriceUsd, locale),
  );

  return (
    <Link
      href={`/tours/${slug}`}
      className="group block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out border border-[var(--color-pine)]/5"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={heroImage}
          alt={name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {fillingFast && (
            <Badge variant="outline" className="bg-amber-500/90 text-white border-amber-400/50">
              {t.tourCard.fillingFast}
            </Badge>
          )}
          {bikeTypes.split(",").map((bt) => (
            <Badge key={bt} variant="terracotta">
              {bt}
            </Badge>
          ))}
        </div>
        <div className="absolute bottom-0 inset-x-0 p-5 text-white">
          <h3 className="font-serif text-2xl leading-tight">{name}</h3>
          <p className="text-sm/relaxed mt-1 text-white/80">{region}</p>
          {showRating && (
            <p className="mt-2 flex items-center gap-1 text-sm text-white/90">
              <Star className="h-4 w-4 text-amber-300 fill-amber-300" aria-hidden />
              <span>{ratingAvg.toFixed(1)}</span>
              <span className="text-white/70">
                ({reviewCount} {reviewWord})
              </span>
            </p>
          )}
        </div>
      </div>
      <div className="p-5 flex items-center justify-between text-sm">
        <div className="flex items-center gap-3 text-[var(--color-ink-soft)]">
          <span className="capitalize">{difficulty.toLowerCase()}</span>
          <span className="text-[var(--color-ink-muted)]">·</span>
          <span>
            {durationDays} {dayWord}
          </span>
        </div>
        <div className="font-medium text-[var(--color-pine)]">
          {priceLabel}
        </div>
      </div>
    </Link>
  );
}
