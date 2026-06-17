import { fetchTestimonials } from "@/lib/products";
import { TestimonialsCarousel } from "./TestimonialsCarousel";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function Testimonials() {
  const reviews = await fetchTestimonials();

  return (
    <section className="py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="px-6 sm:px-8">
          <SectionHeading
            eyebrow="Testimonials"
            title={
              <>
                Words from our <span className="gold-text">women</span>
              </>
            }
            subtitle="Refined, feminine, quietly luxurious — and trusted on both sides of the Mediterranean."
          />
        </div>

        <div className="mt-14">
          <TestimonialsCarousel reviews={reviews} />
        </div>
      </div>
    </section>
  );
}
