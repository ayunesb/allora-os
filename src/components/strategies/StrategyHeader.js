import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2, Brain } from "lucide-react";
const StrategyHeader = ({ onNewStrategy, isAnyActionPending = false }) => {
    return (_jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8 animate-fadeIn", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(Brain, { className: "h-8 w-8 text-primary mr-3 animate-pulse-slow" }), _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold gradient-text", children: "Business Strategies" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Create and manage strategic plans for your business" })] })] }), _jsx("div", { className: "flex items-center", children: _jsx(Button, { onClick: onNewStrategy, disabled: isAnyActionPending, variant: "gradient", className: "w-full sm:w-auto shadow-lg hover:shadow-primary/20", children: isAnyActionPending ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Please wait"] })) : (_jsxs(_Fragment, { children: [_jsx(PlusCircle, { className: "mr-2 h-4 w-4" }), "New Strategy"] })) }) })] }));
};
export default StrategyHeader;
