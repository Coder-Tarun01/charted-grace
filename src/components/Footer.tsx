import logo from "@/assets/logo.png";
import { Facebook, Twitter, Linkedin, Instagram, ArrowUp } from "lucide-react";

const footerLinks = {
  Services: ["Company Registration", "GST Filing", "Income Tax", "Payroll", "Audit", "Legal Docs"],
  Company: ["About Us", "Our Team", "Careers", "Blog", "Contact"],
  Resources: ["Tax Calculator", "GST Guide", "Startup Guide", "Compliance Calendar", "FAQs"],
};

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground pt-16 pb-6 border-t border-primary-foreground/10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2">
            <img src={logo} alt="Compliance Desk India" className="h-10 mb-4 brightness-0 invert" />
            <p className="text-primary-foreground/60 leading-relaxed max-w-sm mb-6">
              Your trusted partner for all compliance, taxation, and business setup needs. Serving 500+ businesses across India.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-primary-foreground/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-bold text-lg mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-primary-foreground/60 hover:text-primary transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/40">
            © {new Date().getFullYear()} Compliance Desk India. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-primary-foreground/40">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors text-primary"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
