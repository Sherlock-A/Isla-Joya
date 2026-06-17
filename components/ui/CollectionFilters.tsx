"use client";

import { useState, useMemo } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/ui/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import type { Product, Tone, Badge } from "@/lib/products";

const TONES: { key: Tone; label: string; color: string }[] = [
  { key: "gold",      label: "Gold",      color: "bg-[#c6a15b]" },
  { key: "rose",      label: "Rosé",      color: "bg-[#c08081]" },
  { key: "champagne", label: "Champagne", color: "bg-[#e7d3a9]" },
  { key: "ivory",     label: "Ivoire",    color: "bg-[#e4d8c6]" },
  { key: "nude",      label: "Nude",      color: "bg-[#d9bca5]" },
  { key: "noir",      label: "Noir",      color: "bg-[#17120d]" },
];

const BADGES: { key: Badge; label: string }[] = [
  { key: "new",        label: "Nouveauté" },
  { key: "bestseller", label: "Best-Seller" },
  { key: "limited",    label: "Limité" },
];

const PRICES: { label: string; fn: (p: number) => boolean }[] = [
  { label: "< 60 €",     fn: (p) => p < 60 },
  { label: "60 – 100 €", fn: (p) => p >= 60 && p <= 100 },
  { label: "> 100 €",    fn: (p) => p > 100 },
];

interface Props {
  products: Product[];
}

export function CollectionFilters({ products }: Props) {
  const [tones, setTones] = useState<Set<Tone>>(new Set());
  const [badges, setBadges] = useState<Set<Badge>>(new Set());
  const [priceIdx, setPriceIdx] = useState<number | null>(null);

  const toggle = <T,>(set: Set<T>, key: T, setter: (s: Set<T>) => void) => {
    const next = new Set(set);
    next.has(key) ? next.delete(key) : next.add(key);
    setter(next);
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (tones.size > 0 && !tones.has(p.tone)) return false;
      if (badges.size > 0 && (!p.badge || !badges.has(p.badge))) return false;
      if (priceIdx !== null && !PRICES[priceIdx].fn(p.price)) return false;
      return true;
    });
  }, [products, tones, badges, priceIdx]);

  const hasFilter = tones.size > 0 || badges.size > 0 || priceIdx !== null;

  const clearAll = () => {
    setTones(new Set());
    setBadges(new Set());
    setPriceIdx(null);
  };

  return (
    <>
      {/* Filter bar */}
      <div className="mt-10 flex flex-wrap items-center gap-3">
        {/* Tone pills */}
        <div className="flex flex-wrap gap-1.5">
          {TONES.map(({ key, label, color }) => (
            <button
              key={key}
              type="button"
              onClick={() => toggle(tones, key, setTones)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] transition-all",
                tones.has(key)
                  ? "bg-noir text-ivory shadow-sm"
                  : "bg-noir/5 text-noir/60 hover:bg-noir/10",
              )}
            >
              <span className={cn("h-2.5 w-2.5 rounded-full", color)} />
              {label}
            </button>
          ))}
        </div>

        <div className="h-5 w-px bg-noir/15" />

        {/* Badge pills */}
        <div className="flex flex-wrap gap-1.5">
          {BADGES.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => toggle(badges, key, setBadges)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] transition-all",
                badges.has(key)
                  ? "bg-gold/90 text-noir shadow-sm"
                  : "bg-noir/5 text-noir/60 hover:bg-noir/10",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="h-5 w-px bg-noir/15" />

        {/* Price pills */}
        <div className="flex flex-wrap gap-1.5">
          {PRICES.map(({ label }, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPriceIdx(priceIdx === i ? null : i)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] transition-all",
                priceIdx === i
                  ? "bg-noir text-ivory shadow-sm"
                  : "bg-noir/5 text-noir/60 hover:bg-noir/10",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Clear */}
        {hasFilter && (
          <button
            type="button"
            onClick={clearAll}
            className="ml-auto flex items-center gap-1.5 text-xs text-noir/40 transition hover:text-noir"
          >
            <X className="h-3.5 w-3.5" />
            Réinitialiser
          </button>
        )}
      </div>

      {/* Result count */}
      {hasFilter && (
        <p className="mt-3 text-xs text-noir/40">
          {filtered.length} résultat{filtered.length !== 1 ? "s" : ""} sur {products.length}
        </p>
      )}

      {/* Product grid */}
      {filtered.length === 0 ? (
        <div className="mt-14 text-center">
          <p className="text-noir/50">Aucun produit ne correspond à vos filtres.</p>
          <button
            type="button"
            onClick={clearAll}
            className="mt-4 text-sm text-gold underline underline-offset-2"
          >
            Effacer les filtres
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.06}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}
