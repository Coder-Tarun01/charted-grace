import TopHeader from "@/components/TopHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-body">
      <TopHeader />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
