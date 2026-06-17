"use client";

import { useCallback } from "react";
import type { Product, Category, Tone } from "@/lib/products";

const KEY = "ij-preferences";

interface Preferences {
  favoriteCategories: Partial<Record<Category, number>>;
  favoriteTones:      Partial<Record<Tone, number>>;
  priceMin:           number;
  priceMax:           number;
  priceCount:         number;
  lastUpdated:        number;
}

const DEFAULT: Preferences = {
  favoriteCategories: {},
  favoriteTones:      {},
  priceMin:           0,
  priceMax:           0,
  priceCount:         0,
  lastUpdated:        0,
};

function readPrefs(): Preferences {
  if (typeof window === "undefined") return DEFAULT;
  try {
    return { ...DEFAULT, ...(JSON.parse(localStorage.getItem(KEY) ?? "{}") as Partial<Preferences>) };
  } catch {
    return DEFAULT;
  }
}

function writePrefs(p: Preferences) {
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch {}
}

export function recordProductView(product: Product): void {
  const p = readPrefs();
  p.favoriteCategories[product.category] = (p.favoriteCategories[product.category] ?? 0) + 1;
  p.favoriteTones[product.tone] = (p.favoriteTones[product.tone] ?? 0) + 1;
  // Rolling average for price
  const total = p.priceMin + p.priceMax;
  if (p.priceCount === 0) {
    p.priceMin = product.price;
    p.priceMax = product.price;
  } else {
    p.priceMin = Math.min(p.priceMin, product.price);
    p.priceMax = Math.max(p.priceMax, product.price);
  }
  p.priceCount += 1;
  p.lastUpdated = Date.now();
  writePrefs(p);
}

export function getTopCategory(): Category | null {
  const p = readPrefs();
  const entries = Object.entries(p.favoriteCategories) as [Category, number][];
  if (!entries.length) return null;
  return entries.sort((a, b) => b[1] - a[1])[0][0];
}

export function getTopTone(): Tone | null {
  const p = readPrefs();
  const entries = Object.entries(p.favoriteTones) as [Tone, number][];
  if (!entries.length) return null;
  return entries.sort((a, b) => b[1] - a[1])[0][0];
}

export function getPreferredPriceRange(): { min: number; max: number } | null {
  const p = readPrefs();
  if (p.priceCount < 2) return null;
  return { min: p.priceMin, max: p.priceMax };
}

export function hasPreferences(): boolean {
  return readPrefs().lastUpdated > 0;
}

export function clearPreferences(): void {
  try { localStorage.removeItem(KEY); } catch {}
}

/** Hook version */
export function usePreferences() {
  const recordView = useCallback((product: Product) => recordProductView(product), []);
  return {
    recordView,
    getTopCategory,
    getTopTone,
    getPreferredPriceRange,
    hasPreferences,
    clearPreferences,
  };
}
