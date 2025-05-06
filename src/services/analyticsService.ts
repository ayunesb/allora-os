import { supabase } from "@/backend/supabase";
import { Campaign } from "@/types/campaigns";
import { AnalyticsData } from "@/types/analytics";

/**
 * Fetch analytics data for a specific campaign
 * @param campaignId Campaign ID to fetch analytics for
 * @param startDate Optional start date for the date range
 * @param endDate Optional end date for the date range
 */
export async function fetchCampaignAnalytics(
  campaignId: string,
  startDate?: Date,
  endDate?: Date,
): Promise<AnalyticsData> {
  try {
    // Format dates for the query if provided
    const formattedStartDate = startDate ? startDate.toISOString() : undefined;
    const formattedEndDate = endDate ? endDate.toISOString() : undefined;

    // Fetch analytics data from Supabase
    const { data, error } = await supabase
      .from("analytics")
      .select("*")
      .eq("campaign_id", campaignId)
      .gte("date", formattedStartDate)
      .lte("date", formattedEndDate)
      .order("date", { ascending: true });

    if (error) throw error;

    // Transform the data for the frontend
    // This is a placeholder, actual implementation would depend on your schema
    const analyticsData: AnalyticsData = {
      impressions: data.reduce((sum, item) => sum + (item.impressions || 0), 0),
      clicks: data.reduce((sum, item) => sum + (item.clicks || 0), 0),
      leads: data.reduce((sum, item) => sum + (item.leads || 0), 0),
      conversions: data.reduce((sum, item) => sum + (item.conversions || 0), 0),
      spend: data.reduce((sum, item) => sum + (item.spend || 0), 0),
      revenue: data.reduce((sum, item) => sum + (item.revenue || 0), 0),
      ctr: 0,
      cpc: 0,
      cpa: 0,
      roas: 0,
      dailyMetrics: data.map((item) => ({
        date: item.date,
        impressions: item.impressions || 0,
        clicks: item.clicks || 0,
        leads: item.leads || 0,
        conversions: item.conversions || 0,
        spend: item.spend || 0,
        revenue: item.revenue || 0,
      })),
      platformMetrics: {},
      comparisonData: {
        impressions: { current: 0, previous: 0 },
        clicks: { current: 0, previous: 0 },
        leads: { current: 0, previous: 0 },
        conversions: { current: 0, previous: 0 },
        spend: { current: 0, previous: 0 },
        revenue: { current: 0, previous: 0 },
      },
    };

    // Calculate derived metrics
    if (analyticsData.impressions > 0 && analyticsData.clicks > 0) {
      analyticsData.ctr =
        (analyticsData.clicks / analyticsData.impressions) * 100;
    }

    if (analyticsData.clicks > 0 && analyticsData.spend > 0) {
      analyticsData.cpc = analyticsData.spend / analyticsData.clicks;
    }

    if (analyticsData.conversions > 0 && analyticsData.spend > 0) {
      analyticsData.cpa = analyticsData.spend / analyticsData.conversions;
    }

    if (analyticsData.spend > 0 && analyticsData.revenue > 0) {
      analyticsData.roas = analyticsData.revenue / analyticsData.spend;
    }

    return analyticsData;
  } catch (error) {
    console.error("Error fetching campaign analytics:", error);
    // Return default empty data
    return {
      impressions: 0,
      clicks: 0,
      leads: 0,
      conversions: 0,
      spend: 0,
      revenue: 0,
      ctr: 0,
      cpc: 0,
      cpa: 0,
      roas: 0,
      dailyMetrics: [],
      platformMetrics: {},
      comparisonData: {
        impressions: { current: 0, previous: 0 },
        clicks: { current: 0, previous: 0 },
        leads: { current: 0, previous: 0 },
        conversions: { current: 0, previous: 0 },
        spend: { current: 0, previous: 0 },
        revenue: { current: 0, previous: 0 },
      },
    };
  }
}
