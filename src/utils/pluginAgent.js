var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "@/integrations/supabase/client";
import { ExecutiveBot } from "@/types/fixed/ExecutiveBot";
import { usePlugins } from "@/hooks/usePlugins";
const fetchApi = (url, options) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(url, options);
    if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
    }
    return response.json();
});
export const pluginAgent = new ExecutiveBot(fetchApi);
/**
 * Install a plugin for the current tenant
 * @param pluginSlug The plugin slug to install
 * @param tenantId The tenant ID
 * @returns Success status object
 */
export const installPlugin = (pluginSlug, tenantId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // First check if plugin exists
        const { data: plugin, error: pluginError } = yield supabase
            .from("plugins")
            .select("*")
            .eq("slug", pluginSlug)
            .single();
        if (pluginError)
            throw pluginError;
        if (!plugin)
            throw new Error("Plugin not found");
        // Check if already installed
        const { data: existing, error: existingError } = yield supabase
            .from("tenant_plugins")
            .select("id")
            .eq("tenant_id", tenantId)
            .eq("plugin_slug", pluginSlug)
            .maybeSingle();
        if (existingError)
            throw existingError;
        if (existing) {
            // Already installed, update status to active
            yield supabase
                .from("tenant_plugins")
                .update({ status: "active" })
                .eq("id", existing.id);
            return { success: true };
        }
        // Insert new plugin record
        const { error: insertError } = yield supabase
            .from("tenant_plugins")
            .insert({
            tenant_id: tenantId,
            plugin_slug: pluginSlug,
            status: "active",
        });
        if (insertError)
            throw insertError;
        // Log the plugin installation
        yield fetchApi("/api/plugin-event", {
            method: "POST",
            body: JSON.stringify({
                plugin_name: plugin.name,
                event: "install",
                value: 0,
            }),
            headers: { "Content-Type": "application/json" },
        });
        return { success: true };
    }
    catch (error) {
        console.error("Error installing plugin:", error);
        return {
            success: false,
            error: error instanceof Error
                ? error.message
                : "Unknown error installing plugin",
        };
    }
});
/**
 * Execute a plugin and record its impact
 * @param pluginSlug The plugin to execute
 * @param tenantId The tenant ID
 * @param params Additional parameters for execution
 * @returns Execution result
 */
export const executePlugin = (pluginSlug_1, tenantId_1, ...args_1) => __awaiter(void 0, [pluginSlug_1, tenantId_1, ...args_1], void 0, function* (pluginSlug, tenantId, params = {}) {
    try {
        // Check if plugin is installed
        const { data: plugin, error: pluginError } = yield supabase
            .from("tenant_plugins")
            .select("plugin_slug")
            .eq("tenant_id", tenantId)
            .eq("plugin_slug", pluginSlug)
            .eq("status", "active")
            .maybeSingle();
        if (pluginError)
            throw pluginError;
        if (!plugin)
            throw new Error("Plugin is not installed or not active");
        // Get plugin details
        const { data: pluginDetails, error: detailsError } = yield supabase
            .from("plugins")
            .select("*")
            .eq("slug", pluginSlug)
            .single();
        if (detailsError)
            throw detailsError;
        // Execute the plugin by calling its edge function
        // For now, we'll simulate with a random value impact
        const impactValue = Math.floor(Math.random() * 100) + 10;
        // Log the execution
        const { recordPluginEvent } = usePlugins();
        yield fetchApi("/api/plugin-event", {
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
    }
    catch (error) {
        console.error("Error executing plugin:", error);
        return {
            success: false,
            value: 0,
            message: "Plugin execution failed",
            error: error instanceof Error
                ? error.message
                : "Unknown error executing plugin",
        };
    }
});
/**
 * Create a campaign from a plugin execution
 * @param pluginSlug The plugin that created the campaign
 * @param tenantId The tenant ID
 * @param campaignData Campaign data
 * @returns The created campaign ID
 */
export const createPluginCampaign = (pluginSlug, tenantId, campaignData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase
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
        if (error)
            throw error;
        return {
            success: true,
            campaignId: data.id,
        };
    }
    catch (error) {
        console.error("Error creating campaign from plugin:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to create campaign",
        };
    }
});
