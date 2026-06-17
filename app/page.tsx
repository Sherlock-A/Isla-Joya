import { Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Collections } from "@/components/sections/Collections";
import { BestSellers } from "@/components/sections/BestSellers";
import { NewArrivals } from "@/components/sections/NewArrivals";
import { TrendingNow } from "@/components/sections/TrendingNow";
import { PersonalizedSectionServer } from "@/components/sections/PersonalizedSectionServer";
import { InstagramGallery } from "@/components/sections/InstagramGallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Wholesale } from "@/components/sections/Wholesale";
import { FAQ } from "@/components/sections/FAQ";
import { WhatsAppCTA } from "@/components/sections/WhatsAppCTA";
import { JewelryAdvisorServer } from "@/components/ui/JewelryAdvisorServer";

function SectionSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-10 flex flex-col items-center gap-3">
        <div className="h-3 w-24 animate-pulse rounded bg-noir/10" />
        <div className="h-8 w-48 animate-pulse rounded-lg bg-noir/10" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="overflow-hidden rounded-2xl bg-white shadow-soft">
            <div className="h-60 animate-pulse bg-noir/8" />
            <div className="space-y-3 p-5">
              <div className="h-3 w-1/2 animate-pulse rounded bg-noir/10" />
              <div className="h-5 w-3/4 animate-pulse rounded bg-noir/10" />
              <div className="h-10 animate-pulse rounded-full bg-noir/8" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Collections />
      <Suspense fallback={<SectionSkeleton />}>
        <BestSellers />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <NewArrivals />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <TrendingNow />
      </Suspense>
      <Suspense fallback={null}>
        <PersonalizedSectionServer />
      </Suspense>
      <InstagramGallery />
      <Suspense fallback={<div className="py-24" />}>
        <Testimonials />
      </Suspense>
      <WhyChooseUs />
      <Wholesale />
      <Suspense fallback={<div className="py-24" />}>
        <FAQ />
      </Suspense>
      <WhatsAppCTA />
      <Suspense fallback={null}>
        <JewelryAdvisorServer />
      </Suspense>
    </>
  );
}
