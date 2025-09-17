-- Create leads table
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  role TEXT,
  industry TEXT,
  team_size INTEGER,
  style_result TEXT,
  quiz_answers JSONB,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  referrer TEXT,
  page_path TEXT,
  device TEXT,
  timezone TEXT,
  consent_marketing BOOLEAN DEFAULT false,
  consent_timestamp TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create lead_events table
CREATE TABLE public.lead_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_payload JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_events ENABLE ROW LEVEL SECURITY;

-- RLS policies for leads table
-- Service role can do everything
CREATE POLICY "Service role can manage leads" 
ON public.leads 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- Public clients can only insert (no select)
CREATE POLICY "Public can insert leads" 
ON public.leads 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- RLS policies for lead_events table  
-- Service role can do everything
CREATE POLICY "Service role can manage lead events" 
ON public.lead_events 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- Public clients can only insert (no select)
CREATE POLICY "Public can insert lead events" 
ON public.lead_events 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_leads_email ON public.leads(email);
CREATE INDEX idx_leads_created_at ON public.leads(created_at);
CREATE INDEX idx_leads_style_result ON public.leads(style_result);
CREATE INDEX idx_lead_events_lead_id ON public.lead_events(lead_id);
CREATE INDEX idx_lead_events_event_type ON public.lead_events(event_type);
CREATE INDEX idx_lead_events_created_at ON public.lead_events(created_at);