import { supabase } from "@/integrations/supabase/client";
import { Plugin } from "@/types/fixed/Plugin";
import { ExecutiveBot } from "@/types/fixed/ExecutiveBot";
import { AgentTask } from "@/types/fixed/AgentTask";
import { toast } from "sonner";
import { usePlugins } from "@/hooks/usePlugins";

const fetchApi = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  return response.json();
};

export const pluginAgent = new ExecutiveBot(fetchApi);

interface PluginExecutionResult {
  success: boolean;
  value: number;
  message: string;
  error?: any;
}

/**
 * Install a plugin for the current tenant
 * @param pluginSlug The plugin slug to install
 * @param tenantId The tenant ID
 * @returns Success status object
 */
export const installPlugin = async (
  pluginSlug: string,
  tenantId: string,
): Promise<{ success: boolean; error?: string }> => {
  try {
    // First check if plugin exists
    const { data: plugin, error: pluginError } = await supabase
      .from("plugins")
      .select("*")
      .eq("slug", pluginSlug)
      .single();

    if (pluginError) throw pluginError;
    if (!plugin) throw new Error("Plugin not found");

    // Check if already installed
    const { data: existing, error: existingError } = await supabase
      .from("tenant_plugins")
      .select("id")
      .eq("tenant_id", tenantId)
      .eq("plugin_slug", pluginSlug)
      .maybeSingle();

    if (existingError) throw existingError;

    if (existing) {
      // Already installed, update status to active
      await supabase
        .from("tenant_plugins")
        .update({ status: "active" })
        .eq("id", existing.id);

      return { success: true };
    }

    // Insert new plugin record
    const { error: insertError } = await supabase
      .from("tenant_plugins")
      .insert({
        tenant_id: tenantId,
        plugin_slug: pluginSlug,
        status: "active",
      });

    if (insertError) throw insertError;

    // Log the plugin installation
    await fetchApi("/api/plugin-event", {
      method: "POST",
      body: JSON.stringify({
        plugin_name: plugin.name,
        event: "install",
        value: 0,
      }),
      headers: { "Content-Type": "application/json" },
    });

    return { success: true };
  } catch (error) {
    console.error("Error installing plugin:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error installing plugin",
    };
  }
};

/**
 * Execute a plugin and record its impact
 * @param pluginSlug The plugin to execute
 * @param tenantId The tenant ID
 * @param params Additional parameters for execution
 * @returns Execution result
 */
export const executePlugin = async (
  pluginSlug: string,
  tenantId: string,
  params: Record<string, any> = {},
): Promise<PluginExecutionResult> => {
  try {
    // Check if plugin is installed
    const { data: plugin, error: pluginError } = await supabase
      .from("tenant_plugins")
      .select("plugin_slug")
      .eq("tenant_id", tenantId)
      .eq("plugin_slug", pluginSlug)
      .eq("status", "active")
      .maybeSingle();

    if (pluginError) throw pluginError;
    if (!plugin) throw new Error("Plugin is not installed or not active");

    // Get plugin details
    const { data: pluginDetails, error: detailsError } = await supabase
      .from("plugins")
      .select("*")
      .eq("slug", pluginSlug)
      .single();

    if (detailsError) throw detailsError;

    // Execute the plugin by calling its edge function
    // For now, we'll simulate with a random value impact
    const impactValue = Math.floor(Math.random() * 100) + 10;

    // Log the execution
    const { recordPluginEvent } = usePlugins();
    await fetchApi("/api/plugin-event", {
      method: "POST",
      body: JSON.stringify({
        plugin_name: pluginDetails.name,
        event: "execution",
        value: impactValue,
      }),
      headers: { "Content-Type": "application/json" },
    });

    return {
      success: true,
      value: impactValue,
      message: `Plugin ${pluginDetails.name} executed successfully with impact value ${impactValue}`,
    };
  } catch (error) {
    console.error("Error executing plugin:", error);
    return {
      success: false,
      value: 0,
      message: "Plugin execution failed",
      error:
        error instanceof Error
          ? error.message
          : "Unknown error executing plugin",
    };
  }
};

/**
 * Create a campaign from a plugin execution
 * @param pluginSlug The plugin that created the campaign
 * @param tenantId The tenant ID
 * @param campaignData Campaign data
 * @returns The created campaign ID
 */
export const createPluginCampaign = async (
  pluginSlug: string,
  tenantId: string,
  campaignData: {
    title: string;
    channel?: string;
    summary?: string;
  },
): Promise<{ success: boolean; campaignId?: string; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from("campaigns")
      .insert({
        tenant_id: tenantId,
        title: campaignData.title,
        channel: campaignData.channel || "digital",
        summary: campaignData.summary || `Generated by ${pluginSlug} plugin`,
        status: "draft",
        tags: ["plugin-generated", pluginSlug],
      })
      .select("id")
      .single();

    if (error) throw error;

    return {
      success: true,
      campaignId: data.id,
    };
  } catch (error) {
    console.error("Error creating campaign from plugin:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create campaign",
    };
  }
};
