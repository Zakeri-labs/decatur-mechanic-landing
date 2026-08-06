"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { SiteFooter, SiteHeader } from "./chrome";
import { FinalCta } from "./estimate";
import { BenefitBlocks, Hero, InsideTheShop, LocationSection, Reviews, Services } from "./sections";
import { StickyMobileActions } from "./sticky-actions";

function RevealOnScroll({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsVisible(true);
        observer.unobserve(section);
      },
      { threshold: 0.01, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`reveal-section ${isVisible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function LandingInteractions() {
  const heroCtaRef = useRef<HTMLDivElement | null>(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <RevealOnScroll>
          <Hero ctaRef={heroCtaRef} />
        </RevealOnScroll>
        <RevealOnScroll delay={40}>
          <Services />
        </RevealOnScroll>
        <RevealOnScroll delay={40}>
          <BenefitBlocks />
        </RevealOnScroll>
        <RevealOnScroll delay={40}>
          <InsideTheShop />
        </RevealOnScroll>
        <RevealOnScroll delay={40}>
          <LocationSection />
        </RevealOnScroll>
        <RevealOnScroll delay={40}>
          <Reviews />
        </RevealOnScroll>
        <RevealOnScroll delay={40}>
          <FinalCta onFormFocusChange={setKeyboardOpen} />
        </RevealOnScroll>
      </main>
      <SiteFooter />
      <StickyMobileActions heroCtaRef={heroCtaRef} hidden={keyboardOpen} />
      <div className="h-16 lg:hidden" aria-hidden="true" />
    </div>
  );
}
