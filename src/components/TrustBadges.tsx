import { Shield, Clock, Award, ThumbsUp } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const badges = [
  { icon: Shield, label: "Fully Insured" },
  { icon: Clock, label: "Free Estimates" },
  { icon: Award, label: "Licensed Contractor" },
  { icon: ThumbsUp, label: "Satisfaction Guaranteed" },
];

const TrustBadges = () => {
  return (
    <section className="bg-secondary py-5 lg:py-6">
      <div className="section-container section-padding">
        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {badges.map((badge, i) => (
              <div key={i} className="flex items-center justify-start gap-3 min-h-[56px]">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <badge.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-lg md:text-xl font-semibold text-foreground leading-tight">{badge.label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TrustBadges;
