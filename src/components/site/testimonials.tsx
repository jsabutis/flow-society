import { Reveal, RevealStagger, RevealItem } from "./reveal";
import { getT } from "@/lib/i18n/server";

const TESTIMONIALS = [
  {
    quote:
      "Conozco La Primavera y aún así me llevaron por líneas que no había rodado. Dos horas perfectas, brunch al final, y el lounge para la conversa con la comunidad. Volvemos seguro.",
    name: "Diego",
    location: "CDMX",
    tour: "E-Bike Brunch · Intermedio",
  },
  {
    quote:
      "The camping experience was magical &mdash; sunrise ride, brunch under the pines, and the lounge felt completely different from the day rides. Worth every peso.",
    name: "Sarah",
    location: "Squamish, BC",
    tour: "E-Bike Camping",
  },
  {
    quote:
      "Yo en muscular, él en e-bike &mdash; el ritmo balanceado funciona perfecto. Llegamos al lounge sin que ninguno estuviera reventado ni aburrido. La mejor &lsquo;cita&rsquo; en meses.",
    name: "Sofía & Matías",
    location: "Guadalajara",
    tour: "Brunch & Lounge · Pareja Híbrida",
  },
];

export async function Testimonials() {
  const { t } = await getT();
  return (
    <section className="py-24 bg-[var(--color-sand)]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
            {t.home.testimonials.eyebrow}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl mt-3 leading-tight">
            {t.home.testimonials.title}
          </h2>
        </Reveal>
        <RevealStagger stagger={0.1} className="mt-12 grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((tt, i) => (
            <RevealItem
              as="figure"
              key={i}
              className="bg-[var(--color-sand-soft)] rounded-2xl p-7 flex flex-col gap-5 border border-[var(--color-pine)]/5"
            >
              <blockquote
                className="font-serif text-lg leading-relaxed text-[var(--color-pine)]"
                dangerouslySetInnerHTML={{ __html: `“${tt.quote}”` }}
              />
              <figcaption className="text-sm">
                <p className="font-medium">{tt.name}</p>
                <p className="text-[var(--color-ink-muted)]">
                  {tt.location} · {tt.tour}
                </p>
              </figcaption>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
