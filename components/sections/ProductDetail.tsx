"use client";

import { Star } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { openWhatsApp, waMessages } from "@/lib/whatsapp";
import { Badge } from "@/components/ui/Badge";
import { WhatsAppGlyph } from "@/components/ui/icons";
import { ProductImageGallery } from "@/components/ui/ProductImageGallery";
import { useWishlist } from "@/lib/useWishlist";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

export function ProductDetail({ product }: { product: Product }) {
  const { isWished, toggle } = useWishlist();
  const wished = isWished(product.slug);

  const order = () =>
    openWhatsApp({
      message: waMessages.product(product.name, product.material),
      source: "product_page",
      productSlug: product.slug,
      productName: product.name,
    });

  const toggleWish = () => {
    if (!wished) track("wishlist_add", { productSlug: product.slug, productName: product.name });
    toggle(product.slug);
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8">
      <Link
        href={`/collections/${product.category}`}
        className="eyebrow text-[11px] text-noir/50 hover:text-gold transition-colors"
      >
        ← {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        {/* Gallery */}
        <div className="relative">
          {product.badge && (
            <div className="absolute left-4 top-4 z-10">
              <Badge variant={product.badge} />
            </div>
          )}
          <ProductImageGallery
            images={product.images}
            name={product.name}
            tone={product.tone}
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <p className="eyebrow text-[11px]">{product.category.slice(0, -1)}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-noir">{product.name}</h1>
          <p className="mt-2 text-lg text-noir/60">{product.material}</p>

          <div className="mt-5 flex items-center gap-4">
            <span className="font-sans text-3xl font-light text-noir">{formatPrice(product.price)}</span>
            <span className="flex items-center gap-1 text-sm text-noir/55">
              <Star className="h-4 w-4 fill-gold text-gold" />
              {product.rating.toFixed(1)} · {product.reviews} avis
            </span>
          </div>

          {product.description && (
            <p className="mt-5 text-sm leading-relaxed text-noir/65 border-l-2 border-gold/50 pl-4">
              {product.description}
            </p>
          )}

          <div className="mt-8 space-y-3">
            <button
              type="button"
              onClick={order}
              className="shine flex w-full items-center justify-center gap-3 rounded-full bg-noir py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-ivory transition-all duration-500 hover:-translate-y-0.5 hover:shadow-gold"
            >
              <WhatsAppGlyph size={16} />
              Commander sur WhatsApp
            </button>
            <button
              type="button"
              onClick={toggleWish}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-full border py-3 text-[12px] uppercase tracking-[0.18em] transition-all duration-300",
                wished
                  ? "border-rose bg-rose/5 text-rose"
                  : "border-noir/20 text-noir hover:border-noir/50",
              )}
            >
              <Heart className={cn("h-4 w-4", wished && "fill-rose")} />
              {wished ? "Dans votre wishlist" : "Ajouter à la wishlist"}
            </button>
            <p className="text-center text-xs text-noir/40">
              Confirmation de prix · Livraison rapide · Paiement à la livraison disponible
            </p>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-4 border-t border-noir/10 pt-8">
            {[
              { label: "Matière", value: product.material },
              { label: "Catégorie", value: product.category },
              { label: "Note", value: `${product.rating.toFixed(1)} / 5` },
              { label: "Avis clients", value: `${product.reviews} avis` },
            ].map(({ label, value }) => (
              <div key={label}>
                <dt className="text-xs uppercase tracking-widest text-noir/40">{label}</dt>
                <dd className="mt-1 font-display text-noir">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
