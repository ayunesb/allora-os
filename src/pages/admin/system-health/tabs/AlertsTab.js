"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AlertsTab;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var use_toast_1 = require("@/components/ui/use-toast");
var AlertsPanel_1 = require("@/components/monitoring/AlertsPanel");
var monitoring_1 = require("@/utils/monitoring");
function AlertsTab() {
  var toast = (0, use_toast_1.useToast)().toast;
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            children: "System Alerts",
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: "Real-time alerts and notifications",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        children: [
          (0, jsx_runtime_1.jsx)(AlertsPanel_1.default, { maxAlerts: 10 }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "mt-6",
            children: (0, jsx_runtime_1.jsx)(button_1.Button, {
              variant: "outline",
              onClick: function () {
                // Generate test alerts
                monitoring_1.monitoring.triggerAlert(
                  "Test Warning Alert",
                  "This is a test warning alert",
                  "warning",
                  { source: "SystemHealth", test: true },
                );
                monitoring_1.monitoring.triggerAlert(
                  "Test Error Alert",
                  "This is a test error alert",
                  "error",
                  { source: "SystemHealth", test: true },
                );
                toast({
                  title: "Test Alerts Generated",
                  description: "Created test warning and error alerts",
                });
              },
              children: "Generate Test Alert",
            }),
          }),
        ],
      }),
    ],
  });
}
