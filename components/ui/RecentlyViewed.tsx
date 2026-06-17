"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, X } from "lucide-react";
import { type ViewedProduct, getRecentlyViewed, clearRecentlyViewed } from "@/lib/useRecentlyViewed";
import { formatPrice } from "@/lib/utils";

export function RecentlyViewed({ excludeSlug }: { excludeSlug?: string }) {
  const [items, setItems] = useState<ViewedProduct[]>([]);

  useEffect(() => {
    const all = getRecentlyViewed();
    setItems(excludeSlug ? all.filter((v) => v.slug !== excludeSlug) : all);
  }, [excludeSlug]);

  if (items.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="border-t border-noir/8 px-6 py-10 sm:px-8"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-noir/50">
              <Clock className="h-3.5 w-3.5" />
              Récemment vus
            </span>
            <button
              type="button"
              onClick={() => { clearRecentlyViewed(); setItems([]); }}
              className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-noir/35 transition hover:text-noir/60"
            >
              <X className="h-3 w-3" />
              Effacer
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-thin">
            {items.slice(0, 6).map((item, i) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="group shrink-0"
              >
                <Link href={`/products/${item.slug}`} className="block">
                  <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-pearl/60 transition-transform duration-300 group-hover:scale-105">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-champagne to-gold/30" />
                    )}
                  </div>
                  <p className="mt-2 max-w-[80px] truncate text-[11px] font-medium text-noir/80 group-hover:text-gold transition-colors">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-gold">{formatPrice(item.price)}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
