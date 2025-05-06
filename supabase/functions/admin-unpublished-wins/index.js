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
        // Check if this is a GET or POST request
        if (req.method === "GET") {
            // Fetch all unpublished wins
            const { data, error } = yield supabase
                .from("agent_win_logs")
                .select("id, agent_id, description, xp, created_at, is_published")
                .eq("is_published", false)
                .order("created_at", { ascending: false });
            if (error)
                throw error;
            return new Response(JSON.stringify(data), {
                headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
                status: 200,
            });
        }
        else if (req.method === "POST") {
            // Get the win ID from the request body
            const { id } = yield req.json();
            if (!id) {
                return new Response(JSON.stringify({ error: "Missing win ID" }), {
                    headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
                    status: 400,
                });
            }
            // Update the win to published status
            const { error } = yield supabase
                .from("agent_win_logs")
                .update({ is_published: true })
                .eq("id", id);
            if (error)
                throw error;
            return new Response(JSON.stringify({
                success: true,
                message: "Win published successfully",
            }), {
                headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
                status: 200,
            });
        }
        else {
            return new Response(JSON.stringify({ error: "Method not allowed" }), {
                headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
                status: 405,
            });
        }
    }
    catch (error) {
        console.error("Error processing request:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            status: 500,
        });
    }
}));
