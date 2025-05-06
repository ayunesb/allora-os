"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProductionDataAlert;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var alert_1 = require("@/components/ui/alert");
var useProductionData_1 = require("@/hooks/useProductionData");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
function ProductionDataAlert() {
  var _a = (0, react_1.useState)(true),
    showAlert = _a[0],
    setShowAlert = _a[1];
  var _b = (0, useProductionData_1.useProductionData)(),
    isProductionReady = _b.isProductionReady,
    isProductionMode = _b.isProductionMode,
    validateProductionData = _b.validateProductionData,
    forceProductionMode = _b.forceProductionMode;
  var navigate = (0, react_router_dom_1.useNavigate)();
  // Check if the alert has been dismissed before
  (0, react_1.useEffect)(function () {
    var isDismissed = localStorage.getItem("production-alert-dismissed");
    if (isDismissed === "true") {
      setShowAlert(false);
    }
  }, []);
  var handleDismiss = function () {
    localStorage.setItem("production-alert-dismissed", "true");
    setShowAlert(false);
  };
  var handleSetupProduction = function () {
    navigate("/admin/launch-verification");
  };
  var handleForceProduction = function () {
    forceProductionMode(true);
    setShowAlert(false);
  };
  if (!showAlert || isProductionMode) {
    return null;
  }
  return (0, jsx_runtime_1.jsx)(alert_1.Alert, {
    variant: isProductionReady ? "default" : "destructive",
    className: isProductionReady
      ? "border-risk-low-light bg-risk-low-light/20 text-risk-low-DEFAULT dark:text-risk-low-dark"
      : "border-amber-300 bg-amber-50 text-amber-900",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "flex justify-between items-center",
      children: [
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex items-start gap-3",
          children: [
            isProductionReady
              ? (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, {
                  className: "h-5 w-5 text-green-500 mt-0.5",
                })
              : (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
                  className: "h-5 w-5 text-amber-600 mt-0.5",
                }),
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)(alert_1.AlertTitle, {
                  className: isProductionReady
                    ? "text-risk-low-DEFAULT dark:text-risk-low-dark"
                    : "text-amber-800",
                  children: isProductionReady
                    ? "Ready for Production"
                    : "Development Environment",
                }),
                (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, {
                  className: isProductionReady
                    ? "text-risk-low-DEFAULT/80 dark:text-risk-low-dark/80 mt-1"
                    : "text-amber-700 mt-1",
                  children: isProductionReady
                    ? "Your data is validated and ready for production use."
                    : "You're viewing demo data. Set up production data before going live.",
                }),
              ],
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex gap-2",
          children: [
            !isProductionReady &&
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                variant: "outline",
                size: "sm",
                onClick: handleSetupProduction,
                className:
                  "border-amber-400 bg-amber-100 hover:bg-amber-200 text-amber-900",
                children: "Setup Production",
              }),
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              variant: "outline",
              size: "sm",
              onClick: handleForceProduction,
              className:
                "border-green-400 bg-green-100 hover:bg-green-200 text-green-900",
              children: "Use Real Data",
            }),
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              variant: "ghost",
              size: "sm",
              onClick: handleDismiss,
              className: "text-amber-900 hover:bg-amber-100",
              children: "Dismiss",
            }),
          ],
        }),
      ],
    }),
  });
}
