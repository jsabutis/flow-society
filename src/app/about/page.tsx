import Image from "next/image";
import type { Metadata } from "next";
import { getT } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return {
    title: t.about.metaTitle,
    description: t.about.metaDescription,
  };
}

export default async function AboutPage() {
  const { t } = await getT();
  return (
    <div className="pb-24">
      <section className="bg-agave-gradient">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-24 pb-16 grid md:grid-cols-2 gap-12 items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
              {t.about.eyebrow}
            </p>
            <h1 className="font-serif text-5xl md:text-6xl mt-3 leading-tight">
              {t.about.title}
            </h1>
          </div>
          <p className="text-[var(--color-ink-soft)] leading-relaxed text-lg">
            {t.about.intro}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1633707167682-9068729bc84c?auto=format&fit=crop&w=1600&q=80"
              alt={t.about.teamHeading}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-serif text-3xl md:text-4xl">{t.about.teamHeading}</h2>
            <p className="mt-5 text-[var(--color-ink-soft)] leading-relaxed">
              {t.about.teamBody1}
            </p>
            <p className="mt-4 text-[var(--color-ink-soft)] leading-relaxed">
              {t.about.teamBody2}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--color-sand)]">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid md:grid-cols-3 gap-10">
          {t.about.cards.map((card) => (
            <div key={card.title}>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-terracotta)]">
                {card.eyebrow}
              </p>
              <h3 className="font-serif text-2xl mt-2">{card.title}</h3>
              <p className="mt-3 text-[var(--color-ink-soft)] leading-relaxed">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
