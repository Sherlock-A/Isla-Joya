import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { categories, type Category } from "@/lib/products";
import { RingIcon, NecklaceIcon, BraceletIcon, EarringsIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

type IconType = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const icons: Record<Category, IconType> = {
  rings:     RingIcon,
  necklaces: NecklaceIcon,
  bracelets: BraceletIcon,
  earrings:  EarringsIcon,
};

const grad: Record<string, string> = {
  gold:      "linear-gradient(150deg,#efe2c2,#c6a15b)",
  champagne: "linear-gradient(150deg,#f4e8cd,#e7d3a9)",
  nude:      "linear-gradient(150deg,#efe0d1,#d9bca5)",
  rose:      "linear-gradient(150deg,#ecd6d6,#c08081)",
};

export function Collections() {
  return (
    <section id="collections" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Collections"
          title={
            <>
              Find your <span className="gold-text">light</span>
            </>
          }
          subtitle="Four families, one signature — choose where your story begins."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => {
            const Icon = icons[c.key];
            return (
              <Reveal key={c.key} delay={i * 0.08}>
                <Link
                  href={`/collections/${c.key}`}
                  className="group block w-full overflow-hidden rounded-2xl bg-white text-left shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-floating"
                >
                  <div
                    className="relative grid h-52 place-items-center"
                    style={{ background: grad[c.tone] }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(115deg, rgba(255,255,255,0.16) 0 1.5px, transparent 1.5px 13px)",
                      }}
                    />
                    <Icon size={52} className="relative text-noir/70 transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="font-display text-xl text-noir">{c.label}</h3>
                    <p className="mt-1 text-sm text-noir/60">{c.blurb}</p>
                    <span className="eyebrow mt-3 inline-block text-[11px]">Discover →</span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
