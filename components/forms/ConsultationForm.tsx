"use client";

import { useActionState } from "react";
import { Send } from "lucide-react";
import { submitConsultationRequest, type ConsultationFormState } from "@/app/contact/actions";

const initialState: ConsultationFormState = { status: "idle" };

const inputClass =
  "h-12 w-full rounded-xl border border-graphite-700 bg-white px-4 text-sm text-offwhite-50 placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus-visible:border-electric-500 focus-visible:ring-2 focus-visible:ring-electric-500/20";

const textareaClass =
  "w-full rounded-xl border border-graphite-700 bg-white px-4 py-3.5 text-sm text-offwhite-50 placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus-visible:border-electric-500 focus-visible:ring-2 focus-visible:ring-electric-500/20 resize-none";

const labelClass =
  "mb-1.5 block text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-slate-400";

export function ConsultationForm() {
  const [state, formAction, pending] = useActionState(submitConsultationRequest, initialState);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-xl border border-success-500/40 bg-success-500/10 p-6 text-sm text-offwhite-50"
      >
        {state.message}
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      {/* First Name + Last Name */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className={labelClass}>First Name</label>
          <input id="firstName" name="firstName" type="text" placeholder="Jane" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>Last Name</label>
          <input id="lastName" name="lastName" type="text" placeholder="Smith" required className={inputClass} />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelClass}>Email</label>
        <input id="email" name="email" type="email" placeholder="jane@company.com" required className={inputClass} />
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className={labelClass}>Company</label>
        <input id="company" name="company" type="text" placeholder="Acme Corp" required className={inputClass} />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClass}>Message</label>
        <textarea id="message" name="message" rows={5} placeholder="Tell us about your Oracle GRC needs..." required className={textareaClass} />
      </div>

      {state.status === "error" && (
        <p role="alert" className="text-xs text-danger-700">{state.message}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={pending}
        className="mt-1 flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan-700 to-purple-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition-all duration-200 hover:scale-[1.02] hover:shadow-elevation-glow disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send Message"}
        {!pending && <Send size={15} strokeWidth={2} />}
      </button>
    </form>
  );
}
