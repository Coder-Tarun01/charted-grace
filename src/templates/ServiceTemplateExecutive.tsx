import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import type { Service } from "@/types/service";

export default function ServiceTemplateExecutive({ service }: { service: Service }) {
  const banner = service.heroBannerImage || "/images/hero-ca-3.svg";
  const overviewImage = service.overviewImage || service.heroRightImage || "/images/hero-ca.svg";
  const benefitsImage = service.benefitsImage || service.heroRightImage || "/images/hero-ca.svg";
  return (
    <article className="bg-slate-950 text-slate-100">
      <section className="border-b border-slate-800">
        <Container className="grid gap-8 py-14 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-primary">Executive Services</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">{service.title}</h1>
            <p className="mt-5 text-slate-300">{service.introduction}</p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Board-ready reporting
            </div>
            <div className="mt-8 flex gap-3">
              <Button asChild>
                <Link to="/#contact">{service.ctaButtonLabel}</Link>
              </Button>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl border border-slate-800"
          >
            <img src={banner} alt={`${service.title} hero`} className="h-full min-h-[280px] w-full object-cover" />
          </motion.div>
        </Container>
      </section>

      <Section className="py-12">
        <Container className="grid gap-6 lg:grid-cols-2">
          <Card className="border-slate-800 bg-slate-900">
            <CardContent className="p-6">
              <Heading level={3} className="text-slate-50">
                Overview
              </Heading>
              <p className="mt-4 text-sm leading-7 text-slate-300">{service.overview}</p>
            </CardContent>
          </Card>
          <div className="overflow-hidden rounded-xl border border-slate-800">
            <img src={overviewImage} alt="overview" className="h-full min-h-[220px] w-full object-cover" />
          </div>
        </Container>
      </Section>

      <Section className="py-2 pb-12">
        <Container className="grid gap-6 lg:grid-cols-2">
          <Card className="border-slate-800 bg-slate-900">
            <CardContent className="p-6">
              <Heading level={3} className="text-slate-50">
                Core Deliverables
              </Heading>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {service.features.map((item, i) => (
                  <li key={`${item}-${i}`} className="rounded-md border border-slate-800 px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <div className="overflow-hidden rounded-xl border border-slate-800">
            <img src={benefitsImage} alt="benefits" className="h-full min-h-[220px] w-full object-cover" />
          </div>
        </Container>
      </Section>
    </article>
  );
}
