
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured in Supabase secrets');
    }

    const { prompt, executiveName, executiveRole, userPreferences } = await req.json();

    // Prepare system message with user preferences
    let systemContent = 'You are an AI executive agent that thinks through business problems and provides structured decision recommendations. Answer in JSON format following the specified schema.';
    
    if (userPreferences) {
      systemContent += `\n\nUser has these preferences:
- Communication Style: ${userPreferences.responseStyle || 'balanced'}
- Technical Level: ${userPreferences.technicalLevel || 'intermediate'} 
- Risk Appetite: ${userPreferences.riskAppetite || 'medium'}
- Focus Area: ${userPreferences.focusArea || 'general'}

Adapt your decision making and communication style to match these preferences.`;
    }

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: systemContent
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 800,
      }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(`OpenAI API error: ${data.error.message}`);
    }

    const content = data.choices[0].message.content;

    // Log the decision to the console
    console.log(`Executive ${executiveName} (${executiveRole}) made a decision`);

    return new Response(JSON.stringify({ 
      content,
      executiveName,
      executiveRole,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in executive-think function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
