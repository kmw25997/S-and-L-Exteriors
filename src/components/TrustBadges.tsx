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
    <section className="bg-secondary py-6 lg:py-7">
      <div className="section-container section-padding">
        <ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {badges.map((badge, i) => (
              <div key={i} className="flex items-center justify-start gap-2.5 lg:gap-2 min-h-[44px]">
                <div className="w-8 h-8 lg:w-7 lg:h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <badge.icon className="w-4 h-4 lg:w-3.5 lg:h-3.5 text-primary" />
                </div>
                <span className="text-[13px] md:text-sm font-semibold text-foreground leading-snug">{badge.label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TrustBadges;
