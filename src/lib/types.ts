export type ItineraryDay = {
  day: number;
  title: string;
  body: string;
  distanceKm?: number;
  ascentM?: number;
};

export type Rider = {
  name: string;
  heightCm: number;
  weightKg: number;
  experience: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
  bikeSlug: string; // "byo" for bring-your-own
  frameSize: string; // S, M, L, XL, or "recommend"
  accessories: {
    helmet: boolean;
    helmetSize?: "S" | "M" | "L" | "XL";
    gloves: boolean;
    knePads: boolean;
    elbowPads: boolean;
    hydrationPack: boolean;
    mtbShoes: boolean;
    shoeSize?: string;
    goPro: boolean;
  };
};

export type DepartureAvailability = {
  id: string;
  startDate: string; // ISO
  endDate: string; // ISO
  capacity: number;
  bookedSeats: number;
  status: "OPEN" | "FILLING" | "SOLD_OUT" | "BLOCKED";
};
