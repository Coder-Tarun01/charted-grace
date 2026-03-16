import { motion } from "framer-motion";
import { ArrowRight, Shield, CheckCircle2, TrendingUp } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent via-background to-secondary" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/8 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              <Shield className="w-4 h-4" />
              India's Trusted Compliance Partner
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight mb-6">
              <span className="text-foreground">Compliance at</span>
              <br />
              <span className="gradient-text">Convenience</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mb-8 font-body leading-relaxed">
              From registrations to returns, we handle every compliance need so you can focus on growing your business.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:bg-orange-deep transition-all shadow-lg hover:shadow-xl animate-pulse-glow"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#how-we-work"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-foreground/20 text-foreground font-semibold text-lg hover:border-primary hover:text-primary transition-all"
              >
                See How We Work
              </a>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                500+ Businesses Served
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                99% Compliance Rate
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                10+ Years Experience
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            {/* Bento grid hero visual */}
            <div className="bento-grid grid-cols-2 grid-rows-3 h-[520px]">
              <div className="glass-card-orange p-6 row-span-2 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">100% Compliant</h3>
                  <p className="text-sm text-muted-foreground">We ensure your business stays fully compliant with all regulations.</p>
                </div>
                <div className="text-4xl font-display font-bold gradient-text">500+</div>
              </div>
              <div className="glass-card p-6 flex flex-col justify-center animate-float">
                <div className="text-3xl font-display font-bold text-foreground">₹0</div>
                <p className="text-sm text-muted-foreground mt-1">Hidden charges. Ever.</p>
              </div>
              <div className="glass-card p-6 flex flex-col justify-center" style={{ animationDelay: "2s" }}>
                <div className="text-3xl font-display font-bold gradient-text">24h</div>
                <p className="text-sm text-muted-foreground mt-1">Average turnaround time</p>
              </div>
              <div className="glass-card-orange p-6 col-span-2 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-bold text-primary">
                      {["AK", "RS", "PM", "VK"][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-foreground">Trusted by founders</p>
                  <p className="text-sm text-muted-foreground">Join 500+ happy businesses</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
