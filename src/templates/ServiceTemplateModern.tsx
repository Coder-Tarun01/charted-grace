import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import ServiceHero from "@/components/service/ServiceHero";
import ServiceSection from "@/components/service/ServiceSection";
import type { Service } from "@/types/service";

export default function ServiceTemplateModern({ service }: { service: Service }) {
  const bannerImage = service.heroBannerImage || "/images/hero-ca-3.svg";
  const leftImage = service.overviewImage || service.heroRightImage || "/images/hero-ca.svg";
  const rightImage = service.featuresImage || bannerImage;
  const topStats = [service.features[0], service.features[1], service.benefits[0]].filter(Boolean);

  return (
    <article>
      <ServiceHero title={service.title} subtitle={service.introduction} backgroundImage={bannerImage} />

      <Section className="py-12">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {topStats.map((item, idx) => (
              <motion.div
                key={`${item}-${idx}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.35 }}
                viewport={{ once: true }}
              >
                <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-5 text-sm font-semibold">{item}</CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="py-2 pb-8">
        <Container>
          <ServiceSection heading="Overview" content={service.overview} image={leftImage} imagePosition="left" />
          <ServiceSection
            heading="What We Deliver"
            content="Practical support designed for speed, quality, and compliance."
            image={rightImage}
            imagePosition="right"
            listItems={service.features}
          />

          <section className="py-6 md:py-8">
            <div className="rounded-2xl border border-border bg-card p-5 md:p-7">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
                <div>
                  <h3 className="text-2xl font-display font-bold text-foreground">Client Outcomes</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
                    Measurable business impact with execution confidence.
                  </p>
                  <ul className="mt-5 space-y-2 text-sm text-foreground/90">
                    {service.benefits.map((item, index) => (
                      <li key={`${item}-${index}`} className="rounded-md border border-border/70 bg-background/80 px-3 py-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  className="grid min-w-[220px] gap-3 self-start"
                >
                  <div className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-semibold text-primary">
                    Faster investor reporting
                  </div>
                  <div className="rounded-lg border border-border px-4 py-3 text-sm text-muted-foreground">
                    Improved cash flow visibility
                  </div>
                  <div className="rounded-lg border border-border px-4 py-3 text-sm text-muted-foreground">
                    Compliance-ready workflows
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </Container>
      </Section>

      <Section className="border-t border-border py-14">
        <Container className="text-center">
          <Heading level={2} className="mb-3">
            {service.ctaHeadline}
          </Heading>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">{service.ctaSubtext}</p>
          <Button asChild size="lg">
            <Link to="/#contact">{service.ctaButtonLabel}</Link>
          </Button>
          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-3 gap-2 text-xs text-muted-foreground">
            <span className="rounded bg-muted px-3 py-2">Faster execution</span>
            <span className="rounded bg-muted px-3 py-2">Transparent reporting</span>
            <span className="rounded bg-muted px-3 py-2">Compliance-ready</span>
          </div>
        </Container>
      </Section>
    </article>
  );
}
