export interface DailyMetric {
    date: string;
    impressions: number;
    clicks: number;
    leads: number;
    conversions: number;
    spend: number;
    revenue: number;
}
export interface MetricComparison {
    current: number;
    previous: number;
}
export interface ComparisonData {
    impressions: MetricComparison;
    clicks: MetricComparison;
    leads: MetricComparison;
    conversions: MetricComparison;
    spend: MetricComparison;
    revenue: MetricComparison;
}
export interface PlatformMetric {
    impressions: number;
    clicks: number;
    leads: number;
    conversions: number;
    spend: number;
    revenue: number;
    ctr: number;
    cpc: number;
    cpa: number;
    roas: number;
}
export interface PlatformMetrics {
    [platform: string]: PlatformMetric;
}
export interface AnalyticsData {
    impressions: number;
    clicks: number;
    leads: number;
    conversions: number;
    spend: number;
    revenue: number;
    ctr: number;
    cpc: number;
    cpa: number;
    roas: number;
    dailyMetrics: DailyMetric[];
    platformMetrics: PlatformMetrics;
    comparisonData: ComparisonData;
}
export interface ChannelPerformance {
    channelName: string;
    metrics: {
        impressions: number;
        clicks: number;
        ctr: number;
        conversions: number;
        conversionRate: number;
        cost: number;
        revenue: number;
        roi: number;
    };
}
