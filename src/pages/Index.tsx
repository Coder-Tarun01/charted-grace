import TopHeader from "@/components/TopHeader";
import Navbar from "@/components/Navbar";
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
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-body">
      <TopHeader />
      <Navbar />
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
      <Footer />
    </div>
  );
};

export default Index;
