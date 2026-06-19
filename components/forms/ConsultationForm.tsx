"use client";

import { useActionState, useState } from "react";
import { submitConsultationRequest, type ConsultationFormState } from "@/app/contact/actions";
import { services } from "@/lib/content/services";
import { Button } from "@/components/global/Button";
import { cn } from "@/lib/cn";

const roleOptions = ["CIO", "CISO", "Audit Leader", "Compliance Team", "Risk Leader", "Other"];
const totalSteps = 3;

const initialState: ConsultationFormState = { status: "idle" };

type Values = {
  name: string;
  email: string;
  company: string;
  role: string;
  serviceInterest: string;
  message: string;
};

const initialValues: Values = {
  name: "",
  email: "",
  company: "",
  role: "",
  serviceInterest: "",
  message: "",
};

const inputClass =
  "h-11 w-full rounded-sm border border-graphite-700 bg-navy-900 px-4 text-base text-offwhite-50 transition-colors duration-150 focus-visible:border-electric-500 focus:outline-none";
const textareaClass =
  "w-full rounded-sm border border-graphite-700 bg-navy-900 px-4 py-3 text-base text-offwhite-50 transition-colors duration-150 focus-visible:border-electric-500 focus:outline-none";

export function ConsultationForm() {
  const [state, formAction, pending] = useActionState(submitConsultationRequest, initialState);
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validateStep(current: number) {
    const next: Partial<Record<keyof Values, string>> = {};
    if (current === 1) {
      if (!values.name.trim()) next.name = "Enter your name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Enter a valid work email.";
      if (!values.company.trim()) next.company = "Enter your company name.";
      if (!values.role) next.role = "Select your role.";
    }
    if (current === 2) {
      if (!values.serviceInterest) next.serviceInterest = "Select an area of interest.";
    }
    if (current === 3) {
      if (!values.message.trim()) next.message = "Add a short message.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (validateStep(step)) setStep((s) => Math.min(totalSteps, s + 1));
  }

  function goBack() {
    setStep((s) => Math.max(1, s - 1));
  }

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-lg border border-success-500/40 bg-success-500/10 p-6 text-sm text-offwhite-50"
      >
        {state.message}
      </div>
    );
  }

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!validateStep(3)) e.preventDefault();
      }}
      noValidate
      className="flex flex-col gap-6"
    >
      <div aria-live="polite" className="text-sm text-slate-400">
        Step {step} of {totalSteps}
      </div>
      <div aria-hidden="true" className="flex gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={cn("h-1 flex-1 rounded-full", i < step ? "bg-electric-500" : "bg-graphite-700")}
          />
        ))}
      </div>

      <fieldset hidden={step !== 1} className="flex flex-col gap-5">
        <legend className="text-lg font-medium text-offwhite-50">Your role &amp; company</legend>

        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-offwhite-50">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass}
          />
          {errors.name ? (
            <p id="name-error" role="alert" className="mt-2 text-sm text-danger-700">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-offwhite-50">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass}
          />
          {errors.email ? (
            <p id="email-error" role="alert" className="mt-2 text-sm text-danger-700">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="company" className="mb-2 block text-sm font-medium text-offwhite-50">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? "company-error" : undefined}
            className={inputClass}
          />
          {errors.company ? (
            <p id="company-error" role="alert" className="mt-2 text-sm text-danger-700">
              {errors.company}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="role" className="mb-2 block text-sm font-medium text-offwhite-50">
            Your role
          </label>
          <select
            id="role"
            name="role"
            value={values.role}
            onChange={(e) => update("role", e.target.value)}
            aria-invalid={!!errors.role}
            aria-describedby={errors.role ? "role-error" : undefined}
            className={inputClass}
          >
            <option value="">Select a role</option>
            {roleOptions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          {errors.role ? (
            <p id="role-error" role="alert" className="mt-2 text-sm text-danger-700">
              {errors.role}
            </p>
          ) : null}
        </div>

        <div className="flex justify-end">
          <Button type="button" onClick={goNext}>
            Next →
          </Button>
        </div>
      </fieldset>

      <fieldset hidden={step !== 2} className="flex flex-col gap-5">
        <legend className="text-lg font-medium text-offwhite-50">Area of interest</legend>
        <div role="radiogroup" aria-label="Area of interest" className="flex flex-col gap-3">
          {services.map((s) => (
            <label
              key={s.slug}
              className="flex items-center gap-3 rounded-md border border-graphite-700 p-3 text-sm transition-colors duration-150 hover:border-electric-500/40"
            >
              <input
                type="radio"
                name="serviceInterest"
                value={s.shortTitle}
                checked={values.serviceInterest === s.shortTitle}
                onChange={() => update("serviceInterest", s.shortTitle)}
              />
              {s.shortTitle}
            </label>
          ))}
          <label className="flex items-center gap-3 rounded-md border border-graphite-700 p-3 text-sm transition-colors duration-150 hover:border-electric-500/40">
            <input
              type="radio"
              name="serviceInterest"
              value="Not sure yet"
              checked={values.serviceInterest === "Not sure yet"}
              onChange={() => update("serviceInterest", "Not sure yet")}
            />
            Not sure yet
          </label>
        </div>
        {errors.serviceInterest ? (
          <p role="alert" className="text-sm text-danger-700">
            {errors.serviceInterest}
          </p>
        ) : null}
        <div className="flex justify-between">
          <Button type="button" variant="secondary" onClick={goBack}>
            ← Back
          </Button>
          <Button type="button" onClick={goNext}>
            Next →
          </Button>
        </div>
      </fieldset>

      <fieldset hidden={step !== 3} className="flex flex-col gap-5">
        <legend className="text-lg font-medium text-offwhite-50">Message</legend>
        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-offwhite-50">
            What are you trying to solve?
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={textareaClass}
          />
          {errors.message ? (
            <p id="message-error" role="alert" className="mt-2 text-sm text-danger-700">
              {errors.message}
            </p>
          ) : null}
        </div>

        {state.status === "error" ? (
          <p role="alert" className="text-sm text-danger-700">
            {state.message}
          </p>
        ) : null}

        <div className="flex justify-between">
          <Button type="button" variant="secondary" onClick={goBack}>
            ← Back
          </Button>
          <Button type="submit" disabled={pending}>
            {pending ? "Sending…" : "Send request"}
          </Button>
        </div>
      </fieldset>
    </form>
  );
}
