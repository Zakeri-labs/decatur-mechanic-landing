import { business } from "@/config/business";
import { Container, PhoneValue, ConfigValue, CallButton } from "./ui";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "Why us" },
  { href: "#location", label: "Location" },
  { href: "#reviews", label: "Reviews" },
];

function BrandMark() {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xs bg-brand text-brand-foreground sm:h-12 sm:w-12">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="currentColor">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 3.2 1.6 3.1 3.4.5-2.5 2.4.6 3.4-3.1-1.6-3.1 1.6.6-3.4L7 8.8l3.4-.5Z" />
      </svg>
    </span>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#071018] text-ink-foreground">
      <Container className="grid max-w-[1500px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:py-4 xl:px-10">
        <a
          href="#top"
          aria-label={`${business.name} home`}
          className="flex min-w-0 items-center gap-3 justify-self-start"
        >
          <BrandMark />
          <span className="truncate font-display text-xl font-bold uppercase leading-[0.9] tracking-[0.06em] sm:text-2xl">
            Decatur
            <span className="mt-1 block text-xs font-semibold tracking-[0.27em] text-brand sm:text-sm">
              Mechanic
            </span>
          </span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-10 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="py-3 text-base font-medium text-ink-foreground/90 transition-colors hover:text-brand"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 justify-self-end">
          <CallButton
            trackingId="cta-call-header"
            label={
              <>
                <Phone aria-hidden="true" className="h-4 w-4" />
                <span className="hidden sm:inline">Call now</span>
                <span className="sr-only sm:hidden">Call now</span>
              </>
            }
            className="min-h-11 px-3 text-xs sm:px-5 lg:min-h-12"
          />
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center border border-white/15 text-ink-foreground transition-colors hover:border-brand hover:text-brand lg:hidden"
          >
            {menuOpen ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
      </Container>

      <nav
        id="mobile-navigation"
        aria-label="Mobile"
        className={`${menuOpen ? "block" : "hidden"} border-t border-white/10 bg-[#071018] lg:hidden`}
      >
        <Container className="grid px-4 py-2 sm:px-8">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-white/8 px-1 py-3 font-display text-sm font-semibold uppercase tracking-widest last:border-b-0 hover:text-brand"
            >
              {item.label}
            </a>
          ))}
        </Container>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-border bg-ink text-ink-foreground">
      <Container className="grid gap-6 py-8 text-sm sm:grid-cols-2 lg:grid-cols-3">
        <a href={`https://${business.domain}`} className="flex items-center gap-2 hover:text-brand">
          <BrandMark />
          <span className="font-display text-base font-bold uppercase tracking-wide">
            {business.name}
          </span>
        </a>
        <address className="not-italic leading-relaxed text-ink-muted">
          <PhoneValue className="text-ink-foreground" />
          <br />
          <span className="text-ink-muted">
            Hours: <ConfigValue value={business.hours} />
          </span>
        </address>
        <div className="flex flex-col items-start gap-2">
          <address className="not-italic whitespace-nowrap text-ink-muted">
            {business.address.street}, {business.address.city}, {business.address.region}{" "}
            {business.address.postalCode}
          </address>
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
