"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { openWhatsApp, waMessages } from "@/lib/whatsapp";
import { WhatsAppGlyph } from "@/components/ui/icons";
import { SearchBar, SearchTrigger } from "@/components/ui/SearchBar";

function scrollToHash(href: string) {
  const id = href.split("#")[1];
  const el = id ? document.getElementById(id) : null;
  if (!el) return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenis = (window as any).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: -90 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onNav = (href: string) => {
    setOpen(false);
    scrollToHash(href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500",
          scrolled ? "bg-ivory/90 py-3 shadow-soft backdrop-blur-md" : "bg-transparent py-5",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" aria-label="Isla Joya — home">
            <span
              className={cn(
                "grid h-9 w-9 place-items-center rounded-full border font-display text-sm transition-colors",
                scrolled ? "border-gold/60 text-noir" : "border-gold/70 text-ivory",
              )}
            >
              IJ
            </span>
            <span
              className={cn(
                "font-display text-lg tracking-[0.34em] transition-colors",
                scrolled ? "text-noir" : "text-ivory",
              )}
            >
              ISLA&nbsp;JOYA
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 md:flex">
            {site.nav.map((item) => (
              <button
                key={item.href}
                onClick={() => onNav(item.href)}
                className={cn(
                  "text-xs font-medium uppercase tracking-[0.18em] transition-colors hover:text-gold",
                  scrolled ? "text-noir/80" : "text-ivory/85",
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <SearchTrigger onClick={() => setSearchOpen(true)} dark={!scrolled} />

            <div
              className={cn(
                "hidden items-center gap-2 text-[11px] tracking-[0.2em] lg:flex",
                scrolled ? "text-noir/60" : "text-ivory/70",
              )}
              title="Multi-language — coming soon"
            >
              {site.languages.map((l, i) => (
                <span key={l} className={i === 0 ? "text-gold" : "opacity-60"}>
                  {l}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={() => openWhatsApp({ message: waMessages.general(), source: "navbar" })}
              className="shine hidden items-center gap-2 rounded-full gold-surface px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-noir transition hover:-translate-y-0.5 hover:shadow-gold sm:inline-flex"
            >
              <WhatsAppGlyph size={15} />
              WhatsApp
            </button>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className={cn("md:hidden", scrolled ? "text-noir" : "text-ivory")}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile overlay */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-50 flex flex-col bg-noir px-8 py-7 text-ivory md:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg tracking-[0.34em]">ISLA&nbsp;JOYA</span>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close menu">
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Search in mobile menu */}
              <button
                type="button"
                onClick={() => { setOpen(false); setSearchOpen(true); }}
                className="mt-8 flex items-center gap-3 rounded-full border border-ivory/20 px-5 py-3 text-sm text-ivory/60 transition hover:border-ivory/40 hover:text-ivory/80"
              >
                <span className="text-xs">Rechercher un bijou…</span>
              </button>

              <nav className="mt-10 flex flex-col gap-7">
                {site.nav.map((item, i) => (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * i + 0.1 }}
                    onClick={() => onNav(item.href)}
                    className="text-left font-display text-3xl text-ivory transition-colors hover:text-gold"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openWhatsApp({ message: waMessages.general(), source: "navbar" });
                }}
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-full gold-surface px-7 py-4 text-xs font-medium uppercase tracking-[0.18em] text-noir"
              >
                <WhatsAppGlyph size={16} />
                Order on WhatsApp
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
