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
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// Define CORS headers
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
// Helper function to log errors to audit_logs
function logError(supabase, error) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield supabase.from("audit_logs").insert({
                action: "kpi_cron_job",
                result: "error",
                details: {
                    error: error.message,
                    stack: error.stack,
                },
            });
        }
        catch (logError) {
            console.error("Error logging to audit_logs:", logError);
        }
    });
}
// Helper function to send Slack alert
function sendSlackAlert(message) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const webhookUrl = Deno.env.get("SLACK_WEBHOOK_URL");
            if (!webhookUrl)
                return;
            yield fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text: `🔔 KPI CRON Alert: ${message}`,
                }),
            });
        }
        catch (error) {
            console.error("Error sending Slack alert:", error);
        }
    });
}
serve((req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    // Handle CORS preflight request
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }
    try {
        // Create a Supabase client
        const supabaseUrl = (_a = Deno.env.get("SUPABASE_URL")) !== null && _a !== void 0 ? _a : "";
        const supabaseKey = (_b = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")) !== null && _b !== void 0 ? _b : "";
        const supabase = createClient(supabaseUrl, supabaseKey);
        // Get all active tenants
        const { data: tenants, error: tenantError } = yield supabase
            .from("tenants")
            .select("id, name");
        if (tenantError)
            throw tenantError;
        // Initialize KPI tracking metrics
        const results = {
            success_count: 0,
            error_count: 0,
            tenants_processed: [],
            errors: [],
        };
        // Process each tenant
        for (const tenant of tenants) {
            try {
                // Calculate KPIs for this tenant
                const tenantMetrics = yield calculateTenantKPIs(supabase, tenant.id);
                // Store the calculated KPI metrics
                for (const [type, value] of Object.entries(tenantMetrics)) {
                    const { error } = yield supabase.from("kpi_metrics").insert({
                        tenant_id: tenant.id,
                        type,
                        value,
                        recorded_at: new Date().toISOString(),
                    });
                    if (error)
                        throw error;
                }
                results.success_count++;
                results.tenants_processed.push({
                    tenant_id: tenant.id,
                    tenant_name: tenant.name,
                    metrics: Object.keys(tenantMetrics),
                });
            }
            catch (error) {
                console.error(`Error processing tenant ${tenant.id}:`, error);
                results.error_count++;
                results.errors.push({
                    tenant_id: tenant.id,
                    tenant_name: tenant.name,
                    error: error.message,
                });
                yield logError(supabase, error);
            }
        }
        // Log completion to audit_logs
        yield supabase.from("audit_logs").insert({
            action: "kpi_cron_job",
            result: results.error_count === 0 ? "success" : "partial",
            details: results,
        });
        // Send alert if there were errors
        if (results.error_count > 0) {
            yield sendSlackAlert(`KPI CRON completed with ${results.error_count} errors out of ${tenants.length} tenants`);
        }
        // Return success response
        return new Response(JSON.stringify({
            success: true,
            results,
        }), {
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
    catch (error) {
        console.error("Error in KPI CRON job:", error);
        // Create a Supabase client for error logging
        try {
            const supabaseUrl = (_c = Deno.env.get("SUPABASE_URL")) !== null && _c !== void 0 ? _c : "";
            const supabaseKey = (_d = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")) !== null && _d !== void 0 ? _d : "";
            const supabase = createClient(supabaseUrl, supabaseKey);
            yield logError(supabase, error);
            yield sendSlackAlert(`KPI CRON job failed: ${error.message}`);
        }
        catch (logError) {
            console.error("Error logging failure:", logError);
        }
        return new Response(JSON.stringify({
            success: false,
            error: error.message,
        }), {
            status: 500,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
}));
// Calculate KPIs for a tenant
function calculateTenantKPIs(supabase, tenantId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Get strategies
        const { data: strategies } = yield supabase
            .from("strategies")
            .select("id, status")
            .eq("tenant_id", tenantId);
        // Get campaigns
        const { data: campaigns } = yield supabase
            .from("campaigns")
            .select("id, status, roi")
            .eq("tenant_id", tenantId);
        // Get plugin logs
        const { data: pluginLogs } = yield supabase
            .from("plugin_logs")
            .select("value")
            .eq("tenant_id", tenantId)
            .eq("event", "execution");
        // Calculate metrics
        const activeStrategies = (strategies === null || strategies === void 0 ? void 0 : strategies.filter((s) => s.status === "active").length) || 0;
        const totalROI = (campaigns === null || campaigns === void 0 ? void 0 : campaigns.reduce((sum, campaign) => sum + (campaign.roi || 0), 0)) || 0;
        const pluginROI = (pluginLogs === null || pluginLogs === void 0 ? void 0 : pluginLogs.reduce((sum, log) => sum + (log.value || 0), 0)) || 0;
        return {
            active_strategies: activeStrategies,
            total_roi: totalROI,
            plugin_roi: pluginROI,
            campaign_count: (campaigns === null || campaigns === void 0 ? void 0 : campaigns.length) || 0,
            strategy_count: (strategies === null || strategies === void 0 ? void 0 : strategies.length) || 0,
        };
    });
}
