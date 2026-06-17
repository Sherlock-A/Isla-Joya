"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Lenis smooth scroll synced to the GSAP ticker so ScrollTrigger-driven
 * animations stay perfectly in step. Respects prefers-reduced-motion.
 * Exposes the instance on window.__lenis for anchor scrolling.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
