"use client";

import { useEffect, useRef, useState } from "react";
import { openWhatsApp, waMessages } from "@/lib/whatsapp";
import { WhatsAppGlyph } from "./icons";
import { useScrollVelocity } from "@/hooks/useGSAP";

export function WhatsAppFloat() {
  const velocity = useScrollVelocity();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [autoLabel, setAutoLabel] = useState(false);

  // Show label automatically 3s after scroll stops
  useEffect(() => {
    if (velocity > 0.5) {
      setAutoLabel(false);
      if (timerRef.current) clearTimeout(timerRef.current);
    } else {
      timerRef.current = setTimeout(() => setAutoLabel(true), 3000);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [velocity]);

  return (
    <button
      type="button"
      onClick={() => openWhatsApp({ message: waMessages.general(), source: "sticky" })}
      aria-label="Commander sur WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3"
    >
      {/* Label text — shows on hover OR after scroll stop */}
      <span
        className={`rounded-full bg-noir px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-ivory shadow-floating transition-all duration-500 ${
          autoLabel ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
        } group-hover:opacity-100 group-hover:translate-x-0 hidden sm:block`}
      >
        Commander sur WhatsApp
      </span>

      {/* Button with double pulse ring */}
      <span className="relative grid h-14 w-14 place-items-center">
        {/* Outer ping ring */}
        <span className="absolute inset-0 rounded-full gold-surface opacity-60 animate-[ping-gold_2.4s_ease-out_infinite]" />
        {/* Inner pulse ring */}
        <span className="absolute inset-0 rounded-full gold-surface opacity-40 animate-[ping-gold_2.4s_ease-out_0.8s_infinite]" />
        {/* Button */}
        <span className="relative grid h-14 w-14 place-items-center rounded-full gold-surface text-noir shadow-gold animate-pulse-gold transition-transform duration-500 group-hover:scale-110">
          <WhatsAppGlyph size={26} />
        </span>
      </span>
    </button>
  );
}
