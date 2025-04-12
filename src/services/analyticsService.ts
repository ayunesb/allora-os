
import { AnalyticsData } from '@/types/analytics';

// Sample data for demonstration purposes
const sampleAnalyticsData: AnalyticsData = {
  summary: {
    impressions: 125000,
    clicks: 7500,
    conversions: 350,
    ctr: 0.06,
    conversionRate: 0.0467,
    costPerConversion: 28.57,
    revenue: 35000,
    roi: 3.5,
    cost: 10000,
    leads: 850,
    opportunities: 520
  },
  timeSeries: Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toISOString().split('T')[0],
      metrics: {
        impressions: 3000 + Math.round(Math.random() * 2000),
        clicks: 200 + Math.round(Math.random() * 150),
        conversions: 5 + Math.round(Math.random() * 15),
        ctr: 0.05 + (Math.random() * 0.03),
        conversionRate: 0.04 + (Math.random() * 0.02),
        costPerConversion: 25 + (Math.random() * 10),
        revenue: 1000 + Math.round(Math.random() * 500),
        roi: 3 + (Math.random() * 2),
        cost: 300 + Math.round(Math.random() * 200)
      }
    };
  }),
  channelPerformance: [
    {
      channelName: 'Paid Search',
      metrics: {
        impressions: 58000,
        clicks: 3200,
        conversions: 145,
        ctr: 0.0552,
        conversionRate: 0.0453,
        costPerConversion: 27.59,
        revenue: 14500,
        roi: 3.63,
        cost: 4000
      }
    },
    {
      channelName: 'Social Media',
      metrics: {
        impressions: 42000,
        clicks: 2800,
        conversions: 112,
        ctr: 0.0667,
        conversionRate: 0.04,
        costPerConversion: 26.79,
        revenue: 11200,
        roi: 3.73,
        cost: 3000
      }
    },
    {
      channelName: 'Display',
      metrics: {
        impressions: 25000,
        clicks: 1500,
        conversions: 93,
        ctr: 0.06,
        conversionRate: 0.062,
        costPerConversion: 32.26,
        revenue: 9300,
        roi: 3.1,
        cost: 3000
      }
    }
  ],
  conversionTypes: [
    { type: 'Purchase', count: 180 },
    { type: 'Sign Up', count: 95 },
    { type: 'Demo Request', count: 75 }
  ],
  audienceData: {
    ageGroups: [
      { group: '18-24', percentage: 15 },
      { group: '25-34', percentage: 32 },
      { group: '35-44', percentage: 28 },
      { group: '45-54', percentage: 18 },
      { group: '55+', percentage: 7 }
    ],
    genderDistribution: [
      { gender: 'Male', percentage: 58 },
      { gender: 'Female', percentage: 39 },
      { gender: 'Other', percentage: 3 }
    ],
    topRegions: [
      { region: 'California', percentage: 18 },
      { region: 'New York', percentage: 15 },
      { region: 'Texas', percentage: 12 },
      { region: 'Florida', percentage: 9 },
      { region: 'Illinois', percentage: 7 },
      { region: 'Washington', percentage: 6 },
      { region: 'Pennsylvania', percentage: 5 },
      { region: 'Georgia', percentage: 4 },
      { region: 'Ohio', percentage: 4 },
      { region: 'Massachusetts', percentage: 3 }
    ],
    deviceDistribution: [
      { device: 'Mobile', percentage: 62 },
      { device: 'Desktop', percentage: 31 },
      { device: 'Tablet', percentage: 6 },
      { device: 'Other', percentage: 1 }
    ],
    topInterests: [
      { interest: 'Technology', percentage: 45 },
      { interest: 'Business', percentage: 39 },
      { interest: 'Finance', percentage: 35 },
      { interest: 'Travel', percentage: 28 },
      { interest: 'Fashion', percentage: 22 },
      { interest: 'Health', percentage: 20 },
      { interest: 'Food', percentage: 18 },
      { interest: 'Sports', percentage: 15 }
    ]
  }
};

/**
 * Fetch analytics data for a campaign
 * @param options - Campaign analytics options
 * @returns Promise with analytics data
 */
export const fetchCampaignAnalytics = async (options: {
  campaignId: string;
  startDate: string;
  endDate: string;
  timeFrame: string;
  forceRefresh?: boolean;
}): Promise<AnalyticsData> => {
  // For demo purposes, we'll return sample data
  console.log('Fetching campaign analytics with options:', options);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return sample data
  return sampleAnalyticsData;
};
