
import { useDashboardData } from "@/hooks/useDashboardData";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import CeoMessage from "@/components/dashboard/CeoMessage";
import AiRecommendations from "@/components/dashboard/AiRecommendations";
import QuickAccess from "@/components/dashboard/QuickAccess";
import DashboardLoading from "@/components/dashboard/DashboardLoading";
import { StrategyDisplay } from "@/components/dashboard/StrategyDisplay";
import WelcomeVideo from "@/components/dashboard/WelcomeVideo";
import { UpcomingZoomMeeting } from "@/components/dashboard/UpcomingZoomMeeting";
import { useEffect, useState, useTransition } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useEnhancedAiChat } from "@/hooks/useEnhancedAiChat";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function Dashboard() {
  const [isPending, startTransition] = useTransition();
  const [isInitialized, setIsInitialized] = useState(false);
  
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
    if (!isInitialized && user?.id && profile?.company_id) {
      const trackFirstVisit = async () => {
        try {
          // Check if user_activity table exists before querying it
          const { error: tableCheckError } = await supabase
            .from('information_schema.tables')
            .select('table_name')
            .eq('table_schema', 'public')
            .eq('table_name', 'user_activity')
            .single();
            
          if (tableCheckError) {
            console.log("User activity table may not exist:", tableCheckError);
            setIsInitialized(true);
            return;
          }
            
          // Check if this is the first visit
          const { data: visits, error: visitsError } = await supabase
            .from('user_activity')
            .select('*')
            .eq('user_id', user.id)
            .eq('activity_type', 'dashboard_visit')
            .limit(1);
              
          if (visitsError) {
            console.error("Error checking visits:", visitsError);
            setIsInitialized(true);
            return;
          }
            
          if (!visits || visits.length === 0) {
            // This is the first visit, record it if table exists
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
                
            if (strategiesError) {
              console.error("Error checking strategies:", strategiesError);
            } else if (strategies && strategies.length === 0) {
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
        } finally {
          setIsInitialized(true);
        }
      };
        
      startTransition(() => {
        trackFirstVisit();
      });
    }
  }, [user?.id, profile, generateResponse, isInitialized, startTransition]);
  
  // For initial loading state
  if (isLoading || isPending) {
    return <DashboardLoading />;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen space-y-8">
        <DashboardHeader pendingApprovals={pendingApprovals} />
        
        {/* Welcome Video - Component now handles its own visibility */}
        <ErrorBoundary>
          <WelcomeVideo />
        </ErrorBoundary>
        
        {/* Upcoming Zoom Meeting */}
        <ErrorBoundary>
          <UpcomingZoomMeeting />
        </ErrorBoundary>
        
        {/* CEO Strategy Summary */}
        <ErrorBoundary>
          <CeoMessage riskAppetite={riskAppetite} />
        </ErrorBoundary>
        
        {/* AI-Generated Strategies Section */}
        <ErrorBoundary>
          <StrategyDisplay />
        </ErrorBoundary>
        
        {/* AI Recommendations */}
        <ErrorBoundary>
          <AiRecommendations 
            recommendations={aiRecommendations} 
            onApprove={handleApproveRecommendation} 
          />
        </ErrorBoundary>
        
        {/* Quick Access Links */}
        <ErrorBoundary>
          <QuickAccess />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
}
