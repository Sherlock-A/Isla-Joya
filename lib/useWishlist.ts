"use client";

import { useState, useEffect } from "react";

const KEY = "ij-wishlist";

export function useWishlist() {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // localStorage unavailable
    }
  }, []);

  const toggle = (slug: string) => {
    setItems((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        // localStorage unavailable
      }
      return next;
    });
  };

  return { items, toggle, isWished: (slug: string) => items.includes(slug) };
}
