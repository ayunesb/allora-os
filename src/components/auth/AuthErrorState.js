"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthErrorState = AuthErrorState;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var alert_1 = require("@/components/ui/alert");
var button_1 = require("@/components/ui/button");
function AuthErrorState(_a) {
  var error = _a.error,
    onRetry = _a.onRetry,
    isRetrying = _a.isRetrying;
  return (0, jsx_runtime_1.jsx)("div", {
    className: "flex flex-col items-center justify-center min-h-screen p-4",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "max-w-md w-full space-y-4",
      children: [
        (0, jsx_runtime_1.jsxs)(alert_1.Alert, {
          variant: "destructive",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
              className: "h-4 w-4",
            }),
            (0, jsx_runtime_1.jsx)(alert_1.AlertTitle, {
              children: "Authentication Error",
            }),
            (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, {
              children: error,
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)("div", {
          className: "flex justify-center",
          children: (0, jsx_runtime_1.jsx)(button_1.Button, {
            onClick: onRetry,
            disabled: isRetrying,
            className: "flex items-center gap-2",
            children: isRetrying
              ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                      className: "h-4 w-4 animate-spin",
                    }),
                    "Retrying...",
                  ],
                })
              : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                      className: "h-4 w-4",
                    }),
                    "Retry",
                  ],
                }),
          }),
        }),
      ],
    }),
  });
}
