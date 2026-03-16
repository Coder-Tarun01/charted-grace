import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  RegistrationSVG, 
  LicensesSVG, 
  TaxSetupSVG, 
  LegalSVG, 
  PayrollSVG, 
  GrowthSVG 
} from "./StartupIllustrations";

const steps = [
  { illustration: <RegistrationSVG />, title: "Business Registration", desc: "Choose the right structure — Pvt Ltd, LLP, OPC, or Sole Prop." },
  { illustration: <LicensesSVG />, title: "Licenses & Permits", desc: "GST, MSME, FSSAI, IEC — we get you licensed fast." },
  { illustration: <TaxSetupSVG />, title: "Tax Setup & Filing", desc: "PAN, TAN, ITR, GST returns — covered from day one." },
  { illustration: <LegalSVG />, title: "Legal Compliance", desc: "Agreements, NDAs, and regulatory docs drafted by experts." },
  { illustration: <PayrollSVG />, title: "Payroll & HR Setup", desc: "PF, ESI, professional tax, and salary structuring." },
  { illustration: <GrowthSVG />, title: "Growth Support", desc: "Ongoing compliance support as you scale your business." },
];

const Card = ({ step, index }: { step: any; index: number }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.8, 1, 1]);

  return (
    <div ref={container} className="h-[85vh] flex items-center justify-center sticky top-0 px-4 md:px-8">
      <motion.div
        style={{ 
          scale,
          opacity,
          top: `${index * 32}px`,
        }}
        className="w-full max-w-7xl bg-white border-[0.5px] border-primary/30 rounded-[32px] md:rounded-[60px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] relative group"
      >
        <div className="flex flex-col lg:flex-row items-center h-full min-h-[500px] md:min-h-[650px]">
          {/* Illustration Section */}
          <div className="w-full lg:w-1/2 h-full bg-accent/20 flex items-center justify-center p-12 md:p-20 border-b lg:border-b-0 lg:border-r-[0.5px] border-primary/30">
            <div className="w-full max-w-[350px] md:max-w-[500px] transition-transform duration-700 group-hover:scale-105">
              {step.illustration}
            </div>
          </div>
          
          {/* Content Section */}
          <div className="w-full lg:w-1/2 p-12 md:p-24 flex flex-col justify-center">
            <div className="mb-8 md:mb-12">
              <span className="text-primary font-display font-black text-6xl md:text-8xl opacity-10">
                0{index + 1}
              </span>
            </div>
            <h3 className="text-4xl md:text-6xl font-display font-bold mb-8 text-foreground leading-tight">
              {step.title}
            </h3>
            <p className="text-xl md:text-3xl text-muted-foreground leading-relaxed font-body">
              {step.desc}
            </p>
          </div>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] pointer-events-none" />
      </motion.div>
    </div>
  );
};

const StartupSection = () => {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="relative bg-white pb-10">
      {/* Premium Sticky Header */}
      <div className="pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block px-6 py-2 rounded-full bg-primary/10 text-primary text-sm md:text-base font-bold mb-8 uppercase tracking-widest">
              Accelerate Your Launch
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight text-foreground">
              Startup Starts <span className="text-primary">With Us</span>
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-8 rounded-full" />
            <p className="text-xl md:text-3xl text-muted-foreground leading-relaxed font-body max-w-2xl mx-auto">
              We build the foundation. You build the future.
            </p>
          </motion.div>
        </div>
      </div>

      {/* High-Impact Stacking Cards */}
      <div className="container mx-auto">
        {steps.map((step, i) => (
          <Card key={step.title} step={step} index={i} />
        ))}
      </div>

      {/* Extra space for final card scroll-out feel */}
      <div className="h-[5vh]" />
    </section>
  );
};

export default StartupSection;
