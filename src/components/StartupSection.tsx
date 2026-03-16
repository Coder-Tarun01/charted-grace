import { motion } from "framer-motion";
import { Rocket, FileText, Calculator, Scale, BadgeCheck, Users } from "lucide-react";

const steps = [
  { icon: FileText, title: "Business Registration", desc: "Choose the right structure — Pvt Ltd, LLP, OPC, or Sole Prop." },
  { icon: BadgeCheck, title: "Licenses & Permits", desc: "GST, MSME, FSSAI, IEC — we get you licensed fast." },
  { icon: Calculator, title: "Tax Setup & Filing", desc: "PAN, TAN, ITR, GST returns — covered from day one." },
  { icon: Scale, title: "Legal Compliance", desc: "Agreements, NDAs, and regulatory docs drafted by experts." },
  { icon: Users, title: "Payroll & HR Setup", desc: "PF, ESI, professional tax, and salary structuring." },
  { icon: Rocket, title: "Growth Support", desc: "Ongoing compliance support as you scale your business." },
];

const StartupSection = () => {
  return (
    <section className="section-padding bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Your Startup Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Startup Starts <span className="gradient-text">With Us</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From ideation to incorporation, we set up your business foundation so you can focus on what matters — building.
          </p>
        </motion.div>

        <div className="bento-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StartupSection;
