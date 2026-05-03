import { getT } from "@/lib/i18n/server";

type Props = {
  tourName: string;
};

export async function TourFaqAccordion({ tourName }: Props) {
  const { t } = await getT();
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
            {t.tourFaq.eyebrow}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl mt-3">
            {t.tourFaq.title.replace("{tourName}", tourName)}
          </h2>
          <div className="mt-10 space-y-2">
            {t.tourFaq.items.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-[var(--color-pine)]/10 bg-white open:shadow-sm"
              >
                <summary className="cursor-pointer list-none font-medium px-5 py-4 pr-10 relative after:content-['+'] after:absolute after:right-5 after:top-4 group-open:after:content-['–']">
                  {item.q}
                </summary>
                <div className="px-5 pb-4 text-[var(--color-ink-soft)] text-sm leading-relaxed border-t border-[var(--color-pine)]/5 pt-3">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
