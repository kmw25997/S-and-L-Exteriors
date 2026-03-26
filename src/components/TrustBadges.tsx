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
    <section className="bg-secondary py-10">
      <div className="section-container section-padding">
        <ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {badges.map((badge, i) => (
              <div key={i} className="flex items-center justify-start gap-3 lg:gap-2.5 min-h-[56px] lg:min-h-[48px]">
                <div className="w-10 h-10 lg:w-9 lg:h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <badge.icon className="w-5 h-5 lg:w-4 lg:h-4 text-primary" />
                </div>
                <span className="text-sm lg:text-[0.95rem] font-semibold text-foreground leading-snug">{badge.label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TrustBadges;
