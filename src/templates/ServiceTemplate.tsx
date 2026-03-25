import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import type { Service } from "@/types/service";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { BadgeCheck, CircleDollarSign, Clock3, ShieldCheck } from "lucide-react";
import ServiceHero from "@/components/service/ServiceHero";
import ServiceSection from "@/components/service/ServiceSection";

export type ServiceTemplateProps = {
  service: Service;
};

const HIGHLIGHT_ICONS = [BadgeCheck, Clock3, ShieldCheck, CircleDollarSign];
function buildHighlights(service: Service) {
  const source = [...service.features, ...service.benefits];
  return source
    .filter(Boolean)
    .slice(0, 4)
    .map((item) => item.trim());
}

export default function ServiceTemplate({ service }: ServiceTemplateProps) {
  const {
    title,
    introduction,
    overview,
    features,
    benefits,
    moduleTitle,
    categoryLabel,
    ctaHeadline,
    ctaSubtext,
    ctaButtonLabel,
    heroBannerImage,
    heroRightImage,
  } = service;
  const highlights = buildHighlights(service);
  const bannerImage = heroBannerImage || "/images/hero-ca-3.svg";
  const rightImage = heroRightImage || "/images/hero-ca.svg";

  return (
    <article>
      {/* 1. Hero Section */}
      <ServiceHero
        title={title}
        subtitle={introduction}
        backgroundImage={bannerImage}
        breadcrumb={
          <nav>
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="mx-2 opacity-60" aria-hidden>
              /
            </span>
            <span className="text-white/90">{moduleTitle}</span>
            <span className="mx-2 opacity-60" aria-hidden>
              /
            </span>
            <span className="text-white">{categoryLabel}</span>
          </nav>
        }
      />

      {/* 2. Quick Highlights */}
      <Section className="py-16">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item, index) => {
              const Icon = HIGHLIGHT_ICONS[index % HIGHLIGHT_ICONS.length];
              return (
                <Card key={item} className="group border-border/70 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                  <CardContent className="flex items-center gap-3 p-5">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="text-sm font-semibold text-foreground">{item}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="pb-8 pt-2 md:pb-10">
        <Container>
          {/* 3. Service Overview */}
          <ServiceSection
            heading="Overview"
            content={overview}
            image={rightImage}
            imagePosition="left"
          />

          {/* 4. Key Features */}
          <ServiceSection
            heading="Key Features"
            content="Core capabilities delivered in a practical, execution-focused manner."
            image={bannerImage}
            imagePosition="right"
            listItems={features}
          />

          {/* 5. Benefits */}
          <ServiceSection
            heading="Why Choose Us"
            content="Outcome-oriented delivery with compliance confidence, business clarity, and strong execution support."
            image={rightImage}
            imagePosition="left"
            listItems={benefits}
          />
        </Container>
      </Section>

      {/* 7. CTA Section */}
      <Section className="border-y border-border bg-foreground text-background py-16 md:py-20">
        <Container className="text-center">
          <Heading level={2} className="mb-4 text-background">
            {ctaHeadline}
          </Heading>
          <p className="mx-auto mb-8 max-w-2xl text-background/75 md:text-lg">{ctaSubtext}</p>
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/#contact">{ctaButtonLabel}</Link>
          </Button>
        </Container>
      </Section>
    </article>
  );
}
