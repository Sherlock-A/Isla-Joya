"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, ArrowRight, ChevronLeft } from "lucide-react";
import type { Product, Tone, Category } from "@/lib/products";
import { filterForAdvisor, type AdvisorFilters } from "@/lib/recommendations";
import { openWhatsApp, waMessages } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/utils";

interface Props {
  allProducts: Product[];
}

type Step = 0 | 1 | 2 | 3 | 4;

const stepVariants = {
  enter:  { opacity: 0, y: 18 },
  center: { opacity: 1, y: 0,  transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  exit:   { opacity: 0, y: -14, transition: { duration: 0.22 } },
};

const TONES: { key: Tone; label: string; color: string }[] = [
  { key: "gold",      label: "Or",         color: "#c6a15b" },
  { key: "rose",      label: "Rose",        color: "#c08081" },
  { key: "ivory",     label: "Perle",       color: "#efebe3" },
  { key: "champagne", label: "Champagne",   color: "#e7d3a9" },
];

const CATEGORIES: { key: Category; label: string; icon: string }[] = [
  { key: "rings",     label: "Bague",    icon: "💍" },
  { key: "necklaces", label: "Collier",  icon: "📿" },
  { key: "bracelets", label: "Bracelet", icon: "✨" },
  { key: "earrings",  label: "Boucles",  icon: "💎" },
];

export function JewelryAdvisor({ allProducts }: Props) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(0);
  const [filters, setFilters] = useState<AdvisorFilters>({});
  const [results, setResults] = useState<Product[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);

  const choose = (key: keyof AdvisorFilters, value: AdvisorFilters[keyof AdvisorFilters]) => {
    const next: AdvisorFilters = { ...filters, [key]: value };
    setFilters(next);
    if (step < 3) {
      setStep((s) => (s + 1) as Step);
    } else {
      // Final step — compute results
      setResults(filterForAdvisor(next, allProducts, 3));
      setStep(4);
    }
  };

  const reset = () => { setStep(0); setFilters({}); setResults([]); };

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <>
      {/* Floating trigger */}
      <motion.button
        type="button"
        aria-label="Assistant bijoux"
        onClick={() => { setOpen(true); reset(); }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="group fixed bottom-24 left-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-ivory shadow-lg ring-1 ring-noir/10 transition-all duration-300 hover:ring-gold/50"
      >
        <Sparkles className="h-5 w-5 text-gold transition-transform duration-300 group-hover:scale-110" />
        <span className="pointer-events-none absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-ivory px-3 py-1.5 text-[11px] font-medium text-noir/70 opacity-0 shadow-md ring-1 ring-noir/10 transition-opacity duration-200 group-hover:opacity-100">
          Trouvez votre pièce
        </span>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[149] bg-noir/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              ref={panelRef}
              initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
              animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
              exit={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
              className="fixed bottom-0 left-0 right-0 z-[150] mx-auto max-w-sm overflow-hidden rounded-t-3xl bg-ivory pb-safe-area-inset-bottom shadow-floating sm:bottom-8 sm:left-8 sm:right-auto sm:rounded-3xl"
            >
              {/* Gold band */}
              <div className="h-1 w-full gold-surface" />

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-2">
                  {step > 0 && step < 4 && (
                    <button
                      type="button"
                      onClick={() => setStep((s) => (s - 1) as Step)}
                      className="mr-1 rounded-full p-1 text-noir/40 hover:bg-noir/5 hover:text-noir"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                  )}
                  <Sparkles className="h-4 w-4 text-gold" />
                  <span className="font-medium text-noir text-sm">Conseiller bijoux</span>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-7 w-7 place-items-center rounded-full text-noir/40 hover:bg-noir/5 hover:text-noir"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Progress dots */}
              {step < 4 && (
                <div className="flex justify-center gap-1.5 pb-1">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${i <= step ? "w-5 bg-gold" : "w-1.5 bg-noir/15"}`}
                    />
                  ))}
                </div>
              )}

              {/* Steps */}
              <div className="min-h-[280px] overflow-hidden px-5 pb-6 pt-3">
                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div key="s0" variants={stepVariants} initial="enter" animate="center" exit="exit">
                      <h3 className="mb-1 font-display text-lg text-noir">C&apos;est pour qui ?</h3>
                      <p className="mb-5 text-xs text-noir/50">Je vais vous guider vers la pièce parfaite.</p>
                      <div className="space-y-3">
                        {[
                          { label: "Pour moi", desc: "Une pièce qui me ressemble" },
                          { label: "Un cadeau", desc: "Pour quelqu'un de spécial" },
                        ].map(({ label, desc }) => (
                          <button
                            key={label}
                            type="button"
                            onClick={() => choose("forGift", label === "Un cadeau")}
                            className="group flex w-full items-center justify-between rounded-xl border border-noir/12 px-4 py-3.5 text-left transition hover:border-gold/50 hover:bg-gold/5"
                          >
                            <div>
                              <p className="text-sm font-medium text-noir">{label}</p>
                              <p className="text-[11px] text-noir/45">{desc}</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-noir/25 transition group-hover:text-gold" />
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 1 && (
                    <motion.div key="s1" variants={stepVariants} initial="enter" animate="center" exit="exit">
                      <h3 className="mb-1 font-display text-lg text-noir">Quel budget ?</h3>
                      <p className="mb-5 text-xs text-noir/50">Choisissez votre fourchette.</p>
                      <div className="space-y-3">
                        {[
                          { label: "Moins de 60€", key: "low" as const, desc: "Élégant & accessible" },
                          { label: "60€ – 100€",   key: "mid" as const, desc: "Qualité premium" },
                          { label: "Plus de 100€", key: "high" as const, desc: "Pièce d'exception" },
                        ].map(({ label, key, desc }) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => choose("budget", key)}
                            className="group flex w-full items-center justify-between rounded-xl border border-noir/12 px-4 py-3.5 text-left transition hover:border-gold/50 hover:bg-gold/5"
                          >
                            <div>
                              <p className="text-sm font-medium text-noir">{label}</p>
                              <p className="text-[11px] text-noir/45">{desc}</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-noir/25 transition group-hover:text-gold" />
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="s2" variants={stepVariants} initial="enter" animate="center" exit="exit">
                      <h3 className="mb-1 font-display text-lg text-noir">Quelle ambiance ?</h3>
                      <p className="mb-5 text-xs text-noir/50">Votre palette de couleurs préférée.</p>
                      <div className="grid grid-cols-2 gap-3">
                        {TONES.map(({ key, label, color }) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => choose("tone", key)}
                            className="group flex flex-col items-center gap-2 rounded-xl border border-noir/12 py-4 transition hover:border-gold/40"
                          >
                            <div
                              className="h-8 w-8 rounded-full ring-2 ring-offset-2 transition group-hover:ring-gold"
                              style={{ background: color }}
                            />
                            <span className="text-[12px] font-medium text-noir">{label}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="s3" variants={stepVariants} initial="enter" animate="center" exit="exit">
                      <h3 className="mb-1 font-display text-lg text-noir">Quelle pièce ?</h3>
                      <p className="mb-5 text-xs text-noir/50">Le type de bijou qui vous attire.</p>
                      <div className="grid grid-cols-2 gap-3">
                        {CATEGORIES.map(({ key, label, icon }) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => choose("category", key)}
                            className="group flex flex-col items-center gap-2 rounded-xl border border-noir/12 py-4 transition hover:border-gold/40 hover:bg-gold/5"
                          >
                            <span className="text-2xl">{icon}</span>
                            <span className="text-[12px] font-medium text-noir">{label}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div key="s4" variants={stepVariants} initial="enter" animate="center" exit="exit">
                      <h3 className="mb-1 font-display text-lg text-noir">
                        {results.length > 0 ? "Votre sélection" : "Aucun bijou trouvé"}
                      </h3>
                      <p className="mb-4 text-xs text-noir/50">
                        {results.length > 0
                          ? "Nos meilleures correspondances pour vous."
                          : "Élargissez vos critères ou contactez-nous."}
                      </p>

                      {results.length > 0 ? (
                        <div className="space-y-3">
                          {results.map((p, i) => (
                            <motion.div
                              key={p.slug}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.08 }}
                              className="flex items-center gap-3 rounded-xl border border-noir/10 p-3"
                            >
                              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-pearl">
                                {p.images[0] ? (
                                  <Image src={p.images[0]} alt={p.name} fill sizes="48px" className="object-cover" unoptimized />
                                ) : (
                                  <div className="h-full w-full bg-gradient-to-br from-champagne to-gold/30" />
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-[12px] font-medium text-noir">{p.name}</p>
                                <p className="text-[11px] text-gold font-medium">{formatPrice(p.price)}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => openWhatsApp({ source: "advisor", productName: p.name, message: waMessages.product(p.name, p.material) })}
                                className="shrink-0 rounded-lg bg-[#25d366] px-2.5 py-1.5 text-[11px] font-semibold text-white transition hover:opacity-90"
                              >
                                Commander
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => openWhatsApp({ source: "advisor", message: waMessages.general() })}
                          className="w-full rounded-xl bg-[#25d366] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                        >
                          Parler à un conseiller WhatsApp
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={reset}
                        className="mt-4 w-full text-center text-[11px] uppercase tracking-widest text-noir/40 transition hover:text-noir/60"
                      >
                        Recommencer
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
