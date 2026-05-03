import { Star } from "lucide-react";

type Props = {
  riderName: string;
  riderLocation: string;
  rating: number;
  quote: string;
};

export function ReviewCard({ riderName, riderLocation, rating, quote }: Props) {
  return (
    <figure className="rounded-2xl border border-[var(--color-pine)]/10 bg-[var(--color-sand-soft)] p-6 flex flex-col h-full">
      <div className="flex gap-0.5 text-amber-500" aria-label={`${rating} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-[var(--color-ink-muted)]/30"}`}
          />
        ))}
      </div>
      <blockquote className="mt-4 font-serif text-lg leading-relaxed text-[var(--color-pine)] flex-1">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 text-sm">
        <p className="font-medium">{riderName}</p>
        <p className="text-[var(--color-ink-muted)]">{riderLocation}</p>
      </figcaption>
    </figure>
  );
}
