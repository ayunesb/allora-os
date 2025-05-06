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
serve((req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // Handle CORS preflight request
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }
    try {
        // Create a Supabase client
        const supabaseUrl = (_a = Deno.env.get("SUPABASE_URL")) !== null && _a !== void 0 ? _a : "";
        const supabaseKey = (_b = Deno.env.get("SUPABASE_ANON_KEY")) !== null && _b !== void 0 ? _b : "";
        const supabase = createClient(supabaseUrl, supabaseKey);
        // Get tenant ID from request body or query param
        const { tenantId, tenant_id } = yield req.json().catch(() => ({}));
        const finalTenantId = tenantId || tenant_id;
        // Query for plugin impact data
        let query = supabase
            .from("plugin_logs")
            .select(`
        plugin_name,
        event,
        value,
        created_at
      `)
            .order("created_at", { ascending: false });
        // Apply tenant filter if provided
        if (finalTenantId) {
            query = query.eq("tenant_id", finalTenantId);
        }
        const { data, error } = yield query;
        if (error) {
            throw error;
        }
        // Process the data to calculate impact metrics
        const pluginsMap = new Map();
        data.forEach((log) => {
            const { plugin_name, event, value } = log;
            if (!pluginsMap.has(plugin_name)) {
                pluginsMap.set(plugin_name, {
                    plugin_name,
                    usage_count: 0,
                    total_value: 0,
                    values: [],
                });
            }
            const plugin = pluginsMap.get(plugin_name);
            if (event === "execution") {
                plugin.usage_count++;
                plugin.total_value += value;
                plugin.values.push(value);
            }
        });
        // Convert map to array and calculate averages
        const pluginImpact = Array.from(pluginsMap.values())
            .map((plugin) => {
            return {
                plugin_name: plugin.plugin_name,
                usage_count: plugin.usage_count,
                total_value: plugin.total_value,
                average_value: plugin.values.length > 0
                    ? plugin.total_value / plugin.values.length
                    : 0,
            };
        })
            // Sort by total value descending
            .sort((a, b) => b.total_value - a.total_value);
        // Return the data with CORS headers
        return new Response(JSON.stringify(pluginImpact), {
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
    catch (error) {
        // Handle errors
        console.error("Error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
}));
