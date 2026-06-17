"use client";

import { openWhatsApp, waMessages } from "@/lib/whatsapp";
import { WhatsAppGlyph } from "./icons";

export function WhatsAppFloat() {
  return (
    <button
      type="button"
      onClick={() => openWhatsApp({ message: waMessages.general(), source: "sticky" })}
      aria-label="Order on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3"
    >
      <span className="hidden rounded-full bg-noir px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-ivory opacity-0 shadow-floating transition duration-500 group-hover:opacity-100 sm:block">
        Order on WhatsApp
      </span>
      <span className="grid h-14 w-14 place-items-center rounded-full gold-surface text-noir shadow-gold animate-pulse-gold transition duration-500 group-hover:scale-105">
        <WhatsAppGlyph size={26} />
      </span>
    </button>
  );
}
