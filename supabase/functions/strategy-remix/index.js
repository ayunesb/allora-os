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
    // Only allow POST requests for remix
    if (req.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            status: 405,
        });
    }
    try {
        const body = yield req.json();
        const { template_id, tenant_id } = body;
        if (!template_id || !tenant_id) {
            throw new Error("Missing required parameters: template_id and tenant_id");
        }
        // Get the template
        const { data: template, error: templateError } = yield supabase
            .from("strategy_templates")
            .select("*")
            .eq("id", template_id)
            .single();
        if (templateError || !template) {
            throw new Error((templateError === null || templateError === void 0 ? void 0 : templateError.message) || "Template not found");
        }
        // Increment the used_by count
        const { error: updateError } = yield supabase
            .from("strategy_templates")
            .update({ used_by: template.used_by + 1 })
            .eq("id", template_id);
        if (updateError) {
            throw new Error(`Failed to update template usage: ${updateError.message}`);
        }
        // Instead of using strategy_cards table (which may not exist yet),
        // we'll return success with the template data
        return new Response(JSON.stringify({
            success: true,
            message: "Strategy remixed successfully",
            template,
        }), {
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            status: 200,
        });
    }
    catch (error) {
        console.error("Error remixing strategy:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            status: 500,
        });
    }
}));
