var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.36.0";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
// CORS headers for browser requests
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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
        endpoint: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent",
        defaultTemp: 0.7,
        defaultMaxTokens: 1000,
    },
};
// Main function to handle requests
serve((req) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { action, modelName, messages, botName, botRole, debateContext, preferences, } = yield req.json();
        // Set default model if not provided
        const model = modelName || "gpt-4o-mini";
        // Make sure the model is supported
        if (!AI_MODELS[model]) {
            throw new Error(`Unsupported model: ${model}`);
        }
        // Get model config
        const modelConfig = AI_MODELS[model];
        // Track usage for monitoring
        yield trackUsage(supabase, botName, botRole, model);
        switch (action) {
            case "debate":
                return yield handleDebate(req, supabase, modelConfig, botName, botRole, messages, debateContext, preferences);
            case "generate":
            default:
                return yield handleGenerate(req, supabase, modelConfig, botName, botRole, messages, debateContext, preferences);
        }
    }
    catch (error) {
        console.error("Error in multi-model-ai function:", error);
        return new Response(JSON.stringify({
            error: error.message,
            success: false,
        }), {
            status: 500,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
}));
// Track model usage
function trackUsage(supabase, botName, botRole, model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield supabase.from("model_usage").insert({
                bot_name: botName || "unspecified",
                bot_role: botRole || "unspecified",
                model: model,
                timestamp: new Date().toISOString(),
            });
        }
        catch (err) {
            // Just log the error but don't fail the request if tracking fails
            console.error("Error tracking model usage:", err);
        }
    });
}
// Handle debate scenario with multiple agents
function handleDebate(req, supabase, modelConfig, botName, botRole, messages, debateContext, preferences) {
    return __awaiter(this, void 0, void 0, function* () {
        const participants = (debateContext === null || debateContext === void 0 ? void 0 : debateContext.participants) || [];
        const topic = (debateContext === null || debateContext === void 0 ? void 0 : debateContext.topic) || "business strategy";
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
            const response = yield callModel(modelConfig, formattedMessages, (preferences === null || preferences === void 0 ? void 0 : preferences.temperature) || modelConfig.defaultTemp, (preferences === null || preferences === void 0 ? void 0 : preferences.maxTokens) || modelConfig.defaultMaxTokens);
            responses.push({
                participant: participant,
                content: response,
            });
        }
        return new Response(JSON.stringify({
            success: true,
            responses: responses,
        }), { headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }) });
    });
}
// Handle standard generation request
function handleGenerate(req, supabase, modelConfig, botName, botRole, messages, debateContext, preferences) {
    return __awaiter(this, void 0, void 0, function* () {
        // Create a system message based on the bot's role
        const systemMessage = {
            role: "system",
            content: `You are ${botName || "an AI assistant"}, a ${botRole || "helpful assistant"}.
    ${(preferences === null || preferences === void 0 ? void 0 : preferences.detailedResponses) ? "Provide detailed, thorough answers with examples and explanations." : "Be concise and to the point in your responses."}
    ${(preferences === null || preferences === void 0 ? void 0 : preferences.technicalLevel) === "advanced" ? "Use technical terminology appropriate for experts." : "Use simple language that is easy to understand."}
    ${(preferences === null || preferences === void 0 ? void 0 : preferences.showSources) ? "Cite sources and explain your reasoning when possible." : ""}`,
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
        const response = yield callModel(modelConfig, formattedMessages, (preferences === null || preferences === void 0 ? void 0 : preferences.temperature) || modelConfig.defaultTemp, (preferences === null || preferences === void 0 ? void 0 : preferences.maxTokens) || modelConfig.defaultMaxTokens);
        return new Response(JSON.stringify({
            success: true,
            content: response,
            model: modelConfig,
        }), { headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }) });
    });
}
// Call the AI model based on provider
function callModel(modelConfig, messages, temperature, maxTokens) {
    return __awaiter(this, void 0, void 0, function* () {
        const { provider, endpoint } = modelConfig;
        switch (provider) {
            case "openai":
                return yield callOpenAI(endpoint, messages, temperature, maxTokens);
            case "anthropic":
                return yield callAnthropic(endpoint, messages, temperature, maxTokens);
            case "google":
                return yield callGoogle(endpoint, messages, temperature, maxTokens);
            default:
                throw new Error(`Unsupported AI provider: ${provider}`);
        }
    });
}
// Call OpenAI API
function callOpenAI(endpoint, messages, temperature, maxTokens) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(endpoint, {
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
            const data = yield response.json();
            if (data.error) {
                console.error("OpenAI API error:", data.error);
                throw new Error(`OpenAI API error: ${data.error.message}`);
            }
            return data.choices[0].message.content;
        }
        catch (error) {
            console.error("Error calling OpenAI:", error);
            throw error;
        }
    });
}
// Call Anthropic API (Claude)
function callAnthropic(endpoint, messages, temperature, maxTokens) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            // Convert messages to Anthropic format
            const systemMessage = ((_a = messages.find((m) => m.role === "system")) === null || _a === void 0 ? void 0 : _a.content) || "";
            const filteredMessages = messages.filter((m) => m.role !== "system");
            const response = yield fetch(endpoint, {
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
            const data = yield response.json();
            if (data.error) {
                console.error("Anthropic API error:", data.error);
                throw new Error(`Anthropic API error: ${data.error.message}`);
            }
            return data.content[0].text;
        }
        catch (error) {
            console.error("Error calling Anthropic:", error);
            throw error;
        }
    });
}
// Call Google API (Gemini)
function callGoogle(endpoint, messages, temperature, maxTokens) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            // Convert messages to Google format
            const systemMessage = ((_a = messages.find((m) => m.role === "system")) === null || _a === void 0 ? void 0 : _a.content) || "";
            const userMessages = messages.filter((m) => m.role !== "system");
            const response = yield fetch(`${endpoint}?key=${Deno.env.get("GOOGLE_AI_KEY")}`, {
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
                                    text: systemMessage +
                                        "\n\n" +
                                        userMessages
                                            .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
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
            });
            const data = yield response.json();
            if (data.error) {
                console.error("Google AI API error:", data.error);
                throw new Error(`Google AI API error: ${data.error.message}`);
            }
            return data.candidates[0].content.parts[0].text;
        }
        catch (error) {
            console.error("Error calling Google AI:", error);
            throw error;
        }
    });
}
