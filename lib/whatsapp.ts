import { site } from "./site";
import { track } from "./analytics";

export type WhatsAppSource =
  | "navbar"
  | "hero"
  | "sticky"
  | "product_card"
  | "product_page"
  | "wholesale"
  | "footer"
  | "cta_section"
  | "exit_intent"
  | "sticky_bar"
  | "advisor";

/** Pre-written, on-brand message templates (intimate yet aspirational). */
export const waMessages = {
  general: () =>
    `Hello Isla Joya ✨\nI just discovered your collections and I'd love to know more.`,
  product: (name: string, material?: string) =>
    `Hello Isla Joya,\nI'm interested in:\n\n${name}${material ? ` (${material})` : ""}\n\nCan you provide price and availability?`,
  wholesale: () =>
    `Hello Isla Joya,\nI'd like to become a stockist / partner.\nCould you share your wholesale catalogue and conditions?`,
  collection: (collection: string) =>
    `Hello Isla Joya,\nI'm interested in your ${collection} — could you share what's available?`,
} as const;

/** Build a wa.me deep link with a pre-filled message. */
export function buildWhatsAppUrl(message: string, ref?: string) {
  const phone = site.whatsappNumber.replace(/\D/g, "");
  const text = ref ? `${message}\n\n— via ${ref}` : message;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Open WhatsApp and record the conversion event (page / source / product).
 * Used by every WhatsApp surface so analytics stays consistent.
 */
export function openWhatsApp(opts: {
  message: string;
  source: WhatsAppSource;
  productSlug?: string;
  productName?: string;
}) {
  const ref =
    typeof window !== "undefined"
      ? `${window.location.pathname}${window.location.search}`
      : undefined;

  track("whatsapp_click", {
    source: opts.source,
    productSlug: opts.productSlug,
    productName: opts.productName,
    page: ref,
  });

  if (typeof window !== "undefined") {
    window.open(buildWhatsAppUrl(opts.message, ref ?? undefined), "_blank", "noopener,noreferrer");
  }
}
