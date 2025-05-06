import { showToast } from "./toast";

export const toastService = {
  success: (message: string) => showToast(`Success: ${message}`),
  error: (message: string) => showToast(`Error: ${message}`),
  info: (message: string) => showToast(`Info: ${message}`),
  warning: (message: string) => showToast(`Warning: ${message}`),
  default: (message: string) => showToast(message),
};

export const triggerToast = (message: string) => {
  // TODO: Implement triggerToast function
};

interface Plugin {
  id: number;
  executeHandler: (
    context: any,
  ) => Promise<{ metricType: string; value: number }>;
}

function loadPluginsByStrategy(strategy_id: string): Promise<Plugin[]> {
  // Mock implementation: Replace with actual logic to load plugins
  return Promise.resolve([
    {
      id: 1,
      executeHandler: async (context: any) => ({
        metricType: "exampleMetric",
        value: 100,
      }),
    },
  ]);
}

function persistKpiMetrics(arg0: {
  plugin_id: number;
  campaign_id: number;
  metric_type: string;
  value: number;
}) {
  throw new Error("Function not implemented.");
}

function appendPluginLog(arg0: {
  plugin_id: number;
  campaign_id: number;
  timestamp: Date;
  output: any;
}) {
  throw new Error("Function not implemented.");
}

function appendAdminLog(arg0: {
  context: string;
  campaign_id: number;
  summary: string;
}) {
  throw new Error("Function not implemented.");
}
