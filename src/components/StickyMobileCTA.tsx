import { Phone, FileText } from "lucide-react";
import { useState, useEffect } from "react";

const StickyMobileCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card/95 backdrop-blur-sm border-t border-border px-4 py-3 flex gap-3 animate-fade-up">
      <a
        href="tel:6308254364"
        className="flex-1 inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground py-3 rounded-lg font-semibold text-sm shadow-md shadow-accent/25 active:scale-[0.97] transition-all"
      >
        <Phone className="w-4 h-4" />
        Call Now
      </a>
      <button
        type="button"
        onClick={() => document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" })}
        className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm shadow-md active:scale-[0.97] transition-all"
      >
        <FileText className="w-4 h-4" />
        Free Estimate
      </button>
    </div>
  );
};

export default StickyMobileCTA;
