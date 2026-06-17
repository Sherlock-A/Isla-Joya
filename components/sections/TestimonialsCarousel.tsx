"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useAnimationControls } from "framer-motion";
import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/products";

export function TestimonialsCarousel({ reviews }: { reviews: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const controls = useAnimationControls();

  const count = reviews.length;
  const CARD_W = 340;
  const GAP = 24;
  const STEP = CARD_W + GAP;

  const goTo = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(idx, count - 1));
    setActive(clamped);
    controls.start({ x: -clamped * STEP, transition: { type: "spring", stiffness: 300, damping: 35 } });
  }, [controls, count, STEP]);

  // Auto-scroll
  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setActive((prev) => {
        const next = prev + 1 >= count ? 0 : prev + 1;
        controls.start({ x: -next * STEP, transition: { type: "spring", stiffness: 280, damping: 32 } });
        return next;
      });
    }, 4500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, count, controls, STEP]);

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Track */}
      <motion.div
        ref={trackRef}
        className="flex gap-6 cursor-grab active:cursor-grabbing px-6 sm:px-8"
        drag="x"
        dragConstraints={{ left: -(count - 1) * STEP, right: 0 }}
        dragElastic={0.08}
        animate={controls}
        style={{ x }}
        onDragEnd={(_, info) => {
          const threshold = 80;
          if (info.offset.x < -threshold && active < count - 1) goTo(active + 1);
          else if (info.offset.x > threshold && active > 0) goTo(active - 1);
          else goTo(active);
        }}
      >
        {reviews.map((r) => (
          <figure
            key={r.id}
            className="flex min-w-[340px] max-w-[340px] flex-col rounded-2xl bg-white p-8 shadow-soft border border-ivory/60 backdrop-blur"
            style={{ userSelect: "none" }}
          >
            <div className="flex gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className="h-4 w-4 fill-gold" />
              ))}
            </div>
            <blockquote className="mt-5 flex-1 font-serif text-lg italic leading-relaxed text-noir/80">
              &ldquo;{r.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6">
              <p className="font-display text-lg text-noir">{r.name}</p>
              {r.city && <p className="text-sm text-noir/55">{r.city} · Verified</p>}
            </figcaption>
          </figure>
        ))}
      </motion.div>

      {/* Dot indicators */}
      <div className="mt-8 flex justify-center gap-2">
        {reviews.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Aller au témoignage ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-400 ${
              i === active ? "w-8 bg-gold" : "w-1.5 bg-noir/20 hover:bg-gold/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
