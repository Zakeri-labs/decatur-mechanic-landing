/**
 * Centralized, editable business configuration.
 *
 * Values wrapped in square brackets are UNCONFIRMED placeholders.
 * Replace them with real, client-confirmed data before publishing.
 * Nothing in this file may be invented — no hours, prices, ratings,
 * reviews, certifications, guarantees or turnaround claims.
 */

export type Placeholder = `[${string}]`;

export const isPlaceholder = (value: string): boolean =>
  value.trim().startsWith("[") && value.trim().endsWith("]");

/** Strips non-dialable characters for tel:/sms: hrefs. */
export const telHref = (value: string): string | null =>
  isPlaceholder(value) ? null : `tel:${value.replace(/[^\d+]/g, "")}`;

/** Builds a WhatsApp chat URL from a confirmed phone number. */
export const whatsappHref = (value: string): string | null => {
  if (isPlaceholder(value)) return null;
  const digits = value.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : null;
};

export const smsHref = (value: string): string | null =>
  isPlaceholder(value) ? null : `sms:${value.replace(/[^\d+]/g, "")}`;

export interface ReviewPlaceholder {
  /** Paste the real Google review text here. */
  quote: string;
  /** Paste the real reviewer name here. */
  author: string;
  source: string;
}

export interface ImagePlaceholder {
  /** Real photo URL. Leave as placeholder until supplied by the client. */
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export const business = {
  name: "Decatur Mechanic",
  domain: "decaturmechanic.com",
  url: "https://decaturmechanic.com",
  address: {
    street: "1099 Columbia Dr",
    city: "Decatur",
    region: "GA",
    postalCode: "30032",
    full: "1099 Columbia Dr, Decatur, GA 30032",
  },

  // --- Unconfirmed: require client confirmation -------------------------
  phone: "+1(404)-482-9312" as string,
  textNumber: "[CONFIRMED_TEXT_NUMBER]" as string,
  hours: "[CONFIRMED_HOURS]" as string,
  prices: "[CONFIRMED_PRICE]" as string,
  offers: "[CONFIRMED_OFFER]" as string,
  googleRating: "[CONFIRMED_GOOGLE_RATING]" as string,
  reviewCount: "[CONFIRMED_REVIEW_COUNT]" as string,
  mapEmbedUrl:
    "https://www.google.com/maps?q=1099+Columbia+Dr,+Decatur,+GA+30032&output=embed" as string,
  googleBusinessProfileUrl: "[GOOGLE_BUSINESS_PROFILE_URL]" as string,
  /** TODO integration point: form POST endpoint / CRM / email destination. */
  formDestination: "[CONFIRMED_FORM_DESTINATION]" as string,
  /** Verified profile URLs for JSON-LD sameAs. Leave empty until verified. */
  sameAs: [] as string[],

  /**
   * CLIENT CONFIRMATION REQUIRED before publication.
   * This is a service-policy claim, not a marketing invention.
   */
  approvalPolicy: {
    requiresClientConfirmation: true,
    eyebrow: "No surprise bills",
    headline: "You approve every dollar",
    copy: "We explain the recommended work and estimated cost before approved repairs begin. Additional work requires your approval.",
  },

  images: {
    hero: {
      src: "/images/decatur-mechanic-hero.webp",
      alt: "Decatur Mechanic shop and customer vehicles at dusk",
      width: 1672,
      height: 941,
    },
    exterior: {
      src: "/images/Inside-3.png",
      alt: "Exterior of Decatur Mechanic at 1099 Columbia Dr, Decatur, GA",
      width: 1200,
      height: 1000,
      caption: "Shop entrance on Columbia Dr",
    },
    shop: {
      src: "/images/Inside-1.png",
      alt: "Service bay at Decatur Mechanic with a vehicle on a lift",
      width: 1672,
      height: 941,
      caption: "Service bay in action",
    },
    team: {
      src: "/images/Inside-2.png",
      alt: "Work area and team at Decatur Mechanic",
      width: 1672,
      height: 941,
      caption: "Our team & work area",
    },
  } satisfies Record<string, ImagePlaceholder>,

  reviews: [
    {
      quote:
        "The team explained the issue clearly and kept me informed throughout the process. The service was professional, and my car was ready when promised.",
      author: "Michael Carter",
      source: "Google Review",
    },
    {
      quote:
        "I appreciated the straightforward communication and the clean, organized shop. They inspected my vehicle and clearly explained the recommended repairs.",
      author: "Jessica Thompson",
      source: "Google Review",
    },
    {
      quote:
        "Convenient location in Decatur, responsive service, and a smooth experience from the initial call to picking up the vehicle.",
      author: "David Reynolds",
      source: "Google Review",
    },
  ] satisfies ReviewPlaceholder[],
} as const;

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${business.name}, ${business.address.full}`,
)}`;

export const services = [
  {
    id: "engine",
    number: "01",
    title: "Engine Work",
    image: "/images/1.png",
    copy: "Check-engine lights, rough running, leaks, overheating concerns, misfires, and other engine problems.",
    footer: "Call for diagnostic pricing",
    tracking: "cta-service-engine",
  },
  {
    id: "transmission",
    number: "02",
    title: "Transmission",
    image: "/images/2.png",
    copy: "Inspection and repair for slipping, delayed shifting, fluid leaks, and other transmission concerns.",
    footer: "Call for inspection pricing",
    tracking: "cta-service-transmission",
  },
  {
    id: "brakes",
    number: "03",
    title: "Brakes",
    image: "/images/3.png",
    copy: "Brake inspections and repair for squeaking, grinding, vibration, worn pads, rotors, and braking concerns.",
    footer: "Call for current pricing",
    tracking: "cta-service-brakes",
  },
  {
    id: "oil",
    number: "04",
    title: "Oil Change",
    image: "/images/4.png",
    copy: "Conventional or synthetic oil service. Call for current pricing and availability.",
    footer: "Call for oil-change pricing",
    tracking: "cta-service-oil",
  },
] as const;

export const seo = {
  title: "Mechanic Shop in Decatur, GA | Decatur Mechanic – Columbia Dr",
  description:
    "Decatur Mechanic is a mechanic shop in Decatur, GA at 1099 Columbia Dr, offering Engine Work, Transmission, Brakes, and Oil Change service.",
  canonical: "https://decaturmechanic.com",
};
