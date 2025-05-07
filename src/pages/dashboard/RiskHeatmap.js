import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { PageTitle } from "@/components/ui/page-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";
import RiskHeatmapChart from "@/components/risk/RiskHeatmapChart";
// import RiskFactorsList from "@/components/risk/RiskFactorsList";
import RiskMitigationTable from "@/components/risk/RiskMitigationTable";
import { useRiskData } from "@/hooks/useRiskData";
const data = {
    riskData: [],
    isLoading: false,
    error: null,
    refreshData: () => console.log("Refreshing data"),
};
export default function RiskHeatmap() {
    const [activeTab, setActiveTab] = useState("heatmap");
    const { riskData, isLoading, error, refreshData } = useRiskData();
    useEffect(() => {
        // Load risk data on component mount
        refreshData();
    }, [refreshData]);
    const handleExportData = () => {
        // Implementation for exporting risk data
        console.log("Exporting risk data...");
        // Create a JSON blob and trigger download
        const dataStr = JSON.stringify(riskData, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `risk-heatmap-${new Date().toISOString().split("T")[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    return (_jsxs("div", { className: "container mx-auto p-4", children: [_jsx(PageTitle, { title: "Risk Heatmap", description: "Visualize risk factors across your strategies", children: "Risk Heatmap" }), _jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: _jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "heatmap", children: "Heatmap" }), _jsx(TabsTrigger, { value: "factors", children: "Risk Factors" }), _jsx(TabsTrigger, { value: "mitigation", children: "Mitigation Plans" })] }) }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: refreshData, children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2" }), "Refresh"] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: handleExportData, children: [_jsx(Download, { className: "h-4 w-4 mr-2" }), "Export"] })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Risk Analysis" }) }), _jsxs(CardContent, { children: [_jsx(TabsContent, { value: "heatmap", className: "mt-0", children: isLoading ? (_jsx("div", { className: "flex justify-center items-center h-80", children: _jsx(RefreshCw, { className: "h-8 w-8 animate-spin text-muted-foreground" }) })) : error ? (_jsxs("div", { className: "text-center text-red-500 p-4", children: ["Error loading risk data: ", error] })) : (_jsx(RiskHeatmapChart, { data: (riskData === null || riskData === void 0 ? void 0 : riskData.heatmapData) || [] })) }), _jsx(TabsContent, { value: "factors", className: "mt-0" }), _jsx(TabsContent, { value: "mitigation", className: "mt-0", children: _jsx(RiskMitigationTable, { plans: (riskData === null || riskData === void 0 ? void 0 : riskData.mitigationPlans) || [], isLoading: isLoading }) })] })] })] }));
}
