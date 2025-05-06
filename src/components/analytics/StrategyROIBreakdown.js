import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const StrategyROIBreakdown = ({ data, isLoading = false }) => {
    if (isLoading) {
        return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Strategy ROI Breakdown" }) }), _jsx(CardContent, { children: _jsx("p", { children: "Loading ROI data..." }) })] }));
    }
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Strategy ROI Breakdown" }) }), _jsx(CardContent, { children: _jsx("p", { children: "Strategy ROI metrics will be displayed here" }) })] }));
};
export default StrategyROIBreakdown;
