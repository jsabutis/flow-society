/**
 * Set only during `npm run vercel-build` when building without a real database
 * (Vercel Preview with no DATABASE_URL, or PREVIEW_WITHOUT_DATABASE=1).
 * Server components read seed data instead of Prisma so the site can render.
 */
export function isStaticPreviewMode(): boolean {
  return process.env.STATIC_PREVIEW_MODE === "1";
}
