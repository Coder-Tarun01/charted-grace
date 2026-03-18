import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { MessageSquare, Search, FileCheck, Headphones, Target } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Discovery Phase",
    label: "Sharing Needs",
    desc: "A direct dialogue to align on your business vision and identify specific compliance dependencies.",
  },
  {
    icon: Search,
    step: "02",
    title: "Strategic Blueprint",
    label: "Analysis & Planning",
    desc: "Our experts architect a personalized 12-month regulatory roadmap designed for stability.",
  },
  {
    icon: FileCheck,
    step: "03",
    title: "Seamless Execution",
    label: "Implementation",
    desc: "Precision handling of all registrations and filings with zero-error institutional standards.",
  },
  {
    icon: Headphones,
    step: "04",
    title: "Managed Continuity",
    label: "Ongoing Support",
    desc: "Continuous proactive monitoring to ensure your business remains operationally perfect.",
  },
];

const StepCard = ({ step, index, progress }: { step: any; index: number; progress: any }) => {
  const isEven = index % 2 === 0;
  
  // Calculate if this node is "active" based on progress
  // Maps pathLength (0 to 1) to individual step activation
  const stepThreshold = index / (steps.length - 1);
  const isActive = useTransform(progress, (p: number) => p >= stepThreshold);

  return (
    <div className={`flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20 relative mb-24 md:mb-40 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      {/* Content Block */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full md:w-[45%] text-center md:text-left rounded-3xl border border-slate-200 bg-white/80 px-5 py-6 shadow-[0_18px_70px_-55px_rgba(15,23,42,0.55)]"
      >
        <div className={`flex flex-col ${isEven ? 'md:items-start' : 'md:items-end'} mb-5 md:mb-6`}>
          <span className="text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-4">
            {step.step} • {step.label}
          </span>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-900 leading-tight">
            {step.title}
          </h3>
        </div>
        <p className={`text-base md:text-lg text-slate-500 leading-relaxed font-body font-light max-w-lg ${!isEven && 'md:ml-auto md:text-right'}`}>
          {step.desc}
        </p>
      </motion.div>

      {/* Visual Marker (Node) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center z-20">
        <motion.div
            style={{ 
              scale: useTransform(isActive, (active) => active ? 1.2 : 1),
              backgroundColor: useTransform(isActive, (active) => active ? "#ff4500" : "#f1f5f9"),
              boxShadow: useTransform(isActive, (active) => active ? "0 0 30px rgba(255,69,0,0.5)" : "0 0 0px rgba(0,0,0,0)"),
              borderColor: useTransform(isActive, (active) => active ? "#ff4500" : "#e2e8f0")
            }}
            className="w-5 h-5 rounded-full border-2 transition-colors duration-500"
        />
        <motion.div 
          style={{ opacity: useTransform(isActive, (active) => active ? 1 : 0) }}
          className="absolute w-10 h-10 rounded-full border border-primary/20 animate-ping pointer-events-none" 
        />
      </div>

      {/* Spacing for Zig-Zag */}
      <div className="hidden md:block md:w-[45%]" />
    </div>
  );
};

const HowWeWork = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.4", "end 0.6"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  // Calculate Beacon Position
  const beaconY = useTransform(pathLength, [0, 1], ["0%", "100%"]);

  return (
    <section id="how-we-work" ref={containerRef} className="section-padding bg-white relative overflow-hidden pb-6 md:pb-8 pt-2 md:pt-4">
      {/* Background Architectural Mesh */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#0F172A 1.5px, transparent 1.5px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10 py-3 md:py-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-8 md:mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 shadow-xl mb-3">
            <Target className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Execution Framework</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-3 tracking-tight text-slate-900 leading-none">
            Efficiency <span className="text-primary font-serif italic">by Design.</span>
          </h2>
          <p className="text-lg md:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-body font-light">
            A precise, transparent logic trail engineered to move your business from complexity to total compliance.
          </p>
        </motion.div>

        {/* Timeline Core */}
        <div className="relative max-w-6xl mx-auto min-h-[1200px]">
          {/* Background Track (Grey) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[4px] bg-slate-50 rounded-full hidden md:block" />
          
          {/* Progress Line (Primary) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[4px] hidden md:block">
            <motion.div
              style={{
                scaleY: pathLength,
                originY: 0,
              }}
              className="w-full h-full bg-primary rounded-full shadow-[0_0_20px_rgba(255,69,0,0.2)]"
            />
            
            {/* Traveling Beacon */}
            <motion.div
              style={{ top: beaconY }}
              className="absolute left-1/2 -translate-x-1/2 w-8 h-8 -translate-y-1/2 z-30 flex items-center justify-center"
            >
              <div className="w-3 h-3 bg-white rounded-full border-4 border-primary shadow-[0_0_30px_#ff4500]" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
            </motion.div>
          </div>

          {/* Steps */}
          <div className="relative flex flex-col pt-10">
            {steps.map((step, i) => (
              <StepCard key={step.step} step={step} index={i} progress={pathLength} />
            ))}
          </div>
        </div>

        {/* Final Methodology Node */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-6"
        >
          <div className="inline-flex items-center gap-6 px-12 py-6 bg-white border border-slate-100 rounded-3xl shadow-2xl shadow-slate-900/5">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl">
              <FileCheck className="w-7 h-7" />
            </div>
            <div className="text-left">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-primary block mb-1">Methodology</span>
              <span className="text-base font-bold text-slate-800 uppercase tracking-[0.2em]">Institutional Grade Standard</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowWeWork;
