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
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
};
serve((req) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle CORS
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }
    try {
        // Get the authorization header
        const authHeader = req.headers.get("Authorization");
        if (!authHeader) {
            return new Response(JSON.stringify({ error: "No authorization header" }), {
                status: 401,
                headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            });
        }
        // Initialize supabase client with the user's JWT
        const supabaseClient = createClient(Deno.env.get("SUPABASE_URL") || "", Deno.env.get("SUPABASE_ANON_KEY") || "", {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
                detectSessionInUrl: false,
            },
            global: {
                headers: {
                    Authorization: authHeader,
                },
            },
        });
        // Initialize admin client (with service role key)
        const adminClient = createClient(Deno.env.get("SUPABASE_URL") || "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "", {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
                detectSessionInUrl: false,
            },
        });
        // Get the current user from the auth header
        const { data: { user }, error: authError, } = yield supabaseClient.auth.getUser();
        if (authError || !user) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
                headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            });
        }
        const userId = user.id;
        console.log(`Starting account deletion process for user: ${userId}`);
        // 1. Delete user's profile data
        const { error: profileError } = yield supabaseClient
            .from("profiles")
            .delete()
            .eq("id", userId);
        if (profileError) {
            console.error("Error deleting profile:", profileError);
            // Continue with other deletions even if this fails
        }
        // 2. Delete user's preferences if they exist
        const { error: preferencesError } = yield supabaseClient
            .from("user_preferences")
            .delete()
            .eq("user_id", userId);
        if (preferencesError) {
            console.error("Error deleting user preferences:", preferencesError);
            // Continue with other deletions even if this fails
        }
        // 3. Delete user's actions/activity logs
        const { error: actionsError } = yield supabaseClient
            .from("user_actions")
            .delete()
            .eq("user_id", userId);
        if (actionsError) {
            console.error("Error deleting user actions:", actionsError);
            // Continue with other deletions even if this fails
        }
        // 4. Get the user's company info to clean up company data if they're the owner (admin)
        const { data: profileData } = yield supabaseClient
            .from("profiles")
            .select("company_id, role")
            .eq("id", userId)
            .single();
        // If user is an admin and has a company, check if they're the last admin
        if ((profileData === null || profileData === void 0 ? void 0 : profileData.company_id) && profileData.role === "admin") {
            const { data: companyAdmins } = yield supabaseClient
                .from("profiles")
                .select("id")
                .eq("company_id", profileData.company_id)
                .eq("role", "admin");
            // If this is the only admin, delete company and all company data
            if (!companyAdmins || companyAdmins.length <= 1) {
                console.log("User is the last admin of company. Deleting company data:", profileData.company_id);
                // Delete company integrations
                const { error: integrationsError } = yield supabaseClient
                    .from("company_integrations")
                    .delete()
                    .eq("company_id", profileData.company_id);
                if (integrationsError) {
                    console.error("Error deleting company integrations:", integrationsError);
                }
                // Delete company strategies
                const { error: strategiesError } = yield supabaseClient
                    .from("strategies")
                    .delete()
                    .eq("company_id", profileData.company_id);
                if (strategiesError) {
                    console.error("Error deleting company strategies:", strategiesError);
                }
                // Delete company campaigns
                const { error: campaignsError } = yield supabaseClient
                    .from("campaigns")
                    .delete()
                    .eq("company_id", profileData.company_id);
                if (campaignsError) {
                    console.error("Error deleting company campaigns:", campaignsError);
                }
                // Finally delete the company itself
                const { error: companyError } = yield supabaseClient
                    .from("companies")
                    .delete()
                    .eq("id", profileData.company_id);
                if (companyError) {
                    console.error("Error deleting company:", companyError);
                }
            }
        }
        // 5. Finally, delete the user account itself (using admin powers)
        const { error: deleteUserError } = yield adminClient.auth.admin.deleteUser(userId);
        if (deleteUserError) {
            console.error("Error deleting user account:", deleteUserError);
            // Return partial success
            return new Response(JSON.stringify({
                success: true,
                partial: true,
                error: "Your account data has been deleted, but you'll need to contact support to fully remove your authentication record.",
            }), {
                headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            });
        }
        console.log("Account deletion completed successfully");
        return new Response(JSON.stringify({ success: true }), {
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
    catch (error) {
        console.error("Error during account deletion:", error.message);
        return new Response(JSON.stringify({
            success: false,
            error: error.message || "An unexpected error occurred",
        }), {
            status: 500,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
}));
