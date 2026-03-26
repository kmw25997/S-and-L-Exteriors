import { useState } from "react";
import { Phone, Send } from "lucide-react";
import heroImage from "@/assets/hero-roofing.jpg";

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;

const Hero = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateForm = () => {
    if (formData.name.trim().length < 2) {
      return "Please enter your full name.";
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      return "Please enter a valid phone number.";
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        return "Please enter a valid email address.";
      }
    }

    if (!formData.service) {
      return "Please select a service.";
    }

    if (!FORMSPREE_ENDPOINT) {
      return "Form is not configured yet. Please call us directly at (630) 825-4364.";
    }

    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    console.log("[QuoteForm] handleSubmit fired");
    console.log("[QuoteForm] VITE_FORMSPREE_ENDPOINT exists:", Boolean(FORMSPREE_ENDPOINT));

    const validationError = validateForm();
    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          service: formData.service,
          message: formData.message.trim(),
          source: "S and L Exteriors website",
        }),
      });

      console.log("[QuoteForm] response status:", response.status);

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setFormData({ name: "", phone: "", email: "", service: "", message: "" });
    } catch (error) {
      console.error("[QuoteForm] submit error:", error);
      setSubmitError("We couldn't send your request right now. Please call us at (630) 825-4364.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Hinckley, Illinois
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-primary-foreground leading-[1.08]">
              Roofing, Siding & Painting Done Right
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-lg leading-relaxed">
              Trusted by homeowners across DeKalb County. We protect and beautify your home with expert craftsmanship and honest service.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="tel:6308254364"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:brightness-110 active:scale-[0.97] transition-all duration-200 shadow-lg shadow-accent/30"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary-foreground/10 active:scale-[0.97] transition-all duration-200"
              >
                Our Services
              </a>
            </div>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "150ms" }}>
            <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-2xl">
              <h2 className="font-display text-2xl text-foreground mb-1">Get Your Free Estimate</h2>
              <p className="text-muted-foreground text-sm mb-6">No obligation. We'll get back to you within 24 hours.</p>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="font-display text-xl text-foreground">Thank you!</p>
                  <p className="text-muted-foreground text-sm mt-1">We'll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                  />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                    />
                  </div>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow text-foreground"
                  >
                    <option value="">Select a Service</option>
                    <option value="roofing">Roofing</option>
                    <option value="siding">Siding</option>
                    <option value="exterior-painting">Exterior Painting</option>
                    <option value="interior-painting">Interior Painting</option>
                  </select>
                  <textarea
                    placeholder="Tell us about your project (optional)"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow resize-none"
                  />

                  {submitError && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{submitError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent text-accent-foreground py-3.5 rounded-lg font-semibold hover:brightness-110 active:scale-[0.98] transition-all duration-200 shadow-md shadow-accent/25 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Request Free Estimate"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
