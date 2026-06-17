import { Bodoni_Moda, Cormorant_Garamond, Jost } from "next/font/google";

/** Display / editorial / logo — high-contrast didone with couture drama. */
export const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

/** Serif body & pull-quotes — elegant and warm. */
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

/** Sans / interface — UI, labels, body copy, prices. Geometric, clean. */
export const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const fontVariables = `${bodoni.variable} ${cormorant.variable} ${jost.variable}`;
