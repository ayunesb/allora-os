
import React, { Suspense, useCallback, useState } from "react";
import { Helmet } from "react-helmet-async";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import QuickAccess from "@/components/dashboard/QuickAccess";
import AiRecommendations from "@/components/dashboard/AiRecommendations";
import CeoMessage from "@/components/dashboard/CeoMessage";
import { DashboardLoadingState } from "@/components/dashboard/LoadingState";
import { ErrorRecoveryWrapper } from "@/components/dashboard/ErrorRecoveryWrapper";
import { toast } from "sonner";
import { useDashboardData } from "@/hooks/useDashboardData";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccessibility } from "@/context/AccessibilityContext";
import { Toaster } from "sonner";
import { ExecutiveInteraction } from "@/components/dashboard/ExecutiveInteraction";
import { DashboardAnalytics } from "@/components/dashboard/DashboardAnalytics";

export default function Dashboard() {
  const [isManuallyRefreshing, setIsManuallyRefreshing] = useState(false);
  const { screenReaderFriendly } = useAccessibility();
  
  // Use the custom hook for dashboard data with improved error handling
  const { 
    isLoading, 
    pendingApprovals, 
    aiRecommendations, 
    riskAppetite,
    handleApproveRecommendation
  } = useDashboardData();

  // Handle manual refresh with feedback
  const handleManualRefresh = useCallback(async () => {
    setIsManuallyRefreshing(true);
    try {
      // Simulate refresh delay - in a real app, this would actually refetch data
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Dashboard refreshed successfully");
    } catch (error) {
      console.error("Error refreshing dashboard:", error);
      toast.error("Could not refresh dashboard data", {
        description: "Please check your network connection and try again"
      });
    } finally {
      setIsManuallyRefreshing(false);
    }
  }, []);
  
  // Handle recommendation approval with enhanced feedback
  const handleRecommendationApproval = async (index: number) => {
    try {
      toast.info("Processing approval...");
      // Use proper type safety when accessing recommendations
      if (aiRecommendations && aiRecommendations[index]) {
        await handleApproveRecommendation(index);
        toast.success("Recommendation approved successfully", {
          description: "The approved recommendation will be implemented shortly"
        });
      } else {
        throw new Error("Recommendation not found");
      }
    } catch (error) {
      console.error("Error approving recommendation:", error);
      toast.error("Failed to approve recommendation", {
        description: "Please try again or contact support if the problem persists"
      });
    }
  };

  if (isLoading) {
    return <DashboardLoadingState aria-label="Loading dashboard data" />;
  }

  return (
    <>
      <Toaster position="top-right" closeButton richColors />
      
      <div 
        className="container mx-auto px-4 py-6 space-y-6"
        role={screenReaderFriendly ? "main" : undefined}
        aria-label={screenReaderFriendly ? "Dashboard" : undefined}
      >
        <DashboardHeader pendingApprovals={pendingApprovals ? pendingApprovals : 0} />
        
        {/* Refresh button for manual data refresh */}
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleManualRefresh}
            disabled={isManuallyRefreshing}
            className="text-xs flex items-center gap-1"
            aria-label="Refresh dashboard data"
          >
            <RefreshCw className={`h-3 w-3 ${isManuallyRefreshing ? 'animate-spin' : ''}`} 
              aria-hidden="true"
            />
            {isManuallyRefreshing ? 'Refreshing...' : 'Refresh Data'}
          </Button>
        </div>
        
        {/* Executive Interaction Section */}
        <ErrorRecoveryWrapper
          errorTitle="Executive Interaction Error"
          errorMessage="We couldn't load the executive interaction component. Please try again."
        >
          <ExecutiveInteraction riskAppetite={riskAppetite || "medium"} />
        </ErrorRecoveryWrapper>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            className="md:col-span-2 space-y-6"
            role={screenReaderFriendly ? "region" : undefined}
            aria-label={screenReaderFriendly ? "Main dashboard content" : undefined}
          >
            {/* Wrap each component in an ErrorRecoveryWrapper for better error handling */}
            <ErrorRecoveryWrapper 
              errorTitle="CEO Message Error" 
              errorMessage="We couldn't load the CEO message. Please try again."
            >
              <CeoMessage riskAppetite={riskAppetite || "medium"} />
            </ErrorRecoveryWrapper>
            
            <ErrorRecoveryWrapper 
              errorTitle="Analytics Error" 
              errorMessage="We couldn't load the analytics data. Please try again."
            >
              <DashboardAnalytics />
            </ErrorRecoveryWrapper>
            
            <ErrorRecoveryWrapper 
              errorTitle="AI Recommendations Error" 
              errorMessage="We couldn't load AI recommendations. Please try again."
            >
              <AiRecommendations 
                recommendations={aiRecommendations || []} 
                onApprove={handleRecommendationApproval}
              />
            </ErrorRecoveryWrapper>
          </div>
          <div
            role={screenReaderFriendly ? "complementary" : undefined}
            aria-label={screenReaderFriendly ? "Quick access tools" : undefined}
          >
            <ErrorRecoveryWrapper 
              errorTitle="Quick Access Error" 
              errorMessage="Quick access links couldn't be loaded. Please try again."
            >
              <QuickAccess />
            </ErrorRecoveryWrapper>
          </div>
        </div>
      </div>
    </>
  );
}
