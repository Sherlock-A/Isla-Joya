"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ChevronDown, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppGlyph } from "@/components/ui/icons";
import { openWhatsApp, waMessages } from "@/lib/whatsapp";

function SceneFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="h-24 w-24 rotate-45 animate-spin-slow rounded-md border border-gold/40" />
    </div>
  );
}

const HeroScene = dynamic(() => import("@/components/three/HeroScene").then((m) => m.HeroScene), {
  ssr: false,
  loading: () => <SceneFallback />,
});

function goTo(hash: string) {
  const el = document.getElementById(hash);
  if (!el) return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenis = (window as any).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: -80 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-rise", {
        y: 34,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.2,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="grain relative flex min-h-screen items-center overflow-hidden bg-noir"
    >
      {/* 3D scene */}
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      {/* Legibility overlays */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(23,18,13,0.55)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-noir/80 via-noir/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8">
        <div className="max-w-2xl">
          <p className="hero-rise eyebrow mb-6">Fine Jewelry — Morocco 🇲🇦 &amp; Spain 🇪🇸</p>

          <h1 className="hero-rise font-display text-[3.4rem] leading-[0.98] text-ivory sm:text-7xl lg:text-[5.5rem]">
            Wear your <span className="gold-text italic">light.</span>
          </h1>

          <p className="hero-rise mt-7 max-w-xl font-serif text-xl leading-relaxed text-pearl/80 sm:text-2xl">
            Modern heirlooms born between the souks of Morocco and the boulevards of
            Spain — order yours in a single message.
          </p>

          <div className="hero-rise mt-10 flex flex-wrap items-center gap-4">
            <Button variant="gold" size="lg" onClick={() => goTo("best-sellers")}>
              Shop the Collection
            </Button>
            <button
              type="button"
              onClick={() => openWhatsApp({ message: waMessages.wholesale(), source: "hero" })}
              className="inline-flex items-center gap-2 rounded-full border border-ivory/40 px-9 py-4 text-sm font-medium uppercase tracking-[0.18em] text-ivory transition hover:bg-ivory hover:text-noir"
            >
              <WhatsAppGlyph size={16} />
              Become a Stockist
            </button>
          </div>

          <div className="hero-rise mt-10 flex flex-wrap items-center gap-x-7 gap-y-2 text-sm text-pearl/60">
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-gold text-gold" /> 4.9 · 2,000+ orders
            </span>
            <span>Free delivery over €150</span>
            <span>Casablanca · Barcelona</span>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        type="button"
        onClick={() => goTo("collections")}
        aria-label="Scroll to collections"
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-ivory/50 transition hover:text-gold"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </button>
    </section>
  );
}
