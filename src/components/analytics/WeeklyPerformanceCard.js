import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const WeeklyPerformanceCard = ({ data, isLoading = false }) => {
    if (isLoading) {
        return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Weekly Performance" }) }), _jsx(CardContent, { children: _jsx("p", { children: "Loading weekly performance data..." }) })] }));
    }
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Weekly Performance" }) }), _jsx(CardContent, { children: _jsx("p", { children: "Weekly performance metrics will be displayed here" }) })] }));
};
export default WeeklyPerformanceCard;
