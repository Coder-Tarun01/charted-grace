import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import type { Service } from "@/types/service";

export default function ServiceTemplateElegant({ service }: { service: Service }) {
  const hero = service.heroBannerImage || "/images/hero-ca-3.svg";
  const img1 = service.overviewImage || service.heroRightImage || "/images/hero-ca.svg";
  const img2 = service.featuresImage || service.heroBannerImage || "/images/hero-ca-3.svg";
  const img3 = service.benefitsImage || service.heroRightImage || "/images/hero-ca.svg";
  return (
    <article>
      <section className="relative overflow-hidden">
        <img src={hero} alt="hero" className="h-[340px] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/35" />
        <Container className="absolute inset-0 flex items-center">
          <div className="max-w-3xl text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-primary/90">{service.categoryLabel}</p>
            <h1 className="mt-3 text-4xl font-bold md:text-5xl">{service.title}</h1>
            <p className="mt-4 text-white/85">{service.introduction}</p>
          </div>
        </Container>
      </section>

      <Section className="bg-[linear-gradient(120deg,#fff6f2_0%,#ffffff_48%,#f2f8ff_100%)] py-12">
        <Container className="grid gap-6 lg:grid-cols-3">
          {[img1, img2, img3].map((src, idx) => (
            <motion.div
              key={`${src}-${idx}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.35 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm"
            >
              <img src={src} alt={`section-${idx + 1}`} className="h-52 w-full object-cover" />
            </motion.div>
          ))}
        </Container>
      </Section>

      <Section className="py-12">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div>
            <Heading level={2}>Overview</Heading>
            <p className="mt-4 leading-8 text-muted-foreground">{service.overview}</p>
          </div>
          <div>
            <Heading level={3}>Highlights</Heading>
            <ul className="mt-4 space-y-2">
              {[...service.features, ...service.benefits].slice(0, 6).map((item, i) => (
                <li key={`${item}-${i}`} className="rounded-lg border border-border px-3 py-2 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-foreground text-background py-14">
        <Container className="text-center">
          <Heading level={2} className="text-background">
            {service.ctaHeadline}
          </Heading>
          <p className="mx-auto mt-3 mb-7 max-w-2xl text-background/80">{service.ctaSubtext}</p>
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/#contact">{service.ctaButtonLabel}</Link>
          </Button>
        </Container>
      </Section>
    </article>
  );
}
