import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const LeadSourceAnalysis = ({ data, isLoading = false }) => {
    if (isLoading) {
        return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Lead Source Analysis" }) }), _jsx(CardContent, { children: _jsx("p", { children: "Loading lead source data..." }) })] }));
    }
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Lead Source Analysis" }) }), _jsx(CardContent, { children: _jsx("p", { children: "Lead source analysis will be displayed here" }) })] }));
};
export default LeadSourceAnalysis;
