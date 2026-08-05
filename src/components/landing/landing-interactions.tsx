"use client";

import { useRef, useState } from "react";
import { SiteFooter, SiteHeader, UtilityBar } from "./chrome";
import { FinalCta } from "./estimate";
import { BenefitBlocks, Hero, InsideTheShop, LocationSection, Reviews, Services } from "./sections";
import { StickyMobileActions } from "./sticky-actions";

export function LandingInteractions() {
  const heroCtaRef = useRef<HTMLDivElement | null>(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <UtilityBar />
      <SiteHeader />
      <main>
        <Hero ctaRef={heroCtaRef} />
        <Services />
        <BenefitBlocks />
        <InsideTheShop />
        <LocationSection />
        <Reviews />
        <FinalCta onFormFocusChange={setKeyboardOpen} />
      </main>
      <SiteFooter />
      <StickyMobileActions heroCtaRef={heroCtaRef} hidden={keyboardOpen} />
      <div className="h-16 lg:hidden" aria-hidden="true" />
    </div>
  );
}
