import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, ArrowRight } from "lucide-react";
import StrategyImplementationTools from "../strategy-implementation/StrategyImplementationTools";
import { useBreakpoint } from "@/hooks/use-mobile";
const StrategyDetailModal = ({ isOpen, onClose, strategy }) => {
    const [activeTab, setActiveTab] = useState("details");
    const breakpoint = useBreakpoint();
    const isMobileView = ["xs", "mobile"].includes(breakpoint);
    if (!strategy)
        return null;
    // Get risk-based classes for styling
    const getRiskClasses = (risk) => {
        switch (risk) {
            case "Low":
                return "bg-risk-low text-risk-low-DEFAULT dark:text-risk-low-dark";
            case "High":
                return "bg-risk-high text-risk-high-DEFAULT dark:text-risk-high-dark";
            case "Medium":
            default:
                return "bg-risk-medium text-risk-medium-DEFAULT dark:text-risk-medium-dark";
        }
    };
    return (_jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: _jsxs(DialogContent, { className: "sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0c0f1f] border-gray-800 text-white", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { className: "text-2xl", children: strategy.title }) }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "mt-4", children: [_jsxs(TabsList, { className: `bg-gray-800/50 ${isMobileView ? "w-full tabs-scrollable" : ""}`, children: [_jsxs(TabsTrigger, { value: "details", className: isMobileView ? "text-xs px-2 py-1 tab-compact" : "", children: [_jsx(FileText, { className: "h-4 w-4 mr-2" }), "Strategy Details"] }), _jsxs(TabsTrigger, { value: "implementation", className: isMobileView ? "text-xs px-2 py-1 tab-compact" : "", children: [_jsx(ArrowRight, { className: "h-4 w-4 mr-2" }), isMobileView ? "Implementation" : "Implementation Tools"] })] }), _jsx(TabsContent, { value: "details", className: "pt-4", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-gray-300 mb-2", children: "Description" }), _jsx("p", { className: "text-gray-400", children: strategy.description })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "bg-gray-800/50 p-4 rounded-lg", children: [_jsx("h3", { className: "text-sm font-medium text-gray-300 mb-2", children: "Risk Level" }), _jsx("div", { className: "flex items-center", children: _jsxs("span", { className: `px-2 py-1 rounded-full text-xs font-medium ${getRiskClasses(strategy.risk)}`, children: [strategy.risk, " Risk"] }) })] }), _jsxs("div", { className: "bg-gray-800/50 p-4 rounded-lg", children: [_jsx("h3", { className: "text-sm font-medium text-gray-300 mb-2", children: "Proposed By" }), _jsx("div", { className: "text-gray-100", children: strategy.executiveBot || "AI Executive Team" })] }), strategy.impact && (_jsxs("div", { className: "bg-gray-800/50 p-4 rounded-lg", children: [_jsx("h3", { className: "text-sm font-medium text-gray-300 mb-2", children: "Expected Impact" }), _jsx("div", { className: "text-gray-100", children: strategy.impact })] })), strategy.timeframe && (_jsxs("div", { className: "bg-gray-800/50 p-4 rounded-lg", children: [_jsx("h3", { className: "text-sm font-medium text-gray-300 mb-2", children: "Timeframe" }), _jsx("div", { className: "text-gray-100", children: strategy.timeframe })] }))] })] }) }), _jsx(TabsContent, { value: "implementation", children: _jsx(StrategyImplementationTools, { strategyId: strategy.id, strategyName: strategy.title }) })] })] }) }));
};
export default StrategyDetailModal;
