import { business, services, directionsUrl, isPlaceholder } from "@/config/business";
import Image from "next/image";
import {
  ArrowRight,
  Clock3,
  Gauge,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Wrench,
  type LucideIcon,
} from "lucide-react";
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

const HERO_BENEFITS: Array<{
  title: string;
  copy: string;
  icon: LucideIcon;
}> = [
  {
    title: "No surprise bills",
    copy: "Recommended work is explained before approved repairs begin.",
    icon: ShieldCheck,
  },
  {
    title: "Local auto repair",
    copy: "Right here on Columbia Dr in Decatur.",
    icon: MapPin,
  },
  {
    title: "Check availability",
    copy: "Call before you visit for the shop's current schedule.",
    icon: Gauge,
  },
  {
    title: "Core repair services",
    copy: "Engine, brake, and transmission service.",
    icon: Wrench,
  },
];

export function Hero({ ctaRef }: { ctaRef: React.RefObject<HTMLDivElement | null> }) {
  const quickFacts: Array<{
    label: string;
    value: string;
    detail?: string;
    icon: LucideIcon;
  }> = [
    {
      label: "Today",
      value: isPlaceholder(business.hours) ? "Call to check availability" : business.hours,
      icon: Clock3,
    },
    {
      label: "Services",
      value: "Engine · Brakes · Transmission",
      icon: Wrench,
    },
    {
      label: "Location",
      value: business.address.street,
      detail: `${business.address.city}, ${business.address.region} ${business.address.postalCode}`,
      icon: MapPin,
    },
  ];

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="hero-shell relative isolate overflow-hidden bg-[#071018] text-ink-foreground"
    >
      <div className="absolute inset-0">
        <Image
          src={business.images.hero.src}
          alt={business.images.hero.alt}
          fill
          priority
          quality={88}
          sizes="100vw"
          className="hero-background-image object-cover"
        />
        <div aria-hidden="true" className="hero-image-overlay absolute inset-0" />
        <div aria-hidden="true" className="hero-image-vignette absolute inset-0" />
      </div>

      <Container className="relative z-10 max-w-[1500px] px-4 py-12 sm:px-8 sm:py-16 lg:min-h-[720px] lg:px-10 lg:py-16 xl:min-h-[760px]">
        <div className="max-w-[650px] min-w-0 lg:max-w-[540px] xl:max-w-[680px]">
          <Eyebrow className="flex items-center gap-2 text-[0.69rem] leading-relaxed sm:text-xs">
            <MapPin aria-hidden="true" className="h-4 w-4 shrink-0" />
            {business.address.full}
          </Eyebrow>
          <h1
            id="hero-heading"
            className="mt-5 font-display text-[clamp(2.35rem,11.8vw,4.8rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-[#f3f0e9] lg:text-[clamp(3.8rem,5.8vw,4.7rem)] xl:text-[clamp(4.7rem,6.4vw,5.8rem)]"
          >
            <span className="block">Your car,</span>
            <span className="block">
              Fixed <span className="text-brand">right</span>
            </span>
            <span className="block whitespace-nowrap">The first time.</span>
          </h1>
          <span aria-hidden="true" className="mt-7 block h-0.5 w-16 bg-brand" />
          <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-ink-muted sm:text-lg">
            Engine diagnostics, transmission repair, brake service, oil changes, and general auto
            repair at 1099 Columbia Dr in Decatur.
          </p>

          <div ref={ctaRef} className="mt-7 flex flex-col gap-3 sm:flex-row">
            <CallButton
              trackingId="cta-call-hero"
              label={
                <>
                  <Phone aria-hidden="true" className="h-5 w-5" />
                  Call to check availability
                </>
              }
              className="w-full px-5 sm:w-auto sm:px-7"
            />
            <a
              data-cta="cta-estimate-hero"
              href="#services"
              className={`${buttonStyles.outlineLight} w-full border-brand/80 bg-[#071018]/55 px-6 hover:border-brand hover:bg-brand/10 sm:w-auto`}
            >
              See services
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>

          <dl className="mt-8 grid gap-3 sm:grid-cols-3">
            {quickFacts.map((fact) => {
              const Icon = fact.icon;
              return (
                <div
                  key={fact.label}
                  className="hero-glass-card flex min-h-24 items-start gap-3 border border-white/12 p-4"
                >
                  <Icon aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-brand" />
                  <div>
                    <dt className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-[#f3f0e9]">
                      {fact.label}
                    </dt>
                    <dd className="mt-1.5 text-sm leading-snug text-ink-muted">
                      {fact.value}
                      {fact.detail && <span className="block">{fact.detail}</span>}
                    </dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </div>

        <a
          href="#reviews"
          data-cta="hero-reviews-link"
          className="hero-glass-card group mt-5 block max-w-sm border border-white/12 p-5 transition-colors hover:border-brand/70 lg:absolute lg:right-10 lg:bottom-12 lg:mt-0 lg:w-[350px] xl:right-10"
        >
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-brand text-brand">
              <Star aria-hidden="true" className="h-5 w-5 fill-current" />
            </span>
            <div>
              <p className="font-display text-base font-semibold uppercase tracking-[0.13em] text-[#f3f0e9]">
                Local auto repair
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Read feedback from customers who visited the shop.
              </p>
              <span className="mt-3 inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-widest text-brand">
                Read customer reviews
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </span>
            </div>
          </div>
        </a>
      </Container>

      <div className="relative z-10 border-t border-white/12 bg-[#071018]/88 backdrop-blur-sm">
        <Container className="max-w-[1500px] px-4 py-4 sm:px-8 lg:px-10">
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {HERO_BENEFITS.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <li
                  key={benefit.title}
                  className="flex min-h-24 items-start gap-3 border border-white/10 p-4 lg:border-y-0 lg:border-r-0 lg:px-6 lg:first:border-l-0"
                >
                  <Icon aria-hidden="true" className="h-8 w-8 shrink-0 text-brand" />
                  <div>
                    <p className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-[#f3f0e9]">
                      {benefit.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-muted">{benefit.copy}</p>
                  </div>
                </li>
              );
            })}
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
