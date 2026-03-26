import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import { useServices } from "@/context/ServicesContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileActiveService, setMobileActiveService] = useState<string | null>(null);
  const { navServicesMenu } = useServices();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-900/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Compliance Desk India" className="h-8 md:h-10" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navServicesMenu.map((service) => {
              const totalItems = service.sections.reduce((acc, s) => acc + s.items.length, 0);
              const useTwoCols = service.sections.length > 1 || totalItems >= 10;

              return (
                <div key={service.title} className="relative group">
                  <button
                    type="button"
                    className="flex items-center gap-1 px-2 py-1.5 text-[13px] font-bold text-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  >
                    {service.title}
                    <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                  </button>

                  <div className="absolute left-0 top-full pt-3 opacity-0 invisible translate-y-2 scale-[0.985] group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:scale-100 transition-all duration-200 ease-out">
                    <div className="relative overflow-hidden rounded-2xl border border-primary/15 bg-background shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] ring-1 ring-foreground/5 min-w-[340px] max-w-[520px] max-h-[70vh]">
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-400 via-primary to-orange-300" />
                      <div className="border-b border-border/60 bg-muted/20 px-5 py-3">
                        <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-foreground/80">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>{service.title}</span>
                        </div>
                      </div>
                      <div className="p-5 overflow-y-auto max-h-[70vh]">
                      <div className={`grid gap-x-8 gap-y-6 ${useTwoCols ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
                        {service.sections.map((section, idx) => (
                          <div key={`${service.title}-${idx}`} className="min-w-0">
                            {section.title && (
                              <div className="mb-3 flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-2 text-[12px] font-extrabold tracking-wide text-foreground ring-1 ring-border/60">
                                <span className="h-3.5 w-1 rounded-full bg-primary" />
                                <span className="leading-none">{section.title}</span>
                              </div>
                            )}
                            <div className="space-y-0.5">
                              {section.items.map((item, itemIdx) => (
                                <Link
                                  key={`${service.title}-${idx}-${itemIdx}-${item.href}`}
                                  to={item.href}
                                  className="group/item block rounded-lg px-2.5 py-2 text-sm text-foreground/75 transition-all hover:text-primary hover:bg-primary/8 hover:translate-x-0.5"
                                >
                                  <span className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/25 group-hover/item:bg-primary transition-colors" />
                                    {item.name}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <Link
              to="/admin"
              className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground/80 hover:text-foreground hover:bg-accent transition-colors"
            >
              Admin
            </Link>
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center rounded-full border border-orange-500/60 bg-background/60 p-2 shadow-sm shadow-orange-500/20 hover:bg-orange-500 hover:shadow-orange-500/40 transition-colors"
              title="Get Free Consultation"
            >
              <img
                src="/images/customer-service.png"
                alt=""
                className="h-5 w-5 opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <span className="sr-only">Get Free Consultation</span>
              <span className="pointer-events-none absolute -bottom-9 right-0 hidden whitespace-nowrap rounded-md bg-foreground px-2.5 py-1 text-xs font-semibold text-background shadow-md group-hover:block">
                Get Free Consultation
              </span>
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
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
            className="lg:hidden overflow-hidden border-t border-border/50 bg-background"
          >
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navServicesMenu.map((service) => {
                const isOpen = mobileActiveService === service.title;

                return (
                  <div key={service.title} className="rounded-lg border border-border/50 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setMobileActiveService(isOpen ? null : service.title)}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-foreground/85 hover:text-primary hover:bg-accent transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span>{service.title}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-3">
                        {service.sections.map((section, idx) => (
                          <div key={`${service.title}-m-${idx}`} className="mt-3">
                            {section.title && (
                              <div className="text-xs font-semibold uppercase mb-2 text-foreground/60">
                                {section.title}
                              </div>
                            )}
                            <div className="space-y-1">
                              {section.items.map((item, itemIdx) => (
                                <Link
                                  key={`${service.title}-m-${idx}-${itemIdx}-${item.href}`}
                                  to={item.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="block rounded-md px-2 py-2 text-sm text-foreground/75 hover:text-primary hover:bg-accent transition-colors"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-4 block rounded-full border border-orange-500/60 bg-background/80 px-5 py-3 text-center text-sm font-semibold text-orange-500 shadow-sm shadow-orange-500/20 hover:bg-orange-500 hover:text-background hover:shadow-orange-500/40 transition-colors"
              >
                Get Free Consultation
              </a>
              <Link
                to="/admin"
                onClick={() => setMobileOpen(false)}
                className="block rounded-full border border-border bg-background px-5 py-3 text-center text-sm font-semibold text-foreground/80 hover:bg-accent hover:text-foreground transition-colors"
              >
                Admin
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
