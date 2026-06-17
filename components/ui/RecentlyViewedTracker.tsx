"use client";

import { useEffect } from "react";
import type { Product } from "@/lib/products";
import { addRecentlyViewed } from "@/lib/useRecentlyViewed";
import { recordProductView } from "@/lib/usePreferences";

/** Invisible tracker — call on product page mount to log the view */
export function RecentlyViewedTracker({ product }: { product: Product }) {
  useEffect(() => {
    addRecentlyViewed(product);
    recordProductView(product);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.slug]);

  return null;
}
