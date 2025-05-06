import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";
export default function LearningInsights() {
    return (_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs(CardTitle, { className: "text-xl flex items-center", children: [_jsx(Brain, { className: "mr-2 h-5 w-5 text-primary" }), "Learning Insights"] }) }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-muted-foreground text-sm", children: "Based on your recent interactions, we've identified potential areas for growth in your marketing strategy and customer engagement approach." }), _jsxs("div", { className: "mt-4 space-y-3", children: [_jsxs("div", { className: "p-3 bg-primary/10 rounded-md", children: [_jsx("h4", { className: "font-medium text-sm", children: "Content Marketing" }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Your audience engages 2.5x more with video content compared to written posts." })] }), _jsxs("div", { className: "p-3 bg-primary/10 rounded-md", children: [_jsx("h4", { className: "font-medium text-sm", children: "Lead Response Time" }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Responding within 1 hour increases conversion rate by 37% based on your data." })] })] })] })] }));
}
// Export the component as a named export as well for backward compatibility
export { LearningInsights };
