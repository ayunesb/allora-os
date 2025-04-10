
import { useDashboardData } from "@/hooks/useDashboardData";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import CeoMessage from "@/components/dashboard/CeoMessage";
import AiRecommendations from "@/components/dashboard/AiRecommendations";
import StrategyBoard from "@/components/StrategyBoard";
import QuickAccess from "@/components/dashboard/QuickAccess";
import DashboardLoading from "@/components/dashboard/DashboardLoading";

export default function Dashboard() {
  // This doesn't need to change as we're maintaining the same API
  const {
    isLoading,
    pendingApprovals,
    aiRecommendations,
    riskAppetite,
    handleApproveRecommendation
  } = useDashboardData();
  
  // For initial loading state
  if (isLoading) {
    return <DashboardLoading />;
  }

  return (
    <div className="min-h-screen space-y-8">
      <DashboardHeader pendingApprovals={pendingApprovals} />
      
      {/* CEO Strategy Summary - Now enhanced with AI Executive attribution */}
      <CeoMessage riskAppetite={riskAppetite} />
      
      {/* AI Recommendations - Now with executive attributions */}
      <AiRecommendations 
        recommendations={aiRecommendations} 
        onApprove={handleApproveRecommendation} 
      />
      
      {/* Strategy Board */}
      <StrategyBoard />
      
      {/* Quick Access Links */}
      <QuickAccess />
    </div>
  );
}
