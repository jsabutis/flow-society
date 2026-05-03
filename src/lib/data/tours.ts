import type { ItineraryDay } from "@/lib/types";

export type SeedTour = {
  slug: string;
  name: string;
  region: string;
  bikeTypes: string;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  durationDays: number;
  /** Field is named `basePriceUsd` for legacy DB / type compatibility, but values are in MXN. */
  basePriceUsd: number;
  driveTimeMin: number;
  heroImage: string;
  gallery: string[];
  summary: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  included: string[];
  notIncluded: string[];
  maxGroup: number;
};

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

// MTB imagery from Unsplash (free license). See /credits.
const PHOTO = {
  forestRider: "1633707167682-9068729bc84c", // rider through pine forest
  forestRider2: "1625057983766-71c6d131a01a",
  forestRider3: "1594942940158-af338884ac6f",
  hardtailTrees: "1535369643553-a33e0d1ac81d",
  cliff: "1534146789009-76ed5060ec70",
  mountainTop: "1508789454646-bef72439f197",
  mountainPerson: "1668936132313-2c3105eef631",
  silhouette: "1490507278117-59a4ccd0165f",
  dirtRoad: "1629056528325-f328b5f27ae7",
  brownField: "1621122940876-2b3be129159c",
  rim: "1606087492572-424ebe0f2f61",
  actionTrees: "1627044185459-09e6dbc39444",
  riverCrossing: "1629282438504-a3ad27dc406e",
  airTrick: "1555422643-328573422dc6",
  holdingBike: "1533107862482-0e6974b06ec4",
  greyscaleForest: "1515412512744-6e4adc8b5e55",
  selectiveFocus: "1566480047210-b10eaa1f8095",
  redOnHill: "1673121414328-52eff37bc6d0",
  orangeBlack: "1511994298241-608e28f14fde",
} as const;

/**
 * Flow Society experiences (Bosque La Primavera, Jalisco).
 * Prices in MXN. The brunch tiers reflect the published
 * pricing: $850 with own bike / $1,900 with rental \u2014 we publish
 * the lower number as the headline ("from") and quote rentals on confirmation.
 */
