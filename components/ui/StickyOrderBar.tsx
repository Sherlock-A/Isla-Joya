"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { openWhatsApp, waMessages } from "@/lib/whatsapp";
import { WhatsAppGlyph } from "./icons";
import { formatPrice } from "@/lib/utils";

interface StickyOrderBarProps {
  productName: string;
  material: string;
  price: number;
}

export function StickyOrderBar({ productName, material, price }: StickyOrderBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-[80] border-t border-gold/20 bg-ivory/95 px-5 py-3 backdrop-blur-md shadow-floating"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate font-display text-base text-noir">{productName}</p>
              <p className="text-xs text-noir/50">{material}</p>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <span className="font-sans text-lg text-gold">{formatPrice(price)}</span>
              <button
                type="button"
                onClick={() =>
                  openWhatsApp({
                    message: waMessages.product(productName, material),
                    source: "sticky_bar",
                    productName,
                  })
                }
                className="shine inline-flex items-center gap-2 rounded-full bg-noir px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-ivory transition hover:shadow-gold"
              >
                <WhatsAppGlyph size={14} />
                Commander
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
