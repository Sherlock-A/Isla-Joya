import type { Product, Tone, Category } from "@/lib/products";

interface ScoredProduct {
  product: Product;
  score: number;
}

/**
 * Scores how relevant `candidate` is to a `reference` product.
 * Purely content-based — no external AI required.
 */
function scoreProduct(candidate: Product, reference: Product): number {
  let s = 0;

  // Same category is the strongest signal
  if (candidate.category === reference.category) s += 40;

  // Matching tone / aesthetic palette
  if (candidate.tone === reference.tone) s += 20;

  // Price proximity (within 30€ → strong match)
  const delta = Math.abs(candidate.price - reference.price);
  if (delta < 15)      s += 18;
  else if (delta < 30) s += 10;
  else if (delta < 60) s += 4;

  // Shared material keyword (first word: "18K", "freshwater", etc.)
  const refMat = reference.material.toLowerCase().split(/\s+/)[0];
  if (candidate.material.toLowerCase().includes(refMat)) s += 12;

  // Boost bestsellers / new arrivals
  if (candidate.badge === "bestseller") s += 8;
  if (candidate.badge === "new")        s += 5;

  // High rating boost
  if (candidate.rating >= 4.9) s += 5;
  else if (candidate.rating >= 4.7) s += 2;

  return s;
}

/**
 * Returns the top `n` recommended products for a given reference product.
 * Excludes the reference itself.
 */
export function getRecommendations(
  reference: Product,
  pool: Product[],
  n = 4,
): Product[] {
  return pool
    .filter((p) => p.slug !== reference.slug)
    .map((p): ScoredProduct => ({ product: p, score: scoreProduct(p, reference) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((r) => r.product);
}

/**
 * Content-based filtering for the JewelryAdvisor quiz.
 */
export interface AdvisorFilters {
  budget?: "low" | "mid" | "high";     // < 60 | 60–100 | > 100
  tone?:   Tone;
  category?: Category;
  forGift?: boolean;
}

export function filterForAdvisor(
  filters: AdvisorFilters,
  pool: Product[],
  n = 3,
): Product[] {
  return pool
    .map((p): ScoredProduct => {
      let s = 0;
      if (filters.tone     && p.tone     === filters.tone)     s += 30;
      if (filters.category && p.category === filters.category) s += 25;
      if (filters.budget === "low"  && p.price < 60)            s += 20;
      if (filters.budget === "mid"  && p.price >= 60 && p.price <= 100) s += 20;
      if (filters.budget === "high" && p.price > 100)           s += 20;
      if (filters.forGift && p.badge === "bestseller")          s += 10;
      if (p.rating >= 4.8) s += 5;
      return { product: p, score: s };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((r) => r.product);
}
