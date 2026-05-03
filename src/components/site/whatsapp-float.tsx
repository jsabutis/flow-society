"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { useT } from "./language-provider";

/** Flow Society WhatsApp Business number (E.164 — no plus sign for wa.me). */
const WA_E164 = "523329338357";

export function WhatsAppFloat() {
  const t = useT();
  const href = `https://wa.me/${WA_E164}?text=${encodeURIComponent(t.whatsapp.prefill)}`;
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 z-50 lg:bottom-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 transition-transform lg:right-6"
      aria-label={t.whatsapp.aria}
    >
      <MessageCircle className="h-7 w-7" />
    </Link>
  );
}
