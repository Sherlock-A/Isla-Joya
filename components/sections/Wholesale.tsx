"use client";

import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppGlyph } from "@/components/ui/icons";
import { openWhatsApp, waMessages } from "@/lib/whatsapp";

const benefits = [
  "Wholesale pricing from 12+ pieces",
  "Low minimum order with fast restock",
  "Ready-to-sell packaging & content",
  "A dedicated WhatsApp account manager",
];

const stats = [
  { n: "50+", l: "Boutique partners" },
  { n: "2", l: "Markets · MA & ES" },
  { n: "48h", l: "Avg. dispatch" },
];

export function Wholesale() {
  const enquire = () => openWhatsApp({ message: waMessages.wholesale(), source: "wholesale" });

  return (
    <section id="wholesale" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="overflow-hidden rounded-3xl bg-noir text-ivory shadow-floating">
          <div className="grid gap-10 p-9 sm:p-14 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <p className="eyebrow mb-4">Wholesale Program</p>
              <h2 className="font-display text-4xl text-ivory sm:text-5xl">
                Build your business on <span className="gold-text">light</span>.
              </h2>
              <p className="mt-5 font-serif text-xl text-pearl/75">
                For the boutiques that dress the modern woman — couture-level design at a
                wholesale promise.
              </p>
              <ul className="mt-8 space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-pearl/85">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={enquire}
                  className="shine inline-flex items-center gap-2 rounded-full gold-surface px-7 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-noir transition hover:-translate-y-0.5 hover:shadow-gold"
                >
                  <WhatsAppGlyph size={15} />
                  Become a Stockist
                </button>
                <button
                  type="button"
                  onClick={enquire}
                  className="inline-flex items-center rounded-full border border-ivory/40 px-7 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-ivory transition hover:bg-ivory hover:text-noir"
                >
                  Wholesale enquiry
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-3 gap-4">
                {stats.map((s) => (
                  <div
                    key={s.l}
                    className="rounded-2xl border border-ivory/10 bg-ivory/5 p-5 text-center"
                  >
                    <p className="gold-text font-display text-3xl sm:text-4xl">{s.n}</p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-pearl/55">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border border-ivory/10 bg-ivory/5 p-6">
                <p className="font-serif text-lg italic text-pearl/80">
                  “Luxury you can build a business on.”
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
