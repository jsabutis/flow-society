# Flow Society MX

E-bike experiences and trail culture in Bosque La Primavera, Jalisco — a marketing + booking site built with Next.js 15, Prisma, and Tailwind. Brunch + Ride + Comunidad: small-group, level-adapted rides with an after-ride lounge, membership program, and two-day camping experience.

## What's in here

- **5 experiences** seeded as Flow Society's offering: La Primavera E-Bike Brunch (Beginner / Intermediate), Brunch & Lounge Pareja Híbrida, Membresía (1 master class + 3 rides per month), and the E-Bike Camping Experience.
- **6 bikes** in the rental fleet (e-bike-focused: Specialized Turbo Levo SL, Levo Comp, Trek Rail, Giant Trance X E+, plus two analog MTBs for the hybrid couples format).
- **Per-departure availability calendar** that crosses out sold-out and held dates so customers can't pick them.
- **Six-step booking flow** (date → trip basics → riders → equipment → logistics → review) with ~12 captured fields including accessory rentals (helmets, gloves, pads, hydration, shoes, GoPro).
- **Operator dashboard** at `/admin` to confirm/decline bookings, manage departures, and block dates.
- **Email** via Resend with a console-log fallback for local dev (no account required).

## Tech stack (free-tier only)

- Next.js 15 (App Router) · React 19 · TypeScript
- Tailwind CSS v4 · shadcn-style UI components · Radix primitives
- Prisma 6 · PostgreSQL (Neon free tier on Vercel; local dev uses the same `DATABASE_URL` pattern)
- react-day-picker · react-hook-form · zod
- Resend (email; optional, falls back to console)
- Framer Motion · Lucide icons
- Hosted on **Vercel Hobby** (free)

Total cost at launch: **$0/mo**. No credit card required for any service.

## Running locally

```bash
npm install
# Copy .env.example → .env and set DATABASE_URL to a postgres:// connection string (Neon or local Postgres).
npx prisma migrate dev
npm run db:seed
npm run dev
```

Opens at http://localhost:3000 (or next free port).

The admin dashboard is at `/admin` — sign in with the `ADMIN_TOKEN` from your `.env`. Default in `.env.example`: `changeme-local-dev-token`.

## Environment variables

Copy `.env.example` to `.env`:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DB"  # Postgres (Neon or local); required for prisma + the app.
ADMIN_TOKEN="changeme-local-dev-token"          # Required to access /admin
RESEND_API_KEY=""                               # Optional. Without it, emails log to console.
RESEND_FROM="bookings@example.com"
ADMIN_NOTIFY_EMAIL="you@example.com"            # Where new booking notifications go.
```

## Useful scripts

```bash
npm run dev          # Next dev server (Turbopack)
npm run build        # Production build
npm run db:seed      # Re-seed tours / bikes / departures
npm run db:reset     # Drop + re-create the database via Prisma migrate reset (requires DATABASE_URL)
npx tsx scripts/smoke-booking.ts   # End-to-end booking pipeline test
```

## Deploying to Vercel

1. Push the repo to GitHub.
2. In Vercel, import the project. [`vercel.json`](vercel.json) sets the build command to `npm run vercel-build`.
3. Storage → add **Neon** Postgres (free). Ensure **`DATABASE_URL` exists for Production** (and for Preview if you want real data there). **Preview-only tip:** if `DATABASE_URL` is missing on **Preview** deployments, the build uses bundled seed data instead of the database so you can still review the UI—booking, admin, and calendar stay empty until you add Neon.
4. Set env vars in Vercel: `ADMIN_TOKEN`, `RESEND_API_KEY` (optional), `RESEND_FROM`, `ADMIN_NOTIFY_EMAIL`, `SITE_URL`.
5. Deploy. The `vercel-build` script runs `prisma generate && prisma migrate deploy && next build` after checking `DATABASE_URL`.
6. After first deploy, seed prod: `vercel env pull .env.production` then `DATABASE_URL=... npm run db:seed`.

### Vercel Hobby ToS note

Hobby is free but technically forbids commercial use. When you start taking real bookings, upgrade to Pro ($20/mo).

## Project layout

```
prisma/
  schema.prisma         Tour, TourDeparture, BlockedDate, Bike, BookingRequest
  seed.ts               Seeds 8 tours, 6 bikes, 6 months of departures
src/
  app/
    page.tsx            Home
    tours/              Tours listing + detail
    bikes/              Fleet listing + detail
    calendar/           Master departure calendar
    book/[tourSlug]/    Multi-step booking flow + confirmation
    admin/              Token-gated operator dashboard
    api/                (Server Actions handle most writes; no REST needed)
    sitemap.ts          /sitemap.xml
    robots.ts           /robots.txt
  components/
    ui/                 shadcn-style primitives (Button, Input, Calendar, etc.)
    site/               Header, footer, hero, tour card, bike card, etc.
    booking/            The multi-step booking flow
  lib/
    db.ts               Prisma client singleton
    availability.ts     Capacity + blocked-date computation
    booking-schema.ts   Zod schema for the booking form
    admin.ts            Admin token check + cookie helpers
    email.ts            Resend wrapper with console fallback
    utils.ts            cn(), formatUsd(), formatDateRange(), etc.
    types.ts            DepartureAvailability, Rider, ItineraryDay
    data/
      tours.ts          Seed data for 8 tours
      bikes.ts          Seed data for 6 bikes
scripts/
  smoke-booking.ts      End-to-end smoke test for the booking pipeline
```

## What's intentionally out of scope (for now)

- Real authentication for the admin (uses a single env-var token; swap in [Auth.js](https://authjs.dev) when needed)
- Payment processing (booking-request workflow only — operator confirms and invoices manually)
- Spanish/English i18n toggle (drop in `next-intl` when ready)
- Original photography (currently using Unsplash placeholders, attributed in `/credits`)
- Custom domain (defaults to free `*.vercel.app`)
