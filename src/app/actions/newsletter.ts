"use server";

import { z } from "zod";
import { sendEmail } from "@/lib/email";

const schema = z.string().email();

export async function subscribeNewsletter(
  _prev: { ok?: boolean; error?: string } | undefined,
  formData: FormData,
): Promise<{ ok?: boolean; error?: string }> {
  const email = formData.get("email");
  if (typeof email !== "string" || !schema.safeParse(email).success) {
    return { error: "Please enter a valid email." };
  }
  const admin = process.env.ADMIN_NOTIFY_EMAIL;
  if (admin) {
    await sendEmail({
      to: admin,
      subject: `[Flow Society] Newsletter signup: ${email}`,
      html: `<p>New newsletter subscriber: <strong>${escapeHtml(email)}</strong></p><p>Source: homepage</p>`,
    });
  } else {
    console.log("[newsletter] signup (no ADMIN_NOTIFY_EMAIL):", email);
  }
  return { ok: true };
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : c === '"' ? "&quot;" : "&#39;",
  );
}
