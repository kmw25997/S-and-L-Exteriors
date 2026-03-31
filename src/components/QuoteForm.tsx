import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const QuoteForm = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: CustomEvent<string>) => {
      setFormData((prev) => ({ ...prev, service: e.detail }));
      setTimeout(() => nameInputRef.current?.focus(), 300);
    };
    window.addEventListener("select-service", handler as EventListener);
    return () => window.removeEventListener("select-service", handler as EventListener);
  }, []);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateForm = () => {
    if (formData.name.trim().length < 2) return "Please enter your full name.";
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) return "Please enter a valid phone number.";
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) return "Please enter a valid email address.";
    }
    if (!formData.service) return "Please select a service.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    const validationError = validateForm();
    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    try {
      setIsSubmitting(true);

      const { data, error } = await supabase.functions.invoke("submit-quote", {
        body: {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          service: formData.service,
          message: formData.message.trim(),
        },
      });

      if (error) {
        // Check for rate limiting (edge function returns 429 wrapped in FunctionsHttpError)
        if (data?.error?.includes("Too many requests")) {
          setSubmitError(data.error);
          return;
        }
        throw error;
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

  const inputClass = "w-full px-4 py-3 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow";

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="w-6 h-6 text-green-600" />
        </div>
        <p className="font-display text-xl text-foreground">Thank you!</p>
        <p className="text-muted-foreground text-sm mt-1">We'll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input ref={nameInputRef} type="text" placeholder="Full Name" required value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} />
      <div className="grid sm:grid-cols-2 gap-4">
        <input type="tel" placeholder="Phone Number" required value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputClass} />
        <input type="email" placeholder="Email" value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} />
      </div>
      <select required value={formData.service}
        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
        className={`${inputClass} text-foreground`}>
        <option value="">Select a Service</option>
        <option value="roofing">Roofing</option>
        <option value="siding">Siding</option>
        <option value="gutters">Gutters</option>
        <option value="exterior-painting">Exterior Painting</option>
        <option value="interior-painting">Interior Painting</option>
      </select>
      <textarea placeholder="Tell us about your project (optional)" rows={3} value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className={`${inputClass} resize-none`} />

      {submitError && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{submitError}</p>
      )}

      <button type="submit" disabled={isSubmitting}
        className="w-full bg-accent text-accent-foreground py-3.5 rounded-lg font-semibold hover:brightness-110 active:scale-[0.98] transition-all duration-200 shadow-md shadow-accent/25 disabled:opacity-70 disabled:cursor-not-allowed">
        {isSubmitting ? "Sending..." : "Request Free Estimate"}
      </button>
    </form>
  );
};

export default QuoteForm;
