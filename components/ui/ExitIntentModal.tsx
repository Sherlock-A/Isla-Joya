"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { openWhatsApp, waMessages } from "@/lib/whatsapp";
import { WhatsAppGlyph } from "./icons";

const SESSION_KEY = "ij_exit_shown";

export function ExitIntentModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    // Only on desktop where mouseleave is reliable
    if (window.matchMedia("(hover: none)").matches) return;

    let armed = false;
    const arm = setTimeout(() => { armed = true; }, 5000);

    const onLeave = (e: MouseEvent) => {
      if (!armed || e.clientY > 10) return;
      setVisible(true);
      sessionStorage.setItem(SESSION_KEY, "1");
      document.removeEventListener("mouseleave", onLeave);
    };

    document.addEventListener("mouseleave", onLeave);
    return () => {
      clearTimeout(arm);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const close = () => setVisible(false);

  const order = () => {
    openWhatsApp({ message: waMessages.general(), source: "exit_intent" });
    close();
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[90] bg-noir/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-x-4 top-1/2 z-[91] mx-auto max-w-md -translate-y-1/2 overflow-hidden rounded-3xl bg-ivory shadow-floating sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2"
            initial={{ scale: 0.88, opacity: 0, y: "-50%" }}
            animate={{ scale: 1, opacity: 1, y: "-50%" }}
            exit={{ scale: 0.88, opacity: 0, y: "-50%" }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            {/* Gold band top */}
            <div className="h-1.5 w-full gold-surface" />

            <div className="relative p-8 pt-7">
              <button
                type="button"
                onClick={close}
                aria-label="Fermer"
                className="absolute right-5 top-5 rounded-full p-1 text-noir/50 transition hover:text-noir"
              >
                <X className="h-5 w-5" />
              </button>

              <p className="eyebrow">Avant de partir…</p>
              <h2 className="mt-3 font-display text-3xl text-noir leading-tight">
                Votre pièce idéale <span className="gold-text">vous attend.</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-noir/65">
                Chaque bijou Isla Joya est disponible en quelques messages WhatsApp.
                Pas de compte, pas de formulaire — juste la beauté, livrée chez vous.
              </p>

              <div className="mt-7 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={order}
                  className="shine inline-flex w-full items-center justify-center gap-2 rounded-full gold-surface py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-noir transition hover:shadow-gold"
                >
                  <WhatsAppGlyph size={16} />
                  Découvrir sur WhatsApp
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="text-[11px] uppercase tracking-[0.18em] text-noir/45 transition hover:text-noir"
                >
                  Continuer à naviguer
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
