export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  status: number;
}

export interface PluginEventParams {
  pluginId: string;
  eventName: string;
  payload?: Record<string, any>;
}
