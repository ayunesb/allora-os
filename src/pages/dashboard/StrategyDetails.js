import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { PageErrorBoundary } from "@/components/errorHandling/PageErrorBoundary";
import StrategyImplementationTools from "@/components/strategy-implementation/StrategyImplementationTools";
export default function StrategyDetails() {
    const { id } = useParams();
    return (_jsxs(PageErrorBoundary, { pageName: "Strategy Details", children: [_jsx(Helmet, { children: _jsx("title", { children: "Strategy Details | Allora AI" }) }), _jsxs("div", { className: "space-y-6", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Strategy Details" }), _jsx(Card, { children: _jsx(CardContent, { className: "pt-6", children: id ? (_jsx(StrategyImplementationTools, { strategyId: id })) : (_jsx("p", { className: "text-muted-foreground", children: "Strategy not found" })) }) })] })] }));
}
