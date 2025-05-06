import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Eye, MousePointer, CheckCircle, DollarSign, Percent, CreditCard, Activity, } from "lucide-react";
export function MetricCard({ title, value, change, icon, invertChange = false, }) {
    // If invertChange is true, positive changes are bad (like costs increasing)
    const isPositive = invertChange ? change < 0 : change > 0;
    const displayChange = Math.abs(change).toFixed(1);
    const getIcon = () => {
        switch (icon) {
            case "eye":
                return _jsx(Eye, { className: "h-4 w-4" });
            case "mouse-pointer":
                return _jsx(MousePointer, { className: "h-4 w-4" });
            case "check-circle":
                return _jsx(CheckCircle, { className: "h-4 w-4" });
            case "dollar-sign":
                return _jsx(DollarSign, { className: "h-4 w-4" });
            case "percent":
                return _jsx(Percent, { className: "h-4 w-4" });
            case "credit-card":
                return _jsx(CreditCard, { className: "h-4 w-4" });
            case "trending-up":
                return _jsx(TrendingUp, { className: "h-4 w-4" });
            default:
                return _jsx(Activity, { className: "h-4 w-4" });
        }
    };
    return (_jsx(Card, { children: _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsx("span", { className: "text-sm font-medium text-muted-foreground", children: title }), _jsx("span", { className: "p-1 rounded-full bg-muted", children: getIcon() })] }), _jsx("div", { className: "text-2xl font-bold", children: value }), change !== 0 && (_jsxs("div", { className: `flex items-center mt-1 text-xs font-medium ${isPositive ? "text-green-600" : "text-red-600"}`, children: [isPositive ? (_jsx(TrendingUp, { className: "mr-1 h-3 w-3" })) : (_jsx(TrendingDown, { className: "mr-1 h-3 w-3" })), _jsxs("span", { children: [displayChange, "% vs. previous period"] })] }))] }) }));
}
