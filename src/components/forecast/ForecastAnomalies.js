import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
const ForecastAnomalies = ({ anomalies, recommendations, kpiNames }) => {
    if (anomalies.length === 0) {
        return null;
    }
    return (_jsxs(Card, { className: "border-red-500/20 bg-red-500/5", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2 text-red-500", children: [_jsx(AlertTriangle, {}), _jsx("span", { children: "Anomalies Detected" })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: anomalies.map((anomaly) => (_jsxs(Alert, { variant: anomaly.severity === "critical" ? "destructive" : "warning", children: [_jsxs(AlertTitle, { className: "flex items-center gap-2", children: [anomaly.issue === "Too High" ? (_jsx(TrendingUp, { className: "h-4 w-4" })) : (_jsx(TrendingDown, { className: "h-4 w-4" })), _jsx("span", { className: "capitalize", children: kpiNames[anomaly.kpi] || anomaly.kpi }), _jsx(Badge, { variant: anomaly.severity === "critical" ? "destructive" : "outline", children: anomaly.severity })] }), _jsxs(AlertDescription, { children: [_jsxs("p", { children: ["Current forecast: ", anomaly.value.toFixed(2)] }), _jsxs("p", { children: ["Issue: ", anomaly.issue] }), recommendations[anomaly.kpi] && (_jsxs("p", { className: "mt-2 text-sm font-medium", children: ["Recommendation: ", recommendations[anomaly.kpi]] }))] })] }, anomaly.kpi))) }) })] }));
};
export default ForecastAnomalies;
