import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type Status = "loading" | "valid" | "already_unsubscribed" | "invalid" | "success" | "error";

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>("loading");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!token) { setStatus("invalid"); return; }

    const validate = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${token}`,
          { headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY } }
        );
        const data = await res.json();
        if (!res.ok) { setStatus("invalid"); return; }
        setStatus(data.valid === false && data.reason === "already_unsubscribed" ? "already_unsubscribed" : "valid");
      } catch { setStatus("error"); }
    };
    validate();
  }, [token]);

  const handleUnsubscribe = async () => {
    setProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", { body: { token } });
      if (error) throw error;
      setStatus(data?.success ? "success" : "error");
    } catch { setStatus("error"); }
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="font-display text-2xl text-foreground">Email Preferences</h1>

        {status === "loading" && <p className="text-muted-foreground">Verifying…</p>}

        {status === "valid" && (
          <>
            <p className="text-muted-foreground">Click below to unsubscribe from future emails.</p>
            <button onClick={handleUnsubscribe} disabled={processing}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:brightness-110 transition disabled:opacity-70">
              {processing ? "Processing…" : "Confirm Unsubscribe"}
            </button>
          </>
        )}

        {status === "success" && <p className="text-green-600 font-medium">You have been unsubscribed successfully.</p>}
        {status === "already_unsubscribed" && <p className="text-muted-foreground">You are already unsubscribed.</p>}
        {status === "invalid" && <p className="text-destructive">This unsubscribe link is invalid or expired.</p>}
        {status === "error" && <p className="text-destructive">Something went wrong. Please try again later.</p>}
      </div>
    </div>
  );
};

export default Unsubscribe;
