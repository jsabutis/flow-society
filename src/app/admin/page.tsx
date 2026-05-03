import Link from "next/link";
import { isAdminRequest } from "@/lib/admin";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  loginAdmin,
  logoutAdmin,
  updateBookingStatus,
  createDeparture,
  updateDepartureStatus,
  deleteDeparture,
  createBlockedDate,
  deleteBlockedDate,
} from "./actions";
import { formatDateRange, parseJson } from "@/lib/utils";
import type { Rider } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; token?: string }>;
}) {
  const sp = await searchParams;
  const ok = await isAdminRequest(sp.token);
  if (!ok) return <LoginScreen error={sp.error} />;

  const [bookings, tours, departures, blocks] = await Promise.all([
    prisma.bookingRequest.findMany({
      orderBy: { createdAt: "desc" },
      include: { tour: true, departure: true },
      take: 50,
    }),
    prisma.tour.findMany({ orderBy: { name: "asc" } }),
    prisma.tourDeparture.findMany({
      orderBy: { startDate: "asc" },
      include: { tour: true, _count: { select: { bookings: true } } },
      take: 100,
    }),
    prisma.blockedDate.findMany({
      orderBy: { date: "asc" },
      include: { tour: true },
    }),
  ]);

  return (
    <div className="pb-24">
      <header className="bg-[var(--color-pine)] text-[var(--color-sand-soft)]">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-8 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-sand-soft)]/70">
              Operator dashboard
            </p>
            <h1 className="font-serif text-3xl mt-1">Flow Society Admin</h1>
          </div>
          <form action={logoutAdmin}>
            <Button variant="outline" className="bg-transparent text-white border-white/30 hover:bg-white/10">
              Sign out
            </Button>
          </form>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 lg:px-8 mt-12 grid gap-12">
        {/* Bookings */}
        <section>
          <h2 className="font-serif text-2xl mb-4">Booking requests</h2>
          <div className="rounded-xl border border-[var(--color-pine)]/10 bg-white overflow-hidden">
            {bookings.length === 0 && (
              <p className="p-6 text-sm text-[var(--color-ink-muted)]">
                No bookings yet.
              </p>
            )}
            {bookings.map((b) => {
              const riders = parseJson<Rider[]>(b.riders, []);
              return (
                <details
                  key={b.id}
                  className="border-b border-[var(--color-pine)]/10 last:border-0 group"
                >
                  <summary className="cursor-pointer px-5 py-4 grid grid-cols-12 gap-3 items-center text-sm hover:bg-[var(--color-sand)]">
                    <div className="col-span-3">
                      <p className="font-medium">{b.leadName}</p>
                      <p className="text-xs text-[var(--color-ink-muted)]">
                        {b.email}
                      </p>
                    </div>
                    <div className="col-span-3">
                      <p className="font-medium">{b.tour.name}</p>
                      <p className="text-xs text-[var(--color-ink-muted)]">
                        {formatDateRange(b.departure.startDate, b.departure.endDate)}
                      </p>
                    </div>
                    <div className="col-span-1 text-center">
                      {b.partySize}
                    </div>
                    <div className="col-span-2">
                      <StatusBadge status={b.status} />
                    </div>
                    <div className="col-span-3 text-right text-xs text-[var(--color-ink-muted)]">
                      {b.createdAt.toLocaleDateString()}{" "}
                      <span className="ml-1 group-open:hidden">▾</span>
                      <span className="hidden group-open:inline">▴</span>
                    </div>
                  </summary>
                  <div className="px-5 pb-5 pt-1 grid md:grid-cols-3 gap-6 text-sm bg-[var(--color-sand-soft)]">
                    <div>
                      <p className="text-xs uppercase text-[var(--color-ink-muted)]">
                        Contact
                      </p>
                      <p>{b.phone} {b.whatsapp ? "· WhatsApp" : ""}</p>
                      <p className="mt-2">Pickup: {b.pickup}</p>
                      {b.dietary && <p className="mt-1">Dietary: {b.dietary}</p>}
                      <p className="mt-1">
                        Emergency: {b.emergencyName} · {b.emergencyPhone}
                      </p>
                      {b.notes && <p className="mt-2 italic">{b.notes}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-xs uppercase text-[var(--color-ink-muted)]">
                        Riders
                      </p>
                      <ul className="mt-1 space-y-2">
                        {riders.map((r, i) => (
                          <li key={i} className="border-l-2 border-[var(--color-terracotta)]/40 pl-3">
                            <p className="font-medium">
                              {r.name} · {r.heightCm}cm · {r.weightKg}kg ·{" "}
                              {r.experience.toLowerCase()}
                            </p>
                            <p>
                              Bike: {r.bikeSlug === "byo" ? "Bringing own" : `${r.bikeSlug} (${r.frameSize})`}
                            </p>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex gap-2">
                        <form
                          action={async () => {
                            "use server";
                            await updateBookingStatus(b.id, "CONFIRMED");
                          }}
                        >
                          <Button size="sm">Confirm</Button>
                        </form>
                        <form
                          action={async () => {
                            "use server";
                            await updateBookingStatus(b.id, "DECLINED");
                          }}
                        >
                          <Button size="sm" variant="outline">
                            Decline
                          </Button>
                        </form>
                        <form
                          action={async () => {
                            "use server";
                            await updateBookingStatus(b.id, "PENDING");
                          }}
                        >
                          <Button size="sm" variant="ghost">
                            Reset
                          </Button>
                        </form>
                      </div>
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        </section>

        {/* Departures */}
        <section>
          <h2 className="font-serif text-2xl mb-4">Departures</h2>
          <div className="rounded-xl border border-[var(--color-pine)]/10 bg-white p-5 mb-4">
            <p className="text-xs uppercase tracking-wide text-[var(--color-ink-muted)] mb-3">
              Add departure
            </p>
            <form
              action={createDeparture}
              className="grid sm:grid-cols-5 gap-3 items-end"
            >
              <div className="sm:col-span-2">
                <Label htmlFor="dep-tour" className="block mb-1.5">Tour</Label>
                <select
                  id="dep-tour"
                  name="tourId"
                  className="h-11 w-full rounded-md border border-[var(--color-pine)]/15 bg-white px-3 text-sm"
                  required
                >
                  {tours.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="dep-start" className="block mb-1.5">Start</Label>
                <Input id="dep-start" type="date" name="startDate" required />
              </div>
              <div>
                <Label htmlFor="dep-end" className="block mb-1.5">End</Label>
                <Input id="dep-end" type="date" name="endDate" required />
              </div>
              <div>
                <Label htmlFor="dep-capacity" className="block mb-1.5">Capacity</Label>
                <Input id="dep-capacity" type="number" name="capacity" defaultValue={8} min={1} max={20} />
              </div>
              <div className="sm:col-span-5">
                <Button type="submit">Add departure</Button>
              </div>
            </form>
          </div>
          <div className="rounded-xl border border-[var(--color-pine)]/10 bg-white overflow-hidden">
            {departures.map((d) => (
              <div
                key={d.id}
                className="grid grid-cols-12 gap-3 items-center px-5 py-3 border-b border-[var(--color-pine)]/10 last:border-0 text-sm"
              >
                <div className="col-span-3">
                  {formatDateRange(d.startDate, d.endDate)}
                </div>
                <div className="col-span-3">{d.tour.name}</div>
                <div className="col-span-2">
                  {d._count.bookings}/{d.capacity}
                </div>
                <div className="col-span-2">
                  <StatusBadge status={d.status} />
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                  <form
                    action={async () => {
                      "use server";
                      await updateDepartureStatus(
                        d.id,
                        d.status === "SOLD_OUT" ? "OPEN" : "SOLD_OUT",
                      );
                    }}
                  >
                    <Button size="sm" variant="outline" type="submit">
                      {d.status === "SOLD_OUT" ? "Open" : "Sell out"}
                    </Button>
                  </form>
                  <form
                    action={async () => {
                      "use server";
                      await deleteDeparture(d.id);
                    }}
                  >
                    <Button size="sm" variant="ghost" type="submit">
                      Delete
                    </Button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Blocked dates */}
        <section>
          <h2 className="font-serif text-2xl mb-4">Blocked dates</h2>
          <div className="rounded-xl border border-[var(--color-pine)]/10 bg-white p-5 mb-4">
            <p className="text-xs uppercase tracking-wide text-[var(--color-ink-muted)] mb-3">
              Add a blocked date
            </p>
            <form
              action={createBlockedDate}
              className="grid sm:grid-cols-4 gap-3 items-end"
            >
              <div>
                <Label htmlFor="block-date" className="block mb-1.5">Date</Label>
                <Input id="block-date" type="date" name="date" required />
              </div>
              <div>
                <Label htmlFor="block-tour" className="block mb-1.5">Tour (optional)</Label>
                <select
                  id="block-tour"
                  name="tourId"
                  className="h-11 w-full rounded-md border border-[var(--color-pine)]/15 bg-white px-3 text-sm"
                >
                  <option value="">All tours (global)</option>
                  {tours.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="block-reason" className="block mb-1.5">Reason</Label>
                <Input id="block-reason" name="reason" placeholder="Holiday, weather, etc." />
              </div>
              <div>
                <Button type="submit">Block date</Button>
              </div>
            </form>
          </div>
          <div className="rounded-xl border border-[var(--color-pine)]/10 bg-white overflow-hidden">
            {blocks.length === 0 && (
              <p className="p-5 text-sm text-[var(--color-ink-muted)]">
                No blocked dates.
              </p>
            )}
            {blocks.map((b) => (
              <div
                key={b.id}
                className="grid grid-cols-12 gap-3 items-center px-5 py-3 border-b border-[var(--color-pine)]/10 last:border-0 text-sm"
              >
                <div className="col-span-3">{b.date.toLocaleDateString()}</div>
                <div className="col-span-4">{b.tour?.name ?? "Global"}</div>
                <div className="col-span-3 text-[var(--color-ink-muted)]">
                  {b.reason ?? ""}
                </div>
                <div className="col-span-2 flex justify-end">
                  <form
                    action={async () => {
                      "use server";
                      await deleteBlockedDate(b.id);
                    }}
                  >
                    <Button size="sm" variant="ghost" type="submit">
                      Remove
                    </Button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </section>

        <p className="text-xs text-[var(--color-ink-muted)]">
          Need a real auth system?{" "}
          <Link href="https://authjs.dev" className="underline">
            Auth.js
          </Link>{" "}
          drops in cleanly when the time comes.
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "PENDING":
      return <Badge variant="terracotta">Pending</Badge>;
    case "CONFIRMED":
      return <Badge variant="agave">Confirmed</Badge>;
    case "DECLINED":
      return <Badge variant="soldout">Declined</Badge>;
    case "OPEN":
      return <Badge variant="agave">Open</Badge>;
    case "SOLD_OUT":
      return <Badge variant="soldout">Sold out</Badge>;
    case "HOLD":
      return <Badge variant="terracotta">Hold</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

function LoginScreen({ error }: { error?: string }) {
  return (
    <div className="min-h-[80vh] grid place-items-center px-5">
      <form
        action={loginAdmin}
        className="w-full max-w-sm rounded-2xl bg-white border border-[var(--color-pine)]/10 p-8"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
          Operator
        </p>
        <h1 className="font-serif text-3xl mt-2">Sign in</h1>
        <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
          Enter the operator token. (Set <code>ADMIN_TOKEN</code> in your env.)
        </p>
        <div className="mt-6 space-y-2">
          <Label htmlFor="admin-token">Token</Label>
          <Input
            id="admin-token"
            name="token"
            type="password"
            autoFocus
            aria-invalid={error === "invalid" ? true : undefined}
            aria-describedby={error === "invalid" ? "admin-token-error" : undefined}
          />
        </div>
        {error === "invalid" && (
          <p
            id="admin-token-error"
            role="alert"
            className="mt-3 text-sm text-[var(--color-terracotta-deep)]"
          >
            Invalid token.
          </p>
        )}
        <div className="mt-6">
          <Button className="w-full" type="submit">
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
}
