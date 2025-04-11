
import { useDashboardData } from "@/hooks/useDashboardData";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import CeoMessage from "@/components/dashboard/CeoMessage";
import AiRecommendations from "@/components/dashboard/AiRecommendations";
import QuickAccess from "@/components/dashboard/QuickAccess";
import DashboardLoading from "@/components/dashboard/DashboardLoading";
import { StrategyDisplay } from "@/components/dashboard/StrategyDisplay";
import WelcomeVideo from "@/components/dashboard/WelcomeVideo";
import { UpcomingZoomMeeting } from "@/components/dashboard/UpcomingZoomMeeting";

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
      
      {/* Welcome Video - Component now handles its own visibility */}
      <WelcomeVideo />
      
      {/* Upcoming Zoom Meeting */}
      <UpcomingZoomMeeting />
      
      {/* CEO Strategy Summary */}
      <CeoMessage riskAppetite={riskAppetite} />
      
      {/* AI-Generated Strategies Section */}
      <StrategyDisplay />
      
      {/* AI Recommendations */}
      <AiRecommendations 
        recommendations={aiRecommendations} 
        onApprove={handleApproveRecommendation} 
      />
      
      {/* Quick Access Links */}
      <QuickAccess />
    </div>
  );
}
