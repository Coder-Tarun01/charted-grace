import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "4,999",
    period: "/month",
    desc: "Perfect for freelancers and solopreneurs",
    features: ["GST Filing (Monthly)", "ITR Filing", "Basic Bookkeeping", "Email Support", "TDS Returns"],
    popular: false,
  },
  {
    name: "Growth",
    price: "9,999",
    period: "/month",
    desc: "Ideal for growing startups and SMEs",
    features: ["Everything in Starter", "Payroll (up to 15 employees)", "Quarterly Compliance Review", "Dedicated CA", "ROC Annual Filing", "Tax Planning Advisory"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "19,999",
    period: "/month",
    desc: "For established businesses needing full compliance",
    features: ["Everything in Growth", "Unlimited Payroll", "Statutory Audit", "FEMA Compliance", "Priority Support 24/7", "Legal Documentation", "CFO Advisory"],
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section className="section-padding pb-6 md:pb-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Simple Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Pricing <span className="gradient-text">Plans</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Transparent, affordable plans. No hidden charges.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-7 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-3xl p-7 md:p-8 transition-all duration-300 hover:-translate-y-2 ${
                plan.popular
                  ? "bg-foreground text-primary-foreground shadow-2xl scale-105"
                  : "glass-card"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  <Star className="w-4 h-4" /> Most Popular
                </div>
              )}
              <h3 className="text-xl font-display font-bold mb-2">{plan.name}</h3>
              <p className={`text-sm mb-6 ${plan.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                {plan.desc}
              </p>
              <div className="mb-8">
                <span className="text-4xl font-display font-bold">₹{plan.price}</span>
                <span className={`text-sm ${plan.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className={`w-4 h-4 flex-shrink-0 ${plan.popular ? "text-primary" : "text-primary"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`block text-center py-3.5 rounded-full font-semibold transition-all ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-orange-glow"
                    : "border-2 border-foreground/20 hover:border-primary hover:text-primary"
                }`}
              >
                Get Started
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
