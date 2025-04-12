
import React from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import QuickAccess from "@/components/dashboard/QuickAccess";
import AiRecommendations from "@/components/dashboard/AiRecommendations";
import CeoMessage from "@/components/dashboard/CeoMessage";
import { DashboardLoadingState } from "@/components/dashboard/LoadingState";
import { useQuery } from "@tanstack/react-query";
import { usePendingApprovals } from "@/hooks/usePendingApprovals";

export default function Dashboard() {
  const { isLoading } = useQuery({
    queryKey: ['dashboard-data'],
    queryFn: async () => {
      // This would normally fetch data from your API
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {};
    },
  });

  // Use the hook to get pending approvals
  const { pendingApprovals } = usePendingApprovals();

  if (isLoading) {
    return <DashboardLoadingState />;
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <DashboardHeader pendingApprovals={pendingApprovals} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <CeoMessage riskAppetite="medium" />
          <AiRecommendations 
            recommendations={[]} 
            onApprove={() => {}}
          />
        </div>
        <div>
          <QuickAccess />
        </div>
      </div>
    </div>
  );
}
