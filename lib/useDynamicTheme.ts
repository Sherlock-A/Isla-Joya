"use client";

import { useEffect } from "react";

export type TimeTheme = "morning" | "afternoon" | "evening" | "night";

export function getTimeTheme(hour?: number): TimeTheme {
  const h = hour ?? new Date().getHours();
  if (h >= 6  && h < 11) return "morning";
  if (h >= 11 && h < 17) return "afternoon";
  if (h >= 17 && h < 22) return "evening";
  return "night";
}

export function getThemeLabel(theme: TimeTheme): string {
  switch (theme) {
    case "morning":   return "Lumière matinale";
    case "afternoon": return "Or de l'après-midi";
    case "evening":   return "Rosé du soir";
    case "night":     return "Nuit de velours";
  }
}

/**
 * Applies data-theme to <html> based on current hour.
 * Updates once per hour via setInterval.
 * Safe against SSR — only runs on the client.
 */
export function useDynamicTheme() {
  useEffect(() => {
    const apply = () => {
      document.documentElement.setAttribute("data-theme", getTimeTheme());
    };
    apply();
    // Recalculate at the start of every hour
    const now = new Date();
    const msUntilNextHour =
      (60 - now.getMinutes()) * 60 * 1000 - now.getSeconds() * 1000;
    const timeout = setTimeout(() => {
      apply();
      const interval = setInterval(apply, 3_600_000);
      return () => clearInterval(interval);
    }, msUntilNextHour);
    return () => clearTimeout(timeout);
  }, []);
}
