var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createClient } from "@supabase/supabase-js";
import { sendSlackAlert } from "./slack.ts";
// Get environment variables
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const demoTenantId = Deno.env.get("DEMO_TENANT_ID");
// Only create Supabase client when needed
const getSupabaseClient = () => {
    return createClient(supabaseUrl, supabaseServiceKey);
};
Deno.serve((req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check for scheduled cron job header or proper authorization
        const isCronRequest = req.headers.get("Authorization") ===
            `Bearer ${Deno.env.get("CRON_SECRET")}`;
        if (!req.method === "POST" && !isCronRequest) {
            return new Response("Method not allowed", { status: 405 });
        }
        if (!demoTenantId) {
            yield sendSlackAlert("No demo tenant ID set in environment variables", "warning");
            return new Response(JSON.stringify({ error: "No demo tenant ID configured" }), { status: 400, headers: { "Content-Type": "application/json" } });
        }
        // Initialize the Supabase client inside the handler
        const supabase = getSupabaseClient();
        // Begin reset process
        yield sendSlackAlert(`Starting reset of demo tenant: ${demoTenantId}`, "info");
        // Reset all user-generated content
        const tables = [
            "campaigns",
            "strategies",
            "leads",
            "plugin_logs",
            "kpi_metrics",
            "messages",
            "social_media_posts",
            "executive_messages",
            "webhook_events",
        ];
        // Process each table
        for (const table of tables) {
            const { error } = yield supabase
                .from(table)
                .delete()
                .eq("tenant_id", demoTenantId);
            if (error) {
                yield sendSlackAlert(`Failed to reset table ${table}: ${error.message}`, "error");
                throw error;
            }
        }
        // Reset tenant-specific settings back to defaults
        const { error: updateError } = yield supabase
            .from("tenant_profiles")
            .update({
            settings: {
                demo_reset_count: Number(Deno.env.get("demo_reset_count") || 0) + 1,
                last_reset: new Date().toISOString(),
            },
            updated_at: new Date().toISOString(),
        })
            .eq("id", demoTenantId);
        if (updateError) {
            yield sendSlackAlert(`Failed to update tenant profile: ${updateError.message}`, "error");
        }
        yield sendSlackAlert(`Demo tenant ${demoTenantId} reset complete`, "info");
        return new Response(JSON.stringify({ success: true, message: "Demo tenant reset complete" }), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    catch (error) {
        yield sendSlackAlert(`Demo tenant reset failed: ${error.message}`, "error");
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500, headers: { "Content-Type": "application/json" } });
    }
}));
