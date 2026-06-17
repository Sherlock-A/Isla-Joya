"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, X, ArrowRight, Loader2 } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/products";

const BASE = process.env.NEXT_PUBLIC_LARAVEL_API_URL ?? "http://localhost:8000/api/v1";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SearchBar({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const search = (term: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!term.trim()) { setResults([]); return; }

    setLoading(true);
    timerRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`${BASE}/products?q=${encodeURIComponent(term)}&limit=6`);
        if (!res.ok) return;
        const raw: Record<string, unknown>[] = await res.json();
        const normalized = raw.map((p) => ({
          id: String(p.id),
          slug: p.slug as string,
          name: p.name as string,
          material: p.material as string,
          price: Number(p.price),
          category: p.category as Product["category"],
          badge: (p.badge ?? undefined) as Product["badge"],
          rating: Number(p.rating),
          reviews: Number(p.reviews),
          tone: p.tone as Product["tone"],
          bestseller: Boolean(p.is_bestseller),
          isNew: Boolean(p.is_new),
          images: Array.isArray(p.images) ? (p.images as string[]) : [],
          description: (p.description as string | null) ?? undefined,
        }));
        setResults(normalized);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 280);
  };

  const goTo = (slug: string) => {
    onClose();
    startTransition(() => { router.push(`/products/${slug}`); });
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[150] flex items-start justify-center bg-noir/60 backdrop-blur-sm pt-20 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl bg-ivory shadow-floating"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input row */}
        <div className="flex items-center gap-3 border-b border-noir/10 px-5 py-4">
          {loading || isPending
            ? <Loader2 className="h-5 w-5 shrink-0 animate-spin text-gold" />
            : <Search className="h-5 w-5 shrink-0 text-noir/40" />}
          <input
            ref={inputRef}
            type="search"
            placeholder="Chercher un bijou, matière…"
            value={query}
            onChange={(e) => { setQuery(e.target.value); search(e.target.value); }}
            className="flex-1 bg-transparent text-sm text-noir placeholder-noir/35 outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full text-noir/40 transition hover:bg-noir/5 hover:text-noir"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <ul className="max-h-[60vh] divide-y divide-noir/5 overflow-y-auto">
            {results.map((product) => (
              <li key={product.slug}>
                <button
                  type="button"
                  onClick={() => goTo(product.slug)}
                  className="flex w-full items-center gap-4 px-5 py-3.5 text-left transition-colors hover:bg-gold/5"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-pearl">
                    {product.images[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-champagne to-gold/30" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-noir">{product.name}</p>
                    <p className="text-xs text-noir/50">{product.material}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="text-sm font-medium text-noir">{formatPrice(product.price)}</span>
                    <ArrowRight className="h-4 w-4 text-noir/30" />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Empty state */}
        {query.trim() && !loading && results.length === 0 && (
          <p className="px-5 py-6 text-center text-sm text-noir/45">
            Aucun résultat pour « {query} »
          </p>
        )}

        {/* Hint */}
        {!query && (
          <p className="px-5 py-4 text-xs text-noir/35">
            Tapez le nom d&apos;un bijou, une matière ou une catégorie…
          </p>
        )}

        <div className="border-t border-noir/5 px-5 py-2.5">
          <p className="text-[10px] text-noir/30">
            <kbd className="rounded bg-noir/8 px-1 py-0.5 text-[10px]">↵</kbd> pour naviguer ·{" "}
            <kbd className="rounded bg-noir/8 px-1 py-0.5 text-[10px]">Esc</kbd> pour fermer
          </p>
        </div>
      </div>
    </div>
  );
}

/* Trigger button — rendered inline in Navbar */
export function SearchTrigger({
  onClick,
  dark,
}: {
  onClick: () => void;
  dark: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Rechercher"
      className={cn(
        "grid h-9 w-9 place-items-center rounded-full transition hover:bg-noir/8",
        dark ? "text-ivory" : "text-noir/70",
      )}
    >
      <Search className="h-5 w-5" />
    </button>
  );
}
