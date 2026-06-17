"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

/** Animated underline nav link */
function NavLink({
  item,
  scrolled,
  onClick,
}: {
  item: { href: string; label: string };
  scrolled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      key={item.href}
      onClick={onClick}
      className={cn(
        "group relative text-xs font-medium uppercase tracking-[0.18em] transition-colors hover:text-gold",
        scrolled ? "text-noir/80" : "text-ivory/85",
      )}
    >
      {item.label}
      {/* Underline draw */}
      <span
        className="absolute -bottom-0.5 left-0 h-px w-0 origin-left bg-gold transition-all duration-400 group-hover:w-full"
        aria-hidden="true"
      />
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  const onNav = (href: string) => {
    setOpen(false);
    scrollToHash(href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500",
          scrolled ? "bg-ivory/92 py-3 shadow-soft backdrop-blur-md" : "bg-transparent py-5",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Logo — shrinks on scroll */}
          <Link href="/" className="flex items-center gap-3" aria-label="Isla Joya — home">
            <span
              className={cn(
                "relative grid place-items-center rounded-full border font-display transition-all duration-500",
                scrolled
                  ? "h-8 w-8 border-gold/60 text-noir text-xs"
                  : "h-9 w-9 border-gold/70 text-ivory text-sm",
              )}
            >
              IJ
              {/* New arrivals pulse dot */}
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
            </span>
            <span
              className={cn(
                "font-display tracking-[0.34em] transition-all duration-500",
                scrolled ? "text-[0.95rem] text-noir" : "text-lg text-ivory",
              )}
            >
              ISLA&nbsp;JOYA
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 md:flex">
            {site.nav.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                scrolled={scrolled}
                onClick={() => onNav(item.href)}
              />
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-3">
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

        {/* Mobile overlay — clip-path reveal from bottom */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
              animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
              exit={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 z-50 flex flex-col bg-noir px-8 py-7 text-ivory md:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg tracking-[0.34em]">ISLA&nbsp;JOYA</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="transition hover:text-gold"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

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
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i + 0.15, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => onNav(item.href)}
                    className="group relative w-fit text-left font-display text-3xl text-ivory transition-colors hover:text-gold"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 h-px w-0 origin-left bg-gold transition-all duration-400 group-hover:w-full" />
                  </motion.button>
                ))}
              </nav>

              <div className="mt-auto space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openWhatsApp({ message: waMessages.general(), source: "navbar" });
                  }}
                  className="shine inline-flex w-full items-center justify-center gap-2 rounded-full gold-surface px-7 py-4 text-xs font-medium uppercase tracking-[0.18em] text-noir"
                >
                  <WhatsAppGlyph size={16} />
                  Order on WhatsApp
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
