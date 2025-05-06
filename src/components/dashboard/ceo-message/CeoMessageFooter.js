import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useCeoFeedback } from "@/hooks/useCeoFeedback";
export function CeoMessageFooter() {
    const { provideFeedback, isSubmitting } = useCeoFeedback();
    const handleFeedback = (isPositive) => {
        provideFeedback(isPositive);
    };
    return (_jsxs("div", { className: "px-6 py-4 border-t flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-muted-foreground", children: "Was this message helpful?" }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: () => handleFeedback(true), disabled: isSubmitting, className: "text-green-500 hover:text-green-600 hover:bg-green-100/10", children: [_jsx(ThumbsUp, { className: "mr-1 h-4 w-4" }), "Yes"] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: () => handleFeedback(false), disabled: isSubmitting, className: "text-red-500 hover:text-red-600 hover:bg-red-100/10", children: [_jsx(ThumbsDown, { className: "mr-1 h-4 w-4" }), "No"] })] })] }));
}
