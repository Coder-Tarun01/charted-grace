import { motion } from "framer-motion";
import type { ReactNode } from "react";

type ServiceHeroProps = {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  breadcrumb?: ReactNode;
};

export default function ServiceHero({ title, subtitle, backgroundImage, breadcrumb }: ServiceHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="relative min-h-[300px] md:min-h-[380px]">
        <div className="absolute inset-0">
          {backgroundImage ? (
            <img src={backgroundImage} alt={`${title} hero background`} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/60 to-slate-900/25" />
        </div>

        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-4 py-16 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl"
          >
            {breadcrumb && <div className="mb-4 text-sm text-white/85">{breadcrumb}</div>}
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary/90">Services</p>
            <h1 className="text-3xl font-display font-bold leading-tight text-white md:text-5xl">{title}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 md:text-base">{subtitle}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

