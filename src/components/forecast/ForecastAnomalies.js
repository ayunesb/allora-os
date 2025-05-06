"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var alert_1 = require("@/components/ui/alert");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
var ForecastAnomalies = function (_a) {
  var anomalies = _a.anomalies,
    recommendations = _a.recommendations,
    kpiNames = _a.kpiNames;
  if (anomalies.length === 0) {
    return null;
  }
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "border-red-500/20 bg-red-500/5",
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
          className: "flex items-center gap-2 text-red-500",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {}),
            (0, jsx_runtime_1.jsx)("span", { children: "Anomalies Detected" }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsx)("div", {
          className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
          children: anomalies.map(function (anomaly) {
            return (0, jsx_runtime_1.jsxs)(
              alert_1.Alert,
              {
                variant:
                  anomaly.severity === "critical" ? "destructive" : "warning",
                children: [
                  (0, jsx_runtime_1.jsxs)(alert_1.AlertTitle, {
                    className: "flex items-center gap-2",
                    children: [
                      anomaly.issue === "Too High"
                        ? (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, {
                            className: "h-4 w-4",
                          })
                        : (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingDown, {
                            className: "h-4 w-4",
                          }),
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "capitalize",
                        children: kpiNames[anomaly.kpi] || anomaly.kpi,
                      }),
                      (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                        variant:
                          anomaly.severity === "critical"
                            ? "destructive"
                            : "outline",
                        children: anomaly.severity,
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)(alert_1.AlertDescription, {
                    children: [
                      (0, jsx_runtime_1.jsxs)("p", {
                        children: [
                          "Current forecast: ",
                          anomaly.value.toFixed(2),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("p", {
                        children: ["Issue: ", anomaly.issue],
                      }),
                      recommendations[anomaly.kpi] &&
                        (0, jsx_runtime_1.jsxs)("p", {
                          className: "mt-2 text-sm font-medium",
                          children: [
                            "Recommendation: ",
                            recommendations[anomaly.kpi],
                          ],
                        }),
                    ],
                  }),
                ],
              },
              anomaly.kpi,
            );
          }),
        }),
      }),
    ],
  });
};
exports.default = ForecastAnomalies;
