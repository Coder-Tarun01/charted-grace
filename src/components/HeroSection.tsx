import { motion } from "framer-motion";
import { Search, Shield, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Institutional Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
          alt="Institutional Architecture" 
          className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
        />
        {/* Deep Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900/90" />
      </div>

      <div className="container mx-auto px-4 relative z-10 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto"
        >
          {/* Header Area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 mb-10 px-4 py-1.5 bg-primary rounded-full shadow-2xl shadow-primary/20">
              <Shield className="w-4 h-4 text-white" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Certified Institutional Protocol</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white leading-[0.85] tracking-tighter mb-10 drop-shadow-2xl">
              Governance. <br />
              <span className="text-primary italic font-serif">Integrity.</span> <br />
              Scale.
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-200 max-w-xl mx-auto leading-relaxed font-body font-light mb-16 opacity-80 uppercase tracking-widest">
              The definitive operating system for high-stakes corporate compliance.
            </p>
          </motion.div>

          {/* Massively Highlighted Search Portal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative max-w-4xl mx-auto group"
          >
            {/* Glow Aura */}
            <div className={`absolute -inset-1 bg-primary/20 blur-3xl rounded-full transition-opacity duration-700 ${isFocused ? 'opacity-100' : 'opacity-0'}`} />
            
            <div className={`relative flex items-center bg-white/10 backdrop-blur-3xl border-2 transition-all duration-700 rounded-[2rem] px-8 md:px-10 h-20 md:h-24 ${isFocused ? 'border-primary shadow-[0_40px_100px_-20px_rgba(255,69,0,0.4)] bg-white/20' : 'border-white/20 shadow-2xl shadow-black/50'}`}>
              <Search className={`w-8 h-8 mr-6 transition-colors duration-500 ${isFocused ? 'text-primary' : 'text-white/40'}`} />
              <input 
                type="text"
                placeholder="PROMPT: Search for Compliance Services..."
                className="w-full h-full bg-transparent text-xl md:text-2xl font-display font-medium text-white outline-none placeholder:text-white/20 placeholder:italic"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              
              <div className="hidden md:flex items-center gap-4">
                <div className="w-px h-12 bg-white/10" />
                <button className={`p-4 rounded-xl transition-all duration-500 ${isFocused ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white/10 text-white/40 hover:bg-white/20'}`}>
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Pulsating Mandatory Indicator */}
            <div className="mt-10 flex justify-center items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white">Search Mandatory to Proceed</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2 opacity-50">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">ISO 9001:2015</span>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Signature technical line */}
      <div className="absolute bottom-0 left-0 w-full h-[0.5px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </section>
  );
};

export default HeroSection;
