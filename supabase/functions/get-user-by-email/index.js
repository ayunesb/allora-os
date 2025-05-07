var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
serve((req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response(null, {
            headers: corsHeaders,
            status: 204,
        });
    }
    try {
        const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
        const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
        if (!supabaseUrl || !supabaseServiceKey) {
            throw new Error("Missing Supabase environment variables");
        }
        // Create a Supabase client with the service role key for admin privileges
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        // Get email from query string
        const url = new URL(req.url);
        const email = url.searchParams.get("email");
        if (!email) {
            throw new Error("Email parameter is required");
        }
        // Admin API call to get user by email
        const { data, error } = yield supabase.auth.admin.getUserByEmail(email);
        if (error) {
            throw error;
        }
        return new Response(JSON.stringify({
            success: true,
            userId: ((_a = data.user) === null || _a === void 0 ? void 0 : _a.id) || null,
        }), {
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            status: 200,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return new Response(JSON.stringify({
            success: false,
            error: errorMessage,
        }), {
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            status: 400,
        });
    }
}));
