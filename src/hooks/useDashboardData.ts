
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCompanyDetails } from "./useCompanyDetails";
import { usePendingApprovals } from "./usePendingApprovals";
import { useAnalyticsData } from "./useAnalyticsData";
import { useAiRecommendations, RecommendationType } from "./useAiRecommendations";
import { useRecommendationApproval } from "./useRecommendationApproval";
import { useCompanyInsights } from "./useCompanyInsights";
import { performanceMonitor } from "@/utils/performance/performanceMonitor";
import { optimizedApiClient } from "@/utils/api/optimizedApiClient";
import { logger } from "@/utils/loggingService";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

// Extended types with error properties
type CompanyDetailsResult = ReturnType<typeof useCompanyDetails> & { error?: Error | null };
type PendingApprovalsResult = ReturnType<typeof usePendingApprovals> & { error?: Error | null };
type AnalyticsDataResult = ReturnType<typeof useAnalyticsData> & { error?: Error | null };
type AiRecommendationsResult = ReturnType<typeof useAiRecommendations> & { 
  isLoading?: boolean;
  error?: Error | null;
};

// Add id property to RecommendationType
interface EnhancedRecommendationType extends RecommendationType {
  id: string;
}

export function useDashboardData() {
  const { profile } = useAuth();
  const companyId = profile?.company_id;
  const [isManuallyRefreshing, setIsManuallyRefreshing] = useState(false);
  const [lastError, setLastError] = useState<Error | null>(null);
  const queryClient = useQueryClient();
  
  // Use our smaller, focused hooks with error retry handling
  const { 
    isLoading: isCompanyLoading, 
    riskAppetite, 
    companyDetails,
    error: companyError
  } = useCompanyDetails(companyId) as CompanyDetailsResult;
  
  const { 
    isLoading: isApprovalsLoading, 
    pendingApprovals,
    error: approvalsError
  } = usePendingApprovals() as PendingApprovalsResult;
  
  const { 
    isLoading: isAnalyticsLoading, 
    analyticsData,
    error: analyticsError
  } = useAnalyticsData(companyId) as AnalyticsDataResult;
  
  // Get company insights for strategic recommendations
  const { 
    insights, 
    isLoading: isInsightsLoading,
    error: insightsError
  } = useCompanyInsights();
  
  // Get AI recommendations with performance monitoring
  const { 
    aiRecommendations, 
    generateAiRecommendations,
    removeRecommendation,
    isLoading: isRecommendationsLoading,
    error: recommendationsError
  } = useAiRecommendations(companyDetails, analyticsData, profile, riskAppetite) as AiRecommendationsResult;
  
  // Get recommendation approval functionality
  const { handleApproveRecommendation } = useRecommendationApproval();
  
  // Collect any errors
  useEffect(() => {
    const error = companyError || approvalsError || analyticsError || insightsError || recommendationsError;
    if (error) {
      setLastError(error);
      logger.error("Dashboard data error:", error);
    } else {
      setLastError(null);
    }
  }, [companyError, approvalsError, analyticsError, insightsError, recommendationsError]);
  
  // Generate recommendations when we have the data, with performance monitoring
  useEffect(() => {
    if (!isCompanyLoading && !isAnalyticsLoading && analyticsData) {
      performanceMonitor.measureAsync(
        'generate-ai-recommendations',
        async () => {
          try {
            await generateAiRecommendations();
          } catch (error) {
            logger.error("Error generating AI recommendations:", error);
            // Silent fail - we don't want to break the dashboard for this
          }
        },
        { companyId, hasAnalyticsData: !!analyticsData }
      );
    }
  }, [isCompanyLoading, isAnalyticsLoading, analyticsData, generateAiRecommendations, companyId]);
  
  // Manual refresh function with performance monitoring
  const refreshAllData = useCallback(async () => {
    if (isManuallyRefreshing) return;
    
    setIsManuallyRefreshing(true);
    
    try {
      toast.loading("Refreshing dashboard data...");
      
      await performanceMonitor.measureAsync('dashboard-refresh', async () => {
        // Clear relevant API caches
        optimizedApiClient.clearCache('/api/company');
        optimizedApiClient.clearCache('/api/analytics');
        optimizedApiClient.clearCache('/api/approvals');
        
        // Invalidate React Query cache and trigger refetches
        if (queryClient) {
          await Promise.all([
            queryClient.invalidateQueries({ queryKey: ['company'] }),
            queryClient.invalidateQueries({ queryKey: ['analytics'] }),
            queryClient.invalidateQueries({ queryKey: ['approvals'] }),
            queryClient.invalidateQueries({ queryKey: ['recommendations'] })
          ]);
        }
      });
      
      toast.success("Dashboard data refreshed");
    } catch (error) {
      logger.error("Error refreshing dashboard data:", error);
      toast.error("Could not refresh all dashboard data");
    } finally {
      setIsManuallyRefreshing(false);
    }
  }, [isManuallyRefreshing, queryClient]);
  
  // Handle approving a recommendation with error recovery
  const handleApprove = useCallback(async (index: number) => {
    if (index >= 0 && index < (aiRecommendations?.length || 0)) {
      try {
        const recommendation = aiRecommendations[index] as EnhancedRecommendationType;
        const recommendationId = `recommendation-${index}`; // Generate an ID if none exists
        
        const result = await performanceMonitor.measureAsync(
          'approve-recommendation',
          () => handleApproveRecommendation(recommendation, index, riskAppetite),
          { recommendationId: recommendation.id || recommendationId }
        );
        
        if (result >= 0) {
          // If successful, remove the recommendation from the list
          removeRecommendation(index);
          return true;
        }
        return false;
      } catch (error) {
        logger.error("Error approving recommendation:", error);
        toast.error("Failed to approve recommendation. Please try again.");
        return false;
      }
    }
    return false;
  }, [aiRecommendations, handleApproveRecommendation, removeRecommendation, riskAppetite]);

  // Overall loading state
  const isLoading = isCompanyLoading || 
    isApprovalsLoading || 
    isAnalyticsLoading || 
    isInsightsLoading ||
    isRecommendationsLoading;

  return {
    isLoading,
    isManuallyRefreshing,
    pendingApprovals,
    aiRecommendations,
    insights,
    riskAppetite,
    error: lastError,
    refreshAllData,
    handleApproveRecommendation: handleApprove
  };
}
