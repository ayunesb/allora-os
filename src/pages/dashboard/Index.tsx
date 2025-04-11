
import { useDashboardData } from "@/hooks/useDashboardData";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import CeoMessage from "@/components/dashboard/CeoMessage";
import AiRecommendations from "@/components/dashboard/AiRecommendations";
import QuickAccess from "@/components/dashboard/QuickAccess";
import DashboardLoading from "@/components/dashboard/DashboardLoading";
import { StrategyDisplay } from "@/components/dashboard/StrategyDisplay";
import WelcomeVideo from "@/components/dashboard/WelcomeVideo";
import { UpcomingZoomMeeting } from "@/components/dashboard/UpcomingZoomMeeting";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export default function Dashboard() {
  const {
    isLoading,
    pendingApprovals,
    aiRecommendations,
    riskAppetite,
    handleApproveRecommendation
  } = useDashboardData();
  
  const { user, profile } = useAuth();
  
  // Auto-generate initial dashboard and track first visit
  useEffect(() => {
    const trackFirstVisit = async () => {
      if (!user?.id || !profile?.company_id) return;
      
      try {
        // Check if this is the first visit
        const { data: visits, error: visitsError } = await supabase
          .from('user_activity')
          .select('*')
          .eq('user_id', user.id)
          .eq('activity_type', 'dashboard_visit')
          .limit(1);
          
        if (visitsError) throw visitsError;
        
        if (!visits || visits.length === 0) {
          // This is the first visit, record it
          await supabase
            .from('user_activity')
            .insert([
              {
                user_id: user.id,
                activity_type: 'dashboard_visit',
                activity_data: { first_visit: true }
              }
            ]);
            
          // Generate initial strategies if none exist yet
          const { data: strategies, error: strategiesError } = await supabase
            .from('strategies')
            .select('count')
            .eq('company_id', profile.company_id);
            
          if (strategiesError) throw strategiesError;
          
          if (strategies && strategies.length === 0) {
            // Trigger strategy generation
            const { error: genError } = await supabase.functions.invoke('generate-strategies', {
              body: { 
                companyId: profile.company_id,
                riskLevel: profile.risk_appetite || 'medium',
                industry: profile.industry || 'General',
                urgent: true
              }
            });
            
            if (genError) console.error("Error generating initial strategies:", genError);
          }
        }
      } catch (error) {
        console.error("Error tracking first dashboard visit:", error);
      }
    };
    
    trackFirstVisit();
  }, [user?.id, profile]);
  
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
