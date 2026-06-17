"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, X, ArrowRight, Loader2, TrendingUp } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/products";
import {
  expandQuery,
  parsePriceConstraint,
  stripPriceConstraint,
  highlightMatches,
} from "@/lib/searchSynonyms";

const BASE = process.env.NEXT_PUBLIC_LARAVEL_API_URL ?? "http://localhost:8000/api/v1";

interface Props {
  open: boolean;
  onClose: () => void;
}

/** Render a product name/material string with <mark> highlights */
function Highlighted({ html }: { html: string }) {
  return (
    <span
      dangerouslySetInnerHTML={{ __html: html }}
      className="[&_mark]:bg-gold/20 [&_mark]:rounded [&_mark]:px-0.5 [&_mark]:text-noir"
    />
  );
}

const QUICK_SEARCHES = ["Bague or", "Collier perle", "Bracelet", "Cadeau"];

export function SearchBar({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setNoResults(false);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const search = (term: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!term.trim()) { setResults([]); setNoResults(false); return; }

    setLoading(true);
    timerRef.current = setTimeout(async () => {
      try {
        // Detect price constraints
        const priceConstraint = parsePriceConstraint(term);
        const cleanTerm = stripPriceConstraint(term);

        // Expand synonyms → send multiple search terms
        const expanded = expandQuery(cleanTerm);
        const primaryQuery = expanded[0] ?? cleanTerm;

        // Build URL with optional price params
        const url = new URL(`${BASE}/products`);
        url.searchParams.set("q", primaryQuery);
        url.searchParams.set("limit", "8");
        if (priceConstraint?.maxPrice) url.searchParams.set("max_price", String(priceConstraint.maxPrice));
        if (priceConstraint?.minPrice) url.searchParams.set("min_price", String(priceConstraint.minPrice));

        const res = await fetch(url.toString());
        if (!res.ok) return;
        const raw: Record<string, unknown>[] = await res.json();
        let normalized = raw.map((p) => ({
          id:          String(p.id),
          slug:        p.slug as string,
          name:        p.name as string,
          material:    p.material as string,
          price:       Number(p.price),
          category:    p.category as Product["category"],
          badge:       (p.badge ?? undefined) as Product["badge"],
          rating:      Number(p.rating),
          reviews:     Number(p.reviews),
          tone:        p.tone as Product["tone"],
          bestseller:  Boolean(p.is_bestseller),
          isNew:       Boolean(p.is_new),
          images:      Array.isArray(p.images) ? (p.images as string[]) : [],
          description: (p.description as string | null) ?? undefined,
        }));

        // If primary query found nothing, try secondary synonyms
        if (normalized.length === 0 && expanded.length > 1) {
          const altUrl = new URL(`${BASE}/products`);
          altUrl.searchParams.set("q", expanded[1]);
          altUrl.searchParams.set("limit", "6");
          const altRes = await fetch(altUrl.toString());
          if (altRes.ok) {
            const altRaw: Record<string, unknown>[] = await altRes.json();
            normalized = altRaw.map((p) => ({
              id:          String(p.id),
              slug:        p.slug as string,
              name:        p.name as string,
              material:    p.material as string,
              price:       Number(p.price),
              category:    p.category as Product["category"],
              badge:       (p.badge ?? undefined) as Product["badge"],
              rating:      Number(p.rating),
              reviews:     Number(p.reviews),
              tone:        p.tone as Product["tone"],
              bestseller:  Boolean(p.is_bestseller),
              isNew:       Boolean(p.is_new),
              images:      Array.isArray(p.images) ? (p.images as string[]) : [],
              description: (p.description as string | null) ?? undefined,
            }));
          }
        }

        setResults(normalized.slice(0, 6));
        setNoResults(normalized.length === 0);
      } catch {
        setResults([]);
        setNoResults(true);
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
      className="fixed inset-0 z-[150] flex items-start justify-center bg-noir/60 backdrop-blur-sm px-4 pt-20"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl bg-ivory shadow-floating"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 border-b border-noir/10 px-5 py-4">
          {loading || isPending
            ? <Loader2 className="h-5 w-5 shrink-0 animate-spin text-gold" />
            : <Search className="h-5 w-5 shrink-0 text-noir/40" />}
          <input
            ref={inputRef}
            type="search"
            placeholder="Bague or, collier perle, moins de 80€…"
            value={query}
            onChange={(e) => { setQuery(e.target.value); search(e.target.value); }}
            className="flex-1 bg-transparent text-sm text-noir placeholder-noir/35 outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(""); setResults([]); setNoResults(false); inputRef.current?.focus(); }}
              className="grid h-7 w-7 place-items-center rounded-full text-noir/40 transition hover:bg-noir/5 hover:text-noir"
            >
              <X className="h-4 w-4" />
            </button>
          )}
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
                    <p className="truncate text-sm font-medium text-noir">
                      <Highlighted html={highlightMatches(product.name, query)} />
                    </p>
                    <p className="text-xs text-noir/50">
                      <Highlighted html={highlightMatches(product.material, query)} />
                    </p>
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

        {/* Intelligent no-result state */}
        {noResults && query.trim() && !loading && (
          <div className="px-5 py-6 text-center">
            <p className="text-sm text-noir/45">Aucun résultat pour « {query} »</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {QUICK_SEARCHES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => { setQuery(s); search(s); }}
                  className="rounded-full border border-noir/15 px-3 py-1.5 text-[11px] uppercase tracking-wider text-noir/60 transition hover:border-gold/50 hover:text-gold"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick searches when empty */}
        {!query && (
          <div className="px-5 py-4">
            <p className="mb-3 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-noir/40">
              <TrendingUp className="h-3 w-3" />
              Recherches populaires
            </p>
            <div className="flex flex-wrap gap-2">
              {QUICK_SEARCHES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => { setQuery(s); search(s); }}
                  className="rounded-full border border-noir/12 px-3 py-1.5 text-[11px] text-noir/55 transition hover:border-gold/40 hover:text-gold"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
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

export function SearchTrigger({ onClick, dark }: { onClick: () => void; dark: boolean }) {
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
