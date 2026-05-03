export type SeedBike = {
  slug: string;
  brand: string;
  model: string;
  category: "TRAIL" | "ENDURO" | "XC" | "E-MTB" | "DOWN_COUNTRY";
  travelMm: number;
  wheelSize: string;
  drivetrain: string;
  brakes: string;
  suspension: string;
  tires: string;
  sizesAvail: string[];
  riderHeightCm: string;
  /** Field is named `dailyRateUsd` for legacy DB / type compatibility, but values are in MXN. */
  dailyRateUsd: number;
  heroImage: string;
  gallery: string[];
  notes?: string;
};

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const PHOTO = {
  orangeBlackBike: "1511994298241-608e28f14fde",
  redBikeOnHill: "1673121414328-52eff37bc6d0",
  blackHardtail: "1534150034764-046bf225d3fa",
  hardtailTrees: "1535369643553-a33e0d1ac81d",
  orangeJacketRider: "1606087492572-424ebe0f2f61",
  forestRider: "1633707167682-9068729bc84c",
  actionTrees: "1627044185459-09e6dbc39444",
  brownField: "1621122940876-2b3be129159c",
  selectiveFocus: "1566480047210-b10eaa1f8095",
} as const;

/**
 * Flow Society rental bike fleet. Daily rates in MXN \u2014 these reflect the
 * "with rental" price uplift over a base ride ($1,900 vs $850 = ~$1,050 MXN
 * rental contribution per ride; daily-rate column rounds for clarity).
 */
export const bikes: SeedBike[] = [
  {
    slug: "specialized-levo-sl",
    brand: "Specialized",
    model: "Turbo Levo SL Expert Carbon",
    category: "E-MTB",
    travelMm: 150,
    wheelSize: "29",
    drivetrain: "SRAM X0 Eagle Transmission",
    brakes: "SRAM Code RSC, 200/200 mm",
    suspension: "Fox 36 Factory \u00B7 Fox Float Factory",
    tires: "Specialized Butcher / Eliminator GRID Trail",
    sizesAvail: ["S2", "S3", "S4", "S5"],
    riderHeightCm: "160\u2013196",
    dailyRateUsd: 1100,
    heroImage: u(PHOTO.selectiveFocus),
    gallery: [u(PHOTO.hardtailTrees), u(PHOTO.forestRider)],
    notes:
      "Light e-MTB. Pedalea como una bici anal\u00F3gica con viento a favor \u2014 nuestra m\u00E1s pedida para los rides intermedios de La Primavera.",
  },
  {
    slug: "specialized-levo",
    brand: "Specialized",
    model: "Turbo Levo Comp Alloy",
    category: "E-MTB",
    travelMm: 160,
    wheelSize: "MX",
    drivetrain: "Shimano Deore XT 12-speed",
    brakes: "SRAM Code R, 200/200 mm",
    suspension: "RockShox Lyrik Select \u00B7 RockShox Super Deluxe Select",
    tires: "Specialized Butcher / Eliminator T7",
    sizesAvail: ["S2", "S3", "S4", "S5"],
    riderHeightCm: "158\u2013198",
    dailyRateUsd: 1100,
    heroImage: u(PHOTO.orangeJacketRider),
    gallery: [u(PHOTO.brownField), u(PHOTO.actionTrees)],
    notes:
      "Full-power e-MTB. Bater\u00EDa para todo el d\u00EDa, ideal para riders nuevos al mountain bike que quieren disfrutar las bajadas sin pelearse con la subida.",
  },
  {
    slug: "trek-rail",
    brand: "Trek",
    model: "Rail 9.7 Gen 4",
    category: "E-MTB",
    travelMm: 160,
    wheelSize: "29",
    drivetrain: "Shimano XT 12-speed",
    brakes: "Shimano Deore XT 4-piston, 203/203 mm",
    suspension: "RockShox Lyrik Select+ \u00B7 RockShox Super Deluxe Select+",
    tires: "Bontrager XR5 Team Issue",
    sizesAvail: ["S", "M", "L", "XL"],
    riderHeightCm: "157\u2013198",
    dailyRateUsd: 1100,
    heroImage: u(PHOTO.redBikeOnHill),
    gallery: [u(PHOTO.actionTrees), u(PHOTO.hardtailTrees)],
    notes:
      "Bosch Performance Line CX, 750 Wh. Estable y con torque en sobra para la temporada de polvo en La Primavera.",
  },
  {
    slug: "giant-trance-x-e",
    brand: "Giant",
    model: "Trance X E+ 1 Pro",
    category: "E-MTB",
    travelMm: 150,
    wheelSize: "29",
    drivetrain: "Shimano XT 12-speed",
    brakes: "Shimano XT 4-piston, 203/180 mm",
    suspension: "Fox 36 Performance Elite \u00B7 Fox Float X Performance",
    tires: "Maxxis Assegai / Dissector EXO+",
    sizesAvail: ["S", "M", "L", "XL"],
    riderHeightCm: "160\u2013196",
    dailyRateUsd: 1050,
    heroImage: u(PHOTO.orangeBlackBike),
    gallery: [u(PHOTO.forestRider), u(PHOTO.actionTrees)],
    notes:
      "Yamaha PW-X3, 800 Wh. La opci\u00F3n m\u00E1s vers\u00E1til de la flota \u2014 c\u00F3moda en brunch rides y capaz en l\u00EDneas intermedias.",
  },
  {
    slug: "specialized-stumpjumper",
    brand: "Specialized",
    model: "Stumpjumper Comp Alloy",
    category: "TRAIL",
    travelMm: 150,
    wheelSize: "29",
    drivetrain: "SRAM GX Eagle 12-speed",
    brakes: "SRAM Code R, 200/180 mm",
    suspension: "Fox 36 Rhythm \u00B7 Fox Float DPS Performance",
    tires: "Specialized Butcher / Eliminator GRID Trail",
    sizesAvail: ["S2", "S3", "S4", "S5"],
    riderHeightCm: "158\u2013198",
    dailyRateUsd: 700,
    heroImage: u(PHOTO.blackHardtail),
    gallery: [u(PHOTO.hardtailTrees)],
    notes:
      "MTB anal\u00F3gica para la pareja h\u00EDbrida \u2014 cuando una persona del grupo quiere bici muscular y la otra e-bike, esta marca el ritmo.",
  },
  {
    slug: "trek-fuel-ex",
    brand: "Trek",
    model: "Fuel EX 8 Gen 6",
    category: "TRAIL",
    travelMm: 140,
    wheelSize: "29",
    drivetrain: "Shimano Deore XT 12-speed",
    brakes: "Shimano Deore XT 4-piston, 203/180 mm",
    suspension: "Fox 34 Rhythm \u00B7 Fox Float Performance",
    tires: "Bontrager XR4 Team Issue",
    sizesAvail: ["S", "M", "L", "XL"],
    riderHeightCm: "157\u2013196",
    dailyRateUsd: 700,
    heroImage: u(PHOTO.orangeBlackBike),
    gallery: [u(PHOTO.actionTrees)],
    notes:
      "MTB anal\u00F3gica versatil \u2014 ligera, eficiente subiendo, juguetona en bajadas de La Primavera.",
  },
];
