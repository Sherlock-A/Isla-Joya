"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import type { ComponentType, SVGProps } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { categories, type Category } from "@/lib/products";
import { RingIcon, NecklaceIcon, BraceletIcon, EarringsIcon } from "@/components/ui/icons";
import { useSplitTextReveal } from "@/hooks/useGSAP";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const prefersReduced =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

type IconType = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const icons: Record<Category, IconType> = {
  rings:     RingIcon,
  necklaces: NecklaceIcon,
  bracelets: BraceletIcon,
  earrings:  EarringsIcon,
};

const grad: Record<string, string> = {
  gold:      "linear-gradient(150deg,#efe2c2,#c6a15b)",
  champagne: "linear-gradient(150deg,#f4e8cd,#e7d3a9)",
  nude:      "linear-gradient(150deg,#efe0d1,#d9bca5)",
  rose:      "linear-gradient(150deg,#ecd6d6,#c08081)",
};

export function Collections() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  useSplitTextReveal(headingRef, { stagger: 0.07, start: "top 82%" });

  useEffect(() => {
    if (prefersReduced || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".col-card", {
        y: 80,
        opacity: 0,
        rotateX: 8,
        scale: 0.96,
        stagger: 0.12,
        duration: 1.0,
        ease: "power3.out",
        transformPerspective: 1000,
        scrollTrigger: {
          trigger: ".col-grid",
          start: "top 75%",
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="collections" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="text-center">
          <p className="eyebrow mb-4">Collections</p>
          <h2 ref={headingRef} className="font-display text-4xl leading-tight text-noir sm:text-5xl">
            Find your light
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-noir/60">
            Four families, one signature — choose where your story begins.
          </p>
        </div>

        <div className="col-grid mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => {
            const Icon = icons[c.key];
            return (
              <div key={c.key} className="col-card" style={{ transformStyle: "preserve-3d" }}>
                <Link
                  href={`/collections/${c.key}`}
                  className="group block w-full overflow-hidden rounded-2xl bg-white text-left shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-floating"
                >
                  <div
                    className="relative grid h-52 place-items-center overflow-hidden"
                    style={{ background: grad[c.tone] }}
                  >
                    {/* Stripe texture */}
                    <div
                      className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-60"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(115deg, rgba(255,255,255,0.16) 0 1.5px, transparent 1.5px 13px)",
                      }}
                    />
                    {/* Icon with scale + rotate */}
                    <Icon
                      size={52}
                      className="relative text-noir/70 transition-all duration-500 group-hover:scale-115 group-hover:rotate-[5deg]"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-noir/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="font-display text-xl text-noir">{c.label}</h3>
                    <p className="mt-1 text-sm text-noir/60">{c.blurb}</p>
                    <span className="eyebrow mt-3 inline-block text-[11px] transition-all duration-300 group-hover:text-gold group-hover:tracking-[0.22em]">
                      Discover →
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
