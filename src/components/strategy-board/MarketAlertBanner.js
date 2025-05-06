"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MarketAlertBanner;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var TrendReportModal_1 = require("./TrendReportModal");
function MarketAlertBanner(_a) {
  var alerts = _a.alerts,
    onDismiss = _a.onDismiss;
  var _b = (0, react_1.useState)(false),
    trendReportOpen = _b[0],
    setTrendReportOpen = _b[1];
  var _c = (0, react_1.useState)(null),
    selectedAlert = _c[0],
    setSelectedAlert = _c[1];
  if (!alerts || alerts.length === 0) return null;
  var openTrendReport = function (alert) {
    setSelectedAlert(alert);
    setTrendReportOpen(true);
  };
  var closeTrendReport = function () {
    setTrendReportOpen(false);
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "mb-6 animate-fadeIn",
    children: [
      alerts.map(function (alert) {
        return (0, jsx_runtime_1.jsxs)(
          "div",
          {
            className:
              "relative flex items-center gap-3 p-4 bg-amber-900/20 border border-amber-800/30 rounded-lg text-amber-100",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Bell, {
                className: "h-5 w-5 text-amber-400 flex-shrink-0 animate-pulse",
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex-1",
                children: [
                  (0, jsx_runtime_1.jsxs)("p", {
                    className: "font-medium",
                    children: ["\uD83D\uDD14 Market Alert: ", alert.message],
                  }),
                  alert.affectedStrategies &&
                    alert.affectedStrategies.length > 0 &&
                    (0, jsx_runtime_1.jsxs)("p", {
                      className: "text-sm text-amber-300/70 mt-1",
                      children: [
                        "Affected strategies: ",
                        alert.affectedStrategies.join(", "),
                      ],
                    }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex gap-2 items-center",
                children: [
                  alert.trendReport &&
                    (0, jsx_runtime_1.jsxs)(button_1.Button, {
                      variant: "outline",
                      size: "sm",
                      className:
                        "text-xs border-amber-700 bg-amber-900/30 hover:bg-amber-800/40 text-amber-300",
                      onClick: function () {
                        return openTrendReport(alert);
                      },
                      children: [
                        "View AI Trend Report",
                        (0, jsx_runtime_1.jsx)(lucide_react_1.ExternalLink, {
                          className: "ml-1 h-3 w-3",
                        }),
                      ],
                    }),
                  onDismiss &&
                    (0, jsx_runtime_1.jsxs)(button_1.Button, {
                      variant: "ghost",
                      size: "sm",
                      className:
                        "text-amber-300 hover:text-amber-100 hover:bg-amber-950/50 h-8 w-8 p-0",
                      onClick: function () {
                        return onDismiss(alert.id);
                      },
                      children: [
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "sr-only",
                          children: "Dismiss",
                        }),
                        (0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, {
                          className: "h-5 w-5",
                        }),
                      ],
                    }),
                ],
              }),
            ],
          },
          alert.id,
        );
      }),
      (0, jsx_runtime_1.jsx)(TrendReportModal_1.default, {
        isOpen: trendReportOpen,
        onClose: closeTrendReport,
        trendData:
          selectedAlert === null || selectedAlert === void 0
            ? void 0
            : selectedAlert.trendReport,
      }),
    ],
  });
}
