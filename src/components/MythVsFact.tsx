import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const items = [
  {
    myth: "CA services are only for big companies",
    fact: "Every business — even a freelancer — benefits from expert compliance and tax planning.",
  },
  {
    myth: "Online CA firms can't be trusted",
    fact: "We're a registered firm with 500+ happy clients and verifiable credentials.",
  },
  {
    myth: "Compliance is just annual filing",
    fact: "Compliance is ongoing — GST, TDS, ROC, payroll — it needs monthly attention.",
  },
  {
    myth: "I can handle taxes with free software",
    fact: "Software can't optimize your tax strategy or represent you in notices.",
  },
];

const MythVsFact = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Know The Truth
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Myth vs <span className="gradient-text">Fact</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="grid md:grid-cols-2 gap-4"
            >
              <div className="glass-card p-6 border-destructive/20 bg-destructive/5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-4 h-4 text-destructive" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-destructive uppercase tracking-wider mb-1">Myth</p>
                    <p className="text-foreground font-medium">{item.myth}</p>
                  </div>
                </div>
              </div>
              <div className="glass-card-orange p-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Fact</p>
                    <p className="text-foreground font-medium">{item.fact}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MythVsFact;
