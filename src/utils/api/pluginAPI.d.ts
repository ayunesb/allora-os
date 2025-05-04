/**
 * Fetches plugin usage logs for admin review
 */
export declare const fetchPluginLogs: () => Promise<unknown>;
/**
 * Records a new plugin usage event with an associated value
 */
export declare const recordPluginEvent: (params: {
    plugin_name: string;
    event: string;
    tenant_id: string;
    value: number;
}) => Promise<unknown>;
/**
 * Fetches aggregated plugin impact data showing ROI per tenant
 */
export declare const fetchPluginImpact: () => Promise<unknown>;
