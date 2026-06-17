"use client";

import { useCallback } from "react";
import type { Product } from "@/lib/products";

const KEY = "ij-recently-viewed";
const MAX = 8;

export interface ViewedProduct {
  slug: string;
  name: string;
  price: number;
  image?: string;
  category: string;
  viewedAt: number;
}

function readViewed(): ViewedProduct[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as ViewedProduct[];
  } catch {
    return [];
  }
}

function writeViewed(items: ViewedProduct[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {}
}

export function getRecentlyViewed(): ViewedProduct[] {
  return readViewed().sort((a, b) => b.viewedAt - a.viewedAt);
}

export function addRecentlyViewed(product: Product): void {
  const existing = readViewed().filter((v) => v.slug !== product.slug);
  const entry: ViewedProduct = {
    slug:      product.slug,
    name:      product.name,
    price:     product.price,
    image:     product.images[0],
    category:  product.category,
    viewedAt:  Date.now(),
  };
  writeViewed([entry, ...existing].slice(0, MAX));
}

export function clearRecentlyViewed(): void {
  try { localStorage.removeItem(KEY); } catch {}
}

/** Hook version for components */
export function useRecentlyViewed() {
  const getViewed = useCallback(() => getRecentlyViewed(), []);
  const addViewed = useCallback((p: Product) => addRecentlyViewed(p), []);
  const clearViewed = useCallback(() => clearRecentlyViewed(), []);
  return { getViewed, addViewed, clearViewed };
}
