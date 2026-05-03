"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import {
  isAdminRequest,
  setAdminCookie,
  clearAdminCookie,
} from "@/lib/admin";

export async function loginAdmin(formData: FormData) {
  const token = String(formData.get("token") ?? "");
  const expected = process.env.ADMIN_TOKEN;
  if (!expected || token !== expected) {
    redirect("/admin?error=invalid");
  }
  await setAdminCookie(token);
  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminCookie();
  redirect("/admin");
}

async function ensureAdmin() {
  const ok = await isAdminRequest();
  if (!ok) throw new Error("Unauthorized");
}

export async function updateBookingStatus(
  id: string,
  status: "CONFIRMED" | "DECLINED" | "PENDING",
) {
  await ensureAdmin();
  await prisma.bookingRequest.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/admin");
}

export async function createDeparture(formData: FormData) {
  await ensureAdmin();
  const tourId = String(formData.get("tourId") ?? "");
  const startDate = new Date(String(formData.get("startDate") ?? ""));
  const endDate = new Date(String(formData.get("endDate") ?? ""));
  const capacity = Number(formData.get("capacity") ?? 8);
  if (!tourId || isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return;
  await prisma.tourDeparture.create({
    data: { tourId, startDate, endDate, capacity, status: "OPEN" },
  });
  revalidatePath("/admin");
  revalidatePath("/calendar");
}

export async function updateDepartureStatus(
  id: string,
  status: "OPEN" | "HOLD" | "SOLD_OUT",
) {
  await ensureAdmin();
  await prisma.tourDeparture.update({ where: { id }, data: { status } });
  revalidatePath("/admin");
  revalidatePath("/calendar");
}

export async function deleteDeparture(id: string) {
  await ensureAdmin();
  await prisma.tourDeparture.delete({ where: { id } });
  revalidatePath("/admin");
  revalidatePath("/calendar");
}

export async function createBlockedDate(formData: FormData) {
  await ensureAdmin();
  const date = new Date(String(formData.get("date") ?? ""));
  const tourId = String(formData.get("tourId") ?? "") || null;
  const reason = String(formData.get("reason") ?? "") || null;
  if (isNaN(date.getTime())) return;
  await prisma.blockedDate.create({ data: { date, tourId, reason } });
  revalidatePath("/admin");
  revalidatePath("/calendar");
}

export async function deleteBlockedDate(id: string) {
  await ensureAdmin();
  await prisma.blockedDate.delete({ where: { id } });
  revalidatePath("/admin");
  revalidatePath("/calendar");
}
