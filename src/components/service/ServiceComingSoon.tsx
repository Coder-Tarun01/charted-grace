import { Link } from "react-router-dom";

type ServiceComingSoonProps = {
  title: string;
};

export default function ServiceComingSoon({ title }: ServiceComingSoonProps) {
  return (
    <section className="min-h-[70vh] bg-[linear-gradient(120deg,#f7f3f3_0%,#f8f8f8_55%,#e9f4ff_100%)]">
      <div className="mx-auto flex min-h-[70vh] w-full max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
        <p className="mb-6 text-xs font-semibold tracking-[0.25em] text-foreground/65">PRISMANIA</p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Great things coming soon.
        </h1>
        <p className="mt-5 max-w-2xl text-sm text-muted-foreground sm:text-base">
          {title} page is under preparation. Please check back shortly.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center rounded border border-foreground/30 px-6 py-3 text-xs font-semibold tracking-[0.08em] text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          GO TO HOME →
        </Link>
      </div>
    </section>
  );
}
