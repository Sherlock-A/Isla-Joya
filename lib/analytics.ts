/**
 * Lightweight, vendor-agnostic analytics layer.
 * Every event is forwarded to whatever marketing tags are present
 * (GA4 / GTM / Meta Pixel / TikTok) and persisted to our own /api/track
 * endpoint for the admin dashboard — all of it no-ops safely when a given
 * channel isn't configured.
 */
import { getSessionId, getDeviceType } from "@/lib/session";
import { getUtm, captureUtm } from "@/lib/utm";

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

  // Capture UTM on first call (first-touch attribution)
  captureUtm();
  const utm = getUtm();
  const sessionId = getSessionId();
  const deviceType = getDeviceType();

  // Enrich payload with session + utm + device
  const enriched: Payload = {
    ...payload,
    session_id:   sessionId,
    device_type:  deviceType,
    ...(utm?.source   && { utm_source:   utm.source }),
    ...(utm?.medium   && { utm_medium:   utm.medium }),
    ...(utm?.campaign && { utm_campaign: utm.campaign }),
    ...(utm?.term     && { utm_term:     utm.term }),
    ...(utm?.content  && { utm_content:  utm.content }),
  };

  // GTM / dataLayer
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...enriched });

  // GA4
  if (typeof w.gtag === "function") w.gtag("event", event, enriched);

  // Meta Pixel
  if (typeof w.fbq === "function") {
    const map: Partial<Record<IslaEvent, string>> = {
      view_product:   "ViewContent",
      whatsapp_click: "Contact",
      lead_submit:    "Lead",
    };
    w.fbq("track", map[event] ?? "CustomEvent", enriched);
  }

  // TikTok Pixel
  if (w.ttq && typeof w.ttq.track === "function") {
    w.ttq.track(event, enriched);
  }

  // First-party persistence (fire-and-forget)
  try {
    const body = JSON.stringify({ event, payload: enriched, ts: Date.now() });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
    } else {
      fetch("/api/track", {
        method: "POST", body, keepalive: true,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch {
    /* never let analytics break the UI */
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */
