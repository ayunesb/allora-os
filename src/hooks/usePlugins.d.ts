interface PluginEvent {
    plugin_name: string;
    event: string;
    value: number;
}
export interface PluginImpactData {
    plugin_name: string;
    usage_count: number;
    average_value: number;
    total_value: number;
}
export declare function usePlugins(): {
    isLoading: boolean;
    pluginImpact: PluginImpactData[];
    recordPluginEvent: (event: PluginEvent) => Promise<void>;
    fetchPluginImpact: () => Promise<PluginImpactData[]>;
    fetchPlugins: () => Promise<{
        id: any;
        name: any;
        impact_score: any;
        xp: any;
    }[]>;
};
export {};
