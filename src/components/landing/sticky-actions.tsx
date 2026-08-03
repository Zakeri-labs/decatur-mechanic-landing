import { useEffect, useState } from "react";
import { business, isPlaceholder } from "@/config/business";
import { CallButton, TextButton, buttonStyles } from "./ui";

export function StickyMobileActions({
  heroCtaRef,
  hidden,
}: {
  heroCtaRef: React.RefObject<HTMLDivElement | null>;
  hidden: boolean;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = heroCtaRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry?.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [heroCtaRef]);

  if (!visible || hidden) return null;

  const textReady = !isPlaceholder(business.textNumber);

  return (
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-50 border-t border-ink-border bg-ink px-3 pt-3 lg:hidden">
      <div className="grid grid-cols-2 gap-2">
        <CallButton trackingId="cta-call-mobile-sticky" label="Call shop" className="w-full px-2 text-xs" />
        {textReady ? (
          <TextButton trackingId="cta-mobile-sticky-secondary" label="Text us" className="w-full px-2 text-xs" />
        ) : (
          <a
            data-cta="cta-mobile-sticky-secondary"
            href="#estimate"
            className={`${buttonStyles.outlineLight} w-full px-2 text-xs`}
          >
            Request estimate
          </a>
        )}
      </div>
    </div>
  );
}
