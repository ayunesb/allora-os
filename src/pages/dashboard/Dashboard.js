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
/**
 * @stable
 * This file is locked and strictly typed.
 */
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, RefreshCw, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import AiRecommendations from "@/components/dashboard/AiRecommendations";
import { DashboardAnalytics } from "@/components/dashboard/DashboardAnalytics";
import CeoMessage from "@/components/dashboard/CeoMessage";
import QuickAccess from "@/components/dashboard/QuickAccess";
import { DashboardLoading } from "@/components/dashboard/DashboardLoading";
import ProductionDataAlert from "@/components/dashboard/ProductionDataAlert";
import { useDashboardData } from "@/hooks/useDashboardData";
import { supabase } from "@/integrations/supabase/client";
import { useStrategies } from "@/hooks/useStrategies";
import { useProductionData } from "@/hooks/useProductionData";
import { normalizeUserObject } from "@/utils/authCompatibility";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
    const navigate = useNavigate();
    const { user, profile } = useAuth();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { data, isLoading, error, refetch } = useDashboardData(user === null || user === void 0 ? void 0 : user.id);
    const { isProductionMode } = useProductionData();
    const [companyName, setCompanyName] = useState("your company");
    const { strategies } = useStrategies();
    const normalizedUser = normalizeUserObject(user || profile);
    // Fetch real company name
    useEffect(() => {
        const fetchCompanyData = () => __awaiter(this, void 0, void 0, function* () {
            if (normalizedUser === null || normalizedUser === void 0 ? void 0 : normalizedUser.company_id) {
                try {
                    const { data, error } = yield supabase
                        .from("companies")
                        .select("name")
                        .eq("id", normalizedUser.company_id)
                        .single();
                    if (!error && data) {
                        setCompanyName(data.name);
                    }
                }
                catch (err) {
                    console.error("Error fetching company data:", err);
                }
            }
        });
        fetchCompanyData();
    }, [normalizedUser === null || normalizedUser === void 0 ? void 0 : normalizedUser.company_id]);
    useEffect(() => {
        if (error) {
            console.error("Dashboard data error:", error);
            toast.error("Error loading dashboard data. Please try refreshing.");
        }
    }, [error]);
    const handleRefreshData = () => __awaiter(this, void 0, void 0, function* () {
        setIsRefreshing(true);
        try {
            yield refetch();
            toast.success("Dashboard data refreshed");
        }
        catch (err) {
            console.error("Error refreshing data:", err);
            toast.error("Failed to refresh data");
        }
        finally {
            setIsRefreshing(false);
        }
    });
    const handleSetupProduction = () => {
        // Redirect to the admin launch page
        window.location.href = "/admin/launch-verification";
    };
    const navigateToStrategyGenerator = () => {
        navigate("/dashboard/strategy-generator");
    };
    if (isLoading && !data) {
        return _jsx(DashboardLoading, {});
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Dashboard" }), _jsxs(Button, { onClick: handleRefreshData, variant: "outline", size: "sm", disabled: isRefreshing, className: "flex items-center gap-1", children: [_jsx(RefreshCw, { className: `h-4 w-4 ${isRefreshing ? "animate-spin" : ""}` }), _jsx("span", { children: "Refresh Data" })] })] }), !isProductionMode && _jsx(ProductionDataAlert, {}), _jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8", children: [_jsx("div", { className: "md:col-span-2", children: _jsx(CeoMessage, { riskAppetite: (normalizedUser === null || normalizedUser === void 0 ? void 0 : normalizedUser.risk_appetite) || "medium" }) }), _jsx("div", { children: _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-xl", children: "Executive Insight" }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary", children: _jsx(Sparkles, { className: "h-6 w-6" }) }), _jsx("div", { children: _jsx("h3", { className: "text-lg font-bold", children: "AI Strategy Generator" }) })] }), _jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "Generate tailored business strategies using AI based on your company profile, goals, and risk tolerance." }), _jsxs(Button, { className: "mt-4 w-full", onClick: navigateToStrategyGenerator, children: [_jsx("span", { children: "Create Strategies" }), _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] })] })] }) })] }), data && (_jsx(AiRecommendations, { recommendations: data.recommendations || [], onApprove: (index) => {
                    toast.success(`Recommendation ${index + 1} approved`);
                } })), _jsx(DashboardAnalytics, {}), _jsx(QuickAccess, {})] }));
}
