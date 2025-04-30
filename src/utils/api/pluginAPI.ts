
import { fetchApi } from './apiClient';

/**
 * Fetches plugin usage logs for admin review
 */
export const fetchPluginLogs = async () => {
  return await fetchApi('/api/plugin-logs');
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
  return await fetchApi('/api/plugin-event', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};
