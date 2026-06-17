"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppGlyph } from "@/components/ui/icons";
import { openWhatsApp, waMessages } from "@/lib/whatsapp";
import { useScrollProgress } from "@/hooks/useGSAP";
import { fadeIn } from "@/lib/motionVariants";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

function SceneFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      {/* Diamond SVG fallback */}
      <svg viewBox="0 0 120 120" className="h-32 w-32 animate-spin-slow opacity-60">
        <polygon
          points="60,8 110,45 90,112 30,112 10,45"
          fill="none"
          stroke="#c6a15b"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <polygon
          points="60,8 110,45 60,60 10,45"
          fill="rgba(198,161,91,0.12)"
          stroke="#c6a15b"
          strokeWidth="0.8"
        />
        <polygon
          points="60,60 110,45 90,112 30,112 10,45"
          fill="rgba(198,161,91,0.06)"
          stroke="#c6a15b"
          strokeWidth="0.8"
        />
      </svg>
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

/** Word-by-word split render helper */
function SplitWords({
  text,
  className,
  gold,
}: {
  text: string;
  className?: string;
  gold?: string; // word to highlight in gold-text italic
}) {
  const words = text.split(" ");
  return (
    <span className={className} style={{ perspective: "800px" }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
          <span
            className={`gsap-word inline-block${word === gold ? " gold-text italic" : ""}`}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress();
  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  useEffect(() => {
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      // Word-by-word split text reveal on H1
      const words = document.querySelectorAll(".gsap-word");
      gsap.from(words, {
        y: "105%",
        opacity: 0,
        rotateX: 10,
        stagger: 0.065,
        duration: 0.88,
        ease: "power3.out",
        delay: 0.15,
      });

      // Other hero elements still use hero-rise (eyebrow, p, CTAs, trust)
      gsap.from(".hero-rise", {
        y: 28,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.11,
        delay: 0.55,
      });

      // Scroll parallax: content drifts up as user scrolls past hero
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          y: -70,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, root);
    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* ── Scroll Progress Bar ── */}
      {!prefersReduced && (
        <div
          aria-hidden="true"
          className="fixed top-0 left-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-gold-600 via-champagne to-gold"
          style={{ width: "100%", transform: `scaleX(${progress})` }}
        />
      )}

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
        <div
          ref={contentRef}
          className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8"
        >
          <div className="max-w-2xl">
            <p className="hero-rise eyebrow mb-6">Fine Jewelry — Morocco 🇲🇦 &amp; Spain 🇪🇸</p>

            <h1 className="font-display text-[3.4rem] leading-[0.98] text-ivory sm:text-7xl lg:text-[5.5rem]">
              <SplitWords text="Wear your light." gold="light." />
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

            {/* Trust badges */}
            <div className="hero-rise mt-10 flex flex-wrap items-center gap-x-7 gap-y-2 text-sm text-pearl/60">
              <motion.span
                className="flex items-center gap-1.5"
                variants={fadeIn}
                initial="hidden"
                animate="show"
                transition={{ delay: 1.2 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
                </span>
                4.9 · 2,000+ orders
                <Star className="h-3.5 w-3.5 fill-gold text-gold" />
              </motion.span>
              <span>Free delivery over €150</span>
              <span>Casablanca · Barcelona</span>
            </div>
          </div>
        </div>

        {/* Scroll cue — breathe animation */}
        <button
          type="button"
          onClick={() => goTo("collections")}
          aria-label="Scroll to collections"
          className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-ivory/40 transition hover:text-gold animate-breathe"
        >
          <ChevronDown className="h-6 w-6" />
        </button>
      </section>
    </>
  );
}
