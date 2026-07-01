"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

const linkedinIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const offices = [
  {
    country: "India",
    lines: ["6th Floor, Cyber Towers, Q3, Patrika Nagar,", "HITEC City, Hyderabad, Telangana 500081"],
  },
  { country: "USA", lines: ["24285 Katy Freeway, Suite #300-102", "Katy, TX 77494"] },
];

type Contact = {
  icon: ReactNode;
  label: string;
  lines: string[];
  href: string;
  external?: boolean;
  action: string;
};

const contacts: Contact[] = [
  {
    icon: <Phone className="h-6 w-6" strokeWidth={2} aria-hidden />,
    label: "Call Us On",
    lines: ["+1 832-387-4387", "+91 77996 55336"],
    href: "tel:+18323874387",
    action: "Call us",
  },
  {
    icon: <Mail className="h-6 w-6" strokeWidth={2} aria-hidden />,
    label: "Email Us",
    lines: ["info@claaps.com"],
    href: "mailto:info@claaps.com",
    action: "Send email",
  },
  {
    icon: linkedinIcon,
    label: "LinkedIn",
    lines: ["linkedin.com/company/claaps"],
    href: "https://www.linkedin.com/company/claaps/",
    external: true,
    action: "Follow us",
  },
];

export const ProfessionalConnect = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const entrance = isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0";

  return (
    <section className="relative w-full overflow-hidden border-t border-graphite-700 bg-navy-950">
      {/* Background accents (light theme) */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#eef1f5_1px,transparent_1px),linear-gradient(to_bottom,#eef1f5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute left-10 top-16 h-72 w-72 rounded-full bg-cyan-700/10 blur-[120px]" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 py-24 md:py-28">
        {/* Header */}
        <div className={`mb-14 text-center transition-all duration-1000 ${entrance}`}>
          <div className="mb-4 inline-block rounded-full border border-cyan-700/20 bg-cyan-700/5 px-4 py-1.5">
            <span className="text-sm font-semibold uppercase tracking-[0.08em] text-cyan-700">
              Contact us
            </span>
          </div>
          <h2 className="mb-5 text-4xl font-bold tracking-tight text-offwhite-50 md:text-6xl">
            Get In Touch
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-400">
            Tell us about your Oracle GRC, risk, or compliance challenge - we&rsquo;ll respond with
            next steps, not a sales script.
          </p>
        </div>

        <div className="flex w-full flex-col gap-6">
          {/* Locations - full width, both offices side by side */}
          <div
            className={`group relative transition-all duration-700 ${entrance}`}
            style={{ transitionDelay: "0ms" }}
          >
            <div className="relative overflow-hidden rounded-2xl border border-graphite-700 bg-navy-950 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-700/40 hover:shadow-xl">
              <div className="mb-4 inline-flex w-fit rounded-xl bg-gradient-to-br from-cyan-700 to-purple-500 p-3 text-white shadow-sm transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
                <MapPin className="h-6 w-6" strokeWidth={2} aria-hidden />
              </div>
              <h3 className="mb-4 text-base font-semibold text-offwhite-50">Our Locations</h3>
              <div className="grid gap-6 sm:grid-cols-2">
                {offices.map((office) => (
                  <div key={office.country}>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-cyan-700">
                      {office.country}
                    </p>
                    {office.lines.map((line) => (
                      <p key={line} className="text-sm leading-snug text-slate-400">
                        {line}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact methods - Call / Email / LinkedIn */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {contacts.map((c, index) => (
              <a
                key={c.label}
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
                className={`group relative transition-all duration-700 ${entrance}`}
                style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-graphite-700 bg-navy-950 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-700/40 hover:shadow-xl">
                  <div className="mb-4 inline-flex w-fit rounded-xl bg-gradient-to-br from-cyan-700 to-purple-500 p-3 text-white shadow-sm transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
                    {c.icon}
                  </div>
                  <h3 className="mb-1.5 text-base font-semibold text-offwhite-50">{c.label}</h3>
                  <div className="space-y-1">
                    {c.lines.map((line) => (
                      <p key={line} className="text-sm leading-snug text-slate-400">
                        {line}
                      </p>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center text-sm font-medium text-slate-400 transition-colors duration-300 group-hover:text-cyan-700">
                    {c.action}
                    <ArrowRight
                      className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`mt-14 text-center transition-all duration-1000 [transition-delay:600ms] ${entrance}`}>
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-700 to-purple-500 px-8 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-elevation-glow"
          >
            <span className="relative z-10">Request a Consultation</span>
            <ArrowRight
              className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </section>
  );
};
