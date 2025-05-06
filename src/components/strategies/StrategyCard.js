import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
import { useBreakpoint } from "@/hooks/use-mobile";
const StrategyCard = ({ strategy, onEdit, onDelete, onView }) => {
    const breakpoint = useBreakpoint();
    const isMobile = breakpoint === "mobile";
    const getRiskColor = (risk) => {
        switch (risk) {
            case "High":
                return "bg-red-500/20 text-red-400";
            case "Medium":
                return "bg-amber-500/20 text-amber-400";
            case "Low":
                return "bg-green-500/20 text-green-400";
            default:
                return "bg-blue-500/20 text-blue-400";
        }
    };
    const handleCardClick = () => {
        if (onView) {
            onView();
        }
    };
    // Use riskLevel property, with fallback to risk_level for backward compatibility
    const riskLevel = strategy.riskLevel || strategy.risk_level || "Medium";
    return (_jsxs("div", { className: "dashboard-card flex flex-col cursor-pointer", "data-testid": `strategy-card-${strategy.id}`, onClick: handleCardClick, children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-3 sm:mb-4", children: [_jsx("h3", { className: "text-lg sm:text-xl font-bold", children: strategy.title }), _jsxs("span", { className: `self-start sm:self-auto px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(riskLevel)}`, children: [riskLevel, " Risk"] })] }), _jsx("p", { className: "text-gray-300 mb-4 sm:mb-6 line-clamp-3", children: strategy.description }), _jsxs("div", { className: "mt-auto flex justify-between", children: [_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", size: isMobile ? "sm" : "sm", onClick: (e) => {
                                            e.stopPropagation();
                                            onEdit(strategy.id);
                                        }, "aria-label": `Edit ${strategy.title}`, children: [_jsx(Edit, { className: "mr-2 h-4 w-4" }), "Edit"] }) }), _jsx(TooltipContent, { children: _jsx("p", { children: "Edit this strategy" }) })] }) }), _jsxs(AlertDialog, { children: [_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(AlertDialogTrigger, { asChild: true, children: _jsxs(Button, { variant: "destructive", size: isMobile ? "sm" : "sm", onClick: (e) => e.stopPropagation(), "aria-label": `Delete ${strategy.title}`, children: [_jsx(Trash2, { className: "mr-2 h-4 w-4" }), "Delete"] }) }) }), _jsx(TooltipContent, { children: _jsx("p", { children: "Delete this strategy" }) })] }) }), _jsxs(AlertDialogContent, { onClick: (e) => e.stopPropagation(), className: "w-full max-w-md mx-4", children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "Are you sure?" }), _jsxs(AlertDialogDescription, { children: ["This action cannot be undone. This will permanently delete your strategy \"", strategy.title, "\"."] })] }), _jsxs(AlertDialogFooter, { className: "flex-col sm:flex-row gap-2 sm:gap-0", children: [_jsx(AlertDialogCancel, { children: "Cancel" }), _jsx(AlertDialogAction, { onClick: (e) => {
                                                    e.stopPropagation();
                                                    onDelete(strategy.id);
                                                }, className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", children: "Delete" })] })] })] })] })] }, strategy.id));
};
export default React.memo(StrategyCard);
