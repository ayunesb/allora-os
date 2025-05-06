"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SocialMediaCalendar;
var jsx_runtime_1 = require("react/jsx-runtime");
var SocialMediaContext_1 = require("@/context/SocialMediaContext");
var SocialMediaContent_1 = require("./calendar/SocialMediaContent");
var react_error_boundary_1 = require("react-error-boundary");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var AccessibilityContext_1 = require("@/context/AccessibilityContext");
function SocialMediaCalendar() {
  var screenReaderFriendly = (0, AccessibilityContext_1.useAccessibility)()
    .screenReaderFriendly;
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsx)(sonner_1.Toaster, {
        position: "top-right",
        closeButton: true,
        richColors: true,
      }),
      (0, jsx_runtime_1.jsx)(react_error_boundary_1.ErrorBoundary, {
        FallbackComponent: function (_a) {
          var error = _a.error,
            resetErrorBoundary = _a.resetErrorBoundary;
          return (0, jsx_runtime_1.jsx)(card_1.Card, {
            className: "w-full",
            children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
              className: "p-6 text-center space-y-4",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
                  className: "h-12 w-12 mx-auto text-destructive",
                  "aria-hidden": "true",
                }),
                (0, jsx_runtime_1.jsx)("h3", {
                  className: "text-lg font-medium text-destructive",
                  children: "Something went wrong",
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-sm text-muted-foreground",
                  children: error.message,
                }),
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  onClick: resetErrorBoundary,
                  "aria-label": screenReaderFriendly
                    ? "Try again to load social media calendar"
                    : undefined,
                  children: "Try again",
                }),
              ],
            }),
          });
        },
        children: (0, jsx_runtime_1.jsx)(
          SocialMediaContext_1.SocialMediaProvider,
          {
            children: (0, jsx_runtime_1.jsx)("div", {
              role: "region",
              "aria-label": screenReaderFriendly
                ? "Social Media Calendar"
                : undefined,
              className: "social-media-calendar",
              children: (0, jsx_runtime_1.jsx)(
                SocialMediaContent_1.SocialMediaContent,
                {},
              ),
            }),
          },
        ),
      }),
    ],
  });
}
