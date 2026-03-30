import { Phone } from "lucide-react";
import heroImage from "@/assets/hero-roofing.jpg";
import QuoteForm from "./QuoteForm";

const Hero = () => {
  return (
    <section className="relative pt-16 lg:pt-20">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Professional roofing work by S and L Exteriors" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/80" />
      </div>

      <div className="relative section-container section-padding py-16 sm:py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 animate-fade-up">
            <p className="text-sm font-semibold tracking-widest uppercase text-accent">
              Northern Illinois & Nashville, TN
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-primary-foreground leading-[1.08]">
              Roofing, Siding & Painting Done Right
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-lg leading-relaxed">
              Trusted by homeowners across Northern Illinois and the greater Nashville, Tennessee area. We protect and beautify your home with expert craftsmanship and honest service.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="tel:6308254364"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:brightness-110 active:scale-[0.97] transition-all duration-200 shadow-lg shadow-accent/30">
                <Phone className="w-5 h-5" />
                Call Now
              </a>
              <a href="#services"
                className="inline-flex items-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary-foreground/10 active:scale-[0.97] transition-all duration-200">
                Our Services
              </a>
            </div>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "150ms" }}>
            <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-2xl">
              <h2 className="font-display text-2xl text-foreground mb-1">Get Your Free Estimate</h2>
              <p className="text-muted-foreground text-sm mb-6">No obligation. We'll get back to you within 24 hours.</p>
              <QuoteForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
