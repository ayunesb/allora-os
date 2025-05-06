var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { analyzeShopifyStore, implementOptimization, } from "@/utils/shopifyOptimization";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, RefreshCw, Check, AlertTriangle, Zap, } from "lucide-react";
export default function ShopifyOptimizationDashboard({ storeId }) {
    const [report, setReport] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [implementing, setImplementing] = useState(null);
    useEffect(() => {
        loadReport();
    }, [storeId]);
    const loadReport = () => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        const reportData = yield analyzeShopifyStore(storeId);
        if (reportData) {
            setReport(reportData);
        }
        setIsLoading(false);
    });
    const handleImplement = (recommendationId) => __awaiter(this, void 0, void 0, function* () {
        setImplementing(recommendationId);
        const success = yield implementOptimization(storeId, recommendationId);
        if (success && report) {
            // Update the local state
            const updatedRecommendations = report.recommendations.map((rec) => {
                if (rec.id === recommendationId) {
                    return Object.assign(Object.assign({}, rec), { implemented: true });
                }
                return rec;
            });
            setReport(Object.assign(Object.assign({}, report), { recommendations: updatedRecommendations }));
        }
        setImplementing(null);
    });
    const getImpactColor = (impact) => {
        switch (impact) {
            case "high":
                return "text-red-500";
            case "medium":
                return "text-amber-500";
            case "low":
                return "text-green-500";
            default:
                return "text-gray-500";
        }
    };
    const getEffortColor = (effort) => {
        switch (effort) {
            case "high":
                return "text-red-500";
            case "medium":
                return "text-amber-500";
            case "low":
                return "text-green-500";
            default:
                return "text-gray-500";
        }
    };
    const getCategoryBadge = (category) => {
        switch (category) {
            case "seo":
                return (_jsx(Badge, { variant: "outline", className: "bg-blue-50", children: "SEO" }));
            case "product":
                return (_jsx(Badge, { variant: "outline", className: "bg-green-50", children: "Product" }));
            case "checkout":
                return (_jsx(Badge, { variant: "outline", className: "bg-purple-50", children: "Checkout" }));
            case "design":
                return (_jsx(Badge, { variant: "outline", className: "bg-indigo-50", children: "Design" }));
            case "performance":
                return (_jsx(Badge, { variant: "outline", className: "bg-amber-50", children: "Performance" }));
            case "marketing":
                return (_jsx(Badge, { variant: "outline", className: "bg-pink-50", children: "Marketing" }));
            default:
                return _jsx(Badge, { variant: "outline", children: category });
        }
    };
    if (isLoading) {
        return (_jsxs("div", { className: "p-6", children: [_jsx("div", { className: "flex justify-between items-center mb-6", children: _jsx("h2", { className: "text-2xl font-bold", children: "Shopify Store Optimization" }) }), _jsxs("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: [_jsxs(Card, { className: "animate-pulse", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx("div", { className: "h-6 bg-gray-200 rounded w-1/2" }) }), _jsx(CardContent, { children: _jsx("div", { className: "h-20 bg-gray-200 rounded" }) })] }), _jsxs(Card, { className: "animate-pulse", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx("div", { className: "h-6 bg-gray-200 rounded w-1/2" }) }), _jsx(CardContent, { children: _jsx("div", { className: "h-20 bg-gray-200 rounded" }) })] }), _jsxs(Card, { className: "animate-pulse", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx("div", { className: "h-6 bg-gray-200 rounded w-1/2" }) }), _jsx(CardContent, { children: _jsx("div", { className: "h-20 bg-gray-200 rounded" }) })] })] })] }));
    }
    if (!report) {
        return (_jsx("div", { className: "p-6", children: _jsxs("div", { className: "text-center py-12", children: [_jsx(AlertTriangle, { className: "h-12 w-12 text-amber-500 mx-auto mb-4" }), _jsx("h3", { className: "text-xl font-semibold mb-2", children: "Store Analysis Failed" }), _jsx("p", { className: "text-gray-500 mb-6", children: "We couldn't analyze your Shopify store. Please check your connection." }), _jsxs(Button, { onClick: loadReport, children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2" }), "Try Again"] })] }) }));
    }
    const implementedCount = report.recommendations.filter((rec) => rec.implemented).length;
    const totalCount = report.recommendations.length;
    const percentageComplete = totalCount > 0 ? (implementedCount / totalCount) * 100 : 0;
    // Group recommendations by category
    const categorizedRecommendations = {};
    report.recommendations.forEach((rec) => {
        if (!categorizedRecommendations[rec.category]) {
            categorizedRecommendations[rec.category] = [];
        }
        categorizedRecommendations[rec.category].push(rec);
    });
    return (_jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold", children: "Shopify Store Optimization" }), _jsxs("p", { className: "text-gray-500", children: ["Last analyzed: ", new Date(report.lastUpdated).toLocaleString()] })] }), _jsxs(Button, { onClick: loadReport, variant: "outline", children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2" }), "Refresh Analysis"] })] }), _jsxs("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { className: "pb-2", children: [_jsx(CardDescription, { children: "Store Health Score" }), _jsxs(CardTitle, { className: "text-3xl", children: [report.score, "/100"] })] }), _jsxs(CardContent, { children: [_jsx(Progress, { value: report.score, className: "h-2 mt-2" }), _jsx("p", { className: "text-sm mt-2", children: report.score >= 80
                                            ? "Excellent"
                                            : report.score >= 60
                                                ? "Good"
                                                : report.score >= 40
                                                    ? "Needs Improvement"
                                                    : "Critical Issues" })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { className: "pb-2", children: [_jsx(CardDescription, { children: "Optimizations Implemented" }), _jsxs(CardTitle, { className: "text-3xl", children: [implementedCount, "/", totalCount] })] }), _jsxs(CardContent, { children: [_jsx(Progress, { value: percentageComplete, className: "h-2 mt-2" }), _jsxs("p", { className: "text-sm mt-2", children: [percentageComplete, "% of recommendations completed"] })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { className: "pb-2", children: [_jsx(CardDescription, { children: "High Impact Issues" }), _jsx(CardTitle, { className: "text-3xl", children: report.recommendations.filter((rec) => rec.impact === "high" && !rec.implemented).length })] }), _jsx(CardContent, { children: _jsxs("div", { className: "flex items-center", children: [_jsx(AlertTriangle, { className: "h-5 w-5 text-amber-500 mr-2" }), _jsx("p", { className: "text-sm", children: report.recommendations.filter((rec) => rec.impact === "high" && !rec.implemented).length > 0
                                                ? "Critical issues need attention"
                                                : "No critical issues found" })] }) })] })] }), _jsxs(Tabs, { defaultValue: "all", className: "w-full", children: [_jsxs(TabsList, { className: "mb-6", children: [_jsx(TabsTrigger, { value: "all", children: "All Recommendations" }), Object.keys(categorizedRecommendations).map((category) => (_jsx(TabsTrigger, { value: category, children: category.charAt(0).toUpperCase() + category.slice(1) }, category)))] }), _jsx(TabsContent, { value: "all", className: "mt-0", children: _jsx("div", { className: "grid gap-4", children: report.recommendations.map((recommendation) => (_jsxs(Card, { className: recommendation.implemented
                                    ? "border-green-200 bg-green-50"
                                    : "", children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center mb-1", children: [getCategoryBadge(recommendation.category), _jsxs("span", { className: `ml-2 text-xs font-medium ${getImpactColor(recommendation.impact)}`, children: [recommendation.impact.toUpperCase(), " IMPACT"] }), _jsxs("span", { className: `ml-2 text-xs font-medium ${getEffortColor(recommendation.effort)}`, children: [recommendation.effort.toUpperCase(), " EFFORT"] })] }), _jsxs(CardTitle, { className: "text-lg flex items-center", children: [recommendation.implemented && (_jsx(Check, { className: "h-5 w-5 text-green-500 mr-2" })), recommendation.title] })] }), recommendation.automated && (_jsxs(Badge, { variant: "outline", className: "bg-blue-50", children: [_jsx(Zap, { className: "h-3 w-3 mr-1" }), "Automated"] }))] }) }), _jsx(CardContent, { children: _jsx("p", { className: "text-sm text-gray-500", children: recommendation.description }) }), _jsx(CardFooter, { children: recommendation.implemented ? (_jsxs(Button, { variant: "ghost", className: "text-green-600", disabled: true, children: [_jsx(Check, { className: "h-4 w-4 mr-2" }), "Implemented"] })) : (_jsx(Button, { onClick: () => handleImplement(recommendation.id), disabled: implementing === recommendation.id, children: implementing === recommendation.id ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2 animate-spin" }), "Implementing..."] })) : (_jsxs(_Fragment, { children: [_jsx(ArrowUpRight, { className: "h-4 w-4 mr-2" }), "Implement", " ", recommendation.automated ? "Automatically" : "Now"] })) })) })] }, recommendation.id))) }) }), Object.entries(categorizedRecommendations).map(([category, recommendations]) => (_jsx(TabsContent, { value: category, className: "mt-0", children: _jsx("div", { className: "grid gap-4", children: recommendations.map((recommendation) => (_jsxs(Card, { className: recommendation.implemented
                                    ? "border-green-200 bg-green-50"
                                    : "", children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center mb-1", children: [getCategoryBadge(recommendation.category), _jsxs("span", { className: `ml-2 text-xs font-medium ${getImpactColor(recommendation.impact)}`, children: [recommendation.impact.toUpperCase(), " IMPACT"] }), _jsxs("span", { className: `ml-2 text-xs font-medium ${getEffortColor(recommendation.effort)}`, children: [recommendation.effort.toUpperCase(), " EFFORT"] })] }), _jsxs(CardTitle, { className: "text-lg flex items-center", children: [recommendation.implemented && (_jsx(Check, { className: "h-5 w-5 text-green-500 mr-2" })), recommendation.title] })] }), recommendation.automated && (_jsxs(Badge, { variant: "outline", className: "bg-blue-50", children: [_jsx(Zap, { className: "h-3 w-3 mr-1" }), "Automated"] }))] }) }), _jsx(CardContent, { children: _jsx("p", { className: "text-sm text-gray-500", children: recommendation.description }) }), _jsx(CardFooter, { children: recommendation.implemented ? (_jsxs(Button, { variant: "ghost", className: "text-green-600", disabled: true, children: [_jsx(Check, { className: "h-4 w-4 mr-2" }), "Implemented"] })) : (_jsx(Button, { onClick: () => handleImplement(recommendation.id), disabled: implementing === recommendation.id, children: implementing === recommendation.id ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2 animate-spin" }), "Implementing..."] })) : (_jsxs(_Fragment, { children: [_jsx(ArrowUpRight, { className: "h-4 w-4 mr-2" }), "Implement", " ", recommendation.automated
                                                        ? "Automatically"
                                                        : "Now"] })) })) })] }, recommendation.id))) }) }, category)))] })] }));
}
