-- Create table for quote/lead submissions
CREATE TABLE public.quote_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public form, no auth required)
CREATE POLICY "Anyone can submit a quote request"
  ON public.quote_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only service role can read (admin/edge function access only)
CREATE POLICY "Service role can read quote requests"
  ON public.quote_requests
  FOR SELECT
  TO service_role
  USING (true);