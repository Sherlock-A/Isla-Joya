import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchAllProducts, fetchByCategory, fetchProduct, STORAGE_URL } from "@/lib/products";
import { ProductDetail } from "@/components/sections/ProductDetail";
import { RecommendedSection } from "@/components/sections/RecommendedSection";
import { StickyOrderBar } from "@/components/ui/StickyOrderBar";
import { RecentlyViewedTracker } from "@/components/ui/RecentlyViewedTracker";
import { RecentlyViewed } from "@/components/ui/RecentlyViewed";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  const products = await fetchAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProduct(slug);
  if (!product) return {};

  const ogImage = product.images[0]
    ? [{ url: product.images[0].startsWith("http") ? product.images[0] : `${STORAGE_URL}/${product.images[0]}`, width: 800, height: 800, alt: product.name }]
    : [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Isla Joya" }];

  return {
    title: `${product.name} — ${site.name}`,
    description: product.description ?? `${product.name} · ${product.material}. Bijou de créateur disponible exclusivement via Isla Joya.`,
    openGraph: {
      title: product.name,
      description: `${product.material} · ${product.category}`,
      url: `${site.url}/products/${slug}`,
      siteName: site.name,
      type: "website",
      images: ogImage,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      images: ogImage.map((i) => i.url),
    },
  };
}

export default async function ProductPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const product = await fetchProduct(slug);
  if (!product) notFound();

  const allProducts = await fetchAllProducts();
  const related = (await fetchByCategory(product.category))
    .filter((p) => p.slug !== slug)
    .slice(0, 4);

  const resolveImg = (src: string) =>
    src.startsWith("http") ? src : `${STORAGE_URL}/${src}`;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? `${product.name} · ${product.material}. Bijou de créateur Isla Joya.`,
    image: product.images.map(resolveImg),
    brand: { "@type": "Brand", name: "Isla Joya" },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${site.url}/products/${slug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
      { "@type": "ListItem", position: 2, name: "Collections", item: `${site.url}/collections/${product.category}` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${site.url}/products/${slug}` },
    ],
  };

  return (
    <main className="min-h-screen bg-ivory pt-20">
      <RecentlyViewedTracker product={product} />
      <ProductDetail product={product} />

      <RecentlyViewed excludeSlug={slug} />
      <RecommendedSection reference={product} pool={allProducts} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <StickyOrderBar productName={product.name} material={product.material} price={product.price} />
    </main>
  );
}