export const tours: SeedTour[] = [
  {
    slug: "primavera-ebike-brunch-principiante",
    name: "La Primavera Brunch Ride \u00B7 Principiante",
    region: "Bosque La Primavera, Jalisco",
    bikeTypes: "E-MTB",
    difficulty: "BEGINNER",
    durationDays: 1,
    basePriceUsd: 850,
    driveTimeMin: 30,
    heroImage: u(PHOTO.forestRider2),
    gallery: [u(PHOTO.greyscaleForest), u(PHOTO.hardtailTrees), u(PHOTO.dirtRoad)],
    summary:
      "Una nueva forma de vivir el bosque de La Primavera. Dos horas de ride personalizado para principiantes, brunch despu\u00E9s y after ride lounge con la comunidad. Cupo limitado.",
    highlights: [
      "2 hrs de ride personalizado por nivel principiante",
      "Gu\u00EDa por riders experimentados \u00B7 trail tips",
      "Brunch + alimentos + bebidas",
      "After Ride Lounge con la comunidad",
      "Fotos durante la rodada",
    ],
    itinerary: [
      {
        day: 1,
        title: "Brunch + Ride + Lounge",
        body: "Bienvenida en el trailhead a las 8:00 con caf\u00E9 y un breve trail-tip. Salimos en grupo peque\u00F1o por las l\u00EDneas m\u00E1s amables de La Primavera \u2014 dos horas de ride relajado, paradas para fotos y para disfrutar el bosque. De regreso al lounge: brunch caliente, snacks, bebidas y un buen rato con el grupo. Sin prisa por irse.",
        distanceKm: 14,
        ascentM: 250,
      },
    ],
    included: [
      "Gu\u00EDa por riders experimentados",
      "Trail tips antes y durante",
      "Brunch + bebidas + snacks",
      "After Ride Lounge",
      "Fotos durante la rodada",
      "Casco si no traes el tuyo",
    ],
    notIncluded: [
      "Casco obligatorio (gratis si no traes el tuyo)",
      "Guantes",
      "Rodilleras recomendadas",
      "Bici en buen estado con bater\u00EDa completa (FULL)",
      "Experiencia previa b\u00E1sica",
      "Renta de bici disponible como extra",
    ],
    maxGroup: 8,
  },
  {
    slug: "primavera-ebike-brunch-intermedio",
    name: "La Primavera Brunch Ride \u00B7 Intermedio",
    region: "Bosque La Primavera, Jalisco",
    bikeTypes: "E-MTB",
    difficulty: "INTERMEDIATE",
    durationDays: 1,
    basePriceUsd: 850,
    driveTimeMin: 30,
    heroImage: u(PHOTO.forestRider),
    gallery: [u(PHOTO.actionTrees), u(PHOTO.redOnHill), u(PHOTO.forestRider3)],
    summary:
      "Dos horas de ride personalizado por nivel intermedio en las mejores l\u00EDneas de La Primavera \u2014 m\u00E1s singletrack, m\u00E1s flow, mismo brunch y after ride lounge.",
    highlights: [
      "2 hrs de ride personalizado por nivel intermedio",
      "L\u00EDneas con m\u00E1s flow y singletrack tejido",
      "Gu\u00EDa por riders experimentados \u00B7 trail tips",
      "Brunch + alimentos + bebidas",
      "After Ride Lounge",
    ],
    itinerary: [
      {
        day: 1,
        title: "Ride intermedio + brunch + lounge",
        body: "Encuentro en el trailhead a las 7:30 con caf\u00E9 y briefing. Dos horas tejiendo entre las mejores l\u00EDneas de La Primavera \u2014 secciones t\u00E9cnicas optativas, paradas para fotos en los miradores y un par de bajadas con buen flow. Regreso al lounge: brunch, snacks, bebidas y conversa con el grupo.",
        distanceKm: 22,
        ascentM: 480,
      },
    ],
    included: [
      "Gu\u00EDa por riders experimentados",
      "Trail tips antes y durante",
      "Brunch + bebidas + snacks",
      "After Ride Lounge",
      "Fotos durante la rodada",
      "Casco si no traes el tuyo",
    ],
    notIncluded: [
      "Casco obligatorio (gratis si no traes el tuyo)",
      "Guantes",
      "Rodilleras recomendadas",
      "Bici en buen estado con bater\u00EDa completa (FULL)",
      "Experiencia previa b\u00E1sica",
      "Renta de bici disponible como extra",
    ],
    maxGroup: 8,
  },
  {
    slug: "brunch-lounge-pareja-hibrida",
    name: "Brunch & Lounge \u00B7 Pareja H\u00EDbrida",
    region: "Bosque La Primavera, Jalisco",
    bikeTypes: "MTB,E-MTB",
    difficulty: "BEGINNER",
    durationDays: 1,
    basePriceUsd: 1700,
    driveTimeMin: 30,
    heroImage: u(PHOTO.dirtRoad),
    gallery: [u(PHOTO.hardtailTrees), u(PHOTO.selectiveFocus), u(PHOTO.greyscaleForest)],
    summary:
      "Una experiencia para parejas o duplas con niveles distintos: una persona en bici muscular, otra con asistencia al pedaleo. Mismo grupo, mismo brunch, mismo lounge \u2014 ritmo balanceado por dise\u00F1o.",
    highlights: [
      "Dise\u00F1ada para parejas o duplas con niveles diferentes",
      "Una bici muscular + una con asistencia (o dos con asistencia)",
      "Ruta corta y amable con paradas mixtas",
      "Brunch + bebidas + after ride lounge",
      "Cupo limitado a pocas parejas por fecha",
    ],
    itinerary: [
      {
        day: 1,
        title: "Ride h\u00EDbrido + brunch + lounge",
        body: "Llegada al trailhead a las 8:30 con caf\u00E9 y briefing. La ruta se dise\u00F1a para que el ritmo lo lleve la persona en bici muscular y la bici con asistencia acompa\u00F1e con cabeza fr\u00EDa. Paradas para fotos, para hidratar y para disfrutar el bosque. De regreso, brunch para dos, bebidas en el lounge y un buen rato.",
        distanceKm: 16,
        ascentM: 320,
      },
    ],
    included: [
      "Gu\u00EDa por riders experimentados",
      "Trail tips para ambos niveles",
      "Brunch + bebidas + snacks (para dos)",
      "After Ride Lounge",
      "Fotos durante la rodada",
      "Casco si no traes el tuyo",
    ],
    notIncluded: [
      "Casco obligatorio (gratis si no traes el tuyo)",
      "Guantes",
      "Rodilleras recomendadas",
      "Bicis en buen estado \u00B7 bici con asistencia con bater\u00EDa completa",
      "Experiencia previa b\u00E1sica",
      "Renta de bici disponible como extra",
    ],
    maxGroup: 6,
  },
  {
    slug: "membresia-flow-society",
    name: "Membres\u00EDa Flow Society",
    region: "Bosque La Primavera, Jalisco",
    bikeTypes: "E-MTB",
    difficulty: "INTERMEDIATE",
    durationDays: 1,
    basePriceUsd: 4500,
    driveTimeMin: 30,
    heroImage: u(PHOTO.silhouette),
    gallery: [u(PHOTO.forestRider2), u(PHOTO.actionTrees), u(PHOTO.mountainPerson)],
    summary:
      "Una master class y tres rides al mes. Acceso prioritario a fechas y eventos, descuentos en reservas privadas y en el campamento. La forma m\u00E1s natural de vivir Flow Society todo el a\u00F1o.",
    highlights: [
      "1 master class al mes \u00B7 t\u00E9cnica, l\u00EDneas, mantenimiento",
      "3 rides al mes incluidos \u00B7 nivel a elegir",
      "Acceso prioritario a fechas y eventos",
      "Descuentos en reservas privadas y campamento",
      "Comunidad y after ride lounge mensual",
    ],
    itinerary: [
      {
        day: 1,
        title: "Mes tipo: 1 master class + 3 rides",
        body: "Cada mes los miembros eligen una master class (t\u00E9cnica, l\u00EDneas, mantenimiento o lectura de terreno) y tres rides del calendario regular \u2014 cualquier nivel, cualquier fecha. El precio publicado es el costo mensual. Confirmamos las fechas espec\u00EDficas al inscribirte.",
      },
    ],
    included: [
      "1 master class al mes",
      "3 rides al mes (nivel a elegir)",
      "After Ride Lounge en cada ride",
      "Brunch + bebidas en cada ride",
      "Acceso prioritario a fechas",
      "Descuentos en eventos privados y camping",
    ],
    notIncluded: [
      "Casco obligatorio (gratis si no traes el tuyo)",
      "Guantes \u00B7 rodilleras recomendadas",
      "Bici propia o renta como extra",
      "Eventos especiales fuera de calendario",
    ],
    maxGroup: 12,
  },
  {
    slug: "ebike-camping-experience",
    name: "MTB Camping Experience",
    region: "Bosque La Primavera, Jalisco",
    bikeTypes: "E-MTB",
    difficulty: "INTERMEDIATE",
    durationDays: 2,
    basePriceUsd: 4900,
    driveTimeMin: 45,
    heroImage: u(PHOTO.mountainTop),
    gallery: [u(PHOTO.cliff), u(PHOTO.brownField), u(PHOTO.forestRider)],
    summary:
      "Dos d\u00EDas de tour en mountain bike y una noche de campamento dentro del bosque. La experiencia premium de Flow Society \u2014 trails, comida, fogata, y la versi\u00F3n m\u00E1s tranquila del lounge bajo los pinos.",
    highlights: [
      "2 d\u00EDas de tour personalizado por nivel",
      "1 noche de campamento dentro del bosque",
      "Cena, desayuno y brunch del segundo d\u00EDa incluidos",
      "Fogata + after ride lounge bajo los pinos",
      "Cupo muy limitado",
    ],
    itinerary: [
      {
        day: 1,
        title: "Llegada \u00B7 ride \u00B7 fogata",
        body: "Encuentro al medio d\u00EDa en el punto de salida con caf\u00E9 y briefing. Tarde de ride por las l\u00EDneas seleccionadas para el grupo \u2014 dos a tres horas con paradas para fotos y para disfrutar las miradas. Llegada al campamento a media tarde, montar tiendas, snacks y descanso. Cena en grupo, fogata y conversa hasta tarde.",
        distanceKm: 26,
        ascentM: 520,
      },
      {
        day: 2,
        title: "Sunrise ride \u00B7 brunch \u00B7 cierre",
        body: "Caf\u00E9 al amanecer y desayuno r\u00E1pido. Salida temprano para aprovechar la luz y la temperatura \u2014 dos horas y media de ride con secciones que solo se rodan bien en la ma\u00F1ana. Regreso al campamento, brunch largo, lounge tranquilo, y cierre formal a media tarde.",
        distanceKm: 28,
        ascentM: 480,
      },
    ],
    included: [
      "2 d\u00EDas de gu\u00EDa por riders experimentados",
      "1 noche de campamento (tienda y equipo b\u00E1sico)",
      "Cena d\u00EDa 1 + desayuno + brunch d\u00EDa 2",
      "After Ride Lounge en ambos d\u00EDas",
      "Fogata + bebidas",
      "Fotos durante la experiencia",
    ],
    notIncluded: [
      "Casco obligatorio (gratis si no traes el tuyo)",
      "Guantes \u00B7 rodilleras recomendadas",
      "Saco de dormir y aislante personal",
      "Bici propia con bater\u00EDa completa (FULL)",
      "Experiencia previa b\u00E1sica",
      "Renta de bici disponible como extra",
    ],
    maxGroup: 6,
  },
];
