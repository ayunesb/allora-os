import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useBreakpoint } from "@/hooks/use-mobile";
import PricingTier from "@/components/pricing/PricingTier";
import PricingHeader from "@/components/pricing/PricingHeader";
import FAQSection from "@/components/pricing/FAQSection";
import PlanComparisonTable from "@/components/pricing/PlanComparisonTable";
import { pricingTiers, faqItems, featureComparison, } from "@/components/pricing/pricingData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
export default function Pricing() {
    const breakpoint = useBreakpoint();
    const isMobileView = ["xs", "mobile"].includes(breakpoint);
    const isTablet = breakpoint === "tablet";
    const [showComparison, setShowComparison] = useState(false);
    return (_jsxs("div", { className: "min-h-screen flex flex-col", children: [_jsx(Navbar, {}), _jsxs("div", { className: "flex-1 container mx-auto px-4 py-8 md:py-16", children: [_jsx(PricingHeader, { title: "Choose Your Executive Plan", description: "Scale your business with AI-powered strategies and tools. All plans include a 14-day money-back guarantee." }), _jsxs(Tabs, { defaultValue: "plans", className: "max-w-6xl mx-auto", children: [_jsxs(TabsList, { className: "grid w-full max-w-md mx-auto grid-cols-2 mb-8", children: [_jsx(TabsTrigger, { value: "plans", children: "Plans" }), _jsx(TabsTrigger, { value: "compare", children: "Compare Features" })] }), _jsxs(TabsContent, { value: "plans", className: "mt-0", children: [_jsx("div", { className: `grid gap-4 sm:gap-8 max-w-6xl mx-auto ${isMobileView
                                            ? "grid-cols-1"
                                            : isTablet
                                                ? "grid-cols-2"
                                                : "md:grid-cols-3"}`, children: pricingTiers.map((tier, i) => (_jsx(PricingTier, Object.assign({}, tier), i))) }), !isMobileView && (_jsxs("div", { className: "text-center mt-8", children: [_jsxs(Button, { variant: "outline", onClick: () => setShowComparison(!showComparison), className: "group", children: [showComparison
                                                        ? "Hide Detailed Comparison"
                                                        : "Show Detailed Comparison", showComparison ? (_jsx(ChevronUp, { className: "ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" })) : (_jsx(ChevronDown, { className: "ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" }))] }), showComparison && (_jsx("div", { className: "mt-6 animate-fade-in", children: _jsx(PlanComparisonTable, { featureData: featureComparison }) }))] }))] }), _jsx(TabsContent, { value: "compare", className: "mt-0", children: _jsx(PlanComparisonTable, { featureData: featureComparison }) })] }), _jsx(FAQSection, { title: "Frequently Asked Questions", items: faqItems })] })] }));
}
