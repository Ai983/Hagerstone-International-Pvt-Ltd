-- Add explicit SELECT policy to prevent public read access to leads table
-- This ensures only service role can read lead data, making security intentions clear

CREATE POLICY "Deny public select on leads" 
ON public.leads 
FOR SELECT 
USING (false);

-- Add explicit SELECT policy for lead_events table as well for consistency
CREATE POLICY "Deny public select on lead_events" 
ON public.lead_events 
FOR SELECT 
USING (false);