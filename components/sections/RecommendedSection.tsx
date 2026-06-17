"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";
import type { Product } from "@/lib/products";
import { getRecommendations } from "@/lib/recommendations";
import { ProductCard } from "@/components/ui/ProductCard";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const prefersReduced =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

interface Props {
  reference: Product;
  pool: Product[];
}

export function RecommendedSection({ reference, pool }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const recs = getRecommendations(reference, pool, 4);

  useEffect(() => {
    if (prefersReduced || !sectionRef.current || recs.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.from(".rec-card", {
        y: 50, opacity: 0, scale: 0.95, stagger: 0.1, duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (recs.length === 0) return null;

  return (
    <section ref={sectionRef} className="mx-auto max-w-5xl px-6 pb-20 sm:px-8">
      <div className="mb-8 border-t border-noir/10 pt-12">
        <p className="eyebrow flex items-center justify-center gap-2 text-[11px]">
          <Sparkles className="h-3.5 w-3.5" />
          Vous pourriez aimer
        </p>
        <h2 className="mt-2 text-center font-display text-2xl text-noir">
          Sélectionné pour vous
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {recs.map((p) => (
          <div key={p.slug} className="rec-card">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
