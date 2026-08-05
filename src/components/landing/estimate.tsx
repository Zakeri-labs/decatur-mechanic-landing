import { useId, useState } from "react";
import { business } from "@/config/business";
import { Container, Eyebrow, CallButton, DirectionsButton, buttonStyles } from "./ui";

type Fields = {
  name: string;
  phone: string;
  year: string;
  make: string;
  model: string;
  problem: string;
  contactMethod: "call" | "text";
};

const empty: Fields = {
  name: "",
  phone: "",
  year: "",
  make: "",
  model: "",
  problem: "",
  contactMethod: "call",
};

function validate(values: Fields): Partial<Record<keyof Fields, string>> {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (!values.name.trim()) errors.name = "Enter your name so the shop knows who to contact.";
  if (!/\d{7,}/.test(values.phone.replace(/\D/g, "")))
    errors.phone = "Enter a phone number with at least 7 digits.";
  if (!values.make.trim()) errors.make = "Enter the vehicle make (for example, Honda).";
  if (!values.model.trim()) errors.model = "Enter the vehicle model (for example, Civic).";
  if (values.problem.trim().length < 10)
    errors.problem = "Describe the problem in at least 10 characters.";
  return errors;
}

const fieldClass =
  "min-h-[48px] w-full rounded-xs border border-ink-border bg-ink-soft px-3 text-sm text-ink-foreground placeholder:text-ink-muted";

export function EstimateForm({ onFocusChange }: { onFocusChange: (focused: boolean) => void }) {
  const id = useId();
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof Fields, value: string) => {
    if (!started) {
      setStarted(true);
      // TODO integration point: fire `form-estimate-start` to GTM/GA4 here.
    }
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  if (submitted) {
    return (
      <div className="border border-ink-border bg-ink-soft p-5" role="status" aria-live="polite">
        <h3 className="text-xl font-bold uppercase">We received your request.</h3>
        <p className="mt-2 text-sm text-ink-muted">
          The shop will review the information and contact you using your selected method. For
          urgent help, call the shop now.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <CallButton
            trackingId="cta-call-final-success"
            label="Call the shop"
            className="w-full sm:w-auto"
          />
          <DirectionsButton variant="outlineLight" className="w-full sm:w-auto" />
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      data-cta="form-estimate"
      onFocus={() => onFocusChange(true)}
      onBlur={() => onFocusChange(false)}
      onSubmit={(event) => {
        event.preventDefault();
        const nextErrors = validate(values);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;
        // TODO integration point: POST to business.formDestination
        // (form handler / SMS / CRM / email). No live delivery is wired yet.
        setSubmitted(true);
      }}
      className="space-y-3 border border-ink-border bg-ink-soft p-4"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Field
          id={`${id}-name`}
          label="Name"
          value={values.name}
          error={errors.name}
          onChange={(v) => set("name", v)}
          autoComplete="name"
        />
        <Field
          id={`${id}-phone`}
          label="Phone number"
          type="tel"
          value={values.phone}
          error={errors.phone}
          onChange={(v) => set("phone", v)}
          autoComplete="tel"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Field
          id={`${id}-year`}
          label="Vehicle year"
          inputMode="numeric"
          value={values.year}
          onChange={(v) => set("year", v)}
        />
        <Field
          id={`${id}-make`}
          label="Make"
          value={values.make}
          error={errors.make}
          onChange={(v) => set("make", v)}
        />
        <Field
          id={`${id}-model`}
          label="Model"
          value={values.model}
          error={errors.model}
          onChange={(v) => set("model", v)}
        />
      </div>

      <div>
        <label
          htmlFor={`${id}-problem`}
          className="mb-1 block text-xs uppercase tracking-widest text-ink-muted"
        >
          What problem are you experiencing?
        </label>
        <textarea
          id={`${id}-problem`}
          rows={3}
          value={values.problem}
          onChange={(e) => set("problem", e.target.value)}
          aria-invalid={Boolean(errors.problem)}
          aria-describedby={errors.problem ? `${id}-problem-error` : undefined}
          className={`${fieldClass} py-2`}
        />
        {errors.problem && (
          <p id={`${id}-problem-error`} className="mt-1 text-xs text-brand">
            {errors.problem}
          </p>
        )}
      </div>

      <fieldset className="flex flex-wrap items-center gap-5">
        <legend className="mb-1 text-xs uppercase tracking-widest text-ink-muted">
          Preferred contact method
        </legend>
        {(["call", "text"] as const).map((method) => (
          <label key={method} className="flex min-h-[44px] items-center gap-2 text-sm capitalize">
            <input
              type="radio"
              name={`${id}-contact`}
              value={method}
              checked={values.contactMethod === method}
              onChange={() => set("contactMethod", method)}
              className="h-4 w-4 accent-[var(--brand)]"
            />
            {method}
          </label>
        ))}
      </fieldset>

      <button
        type="submit"
        data-cta="form-estimate-submit"
        className={`${buttonStyles.primary} w-full`}
      >
        Send my vehicle details
      </button>

      <p className="text-xs leading-relaxed text-ink-muted">
        Share a few details about the vehicle and the problem. This request does not confirm an
        appointment or final repair price.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  inputMode,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | undefined;
  type?: string | undefined;
  inputMode?: "numeric" | undefined;
  autoComplete?: string | undefined;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1 block text-xs uppercase tracking-widest text-ink-muted">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        inputMode={inputMode}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={fieldClass}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-brand">
          {error}
        </p>
      )}
    </div>
  );
}

export function FinalCta({ onFormFocusChange }: { onFormFocusChange: (focused: boolean) => void }) {
  return (
    <section id="estimate" className="bg-ink py-12 text-ink-foreground lg:py-16">
      <Container className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="min-w-0">
          <Eyebrow>Ready when you are</Eyebrow>
          <h2 className="mt-2 text-3xl font-bold uppercase leading-tight sm:text-4xl">
            Get your car looked at today.
          </h2>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink-muted">
            Call the shop to check current availability, or send your vehicle details and a short
            description of the problem.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CallButton
              trackingId="cta-call-final"
              label="Call the Decatur shop"
              className="w-full sm:w-auto"
            />
            <DirectionsButton variant="outlineLight" className="w-full sm:w-auto" />
          </div>
          <p className="mt-4 font-mono text-[11px] text-ink-muted">
            Form destination: {business.formDestination} — future integration point.
          </p>
        </div>

        <div id="estimate-panel" className="min-w-0">
          <EstimateForm onFocusChange={onFormFocusChange} />
        </div>
      </Container>
    </section>
  );
}
