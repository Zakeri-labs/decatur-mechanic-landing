import { business, services, directionsUrl, isPlaceholder } from "@/config/business";
import {
  Container,
  Eyebrow,
  CallButton,
  DirectionsButton,
  ShopImage,
  ConfigValue,
  PhoneValue,
  buttonStyles,
} from "./ui";
import { ServiceCard } from "./service-card";

/* ------------------------------ 1. Hero ------------------------------ */

const QUICK = [
  { label: "Today", value: "Call to check availability" },
  { label: "Services", value: "Engine · Brakes · Transmission" },
  { label: "Location", value: "1099 Columbia Dr" },
];

const TRUST = [
  "Columbia Dr, Decatur GA",
  "Engine, Brakes & Transmission",
  "Call to check availability",
  "Local auto repair",
];

export function Hero({ ctaRef }: { ctaRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <section id="top" className="bg-ink text-ink-foreground">
      <Container className="grid gap-8 py-10 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-10 lg:py-14">
        <div className="min-w-0">
          <Eyebrow>{business.address.full}</Eyebrow>
          <h1 className="mt-3 text-4xl font-bold uppercase leading-[1.05] sm:text-5xl lg:text-6xl">
            Your local mechanic shop in Decatur.
          </h1>
          <p className="mt-4 max-w-prose text-sm leading-relaxed text-ink-muted sm:text-base">
            Engine diagnostics, transmission repair, brake service, oil changes, and general auto
            repair at 1099 Columbia Dr in Decatur.
          </p>

          <div ref={ctaRef} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <CallButton
              trackingId="cta-call-hero"
              label="Call to check availability"
              className="w-full sm:w-auto"
            />
            <a
              data-cta="cta-estimate-hero"
              href="#services"
              className={`${buttonStyles.outlineLight} w-full sm:w-auto`}
            >
              See services
            </a>
          </div>

          <dl className="mt-7 grid gap-3 sm:grid-cols-3">
            {QUICK.map((cell) => (
              <div key={cell.label} className="border border-ink-border bg-ink-soft p-3">
                <dt className="font-display text-[11px] uppercase tracking-widest text-brand">
                  {cell.label}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-ink-foreground">{cell.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="min-w-0">
          <ShopImage
            image={business.images.exterior}
            priority
            className="border border-ink-border"
          />
        </div>
      </Container>

      <div className="border-t border-ink-border">
        <Container>
          <ul className="grid gap-y-2 py-3 text-[11px] uppercase tracking-widest text-ink-muted sm:grid-cols-2 lg:flex lg:items-center lg:justify-between">
            {TRUST.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-brand" />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}

/* ---------------------------- 2. Services ---------------------------- */

export function Services() {
  return (
    <section id="services" className="border-b border-hairline bg-background py-12 lg:py-16">
      <Container>
        <div className="text-center">
          <Eyebrow>What we fix</Eyebrow>
          <h2 className="mt-2 text-3xl font-bold uppercase sm:text-4xl">
            Four things we do — and do well.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
            Call the shop and tell us what your vehicle is doing. We'll confirm whether we handle
            the problem and the next available step.
          </p>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border border-hairline p-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            Need help with something else? Call the shop and tell us what the vehicle is doing.
          </p>
          <CallButton
            trackingId="cta-general-repair"
            label="Call about your vehicle"
            className="w-full sm:w-auto"
          />
        </div>
      </Container>
    </section>
  );
}

/* ------------------------- 3. Benefit blocks ------------------------- */

export function BenefitBlocks() {
  const blocks = [
    business.approvalPolicy,
    {
      eyebrow: "Local to Decatur",
      headline: "Right here on Columbia Dr.",
      copy: "A local auto repair shop located at 1099 Columbia Dr in Decatur.",
    },
    {
      eyebrow: "Fast turnaround",
      headline: "Call to check today's availability",
      copy: "Availability depends on the repair, required parts, and the shop's current schedule.",
    },
  ];

  return (
    <section id="why-us" className="border-b border-hairline bg-background py-10 lg:py-12">
      <Container className="grid divide-y divide-hairline lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        {blocks.map((block) => (
          <div key={block.headline} className="px-0 py-6 text-center lg:px-6 lg:py-2">
            <Eyebrow>{block.eyebrow}</Eyebrow>
            <h3 className="mt-2 text-xl font-bold uppercase">{block.headline}</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {block.copy}
            </p>
          </div>
        ))}
      </Container>
    </section>
  );
}

/* ------------------------ 4. Inside the shop ------------------------- */

export function InsideTheShop() {
  return (
    <section className="bg-ink py-12 text-ink-foreground lg:py-16">
      <Container className="grid gap-6 lg:grid-cols-[0.7fr_1.6fr_1fr] lg:items-start">
        <div className="min-w-0">
          <Eyebrow>Inside the shop</Eyebrow>
          <h2 className="mt-2 text-2xl font-bold uppercase leading-tight sm:text-3xl">
            1099 Columbia Dr, in real life.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            See the shop entrance, service bays, and work area before you visit us on Columbia
            Drive.
          </p>
          <DirectionsButton variant="outlineLight" className="mt-5 w-full sm:w-auto" />
        </div>

        <figure className="min-w-0">
          <div className="aspect-[5/4] overflow-hidden border border-ink-border">
            <ShopImage image={business.images.exterior} className="h-full w-full" />
          </div>
          <figcaption className="mt-2 text-[11px] uppercase tracking-widest text-ink-muted">
            {business.images.exterior.caption}
          </figcaption>
        </figure>

        <div className="grid min-w-0 gap-6">
          {[business.images.shop, business.images.team].map((image) => (
            <figure key={image.alt} className="min-w-0">
              <div className="aspect-[16/9] overflow-hidden border border-ink-border">
                <ShopImage image={image} className="h-full w-full" />
              </div>
              <figcaption className="mt-2 text-[11px] uppercase tracking-widest text-ink-muted">
                {image.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* --------------------------- 5. Location ----------------------------- */

export function LocationSection() {
  const mapReady = !isPlaceholder(business.mapEmbedUrl);
  return (
    <section id="location" className="border-b border-hairline bg-background py-12 lg:py-16">
      <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="min-w-0">
          <Eyebrow>Find us</Eyebrow>
          <h2 className="mt-2 text-2xl font-bold uppercase leading-tight sm:text-3xl">
            Columbia Dr, Decatur GA
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Find {business.name} at {business.address.full}. Call before visiting to confirm current
            service availability.
          </p>

          <address className="mt-5 space-y-3 border-t border-hairline pt-5 text-sm not-italic">
            <p>
              {business.address.street}
              <br />
              {business.address.city}, {business.address.region} {business.address.postalCode}
            </p>
            <p>
              Phone: <PhoneValue />
            </p>
            <p>
              Hours: <ConfigValue value={business.hours} />
            </p>
          </address>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <DirectionsButton variant="primary" className="w-full sm:w-auto" />
            <CallButton
              trackingId="cta-availability"
              label="Call the shop"
              className="w-full sm:w-auto"
            />
          </div>
        </div>

        <div data-cta="map-interaction" className="min-w-0 border border-hairline">
          {mapReady ? (
            <iframe
              title={`Map to ${business.name}`}
              src={business.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[320px] w-full lg:h-[420px]"
            />
          ) : (
            <div className="flex h-[320px] w-full flex-col items-center justify-center gap-2 border border-dashed border-hairline bg-muted px-4 text-center lg:h-[420px]">
              <span className="font-mono text-[11px] text-muted-foreground">
                [CONFIRMED_GOOGLE_MAP_URL]
              </span>
              <span className="text-xs text-muted-foreground">
                Google Map embed for {business.address.full} appears here once the embed URL is
                confirmed.
              </span>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

/* ---------------------------- 6. Reviews ----------------------------- */

export function Reviews() {
  const profileReady = !isPlaceholder(business.googleBusinessProfileUrl);
  return (
    <section id="reviews" className="border-b border-hairline bg-muted py-12 lg:py-16">
      <Container>
        <div className="text-center">
          <Eyebrow>From Decatur drivers</Eyebrow>
          <h2 className="mt-2 text-3xl font-bold uppercase sm:text-4xl">What customers say</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
            Recent feedback from customers who visited the shop for repairs and maintenance.
          </p>
        </div>

        <ul className="mt-8 grid gap-4 lg:grid-cols-3">
          {business.reviews.map((review, index) => (
            <li key={index} className="border border-hairline bg-card p-5">
              <p className="font-mono text-[11px] text-muted-foreground">{review.quote}</p>
              <p className="mt-4 border-t border-hairline pt-3 font-mono text-[11px] text-muted-foreground">
                {review.author}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{review.source}</p>
            </li>
          ))}
        </ul>

        {profileReady && (
          <div className="mt-6 text-center">
            <a
              data-cta="google-reviews-link"
              href={business.googleBusinessProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles.outlineDark}
            >
              Read more Google reviews
            </a>
          </div>
        )}
      </Container>
    </section>
  );
}

export { directionsUrl };
