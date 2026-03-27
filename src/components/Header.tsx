import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Why Us", href: "#why-us" },
    { label: "Gallery", href: "#gallery" },
    { label: "Reviews", href: "#reviews" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="section-container section-padding flex items-center justify-between h-16 lg:h-20">
        <a href="#" className="inline-flex items-center" aria-label="S and L Exteriors home">
          <img
            src="/logo.png"
            alt="S and L Exteriors"
            className="w-32 lg:w-44 h-auto object-contain"
            loading="eager"
          />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:6308254364"
            className="hidden sm:inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:brightness-110 active:scale-[0.97] transition-all duration-200 shadow-md shadow-accent/25"
          >
            <Phone className="w-4 h-4" />
            (630) 825-4364
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary active:scale-95 transition-all"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-card border-b border-border">
          <nav className="section-padding py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-foreground/70 hover:text-primary py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:6308254364"
              className="sm:hidden inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-lg text-sm font-semibold mt-2"
            >
              <Phone className="w-4 h-4" />
              (630) 825-4364
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
