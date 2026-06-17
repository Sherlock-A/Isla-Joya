import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { fetchTestimonials } from "@/lib/products";

export async function Testimonials() {
  const reviews = await fetchTestimonials();

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              Words from our <span className="gold-text">women</span>
            </>
          }
          subtitle="Refined, feminine, quietly luxurious — and trusted on both sides of the Mediterranean."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-2xl bg-white p-8 shadow-soft">
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-gold" />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 font-serif text-lg italic leading-relaxed text-noir/80">
                  "{r.quote}"
                </blockquote>
                <figcaption className="mt-6">
                  <p className="font-display text-lg text-noir">{r.name}</p>
                  {r.city && <p className="text-sm text-noir/55">{r.city} · Verified</p>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
