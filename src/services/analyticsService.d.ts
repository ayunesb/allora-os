import { AnalyticsData } from '@/types/analytics';
/**
 * Fetch analytics data for a specific campaign
 * @param campaignId Campaign ID to fetch analytics for
 * @param startDate Optional start date for the date range
 * @param endDate Optional end date for the date range
 */
export declare function fetchCampaignAnalytics(campaignId: string, startDate?: Date, endDate?: Date): Promise<AnalyticsData>;
