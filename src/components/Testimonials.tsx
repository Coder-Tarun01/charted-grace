import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Arjun Kapoor", role: "Founder, TechVista Solutions", text: "Compliance Desk India transformed our startup journey. From GST to ROC filings, everything was handled seamlessly. Highly recommended!", rating: 5 },
  { name: "Priya Mehta", role: "CEO, GreenLeaf Organics", text: "Their RARE methodology is truly unique. We went from compliance chaos to complete peace of mind within weeks.", rating: 5 },
  { name: "Rajesh Sharma", role: "Director, BuildRight Infra", text: "Transparent pricing, dedicated CA, and incredible turnaround time. They're not just service providers — they're growth partners.", rating: 5 },
  { name: "Sneha Patel", role: "Co-founder, DesignHub", text: "Best decision we made was hiring Compliance Desk India. Our payroll, taxes, and compliances are now completely stress-free.", rating: 5 },
];

const Testimonials = () => {
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
            Client Love
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            What Our Clients <span className="gradient-text">Say</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 hover:shadow-lg transition-all duration-300 relative"
            >
              <Quote className="w-10 h-10 text-primary/10 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-6 text-lg">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
