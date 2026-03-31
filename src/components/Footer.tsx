import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground py-12">
      <div className="section-container section-padding">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="inline-block"
            >
              <img
                src="/logo-white.png"
                alt="S and L Exteriors"
                className="h-12 w-auto object-contain mb-3"
                loading="lazy"
              />
            </a>
            <p className="text-background/60 text-sm leading-relaxed">
              Professional roofing, siding, gutters, and painting services proudly serving homeowners across Northern Illinois and the greater Nashville, Tennessee area.
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
                <MapPin className="w-4 h-4" /> Northern Illinois & Nashville, TN
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-background text-sm mb-3">Services</h4>
            <ul className="space-y-1.5 text-sm">
              {[
                { label: "Roofing", value: "roofing" },
                { label: "Siding", value: "siding" },
                { label: "Gutters", value: "gutters" },
                { label: "Exterior Painting", value: "exterior-painting" },
                { label: "Interior Painting", value: "interior-painting" },
              ].map((s) => (
                <li key={s.value}>
                  <button
                    type="button"
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent("select-service", { detail: s.value }));
                      document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-background/60 hover:text-accent transition-colors cursor-pointer"
                  >
                    {s.label}
                  </button>
                </li>
              ))}
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
