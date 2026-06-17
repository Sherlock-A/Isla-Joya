"use client";

import { useDynamicTheme } from "@/lib/useDynamicTheme";

/**
 * Invisible client component that injects data-theme on <html>.
 * Must be rendered inside <body> to avoid hydration mismatch.
 */
export function ThemeApplier() {
  useDynamicTheme();
  return null;
}
