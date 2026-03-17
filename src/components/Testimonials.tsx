import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";

const testimonials = [
  { 
    title: "Exceptional Service and Results! Experience Unparalleled Satisfaction with",
    name: "Arjun Kapoor", 
    role: "Founder, TechVista Solutions", 
    text: "I couldn't be happier with the exceptional service provided by Compliance Desk India. Their team went above and beyond to meet my needs and deliver outstanding results. Highly recommended!", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  return (
    <section id="testimonials" className="pt-12 pb-20 md:pt-14 md:pb-24 bg-[#FAFAFA] overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Figma Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 mb-4 uppercase tracking-tighter">
            Testimonials
          </h2>
          <p className="text-primary font-bold text-lg md:text-xl">
            Our Clients, Our Success
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row items-stretch">
              {/* Content Side */}
              <div className="flex-1 p-10 md:p-16 lg:p-20 relative">
                <Quote className="w-12 h-12 text-primary absolute top-10 left-10 opacity-80" />
                <div className="relative z-10 mt-6 lg:mt-8">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-8 leading-tight">
                    {testimonials[current].title}
                  </h3>
                  <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-body font-light mb-10 italic">
                    {testimonials[current].text}
                  </p>
                  
                  <div className="flex items-center gap-4 border-t border-slate-100 pt-8">
                    <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold">
                      {testimonials[current].name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{testimonials[current].name}</h4>
                      <p className="text-sm text-slate-500">{testimonials[current].role}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Side */}
              <div className="lg:w-1/3 min-h-[400px] relative">
                <div className="absolute inset-4 rounded-xl overflow-hidden bg-slate-100">
                  <img 
                    src={testimonials[current].image} 
                    alt={testimonials[current].name}
                    className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Controls (Figma Position: Bottom Right) */}
          <div className="flex justify-center md:justify-end gap-4 mt-8">
            <button 
              className="w-12 h-12 rounded-lg bg-primary text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-lg shadow-primary/20"
              onClick={() => {}}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              className="w-12 h-12 rounded-lg bg-primary text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-lg shadow-primary/20"
              onClick={() => {}}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
