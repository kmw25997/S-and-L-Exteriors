-- Remove the overly permissive anon insert policy
DROP POLICY IF EXISTS "Anyone can submit a quote request" ON public.quote_requests;

-- Only service_role (edge function) can insert
CREATE POLICY "Service role can insert quote requests"
  ON public.quote_requests
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Add length constraints and valid service check
ALTER TABLE public.quote_requests
  ADD CONSTRAINT quote_name_length CHECK (char_length(name) BETWEEN 2 AND 100),
  ADD CONSTRAINT quote_phone_length CHECK (char_length(phone) BETWEEN 10 AND 20),
  ADD CONSTRAINT quote_email_length CHECK (email IS NULL OR char_length(email) <= 255),
  ADD CONSTRAINT quote_message_length CHECK (message IS NULL OR char_length(message) <= 2000),
  ADD CONSTRAINT quote_service_valid CHECK (service IN ('roofing', 'siding', 'gutters', 'exterior-painting', 'interior-painting'));

-- Create a rate limiting table for tracking submissions by IP
CREATE TABLE public.quote_rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.quote_rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage rate limits"
  ON public.quote_rate_limits
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Index for fast lookups by IP and time
CREATE INDEX idx_quote_rate_limits_ip_time ON public.quote_rate_limits (ip_address, created_at DESC);