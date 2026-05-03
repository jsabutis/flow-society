import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getT } from "@/lib/i18n/server";

export default async function NotFound() {
  const { t } = await getT();
  return (
    <div className="min-h-[70vh] grid place-items-center px-5">
      <div className="text-center max-w-md">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
          {t.notFound.code}
        </p>
        <h1 className="font-serif text-5xl mt-3">{t.notFound.title}</h1>
        <p className="mt-4 text-[var(--color-ink-soft)]">
          {t.notFound.body}
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild>
            <Link href="/">{t.notFound.backHome}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/tours">{t.notFound.browseTours}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
