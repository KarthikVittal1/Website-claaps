import { ArrowRight } from "lucide-react";
import { Container } from "@/components/global/Container";
import { SectionHeading } from "@/components/global/SectionHeading";
import { Card } from "@/components/global/Card";
import { Button } from "@/components/global/Button";
import { GetInTouchSection } from "@/components/global/GetInTouchSection";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { CardCarousel } from "@/components/ui/card-carousel";
import { TheWorkSection } from "@/components/ui/the-work-section";
import AboutUsSection from "@/components/ui/about-us-section";
import LogosSection from "@/components/ui/logos-section";
import WhyClaapsSection from "@/components/ui/why-claaps-section";
import { roles } from "@/lib/content/solutions";

export default function Home() {
  return (
    <>
      {/* Wraps hero + About together so the sticky hero's containing block
          ends right after About. Without this wrapper, the containing
          block is the whole page, and position:sticky never structurally
          releases hero — it only ever gets covered by whatever happens to
          paint on top. Once About's own box finishes and nothing further
          down the page has a high enough z-index to keep covering it, the
          still-"stuck" hero bleeds back through later sections. */}
      <div className="relative">
        <section className="sticky top-0 isolate z-0 flex min-h-screen items-center">
          {/* Extends past the section's own top edge (further than the header's
              h-18) so the gradient fills the screen behind the transparent
              header too — otherwise the body's white background showed
              through as a seam. Deliberately over-extended past the header's
              exact height so sub-pixel rounding at different browser zoom
              levels can't reopen a hairline gap. */}
          <div className="absolute inset-x-0 -top-24 bottom-0">
            <BackgroundGradientAnimation
              containerClassName="absolute inset-0"
              gradientBackgroundStart="rgb(17, 19, 23)"
              gradientBackgroundEnd="rgb(8, 9, 13)"
              firstColor="78, 86, 184"
              secondColor="107, 79, 191"
              thirdColor="194, 61, 23"
              fourthColor="107, 114, 199"
              fifthColor="242, 74, 29"
              pointerColor="107, 79, 191"
            />
          </div>
          <Container className="relative grid items-center gap-12 py-24 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.08em] text-cyan-400">
                Oracle Governance, Risk &amp; Compliance Specialists
              </p>
              <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.02em] text-white md:text-6xl lg:text-7xl">
                Enterprise risk, governed with precision
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-7 text-white/70">
                Claaps designs, implements, and supports Oracle GRC and Oracle
                Risk Management Cloud for enterprises that treat governance as
                a board-level responsibility, not a checkbox.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button href="/contact" size="lg">
                  Request a Consultation
                </Button>
                <Button
                  href="/services"
                  variant="secondary"
                  size="lg"
                  className="!border-white/30 !text-white hover:!border-white/50"
                >
                  Explore Services
                </Button>
              </div>
            </div>

            {/* Right side: Swiper Coverflow carousel */}
            <div className="hidden lg:block">
              <CardCarousel
                images={[
                  { src: "/images/carousel-slides/slide-1.png", alt: "Oracle GRC & Risk Management" },
                  { src: "/images/carousel-slides/slide-2.png", alt: "Cloud Security & Compliance" },
                  { src: "/images/carousel-slides/slide-3.png", alt: "AI & Intelligent Automation" },
                  { src: "/images/carousel-slides/slide-4.png", alt: "Digital Transformation" },
                  { src: "/images/carousel-slides/slide-5.png", alt: "Enterprise Technology Solutions" },
                ]}
                autoplayDelay={2000}
                showPagination={true}
                showNavigation={true}
              />
            </div>
          </Container>
        </section>

        <AboutUsSection />
      </div>

      <LogosSection />

      <TheWorkSection />

      <section className="border-b border-graphite-700 py-24 md:py-32">
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

      <WhyClaapsSection />

      <GetInTouchSection />
    </>
  );
}
