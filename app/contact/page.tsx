import type { Metadata } from "next";
import { Container } from "@/components/global/Container";
import { Breadcrumb } from "@/components/global/Breadcrumb";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { contactPageJsonLd } from "@/lib/schema/organization";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request a consultation with Claaps Technology Services about Oracle GRC, risk, or compliance.",
};

const expectationSteps = [
  "We review your message and route it to the relevant specialist.",
  "You'll hear back from a member of the Claaps team to scope the conversation.",
  "If it's a fit, we schedule a working session — not a generic sales pitch.",
];

export default function ContactPage() {
  const jsonLd = contactPageJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <section className="py-20 md:py-28">
        <Container>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <h1 className="mt-6 max-w-2xl text-5xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-6xl">
            Let&rsquo;s talk
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-400">
            Tell us about your Oracle GRC, risk, or compliance challenge.
          </p>

          <div className="mt-12 grid gap-12 lg:grid-cols-[3fr_2fr]">
            <ConsultationForm />

            <div className="flex flex-col gap-8">
              <div className="rounded-lg border border-graphite-700 bg-navy-800 p-6">
                <h2 className="text-sm font-medium uppercase tracking-[0.06em] text-cyan-700">
                  What happens next
                </h2>
                <ol className="mt-4 flex flex-col gap-3">
                  {expectationSteps.map((step, i) => (
                    <li key={step} className="flex gap-3 text-sm leading-6 text-slate-400">
                      <span aria-hidden className="font-mono-data text-electric-600">
                        {i + 1}.
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-lg border border-graphite-700 bg-navy-800 p-6">
                <h2 className="text-sm font-medium uppercase tracking-[0.06em] text-cyan-700">
                  Existing client?
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  If you have an active Managed Support agreement, contact your assigned
                  support lead directly rather than using this form.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
