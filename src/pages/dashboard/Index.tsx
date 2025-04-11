
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
import { useEnhancedAiChat } from "@/hooks/useEnhancedAiChat";

export default function Dashboard() {
  const {
    isLoading,
    pendingApprovals,
    aiRecommendations,
    riskAppetite,
    handleApproveRecommendation
  } = useDashboardData();
  
  const { user, profile } = useAuth();
  const { messages, generateResponse } = useEnhancedAiChat();
  
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
          
          // Prepare welcome message using AI
          try {
            const welcomePrompt = `Welcome ${profile.name || 'there'} to Allora AI. 
            They are in the ${profile.industry || 'technology'} industry and have a ${profile.risk_appetite || 'medium'} risk appetite. 
            Create a brief, friendly welcome message highlighting 3 key benefits of using Allora AI for business strategy.`;
            
            generateResponse(
              'AI CEO',
              'Executive Business Advisor',
              welcomePrompt,
              false, // Don't include memory for first interaction
              false // Don't include learning context for first interaction
            ).then(response => {
              console.log("Generated welcome message:", response);
            });
          } catch (aiError) {
            console.error("Error generating welcome message:", aiError);
          }
        }
      } catch (error) {
        console.error("Error tracking first dashboard visit:", error);
      }
    };
    
    trackFirstVisit();
  }, [user?.id, profile, generateResponse]);
  
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
