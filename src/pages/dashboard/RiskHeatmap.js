"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RiskHeatmap;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var page_title_1 = require("@/components/ui/page-title");
var card_1 = require("@/components/ui/card");
var tabs_1 = require("@/components/ui/tabs");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var RiskHeatmapChart_1 = require("@/components/risk/RiskHeatmapChart");
// import RiskFactorsList from "@/components/risk/RiskFactorsList";
var RiskMitigationTable_1 = require("@/components/risk/RiskMitigationTable");
var useRiskData_1 = require("@/hooks/useRiskData");
var data = {
  riskData: [],
  isLoading: false,
  error: null,
  refreshData: function () {
    return console.log("Refreshing data");
  },
};
function RiskHeatmap() {
  var _a = (0, react_1.useState)("heatmap"),
    activeTab = _a[0],
    setActiveTab = _a[1];
  var _b = (0, useRiskData_1.useRiskData)(),
    riskData = _b.riskData,
    isLoading = _b.isLoading,
    error = _b.error,
    refreshData = _b.refreshData;
  (0, react_1.useEffect)(
    function () {
      // Load risk data on component mount
      refreshData();
    },
    [refreshData],
  );
  var handleExportData = function () {
    // Implementation for exporting risk data
    console.log("Exporting risk data...");
    // Create a JSON blob and trigger download
    var dataStr = JSON.stringify(riskData, null, 2);
    var blob = new Blob([dataStr], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "risk-heatmap-".concat(
      new Date().toISOString().split("T")[0],
      ".json",
    );
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto p-4",
    children: [
      (0, jsx_runtime_1.jsx)(page_title_1.PageTitle, {
        title: "Risk Heatmap",
        description: "Visualize risk factors across your strategies",
        children: "Risk Heatmap",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex justify-between items-center mb-6",
        children: [
          (0, jsx_runtime_1.jsx)(tabs_1.Tabs, {
            value: activeTab,
            onValueChange: setActiveTab,
            className: "w-full",
            children: (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
              children: [
                (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                  value: "heatmap",
                  children: "Heatmap",
                }),
                (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                  value: "factors",
                  children: "Risk Factors",
                }),
                (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                  value: "mitigation",
                  children: "Mitigation Plans",
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex gap-2",
            children: [
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "outline",
                size: "sm",
                onClick: refreshData,
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                    className: "h-4 w-4 mr-2",
                  }),
                  "Refresh",
                ],
              }),
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "outline",
                size: "sm",
                onClick: handleExportData,
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Download, {
                    className: "h-4 w-4 mr-2",
                  }),
                  "Export",
                ],
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
            children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              children: "Risk Analysis",
            }),
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
            children: [
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "heatmap",
                className: "mt-0",
                children: isLoading
                  ? (0, jsx_runtime_1.jsx)("div", {
                      className: "flex justify-center items-center h-80",
                      children: (0, jsx_runtime_1.jsx)(
                        lucide_react_1.RefreshCw,
                        {
                          className:
                            "h-8 w-8 animate-spin text-muted-foreground",
                        },
                      ),
                    })
                  : error
                    ? (0, jsx_runtime_1.jsxs)("div", {
                        className: "text-center text-red-500 p-4",
                        children: ["Error loading risk data: ", error],
                      })
                    : (0, jsx_runtime_1.jsx)(RiskHeatmapChart_1.default, {
                        data:
                          (riskData === null || riskData === void 0
                            ? void 0
                            : riskData.heatmapData) || [],
                      }),
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "factors",
                className: "mt-0",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "mitigation",
                className: "mt-0",
                children: (0, jsx_runtime_1.jsx)(
                  RiskMitigationTable_1.default,
                  {
                    plans:
                      (riskData === null || riskData === void 0
                        ? void 0
                        : riskData.mitigationPlans) || [],
                    isLoading: isLoading,
                  },
                ),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
