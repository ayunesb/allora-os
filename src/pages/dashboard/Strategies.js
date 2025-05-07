import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useBreakpoint } from "@/hooks/use-mobile";
import { PageErrorBoundary } from "@/components/errorHandling/PageErrorBoundary";
import { HelpButton } from "@/components/help/HelpButton";
import StrategyBoard from "@/components/strategy-board/StrategyBoard";
export default function Strategies() {
    const breakpoint = useBreakpoint();
    const isMobileView = ["xs", "mobile"].includes(breakpoint);
    return (_jsx(PageErrorBoundary, { pageName: "Strategies", children: _jsxs("div", { className: isMobileView ? "px-0 -mx-4" : "", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Business Strategies" }), _jsx(HelpButton, { contextId: "strategies", variant: "text" })] }), _jsx(StrategyBoard, {})] }) }));
}
