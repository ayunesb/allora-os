import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const PerformanceOverview = ({ data, isLoading = false }) => {
    if (isLoading) {
        return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Performance Overview" }) }), _jsx(CardContent, { children: _jsx("p", { children: "Loading performance data..." }) })] }));
    }
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Performance Overview" }) }), _jsx(CardContent, { children: _jsx("p", { children: "Performance metrics will be displayed here" }) })] }));
};
export default PerformanceOverview;
