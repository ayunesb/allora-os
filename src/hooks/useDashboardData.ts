
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCompanyDetails } from "./useCompanyDetails";
import { usePendingApprovals } from "./usePendingApprovals";
import { useAnalyticsData } from "./useAnalyticsData";
import { useAiRecommendations, RecommendationType } from "./useAiRecommendations";
import { useRecommendationApproval } from "./useRecommendationApproval";
import { useCompanyInsights } from "./useCompanyInsights";

export function useDashboardData() {
  const { profile } = useAuth();
  const companyId = profile?.company_id;
  
  // Use our smaller, focused hooks
  const { isLoading: isCompanyLoading, riskAppetite, companyDetails } = useCompanyDetails(companyId);
  const { isLoading: isApprovalsLoading, pendingApprovals } = usePendingApprovals();
  const { isLoading: isAnalyticsLoading, analyticsData } = useAnalyticsData(companyId);
  
  // Get company insights for strategic recommendations
  const { insights, isLoading: isInsightsLoading } = useCompanyInsights();
  
  // Get AI recommendations
  const { 
    aiRecommendations, 
    generateAiRecommendations,
    removeRecommendation
  } = useAiRecommendations(companyDetails, analyticsData, profile, riskAppetite);
  
  // Get recommendation approval functionality
  const { handleApproveRecommendation } = useRecommendationApproval();
  
  // Generate recommendations when we have the data
  useEffect(() => {
    if (!isCompanyLoading && !isAnalyticsLoading && analyticsData) {
      generateAiRecommendations();
    }
  }, [isCompanyLoading, isAnalyticsLoading, analyticsData]);
  
  // Overall loading state
  const isLoading = isCompanyLoading || isApprovalsLoading || isAnalyticsLoading || isInsightsLoading;

  // Handle approving a recommendation
  const handleApprove = async (index: number) => {
    if (index >= 0 && index < aiRecommendations.length) {
      const recommendation = aiRecommendations[index];
      const result = await handleApproveRecommendation(recommendation, index, riskAppetite);
      
      if (result >= 0) {
        // If successful, remove the recommendation from the list
        removeRecommendation(index);
      }
    }
  };

  return {
    isLoading,
    pendingApprovals,
    aiRecommendations,
    insights,
    riskAppetite,
    handleApproveRecommendation: handleApprove
  };
}
