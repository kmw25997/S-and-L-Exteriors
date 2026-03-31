import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { z } from "https://esm.sh/zod@3.25.76";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const QuoteSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().trim().min(10, "Phone must be at least 10 digits").max(20),
  email: z.string().trim().email("Invalid email").max(255).optional().or(z.literal("")),
  service: z.enum(["roofing", "siding", "gutters", "exterior-painting", "interior-painting"]),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

const RATE_LIMIT_WINDOW_MINUTES = 60;
const RATE_LIMIT_MAX_REQUESTS = 5;

function getClientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const parsed = QuoteSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { name, phone, email, service, message } = parsed.data;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // --- Rate limiting by IP ---
    const clientIp = getClientIp(req);
    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000).toISOString();

    const { count, error: countError } = await supabase
      .from("quote_rate_limits")
      .select("*", { count: "exact", head: true })
      .eq("ip_address", clientIp)
      .gte("created_at", windowStart);

    if (countError) {
      console.error("Rate limit check error:", countError);
    } else if ((count ?? 0) >= RATE_LIMIT_MAX_REQUESTS) {
      console.warn(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later or call us at (630) 825-4364." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Record this request for rate limiting
    await supabase.from("quote_rate_limits").insert({ ip_address: clientIp });

    // --- Insert quote request ---
    const { error: dbError } = await supabase.from("quote_requests").insert({
      name,
      phone,
      email: email || null,
      service,
      message: message || null,
    });

    if (dbError) {
      console.error("DB insert error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save your request. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send email notification to both site owners
    const quoteId = crypto.randomUUID();
    const notifyRecipients = ["kmw25997@gmail.com", "freeinsp.sle@gmail.com"];
    const emailTemplateData = { name, phone, email: email || "", service, message: message || "" };

    for (const recipient of notifyRecipients) {
      const { error: emailError } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "new-quote-notification",
          recipientEmail: recipient,
          idempotencyKey: `quote-notify-${quoteId}-${recipient}`,
          templateData: emailTemplateData,
        },
      });

      if (emailError) {
        console.error(`Email notification error for ${recipient} (non-blocking):`, emailError);
      }
    }

    console.log(`New quote request from ${name} (${phone}) for ${service}`);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please call us at (630) 825-4364." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
