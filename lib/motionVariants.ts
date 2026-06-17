import type { Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const easeSharp = [0.76, 0, 0.24, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.9, ease } },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  show:   { opacity: 1, y: 0,   transition: { duration: 0.8, ease } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.7, ease } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show:   { opacity: 1, scale: 1,    transition: { duration: 0.8, ease } },
};

export const clipReveal: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)", opacity: 1 },
  show:   { clipPath: "inset(0% 0 0 0)",   opacity: 1, transition: { duration: 1.1, ease: easeSharp } },
};

export const clipRevealHorizontal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)", opacity: 1 },
  show:   { clipPath: "inset(0 0% 0 0)",   opacity: 1, transition: { duration: 0.9, ease: easeSharp } },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(14px)", scale: 1.04 },
  show:   { opacity: 1, filter: "blur(0px)",  scale: 1,    transition: { duration: 1.0, ease } },
};

export const letterReveal: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show:   { y: 0, opacity: 1, transition: { duration: 0.75, ease } },
};

export const wordReveal: Variants = {
  hidden: { y: 30, opacity: 0, rotateX: 12 },
  show:   { y: 0,  opacity: 1, rotateX: 0,  transition: { duration: 0.8, ease } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  show:   { opacity: 1, x: 0,   transition: { duration: 0.85, ease } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.85, ease } },
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show:   { transition: { staggerChildren: stagger, delayChildren } },
});

/** Wraps children that use letterReveal or wordReveal — adds perspective */
export const textContainer: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.055, delayChildren: 0.1 } },
};

export const floatVariant: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-6, 6, -6],
    transition: { duration: 5, ease: "easeInOut", repeat: Infinity },
  },
};

export const pulseVariant: Variants = {
  initial: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 1.06, 1],
    opacity: [1, 0.85, 1],
    transition: { duration: 2.4, ease: "easeInOut", repeat: Infinity },
  },
};

/** Page-level transition for route changes */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0,   transition: { duration: 0.6, ease } },
  exit:   { opacity: 0, y: -12, transition: { duration: 0.4, ease } },
};
