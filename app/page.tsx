import { HeroSlider } from "@/components/ui/hero-slider";
import AboutUsSection from "@/components/ui/about-us-section";
import LogosSection from "@/components/ui/logos-section";
import WhyClaapsSection from "@/components/ui/why-claaps-section";
import { ProfessionalConnect } from "@/components/ui/get-in-touch";

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
      </div>

      <WhyClaapsSection />

      <ProfessionalConnect />
    </>
  );
}
