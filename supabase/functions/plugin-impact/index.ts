import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Define CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface PluginImpactInput {
  plugin_name: string;
  impact: string;
  value: number;
  tenant_id?: string;
}

interface PluginImpact {
  plugin_name: string;
  usage_count: number;
  avg_value: number;
  total_value: number;
}

serve(async (req: Request) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    const impact: PluginImpact = await req.json();

    if (
      !impact.plugin_name ||
      typeof impact.plugin_name !== "string" ||
      isNaN(impact.usage_count) ||
      isNaN(impact.avg_value) ||
      isNaN(impact.total_value)
    ) {
      return new Response("Missing or invalid fields", { status: 400 });
    }

    // Create a Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get tenant ID from request body or query param
    const { tenantId, tenant_id } = await req.json().catch(() => ({}));
    const finalTenantId = tenantId || tenant_id;

    // Query for plugin impact data
    let query = supabase
      .from("plugin_logs")
      .select(
        `
        plugin_name,
        event,
        value,
        created_at
      `,
      )
      .order("created_at", { ascending: false });

    // Apply tenant filter if provided
    if (finalTenantId) {
      query = query.eq("tenant_id", finalTenantId);
    }

    const { data, error } = await query;

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
          average_value:
            plugin.values.length > 0
              ? plugin.total_value / plugin.values.length
              : 0,
        };
      })
      // Sort by total value descending
      .sort((a, b) => b.total_value - a.total_value);

    // Return the data with CORS headers
    return new Response(JSON.stringify(pluginImpact), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  }
});
