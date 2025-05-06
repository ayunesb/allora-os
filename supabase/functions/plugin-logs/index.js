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
// Initialize the Supabase client with the service role key (admin privileges)
const supabase = createClient(supabaseUrl, supabaseServiceKey);
Deno.serve((req) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }
    try {
        // Only allow GET requests
        if (req.method !== "GET") {
            return new Response(JSON.stringify({
                error: "Method not allowed",
            }), {
                status: 405,
                headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            });
        }
        // Verify the request is from an admin user
        const authHeader = req.headers.get("Authorization");
        if (!authHeader) {
            return new Response(JSON.stringify({
                error: "Unauthorized",
            }), {
                status: 401,
                headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            });
        }
        const token = authHeader.replace("Bearer ", "");
        const { data: { user }, error: userError, } = yield supabase.auth.getUser(token);
        if (userError || !user) {
            return new Response(JSON.stringify({
                error: "Unauthorized",
            }), {
                status: 401,
                headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            });
        }
        // Verify the user is an admin
        const { data: profile, error: profileError } = yield supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();
        if (profileError || (profile === null || profile === void 0 ? void 0 : profile.role) !== "admin") {
            return new Response(JSON.stringify({
                error: "Forbidden",
            }), {
                status: 403,
                headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            });
        }
        // Get plugin logs
        const { data, error } = yield supabase
            .from("plugin_logs")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(100);
        if (error) {
            console.error("Error fetching plugin logs:", error);
            return new Response(JSON.stringify({
                error: "Failed to fetch plugin logs",
            }), {
                status: 500,
                headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            });
        }
        return new Response(JSON.stringify(data), {
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
    catch (error) {
        console.error("Unexpected error:", error);
        return new Response(JSON.stringify({
            error: "Internal server error",
        }), {
            status: 500,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
}));
