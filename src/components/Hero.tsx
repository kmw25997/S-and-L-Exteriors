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