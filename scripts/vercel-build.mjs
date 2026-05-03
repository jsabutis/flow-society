import { spawnSync } from "node:child_process";
import { assertDatabaseUrlOrExit } from "./assert-database-url.mjs";

const dbUrl = process.env.DATABASE_URL?.trim();
const onVercelPreview = process.env.VERCEL_ENV === "preview";
const forcePreviewBypass = process.env.PREVIEW_WITHOUT_DATABASE === "1";

/** Build without a real DB: Vercel Preview with no URL, or explicit opt-in. */
const previewBuildWithoutDatabase =
  forcePreviewBypass || (onVercelPreview && !dbUrl);

const PLACEHOLDER_DB =
  "postgresql://preview:preview@127.0.0.1:5432/preview?connect_timeout=1";

function run(cmd, args, extraEnv) {
  const r = spawnSync(cmd, args, {
    stdio: "inherit",
    shell: false,
    env: { ...process.env, ...extraEnv },
  });
  if (r.status !== 0) {
    process.exit(r.status ?? 1);
  }
}

if (previewBuildWithoutDatabase) {
  console.warn(
    "\n[vercel-build] No DATABASE_URL for this preview build — using static seed data (no DB). Add Neon + DATABASE_URL for real bookings, admin, and calendar data.\n",
  );
  const env = {
    ...process.env,
    DATABASE_URL: PLACEHOLDER_DB,
    STATIC_PREVIEW_MODE: "1",
  };
  run("npx", ["prisma", "generate"], env);
  run("npx", ["next", "build"], env);
} else {
  assertDatabaseUrlOrExit();
  const env = { ...process.env };
  run("npx", ["prisma", "generate"], env);
  run("npx", ["prisma", "migrate", "deploy"], env);
  run("npx", ["next", "build"], env);
}
