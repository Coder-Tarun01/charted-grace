import { motion } from "framer-motion";
import { MessageSquare, Search, FileCheck, Headphones } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Share Your Needs",
    desc: "Tell us about your business and compliance requirements through a quick consultation.",
    accent: "from-primary to-primary/80",
  },
  {
    icon: Search,
    step: "02",
    title: "We Analyze & Plan",
    desc: "Our experts review your situation and create a tailored compliance roadmap.",
    accent: "from-primary/90 to-primary/70",
  },
  {
    icon: FileCheck,
    step: "03",
    title: "We Execute",
    desc: "We handle all filings, registrations, and documentation with precision.",
    accent: "from-primary/80 to-primary/60",
  },
  {
    icon: Headphones,
    step: "04",
    title: "Ongoing Support",
    desc: "Stay compliant with our continuous monitoring and dedicated support.",
    accent: "from-primary/70 to-primary/50",
  },
];

const HowWeWork = () => {
  return (
    <section id="how-we-work" className="relative bg-foreground text-primary-foreground overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header - normal flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-16 md:pt-24 pb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            How We <span className="text-primary">Work</span>
          </h2>
          <p className="text-primary-foreground/60 max-w-2xl mx-auto text-lg">
            Four simple steps to complete compliance peace of mind.
          </p>
        </motion.div>

        {/* Stacking cards area — extra bottom padding so last card has scroll room */}
        <div className="max-w-3xl mx-auto pb-16 md:pb-24">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="sticky mb-6"
              style={{
                top: `${80 + i * 28}px`,
                zIndex: i + 1,
              }}
            >
              <div
                className="rounded-2xl border border-primary-foreground/10 backdrop-blur-xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 transition-shadow duration-300 hover:shadow-[0_12px_40px_-8px_hsl(var(--primary)/0.25)]"
                style={{
                  background: `linear-gradient(135deg, hsl(var(--foreground)) 0%, hsl(0 0% 12%) 100%)`,
                  boxShadow: `0 ${4 + i * 2}px ${20 + i * 6}px -4px hsl(0 0% 0% / ${0.3 + i * 0.05})`,
                }}
              >
                {/* Step number + icon */}
                <div className="relative flex-shrink-0">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.accent} flex items-center justify-center shadow-lg`}>
                    <item.icon className="w-9 h-9 text-primary-foreground" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-foreground border-2 border-primary text-primary text-xs font-bold flex items-center justify-center shadow">
                    {item.step}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl font-display font-bold mb-2 text-primary-foreground">
                    {item.title}
                  </h3>
                  <p className="text-primary-foreground/55 leading-relaxed text-lg">
                    {item.desc}
                  </p>
                </div>

                {/* Large decorative number */}
                <div className="hidden md:block text-7xl font-display font-bold text-primary/[0.07] select-none leading-none">
                  {item.step}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
