"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationStatusContent = VerificationStatusContent;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var alert_1 = require("@/components/ui/alert");
function VerificationStatusContent(_a) {
  var status = _a.status;
  if (status === "verified") {
    return (0, jsx_runtime_1.jsxs)(alert_1.Alert, {
      className: "bg-green-50 border-green-200",
      children: [
        (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
          className: "h-4 w-4 text-green-500",
        }),
        (0, jsx_runtime_1.jsx)(alert_1.AlertTitle, {
          className: "text-green-700",
          children: "Success!",
        }),
        (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, {
          className: "text-green-600",
          children:
            "Your email has been verified. You'll be redirected to the dashboard.",
        }),
      ],
    });
  }
  return (0, jsx_runtime_1.jsxs)(alert_1.Alert, {
    variant: "destructive",
    children: [
      (0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, { className: "h-4 w-4" }),
      (0, jsx_runtime_1.jsx)(alert_1.AlertTitle, {
        children: "Verification Failed",
      }),
      (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, {
        children:
          "There was a problem verifying your email. Please try again or contact support.",
      }),
    ],
  });
}
