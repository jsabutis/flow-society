import { MapPin } from "lucide-react";
import { Reveal, RevealStagger, RevealItem } from "./reveal";
import { getT } from "@/lib/i18n/server";

/**
 * Zones we ride and care for inside Bosque La Primavera.
 * The "drive" label is approx time from downtown Guadalajara to the trailhead
 * for that zone (kept for layout compatibility with the existing grid).
 */
const DESTINATIONS = [
  { name: "Mariposa Trailhead", drive: "30 min" },
  { name: "Las Planillas", drive: "35 min" },
  { name: "El Burro Flow", drive: "30 min" },
  { name: "Tabachines Singletrack", drive: "30 min" },
  { name: "R\u00edo Caliente", drive: "40 min" },
  { name: "Subida del Tigre", drive: "35 min" },
  { name: "Calle 8", drive: "30 min" },
  { name: "Camp Pinares", drive: "45 min" },
];

export async function DestinationsStrip() {
  const { t } = await getT();
  return (
    <section className="bg-[var(--color-pine)] text-[var(--color-sand-soft)] py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal as="div" className="grid md:grid-cols-2 gap-12 items-end mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-sand-soft)]/70">
              {t.home.destinations.eyebrow}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl mt-3 leading-tight">
              {t.home.destinations.title}
            </h2>
          </div>
          <p className="text-[var(--color-sand-soft)]/75 leading-relaxed">
            {t.home.destinations.description}
          </p>
        </Reveal>
        <RevealStagger
          as="ul"
          stagger={0.05}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--color-sand-soft)]/10 rounded-2xl overflow-hidden"
        >
          {DESTINATIONS.map((d) => (
            <RevealItem
              as="li"
              key={d.name}
              className="bg-[var(--color-pine)] p-5 hover:bg-[var(--color-pine-soft)] transition-colors"
            >
              <div className="flex items-center gap-2 text-[var(--color-clay)]">
                <MapPin className="h-4 w-4" />
                <span className="text-xs uppercase tracking-wide">
                  {d.drive}
                </span>
              </div>
              <p className="mt-1.5 font-serif text-lg">{d.name}</p>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
