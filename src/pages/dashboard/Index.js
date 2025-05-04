import { useDashboardData } from "@/hooks/useDashboardData";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import CeoMessage from "@/components/dashboard/CeoMessage";
import AiRecommendations from "@/components/dashboard/AiRecommendations";
import QuickAccess from "@/components/dashboard/QuickAccess";
import { DashboardLoading } from "@/components/dashboard/DashboardLoading";
import { StrategyDisplay } from "@/components/dashboard/StrategyDisplay";
import { WelcomeVideo } from "@/components/dashboard/WelcomeVideo";
import { UpcomingZoomMeeting } from "@/components/dashboard/UpcomingZoomMeeting";
import { useState, useEffect, useTransition } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { toast } from "sonner";
export default function Dashboard() {
    const [isPending, startTransition] = useTransition();
    const [isInitialized, setIsInitialized] = useState(false);
    const { user, profile } = useAuth();
    // Create needed state variables to match what the components expect
    const [pendingApprovals, setPendingApprovals] = useState(0);
    const [aiRecommendations, setAiRecommendations] = useState([]);
    const [riskAppetite, setRiskAppetite] = useState('medium');
    const { data, isLoading, error } = useDashboardData(user?.id);
    useEffect(() => {
        if (data) {
            // Update state based on fetched data
            setAiRecommendations(data.recommendations || []);
            // Set other state values if available in the data
        }
    }, [data]);
    const handleApproveRecommendation = (index) => {
        toast.success(`Approved recommendation: ${index + 1}`);
        // Implementation for approving recommendations would go here
    };
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
                        }
                        else if (strategies && strategies.length === 0) {
                            // Trigger strategy generation
                            const { error: genError } = await supabase.functions.invoke('generate-strategies', {
                                body: {
                                    companyId: profile.company_id,
                                    riskLevel: profile.risk_appetite || 'medium',
                                    industry: profile.industry || 'General',
                                    urgent: true
                                }
                            });
                            if (genError)
                                console.error("Error generating initial strategies:", genError);
                        }
                    }
                }
                catch (error) {
                    console.error("Error tracking first dashboard visit:", error);
                }
                finally {
                    setIsInitialized(true);
                }
            };
            startTransition(() => {
                trackFirstVisit();
            });
        }
    }, [user?.id, profile, isInitialized, startTransition]);
    // For initial loading state
    if (isLoading || isPending) {
        return <DashboardLoading />;
    }
    return (<ErrorBoundary>
      <div className="min-h-screen space-y-8">
        <DashboardHeader pendingApprovals={pendingApprovals}/>
        
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
          <CeoMessage riskAppetite={riskAppetite}/>
        </ErrorBoundary>
        
        {/* AI-Generated Strategies Section */}
        <ErrorBoundary>
          <StrategyDisplay />
        </ErrorBoundary>
        
        {/* AI Recommendations */}
        <ErrorBoundary>
          <AiRecommendations recommendations={aiRecommendations} onApprove={handleApproveRecommendation}/>
        </ErrorBoundary>
        
        {/* Quick Access Links */}
        <ErrorBoundary>
          <QuickAccess />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>);
}
