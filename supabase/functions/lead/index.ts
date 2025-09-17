import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface LeadPayload {
  name?: string
  email: string
  phone?: string
  company?: string
  role?: string
  industry?: string
  team_size?: number
  style_result?: string
  quiz_answers?: any
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  referrer?: string
  page_path?: string
  device?: string
  timezone?: string
  consent_marketing: boolean
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }

  try {
    // Parse request body
    const payload: LeadPayload = await req.json()
    
    console.log('Received lead payload:', { ...payload, quiz_answers: payload.quiz_answers ? 'present' : 'null' })

    // Validate required fields
    if (!payload.email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    if (!payload.consent_marketing || payload.consent_marketing !== true) {
      return new Response(
        JSON.stringify({ error: 'Marketing consent is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(payload.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Prepare data for upsert
    const leadData = {
      name: payload.name || null,
      email: payload.email,
      phone: payload.phone || null,
      company: payload.company || null,
      role: payload.role || null,
      industry: payload.industry || null,
      team_size: payload.team_size || null,
      style_result: payload.style_result || null,
      quiz_answers: payload.quiz_answers || null,
      utm_source: payload.utm_source || null,
      utm_medium: payload.utm_medium || null,
      utm_campaign: payload.utm_campaign || null,
      referrer: payload.referrer || null,
      page_path: payload.page_path || null,
      device: payload.device || null,
      timezone: payload.timezone || null,
      consent_marketing: payload.consent_marketing,
      consent_timestamp: new Date().toISOString(),
    }

    console.log('Attempting to upsert lead data for email:', payload.email)

    // Upsert the lead (insert or update based on email)
    const { data, error } = await supabase
      .from('leads')
      .upsert(leadData, { 
        onConflict: 'email',
        ignoreDuplicates: false 
      })
      .select('id')

    if (error) {
      console.error('Supabase error:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to save lead data' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Lead saved successfully:', data?.[0]?.id)

    // Return success response
    return new Response(
      JSON.stringify({ ok: true }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error processing lead submission:', error)
    
    return new Response(
      JSON.stringify({ error: 'Invalid request format' }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})