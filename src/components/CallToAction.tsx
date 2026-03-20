import { Phone, Mail } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const CallToAction = () => {
  return (
    <section className="py-20 lg:py-28 bg-primary">
      <div className="section-container section-padding text-center">
        <ScrollReveal>
          <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-3">Ready to Get Started?</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-primary-foreground max-w-3xl mx-auto leading-[1.1] mb-4">
            Your Home Deserves the Best. Let's Talk.
          </h2>
          <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8 leading-relaxed">
            Contact us today for a free, no-obligation estimate. We'll help you figure out the best plan for your home — no pressure, just honest advice.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:6308254364"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-7 py-3.5 rounded-lg font-semibold hover:brightness-110 active:scale-[0.97] transition-all duration-200 shadow-lg shadow-accent/30"
            >
              <Phone className="w-5 h-5" />
              (630) 825-4364
            </a>
            <a
              href="mailto:freeinsp.sle@gmail.com"
              className="inline-flex items-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground px-7 py-3.5 rounded-lg font-semibold hover:bg-primary-foreground/10 active:scale-[0.97] transition-all duration-200"
            >
              <Mail className="w-5 h-5" />
              Email Us
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CallToAction;
