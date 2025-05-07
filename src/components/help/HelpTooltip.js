import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
import { HelpCircle, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
export function HelpTooltip({ content, className, side = "top", align = "center", children, icon = true, }) {
    return (_jsx(TooltipProvider, { children: _jsxs(Tooltip, { delayDuration: 300, children: [_jsx(TooltipTrigger, { asChild: true, children: _jsxs("span", { className: cn("inline-flex items-center", className), children: [children, icon && (_jsx(HelpCircle, { className: "ml-1 h-3.5 w-3.5 text-muted-foreground cursor-help" }))] }) }), _jsx(TooltipContent, { side: side, align: align, className: "max-w-xs text-sm", children: content })] }) }));
}
export function DocumentationLink({ href, label }) {
    return (_jsxs("a", { href: href, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center text-primary hover:underline text-sm", children: [_jsx("span", { children: label }), _jsx(ExternalLink, { className: "ml-1 h-3 w-3" })] }));
}
