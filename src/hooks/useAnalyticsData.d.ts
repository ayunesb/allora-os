export interface AnalyticsDataPoint {
    date: string;
    value: number;
    type?: string;
}
export interface EnhancedAnalyticsData {
    userAnalytics: any;
    consultationAnalytics: any;
    debateAnalytics: any;
    engagementData?: AnalyticsDataPoint[];
    conversionData?: any[];
    revenueData?: any[];
    predictiveModels?: {
        leads?: any[];
        revenue?: any[];
        conversion?: any[];
    };
    savedReports?: any[];
}
export declare function useAnalyticsData(companyId?: string): {
    isLoading: boolean;
    analyticsData: EnhancedAnalyticsData;
    refreshAnalytics: () => Promise<void>;
};
