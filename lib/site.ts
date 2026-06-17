/**
 * Central site configuration for Isla Joya.
 * The WhatsApp number is read from NEXT_PUBLIC_WHATSAPP_NUMBER (digits only,
 * with country code, e.g. 212600000000) and falls back to a placeholder so the
 * site is fully functional before the real number is provided.
 */
export const site = {
  name: "Isla Joya",
  legalName: "Isla Joya — Maison de Joaillerie",
  tagline: "Wear your light.",
  taglines: ["Wear your light.", "Modern heirlooms.", "Luxury, made personal."],
  description:
    "Modern fine jewelry, crafted to be remembered. Born between the souks of Morocco and the boulevards of Spain — design-led pieces for women and the boutiques who define modern style.",
  url: "https://islajoya.com",

  // Contact / conversion
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212600000000",
  email: "hello@islajoya.com",
  instagram: "https://www.instagram.com/isla.joya",

  markets: [
    { label: "Maroc", flag: "🇲🇦", city: "Casablanca" },
    { label: "España", flag: "🇪🇸", city: "Barcelona" },
  ],

  nav: [
    { label: "Collections", href: "/#collections" },
    { label: "Best Sellers", href: "/#best-sellers" },
    { label: "Wholesale", href: "/#wholesale" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ],

  languages: ["FR", "AR", "ES", "EN"] as const,
} as const;

export type Site = typeof site;
