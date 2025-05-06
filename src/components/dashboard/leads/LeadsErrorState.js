"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsErrorState = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var alert_1 = require("@/components/ui/alert");
var button_1 = require("@/components/ui/button");
var LeadsErrorState = function (_a) {
  var onRetry = _a.onRetry;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)(alert_1.Alert, {
        variant: "destructive",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
            className: "h-4 w-4",
          }),
          (0, jsx_runtime_1.jsx)(alert_1.AlertTitle, {
            children: "Error loading leads",
          }),
          (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, {
            children:
              "There was a problem loading your leads data. Please try refreshing the page or contact support.",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(button_1.Button, {
        onClick: onRetry,
        children: "Retry",
      }),
    ],
  });
};
exports.LeadsErrorState = LeadsErrorState;
