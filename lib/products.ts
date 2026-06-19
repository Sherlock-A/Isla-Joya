export type Category = "rings" | "necklaces" | "bracelets" | "earrings";
export type Badge = "new" | "bestseller" | "limited";
export type Tone = "gold" | "rose" | "ivory" | "champagne" | "nude" | "noir";

export interface Product {
  id: string;
  slug: string;
  name: string;
  material: string;
  description?: string;
  price: number;
  category: Category;
  badge?: Badge;
  rating: number;
  reviews: number;
  tone: Tone;
  bestseller?: boolean;
  isNew?: boolean;
  images: string[];
}

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  city: string | null;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export const categories: { key: Category; label: string; blurb: string; tone: Tone }[] = [
  { key: "rings",     label: "Rings",     blurb: "Signets, stacks & statements",  tone: "gold" },
  { key: "necklaces", label: "Necklaces", blurb: "Pendants & fine chains",         tone: "champagne" },
  { key: "bracelets", label: "Bracelets", blurb: "Cuffs, tennis & links",          tone: "nude" },
  { key: "earrings",  label: "Earrings",  blurb: "Hoops, drops & studs",           tone: "rose" },
];

const BASE = process.env.LARAVEL_API_URL ?? "http://localhost:8000/api/v1";

function normalize(raw: Record<string, unknown>): Product {
  return {
    id:         String(raw.id),
    slug:       raw.slug as string,
    name:       raw.name as string,
    material:   raw.material as string,
    price:      Number(raw.price),
    category:   raw.category as Category,
    badge:      (raw.badge ?? undefined) as Badge | undefined,
    rating:     Number(raw.rating),
    reviews:    Number(raw.reviews),
    tone:       raw.tone as Tone,
    bestseller:  Boolean(raw.is_bestseller),
    isNew:       Boolean(raw.is_new),
    images:      Array.isArray(raw.images) ? (raw.images as string[]) : [],
    description: (raw.description as string | null) ?? undefined,
  };
}

async function apiFetch(url: string): Promise<Record<string, unknown>[]> {
  try {
    const res = await fetch(url, { next: { revalidate: 60, tags: ["products"] } });
    if (!res.ok) return [];
    return res.json().catch(() => []);
  } catch {
    return [];
  }
}

export async function fetchAllProducts(): Promise<Product[]> {
  const data = await apiFetch(`${BASE}/products?limit=100`);
  return data.map(normalize);
}

export async function fetchBestSellers(): Promise<Product[]> {
  const data = await apiFetch(`${BASE}/products?bestsellers=1&limit=8`);
  return data.map(normalize);
}

export async function fetchNewArrivals(): Promise<Product[]> {
  const data = await apiFetch(`${BASE}/products?new_arrivals=1&limit=8`);
  return data.map(normalize);
}

export async function fetchByCategory(c: Category): Promise<Product[]> {
  const data = await apiFetch(`${BASE}/products?category=${c}`);
  return data.map(normalize);
}

export async function fetchProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${BASE}/products/${slug}`, {
      next: { revalidate: 60, tags: ["products"] },
    });
    if (!res.ok) return null;
    return normalize(await res.json());
  } catch {
    return null;
  }
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await fetch(`${BASE}/testimonials`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    return res.json().catch(() => []);
  } catch {
    return [];
  }
}

export async function fetchFaqs(): Promise<FaqItem[]> {
  try {
    const res = await fetch(`${BASE}/faqs`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    return res.json().catch(() => []);
  } catch {
    return [];
  }
}

export interface InstagramPost {
  id: number;
  image_url: string;
  caption: string | null;
  post_url: string | null;
  likes: number;
  sort_order: number;
}

export async function fetchInstagramPosts(): Promise<InstagramPost[]> {
  try {
    const res = await fetch(`${BASE}/instagram-posts`, { next: { revalidate: 300, tags: ["instagram"] } });
    if (!res.ok) return [];
    return res.json().catch(() => []);
  } catch {
    return [];
  }
}

export async function fetchTrending(): Promise<Product[]> {
  const data = await apiFetch(`${BASE}/trending?limit=4`);
  // Endpoint returns either Product objects or { product_slug, views } — normalize handles either
  return data.map(normalize);
}

export async function fetchSiteSettings(): Promise<Record<string, string>> {
  try {
    const res = await fetch(`${BASE}/settings`, { next: { revalidate: 300 } });
    if (!res.ok) return {};
    const settings: { key: string; value: string }[] = await res.json();
    return Object.fromEntries(settings.map((s) => [s.key, s.value ?? ""]));
  } catch {
    return {};
  }
}

export const STORAGE_URL =
  (process.env.LARAVEL_API_URL ?? "http://localhost:8000/api/v1").replace("/api/v1", "/storage");
