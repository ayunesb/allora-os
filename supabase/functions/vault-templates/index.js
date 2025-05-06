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
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
// Initialize the Supabase client
const adminClient = createClient(supabaseUrl, supabaseServiceKey);
const supabase = createClient(supabaseUrl, supabaseAnonKey);
/**
 * Get all strategy template drafts
 */
function getDrafts(req) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            // Check if user is admin
            const token = ((_a = req.headers.get("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "")) || "";
            const { data: { user }, error: userError, } = yield supabase.auth.getUser(token);
            if (userError || !user) {
                return { error: "Unauthorized", status: 401 };
            }
            // Verify the user is an admin
            const { data: profile, error: profileError } = yield adminClient
                .from("profiles")
                .select("role")
                .eq("id", user.id)
                .single();
            if (profileError || (profile === null || profile === void 0 ? void 0 : profile.role) !== "admin") {
                return { error: "Forbidden", status: 403 };
            }
            // Get strategy templates
            const { data, error } = yield adminClient
                .from("strategy_templates")
                .select("*")
                .order("created_at", { ascending: false });
            if (error) {
                console.error("Error fetching template drafts:", error);
                return { error: "Failed to fetch templates", status: 500 };
            }
            return { data, status: 200 };
        }
        catch (err) {
            console.error("Error in getDrafts:", err);
            return { error: "Internal server error", status: 500 };
        }
    });
}
/**
 * Publish a strategy template
 */
function publishTemplate(req) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const url = new URL(req.url);
            const id = url.searchParams.get("id");
            if (!id) {
                return { error: "Missing template ID", status: 400 };
            }
            // Check if user is admin
            const token = ((_a = req.headers.get("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "")) || "";
            const { data: { user }, error: userError, } = yield supabase.auth.getUser(token);
            if (userError || !user) {
                return { error: "Unauthorized", status: 401 };
            }
            // Verify the user is an admin
            const { data: profile, error: profileError } = yield adminClient
                .from("profiles")
                .select("role")
                .eq("id", user.id)
                .single();
            if (profileError || (profile === null || profile === void 0 ? void 0 : profile.role) !== "admin") {
                return { error: "Forbidden", status: 403 };
            }
            // Update the template
            const { data, error } = yield adminClient
                .from("strategy_templates")
                .update({ is_public: true })
                .eq("id", id)
                .select()
                .single();
            if (error) {
                console.error("Error publishing template:", error);
                return { error: "Failed to publish template", status: 500 };
            }
            return { data, status: 200 };
        }
        catch (err) {
            console.error("Error in publishTemplate:", err);
            return { error: "Internal server error", status: 500 };
        }
    });
}
Deno.serve((req) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }
    try {
        const url = new URL(req.url);
        const path = url.pathname.split("/").pop();
        if (req.method === "GET" && path === "drafts") {
            const result = yield getDrafts(req);
            return new Response(JSON.stringify(result.data || { error: result.error }), {
                status: result.status,
                headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            });
        }
        if (req.method === "POST" && path === "publish") {
            const result = yield publishTemplate(req);
            return new Response(JSON.stringify(result.data || { error: result.error }), {
                status: result.status,
                headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            });
        }
        return new Response(JSON.stringify({ error: "Not found" }), {
            status: 404,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
    catch (error) {
        console.error("Unexpected error:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
}));
