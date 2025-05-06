"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalErrorBoundary = GlobalErrorBoundary;
var jsx_runtime_1 = require("react/jsx-runtime");
var ErrorBoundary_1 = require("@/components/ErrorBoundary");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
var loggingService_1 = require("@/utils/loggingService");
function GlobalErrorBoundary(_a) {
  var children = _a.children,
    onError = _a.onError,
    fallback = _a.fallback;
  var handleError = function (error, errorInfo) {
    // Log to our centralized logging service
    loggingService_1.logger.error("Global application error:", error, {
      componentStack: errorInfo.componentStack,
      url: window.location.href,
      userAgent: navigator.userAgent,
    });
    // Here you could also integrate with error monitoring services like Sentry
    console.error("Global error caught:", error);
    console.error("Component stack:", errorInfo.componentStack);
    // Call the onError prop if provided
    if (onError) {
      onError(error, errorInfo);
    }
  };
  var GlobalErrorFallback = function (_a) {
    var error = _a.error,
      resetErrorBoundary = _a.resetErrorBoundary;
    return (0, jsx_runtime_1.jsx)("div", {
      className:
        "min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted",
      children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
        className: "w-full max-w-md border-destructive/20",
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
            className: "space-y-1",
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center gap-2",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.AlertOctagon, {
                  className: "h-6 w-6 text-destructive",
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  children: "Application Error",
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
            className: "space-y-4",
            children: [
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children:
                  "We've encountered an unexpected error. Our team has been notified and is working to fix it.",
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className:
                  "bg-muted/50 border border-border p-3 rounded-md overflow-auto max-h-40",
                children: (0, jsx_runtime_1.jsx)("p", {
                  className: "font-mono text-sm",
                  children: error.message || "Unknown error",
                }),
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "bg-card p-4 border border-border rounded-md",
                children: [
                  (0, jsx_runtime_1.jsx)("h3", {
                    className: "text-sm font-medium mb-2",
                    children: "You can try:",
                  }),
                  (0, jsx_runtime_1.jsxs)("ul", {
                    className: "text-sm text-muted-foreground space-y-1",
                    children: [
                      (0, jsx_runtime_1.jsx)("li", {
                        children: "\u2022 Refreshing the page",
                      }),
                      (0, jsx_runtime_1.jsx)("li", {
                        children: "\u2022 Checking your internet connection",
                      }),
                      (0, jsx_runtime_1.jsx)("li", {
                        children: "\u2022 Going back to the home page",
                      }),
                      (0, jsx_runtime_1.jsx)("li", {
                        children: "\u2022 Logging out and back in",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
            className: "flex justify-between",
            children: [
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                variant: "outline",
                asChild: true,
                children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, {
                  to: "/",
                  className: "inline-flex items-center gap-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Home, {
                      className: "h-4 w-4",
                    }),
                    "Home",
                  ],
                }),
              }),
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                onClick: function () {
                  resetErrorBoundary();
                  window.location.reload();
                },
                className: "inline-flex items-center gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                    className: "h-4 w-4",
                  }),
                  "Reload App",
                ],
              }),
            ],
          }),
        ],
      }),
    });
  };
  return (0, jsx_runtime_1.jsx)(ErrorBoundary_1.ErrorBoundary, {
    fallback: fallback
      ? fallback
      : function (_a) {
          var error = _a.error,
            resetErrorBoundary = _a.resetErrorBoundary;
          return (0, jsx_runtime_1.jsx)(GlobalErrorFallback, {
            error: error,
            resetErrorBoundary: resetErrorBoundary,
          });
        },
    onError: handleError,
    children: children,
  });
}
