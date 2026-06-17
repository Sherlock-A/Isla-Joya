"use client";

import { Heart, Star, Eye } from "lucide-react";
import { useWishlist } from "@/lib/useWishlist";
import { useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product, Tone } from "@/lib/products";
import { cn, formatPrice } from "@/lib/utils";
import { openWhatsApp, waMessages } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import { Badge } from "./Badge";
import { WhatsAppGlyph } from "./icons";

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

export function ProductCard({ product }: { product: Product }) {
  const { isWished, toggle } = useWishlist();
  const wished = isWished(product.slug);
  const dark = product.tone === "noir";
  const cardRef = useRef<HTMLDivElement>(null);

  /* ── 3D Tilt on mouse move ── */
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    el.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) translateZ(6px)`;
  }, []);

  const onMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "transform 0.6s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s ease";
    el.style.transform = "perspective(700px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
    setTimeout(() => { if (el) el.style.transition = ""; }, 650);
  }, []);

  const order = () =>
    openWhatsApp({
      message: waMessages.product(product.name, product.material),
      source: "product_card",
      productSlug: product.slug,
      productName: product.name,
    });

  const toggleWish = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!wished) track("wishlist_add", { productSlug: product.slug, productName: product.name });
    toggle(product.slug);
  };

  const handleOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    order();
  };

  return (
    <article
      ref={cardRef}
      className="card-glow group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft transition-shadow duration-500 hover:shadow-floating"
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Image container */}
      <div
        className="relative h-64 overflow-hidden"
        style={{ background: toneBg[product.tone] }}
      >
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0" style={{ backgroundImage: stripes }} />
        )}

        {/* Badge */}
        {product.badge && (
          <div className="absolute left-4 top-4 z-10">
            <Badge variant={product.badge} />
          </div>
        )}

        {/* Limited pulse dot */}
        {product.badge === "limited" && (
          <span className="absolute left-4 top-12 z-10 mt-0.5 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-ivory/80">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
            Derniers disponibles
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          onClick={toggleWish}
          aria-label="Ajouter à la wishlist"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-noir backdrop-blur transition-all duration-300 hover:scale-110 hover:bg-white"
        >
          <Heart className={cn("h-4 w-4 transition-colors", wished && "fill-rose text-rose")} />
        </button>

        {/* Category watermark — appears on hover */}
        <span
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-14 text-center text-[10px] uppercase tracking-[0.22em] opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            dark ? "text-ivory/50" : "text-noir/40",
          )}
        >
          {product.category.slice(0, -1)}
        </span>

        {/* ── Quick-action bar (slides up on hover) ── */}
        <div className="absolute inset-x-0 bottom-0 z-20 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
          <div className="flex divide-x divide-white/20 glass border-t border-white/15">
            <button
              type="button"
              onClick={toggleWish}
              aria-label="Wishlist"
              className="flex flex-1 items-center justify-center gap-1.5 py-3 text-[11px] uppercase tracking-widest text-ivory/90 transition hover:bg-white/10"
            >
              <Heart className={cn("h-3.5 w-3.5", wished && "fill-rose text-rose")} />
              Sauver
            </button>
            <Link
              href={`/products/${product.slug}`}
              onClick={() => track("view_product", { productSlug: product.slug, productName: product.name })}
              className="flex flex-1 items-center justify-center gap-1.5 py-3 text-[11px] uppercase tracking-widest text-ivory/90 transition hover:bg-white/10"
            >
              <Eye className="h-3.5 w-3.5" />
              Voir
            </Link>
            <button
              type="button"
              onClick={handleOrder}
              aria-label="Commander"
              className="flex flex-1 items-center justify-center gap-1.5 py-3 text-[11px] uppercase tracking-widest text-ivory/90 transition hover:bg-white/10"
            >
              <WhatsAppGlyph size={13} />
              Commander
            </button>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow text-[11px]">{product.material}</p>
        <h3 className="mt-2 font-display text-xl leading-tight text-noir">{product.name}</h3>

        <div className="mt-3 flex items-center justify-between">
          <span className="font-sans text-lg text-noir transition-colors duration-300 group-hover:text-gold">
            {formatPrice(product.price)}
          </span>
          <span className="flex items-center gap-1 text-xs text-noir/55">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            {product.rating.toFixed(1)} · {product.reviews}
          </span>
        </div>

        <button
          type="button"
          onClick={order}
          className="shine mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-noir py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-ivory transition-all duration-500 hover:-translate-y-0.5 hover:shadow-gold"
        >
          <WhatsAppGlyph size={15} />
          Commander
        </button>
      </div>
    </article>
  );
}
