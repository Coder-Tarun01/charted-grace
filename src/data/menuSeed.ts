export type MenuSeedSection = {
  title?: string;
  items: string[];
};

export type MenuSeedModule = {
  title: string;
  sections: MenuSeedSection[];
};

export const menuSeed: MenuSeedModule[] = [
  {
    title: "VCFO",
    sections: [
      {
        items: [
          "CFO for Startups",
          "Interim CFO",
          "CFO Support Services",
          "Virtual CFO",
          "Financial Modelling",
          "Investor Pitch Deck",
          "Project Financing Support",
          "Project DPR Service",
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
          "Private Limited Company",
          "Public Limited Company",
          "Limited Liability Partnership",
          "One Person Company",
          "Producer Company",
          "Section 8 Company",
          "Nidhi Company",
          "Indian Subsidiary for Foreign Holding Company",
          "Partnership Firm Setup",
          "Sole Proprietorship",
          "Society Registration",
          "Trust Registration",
        ],
      },
      {
        title: "License & Registration",
        items: [
          "GST Registration",
          "Startup India Registration",
          "Trademark Registration",
          "Provident Fund Registration",
          "Professional Tax Registration",
          "Employee State Insurance Registration",
          "FSSAI License",
          "Import Export Code",
          "Trade License",
          "Shops & Establishment License",
          "MSME / Udyam Registration",
          "Digital Signature Certificate",
          "Contract Labour Regulation License",
          "ISO Certification",
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
          "End-to-End Accounting Support",
          "Startup Accounting",
          "Global Entity Accounting",
          "US GAAP Accounting",
          "Accounting Process Outsourcing",
          "IFRS Implementation",
          "Ind AS Implementation",
          "Monthly Financial Reporting",
          "Fund Accounting",
          "MIS Reporting",
          "Account Reconciliation",
          "Inventory Management",
          "Working Capital Management",
          "Budgeting and Forecasting",
        ],
      },
      {
        title: "Audit",
        items: [
          "Internal Control Review",
          "Due Diligence",
          "HR & Payroll Audit",
          "Environmental Audit",
          "Energy Audit",
          "External Audit Support",
          "Fraud Investigation",
          "Management Audit",
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
          "Personal Income Tax Filing",
          "Small Business Tax Filing",
          "Corporate Income Tax",
          "Trust / Society Tax Filing",
          "TDS Filing",
          "TCS Filing",
          "TDS & TCS Advisory",
          "Income Tax Planning",
          "Capital Gain Computation",
          "Income Tax Assessments",
          "Tax Audit Support",
        ],
      },
      {
        title: "International Taxation",
        items: [
          "NRI Tax Advisory",
          "NRI Capital Gain Advisory",
          "Double Taxation Avoidance Agreement (DTAA)",
        ],
      },
      {
        title: "Indirect Taxes (GST)",
        items: [
          "GST Return Filing",
          "GST Advisory",
          "GST Refund Process",
          "GST Audit",
          "GST LUT Filing",
        ],
      },
      {
        title: "Customs & Excise",
        items: [
          "Customs Duty Valuation",
          "Excise Tax Compliance",
          "Anti-Dumping Duty Analysis",
        ],
      },
    ],
  },
  {
    title: "Payroll",
    sections: [
      {
        items: [
          "Payroll Structuring",
          "Paycheck Processing",
          "HRMS Implementation",
          "Payroll Tax Filing",
          "Payroll Integration",
          "Payroll Policy Development",
          "Labour Law Advisory",
          "Retirement Benefits Calculation",
          "POSH Compliance",
          "ESOP Advisory",
        ],
      },
    ],
  },
  {
    title: "Legal Documentation",
    sections: [
      {
        items: [
          "Non-Disclosure Agreement (NDA)",
          "Service Level Agreement (SLA)",
          "Memorandum of Understanding (MoU)",
          "Partnership Deed",
          "Master Service Agreement",
          "Shareholders Agreement",
          "Joint Venture Agreement",
          "Founders Agreement",
          "Vendor Agreement",
          "Consultancy Agreement",
          "Scope of Work Agreement",
          "Share Purchase Agreement",
          "Relinquishment Deed",
          "Non-Compete Agreement",
          "Finance Agreement",
          "Rental Agreement",
          "Property Sale Deed",
          "Gift Deed",
          "Rental Tenant Notice",
          "Franchise Agreement",
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
          "Change Authorised Capital",
          "Change Objective of Company",
          "Appointment / Change / Resignation of Directors",
          "Change Name of Company",
          "Change in Registered Address of Company",
          "Issue of Share Certificates",
          "Right Issue",
          "Private Placement",
          "Employee Stock Option Plan (ESOP)",
          "Share Transfer",
          "DIR-3 KYC",
          "Alteration of MOA / AOA of Company",
          "Closure / Revival of Companies",
          "Annual Filings of Company",
          "Creation / Modification / Satisfaction of Charges",
        ],
      },
      {
        title: "Limited Liability Partnership (LLP) Compliances",
        items: [
          "Add a Partner",
          "Resignation of a Partner",
          "Alteration of LLP Deed",
          "Closure / Revival of LLPs",
          "Annual Filings of LLP",
        ],
      },
      {
        title: "Conversion from One Entity Type to Another",
        items: [
          "Conversion of LLP to Private Limited Company",
          "Conversion of OPC to Private Limited Company",
          "Conversion of Private Limited to OPC",
          "Conversion of Private Limited to LLP",
          "Conversion of Private Limited to Public Limited Company",
        ],
      },
      {
        title: "Other Compliance",
        items: [
          "PF Computation & Filings",
          "ESI Computation & Filings",
          "PT Computation & Filings",
          "RBI Compliances",
          "Foreign Liabilities and Assets (FLA)",
          "Form FC-GPR",
          "Form FC-TRS",
        ],
      },
      {
        title: "NGO Compliances",
        items: [
          "NGO Compliance",
          "Section 8 Compliance",
          "CSR-1 Filing",
          "Section 80G & Section 12A Registration",
          "Darpan Registration",
          "FCRA Registration",
        ],
      },
    ],
  },
];

