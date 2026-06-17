import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { site } from "@/lib/site";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { Analytics } from "@/components/layout/Analytics";
import { AnnouncementBanner } from "@/components/ui/AnnouncementBanner";
import { CookieBanner } from "@/components/ui/CookieBanner";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Isla Joya — Modern Fine Jewelry · Morocco & Spain",
    template: "%s · Isla Joya",
  },
  description: site.description,
  keywords: [
    "Jewelry Morocco",
    "Bijoux Maroc",
    "Grossiste Bijoux Maroc",
    "Jewelry Barcelona",
    "Wholesale Jewelry",
    "Joyas Barcelona",
    "fine jewelry",
    "gold vermeil",
    "Isla Joya",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    title: "Isla Joya — Modern Fine Jewelry",
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "fr_FR",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Isla Joya — Modern Fine Jewelry" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Isla Joya — Modern Fine Jewelry",
    description: site.description,
  },
  alternates: {
    canonical: site.url,
    languages: {
      "fr-MA": site.url,
      "es-ES": site.url,
      ar: site.url,
      en: site.url,
    },
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = { themeColor: "#17120d" };

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "JewelryStore"],
  name: site.name,
  description: site.description,
  url: site.url,
  sameAs: [site.instagram],
  areaServed: ["MA", "ES"],
  slogan: site.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fontVariables} h-full`}>
      <body className="min-h-full">
        <AnnouncementBanner />
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
        <WhatsAppFloat />
        <Analytics />
        <CookieBanner />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
