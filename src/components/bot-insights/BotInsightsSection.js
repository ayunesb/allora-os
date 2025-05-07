import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BotInsightCard from "./BotInsightCard";
import { useCompanyInsights } from "@/hooks/useCompanyInsights";
import InsightDetailsDialog from "./InsightDetailsDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BadgeInfo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
export default function BotInsightsSection() {
    const { insights, isLoading, error } = useCompanyInsights();
    const [selectedInsight, setSelectedInsight] = useState(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("all");
    // Handle viewing insight details
    const handleViewDetails = (insight) => {
        setSelectedInsight(insight);
        setDetailsOpen(true);
    };
    // Filter insights based on active tab
    const getFilteredInsights = () => {
        if (activeTab === "all")
            return insights;
        return insights.filter((insight) => insight.type === activeTab);
    };
    // Loading skeletons
    if (isLoading) {
        return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Skeleton, { className: "h-10 w-40" }), _jsx(Skeleton, { className: "h-10 w-48" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [1, 2, 3].map((i) => (_jsx(Skeleton, { className: "h-64 w-full" }, i))) })] }));
    }
    // Error state
    if (error) {
        return (_jsxs(Card, { className: "border-destructive/50", children: [_jsx(CardHeader, { className: "text-destructive", children: "Error loading insights" }), _jsx(CardContent, { children: _jsx("p", { className: "text-sm", children: "We encountered a problem while generating insights. Please try again later." }) })] }));
    }
    // No insights available
    if (insights.length === 0) {
        return (_jsx(Card, { className: "border-dotted", children: _jsxs(CardContent, { className: "flex flex-col items-center justify-center py-10 text-center", children: [_jsx(BadgeInfo, { className: "h-10 w-10 text-muted-foreground mb-4" }), _jsx("h3", { className: "text-lg font-medium mb-2", children: "No AI insights available" }), _jsx("p", { className: "text-muted-foreground max-w-md mb-4", children: "To generate executive advisor insights, please complete your company details in your profile." }), _jsx(Button, { asChild: true, children: _jsx(Link, { to: "/dashboard/profile", children: "Update Company Information" }) })] }) }));
    }
    const filteredInsights = getFilteredInsights();
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "all", children: "All Insights" }), _jsx(TabsTrigger, { value: "strategy", children: "Strategies" }), _jsx(TabsTrigger, { value: "campaign", children: "Campaigns" }), _jsx(TabsTrigger, { value: "call_script", children: "Call Scripts" })] }), _jsx(TabsContent, { value: activeTab, className: "mt-6", children: filteredInsights.length === 0 ? (_jsx(Card, { children: _jsxs(CardContent, { className: "flex flex-col items-center justify-center py-10 text-center", children: [_jsx(BadgeInfo, { className: "h-10 w-10 text-muted-foreground mb-4" }), _jsx("h3", { className: "text-lg font-medium mb-2", children: "No insights found" }), _jsxs("p", { className: "text-muted-foreground max-w-md", children: ["We couldn't find any", " ", activeTab !== "all" ? activeTab + " " : "", "insights. Try selecting a different filter."] })] }) })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: filteredInsights.map((insight) => (_jsx(BotInsightCard, { insight: insight, onViewDetails: handleViewDetails }, insight.id))) })) })] }), _jsx(InsightDetailsDialog, { insight: selectedInsight, open: detailsOpen, onOpenChange: setDetailsOpen })] }));
}
