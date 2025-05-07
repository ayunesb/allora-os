import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
export function HelpTooltip({ content, className, iconClassName, side = "top", align = "center", children, }) {
    return (_jsx(TooltipProvider, { children: _jsxs(Tooltip, { delayDuration: 300, children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx("span", { className: cn("inline-flex items-center", className), children: children || (_jsx(HelpCircle, { className: cn("h-4 w-4 text-muted-foreground cursor-help", iconClassName), "aria-hidden": "true" })) }) }), _jsx(TooltipContent, { side: side, align: align, className: "max-w-[280px] text-xs", children: content })] }) }));
}
