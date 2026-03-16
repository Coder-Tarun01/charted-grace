import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ArrowRight, Shield, CheckCircle2, TrendingUp, Search, FileText, Building2, Receipt, Users, Scale, ClipboardCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const services = [
  { icon: Building2, label: "Business Registration" },
  { icon: Receipt, label: "GST Filing" },
  { icon: FileText, label: "Income Tax Returns" },
  { icon: Users, label: "Payroll Management" },
  { icon: Scale, label: "Legal Documentation" },
  { icon: ClipboardCheck, label: "Compliance Audit" },
];

const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, target, { duration: 2, ease: "easeOut" });
    const unsubscribe = rounded.on("change", (v) => setDisplay(v));
    return () => { controls.stop(); unsubscribe(); };
  }, [target]);

  return <span>{display}{suffix}</span>;
};

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const filteredServices = services.filter((s) =>
    s.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Layered background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent via-background to-secondary" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      {/* Animated orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-[10%] w-[500px] h-[500px] bg-primary rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-[5%] w-[400px] h-[400px] bg-primary rounded-full blur-[100px]"
      />
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[60%] w-3 h-3 rounded-full bg-primary/30"
      />
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[60%] left-[20%] w-2 h-2 rounded-full bg-primary/20"
      />

      <div className="container mx-auto px-4 relative z-10 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Top badge row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold backdrop-blur-sm border border-primary/10">
              <Shield className="w-4 h-4" />
              India's Trusted Compliance Partner
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 text-foreground/70 text-sm font-medium backdrop-blur-sm border border-foreground/5">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Rated 4.9/5 by 500+ Businesses
            </div>
          </motion.div>

          {/* Main headline - centered */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold leading-[1.1] mb-6">
              <span className="text-foreground">Compliance at</span>
              <br />
              <span className="gradient-text">Convenience</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed">
              From registrations to returns, we handle every compliance need so you can focus on what matters — <span className="text-foreground font-semibold">growing your business.</span>
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto mb-12 relative"
          >
            <div className={`relative rounded-2xl transition-all duration-300 ${
              isFocused 
                ? 'shadow-[0_8px_40px_-8px_hsl(var(--primary)/0.25)] ring-2 ring-primary/20' 
                : 'shadow-[var(--shadow-elevated)]'
            }`}>
              <div className="flex items-center bg-background/80 backdrop-blur-xl border border-border rounded-2xl overflow-hidden">
                <Search className="w-5 h-5 text-muted-foreground ml-5 shrink-0" />
                <input
                  type="text"
                  placeholder="Search services — GST, ITR, Registration, Payroll..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                  className="flex-1 px-4 py-4 md:py-5 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base md:text-lg font-body"
                />
                <a
                  href="#services"
                  className="hidden sm:inline-flex items-center gap-2 px-6 py-3 m-2 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shrink-0"
                >
                  Explore
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Search dropdown */}
            {isFocused && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-[var(--shadow-elevated)] overflow-hidden z-50"
              >
                <div className="p-3">
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider px-3 py-2">
                    {searchQuery ? "Results" : "Popular Services"}
                  </p>
                  {filteredServices.map((service, i) => (
                    <a
                      key={i}
                      href="#services"
                      className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-accent transition-colors group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <service.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{service.label}</span>
                      <ArrowRight className="w-3 h-3 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                  {filteredServices.length === 0 && (
                    <p className="text-sm text-muted-foreground px-3 py-3">No services found. <a href="#contact" className="text-primary font-semibold hover:underline">Contact us</a> for custom needs.</p>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap justify-center gap-4 mb-14"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#how-we-work"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-foreground/15 text-foreground font-semibold text-lg hover:border-primary hover:text-primary transition-all hover:-translate-y-0.5"
            >
              See How We Work
            </a>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-card p-1">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
                {[
                  { value: 500, suffix: "+", label: "Businesses Served", icon: Building2 },
                  { value: 99, suffix: "%", label: "Compliance Rate", icon: CheckCircle2 },
                  { value: 10, suffix: "+", label: "Years Experience", icon: TrendingUp },
                  { value: 24, suffix: "h", label: "Avg. Turnaround", icon: Shield },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center py-5 px-4 group">
                    <stat.icon className="w-5 h-5 text-primary mb-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div className="text-2xl md:text-3xl font-display font-bold text-foreground">
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Floating service pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hidden lg:flex justify-center gap-3 mt-8 flex-wrap"
          >
            {services.map((service, i) => (
              <motion.a
                key={i}
                href="#services"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.08 }}
                whileHover={{ y: -2, scale: 1.02 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/60 backdrop-blur-sm border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors cursor-pointer"
              >
                <service.icon className="w-3.5 h-3.5" />
                {service.label}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
