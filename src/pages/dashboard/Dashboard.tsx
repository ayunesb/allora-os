
import React, { Suspense, useCallback, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import QuickAccess from "@/components/dashboard/QuickAccess";
import AiRecommendations from "@/components/dashboard/AiRecommendations";
import CeoMessage from "@/components/dashboard/CeoMessage";
import { DashboardLoadingState } from "@/components/dashboard/LoadingState";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePendingApprovals } from "@/hooks/usePendingApprovals";
import { ErrorRecoveryWrapper } from "@/components/dashboard/ErrorRecoveryWrapper";
import { toast } from "sonner";
import { useDashboardData } from "@/hooks/useDashboardData";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [isManuallyRefreshing, setIsManuallyRefreshing] = useState(false);
  const queryClient = useQueryClient();
  
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
      // Refetch queries - you can add more specific refetching logic here
      await Promise.all([
        // Use query client to invalidate and refetch specific queries
        queryClient.invalidateQueries({ queryKey: ['dashboard-data'] }),
        queryClient.invalidateQueries({ queryKey: ['approvals'] }),
        queryClient.invalidateQueries({ queryKey: ['recommendations'] })
      ]);
      toast.success("Dashboard refreshed successfully");
    } catch (error) {
      console.error("Error refreshing dashboard:", error);
      toast.error("Could not refresh dashboard data");
    } finally {
      setIsManuallyRefreshing(false);
    }
  }, [queryClient]);

  if (isLoading) {
    return <DashboardLoadingState />;
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <DashboardHeader pendingApprovals={pendingApprovals} />
      
      {/* Refresh button for manual data refresh */}
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleManualRefresh}
          disabled={isManuallyRefreshing}
          className="text-xs flex items-center gap-1"
        >
          <RefreshCw className={`h-3 w-3 ${isManuallyRefreshing ? 'animate-spin' : ''}`} />
          {isManuallyRefreshing ? 'Refreshing...' : 'Refresh Data'}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Wrap each component in an ErrorRecoveryWrapper for better error handling */}
          <ErrorRecoveryWrapper errorTitle="CEO Message Error" errorMessage="We couldn't load the CEO message. Please try again.">
            <CeoMessage riskAppetite={riskAppetite || "medium"} />
          </ErrorRecoveryWrapper>
          
          <ErrorRecoveryWrapper errorTitle="AI Recommendations Error" errorMessage="We couldn't load AI recommendations. Please try again.">
            <AiRecommendations 
              recommendations={aiRecommendations || []} 
              onApprove={handleApproveRecommendation}
            />
          </ErrorRecoveryWrapper>
        </div>
        <div>
          <ErrorRecoveryWrapper errorTitle="Quick Access Error" errorMessage="Quick access links couldn't be loaded. Please try again.">
            <QuickAccess />
          </ErrorRecoveryWrapper>
        </div>
      </div>
    </div>
  );
}
