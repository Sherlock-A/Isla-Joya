"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/products";

const toneBg: Record<Tone, string> = {
  gold:      "linear-gradient(150deg,#efe2c2,#c6a15b)",
  rose:      "linear-gradient(150deg,#ecd6d6,#c08081)",
  ivory:     "linear-gradient(150deg,#ffffff,#e4d8c6)",
  champagne: "linear-gradient(150deg,#f4e8cd,#e7d3a9)",
  nude:      "linear-gradient(150deg,#efe0d1,#d9bca5)",
  noir:      "linear-gradient(150deg,#3a3026,#17120d)",
};

const stripes =
  "repeating-linear-gradient(115deg, rgba(255,255,255,0.16) 0 1.5px, transparent 1.5px 13px)";

interface Props {
  images: string[];
  name: string;
  tone: Tone;
}

export function ProductImageGallery({ images, name, tone }: Props) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const touchStartX = useRef<number>(0);

  const hasImages = images.length > 0;
  const count = images.length;

  const prev = () => setActive((i) => (i - 1 + count) % count);
  const next = () => setActive((i) => (i + 1) % count);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  };

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox, active]);

  return (
    <>
      {/* Main image */}
      <div className="flex flex-col gap-3">
        <div
          className="group relative aspect-[4/5] overflow-hidden rounded-3xl"
          style={!hasImages ? { background: toneBg[tone] } : undefined}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {hasImages ? (
            <>
              <Image
                src={images[active]}
                alt={`${name} — vue ${active + 1}`}
                fill
                priority={active === 0}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-all duration-500"
                unoptimized
              />
              {/* Zoom overlay */}
              <button
                type="button"
                onClick={() => setLightbox(true)}
                aria-label="Agrandir l'image"
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-ivory/80 text-noir backdrop-blur opacity-0 transition duration-300 group-hover:opacity-100 hover:bg-ivory"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
            </>
          ) : (
            <>
              <div className="absolute inset-0" style={{ backgroundImage: stripes }} />
              <span className="absolute inset-x-0 bottom-6 text-center text-[11px] uppercase tracking-[0.22em] text-noir/50">
                {name}
              </span>
            </>
          )}

          {/* Prev/Next arrows (desktop) */}
          {hasImages && count > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Image précédente"
                className="absolute left-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-ivory/80 text-noir backdrop-blur opacity-0 transition group-hover:opacity-100 hover:bg-ivory"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Image suivante"
                className="absolute right-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-ivory/80 text-noir backdrop-blur opacity-0 transition group-hover:opacity-100 hover:bg-ivory"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {hasImages && count > 1 && (
          <div className="flex gap-2">
            {images.slice(0, 4).map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Vue ${i + 1}`}
                className={cn(
                  "relative h-16 w-16 shrink-0 overflow-hidden rounded-xl transition ring-2",
                  active === i ? "ring-gold" : "ring-transparent opacity-60 hover:opacity-100",
                )}
              >
                <Image src={src} alt={`${name} miniature ${i + 1}`} fill className="object-cover" unoptimized />
              </button>
            ))}
          </div>
        )}

        {/* Dots (mobile) */}
        {hasImages && count > 1 && (
          <div className="flex justify-center gap-1.5 sm:hidden">
            {images.slice(0, 4).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  active === i ? "w-5 bg-gold" : "w-1.5 bg-noir/25",
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && hasImages && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-noir/95 backdrop-blur-sm"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            aria-label="Fermer"
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-ivory/10 text-ivory transition hover:bg-ivory/20"
          >
            <X className="h-6 w-6" />
          </button>

          <div
            className="relative h-[80vh] w-[80vw] max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[active]}
              alt={`${name} — vue ${active + 1}`}
              fill
              className="object-contain"
              unoptimized
            />
          </div>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-5 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-ivory/10 text-ivory transition hover:bg-ivory/20"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-5 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-ivory/10 text-ivory transition hover:bg-ivory/20"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          )}

          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-ivory/50">
            {active + 1} / {count} · <kbd className="opacity-60">Esc</kbd> pour fermer
          </p>
        </div>
      )}
    </>
  );
}
