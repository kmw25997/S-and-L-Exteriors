import { MapPin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const areas = [
  {
    region: "Northern Illinois",
    description: "Proudly serving Northern Illinois and surrounding communities across the region.",
    tags: ["Chicagoland Area", "Northern Illinois", "Surrounding Communities"],
  },
  {
    region: "Greater Nashville Area",
    description: "Providing services throughout the greater Nashville area and nearby communities.",
    tags: ["Nashville", "Middle Tennessee", "Surrounding Areas"],
  },
];

const ServiceAreaMap = () => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="section-container section-padding">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-3">Where We Work</p>
            <h2 className="text-3xl sm:text-4xl text-foreground">Our Service Areas</h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-8">
          {areas.map((area, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-xl text-foreground">{area.region}</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{area.description}</p>
                <div className="flex flex-wrap gap-2">
                  {area.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1.5 bg-secondary text-foreground/80 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={200}>
          <p className="text-center text-muted-foreground mt-8 text-sm">
            Don't see your area? <button type="button" onClick={() => document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" })} className="text-accent font-semibold hover:underline">Contact us</button> — we may still be able to help!
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ServiceAreaMap;
