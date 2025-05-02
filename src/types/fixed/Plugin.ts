
/**
 * Plugin type definition
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

/**
 * Plugin configuration type
 */
export interface PluginConfig {
  id: string;
  tenant_id: string;
  plugin_slug: string;
  config: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

/**
 * Plugin execution result
 */
export interface PluginExecutionResult {
  success: boolean;
  value: number;
  message: string;
  error?: any;
}

/**
 * Plugin impact data
 */
export interface PluginImpactData {
  plugin_name: string;
  usage_count: number;
  average_value: number;
  total_value: number;
}

/**
 * Plugin log entry
 */
export interface PluginLog {
  id: string;
  plugin_id: string;
  tenant_id: string;
  user_id?: string;
  event_type: 'installed' | 'executed' | 'error' | 'uninstalled';
  metadata?: Record<string, any>;
  timestamp: string;
  success?: boolean;
}
