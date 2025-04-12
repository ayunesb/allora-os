
import { useState, useEffect } from "react";
import { getCompanyDashboardAnalytics } from "@/backend/analyticsService";
import { toast } from "sonner";

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

export function useAnalyticsData(companyId?: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<EnhancedAnalyticsData | null>(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      if (!companyId) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        
        // Fetch company analytics
        const baseAnalytics = await getCompanyDashboardAnalytics(companyId);
        
        // Generate enhanced analytics data for our new features
        const enhancedData = generateEnhancedAnalyticsData(baseAnalytics);
        
        setAnalyticsData(enhancedData);
      } catch (error: any) {
        console.error("Error fetching analytics data:", error);
        toast.error("Failed to load analytics information");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAnalyticsData();
  }, [companyId]);

  // Generate enhanced analytics data including data for predictive models and advanced visualizations
  const generateEnhancedAnalyticsData = (baseData: any): EnhancedAnalyticsData => {
    // Start with the base data
    const enhancedData: EnhancedAnalyticsData = {
      ...baseData
    };
    
    // Add engagement data (for heatmaps, etc.)
    enhancedData.engagementData = generateEngagementData();
    
    // Add conversion data (for funnels)
    enhancedData.conversionData = [
      { stage: "Visitors", count: 5800 },
      { stage: "Leads", count: 2200 },
      { stage: "Qualified", count: 1300 },
      { stage: "Proposals", count: 700 },
      { stage: "Negotiations", count: 350 },
      { stage: "Closed", count: 180 },
    ];
    
    // Add revenue data (for projections)
    enhancedData.revenueData = generateRevenueData();
    
    // Add predictive models
    enhancedData.predictiveModels = {
      leads: generatePredictiveModel("leads"),
      revenue: generatePredictiveModel("revenue"),
      conversion: generatePredictiveModel("conversion")
    };
    
    // Add saved reports
    enhancedData.savedReports = [];
    
    return enhancedData;
  };

  // Generate sample engagement data
  const generateEngagementData = (): AnalyticsDataPoint[] => {
    const data: AnalyticsDataPoint[] = [];
    const now = new Date();
    const types = ["pageview", "action", "interaction", "purchase"];
    
    // Generate 30 days of data
    for (let i = 30; i >= 1; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      
      // 3-5 data points per day
      const pointsPerDay = 3 + Math.floor(Math.random() * 3);
      
      for (let j = 0; j < pointsPerDay; j++) {
        data.push({
          date: dateStr,
          value: 10 + Math.floor(Math.random() * 90),
          type: types[Math.floor(Math.random() * types.length)]
        });
      }
    }
    
    return data;
  };

  // Generate sample revenue data
  const generateRevenueData = () => {
    const data = [];
    const now = new Date();
    const currentMonth = now.getMonth();
    
    // Last 12 months of data
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now);
      date.setMonth(currentMonth - i);
      
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const year = date.getFullYear();
      
      // Base revenue with some randomness
      const baseRevenue = 10000 + (i * 500);
      const revenue = baseRevenue + Math.random() * 2000;
      
      data.push({
        month: `${month} ${year}`,
        revenue: revenue,
        expenses: revenue * (0.6 + Math.random() * 0.1),
        profit: revenue * (0.2 + Math.random() * 0.2)
      });
    }
    
    return data;
  };

  // Generate sample predictive model data
  const generatePredictiveModel = (type: string) => {
    const data = [];
    const now = new Date();
    const currentMonth = now.getMonth();
    
    // Historical: past 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now);
      date.setMonth(currentMonth - i);
      
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const year = date.getFullYear();
      
      let value;
      switch (type) {
        case "leads":
          value = 100 + (i * 10) + Math.random() * 50;
          break;
        case "revenue":
          value = 10000 + (i * 1000) + Math.random() * 3000;
          break;
        case "conversion":
          value = 2 + (i * 0.2) + Math.random() * 1;
          break;
        default:
          value = 100 + Math.random() * 50;
      }
      
      data.push({
        period: `${month} ${year}`,
        actual: value,
        predicted: value,
        lower: value,
        upper: value
      });
    }
    
    // Forecast: next 6 months
    const lastValue = data[data.length - 1].actual;
    
    for (let i = 1; i <= 6; i++) {
      const date = new Date(now);
      date.setMonth(currentMonth + i);
      
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const year = date.getFullYear();
      
      let growth;
      let range;
      
      switch (type) {
        case "leads":
          growth = 1 + (0.05 + Math.random() * 0.03) * i;
          range = 20 * i;
          break;
        case "revenue":
          growth = 1 + (0.03 + Math.random() * 0.02) * i;
          range = 1000 * i;
          break;
        case "conversion":
          growth = 1 + (0.01 + Math.random() * 0.01) * i;
          range = 0.3 * i;
          break;
        default:
          growth = 1 + (0.05 * i);
          range = 20 * i;
      }
      
      const predicted = lastValue * growth;
      
      data.push({
        period: `${month} ${year}`,
        predicted: predicted,
        lower: predicted - range,
        upper: predicted + range
      });
    }
    
    return data;
  };

  return {
    isLoading,
    analyticsData,
    refreshAnalytics: async () => {
      setIsLoading(true);
      try {
        if (companyId) {
          const baseAnalytics = await getCompanyDashboardAnalytics(companyId);
          const enhancedData = generateEnhancedAnalyticsData(baseAnalytics);
          setAnalyticsData(enhancedData);
          toast.success("Analytics data refreshed");
        }
      } catch (error: any) {
        console.error("Error refreshing analytics:", error);
        toast.error("Failed to refresh analytics");
      } finally {
        setIsLoading(false);
      }
    }
  };
}
