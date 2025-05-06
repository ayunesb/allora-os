import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { useCeoSelection } from "@/hooks/useCeoSelection";
import { useCeoMessage } from "@/hooks/useCeoMessage";
import { createAuthCompatibilityLayer } from "@/utils/authCompatibility";
export function CeoMessageContent({ riskAppetite }) {
    var _a, _b, _c;
    const authContext = useAuth();
    const auth = createAuthCompatibilityLayer(authContext);
    const { selectedCeo } = useCeoSelection();
    const { message, isLoading } = useCeoMessage(riskAppetite, ((_a = auth.profile) === null || _a === void 0 ? void 0 : _a.industry) || undefined, ((_b = auth.profile) === null || _b === void 0 ? void 0 : _b.company) || undefined);
    const companyName = ((_c = auth.profile) === null || _c === void 0 ? void 0 : _c.company) || "Your Company";
    if (isLoading) {
        return (_jsxs("div", { className: "animate-pulse space-y-4", children: [_jsx("div", { className: "h-4 bg-muted rounded w-3/4" }), _jsx("div", { className: "h-4 bg-muted rounded w-full" }), _jsx("div", { className: "h-4 bg-muted rounded w-5/6" }), _jsx("div", { className: "h-4 bg-muted rounded w-3/4" })] }));
    }
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "prose prose-sm dark:prose-invert max-w-none", children: [_jsx("p", { className: "text-base", children: message.greeting }), _jsx("p", { children: message.strategicOverview }), _jsx("div", { className: "my-4 flex flex-wrap gap-2", children: message.tags.map((tag, index) => (_jsx(Badge, { variant: "outline", className: "bg-background/50", children: tag }, index))) }), _jsx("p", { children: message.actionSteps }), _jsx("p", { children: message.closingStatement })] }), _jsx("div", { className: "pt-4 border-t border-border/40", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm font-medium", children: selectedCeo.name }), _jsxs("span", { className: "text-xs text-muted-foreground", children: ["Virtual CEO for ", companyName] })] }), _jsx("div", { className: "text-xs text-muted-foreground", children: new Date().toLocaleDateString() })] }) })] }));
}
