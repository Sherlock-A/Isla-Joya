"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSplitTextReveal } from "@/hooks/useGSAP";
import { ProductCard } from "@/components/ui/ProductCard";
import type { Product } from "@/lib/products";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const prefersReduced =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

export function BestSellersGrid({ items, headingSlot }: { items: Product[]; headingSlot?: React.ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  useSplitTextReveal(headingRef, { stagger: 0.08, start: "top 82%" });

  useEffect(() => {
    if (prefersReduced || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".bs-card", {
        y: 65,
        opacity: 0,
        scale: 0.96,
        stagger: 0.1,
        duration: 0.95,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".bs-grid",
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="best-sellers" className="bg-pearl/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="text-center">
          <p className="eyebrow mb-4">Best Sellers</p>
          <h2
            ref={headingRef}
            className="font-display text-4xl leading-tight text-noir sm:text-5xl"
          >
            Loved by thousands
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-noir/60">
            The pieces our community reaches for again and again.
          </p>
        </div>
        <div className="bs-grid mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => (
            <div key={p.id} className="bs-card">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
