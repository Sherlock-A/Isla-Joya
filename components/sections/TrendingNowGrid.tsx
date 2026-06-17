"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flame } from "lucide-react";
import type { Product } from "@/lib/products";
import { ProductCard } from "@/components/ui/ProductCard";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const prefersReduced =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

export function TrendingNowGrid({ products }: { products: Product[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReduced || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".tr-card", {
        y: 55, opacity: 0, scale: 0.96, stagger: 0.1, duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mb-10 text-center">
          <p className="eyebrow inline-flex items-center gap-2">
            <Flame className="h-3.5 w-3.5 text-rose-500" />
            Tendances · 7 jours
          </p>
          <h2 className="mt-2 font-display text-3xl text-noir sm:text-4xl">En ce moment</h2>
          <p className="mt-2 text-sm text-noir/50">Les bijoux les plus regardés cette semaine</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <div key={p.slug} className="tr-card relative">
              {i === 0 && (
                <div className="absolute -top-2 left-3 z-10 flex items-center gap-1 rounded-full bg-rose-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
                  <Flame className="h-3 w-3" />
                  #1 Tendance
                </div>
              )}
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
