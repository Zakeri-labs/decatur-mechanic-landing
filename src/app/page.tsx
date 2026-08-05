import type { Metadata } from "next";
import { business, seo, services } from "@/config/business";
import { LandingInteractions } from "@/components/landing/landing-interactions";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "AutoRepair"],
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

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: { canonical: seo.canonical },
  openGraph: {
    title: seo.title,
    description: seo.description,
    type: "website",
    url: seo.canonical,
  },
};

export default function HomePage() {
  return (
    <>
      <LandingInteractions />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
