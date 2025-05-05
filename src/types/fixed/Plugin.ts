/**
 * Plugin type definition
 */
export type Plugin = {
  id: string;
  slug: string;
  name: string;
  description: string;
  version: string;
  tags: string[];
};

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
  value?: number;
  plugin_name?: string;
  created_at?: string;
}

/**
 * Plugin analytics data
 */
export interface PluginAnalytics {
  total_executions: number;
  success_rate: number;
  average_value: number;
  total_value: number;
  execution_history: PluginLog[];
}
