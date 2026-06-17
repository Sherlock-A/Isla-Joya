import type { ComponentType, SVGProps } from "react";
import { DiamondIcon, DeliveryIcon, WhatsAppIcon, CrownIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
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

export function WhyChooseUs() {
  return (
    <section id="about" className="bg-noir py-24 text-ivory sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading
          light
          eyebrow="Why Isla Joya"
          title={
            <>
              A house built on <span className="gold-text">light</span>
            </>
          }
          subtitle="Couture-level design at a wholesale promise — luxury you can build a business on."
        />

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="text-center sm:text-left">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold/40 text-gold sm:mx-0">
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
