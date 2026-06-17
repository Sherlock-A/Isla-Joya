"use client";

import { Heart, Star } from "lucide-react";
import { useWishlist } from "@/lib/useWishlist";
import Image from "next/image";
import Link from "next/link";
import type { Product, Tone } from "@/lib/products";
import { cn, formatPrice } from "@/lib/utils";
import { openWhatsApp, waMessages } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import { Badge } from "./Badge";
import { WhatsAppGlyph } from "./icons";

const toneBg: Record<Tone, string> = {
  gold: "linear-gradient(150deg,#efe2c2,#c6a15b)",
  rose: "linear-gradient(150deg,#ecd6d6,#c08081)",
  ivory: "linear-gradient(150deg,#ffffff,#e4d8c6)",
  champagne: "linear-gradient(150deg,#f4e8cd,#e7d3a9)",
  nude: "linear-gradient(150deg,#efe0d1,#d9bca5)",
  noir: "linear-gradient(150deg,#3a3026,#17120d)",
};

const stripes =
  "repeating-linear-gradient(115deg, rgba(255,255,255,0.16) 0 1.5px, transparent 1.5px 13px)";

export function ProductCard({ product }: { product: Product }) {
  const { isWished, toggle } = useWishlist();
  const wished = isWished(product.slug);
  const dark = product.tone === "noir";

  const order = () =>
    openWhatsApp({
      message: waMessages.product(product.name, product.material),
      source: "product_card",
      productSlug: product.slug,
      productName: product.name,
    });

  const toggleWish = () => {
    if (!wished) track("wishlist_add", { productSlug: product.slug, productName: product.name });
    toggle(product.slug);
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-floating">
      <div className="relative h-60 overflow-hidden" style={{ background: toneBg[product.tone] }}>
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

        {product.badge && (
          <div className="absolute left-4 top-4 z-10">
            <Badge variant={product.badge} />
          </div>
        )}

        <button
          type="button"
          onClick={toggleWish}
          aria-label="Add to wishlist"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-noir backdrop-blur transition hover:scale-110"
        >
          <Heart className={cn("h-4 w-4", wished && "fill-rose text-rose")} />
        </button>

        <span
          className={cn(
            "absolute inset-x-0 bottom-4 text-center text-[11px] uppercase tracking-[0.22em]",
            dark ? "text-ivory/70" : "text-noir/55",
          )}
        >
          product · {product.category.slice(0, -1)}
        </span>

        {/* Hover → product detail page */}
        <Link
          href={`/products/${product.slug}`}
          onClick={() => track("view_product", { productSlug: product.slug, productName: product.name })}
          className="absolute inset-0 z-10 flex items-end justify-center bg-gradient-to-t from-noir/45 to-transparent pb-16 opacity-0 transition duration-500 group-hover:opacity-100"
        >
          <span className="rounded-full bg-ivory/95 px-5 py-2 text-[11px] uppercase tracking-[0.2em] text-noir">
            Voir le produit
          </span>
        </Link>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow text-[11px]">{product.material}</p>
        <h3 className="mt-2 font-display text-xl leading-tight text-noir">{product.name}</h3>

        <div className="mt-2.5 flex items-center justify-between">
          <span className="font-sans text-lg text-noir">{formatPrice(product.price)}</span>
          <span className="flex items-center gap-1 text-xs text-noir/60">
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
          Order on WhatsApp
        </button>
      </div>
    </article>
  );
}
