import { motion } from "framer-motion";
import { 
  ConfidentialitySVG, 
  QuickResponseSVG, 
  ConvenientComplianceSVG, 
  ExpertiseSVG, 
  AffordableSVG, 
  PersonalizedSVG 
} from "./SectionIllustrations";

const reasons = [
  { 
    illustration: <ConfidentialitySVG />, 
    title: "Confidentiality", 
    desc: "Your security and privacy are our top priorities." 
  },
  { 
    illustration: <QuickResponseSVG />, 
    title: "Quick Response", 
    desc: "Complete the entire process with quick and efficient responses." 
  },
  { 
    illustration: <ConvenientComplianceSVG />, 
    title: "Convenient Compliance", 
    desc: "Hassle-free compliance services. Relax, we've got you covered." 
  },
  { 
    illustration: <ExpertiseSVG />, 
    title: "Expertise and Knowledge", 
    desc: "Experienced CA in finance, tax, and auditing." 
  },
  { 
    illustration: <AffordableSVG />, 
    title: "Affordable & Reliable", 
    desc: "Affordable and reliable assistance for all your financial needs." 
  },
  { 
    illustration: <PersonalizedSVG />, 
    title: "Personalized Solutions", 
    desc: "Tailored compliance solutions to meet your unique needs." 
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-10 md:py-12 bg-white" id="why-choose-us">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-7 md:mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-[#1A1A1A]">
            Why Choose Us?
          </h2>
          <p className="text-[#FF4500] font-bold text-lg md:text-xl">
            Your Success, Our Commitment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-9">
          {reasons.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-full aspect-[4/3] flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-3 drop-shadow-[0_0_0_rgba(0,0,0,0)] group-hover:drop-shadow-[0_20px_20px_rgba(255,69,0,0.1)]">
                {item.illustration}
              </div>
              <h3 className="text-2xl font-display font-bold mb-3 text-[#1A1A1A]">
                {item.title}
              </h3>
              <p className="text-[#6B7280] leading-relaxed max-w-[280px]">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
