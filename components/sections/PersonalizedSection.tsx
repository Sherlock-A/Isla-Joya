"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";
import type { Product } from "@/lib/products";
import { hasPreferences, getTopCategory, getTopTone } from "@/lib/usePreferences";
import { ProductCard } from "@/components/ui/ProductCard";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const prefersReduced =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

interface PersonalizedSectionProps {
  allProducts: Product[];
}

export function PersonalizedSection({ allProducts }: PersonalizedSectionProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [topTone, setTopTone] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!hasPreferences()) return;

    const tone = getTopTone();
    const category = getTopCategory();
    setTopTone(tone);

    // Score and filter products based on preferences
    const scored = allProducts
      .map((p) => {
        let s = 0;
        if (tone     && p.tone     === tone)     s += 30;
        if (category && p.category === category) s += 20;
        if (p.badge === "bestseller") s += 10;
        if (p.rating >= 4.8) s += 5;
        return { product: p, score: s };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((x) => x.product);

    setProducts(scored);
  }, [allProducts]);

  useEffect(() => {
    if (prefersReduced || !sectionRef.current || products.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.from(".ps-card", {
        y: 55, opacity: 0, scale: 0.96, stagger: 0.1, duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ps-grid", start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [products]);

  if (products.length === 0) return null;

  const toneLabel: Record<string, string> = {
    gold: "Or",  rose: "Rose",  ivory: "Perle",
    champagne: "Champagne",  nude: "Nude",  noir: "Noir",
  };

  return (
    <section ref={sectionRef} className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              Votre univers
            </p>
            <h2 className="mt-2 font-display text-3xl text-noir sm:text-4xl">
              Sélectionné pour vous
            </h2>
            {topTone && (
              <p className="mt-1.5 text-sm text-noir/55">
                Basé sur vos préférences · Ton {toneLabel[topTone] ?? topTone}
              </p>
            )}
          </div>
        </div>
        <div className="ps-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <div key={p.slug} className="ps-card">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
