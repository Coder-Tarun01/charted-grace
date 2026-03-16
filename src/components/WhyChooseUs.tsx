import { motion } from "framer-motion";
import { Award, Clock, IndianRupee, HeadphonesIcon, ShieldCheck, BarChart3 } from "lucide-react";

const reasons = [
  { icon: Award, title: "Expert CA Team", desc: "Qualified chartered accountants with 10+ years of experience." },
  { icon: Clock, title: "Quick Turnaround", desc: "Most services completed within 24-48 hours." },
  { icon: IndianRupee, title: "Transparent Pricing", desc: "No hidden fees. What you see is what you pay." },
  { icon: HeadphonesIcon, title: "Dedicated Support", desc: "Personal account manager for every client." },
  { icon: ShieldCheck, title: "100% Secure", desc: "Bank-grade encryption for all your data." },
  { icon: BarChart3, title: "Growth Partner", desc: "We scale our services as your business grows." },
];

const WhyChooseUs = () => {
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
            Our Advantage
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Why Choose <span className="gradient-text">Us</span>
          </h2>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="bento-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`glass-card p-8 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 ${
                i === 0 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
