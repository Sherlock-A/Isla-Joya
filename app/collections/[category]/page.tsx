import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CollectionFilters } from "@/components/ui/CollectionFilters";
import { categories, fetchByCategory, type Category } from "@/lib/products";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.key }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ category: string }> },
): Promise<Metadata> {
  const { category } = await params;
  const cat = categories.find((c) => c.key === category);
  if (!cat) return {};

  return {
    title: `${cat.label} — ${site.name}`,
    description: `Collection ${cat.label} Isla Joya — ${cat.blurb}`,
    openGraph: {
      title: `${cat.label} · ${site.name}`,
      description: cat.blurb,
      url: `${site.url}/collections/${cat.key}`,
      siteName: site.name,
    },
  };
}

export default async function CollectionPage(
  { params }: { params: Promise<{ category: string }> },
) {
  const { category } = await params;
  const cat = categories.find((c) => c.key === category);
  if (!cat) notFound();

  const products = await fetchByCategory(category as Category);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
      { "@type": "ListItem", position: 2, name: cat.label, item: `${site.url}/collections/${cat.key}` },
    ],
  };

  return (
    <main className="min-h-screen bg-ivory pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <SectionHeading
          eyebrow="Collection"
          title={<>{cat.label}</>}
          subtitle={cat.blurb}
        />

        {products.length === 0 ? (
          <p className="mt-14 text-center text-noir/50">
            Aucun produit disponible dans cette collection pour le moment.
          </p>
        ) : (
          <CollectionFilters products={products} />
        )}
      </section>
    </main>
  );
}
