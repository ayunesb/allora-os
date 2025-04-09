
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCompanyDetails } from "./useCompanyDetails";
import { usePendingApprovals } from "./usePendingApprovals";
import { useAnalyticsData } from "./useAnalyticsData";
import { useAiRecommendations, RecommendationType } from "./useAiRecommendations";

export function useDashboardData() {
  const { profile } = useAuth();
  const companyId = profile?.company_id;
  
  // Use our smaller, focused hooks
  const { isLoading: isCompanyLoading, riskAppetite, companyDetails } = useCompanyDetails(companyId);
  const { isLoading: isApprovalsLoading, pendingApprovals } = usePendingApprovals();
  const { isLoading: isAnalyticsLoading, analyticsData } = useAnalyticsData(companyId);
  
  // Get AI recommendations
  const { 
    aiRecommendations, 
    generateAiRecommendations,
    handleApproveRecommendation 
  } = useAiRecommendations(companyDetails, analyticsData, profile, riskAppetite);
  
  // Generate recommendations when we have the data
  useEffect(() => {
    if (!isCompanyLoading && !isAnalyticsLoading && analyticsData) {
      generateAiRecommendations();
    }
  }, [isCompanyLoading, isAnalyticsLoading, analyticsData]);
  
  // Overall loading state
  const isLoading = isCompanyLoading || isApprovalsLoading || isAnalyticsLoading;

  return {
    isLoading,
    pendingApprovals,
    aiRecommendations,
    riskAppetite,
    handleApproveRecommendation
  };
}
