
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

    const { 
      prompt, 
      botName, 
      botRole, 
      messages, 
      debateContext,
      preferences,
      memoryContext,
      learningFeedback
    } = await req.json();

    // Construct the system prompt based on bot info, user preferences and memory
    let systemPrompt = "You are a helpful AI assistant.";
    
    // Include memory context if provided
    let memoryPrompt = "";
    if (memoryContext && memoryContext.previousInteractions) {
      memoryPrompt = `\n\nRELEVANT HISTORY AND CONTEXT:\n${memoryContext.previousInteractions.join("\n")}\n\n`;
      
      if (memoryContext.userPreferences) {
        memoryPrompt += `USER PREFERENCES: ${JSON.stringify(memoryContext.userPreferences)}\n\n`;
      }
      
      if (memoryContext.companyData) {
        memoryPrompt += `COMPANY CONTEXT: ${JSON.stringify(memoryContext.companyData)}\n\n`;
      }
    }
    
    if (botName && botRole) {
      systemPrompt = `You are ${botName}, an experienced executive in the role of ${botRole}. 
      You provide expert business advice and strategic insights based on your expertise. 
      Your responses should be professional, direct, and reflective of your executive position.
      ${memoryPrompt}`;
      
      // Add response style preferences
      if (preferences?.responseStyle) {
        switch (preferences.responseStyle) {
          case 'concise':
            systemPrompt += " Keep your responses very brief and to the point (1-2 sentences max).";
            break;
          case 'detailed':
            systemPrompt += " Provide comprehensive, detailed responses with thorough explanations.";
            break;
          case 'balanced':
            systemPrompt += " Keep responses concise (3-4 sentences) unless specifically asked to elaborate.";
            break;
        }
      } else {
        systemPrompt += " Keep responses concise (3-4 sentences max) unless specifically asked to elaborate.";
      }
      
      // Add technical level preferences
      if (preferences?.technicalLevel) {
        switch (preferences.technicalLevel) {
          case 'basic':
            systemPrompt += " Use simple language and avoid industry jargon. Explain concepts in straightforward terms accessible to beginners.";
            break;
          case 'advanced':
            systemPrompt += " Feel free to use advanced industry terminology and sophisticated concepts. The user has extensive domain knowledge.";
            break;
          case 'intermediate':
            systemPrompt += " Use moderate industry terminology with brief explanations when introducing complex concepts.";
            break;
        }
      }
      
      // Add sources preference
      if (preferences?.showSources) {
        systemPrompt += " Include brief references to relevant business theories, frameworks, or research when appropriate.";
      }
      
      // Add focus area preference
      if (preferences?.focusArea && preferences.focusArea !== 'general') {
        systemPrompt += ` Pay special attention to aspects related to ${preferences.focusArea} in your responses.`;
      }
      
      // Add learning feedback if available
      if (learningFeedback) {
        systemPrompt += `\n\nLEARNING FEEDBACK: User has previously ${learningFeedback.positive ? 'liked' : 'disliked'} advice about ${learningFeedback.topic}. Adjust your recommendations accordingly.`;
      }
    }
    
    if (debateContext) {
      systemPrompt = `You are ${botName}, an executive with expertise in ${botRole}. 
      You are participating in a debate on the topic: ${debateContext.topic}.
      Consider the business context: Risk Appetite: ${debateContext.riskAppetite}, Business Priority: ${debateContext.businessPriority}.
      ${memoryPrompt}`;
      
      // If this is a multi-agent debate, specify the role and expectations
      if (debateContext.isMultiAgentDebate) {
        systemPrompt += `\n\nIMPORTANT: You are one of several AI executives in this conversation. You should:
        1. Stay focused on your expertise as ${botRole}
        2. Consider other executives' perspectives when they've spoken
        3. Politely disagree when appropriate based on your domain expertise
        4. Look for ways to build on others' ideas
        5. Your goal is to help reach the best possible business decision through collaborative debate`;
      }
      
      // Apply user preferences to debate responses
      if (preferences?.responseStyle) {
        switch (preferences.responseStyle) {
          case 'concise':
            systemPrompt += " Provide your professional perspective in 1-2 concise sentences.";
            break;
          case 'detailed':
            systemPrompt += " Provide your professional perspective with detailed reasoning and examples.";
            break;
          case 'balanced':
            systemPrompt += " Provide your professional perspective in 2-3 sentences.";
            break;
        }
      } else {
        systemPrompt += " Provide your professional perspective in 2-3 sentences.";
      }
      
      // Add technical level to debate responses
      if (preferences?.technicalLevel === 'advanced') {
        systemPrompt += " Don't hesitate to use industry jargon and sophisticated business concepts.";
      } else if (preferences?.technicalLevel === 'basic') {
        systemPrompt += " Use accessible language that all participants can understand easily.";
      }
      
      // Add focus area to debate context
      if (preferences?.focusArea && preferences.focusArea !== 'general') {
        systemPrompt += ` Emphasize implications for ${preferences.focusArea} in your contribution.`;
      }
    }

    // Prepare conversation history if provided
    const conversationMessages = messages && messages.length > 0 
      ? messages.map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content,
          name: msg.sender ? msg.sender.replace(/\s+/g, '_').toLowerCase() : undefined
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

    console.log('Sending to OpenAI:', JSON.stringify({
      model: 'gpt-4o-mini',
      messages: fullMessages.map(m => ({ role: m.role, content: m.content.substring(0, 50) + '...' }))
    }));

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
    console.log('OpenAI response status:', data.choices ? 'Success' : 'Error');

    if (data.error) {
      throw new Error(`OpenAI API error: ${data.error.message}`);
    }

    const generatedText = data.choices[0].message.content;

    return new Response(JSON.stringify({ 
      content: generatedText,
      usage: data.usage,
      botName,
      botRole,
      timestamp: new Date().toISOString()
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
