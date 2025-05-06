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
import { ThumbsUp, ThumbsDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallScriptTracking } from "@/hooks/useCallScriptTracking";
export default function AiCallScriptFeedback({ id, title, type, primaryBot }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { trackScriptFeedback } = useCallScriptTracking();
    const handleFeedback = (isPositive) => __awaiter(this, void 0, void 0, function* () {
        setIsSubmitting(true);
        try {
            yield trackScriptFeedback(id, title, type, isPositive, primaryBot);
        }
        catch (error) {
            console.error("Error submitting feedback:", error);
        }
        finally {
            setIsSubmitting(false);
        }
    });
    return (_jsxs("div", { className: "flex items-center justify-end space-x-2 mt-2", children: [_jsx("span", { className: "text-xs text-muted-foreground mr-1", children: "Helpful?" }), _jsx(Button, { variant: "outline", size: "sm", className: "h-7 w-7 p-0", onClick: () => handleFeedback(true), disabled: isSubmitting, children: isSubmitting ? (_jsx(Loader2, { className: "h-3 w-3 animate-spin" })) : (_jsx(ThumbsUp, { className: "h-3 w-3" })) }), _jsx(Button, { variant: "outline", size: "sm", className: "h-7 w-7 p-0", onClick: () => handleFeedback(false), disabled: isSubmitting, children: isSubmitting ? (_jsx(Loader2, { className: "h-3 w-3 animate-spin" })) : (_jsx(ThumbsDown, { className: "h-3 w-3" })) })] }));
}
