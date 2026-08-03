import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { business, seo, services } from "@/config/business";
import { SiteHeader, SiteFooter, UtilityBar } from "@/components/landing/chrome";
import {
  Hero,
  Services,
  BenefitBlocks,
  InsideTheShop,
  LocationSection,
  Reviews,
} from "@/components/landing/sections";
import { FinalCta } from "@/components/landing/estimate";
import { StickyMobileActions } from "@/components/landing/sticky-actions";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: business.name,
  url: business.url,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.city,
    addressRegion: business.address.region,
    postalCode: business.address.postalCode,
    addressCountry: "US",
  },
  areaServed: "Decatur, GA",
  makesOffer: services.map((service) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: service.title, description: service.copy },
  })),
  sameAs: business.sameAs,
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: seo.title },
      { name: "description", content: seo.description },
      { property: "og:title", content: seo.title },
      { property: "og:description", content: seo.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: seo.canonical }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: Index,
});

function Index() {
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
