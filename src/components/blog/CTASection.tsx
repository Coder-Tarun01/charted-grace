import { Link } from "react-router-dom";

type CTASectionProps = {
  title: string;
  description: string;
  buttonLabel?: string;
};

export default function CTASection({ title, description, buttonLabel = "Talk to an Expert" }: CTASectionProps) {
  return (
    <section className="border-y border-border bg-foreground py-14 text-background">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-background/80">{description}</p>
        <Link
          to="/#contact"
          className="mt-8 inline-flex rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
