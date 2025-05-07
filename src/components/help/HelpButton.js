import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { useHelp } from "@/context/HelpContext";
import { getHelpContent } from "@/utils/help/helpContent";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
export function HelpButton({ contextId, variant = "outline", size = "sm", tooltipText, className = "", showTooltip = true, }) {
    const { openHelp, setCurrentHelp } = useHelp();
    const handleClick = () => {
        const helpContent = getHelpContent(contextId);
        if (helpContent) {
            setCurrentHelp(helpContent);
            openHelp();
        }
    };
    const button = (_jsxs(Button, { variant: variant === "premium"
            ? "default"
            : variant === "text"
                ? "link"
                : variant === "icon"
                    ? "ghost"
                    : variant, size: size, className: `gap-1 ${className}`, "aria-label": `Get help for ${contextId}`, onClick: handleClick, children: [_jsx(HelpCircle, { className: "h-4 w-4" }), variant !== "icon" && "Help"] }));
    if (showTooltip && tooltipText) {
        return (_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: button }), _jsx(TooltipContent, { children: _jsx("p", { children: tooltipText }) })] }) }));
    }
    return button;
}
