
import { useState, useEffect } from "react";
import { getCompanyDashboardAnalytics } from "@/backend/analyticsService";
import { toast } from "sonner";

export function useAnalyticsData(companyId?: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      if (!companyId) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        
        // Fetch company analytics
        const analytics = await getCompanyDashboardAnalytics(companyId);
        setAnalyticsData(analytics);
      } catch (error: any) {
        console.error("Error fetching analytics data:", error);
        toast.error("Failed to load analytics information");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAnalyticsData();
  }, [companyId]);

  return {
    isLoading,
    analyticsData
  };
}
