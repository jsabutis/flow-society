import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatUsd } from "@/lib/utils";
import { getT } from "@/lib/i18n/server";

type Props = {
  slug: string;
  brand: string;
  model: string;
  category: string;
  travelMm: number;
  wheelSize: string;
  dailyRateUsd: number;
  heroImage: string;
};

const labelForCategory: Record<string, string> = {
  TRAIL: "Trail",
  ENDURO: "Enduro",
  XC: "XC",
  "E-MTB": "E-MTB",
  DOWN_COUNTRY: "Down-country",
};

export async function BikeCard({
  slug,
  brand,
  model,
  category,
  travelMm,
  wheelSize,
  dailyRateUsd,
  heroImage,
}: Props) {
  const { locale, t } = await getT();
  const priceLabel = t.bikeCard.perDay.replace(
    "{price}",
    formatUsd(dailyRateUsd, locale),
  );
  return (
    <Link
      href={`/bikes/${slug}`}
      className="group block rounded-2xl overflow-hidden bg-white border border-[var(--color-pine)]/5 hover:shadow-xl transition-shadow"
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-[var(--color-sand-deep)]">
        <Image
          src={heroImage}
          alt={`${brand} ${model}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="terracotta">{labelForCategory[category] ?? category}</Badge>
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-wide text-[var(--color-ink-muted)]">
          {brand}
        </p>
        <h3 className="font-serif text-xl mt-0.5">{model}</h3>
        <div className="mt-3 flex items-center justify-between text-sm">
          <p className="text-[var(--color-ink-soft)]">
            {travelMm} mm · {wheelSize === "MX" ? "Mullet" : `${wheelSize}"`}
          </p>
          <p className="font-medium">{priceLabel}</p>
        </div>
      </div>
    </Link>
  );
}
