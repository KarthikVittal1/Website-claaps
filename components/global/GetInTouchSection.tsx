import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { Container } from "@/components/global/Container";
import { ConsultationForm } from "@/components/forms/ConsultationForm";

const contactDetails = [
  {
    icon: MapPin,
    label: "Our Location",
    lines: ["24285 Katy Freeway, Suite #300-102", "Katy, TX 77494"],
  },
  {
    icon: Phone,
    label: "Call Us On",
    lines: ["+1 832-387-4387", "+91 77996 55336"],
  },
  {
    icon: Mail,
    label: "Email Us",
    lines: ["info@claaps.com"],
    href: "mailto:info@claaps.com",
  },
  {
    icon: Globe,
    label: "Our Website",
    lines: ["www.claaps.com"],
    href: "https://www.claaps.com",
  },
];

export function GetInTouchSection() {
  return (
    <section className="relative overflow-hidden border-t border-graphite-700 py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,_rgba(242,74,29,0.08),_transparent_55%),radial-gradient(circle_at_70%_60%,_rgba(78,86,184,0.12),_transparent_55%)]"
      />
      <Container className="relative">
        <div className="mx-auto flex max-w-screen-xl flex-col gap-12 lg:flex-row lg:gap-16">
          <div className="flex flex-1 flex-col gap-10">
            <div>
              
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
                Get In Touch
              </h2>
              <p className="mt-4 max-w-md text-lg leading-7 text-slate-400">
                Tell us about your Oracle GRC, risk, or compliance challenge —
                we&rsquo;ll respond with next steps, not a sales script.
              </p>
            </div>

            <ul className="grid gap-6 sm:grid-cols-2">
              {contactDetails.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label} className="flex gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-700/10 text-cyan-700">
                      <Icon size={18} strokeWidth={2} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-offwhite-50">{item.label}</p>
                      {item.lines.map((line, i) =>
                        item.href && i === 0 ? (
                          <a
                            key={line}
                            href={item.href}
                            className="block text-sm text-slate-400 hover:text-electric-600"
                          >
                            {line}
                          </a>
                        ) : (
                          <p key={line} className="text-sm text-slate-400">
                            {line}
                          </p>
                        )
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex-1 rounded-lg border border-graphite-700 bg-navy-800 p-8 md:p-10">
            <ConsultationForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
