const url = process.env.DATABASE_URL?.trim();
if (!url) {
  console.error(
    "DATABASE_URL is not set. Add the Vercel Neon Postgres integration (or set DATABASE_URL under Project → Settings → Environment Variables) for Production and Preview so it is available at build time.",
  );
  process.exit(1);
}
if (!/^postgres(ql)?:\/\//i.test(url)) {
  console.error(
    'DATABASE_URL must be a PostgreSQL connection string (postgresql:// or postgres://). For local dev, copy .env.example and use Neon or a local Postgres URL — not file:./ SQLite.',
  );
  process.exit(1);
}
