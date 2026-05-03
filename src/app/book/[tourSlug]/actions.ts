"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { bookingFormSchema, type BookingFormValues } from "@/lib/booking-schema";
import { getTourAvailability } from "@/lib/availability";
import {
  sendEmail,
  bookingConfirmationHtml,
  adminNotifyHtml,
} from "@/lib/email";

export type SubmitResult =
  | { ok: true; bookingId: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export async function submitBooking(
  values: BookingFormValues,
): Promise<SubmitResult> {
  const parsed = bookingFormSchema.safeParse(values);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }
  const data = parsed.data;

  const tour = await prisma.tour.findUnique({ where: { slug: data.tourSlug } });
  if (!tour) return { ok: false, error: "Tour not found." };

  // Re-validate the departure availability at submission time.
  const availability = await getTourAvailability(data.tourSlug);
  const dep = availability.find((d) => d.id === data.departureId);
  if (!dep) return { ok: false, error: "Departure no longer available." };
  if (dep.status === "SOLD_OUT" || dep.status === "BLOCKED") {
    return {
      ok: false,
      error: "That departure just sold out. Please pick a different date.",
    };
  }
  if (dep.bookedSeats + data.partySize > dep.capacity) {
    const remaining = dep.capacity - dep.bookedSeats;
    return {
      ok: false,
      error: `Only ${remaining} seats remain on that departure. Please reduce your party or pick another date.`,
    };
  }

  const created = await prisma.bookingRequest.create({
    data: {
      tourId: tour.id,
      departureId: data.departureId,
      leadName: data.leadName,
      email: data.email,
      phone: data.phone,
      whatsapp: data.whatsapp,
      partySize: data.partySize,
      riders: JSON.stringify(data.riders),
      pickup: data.pickup,
      dietary: data.dietary ?? null,
      spanishHelp: data.spanishHelp,
      emergencyName: data.emergencyName,
      emergencyPhone: data.emergencyPhone,
      hearAbout: data.hearAbout ?? null,
      notes: data.notes ?? null,
    },
  });

  const startStr = new Date(dep.startDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const endStr = new Date(dep.endDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  await sendEmail({
    to: data.email,
    subject: `Your booking request \u00b7 ${tour.name}`,
    html: bookingConfirmationHtml({
      leadName: data.leadName,
      tourName: tour.name,
      startDate: startStr,
      endDate: endStr,
      partySize: data.partySize,
    }),
  });

  const adminTo = process.env.ADMIN_NOTIFY_EMAIL;
  if (adminTo) {
    await sendEmail({
      to: adminTo,
      subject: `[Flow Society] New booking \u00b7 ${data.leadName} \u00b7 ${tour.name}`,
      html: adminNotifyHtml({
        leadName: data.leadName,
        email: data.email,
        phone: data.phone,
        tourName: tour.name,
        startDate: startStr,
        endDate: endStr,
        partySize: data.partySize,
        bookingId: created.id,
      }),
    });
  }

  revalidatePath(`/tours/${data.tourSlug}`);
  revalidatePath(`/calendar`);
  revalidatePath(`/`);

  return { ok: true, bookingId: created.id };
}
