import type { Metadata } from "next";
import { getT } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return {
    title: t.credits.metaTitle,
    description: t.credits.metaDescription,
  };
}

export default async function CreditsPage() {
  const { t } = await getT();
  return (
    <div className="mx-auto max-w-3xl px-5 lg:px-8 py-24">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
        {t.credits.eyebrow}
      </p>
      <h1 className="font-serif text-4xl md:text-5xl mt-3 leading-tight">
        {t.credits.title}
      </h1>
      <p className="mt-6 text-[var(--color-ink-soft)] leading-relaxed">
        {t.credits.photoBody.split(t.credits.unsplashLink)[0]}
        <a
          href="https://unsplash.com/license"
          className="underline"
          target="_blank"
          rel="noreferrer"
        >
          {t.credits.unsplashLink}
        </a>
        {t.credits.photoBody.split(t.credits.unsplashLink)[1]?.split(t.credits.unsplashLicense)[0]}
        <a
          href="https://unsplash.com/license"
          className="underline"
          target="_blank"
          rel="noreferrer"
        >
          {t.credits.unsplashLicense}
        </a>
        {t.credits.photoBody.split(t.credits.unsplashLicense)[1]}
      </p>
      <p className="mt-4 text-[var(--color-ink-soft)] leading-relaxed">
        {t.credits.replacingNote}
      </p>

      <h2 className="font-serif text-2xl mt-10">{t.credits.openSourceTitle}</h2>
      <ul className="mt-4 space-y-1 text-sm text-[var(--color-ink-soft)]">
        <li>Next.js · React · TypeScript</li>
        <li>Tailwind CSS · shadcn/ui · Radix UI</li>
        <li>Prisma · SQLite (local) / Postgres (Neon, prod)</li>
        <li>react-day-picker · react-hook-form · zod</li>
        <li>Lucide icons · Framer Motion</li>
      </ul>
    </div>
  );
}
