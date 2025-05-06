import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Check, X, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
import { pricingTiers } from "./pricingData";
import { useBreakpoint } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
const PlanComparisonTable = ({ featureData }) => {
    const breakpoint = useBreakpoint();
    const isMobileView = ["xs", "mobile"].includes(breakpoint);
    if (isMobileView) {
        return _jsx(MobilePlanComparison, { featureData: featureData });
    }
    return (_jsx("div", { className: "mt-10 border rounded-lg overflow-hidden", children: _jsx(ScrollArea, { className: "w-full", children: _jsx("div", { className: "min-w-[800px]", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { className: "bg-muted/50", children: [_jsx(TableHead, { className: "w-[280px]", children: "Features" }), pricingTiers.map((tier, index) => (_jsxs(TableHead, { className: "text-center", children: [_jsx("div", { className: "font-bold", children: tier.title }), _jsx("div", { className: "text-2xl font-bold mt-2", children: tier.price }), _jsx("div", { className: "text-muted-foreground text-xs mt-1", children: "/month" })] }, index)))] }) }), _jsxs(TableBody, { children: [featureData.map((category, categoryIndex) => (_jsxs(React.Fragment, { children: [_jsx(TableRow, { className: "bg-muted/30", children: _jsx(TableCell, { colSpan: 4, className: "font-bold", children: category.category }) }), category.features.map((feature, featureIndex) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "py-4", children: _jsxs("div", { className: "flex items-start gap-2", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: feature.name }), feature.description && (_jsx("div", { className: "text-muted-foreground text-xs mt-1", children: feature.description }))] }), feature.description && (_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(HelpCircle, { className: "h-4 w-4 text-muted-foreground shrink-0 mt-1" }) }), _jsx(TooltipContent, { children: _jsx("p", { className: "max-w-[200px] text-xs", children: feature.description }) })] }) }))] }) }), _jsx(TableCell, { className: "text-center py-4", children: renderFeatureValue(feature.starter) }), _jsx(TableCell, { className: "text-center py-4 bg-primary/5", children: renderFeatureValue(feature.growth) }), _jsx(TableCell, { className: "text-center py-4", children: renderFeatureValue(feature.enterprise) })] }, `${categoryIndex}-${featureIndex}`)))] }, categoryIndex))), _jsxs(TableRow, { children: [_jsx(TableCell, {}), pricingTiers.map((tier, index) => (_jsx(TableCell, { className: "text-center p-4", children: _jsx(Button, { variant: tier.buttonVariant, className: "w-full", onClick: () => handlePlanSelect(tier.priceId, tier.title), children: tier.buttonText }) }, index)))] })] })] }) }) }) }));
};
const MobilePlanComparison = ({ featureData }) => {
    const selectedPlan = pricingTiers[1]; // Default to Growth plan for mobile
    return (_jsxs("div", { className: "mt-8 space-y-8", children: [_jsx("div", { className: "flex justify-center space-x-2 mb-4", children: pricingTiers.map((tier, index) => (_jsx(Badge, { variant: tier.title === selectedPlan.title ? "default" : "outline", className: "cursor-pointer px-3 py-1", children: tier.title }, index))) }), _jsxs("div", { className: "border rounded-lg overflow-hidden", children: [_jsxs("div", { className: "bg-muted/50 p-4 text-center border-b", children: [_jsx("div", { className: "font-bold text-xl", children: selectedPlan.title }), _jsxs("div", { className: "text-2xl font-bold mt-2", children: [selectedPlan.price, _jsx("span", { className: "text-sm font-normal", children: "/month" })] }), _jsx("div", { className: "text-muted-foreground text-sm mt-1", children: selectedPlan.description })] }), _jsx("div", { className: "divide-y", children: featureData.map((category, categoryIndex) => (_jsxs("div", { children: [_jsx("div", { className: "p-3 font-bold bg-muted/30", children: category.category }), _jsx("div", { className: "divide-y", children: category.features.map((feature, featureIndex) => {
                                        const value = getPlanValue(feature, selectedPlan.title.toLowerCase());
                                        return (_jsxs("div", { className: "p-3 flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: feature.name }), feature.description && (_jsx("div", { className: "text-muted-foreground text-xs mt-1", children: feature.description }))] }), _jsx("div", { className: "ml-3", children: renderFeatureValue(value) })] }, `${categoryIndex}-${featureIndex}`));
                                    }) })] }, categoryIndex))) }), _jsx("div", { className: "p-4 border-t", children: _jsx(Button, { variant: selectedPlan.buttonVariant, className: "w-full", onClick: () => handlePlanSelect(selectedPlan.priceId, selectedPlan.title), children: selectedPlan.buttonText }) })] })] }));
};
function renderFeatureValue(value) {
    if (typeof value === "boolean") {
        return value ? (_jsx(Check, { className: "mx-auto h-5 w-5 text-green-500" })) : (_jsx(X, { className: "mx-auto h-5 w-5 text-muted-foreground" }));
    }
    if (value === "Basic") {
        return (_jsx(Badge, { variant: "outline", className: "bg-blue-50", children: "Basic" }));
    }
    if (value === "Advanced" || value === "Full access") {
        return (_jsx(Badge, { variant: "outline", className: "bg-green-50 border-green-200 text-green-700", children: "Advanced" }));
    }
    if (value.includes("Enterprise") ||
        value.includes("Custom") ||
        value === "Full access" ||
        value === "All channels" ||
        value.includes("24/7")) {
        return (_jsx(Badge, { className: "bg-purple-100 text-purple-800 hover:bg-purple-100", children: value }));
    }
    if (value.includes("Limited")) {
        return (_jsx(Badge, { variant: "outline", className: "bg-amber-50 border-amber-200 text-amber-700", children: value }));
    }
    return _jsx("span", { className: "text-sm", children: value });
}
function getPlanValue(feature, planName) {
    return feature[planName];
}
function handlePlanSelect(priceId, planName) {
    if (!priceId) {
        // For Enterprise plan
        window.location.href = "/signup";
        return;
    }
    // For plans with priceId
    // You would trigger the Stripe checkout here
    console.log(`Selected plan: ${planName} with priceId: ${priceId}`);
}
export default PlanComparisonTable;
