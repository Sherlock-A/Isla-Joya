"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "gold" | "outline" | "outline-light" | "ghost" | "link";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 font-sans font-medium rounded-full transition-all duration-500 select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  solid: "bg-noir text-ivory hover:-translate-y-0.5 hover:shadow-floating shine uppercase tracking-[0.18em]",
  gold: "gold-surface text-noir hover:-translate-y-0.5 hover:shadow-gold shine uppercase tracking-[0.18em]",
  outline: "border border-noir/70 text-noir hover:bg-noir hover:text-ivory uppercase tracking-[0.18em]",
  "outline-light": "border border-ivory/40 text-ivory hover:bg-ivory hover:text-noir uppercase tracking-[0.18em]",
  ghost: "text-noir/80 hover:text-gold uppercase tracking-[0.18em]",
  link: "text-gold hover:gap-3 tracking-[0.1em]",
};

const sizes: Record<Size, string> = {
  sm: "text-[11px] px-5 py-2.5",
  md: "text-xs px-7 py-3.5",
  lg: "text-sm px-9 py-4",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { href?: undefined };
type AnchorProps = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & { href: string };

export function Button(props: ButtonProps | AnchorProps) {
  const { variant = "solid", size = "md", className, children, ...rest } = props;
  const cls = cn(base, variants[variant], variant !== "link" && sizes[size], className);

  if (typeof (props as AnchorProps).href === "string") {
    const { ...anchorRest } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={cls} {...anchorRest}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
