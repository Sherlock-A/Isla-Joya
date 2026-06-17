import { fetchBestSellers } from "@/lib/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export async function BestSellers() {
  const items = await fetchBestSellers();
  return (
    <section id="best-sellers" className="bg-pearl/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Best Sellers"
          title={
            <>
              Loved by <span className="gold-text">thousands</span>
            </>
          }
          subtitle="The pieces our community reaches for again and again."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.06}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
