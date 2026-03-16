import { Phone, Mail, Clock, MapPin } from "lucide-react";

const TopHeader = () => {
  return (
    <div className="bg-foreground text-primary-foreground py-2 text-sm font-body">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 px-4">
        <div className="flex items-center gap-4 md:gap-6">
          <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">+91 98765 43210</span>
          </a>
          <a href="mailto:info@compliancedeskindia.com" className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Mail className="w-3.5 h-3.5" />
            <span className="hidden md:inline">info@compliancedeskindia.com</span>
          </a>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span className="hidden sm:inline">Mon-Sat: 9AM - 7PM</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span className="hidden lg:inline">New Delhi, India</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
