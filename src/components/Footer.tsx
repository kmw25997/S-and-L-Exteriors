import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground py-12">
      <div className="section-container section-padding">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <img
              src="/logo-white.png"
              alt="S and L Exteriors"
              className="h-12 w-auto object-contain mb-3"
              loading="lazy"
            />
            <p className="text-background/60 text-sm leading-relaxed">
              Professional roofing, siding, and painting services for homeowners in Hinckley, IL and surrounding areas.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-background text-sm mb-3">Contact</h4>
            <div className="space-y-2">
              <a href="tel:6308254364" className="flex items-center gap-2 text-background/60 hover:text-accent text-sm transition-colors">
                <Phone className="w-4 h-4" /> (630) 825-4364
              </a>
              <a href="mailto:freeinsp.sle@gmail.com" className="flex items-center gap-2 text-background/60 hover:text-accent text-sm transition-colors">
                <Mail className="w-4 h-4" /> freeinsp.sle@gmail.com
              </a>
              <div className="flex items-center gap-2 text-background/60 text-sm">
                <MapPin className="w-4 h-4" /> Hinckley, Illinois
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-background text-sm mb-3">Services</h4>
            <ul className="space-y-1.5 text-sm text-background/60">
              <li>Roofing</li>
              <li>Siding</li>
              <li>Exterior Painting</li>
              <li>Interior Painting</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/10 mt-10 pt-6 text-center">
          <p className="text-background/40 text-xs">© {new Date().getFullYear()} S and L Exteriors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
