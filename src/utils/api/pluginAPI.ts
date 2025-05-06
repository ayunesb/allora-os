import { fetchApi } from "./apiClient";

/**
 * Fetches plugin usage logs for admin review
 */
export const fetchPluginLogs = async () => {
  const response = await fetchApi("/api/admin/plugin-logs");
  return response;
};

/**
 * Records a new plugin usage event with an associated value
 */
export const recordPluginEvent = async (params: {
  plugin_name: string;
  event: string;
  tenant_id: string;
  value: number;
}) => {
  const requestBody = JSON.stringify(params);
  return await fetchApi(
    "/api/plugin-event",
    JSON.stringify({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: requestBody,
    }),
  );
};

/**
 * Fetches aggregated plugin impact data showing ROI per tenant
 */
export const fetchPluginImpact = async () => {
  const response = await fetchApi("/api/plugin/impact");
  return response;
};
