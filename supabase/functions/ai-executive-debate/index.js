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
        const { topic, companyContext, executives } = yield req.json();
        // Generate a debate between executives on the given topic
        const response = yield fetch("https://api.openai.com/v1/chat/completions", {
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
                        content: `You are simulating a debate between business executives on the topic: "${topic}". Each executive has their own perspective based on their expertise.
            
            The executives participating are:
            ${executives.map((exec) => `- ${exec.name} (${exec.role})`).join("\n")}
            
            Company context: ${companyContext}
            
            Format your response as a structured debate with:
            1. Introduction of the topic
            2. Each executive's key arguments
            3. Points of disagreement and consensus
            4. A summary of practical recommendations
            
            Make the debate realistic, reflecting each executive's known expertise and speaking style.`,
                    },
                    {
                        role: "user",
                        content: `Generate a strategic debate between the executives on: "${topic}"`,
                    },
                ],
                temperature: 0.7,
                max_tokens: 1500,
            }),
        });
        const data = yield response.json();
        if (data.error) {
            throw new Error(`OpenAI API error: ${data.error.message}`);
        }
        const debateContent = data.choices[0].message.content;
        // Store debate in Supabase
        const { error: insertError } = yield supabase
            .from("ai_executive_debates")
            .insert({
            topic,
            company_context: companyContext,
            executives: executives,
            content: debateContent,
            created_at: new Date().toISOString(),
        });
        if (insertError) {
            console.error("Error storing debate:", insertError);
        }
        return new Response(JSON.stringify({
            success: true,
            debate: {
                topic,
                content: debateContent,
                executives: executives,
            },
        }), {
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
    catch (error) {
        console.error("Error in AI executive debate function:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
}));
