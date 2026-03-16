import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GrowthBlueprintSVG, 
  TrustProtocolSVG, 
  ComplianceEngineSVG, 
  StrategicOptimizationSVG 
} from "./MythVsFactVisionSVGs";

const clearings = [
  {
    myth: "CA resources are primarily for large-scale corporations.",
    fact: "Professional compliance is the foundation of growth. We provide institutional-grade support for every stage of your business journey.",
    illustration: <GrowthBlueprintSVG />,
    label: "Strategic Scalability"
  },
  {
    myth: "Virtual engagements lack the accountability of local firms.",
    fact: "Our digital infrastructure is built on rigorous security protocols and verifiable expertise, ensuring 100% accountability.",
    illustration: <TrustProtocolSVG />,
    label: "Verified Trust"
  },
  {
    myth: "Statutory compliance is strictly an annual reporting exercise.",
    fact: "True compliance is a continuous cycle. We manage ongoing monthly requirements to ensure zero-gap operational readiness.",
    illustration: <ComplianceEngineSVG />,
    label: "Continuous Precision"
  },
  {
    myth: "software is a complete substitute for professional tax strategy.",
    fact: "Algorithms record data; experts optimize outcomes. We provide the strategic insight that software simply cannot replicate.",
    illustration: <StrategicOptimizationSVG />,
    label: "Strategic Value"
  },
];

const VisionBlock = ({ item, index }: { item: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-crosshair h-[450px] rounded-[32px] overflow-hidden border border-slate-200 bg-white"
    >
      {/* Background Myth State (Blurred) */}
      <div className="absolute inset-0 p-8 flex items-center justify-center transition-all duration-700 bg-slate-50">
        <div className={`transition-all duration-1000 ${isHovered ? 'blur-2xl opacity-0 scale-95' : 'blur-0 opacity-100 scale-100'}`}>
          <span className="text-destructive font-black text-[10px] uppercase tracking-[0.4em] mb-4 block text-center">
            Standard Misconception
          </span>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-400 text-center max-w-xs mx-auto leading-tight italic">
            "{item.myth}"
          </h3>
        </div>
      </div>

      {/* Foreground Fact State (Revealed) */}
      <motion.div
        animate={{ 
          clipPath: isHovered 
            ? "circle(100% at 50% 50%)" 
            : "circle(0% at 50% 50%)" 
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-white z-10 p-8 flex flex-col items-center justify-center text-center shadow-2xl"
      >
        {/* Illustration */}
        <div className="w-full mb-6 flex items-center justify-center">
          <div className="w-full max-w-[200px] transform transition-transform duration-1000 group-hover:scale-105">
            {item.illustration}
          </div>
        </div>

        {/* Text */}
        <div className="w-full">
          <span className="text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">
            {item.label}
          </span>
          <p className="text-lg md:text-xl font-display font-bold text-slate-900 leading-snug">
            {item.fact}
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="w-8 h-px bg-primary" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Verified Truth</span>
          </div>
        </div>
      </motion.div>

      {/* Interactive Hint */}
      {!isHovered && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-2">
          <div className="w-px h-8 bg-gradient-to-t from-slate-300 to-transparent animate-bounce" />
          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">Discover</span>
        </div>
      )}
    </motion.div>
  );
};

const MythVsFact = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-16 md:pb-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Structural Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-16 md:mb-24"
        >
          <div className="w-16 h-px bg-slate-200 mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight text-slate-900">
            Vision <span className="text-primary">Corrected.</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-body font-light">
            In a complex regulatory landscape, what you see isn't always the full picture. We provide the architectural clarity required to grow with confidence.
          </p>
        </motion.div>

        {/* Discovery Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {clearings.map((item, i) => (
            <VisionBlock key={i} item={item} index={i} />
          ))}
        </div>

        {/* Precise Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 md:mt-32 text-center"
        >
          <div className="inline-block p-1 bg-slate-50 border border-slate-100 rounded-full">
            <div className="px-6 py-2 bg-white border border-slate-200 rounded-full shadow-sm text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              Structural Excellence • Verified Framework
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MythVsFact;
