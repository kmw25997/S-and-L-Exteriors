import { CheckCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const reasons = [
  { title: "Owner-Operated", detail: "Ryan Salazar is on every job — you deal directly with the owner, not a middleman." },
  { title: "Honest, Upfront Pricing", detail: "No hidden fees or surprises. You get a detailed, transparent estimate before any work begins." },
  { title: "Quality Materials", detail: "We only use trusted, name-brand materials built to last through every season." },
  { title: "Clean Job Sites", detail: "We treat your property with respect — thorough cleanup after every project, guaranteed." },
  { title: "Local & Reliable", detail: "Proudly serving Northern Illinois and the Nashville, TN area. Our reputation is everything." },
  { title: "Free Inspections", detail: "Not sure what you need? We'll come out and assess your home at absolutely no cost." },
];

const WhyUs = () => {
  return (
    <section id="why-us" className="py-20 lg:py-28 bg-section-dark">
      <div className="section-container section-padding">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-3">The S&L Difference</p>
            <h2 className="text-3xl sm:text-4xl text-section-dark-foreground">Why Homeowners Choose Us</h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, i) => (
            <ScrollReveal key={i} delay={i * 70}>
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-section-dark-foreground mb-1">{reason.title}</h3>
                  <p className="text-section-dark-foreground/70 text-sm leading-relaxed">{reason.detail}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
