import { ArrowRight } from "lucide-react";
import { Container } from "@/components/global/Container";
import { SectionHeading } from "@/components/global/SectionHeading";
import { Card } from "@/components/global/Card";
import { GetInTouchSection } from "@/components/global/GetInTouchSection";
import { HeroSlider } from "@/components/ui/hero-slider";
import { TheWorkSection } from "@/components/ui/the-work-section";
import AboutUsSection from "@/components/ui/about-us-section";
import LogosSection from "@/components/ui/logos-section";
import WhyClaapsSection from "@/components/ui/why-claaps-section";
import { roles } from "@/lib/content/solutions";

export default function Home() {
  return (
    <>
      {/* The wrapper releases the sticky hero after the About section. */}
      <div className="relative">
        <HeroSlider />
        <AboutUsSection />
      </div>

      <div className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,_rgba(242,74,29,0.08),_transparent_55%),radial-gradient(circle_at_70%_60%,_rgba(78,86,184,0.12),_transparent_55%)]"
        />

        <LogosSection />

        <TheWorkSection />

        <section className="relative border-b border-graphite-700 py-24 md:py-32">
          <Container>
            <SectionHeading
              eyebrow="Solutions by role"
              title="Find the path that matches your responsibility"
            />
            <div className="mt-12 grid gap-4 md:grid-cols-5">
              {roles.map((role) => (
                <Card key={role.slug} href={`/solutions#${role.slug}`} className="items-center text-center">
                  <p className="text-lg font-medium text-offwhite-50">{role.label}</p>
                  <span className="mt-auto flex items-center gap-1 pt-3 text-sm text-slate-400 transition-colors duration-150 group-hover:text-electric-600">
                    View
                    <ArrowRight
                      aria-hidden
                      size={14}
                      strokeWidth={2}
                      className="transition-transform duration-150 group-hover:translate-x-0.5"
                    />
                  </span>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      </div>

      <WhyClaapsSection />

      <GetInTouchSection />
    </>
  );
}
