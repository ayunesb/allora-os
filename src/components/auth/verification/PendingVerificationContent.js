"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PendingVerificationContent = PendingVerificationContent;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var alert_1 = require("@/components/ui/alert");
function PendingVerificationContent(_a) {
  var onResendEmail = _a.onResendEmail,
    isResending = _a.isResending,
    timeLeft = _a.timeLeft;
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsxs)(alert_1.Alert, {
        className: "bg-muted",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
            className: "h-4 w-4",
          }),
          (0, jsx_runtime_1.jsx)(alert_1.AlertTitle, {
            children: "Check your email",
          }),
          (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, {
            children:
              "Please check your email inbox and click the verification link to complete your registration.",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "text-sm text-muted-foreground text-center",
        children:
          "If you don't see the email, check your spam folder or try logging in anyway - email verification may be disabled in development.",
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "flex justify-center",
        children: (0, jsx_runtime_1.jsx)(button_1.Button, {
          variant: "outline",
          size: "sm",
          onClick: onResendEmail,
          disabled: isResending || (timeLeft !== null && timeLeft > 0),
          className: "flex items-center gap-1",
          children: isResending
            ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                    className: "h-4 w-4 animate-spin",
                  }),
                  "Sending...",
                ],
              })
            : timeLeft !== null && timeLeft > 0
              ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                      className: "h-4 w-4",
                    }),
                    "Resend in ",
                    timeLeft,
                    "s",
                  ],
                })
              : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                      className: "h-4 w-4",
                    }),
                    "Resend verification email",
                  ],
                }),
        }),
      }),
    ],
  });
}
