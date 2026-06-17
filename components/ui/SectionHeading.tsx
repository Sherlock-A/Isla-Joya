import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  light?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2
        className={cn(
          "font-display text-[2.1rem] leading-[1.06] sm:text-5xl",
          light ? "text-ivory" : "text-noir",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-5 font-serif text-lg leading-relaxed sm:text-xl",
            light ? "text-pearl/75" : "text-noir/65",
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
