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
              <div key={i} className="flex items-center gap-3 justify-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <badge.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-semibold text-foreground">{badge.label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TrustBadges;
