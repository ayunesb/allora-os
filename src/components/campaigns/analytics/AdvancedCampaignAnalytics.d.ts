interface CampaignMetrics {
    id: string;
    name: string;
    metrics: {
        impressions?: number;
        clicks?: number;
        conversions?: number;
        cost?: number;
        ctr?: number;
        cpc?: number;
        conversionRate?: number;
        roi?: number;
    };
    dayMetrics?: Array<{
        day: string;
        impressions?: number;
        clicks?: number;
        conversions?: number;
        cost?: number;
    }>;
    channelBreakdown?: Array<{
        channel: string;
        value: number;
    }>;
    deviceBreakdown?: Array<{
        device: string;
        value: number;
    }>;
}
interface AdvancedCampaignAnalyticsProps {
    campaign: CampaignMetrics;
}
export declare function AdvancedCampaignAnalytics({ campaign }: AdvancedCampaignAnalyticsProps): JSX.Element;
export {};
