"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { openWhatsApp, waMessages } from "@/lib/whatsapp";
import { WhatsAppGlyph, InstagramGlyph } from "@/components/ui/icons";
import { track } from "@/lib/analytics";

export function Footer() {
  const [sent, setSent] = useState(false);

  return (
    <footer id="contact" className="relative overflow-hidden bg-noir text-ivory">
      <div className="grain absolute inset-0" />
      <div className="relative mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
        <p className="font-display text-3xl tracking-[0.3em] sm:text-4xl">ISLA&nbsp;JOYA</p>

        <div className="rule-gold mx-auto my-7 w-40" />

        <p className="font-serif text-xl italic text-pearl/70">{site.tagline}</p>

        <nav className="mt-9 flex flex-wrap justify-center gap-x-9 gap-y-3 text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
          <a href="/#collections" className="transition hover:text-champagne">Collections</a>
          <a href="/#wholesale" className="transition hover:text-champagne">Wholesale</a>
          <a href="/#about" className="transition hover:text-champagne">About</a>
          <a href="/#contact" className="transition hover:text-champagne">Contact</a>
        </nav>

        {/* Early-access signup */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            track("newsletter_signup", { source: "footer" });
            setSent(true);
          }}
          className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            placeholder="Your email for early access"
            className="w-full rounded-full border border-ivory/15 bg-ivory/5 px-5 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-gold/60 focus:outline-none"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full gold-surface px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-noir transition hover:-translate-y-0.5"
          >
            {sent ? "Merci ✨" : "Notify me"}
          </button>
        </form>

        {/* Socials */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="grid h-11 w-11 place-items-center rounded-full border border-ivory/20 transition hover:border-gold hover:text-gold"
          >
            <InstagramGlyph className="h-5 w-5" />
          </a>
          <button
            type="button"
            onClick={() => openWhatsApp({ message: waMessages.general(), source: "footer" })}
            aria-label="WhatsApp"
            className="grid h-11 w-11 place-items-center rounded-full border border-ivory/20 transition hover:border-gold hover:text-gold"
          >
            <WhatsAppGlyph size={18} />
          </button>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs tracking-[0.12em] text-pearl/40">
          <span>Maison de Joaillerie · Morocco 🇲🇦 · España 🇪🇸 · © 2026 Isla Joya</span>
          <span className="hidden sm:inline">·</span>
          <Link href="/privacy" className="hover:text-pearl/70 transition">Confidentialité</Link>
          <Link href="/terms" className="hover:text-pearl/70 transition">CGU</Link>
        </div>
      </div>
    </footer>
  );
}
