"use client";

import { useRef } from "react";
import type { ComponentType, SVGProps } from "react";
import { DiamondIcon, DeliveryIcon, WhatsAppIcon, CrownIcon } from "@/components/ui/icons";
import { useCountUp, useSplitTextReveal } from "@/hooks/useGSAP";
import { Reveal } from "@/components/ui/Reveal";

type IconType = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const features: { Icon: IconType; title: string; text: string }[] = [
  {
    Icon: DiamondIcon,
    title: "Premium materials",
    text: "18K gold vermeil, sparkling zircon and freshwater pearls — crafted to last a lifetime.",
  },
  {
    Icon: DeliveryIcon,
    title: "Delivery you trust",
    text: "Across all of Morocco and to Barcelona, with free shipping on orders over €150.",
  },
  {
    Icon: WhatsAppIcon,
    title: "Order in one message",
    text: "No checkout maze. Tell us what you love on WhatsApp and we handle the rest.",
  },
  {
    Icon: CrownIcon,
    title: "Stockist program",
    text: "Wholesale pricing, low minimums and priority restock for boutiques and resellers.",
  },
];

function CountStat({
  value,
  suffix,
  label,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useCountUp(ref, value, { suffix, duration: 2.2, decimals });
  return (
    <div className="text-center">
      <span ref={ref} className="font-display text-4xl text-gold">{value}{suffix}</span>
      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-pearl/60">{label}</p>
    </div>
  );
}

export function WhyChooseUs() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useSplitTextReveal(headingRef, { stagger: 0.07, start: "top 82%" });

  return (
    <section id="about" className="bg-noir py-24 text-ivory sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Heading */}
        <div className="text-center">
          <p className="eyebrow mb-4">Why Isla Joya</p>
          <h2 ref={headingRef} className="font-display text-4xl leading-tight text-ivory sm:text-5xl">
            A house built on light
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-pearl/60">
            Couture-level design at a wholesale promise — luxury you can build a business on.
          </p>
        </div>

        {/* Stats */}
        <div className="my-16 flex flex-wrap justify-center gap-12 border-y border-ivory/10 py-10">
          <CountStat value={2000} suffix="+" label="Orders shipped" />
          <CountStat value={4.9} suffix="" label="Rating" decimals={1} />
          <CountStat value={150} suffix="€" label="Free shipping from" />
          <CountStat value={4} suffix="" label="Countries" />
        </div>

        {/* Feature grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="text-center sm:text-left">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold/40 text-gold transition-all duration-500 hover:border-gold hover:bg-gold/10 sm:mx-0">
                  <f.Icon size={30} />
                </span>
                <h3 className="mt-6 font-display text-xl text-ivory">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-pearl/65">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
