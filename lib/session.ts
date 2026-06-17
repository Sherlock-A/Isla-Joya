"use client";

const SESSION_KEY = "ij-session-id";

function uuidV4(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older environments
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = uuidV4();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function getDeviceType(): "mobile" | "tablet" | "desktop" {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent.toLowerCase();
  if (/tablet|ipad|playbook|silk/.test(ua)) return "tablet";
  if (/mobile|android|iphone|ipod|windows phone|bb/.test(ua)) return "mobile";
  return "desktop";
}
