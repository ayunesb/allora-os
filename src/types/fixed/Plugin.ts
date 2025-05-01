
/**
 * Plugin type definitions for Allora AI
 */

export interface Plugin {
  id: string;
  name: string;
  slug: string;
  description?: string;
  tags?: string[];
  integration_url?: string;
  created_at?: string;
}

export interface PluginLog {
  id: string;
  tenant_id: string;
  plugin_name: string;
  event: string;
  value: number;
  created_at: string;
}

export interface PluginImpactData {
  tenant_id: string;
  plugin_name: string;
  total_value: number;
  usage_count: number;
  average_value: number;
  tenant_name?: string;
}

export interface PluginConfig {
  id: string;
  tenant_id: string;
  plugin_slug: string;
  config: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}
