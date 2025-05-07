import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const CampaignConversionMetrics = ({ data, isLoading = false }) => {
    if (isLoading) {
        return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Campaign Conversion Metrics" }) }), _jsx(CardContent, { children: _jsx("p", { children: "Loading campaign conversion data..." }) })] }));
    }
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Campaign Conversion Metrics" }) }), _jsx(CardContent, { children: _jsx("p", { children: "Campaign conversion metrics will be displayed here" }) })] }));
};
export default CampaignConversionMetrics;
