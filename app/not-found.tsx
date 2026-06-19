import { Container } from "@/components/global/Container";
import { Button } from "@/components/global/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center py-20">
      <Container size="default" className="max-w-xl text-center">
        <p className="font-mono-data text-sm text-cyan-700">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.02em]">
          This page doesn&rsquo;t exist
        </h1>
        <p className="mt-4 text-base text-slate-400">
          The page you&rsquo;re looking for may have moved or been renamed.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/">Back to homepage</Button>
          <Button href="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </Container>
    </section>
  );
}
