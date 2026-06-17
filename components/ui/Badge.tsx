import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "new" | "bestseller" | "limited" | "sale" | "stock";

const styles: Record<Variant, string> = {
  new: "bg-noir text-ivory",
  bestseller: "bg-rose text-ivory",
  limited: "gold-surface text-noir",
  sale: "border border-gold text-gold",
  stock: "bg-beige text-noir",
};

const defaults: Record<Variant, string> = {
  new: "New In",
  bestseller: "Bestseller",
  limited: "Limited",
  sale: "-20%",
  stock: "In Stock",
};

export function Badge({
  variant,
  children,
  className,
}: {
  variant: Variant;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em]",
        styles[variant],
        className,
      )}
    >
      {children ?? defaults[variant]}
    </span>
  );
}
