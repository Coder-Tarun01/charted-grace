import { motion } from "framer-motion";
import { Building2, BookOpen, Receipt, Users, FileText, ShieldCheck, ArrowRight } from "lucide-react";

const services = [
  { icon: Building2, title: "Business Setup & Registration", items: ["Pvt Ltd / LLP / OPC", "GST Registration", "MSME / Startup India", "Import Export Code"], color: "from-primary/10 to-primary/5" },
  { icon: BookOpen, title: "Accounts & Audit", items: ["Bookkeeping", "Statutory Audit", "Internal Audit", "Financial Statements"], color: "from-orange-glow/10 to-primary/5" },
  { icon: Receipt, title: "Tax Services", items: ["Income Tax Filing", "GST Returns", "TDS Compliance", "Tax Planning & Advisory"], color: "from-primary/10 to-orange-glow/5" },
  { icon: Users, title: "Payroll Management", items: ["Salary Processing", "PF & ESI Compliance", "Professional Tax", "HR Documentation"], color: "from-orange-glow/10 to-primary/5" },
  { icon: FileText, title: "Legal Documentation", items: ["Agreements & Contracts", "NDA / MOU Drafting", "Legal Notices", "Dispute Resolution"], color: "from-primary/10 to-primary/5" },
  { icon: ShieldCheck, title: "Regulatory Compliances", items: ["ROC Filings", "Annual Returns", "FEMA Compliance", "Secretarial Services"], color: "from-orange-glow/10 to-primary/5" },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Register Your Business / <span className="gradient-text">Our Services</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            End-to-end compliance solutions tailored for startups, SMEs, and enterprises.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 hover:shadow-lg transition-all duration-500 group hover:-translate-y-2 relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-display font-bold mb-4">{service.title}</h3>
                <ul className="space-y-2.5 mb-6">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-muted-foreground text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:gap-2 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
