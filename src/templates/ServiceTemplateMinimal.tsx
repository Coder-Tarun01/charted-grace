import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import type { Service } from "@/types/service";

export default function ServiceTemplateMinimal({ service }: { service: Service }) {
  const hero = service.heroBannerImage || "/images/hero-ca-3.svg";
  const overviewImage = service.overviewImage || service.heroRightImage || "/images/hero-ca.svg";
  return (
    <article>
      <section className="relative border-b border-border">
        <img src={hero} alt={`${service.title} banner`} className="h-[340px] w-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <Container className="absolute inset-0 flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.2em] text-white/80">{service.moduleTitle}</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold text-white md:text-5xl">{service.title}</h1>
          <p className="mt-4 max-w-2xl text-white/80">{service.introduction}</p>
        </Container>
      </section>

      <Section className="py-14">
        <Container className="grid max-w-5xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
          <Heading level={2} className="mb-4">
            Overview
          </Heading>
          <p className="leading-8 text-muted-foreground">{service.overview}</p>

          {!!service.features.length && (
            <>
              <Heading level={3} className="mt-10 mb-3">
                Key Features
              </Heading>
              <ul className="space-y-2">
                {service.features.map((f, i) => (
                  <li key={`${f}-${i}`} className="rounded-md border border-border px-3 py-2 text-sm">
                    {f}
                  </li>
                ))}
              </ul>
            </>
          )}

          {!!service.benefits.length && (
            <>
              <Heading level={3} className="mt-10 mb-3">
                Benefits
              </Heading>
              <ul className="space-y-2">
                {service.benefits.map((b, i) => (
                  <li key={`${b}-${i}`} className="rounded-md border border-border px-3 py-2 text-sm">
                    {b}
                  </li>
                ))}
              </ul>
            </>
          )}
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-xl border border-border"
          >
            <img src={overviewImage} alt="Overview visual" className="h-full min-h-[260px] w-full object-cover" />
          </motion.div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-muted/20 py-14">
        <Container className="text-center">
          <Heading level={2}>{service.ctaHeadline}</Heading>
          <p className="mx-auto mt-3 mb-7 max-w-2xl text-muted-foreground">{service.ctaSubtext}</p>
          <Button asChild>
            <Link to="/#contact">{service.ctaButtonLabel}</Link>
          </Button>
        </Container>
      </Section>
    </article>
  );
}
