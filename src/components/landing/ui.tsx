import type { ReactNode } from "react";
import { business, telHref, smsHref, isPlaceholder, directionsUrl } from "@/config/business";
import type { ImagePlaceholder } from "@/config/business";
import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string | undefined;
  children: ReactNode;
}) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>{children}</div>;
}

export function Eyebrow({
  className,
  children,
}: {
  className?: string | undefined;
  children: ReactNode;
}) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}

const base =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xs px-5 text-center font-display text-sm font-semibold uppercase tracking-widest transition-colors disabled:opacity-60";

export const buttonStyles = {
  primary: cn(base, "bg-brand text-brand-foreground hover:bg-brand/90"),
  outlineLight: cn(
    base,
    "border border-ink-border bg-transparent text-ink-foreground hover:bg-ink-soft",
  ),
  outlineDark: cn(
    base,
    "border border-foreground/25 bg-transparent text-foreground hover:bg-foreground/5",
  ),
  outlineBrand: cn(
    base,
    "border border-foreground/25 bg-transparent text-foreground hover:border-brand hover:bg-brand hover:text-brand-foreground",
  ),
};

/** Renders a telephone link when the phone number is confirmed, otherwise a labelled placeholder. */
export function CallButton({
  trackingId,
  label,
  className,
}: {
  trackingId: string;
  label: ReactNode;
  className?: string | undefined;
}) {
  const href = telHref(business.phone);
  const classes = cn(buttonStyles.primary, className);
  if (!href) {
    return (
      <span
        data-cta={trackingId}
        id={trackingId}
        title="Phone number pending client confirmation"
        className={cn(classes, "cursor-not-allowed")}
      >
        {label}
      </span>
    );
  }
  return (
    <a data-cta={trackingId} id={trackingId} href={href} className={classes}>
      {label}
    </a>
  );
}

export function TextButton({
  trackingId,
  label,
  className,
}: {
  trackingId: string;
  label: string;
  className?: string | undefined;
}) {
  const href = smsHref(business.textNumber);
  if (!href) {
    return (
      <span
        data-cta={trackingId}
        className={cn(buttonStyles.outlineLight, className, "cursor-not-allowed")}
      >
        {label}
      </span>
    );
  }
  return (
    <a data-cta={trackingId} href={href} className={cn(buttonStyles.outlineLight, className)}>
      {label}
    </a>
  );
}

export function DirectionsButton({
  className,
  variant = "outlineDark",
  label = "Get directions",
}: {
  className?: string | undefined;
  variant?: keyof typeof buttonStyles | undefined;
  label?: string | undefined;
}) {
  return (
    <a
      data-cta="cta-directions"
      href={directionsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonStyles[variant], className)}
    >
      {label}
    </a>
  );
}

/** Shows the confirmed value, or a clearly-marked placeholder token. */
export function ConfigValue({
  value,
  className,
}: {
  value: string;
  className?: string | undefined;
}) {
  if (isPlaceholder(value)) {
    return (
      <span
        className={cn(
          "inline-block rounded-xs border border-dashed border-current/40 px-1.5 py-0.5 font-mono text-[11px] opacity-70",
          className,
        )}
      >
        {value}
      </span>
    );
  }
  return <span className={className}>{value}</span>;
}

export function PhoneValue({ className }: { className?: string | undefined }) {
  const href = telHref(business.phone);
  if (!href) return <ConfigValue value={business.phone} className={className} />;
  return (
    <a href={href} data-cta="cta-call-utility" className={cn("hover:text-brand", className)}>
      {business.phone}
    </a>
  );
}

export function ShopImage({
  image,
  className,
  priority = false,
}: {
  image: ImagePlaceholder;
  className?: string | undefined;
  priority?: boolean | undefined;
}) {
  if (isPlaceholder(image.src)) {
    return (
      <div
        role="img"
        aria-label={image.alt}
        style={{ aspectRatio: `${image.width} / ${image.height}` }}
        className={cn(
          "flex w-full flex-col items-center justify-center gap-2 border border-dashed border-ink-border bg-ink-soft px-4 text-center",
          className,
        )}
      >
        <span className="font-mono text-[11px] text-ink-muted">{image.src}</span>
        <span className="max-w-[28ch] text-xs text-ink-muted">{image.alt}</span>
      </div>
    );
  }
  return (
    <img
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
