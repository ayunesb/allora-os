import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
export default function StrategyInsightsPreview({ analysis, isLoading = false, }) {
    if (isLoading) {
        return (_jsx(Card, { className: "w-full h-[300px] flex items-center justify-center", children: _jsx("div", { className: "animate-pulse", children: "Loading strategy insights..." }) }));
    }
    if (!analysis) {
        return null;
    }
    return (_jsxs(Card, { className: "w-full", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Strategy Insights" }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium mb-2", children: "Key Strengths" }), _jsx("ul", { className: "list-disc pl-5 space-y-1", children: analysis.strengths.slice(0, 3).map((strength, index) => (_jsx("li", { className: "text-sm text-muted-foreground", children: strength }, index))) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium mb-2", children: "Potential Challenges" }), _jsx("ul", { className: "list-disc pl-5 space-y-1", children: analysis.weaknesses.slice(0, 3).map((weakness, index) => (_jsx("li", { className: "text-sm text-muted-foreground", children: weakness }, index))) })] }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsxs("div", { className: "flex-1 min-w-[140px]", children: [_jsx("h3", { className: "text-sm font-medium mb-2", children: "Complexity" }), _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-full bg-secondary h-2 rounded-full", children: _jsx("div", { className: "bg-primary h-2 rounded-full", style: {
                                                        width: `${analysis.implementationComplexity.score}%`,
                                                    } }) }), _jsxs("span", { className: "ml-2 text-xs font-medium", children: [analysis.implementationComplexity.score, "%"] })] })] }), _jsxs("div", { className: "flex-1 min-w-[140px]", children: [_jsx("h3", { className: "text-sm font-medium mb-2", children: "Competitive Edge" }), _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-full bg-secondary h-2 rounded-full", children: _jsx("div", { className: "bg-green-500 h-2 rounded-full", style: { width: `${analysis.competitiveAdvantage.score}%` } }) }), _jsxs("span", { className: "ml-2 text-xs font-medium", children: [analysis.competitiveAdvantage.score, "%"] })] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium mb-2", children: "Key Insights" }), _jsx("div", { className: "space-y-2", children: analysis.insights.slice(0, 2).map((insight) => (_jsxs("div", { className: "flex items-start space-x-2", children: [_jsx(Badge, { variant: insight.type === "positive"
                                                ? "default"
                                                : insight.type === "negative"
                                                    ? "destructive"
                                                    : "outline", className: "mt-0.5", children: insight.type === "positive"
                                                ? "Pro"
                                                : insight.type === "negative"
                                                    ? "Con"
                                                    : "Note" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium", children: insight.title }), _jsx("p", { className: "text-xs text-muted-foreground", children: insight.description })] })] }, insight.id))) })] })] })] }));
}
