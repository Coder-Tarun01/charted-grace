import SiteLayout from "@/components/SiteLayout";
import Hero from "@/components/Hero";
import StartupSection from "@/components/StartupSection";
import MythVsFact from "@/components/MythVsFact";
import HowWeWork from "@/components/HowWeWork";
import WhyChooseUs from "@/components/WhyChooseUs";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import RAREMethodology from "@/components/RAREMethodology";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <SiteLayout>
      <Hero />
      <StartupSection />
      <MythVsFact />
      <HowWeWork />
      <WhyChooseUs />
      <ServicesSection />
      <PricingSection />
      <RAREMethodology />
      <Testimonials />
      <ContactSection />
    </SiteLayout>
  );
};

export default Index;
