"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const KEY = "ij-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      // localStorage unavailable
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(KEY, "accepted");
    } catch {
      // localStorage unavailable
    }
    setVisible(false);
  };

  const decline = () => {
    try {
      localStorage.setItem(KEY, "declined");
    } catch {
      // localStorage unavailable
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Gestion des cookies"
      className="fixed bottom-0 left-0 right-0 z-[100] border-t border-noir/10 bg-ivory px-6 py-5 shadow-2xl sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-sm sm:rounded-2xl sm:border"
    >
      <p className="text-sm leading-relaxed text-noir/80">
        Nous utilisons des cookies pour analyser le trafic et améliorer votre expérience.{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-gold">
          En savoir plus
        </Link>
        .
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={accept}
          className="flex-1 rounded-full bg-noir py-2.5 text-[11px] font-medium uppercase tracking-[0.15em] text-ivory transition hover:opacity-80"
        >
          Accepter
        </button>
        <button
          type="button"
          onClick={decline}
          className="flex-1 rounded-full border border-noir/20 py-2.5 text-[11px] font-medium uppercase tracking-[0.15em] text-noir transition hover:bg-noir/5"
        >
          Refuser
        </button>
      </div>
    </div>
  );
}
