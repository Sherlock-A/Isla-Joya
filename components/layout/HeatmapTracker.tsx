"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getSessionId } from "@/lib/session";

const RATE_LIMIT = 60; // max clicks per minute
const CONSENT_KEY = "ij-cookie-consent";

function getConsent(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(CONSENT_KEY) === "accepted";
}

export function HeatmapTracker() {
  const pathname = usePathname();
  const clickCount = useRef(0);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Reset click counter every minute
    resetTimer.current = setInterval(() => { clickCount.current = 0; }, 60_000);
    return () => {
      if (resetTimer.current) clearInterval(resetTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!getConsent()) return;

    const handler = (e: MouseEvent) => {
      if (clickCount.current >= RATE_LIMIT) return;
      clickCount.current++;

      const target = e.target as HTMLElement;
      const elementLabel = [target.tagName.toLowerCase(), target.className?.toString().slice(0, 40) ?? ""].join(".");

      const data = {
        page:       pathname,
        x_pct:      Number(((e.clientX / window.innerWidth) * 100).toFixed(2)),
        y_pct:      Number(((e.clientY / window.innerHeight) * 100).toFixed(2)),
        viewport_w: window.innerWidth,
        element:    elementLabel.slice(0, 80),
        session_id: getSessionId(),
      };

      try {
        navigator.sendBeacon(
          "/api/heatmap",
          new Blob([JSON.stringify(data)], { type: "application/json" }),
        );
      } catch {
        // Never let tracking break the UI
      }
    };

    document.addEventListener("click", handler, { passive: true });
    return () => document.removeEventListener("click", handler);
  }, [pathname]);

  return null;
}
