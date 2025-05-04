import { fetchApi } from './apiClient';
/**
 * Fetches plugin usage logs for admin review
 */
export const fetchPluginLogs = async () => {
    return await fetchApi('/api/admin/plugin-logs');
};
/**
 * Records a new plugin usage event with an associated value
 */
export const recordPluginEvent = async (params) => {
    return await fetchApi('/api/plugin-event', {
        method: 'POST',
        body: JSON.stringify(params)
    });
};
/**
 * Fetches aggregated plugin impact data showing ROI per tenant
 */
export const fetchPluginImpact = async () => {
    return await fetchApi('/api/plugin/impact');
};
