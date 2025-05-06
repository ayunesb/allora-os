import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitBranch } from "lucide-react";
export default function StrategyDisplay() {
    return (_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs(CardTitle, { className: "text-xl flex items-center", children: [_jsx(GitBranch, { className: "mr-2 h-5 w-5 text-primary" }), "Strategy Overview"] }) }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-muted-foreground text-sm", children: "Your current business strategies are focused on market expansion and customer retention. The AI executive team has provided insights based on your company profile." }), _jsxs("div", { className: "mt-4 space-y-3", children: [_jsxs("div", { className: "p-3 bg-primary/10 rounded-md", children: [_jsx("h4", { className: "font-medium text-sm", children: "Market Penetration" }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Focus on existing markets with current products to increase market share." })] }), _jsxs("div", { className: "p-3 bg-primary/10 rounded-md", children: [_jsx("h4", { className: "font-medium text-sm", children: "Product Development" }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Develop new products for existing markets based on customer feedback." })] })] })] })] }));
}
// Export the component as a named export as well for backward compatibility
export { StrategyDisplay };
