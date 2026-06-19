import type { Metadata } from "next";
import { Container } from "@/components/global/Container";
import { Breadcrumb } from "@/components/global/Breadcrumb";
import { PlaceholderBlock } from "@/components/global/PlaceholderBlock";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-20 md:py-28">
      <Container size="default" className="max-w-2xl">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
        />
        <h1 className="mt-6 text-4xl font-semibold tracking-[-0.02em]">Privacy Policy</h1>
        <div className="mt-8">
          <PlaceholderBlock label="Privacy policy text pending legal review — do not publish without counsel sign-off" />
        </div>
      </Container>
    </section>
  );
}
