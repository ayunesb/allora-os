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
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
serve((req) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }
    try {
        if (!OPENAI_API_KEY) {
            throw new Error("OPENAI_API_KEY is not configured in Supabase secrets");
        }
        // Create a Supabase client
        const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
        const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { action, topic, participants, messages, userMessage, userId, preferences, context, } = yield req.json();
        switch (action) {
            case "initiate_debate": {
                // Start a new debate with multiple AI executives
                const debateId = crypto.randomUUID();
                // Store the debate in the database
                const { error } = yield supabase.from("debates").insert({
                    id: debateId,
                    user_id: userId,
                    topic,
                    participants: participants.map((p) => ({
                        name: p.name,
                        role: p.role,
                    })),
                    context,
                    status: "active",
                });
                if (error)
                    throw error;
                // Generate the initial system message for the debate
                const systemMessage = `
          This is a multi-executive debate on the topic: ${topic}. 
          Business context: ${JSON.stringify(context)}.
          
          Each executive should provide their perspective based on their specific role and expertise.
          The goal is to collaboratively reach the best strategic decision through respectful disagreement and synthesis.
        `;
                // Store the initial message
                yield supabase.from("debate_messages").insert({
                    debate_id: debateId,
                    sender: "system",
                    content: systemMessage,
                    sequence: 0,
                });
                return new Response(JSON.stringify({
                    debateId,
                    status: "initiated",
                }), {
                    headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
                });
            }
            case "add_user_message": {
                // Add a user message to the debate
                const { debateId, message } = userMessage;
                // Get the current sequence number
                const { data, error } = yield supabase
                    .from("debate_messages")
                    .select("sequence")
                    .eq("debate_id", debateId)
                    .order("sequence", { ascending: false })
                    .limit(1);
                if (error)
                    throw error;
                const nextSequence = data && data.length > 0 ? data[0].sequence + 1 : 0;
                // Store the user message
                yield supabase.from("debate_messages").insert({
                    debate_id: debateId,
                    sender: "user",
                    content: message,
                    sequence: nextSequence,
                });
                return new Response(JSON.stringify({
                    status: "message_added",
                    sequence: nextSequence,
                }), {
                    headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
                });
            }
            case "generate_executive_responses": {
                // Generate responses from all participating executives
                const { debateId } = userMessage;
                // Get debate details
                const { data: debateData, error: debateError } = yield supabase
                    .from("debates")
                    .select("*")
                    .eq("id", debateId)
                    .single();
                if (debateError)
                    throw debateError;
                // Get all messages so far
                const { data: messageData, error: messageError } = yield supabase
                    .from("debate_messages")
                    .select("*")
                    .eq("debate_id", debateId)
                    .order("sequence", { ascending: true });
                if (messageError)
                    throw messageError;
                // Format messages for OpenAI
                const formattedMessages = messageData.map((msg) => ({
                    role: msg.sender === "system"
                        ? "system"
                        : msg.sender === "user"
                            ? "user"
                            : "assistant",
                    content: msg.content,
                    name: msg.sender !== "system" && msg.sender !== "user"
                        ? msg.sender.replace(/\s+/g, "_").toLowerCase()
                        : undefined,
                }));
                // Generate a response from each executive
                const executives = debateData.participants;
                const responses = [];
                for (const exec of executives) {
                    // Get the last sequence number
                    const lastSequence = messageData.length > 0
                        ? messageData[messageData.length - 1].sequence
                        : -1;
                    // Create a special system message for this executive
                    const execSystemMessage = {
                        role: "system",
                        content: `You are ${exec.name}, a ${exec.role} executive in a multi-agent debate.
            Topic: ${debateData.topic}
            Your perspective should be based on your role as ${exec.role}.
            Consider what other executives have said so far, and add your unique perspective.
            Be concise but insightful. You may politely disagree with others if appropriate based on your role.`,
                    };
                    // Create the messages array for this executive
                    const execMessages = [
                        execSystemMessage,
                        ...formattedMessages.filter((msg) => msg.role !== "system"),
                    ];
                    // Call OpenAI
                    const openAIResponse = yield fetch("https://api.openai.com/v1/chat/completions", {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${OPENAI_API_KEY}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            model: "gpt-4o-mini",
                            messages: execMessages,
                            temperature: 0.7,
                            max_tokens: 300,
                        }),
                    });
                    const data = yield openAIResponse.json();
                    if (data.error) {
                        console.error(`Error generating response for ${exec.name}:`, data.error);
                        continue;
                    }
                    const responseContent = data.choices[0].message.content;
                    // Store the executive's response
                    const { error: insertError } = yield supabase
                        .from("debate_messages")
                        .insert({
                        debate_id: debateId,
                        sender: exec.name,
                        sender_role: exec.role,
                        content: responseContent,
                        sequence: lastSequence + 1 + responses.length + 1,
                    });
                    if (insertError) {
                        console.error(`Error storing response for ${exec.name}:`, insertError);
                        continue;
                    }
                    responses.push({
                        executive: exec,
                        content: responseContent,
                        sequence: lastSequence + 1 + responses.length,
                    });
                }
                return new Response(JSON.stringify({
                    status: "responses_generated",
                    responses,
                }), {
                    headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
                });
            }
            case "generate_debate_summary": {
                // Generate a summary of the debate
                const { debateId } = userMessage;
                // Get all messages from the debate
                const { data: messageData, error: messageError } = yield supabase
                    .from("debate_messages")
                    .select("*")
                    .eq("debate_id", debateId)
                    .order("sequence", { ascending: true });
                if (messageError)
                    throw messageError;
                // Format the debate for the summary
                const debateText = messageData
                    .map((msg) => `${msg.sender}${msg.sender_role ? ` (${msg.sender_role})` : ""}: ${msg.content}`)
                    .join("\n\n");
                // Call OpenAI to generate a summary
                const openAIResponse = yield fetch("https://api.openai.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${OPENAI_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        model: "gpt-4o-mini",
                        messages: [
                            {
                                role: "system",
                                content: `You are an expert business analyst. Summarize the following executive debate and extract:
                1. Key points made by each executive
                2. Areas of agreement and disagreement
                3. Final recommendations
                4. Next steps
                
                Format your response as a structured summary with these sections.`,
                            },
                            {
                                role: "user",
                                content: debateText,
                            },
                        ],
                        temperature: 0.3,
                        max_tokens: 1000,
                    }),
                });
                const data = yield openAIResponse.json();
                if (data.error) {
                    throw new Error(`Error generating summary: ${data.error.message}`);
                }
                const summaryContent = data.choices[0].message.content;
                // Store the summary
                yield supabase.from("debate_summaries").insert({
                    debate_id: debateId,
                    content: summaryContent,
                    created_at: new Date().toISOString(),
                });
                // Update the debate status
                yield supabase
                    .from("debates")
                    .update({ status: "completed" })
                    .eq("id", debateId);
                return new Response(JSON.stringify({
                    status: "summary_generated",
                    summary: summaryContent,
                }), {
                    headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
                });
            }
            default:
                throw new Error(`Unknown action: ${action}`);
        }
    }
    catch (error) {
        console.error("Error in debate function:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
}));
