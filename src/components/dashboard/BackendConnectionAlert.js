"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var alert_1 = require("@/components/ui/alert");
var button_1 = require("@/components/ui/button");
var appConfig_1 = require("@/config/appConfig");
var BackendConnectionAlert = function (_a) {
  var children = _a.children,
    _b = _a.variant,
    variant = _b === void 0 ? "info" : _b,
    _c = _a.size,
    size = _c === void 0 ? "medium" : _c;
  // Only show this alert when we're using fallback values
  if (!appConfig_1.SUPABASE_CONFIG.usingFallback) return null;
  return (0, jsx_runtime_1.jsxs)(alert_1.Alert, {
    variant: "warning",
    className: "mb-4",
    children: [
      (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
        className: "h-4 w-4",
      }),
      (0, jsx_runtime_1.jsx)(alert_1.AlertTitle, {
        children: "Backend Connection Issue",
      }),
      (0, jsx_runtime_1.jsxs)(alert_1.AlertDescription, {
        children: [
          (0, jsx_runtime_1.jsx)("p", {
            className: "mb-2",
            children:
              "The application is running with limited functionality because it couldn't connect to the backend services.",
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "flex space-x-2 mt-2",
            children: (0, jsx_runtime_1.jsx)(button_1.Button, {
              size: "sm",
              variant: "outline",
              asChild: true,
              children: (0, jsx_runtime_1.jsx)("a", {
                href: "https://docs.lovable.dev/integrations/supabase/",
                target: "_blank",
                rel: "noopener noreferrer",
                children: "Setup Guide",
              }),
            }),
          }),
        ],
      }),
    ],
  });
};
