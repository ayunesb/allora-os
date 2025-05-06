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
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PerformanceOverview from "@/components/analytics/PerformanceOverview";
import StrategyROIBreakdown from "@/components/analytics/StrategyROIBreakdown";
import LeadSourceAnalysis from "@/components/analytics/LeadSourceAnalysis";
import CampaignConversionMetrics from "@/components/analytics/CampaignConversionMetrics";
import WeeklyPerformanceCard from "@/components/analytics/WeeklyPerformanceCard";
import AnalyticsHeader from "@/components/analytics/AnalyticsHeader";
const loadingState1 = { isLoading: true, data: null };
const loadingState2 = { isLoading: false, data: [] };
const loadingState3 = { isLoading: true, data: {} };
const loadingState4 = { isLoading: false, data: { key: "value" } };
const loadingState5 = { isLoading: true, data: [] };
export default function Analytics() {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [dateRange, setDateRange] = useState([null, null]);
    const [activeTab, setActiveTab] = useState("overview");
    const handleRefresh = () => __awaiter(this, void 0, void 0, function* () {
        setIsRefreshing(true);
        // Simulate data refresh
        yield new Promise((resolve) => setTimeout(resolve, 1500));
        setIsRefreshing(false);
    });
    const handleDateRangeChange = (newRange) => {
        setDateRange(newRange);
        // Fetch new data based on date range
    };
    return (_jsxs("div", { className: "container mx-auto p-4 space-y-6", children: [_jsx(AnalyticsHeader, { isRefreshing: isRefreshing, onRefresh: handleRefresh, dateRange: dateRange, onDateRangeChange: handleDateRangeChange }), _jsxs(Tabs, { defaultValue: "overview", onValueChange: setActiveTab, children: [_jsxs(TabsList, { className: "grid grid-cols-4 w-full max-w-lg", children: [_jsx(TabsTrigger, { value: "overview", children: "Overview" }), _jsx(TabsTrigger, { value: "campaigns", children: "Campaigns" }), _jsx(TabsTrigger, { value: "strategies", children: "Strategies" }), _jsx(TabsTrigger, { value: "leads", children: "Leads" })] }), _jsxs(TabsContent, { value: "overview", className: "pt-4 space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsx(PerformanceOverview, { isLoading: isRefreshing }), _jsx(StrategyROIBreakdown, { isLoading: isRefreshing })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx(LeadSourceAnalysis, { isLoading: isRefreshing }), _jsx(CampaignConversionMetrics, { isLoading: isRefreshing }), _jsx(WeeklyPerformanceCard, { isLoading: isRefreshing })] })] }), _jsx(TabsContent, { value: "campaigns", className: "pt-4", children: _jsx(CampaignConversionMetrics, { isLoading: isRefreshing }) }), _jsx(TabsContent, { value: "strategies", className: "pt-4", children: _jsx(StrategyROIBreakdown, { isLoading: isRefreshing }) }), _jsx(TabsContent, { value: "leads", className: "pt-4", children: _jsx(LeadSourceAnalysis, { isLoading: isRefreshing }) })] })] }));
}
