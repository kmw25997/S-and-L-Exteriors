import { Home, Paintbrush, Layers, PaintBucket, Droplets } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const services = [
  {
    icon: Home,
    title: "Roofing",
    value: "roofing",
    description: "Complete roof replacement, repairs, and inspections. We use high-quality materials to keep your home safe and dry for decades.",
  },
  {
    icon: Layers,
    title: "Siding",
    value: "siding",
    description: "New siding installation and repairs that boost curb appeal and protect your home from the elements year-round.",
  },
  {
    icon: Droplets,
    title: "Gutters",
    value: "gutters",
    description: "Professional gutter installation, replacement, and repair to keep water flowing away from your home and foundation.",
  },
  {
    icon: PaintBucket,
    title: "Exterior Painting",
    value: "exterior-painting",
    description: "Refresh your home's look with expert exterior painting. Proper prep, premium paints, and clean, lasting results.",
  },
  {
    icon: Paintbrush,
    title: "Interior Painting",
    value: "interior-painting",
    description: "Transform any room with precise interior painting. From single rooms to whole-home refreshes, we deliver flawless finishes.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 lg:py-28 bg-background">
      <div className="section-container section-padding">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-3">What We Do</p>
            <h2 className="text-3xl sm:text-4xl text-foreground">Services Built Around Your Home</h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("select-service", { detail: service.value }));
                  document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group bg-card border border-border rounded-xl p-8 hover:shadow-xl hover:shadow-primary/5 transition-shadow duration-300 text-left w-full cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{service.description}</p>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
