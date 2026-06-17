"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const prefersReducedMotion =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

/* ─────────────────────────────────────────────────────────────────
   useRevealAnimation
   Batch-reveals elements matching `selector` when the `triggerRef`
   enters the viewport.
───────────────────────────────────────────────────────────────── */
export function useRevealAnimation(
  triggerRef: React.RefObject<Element | null>,
  selector: string,
  options?: {
    y?: number;
    scale?: number;
    stagger?: number;
    duration?: number;
    ease?: string;
    start?: string;
  },
) {
  useEffect(() => {
    if (prefersReducedMotion || !triggerRef.current) return;
    const ctx = gsap.context(() => {
      const els = triggerRef.current!.querySelectorAll(selector);
      if (!els.length) return;
      gsap.from(els, {
        y:       options?.y       ?? 60,
        opacity: 0,
        scale:   options?.scale   ?? 1,
        stagger: options?.stagger ?? 0.1,
        duration: options?.duration ?? 0.9,
        ease:    options?.ease    ?? "power3.out",
        scrollTrigger: {
          trigger: triggerRef.current,
          start:   options?.start ?? "top 80%",
          once:    true,
        },
      });
    }, triggerRef);
    return () => ctx.revert();
  }, [triggerRef, selector, options]);
}

/* ─────────────────────────────────────────────────────────────────
   useParallax
   Moves `ref` element at `speed` relative to scroll.
   speed > 0 = slower (background), speed < 0 = faster (foreground)
───────────────────────────────────────────────────────────────── */
export function useParallax(
  ref: React.RefObject<Element | null>,
  speed = 0.3,
) {
  useEffect(() => {
    if (prefersReducedMotion || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent: speed * -30,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start:   "top bottom",
          end:     "bottom top",
          scrub:   true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [ref, speed]);
}

/* ─────────────────────────────────────────────────────────────────
   useSplitTextReveal
   Splits the text content of `ref` into word spans and animates
   each word in on scroll.
───────────────────────────────────────────────────────────────── */
export function useSplitTextReveal(
  ref: React.RefObject<HTMLElement | null>,
  options?: { stagger?: number; delay?: number; start?: string },
) {
  useEffect(() => {
    const el = ref.current;
    if (prefersReducedMotion || !el) return;

    // Split text into word spans
    const original = el.innerHTML;
    const words = el.innerText.split(/\s+/).filter(Boolean);
    el.innerHTML = words
      .map(
        (w) =>
          `<span style="display:inline-block;overflow:hidden;vertical-align:bottom"><span class="gsap-word" style="display:inline-block">${w}</span></span>`,
      )
      .join(" ");

    const wordEls = el.querySelectorAll<HTMLElement>(".gsap-word");

    const ctx = gsap.context(() => {
      gsap.from(wordEls, {
        y: "105%",
        opacity: 0,
        rotateX: 10,
        stagger:  options?.stagger ?? 0.07,
        duration: 0.85,
        ease:     "power3.out",
        delay:    options?.delay ?? 0,
        scrollTrigger: {
          trigger: el,
          start:   options?.start ?? "top 85%",
          once:    true,
        },
      });
    });

    return () => {
      ctx.revert();
      el.innerHTML = original;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
}

/* ─────────────────────────────────────────────────────────────────
   useScrollProgress
   Returns a 0→1 progress value representing scroll depth of the page.
───────────────────────────────────────────────────────────────── */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return progress;
}

/* ─────────────────────────────────────────────────────────────────
   useMagneticHover
   Subtle magnetic pull toward the cursor on hover.
───────────────────────────────────────────────────────────────── */
export function useMagneticHover(
  ref: React.RefObject<HTMLElement | null>,
  strength = 0.3,
) {
  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: "power2.out" });
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.5)" });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [ref, strength]);
}

/* ─────────────────────────────────────────────────────────────────
   useCountUp
   Counts a number from 0 → `target` when element enters viewport.
───────────────────────────────────────────────────────────────── */
export function useCountUp(
  ref: React.RefObject<HTMLElement | null>,
  target: number,
  options?: { duration?: number; suffix?: string; start?: string; decimals?: number },
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const dec = options?.decimals ?? 0;
    const fmt = (v: number) => `${v.toFixed(dec)}${options?.suffix ?? ""}`;
    if (prefersReducedMotion) { el.textContent = fmt(target); return; }

    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: target,
        duration: options?.duration ?? 2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: options?.start ?? "top 85%", once: true },
        onUpdate() {
          el.textContent = fmt(obj.val);
        },
      });
    });
    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, target]);
}

/* ─────────────────────────────────────────────────────────────────
   useScrollVelocity
   Returns scroll velocity — useful for scroll-stop detection.
───────────────────────────────────────────────────────────────── */
export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const lastY = useRef(0);
  const lastT = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const now = performance.now();
      const dy = window.scrollY - lastY.current;
      const dt = now - lastT.current;
      if (dt > 0) setVelocity(Math.abs(dy / dt));
      lastY.current = window.scrollY;
      lastT.current = now;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return velocity;
}
