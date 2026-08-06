"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "@/config/business";
import { CallButton, buttonStyles } from "./ui";

type Service = (typeof services)[number];

function ServiceCallLabel({ label }: { label: string }) {
  const [call, ...details] = label.split(" ");

  return (
    <span className="flex items-center justify-center gap-1 text-center lg:flex-col lg:gap-0 lg:leading-tight">
      <span className="whitespace-nowrap">{call}</span>
      <span className="whitespace-nowrap lg:text-xs lg:leading-none">{details.join(" ")}</span>
    </span>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  const cardRef = useRef<HTMLLIElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const isHighlighted = isMobile && isInViewport;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const updateMobileState = () => setIsMobile(mediaQuery.matches);
    updateMobileState();
    mediaQuery.addEventListener("change", updateMobileState);

    return () => mediaQuery.removeEventListener("change", updateMobileState);
  }, []);

  useEffect(() => {
    if (!isMobile || !cardRef.current) {
      setIsInViewport(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(Boolean(entry?.isIntersecting)),
      { threshold: 0.55 },
    );
    observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <li
      ref={cardRef}
      className={`group relative flex flex-col border border-hairline bg-card p-5 transition-[border-color,box-shadow] duration-300 hover:border-brand hover:shadow-[0_0_24px_oklch(0.68_0.19_47_/_0.45)] ${
        isHighlighted ? "border-brand shadow-[0_0_24px_oklch(0.68_0.19_47_/_0.45)]" : ""
      }`}
    >
      <div className="flex min-h-16 items-start justify-between gap-3">
        <span className="font-display text-xl font-bold text-brand">{service.number}</span>
      </div>
      <img
        src={service.image}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-3 h-24 w-28 object-contain object-right-top"
      />
      <h3 className="mt-2 font-display text-base font-bold uppercase tracking-wide">
        {service.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{service.copy}</p>
      <CallButton
        trackingId={service.tracking}
        label={<ServiceCallLabel label={service.footer} />}
        className={`${buttonStyles.outlineBrand} mt-5 w-full lg:items-center lg:justify-center group-hover:border-brand group-hover:bg-brand group-hover:text-brand-foreground ${
          isHighlighted ? "border-brand bg-brand text-brand-foreground" : ""
        }`}
      />
    </li>
  );
}
