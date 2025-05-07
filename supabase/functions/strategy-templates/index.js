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
        const { data, error } = yield supabase
            .from("strategy_templates")
            .select("*")
            .order("is_public", { ascending: false }) // Sort public templates first
            .order("used_by", { ascending: false }); // Then by usage
        if (error)
            throw error;
        return new Response(JSON.stringify(data), {
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            status: 200,
        });
    }
    catch (error) {
        console.error("Error fetching strategy templates:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            status: 500,
        });
    }
}));
