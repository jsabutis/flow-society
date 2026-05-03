import { Resend } from "resend";

type SendArgs = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail({ to, subject, html }: SendArgs) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? "bookings@example.com";

  if (!apiKey) {
    console.log("\n[email:dev]", { to, from, subject });
    console.log(html);
    console.log("[email:dev:end]\n");
    return { ok: true, dev: true } as const;
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({ from, to, subject, html });
  if (error) {
    console.error("[email] resend error", error);
    return { ok: false, error } as const;
  }
  return { ok: true, dev: false } as const;
}

export function bookingConfirmationHtml(args: {
  leadName: string;
  tourName: string;
  startDate: string;
  endDate: string;
  partySize: number;
}) {
  return `
    <div style="font-family:ui-sans-serif,system-ui;line-height:1.6;color:#1a1a1a">
      <h2 style="margin:0 0 12px">Gracias, ${escape(args.leadName)}!</h2>
      <p>We received your booking request for <strong>${escape(args.tourName)}</strong>.</p>
      <p style="margin:0 0 8px"><strong>Dates:</strong> ${escape(args.startDate)} \u2013 ${escape(args.endDate)}</p>
      <p style="margin:0 0 8px"><strong>Riders:</strong> ${args.partySize}</p>
      <p>We&rsquo;ll confirm by WhatsApp (or email) within a couple of hours. No charge until you approve.</p>
      <p style="margin-top:24px;color:#666;font-size:13px">Flow Society MX \u00b7 Bosque La Primavera, Jalisco</p>
    </div>
  `;
}

export function adminNotifyHtml(args: {
  leadName: string;
  email: string;
  phone: string;
  tourName: string;
  startDate: string;
  endDate: string;
  partySize: number;
  bookingId: string;
}) {
  return `
    <div style="font-family:ui-sans-serif,system-ui;line-height:1.6;color:#1a1a1a">
      <h2 style="margin:0 0 12px">New booking request</h2>
      <p><strong>${escape(args.leadName)}</strong> (${escape(args.email)}, ${escape(args.phone)})</p>
      <p><strong>${escape(args.tourName)}</strong> \u00b7 ${escape(args.startDate)} \u2013 ${escape(args.endDate)} \u00b7 ${args.partySize} rider(s)</p>
      <p>Booking ID: <code>${escape(args.bookingId)}</code></p>
    </div>
  `;
}

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : c === '"' ? "&quot;" : "&#39;",
  );
}
