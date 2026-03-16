import { motion } from "framer-motion";
import { MessageSquare, Search, FileCheck, Headphones } from "lucide-react";

const steps = [
  { icon: MessageSquare, step: "01", title: "Share Your Needs", desc: "Tell us about your business and compliance requirements through a quick consultation." },
  { icon: Search, step: "02", title: "We Analyze & Plan", desc: "Our experts review your situation and create a tailored compliance roadmap." },
  { icon: FileCheck, step: "03", title: "We Execute", desc: "We handle all filings, registrations, and documentation with precision." },
  { icon: Headphones, step: "04", title: "Ongoing Support", desc: "Stay compliant with our continuous monitoring and dedicated support." },
];

const HowWeWork = () => {
  return (
    <section id="how-we-work" className="section-padding bg-foreground text-primary-foreground relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative text-center group"
            >
              <div className="text-6xl font-display font-bold text-primary/10 absolute -top-4 left-1/2 -translate-x-1/2">
                {item.step}
              </div>
              <div className="relative pt-10">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{item.title}</h3>
                <p className="text-primary-foreground/60 leading-relaxed">{item.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-primary/30" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
