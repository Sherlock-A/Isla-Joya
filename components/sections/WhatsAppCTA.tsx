"use client";

import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppGlyph } from "@/components/ui/icons";
import { openWhatsApp, waMessages } from "@/lib/whatsapp";

export function WhatsAppCTA() {
  return (
    <section className="relative overflow-hidden bg-noir py-28 text-center text-ivory">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(198,161,91,0.22),transparent_60%)]" />
      <div className="relative mx-auto max-w-3xl px-6">
        <Reveal>
          <p className="eyebrow mb-5">Order on WhatsApp</p>
          <h2 className="font-display text-4xl leading-[1.05] text-ivory sm:text-6xl">
            Your next heirloom is one <span className="gold-text">message</span> away.
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-serif text-xl text-pearl/75">
            Tell us what you love. We&apos;ll share price, availability and styling — and deliver
            across Morocco and Spain.
          </p>
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => openWhatsApp({ message: waMessages.general(), source: "cta_section" })}
              className="shine inline-flex items-center gap-3 rounded-full gold-surface px-10 py-5 text-sm font-medium uppercase tracking-[0.18em] text-noir transition hover:-translate-y-0.5 hover:shadow-gold"
            >
              <WhatsAppGlyph size={20} />
              Message us on WhatsApp
            </button>
          </div>
          <p className="mt-6 text-sm text-pearl/50">
            Replies within hours · Casablanca &amp; Barcelona
          </p>
        </Reveal>
      </div>
    </section>
  );
}
