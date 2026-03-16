import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "VFCO", href: "#" },
  {
    label: "Business Setup, License & Registrations",
    href: "#services",
    children: [
      "Company Registration",
      "LLP Registration",
      "GST Registration",
      "MSME Registration",
      "Trademark Filing",
      "FSSAI License",
    ],
  },
  {
    label: "Accounts & Audit",
    href: "#services",
    children: ["Bookkeeping", "Internal Audit", "Statutory Audit", "Tax Audit", "Stock Audit"],
  },
  {
    label: "Taxes",
    href: "#services",
    children: ["Income Tax Filing", "GST Returns", "TDS Returns", "Tax Planning", "Tax Notice Handling"],
  },
  {
    label: "Payroll Management",
    href: "#services",
    children: ["Salary Processing", "PF & ESI", "Professional Tax", "Payslip Generation"],
  },
  { label: "Legal Documentation", href: "#services" },
  { label: "Compliances", href: "#services" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex-shrink-0">
            <img src={logo} alt="Compliance Desk India" className="h-8 md:h-10" />
          </a>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-accent"
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-3.5 h-3.5" />}
                </a>
                {item.children && activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-1 glass-card p-2 min-w-[220px] shadow-lg"
                  >
                    {item.children.map((child) => (
                      <a
                        key={child}
                        href="#services"
                        className="block px-4 py-2.5 text-sm text-foreground/70 hover:text-primary hover:bg-accent rounded-lg transition-colors"
                      >
                        {child}
                      </a>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-orange-deep transition-colors shadow-md"
          >
            Get Free Consultation
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="xl:hidden overflow-hidden border-t border-border/50 bg-background"
          >
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent rounded-lg transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="block text-center mt-4 px-5 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold"
              >
                Get Free Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
