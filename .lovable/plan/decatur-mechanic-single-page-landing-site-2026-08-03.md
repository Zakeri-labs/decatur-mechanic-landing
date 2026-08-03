# Decatur Mechanic — Single-Page Landing Site

A one-page, call-first landing page for Google Search Ads traffic, built to the attached reference layout (industrial editorial: near-black navy surfaces, white content bands, safety-orange accents, condensed bold headings, thin borders, rectangular cards).

## Scope

One route only (`/`), anchor navigation, no auth/CMS/booking/blog. Seven major sections in order: Hero, Services, Benefit Blocks, Inside the Shop, Location, Reviews, Final CTA. Plus utility bar, header, sticky mobile action bar, estimate form panel, footer.

## Content configuration

All business data lives in one typed file, `src/config/business.ts`, with unconfirmed values kept as clearly-labeled placeholder tokens so nothing is fabricated:

- Confirmed: name, domain `decaturmechanic.com`, address `1099 Columbia Dr, Decatur, GA 30032`, service copy, section copy.
- Placeholders (rendered as visible `[CONFIRMED_…]` tokens, with tel/sms links disabled until filled): phone, text number, hours, prices, offers, Google rating, review count, reviews and reviewer names, exterior/shop/team photos, map URL, Google Business Profile URL, form destination.
- The "You approve every dollar" claim is flagged in config with a `requiresClientConfirmation: true` comment.

No invented hours, prices, ratings, reviews, certifications, warranties, turnaround times, or staff details anywhere.

## Sections

1. **Hero** — eyebrow address, H1 "YOUR LOCAL AUTO REPAIR SHOP IN DECATUR.", supporting copy, call + "SEE SERVICES" CTAs, exterior image (placeholder), three quick-info cells (Today / Services / Location), trust strip of four items.
2. **Services** — "WHAT WE FIX" / "FOUR THINGS WE DO — AND DO WELL." Exactly four numbered bordered cards (Engine, Transmission, Brakes, Oil Change) each with a call-for-pricing footer, then the general-repair line and "CALL ABOUT YOUR VEHICLE".
3. **Benefit blocks** — three equal bordered columns (No Surprise Bills / Local to Decatur / Fast Turnaround), untitled section.
4. **Inside the Shop** — one large exterior placeholder plus two smaller (service bay, team/interior), captions, optional "GET DIRECTIONS". No carousel.
5. **Location** — NAP block with semantic `<address>`, phone/hours placeholders, Get Directions + Call buttons, map embed on the right (placeholder card until the map URL is supplied).
6. **Reviews** — three review-card placeholders wired to empty real-review fields; no fake text, names, stars, or counts. "READ MORE GOOGLE REVIEWS" link when the profile URL exists.
7. **Final CTA** — dark band, "GET YOUR CAR LOOKED AT TODAY.", call CTA, "REQUEST AN ESTIMATE" opening an inline expandable panel on desktop and a bottom sheet on mobile, plus Get Directions.

**Estimate form**: Name, Phone, Vehicle Year/Make/Model, problem description, Preferred Contact Method (Call/Text). No email. Client-side validation with accessible labels and inline errors. Submission is local-only with a same-page success state ("WE RECEIVED YOUR REQUEST.") and a clearly commented `TODO: integration point` for form/SMS/CRM/email delivery — no pretend backend.

**Footer**: name, address, phone, hours, domain, Get Directions.

## Design system

Tokens in `src/styles.css` (oklch): near-black navy background, white sections, safety orange accent, thin border token, small radii. Condensed bold display font plus a neutral body font loaded via `<link>` in `__root.tsx`. Compact vertical rhythm, max-width container, 44–48px touch targets, safe-area padding, reduced-motion support, visible focus rings.

Mobile-first, verified at 375 / 390 / 430px with no horizontal overflow; desktop uses controlled max width and multi-column density.

## Technical notes

- Rewrite `src/routes/index.tsx` as the landing page; components under `src/components/landing/*` (UtilityBar, SiteHeader, StickyMobileActions, Hero, Services, BenefitBlocks, ShopGallery, LocationSection, Reviews, FinalCta, EstimateForm, Footer).
- Route `head()` on `/`: title, meta description, canonical, Open Graph + Twitter tags, and `AutoRepair` JSON-LD (name, address, url, services, `sameAs` placeholders). No review schema.
- Sticky mobile bar appears via IntersectionObserver once the hero CTAs scroll out; hides while an input is focused (keyboard open).
- Every CTA carries a `data-cta` / `id` attribute from the tracking-ID list (`cta-call-hero`, `form-estimate-submit`, etc.) so GTM/GA4/Ads can bind later — no fake IDs or scripts added.
- Images: editable placeholder components with explicit width/height, `loading="lazy"` below the fold, alt-text placeholders; swap to WebP/AVIF when real photos arrive.
- No slider, animation, or 3D libraries.
