"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Lenis smooth scroll synced to the GSAP ticker so ScrollTrigger-driven
 * animations stay perfectly in step. Respects prefers-reduced-motion.
 * Exposes the instance on window.__lenis for anchor scrolling.
 *
 * Lenis is dynamically imported to prevent SSR issues — the package
 * accesses `document` at module level in v1.x, which crashes during
 * server-side rendering before React hydrates the DOM.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    let cleanup: (() => void) | undefined;

    import("lenis").then(({ default: Lenis }) => {
      // Guard: component may have unmounted before the dynamic import resolved
      if (typeof window === "undefined") return;

      const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__lenis = lenis;

      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(raf);
        lenis.destroy();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).__lenis = undefined;
      };
    });

    return () => cleanup?.();
  }, []);

  return <>{children}</>;
}
