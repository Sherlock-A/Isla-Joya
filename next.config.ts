import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// Derive the Laravel API origin at build time so the CSP stays tight.
// In production, NEXT_PUBLIC_LARAVEL_API_URL must point to the live backend
// (e.g. https://api.islajoya.com/api/v1). The origin is extracted and
// injected into connect-src so browsers can reach the search endpoint directly.
function apiOrigin(): string {
  try {
    return new URL(
      process.env.NEXT_PUBLIC_LARAVEL_API_URL ?? "http://localhost:8000/api/v1"
    ).origin;
  } catch {
    return "http://localhost:8000";
  }
}

function apiHostname(): string {
  try {
    return new URL(
      process.env.NEXT_PUBLIC_LARAVEL_API_URL ?? "http://localhost:8000/api/v1"
    ).hostname;
  } catch {
    return "localhost";
  }
}

const origin = apiOrigin();
const hostname = apiHostname();

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://connect.facebook.net https://analytics.tiktok.com https://www.google-analytics.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' https://fonts.gstatic.com",
  `connect-src 'self' ${origin} https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy", value: csp },
];

const productionImagePatterns =
  hostname !== "localhost"
    ? [{ protocol: "https" as const, hostname, pathname: "/storage/**" }]
    : [];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  images: {
    remotePatterns: [
      // Dev
      { protocol: "http",  hostname: "localhost", port: "8000", pathname: "/storage/**" },
      // Production — hostname derived from NEXT_PUBLIC_LARAVEL_API_URL
      ...productionImagePatterns,
      // Static assets on main domain
      { protocol: "https", hostname: "islajoya.com", pathname: "/storage/**" },
      // Placeholder images
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
};

export default nextConfig;
