var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";
import { corsHeaders } from "../_shared/cors.ts";
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "https://tnfqzklfdwknmplrygag.supabase.co";
const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuZnF6a2xmZHdrbm1wbHJ5Z2FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2OTUwNTksImV4cCI6MjA2MDI3MTA1OX0.8s7ol8jfz_6anK4l2aGBXaICDf3lLHmHSPovcXXGQ1A";
const supabase = createClient(supabaseUrl, supabaseKey);
Deno.serve((req) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }
    try {
        const { win_id, user_id, upvote = true, } = yield req.json();
        if (!win_id || !user_id) {
            return new Response(JSON.stringify({ error: "Missing required fields: win_id or user_id" }), {
                headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
                status: 400,
            });
        }
        // First check if a vote already exists for this user and win
        const { data: existingVote, error: fetchError } = yield supabase
            .from("agent_win_votes")
            .select("*")
            .eq("win_id", win_id)
            .eq("user_id", user_id)
            .maybeSingle();
        if (fetchError) {
            throw fetchError;
        }
        let result;
        if (existingVote) {
            // If vote exists but with different value, update it
            if (existingVote.upvote !== upvote) {
                result = yield supabase
                    .from("agent_win_votes")
                    .update({ upvote })
                    .eq("id", existingVote.id);
            }
            else {
                // Vote is the same, so we'll return early
                return new Response(JSON.stringify({ success: true, message: "Vote already recorded" }), {
                    headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
                    status: 200,
                });
            }
        }
        else {
            // No existing vote, insert new one
            result = yield supabase
                .from("agent_win_votes")
                .insert({ win_id, user_id, upvote });
        }
        if (result.error) {
            throw result.error;
        }
        return new Response(JSON.stringify({ success: true, message: "Vote recorded successfully" }), {
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            status: 200,
        });
    }
    catch (error) {
        console.error("Error recording vote:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            status: 500,
        });
    }
}));
