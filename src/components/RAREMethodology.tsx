import { motion } from "framer-motion";
import { Search, BarChart3, RotateCcw, Zap } from "lucide-react";

const rare = [
  { letter: "R", word: "Research", icon: Search, desc: "Deep-dive into your business needs and compliance landscape.", color: "bg-primary" },
  { letter: "A", word: "Analyze", icon: BarChart3, desc: "Expert analysis to identify gaps, risks, and opportunities.", color: "bg-orange-glow" },
  { letter: "R", word: "Resolve", icon: RotateCcw, desc: "Execute solutions with precision and zero compliance gaps.", color: "bg-orange-deep" },
  { letter: "E", word: "Evolve", icon: Zap, desc: "Continuous improvement and proactive compliance updates.", color: "bg-primary" },
];

const RAREMethodology = () => {
  return (
    <section className="section-padding bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Our Methodology
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Our Unique Work Style — <span className="gradient-text">RARE</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A proven 4-step methodology that ensures excellence at every stage.
          </p>
        </motion.div>

        {/* Scroll stacking cards */}
        <div className="max-w-3xl mx-auto space-y-6">
          {rare.map((item, i) => (
            <motion.div
              key={item.word}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="stacking-card"
              style={{ top: `${96 + i * 20}px`, zIndex: i + 1 }}
            >
              <div className="glass-card p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 shadow-lg">
                <div className={`w-20 h-20 rounded-2xl ${item.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <span className="text-3xl font-display font-bold text-primary-foreground">{item.letter}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <item.icon className="w-5 h-5 text-primary" />
                    <h3 className="text-2xl font-display font-bold">{item.word}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg">{item.desc}</p>
                </div>
                <div className="text-6xl font-display font-bold text-primary/10">0{i + 1}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RAREMethodology;
