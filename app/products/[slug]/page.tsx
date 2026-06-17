import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchAllProducts, fetchByCategory, fetchProduct, STORAGE_URL } from "@/lib/products";
import { ProductDetail } from "@/components/sections/ProductDetail";
import { ProductCard } from "@/components/ui/ProductCard";
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
      <ProductDetail product={product} />

      {related.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 pb-20 sm:px-8">
          <div className="mb-8 border-t border-noir/10 pt-12">
            <p className="eyebrow text-center text-[11px]">Vous aimerez aussi</p>
            <h2 className="mt-2 text-center font-display text-2xl text-noir">Produits similaires</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </main>
  );
}
