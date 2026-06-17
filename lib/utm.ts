"use client";

const UTM_KEY = "ij-utm";

export interface UtmParams {
  source?:   string;
  medium?:   string;
  campaign?: string;
  term?:     string;
  content?:  string;
}

export function captureUtm(): void {
  if (typeof window === "undefined") return;
  // First-touch attribution — don't overwrite if already captured
  if (sessionStorage.getItem(UTM_KEY)) return;

  const params = new URLSearchParams(window.location.search);
  const utm: UtmParams = {};
  if (params.get("utm_source"))   utm.source   = params.get("utm_source")!;
  if (params.get("utm_medium"))   utm.medium   = params.get("utm_medium")!;
  if (params.get("utm_campaign")) utm.campaign = params.get("utm_campaign")!;
  if (params.get("utm_term"))     utm.term     = params.get("utm_term")!;
  if (params.get("utm_content"))  utm.content  = params.get("utm_content")!;

  if (Object.keys(utm).length > 0) {
    sessionStorage.setItem(UTM_KEY, JSON.stringify(utm));
  }
}

export function getUtm(): UtmParams | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(UTM_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as UtmParams; } catch { return null; }
}
