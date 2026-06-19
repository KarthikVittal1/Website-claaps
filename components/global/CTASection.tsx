import { Container } from "@/components/global/Container";
import { Button } from "@/components/global/Button";

export function CTASection({
  title,
  lead,
  primaryLabel = "Request a Consultation",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
}: {
  title: string;
  lead?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-graphite-700 py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,_rgba(242,74,29,0.08),_transparent_55%),radial-gradient(circle_at_70%_60%,_rgba(78,86,184,0.12),_transparent_55%)]"
      />
      <Container>
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.02em]">{title}</h2>
          {lead ? <p className="mt-4 text-lg text-slate-400">{lead}</p> : null}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={primaryHref} size="lg">
              {primaryLabel}
            </Button>
            {secondaryLabel && secondaryHref ? (
              <Button href={secondaryHref} variant="secondary" size="lg">
                {secondaryLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
