import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.36.0";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Get environment variables
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

// Model endpoints and configurations
const AI_MODELS = {
  "gpt-4o-mini": {
    provider: "openai",
    endpoint: "https://api.openai.com/v1/chat/completions",
    defaultTemp: 0.7,
    defaultMaxTokens: 800,
  },
  "gpt-4o": {
    provider: "openai",
    endpoint: "https://api.openai.com/v1/chat/completions",
    defaultTemp: 0.7,
    defaultMaxTokens: 1000,
  },
  "claude-3-sonnet-20240229": {
    provider: "anthropic",
    endpoint: "https://api.anthropic.com/v1/messages",
    defaultTemp: 0.7,
    defaultMaxTokens: 1000,
  },
  "claude-3-opus-20240229": {
    provider: "anthropic",
    endpoint: "https://api.anthropic.com/v1/messages",
    defaultTemp: 0.5,
    defaultMaxTokens: 1200,
  },
  "gemini-1.5-pro": {
    provider: "google",
    endpoint:
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent",
    defaultTemp: 0.7,
    defaultMaxTokens: 1000,
  },
};

// Main function to handle requests
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Parse request body
    const {
      action,
      modelName,
      messages,
      botName,
      botRole,
      debateContext,
      preferences,
    } = await req.json();

    // Set default model if not provided
    const model = modelName || "gpt-4o-mini";

    // Make sure the model is supported
    if (!AI_MODELS[model]) {
      throw new Error(`Unsupported model: ${model}`);
    }

    // Get model config
    const modelConfig = AI_MODELS[model];

    // Track usage for monitoring
    await trackUsage(supabase, botName, botRole, model);

    switch (action) {
      case "debate":
        return await handleDebate(
          req,
          supabase,
          modelConfig,
          botName,
          botRole,
          messages,
          debateContext,
          preferences,
        );

      case "generate":
      default:
        return await handleGenerate(
          req,
          supabase,
          modelConfig,
          botName,
          botRole,
          messages,
          debateContext,
          preferences,
        );
    }
  } catch (error) {
    console.error("Error in multi-model-ai function:", error);

    return new Response(
      JSON.stringify({
        error: error.message,
        success: false,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});

// Track model usage
async function trackUsage(supabase, botName, botRole, model) {
  try {
    await supabase.from("model_usage").insert({
      bot_name: botName || "unspecified",
      bot_role: botRole || "unspecified",
      model: model,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    // Just log the error but don't fail the request if tracking fails
    console.error("Error tracking model usage:", err);
  }
}

// Handle debate scenario with multiple agents
async function handleDebate(
  req,
  supabase,
  modelConfig,
  botName,
  botRole,
  messages,
  debateContext,
  preferences,
) {
  const participants = debateContext?.participants || [];
  const topic = debateContext?.topic || "business strategy";
  const responses = [];

  // Generate a response from each participant
  for (const participant of participants) {
    // Create a system message that defines this participant's role
    const systemMessage = {
      role: "system",
      content: `You are ${participant.name}, a ${participant.role} executive participating in a boardroom debate.
      Topic: ${topic}
      Provide your expert perspective on this topic, considering your background in ${participant.specialty || participant.role}.
      Be concise but insightful. You may respectfully disagree with other executives when appropriate based on your expertise.`,
    };

    // Format messages for this participant
    const formattedMessages = [
      systemMessage,
      ...messages.map((m) => ({
        role: m.type, // 'user' or 'bot'
        content: m.content,
        name: m.sender
          ? m.sender.replace(/\s+/g, "_").toLowerCase()
          : undefined,
      })),
    ];

    // Generate response for this participant
    const response = await callModel(
      modelConfig,
      formattedMessages,
      preferences?.temperature || modelConfig.defaultTemp,
      preferences?.maxTokens || modelConfig.defaultMaxTokens,
    );

    responses.push({
      participant: participant,
      content: response,
    });
  }

  return new Response(
    JSON.stringify({
      success: true,
      responses: responses,
    }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
}

// Handle standard generation request
async function handleGenerate(
  req,
  supabase,
  modelConfig,
  botName,
  botRole,
  messages,
  debateContext,
  preferences,
) {
  // Create a system message based on the bot's role
  const systemMessage = {
    role: "system",
    content: `You are ${botName || "an AI assistant"}, a ${botRole || "helpful assistant"}.
    ${preferences?.detailedResponses ? "Provide detailed, thorough answers with examples and explanations." : "Be concise and to the point in your responses."}
    ${preferences?.technicalLevel === "advanced" ? "Use technical terminology appropriate for experts." : "Use simple language that is easy to understand."}
    ${preferences?.showSources ? "Cite sources and explain your reasoning when possible." : ""}`,
  };

  // Format messages for the API
  const formattedMessages = [
    systemMessage,
    ...messages.map((m) => ({
      role: m.type, // 'user' or 'bot'
      content: m.content,
    })),
  ];

  // Call the selected AI model
  const response = await callModel(
    modelConfig,
    formattedMessages,
    preferences?.temperature || modelConfig.defaultTemp,
    preferences?.maxTokens || modelConfig.defaultMaxTokens,
  );

  return new Response(
    JSON.stringify({
      success: true,
      content: response,
      model: modelConfig,
    }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
}

// Call the AI model based on provider
async function callModel(modelConfig, messages, temperature, maxTokens) {
  const { provider, endpoint } = modelConfig;

  switch (provider) {
    case "openai":
      return await callOpenAI(endpoint, messages, temperature, maxTokens);
    case "anthropic":
      return await callAnthropic(endpoint, messages, temperature, maxTokens);
    case "google":
      return await callGoogle(endpoint, messages, temperature, maxTokens);
    default:
      throw new Error(`Unsupported AI provider: ${provider}`);
  }
}

// Call OpenAI API
async function callOpenAI(endpoint, messages, temperature, maxTokens) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: messages[0].model || "gpt-4o-mini",
        messages: messages,
        temperature: temperature,
        max_tokens: maxTokens,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("OpenAI API error:", data.error);
      throw new Error(`OpenAI API error: ${data.error.message}`);
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw error;
  }
}

// Call Anthropic API (Claude)
async function callAnthropic(endpoint, messages, temperature, maxTokens) {
  try {
    // Convert messages to Anthropic format
    const systemMessage =
      messages.find((m) => m.role === "system")?.content || "";
    const filteredMessages = messages.filter((m) => m.role !== "system");

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "x-api-key": Deno.env.get("ANTHROPIC_API_KEY"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-sonnet-20240229",
        system: systemMessage,
        messages: filteredMessages.map((m) => ({
          role: m.role === "bot" ? "assistant" : m.role,
          content: m.content,
        })),
        temperature: temperature,
        max_tokens: maxTokens,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Anthropic API error:", data.error);
      throw new Error(`Anthropic API error: ${data.error.message}`);
    }

    return data.content[0].text;
  } catch (error) {
    console.error("Error calling Anthropic:", error);
    throw error;
  }
}

// Call Google API (Gemini)
async function callGoogle(endpoint, messages, temperature, maxTokens) {
  try {
    // Convert messages to Google format
    const systemMessage =
      messages.find((m) => m.role === "system")?.content || "";
    const userMessages = messages.filter((m) => m.role !== "system");

    const response = await fetch(
      `${endpoint}?key=${Deno.env.get("GOOGLE_AI_KEY")}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text:
                    systemMessage +
                    "\n\n" +
                    userMessages
                      .map(
                        (m) =>
                          `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`,
                      )
                      .join("\n\n"),
                },
              ],
            },
          ],
          generationConfig: {
            temperature: temperature,
            maxOutputTokens: maxTokens,
          },
        }),
      },
    );

    const data = await response.json();

    if (data.error) {
      console.error("Google AI API error:", data.error);
      throw new Error(`Google AI API error: ${data.error.message}`);
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error calling Google AI:", error);
    throw error;
  }
}
