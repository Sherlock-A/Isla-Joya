"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  fadeUp, fadeIn, scaleIn, clipReveal, blurIn,
  staggerContainer,
} from "@/lib/motionVariants";

type RevealVariant = "fadeUp" | "fadeIn" | "scale" | "clip" | "blur";

const variantMap = {
  fadeUp,
  fadeIn,
  scale:  scaleIn,
  clip:   clipReveal,
  blur:   blurIn,
};

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: RevealVariant;
  /** If true, wraps children in a stagger container — children must use motion components */
  stagger?: number;
  once?: boolean;
  margin?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export function Reveal({
  children,
  delay = 0,
  className,
  variant = "fadeUp",
  stagger,
  once = true,
  margin = "-80px",
  as = "div",
}: RevealProps) {
  const Tag = motion[as as keyof typeof motion] as typeof motion.div;
  const variants = variantMap[variant];

  if (stagger !== undefined) {
    return (
      <Tag
        className={className}
        initial="hidden"
        whileInView="show"
        viewport={{ once, margin }}
        variants={staggerContainer(stagger)}
      >
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin }}
      variants={variants}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
