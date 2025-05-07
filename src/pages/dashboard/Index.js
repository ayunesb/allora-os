var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    const [riskAppetite, setRiskAppetite] = useState("medium");
    const { data, isLoading, error } = useDashboardData(user === null || user === void 0 ? void 0 : user.id);
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
        if (!isInitialized && (user === null || user === void 0 ? void 0 : user.id) && (profile === null || profile === void 0 ? void 0 : profile.company_id)) {
            const trackFirstVisit = () => __awaiter(this, void 0, void 0, function* () {
                try {
                    // Check if user_activity table exists before querying it
                    const { error: tableCheckError } = yield supabase
                        .from("information_schema.tables")
                        .select("table_name")
                        .eq("table_schema", "public")
                        .eq("table_name", "user_activity")
                        .single();
                    if (tableCheckError) {
                        console.log("User activity table may not exist:", tableCheckError);
                        setIsInitialized(true);
                        return;
                    }
                    // Check if this is the first visit
                    const { data: visits, error: visitsError } = yield supabase
                        .from("user_activity")
                        .select("*")
                        .eq("user_id", user.id)
                        .eq("activity_type", "dashboard_visit")
                        .limit(1);
                    if (visitsError) {
                        console.error("Error checking visits:", visitsError);
                        setIsInitialized(true);
                        return;
                    }
                    if (!visits || visits.length === 0) {
                        // This is the first visit, record it if table exists
                        yield supabase.from("user_activity").insert([
                            {
                                user_id: user.id,
                                activity_type: "dashboard_visit",
                                activity_data: { first_visit: true },
                            },
                        ]);
                        // Generate initial strategies if none exist yet
                        const { data: strategies, error: strategiesError } = yield supabase
                            .from("strategies")
                            .select("count")
                            .eq("company_id", profile.company_id);
                        if (strategiesError) {
                            console.error("Error checking strategies:", strategiesError);
                        }
                        else if (strategies && strategies.length === 0) {
                            // Trigger strategy generation
                            const { error: genError } = yield supabase.functions.invoke("generate-strategies", {
                                body: {
                                    companyId: profile.company_id,
                                    riskLevel: profile.risk_appetite || "medium",
                                    industry: profile.industry || "General",
                                    urgent: true,
                                },
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
            });
            startTransition(() => {
                trackFirstVisit();
            });
        }
    }, [user === null || user === void 0 ? void 0 : user.id, profile, isInitialized, startTransition]);
    // For initial loading state
    if (isLoading || isPending) {
        return _jsx(DashboardLoading, {});
    }
    return (_jsx(ErrorBoundary, { children: _jsxs("div", { className: "min-h-screen space-y-8", children: [_jsx(DashboardHeader, { pendingApprovals: pendingApprovals }), _jsx(ErrorBoundary, { children: _jsx(WelcomeVideo, {}) }), _jsx(ErrorBoundary, { children: _jsx(UpcomingZoomMeeting, {}) }), _jsx(ErrorBoundary, { children: _jsx(CeoMessage, { riskAppetite: riskAppetite }) }), _jsx(ErrorBoundary, { children: _jsx(StrategyDisplay, {}) }), _jsx(ErrorBoundary, { children: _jsx(AiRecommendations, { recommendations: aiRecommendations, onApprove: handleApproveRecommendation }) }), _jsx(ErrorBoundary, { children: _jsx(QuickAccess, {}) })] }) }));
}
