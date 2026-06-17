import { fetchNewArrivals } from "@/lib/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export async function NewArrivals() {
  const items = await fetchNewArrivals();
  return (
    <section id="new" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="New Arrivals"
          title={
            <>
              Just <span className="gold-text">landed</span>
            </>
          }
          subtitle="Fresh from the atelier — limited first runs, often gone within the week."
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
