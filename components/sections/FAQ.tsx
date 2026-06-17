import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fetchFaqs } from "@/lib/products";

export async function FAQ() {
  const faqs = await fetchFaqs();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section id="faq" className="bg-pearl/40 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Questions, <span className="gold-text">answered</span>
            </>
          }
        />

        <div className="mt-12 divide-y divide-noir/10 border-y border-noir/10">
          {faqs.map((f) => (
            <details key={f.id} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-noir [&::-webkit-details-marker]:hidden">
                {f.question}
                <Plus className="h-5 w-5 shrink-0 text-gold transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="mt-3 leading-relaxed text-noir/70">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
