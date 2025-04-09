
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

    const { prompt, botName, botRole, messages, debateContext } = await req.json();

    // Construct the system prompt based on the bot info
    let systemPrompt = "You are a helpful AI assistant.";
    
    if (botName && botRole) {
      systemPrompt = `You are ${botName}, an experienced executive in the role of ${botRole}. 
      You provide expert business advice and strategic insights based on your expertise. 
      Your responses should be professional, direct, and reflective of your executive position.
      Keep responses concise (3-4 sentences max) unless specifically asked to elaborate.`;
    }
    
    if (debateContext) {
      systemPrompt = `You are ${botName}, an executive with expertise in ${botRole}. 
      You are participating in a debate on the topic: ${debateContext.topic}.
      Consider the business context: Risk Appetite: ${debateContext.riskAppetite}, Business Priority: ${debateContext.businessPriority}.
      Provide your professional perspective on this topic in 2-3 sentences.`;
    }

    // Prepare conversation history if provided
    const conversationMessages = messages && messages.length > 0 
      ? messages.map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content
        }))
      : [];

    // Add the system message at the beginning
    const fullMessages = [
      { role: 'system', content: systemPrompt },
      ...conversationMessages
    ];

    // If this is a single prompt (not a conversation), add it as the user message
    if (prompt && (!messages || messages.length === 0)) {
      fullMessages.push({ role: 'user', content: prompt });
    }

    console.log('Sending to OpenAI:', JSON.stringify(fullMessages));

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: fullMessages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    console.log('OpenAI response:', data);

    if (data.error) {
      throw new Error(`OpenAI API error: ${data.error.message}`);
    }

    const generatedText = data.choices[0].message.content;

    return new Response(JSON.stringify({ 
      content: generatedText,
      usage: data.usage
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in OpenAI function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
