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
export declare const installPlugin: (
  pluginSlug: string,
  tenantId: string,
) => Promise<{
  success: boolean;
  error?: string;
}>;
/**
 * Execute a plugin and record its impact
 * @param pluginSlug The plugin to execute
 * @param tenantId The tenant ID
 * @param params Additional parameters for execution
 * @returns Execution result
 */
export declare const executePlugin: (
  pluginSlug: string,
  tenantId: string,
  params?: Record<string, any>,
) => Promise<PluginExecutionResult>;
/**
 * Create a campaign from a plugin execution
 * @param pluginSlug The plugin that created the campaign
 * @param tenantId The tenant ID
 * @param campaignData Campaign data
 * @returns The created campaign ID
 */
export declare const createPluginCampaign: (
  pluginSlug: string,
  tenantId: string,
  campaignData: {
    title: string;
    channel?: string;
    summary?: string;
  },
) => Promise<{
  success: boolean;
  campaignId?: string;
  error?: string;
}>;
export {};
