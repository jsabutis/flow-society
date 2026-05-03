import { z } from "zod";

export const accessoriesSchema = z.object({
  helmet: z.boolean().default(false),
  helmetSize: z.enum(["S", "M", "L", "XL"]).optional(),
  gloves: z.boolean().default(false),
  knePads: z.boolean().default(false),
  elbowPads: z.boolean().default(false),
  hydrationPack: z.boolean().default(false),
  mtbShoes: z.boolean().default(false),
  shoeSize: z.string().optional(),
  goPro: z.boolean().default(false),
});

export const riderSchema = z.object({
  name: z.string().min(2, "Name is required"),
  heightCm: z.number().min(120).max(220),
  weightKg: z.number().min(35).max(180),
  experience: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"]),
  bikeSlug: z.string().min(1, "Pick a bike"),
  frameSize: z.string().min(1),
  accessories: accessoriesSchema,
});

export const bookingFormSchema = z
  .object({
    tourSlug: z.string().min(1),
    departureId: z.string().min(1, "Pick a date"),
    leadName: z.string().min(2, "Your name is required"),
    email: z.string().email("Valid email required"),
    phone: z.string().min(7, "Phone required"),
    whatsapp: z.boolean().default(false),
    partySize: z.number().int().min(1).max(8),
    riders: z.array(riderSchema).min(1),
    pickup: z.string().min(2, "Where should we collect you?"),
    dietary: z.string().optional(),
    spanishHelp: z.boolean().default(false),
    emergencyName: z.string().min(2, "Emergency contact name required"),
    emergencyPhone: z.string().min(7, "Emergency contact phone required"),
    hearAbout: z.string().optional(),
    notes: z.string().optional(),
  })
  .refine((d) => d.riders.length === d.partySize, {
    message: "Riders count must match party size",
    path: ["riders"],
  });

export type BookingFormValues = z.infer<typeof bookingFormSchema>;
