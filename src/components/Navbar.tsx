import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

type ServicesMenu = Array<{
  title: string;
  sections: Array<{
    title?: string;
    items: { name: string; href: string }[];
  }>;
}>;

const servicesMenu: ServicesMenu = [
  {
    title: "VCFO",
    sections: [
      {
        items: [
          { name: "CFO for Startups", href: "/services/vcfo/cfo-for-startups" },
          { name: "Interim CFO", href: "#" },
          { name: "CFO Support Services", href: "#" },
          { name: "Virtual CFO", href: "#" },
          { name: "Financial Modelling", href: "#" },
          { name: "Investor Pitch Deck", href: "#" },
          { name: "Project Financing Support", href: "#" },
          { name: "Project DPR Service", href: "#" },
        ],
      },
    ],
  },
  {
    title: "Business Registration",
    sections: [
      {
        title: "Company Incorporation",
        items: [
          { name: "Private Limited Company", href: "#" },
          { name: "Public Limited Company", href: "#" },
          { name: "Limited Liability Partnership", href: "#" },
          { name: "One Person Company", href: "#" },
          { name: "Producer Company", href: "#" },
          { name: "Section 8 Company", href: "#" },
          { name: "Nidhi Company", href: "#" },
          { name: "Indian Subsidiary for Foreign Holding Company", href: "#" },
          { name: "Partnership Firm Setup", href: "#" },
          { name: "Sole Proprietorship", href: "#" },
          { name: "Society Registration", href: "#" },
          { name: "Trust Registration", href: "#" },
        ],
      },
      {
        title: "License & Registration",
        items: [
          { name: "GST Registration", href: "#" },
          { name: "Startup India Registration", href: "#" },
          { name: "Trademark Registration", href: "#" },
          { name: "Provident Fund Registration", href: "#" },
          { name: "Professional Tax Registration", href: "#" },
          { name: "Employee State Insurance Registration", href: "#" },
          { name: "FSSAI License", href: "#" },
          { name: "Import Export Code", href: "#" },
          { name: "Trade License", href: "#" },
          { name: "Shops & Establishment License", href: "#" },
          { name: "MSME / Udyam Registration", href: "#" },
          { name: "Digital Signature Certificate", href: "#" },
          { name: "Contract Labour Regulation License", href: "#" },
          { name: "ISO Certification", href: "#" },
        ],
      },
    ],
  },
  {
    title: "Accounts and Audit",
    sections: [
      {
        title: "Accounting",
        items: [
          { name: "End-to-End Accounting Support", href: "#" },
          { name: "Startup Accounting", href: "#" },
          { name: "Global Entity Accounting", href: "#" },
          { name: "US GAAP Accounting", href: "#" },
          { name: "Accounting Process Outsourcing", href: "#" },
          { name: "IFRS Implementation", href: "#" },
          { name: "Ind AS Implementation", href: "#" },
          { name: "Monthly Financial Reporting", href: "#" },
          { name: "Fund Accounting", href: "#" },
          { name: "MIS Reporting", href: "#" },
          { name: "Account Reconciliation", href: "#" },
          { name: "Inventory Management", href: "#" },
          { name: "Working Capital Management", href: "#" },
          { name: "Budgeting and Forecasting", href: "#" },
        ],
      },
      {
        title: "Audit",
        items: [
          { name: "Internal Control Review", href: "#" },
          { name: "Due Diligence", href: "#" },
          { name: "HR & Payroll Audit", href: "#" },
          { name: "Environmental Audit", href: "#" },
          { name: "Energy Audit", href: "#" },
          { name: "External Audit Support", href: "#" },
          { name: "Fraud Investigation", href: "#" },
          { name: "Management Audit", href: "#" },
        ],
      },
    ],
  },
  {
    title: "Taxes",
    sections: [
      {
        title: "Direct Taxes",
        items: [
          { name: "Personal Income Tax Filing", href: "#" },
          { name: "Small Business Tax Filing", href: "#" },
          { name: "Corporate Income Tax", href: "#" },
          { name: "Trust / Society Tax Filing", href: "#" },
          { name: "TDS Filing", href: "#" },
          { name: "TCS Filing", href: "#" },
          { name: "TDS & TCS Advisory", href: "#" },
          { name: "Income Tax Planning", href: "#" },
          { name: "Capital Gain Computation", href: "#" },
          { name: "Income Tax Assessments", href: "#" },
          { name: "Tax Audit Support", href: "#" },
        ],
      },
      {
        title: "International Taxation",
        items: [
          { name: "NRI Tax Advisory", href: "#" },
          { name: "NRI Capital Gain Advisory", href: "#" },
          { name: "Double Taxation Avoidance Agreement (DTAA)", href: "#" },
        ],
      },
      {
        title: "Indirect Taxes (GST)",
        items: [
          { name: "GST Return Filing", href: "#" },
          { name: "GST Advisory", href: "#" },
          { name: "GST Refund Process", href: "#" },
          { name: "GST Audit", href: "#" },
          { name: "GST LUT Filing", href: "#" },
        ],
      },
      {
        title: "Customs & Excise",
        items: [
          { name: "Customs Duty Valuation", href: "#" },
          { name: "Excise Tax Compliance", href: "#" },
          { name: "Anti-Dumping Duty Analysis", href: "#" },
        ],
      },
    ],
  },
  {
    title: "Payroll",
    sections: [
      {
        items: [
          { name: "Payroll Structuring", href: "#" },
          { name: "Paycheck Processing", href: "#" },
          { name: "HRMS Implementation", href: "#" },
          { name: "Payroll Tax Filing", href: "#" },
          { name: "Payroll Integration", href: "#" },
          { name: "Payroll Policy Development", href: "#" },
          { name: "Labour Law Advisory", href: "#" },
          { name: "Retirement Benefits Calculation", href: "#" },
          { name: "POSH Compliance", href: "#" },
          { name: "ESOP Advisory", href: "#" },
        ],
      },
    ],
  },
  {
    title: "Legal Documentation",
    sections: [
      {
        items: [
          { name: "Non-Disclosure Agreement (NDA)", href: "#" },
          { name: "Service Level Agreement (SLA)", href: "#" },
          { name: "Memorandum of Understanding (MoU)", href: "#" },
          { name: "Partnership Deed", href: "#" },
          { name: "Master Service Agreement", href: "#" },
          { name: "Shareholders Agreement", href: "#" },
          { name: "Joint Venture Agreement", href: "#" },
          { name: "Founders Agreement", href: "#" },
          { name: "Vendor Agreement", href: "#" },
          { name: "Consultancy Agreement", href: "#" },
          { name: "Scope of Work Agreement", href: "#" },
          { name: "Share Purchase Agreement", href: "#" },
          { name: "Relinquishment Deed", href: "#" },
          { name: "Non-Compete Agreement", href: "#" },
          { name: "Finance Agreement", href: "#" },
          { name: "Rental Agreement", href: "#" },
          { name: "Property Sale Deed", href: "#" },
          { name: "Gift Deed", href: "#" },
          { name: "Rental Tenant Notice", href: "#" },
          { name: "Franchise Agreement", href: "#" },
        ],
      },
    ],
  },
  {
    title: "Compliances",
    sections: [
      {
        title: "ROC Compliances",
        items: [
          { name: "Change Authorised Capital", href: "#" },
          { name: "Change Objective of Company", href: "#" },
          { name: "Appointment / Change / Resignation of Directors", href: "#" },
          { name: "Change Name of Company", href: "#" },
          { name: "Change in Registered Address of Company", href: "#" },
          { name: "Issue of Share Certificates", href: "#" },
          { name: "Right Issue", href: "#" },
          { name: "Private Placement", href: "#" },
          { name: "Employee Stock Option Plan (ESOP)", href: "#" },
          { name: "Share Transfer", href: "#" },
          { name: "DIR-3 KYC", href: "#" },
          { name: "Alteration of MOA / AOA of Company", href: "#" },
          { name: "Closure / Revival of Companies", href: "#" },
          { name: "Annual Filings of Company", href: "#" },
          { name: "Creation / Modification / Satisfaction of Charges", href: "#" },
        ],
      },
      {
        title: "Limited Liability Partnership (LLP) Compliances",
        items: [
          { name: "Add a Partner", href: "#" },
          { name: "Resignation of a Partner", href: "#" },
          { name: "Alteration of LLP Deed", href: "#" },
          { name: "Closure / Revival of LLPs", href: "#" },
          { name: "Annual Filings of LLP", href: "#" },
        ],
      },
      {
        title: "Conversion from One Entity Type to Another",
        items: [
          { name: "Conversion of LLP to Private Limited Company", href: "#" },
          { name: "Conversion of OPC to Private Limited Company", href: "#" },
          { name: "Conversion of Private Limited to OPC", href: "#" },
          { name: "Conversion of Private Limited to LLP", href: "#" },
          { name: "Conversion of Private Limited to Public Limited Company", href: "#" },
        ],
      },
      {
        title: "Other Compliance",
        items: [
          { name: "PF Computation & Filings", href: "#" },
          { name: "ESI Computation & Filings", href: "#" },
          { name: "PT Computation & Filings", href: "#" },
          { name: "RBI Compliances", href: "#" },
          { name: "Foreign Liabilities and Assets (FLA)", href: "#" },
          { name: "Form FC-GPR", href: "#" },
          { name: "Form FC-TRS", href: "#" },
        ],
      },
      {
        title: "NGO Compliances",
        items: [
          { name: "NGO Compliance", href: "#" },
          { name: "Section 8 Compliance", href: "#" },
          { name: "CSR-1 Filing", href: "#" },
          { name: "Section 80G & Section 12A Registration", href: "#" },
          { name: "Darpan Registration", href: "#" },
          { name: "FCRA Registration", href: "#" },
        ],
      },
    ],
  },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileActiveService, setMobileActiveService] = useState<string | null>(null);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-900/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex-shrink-0">
            <img src={logo} alt="Compliance Desk India" className="h-8 md:h-10" />
          </a>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-0.5">
            {servicesMenu.map((service) => {
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
                              {section.items.map((item) => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className="group/item block rounded-lg px-2.5 py-2 text-sm text-foreground/75 transition-all hover:text-primary hover:bg-primary/8 hover:translate-x-0.5"
                                >
                                  <span className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/25 group-hover/item:bg-primary transition-colors" />
                                    {item.name}
                                  </span>
                                </a>
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

          <a
            href="#contact"
            className="group relative hidden md:inline-flex items-center justify-center rounded-full border border-orange-500/60 bg-background/60 p-2 shadow-sm shadow-orange-500/20 hover:bg-orange-500 hover:shadow-orange-500/40 transition-colors"
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
              {servicesMenu.map((service) => {
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
                              {section.items.map((item) => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="block rounded-md px-2 py-2 text-sm text-foreground/75 hover:text-primary hover:bg-accent transition-colors"
                                >
                                  {item.name}
                                </a>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
