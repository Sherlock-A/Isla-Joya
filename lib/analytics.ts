/**
 * Lightweight, vendor-agnostic analytics layer.
 * Every event is forwarded to whatever marketing tags are present
 * (GA4 / GTM / Meta Pixel / TikTok) and persisted to our own /api/track
 * endpoint for the admin dashboard — all of it no-ops safely when a given
 * channel isn't configured.
 */
export type IslaEvent =
  | "view_product"
  | "view_collection"
  | "whatsapp_click"
  | "lead_submit"
  | "wishlist_add"
  | "newsletter_signup";

type Payload = Record<string, unknown>;

/* eslint-disable @typescript-eslint/no-explicit-any */
export function track(event: IslaEvent, payload: Payload = {}) {
  if (typeof window === "undefined") return;
  const w = window as any;

  // GTM / dataLayer
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...payload });

  // GA4
  if (typeof w.gtag === "function") w.gtag("event", event, payload);

  // Meta Pixel
  if (typeof w.fbq === "function") {
    const map: Partial<Record<IslaEvent, string>> = {
      view_product: "ViewContent",
      whatsapp_click: "Contact",
      lead_submit: "Lead",
    };
    w.fbq("track", map[event] ?? "CustomEvent", payload);
  }

  // TikTok Pixel
  if (w.ttq && typeof w.ttq.track === "function") {
    w.ttq.track(event, payload);
  }

  // First-party persistence (fire-and-forget)
  try {
    const body = JSON.stringify({ event, payload, ts: Date.now() });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
    } else {
      fetch("/api/track", { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } });
    }
  } catch {
    /* never let analytics break the UI */
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */
