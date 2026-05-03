import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getT } from "@/lib/i18n/server";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = { href?: string; label: string };

export async function SiteBreadcrumbs({
  items,
  className,
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  const { t } = await getT();
  return (
    <nav aria-label={t.ux.breadcrumbAria} className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-1">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-1">
            {i > 0 && (
              <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-45" aria-hidden />
            )}
            {item.href ? (
              <Link href={item.href} className="hover:underline underline-offset-4">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium opacity-95" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
