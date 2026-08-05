import { business } from "@/config/business";
import { Container, PhoneValue, ConfigValue, CallButton } from "./ui";
import { useEffect, useState } from "react";

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "Why us" },
  { href: "#location", label: "Location" },
  { href: "#reviews", label: "Reviews" },
];

function BrandMark() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xs bg-brand text-brand-foreground">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 3.2 1.6 3.1 3.4.5-2.5 2.4.6 3.4-3.1-1.6-3.1 1.6.6-3.4L7 8.8l3.4-.5Z" />
      </svg>
    </span>
  );
}

export function UtilityBar() {
  return (
    <div className="border-b border-ink-border bg-ink text-ink-foreground">
      <Container className="flex flex-wrap items-center gap-x-6 gap-y-1 py-2 text-xs">
        <span className="min-w-0">{business.address.full}</span>
        <span className="min-w-0">
          Call the shop: <PhoneValue />
        </span>
        <span className="min-w-0">
          Hours: <ConfigValue value={business.hours} />
        </span>
      </Container>
    </div>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`z-40 border-b border-ink-border bg-ink text-ink-foreground ${
        scrolled ? "lg:sticky lg:top-0" : ""
      }`}
    >
      <Container className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3 lg:flex lg:justify-between">
        <a href="#top" className="flex min-w-0 items-center gap-2">
          <BrandMark />
          <span className="truncate font-display text-lg font-bold uppercase leading-none tracking-wide">
            Decatur
            <span className="block text-xs font-semibold tracking-[0.22em] text-brand">
              Mechanic
            </span>
          </span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-medium hover:text-brand">
              {item.label}
            </a>
          ))}
        </nav>

        <CallButton trackingId="cta-call-header" label="Call now" className="px-4 text-xs" />
      </Container>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-border bg-ink text-ink-foreground">
      <Container className="grid gap-6 py-8 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center gap-2">
          <BrandMark />
          <span className="font-display text-base font-bold uppercase tracking-wide">
            {business.name}
          </span>
        </div>
        <address className="not-italic leading-relaxed text-ink-muted">
          {business.address.street}
          <br />
          {business.address.city}, {business.address.region} {business.address.postalCode}
          <br />
          <PhoneValue className="text-ink-foreground" />
        </address>
        <p className="text-ink-muted">
          Hours: <ConfigValue value={business.hours} />
        </p>
        <div className="flex flex-col items-start gap-2">
          <a href={`https://${business.domain}`} className="hover:text-brand">
            {business.domain}
          </a>
          <a
            data-cta="cta-directions"
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.address.full)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline"
          >
            Get directions
          </a>
        </div>
      </Container>
    </footer>
  );
}
