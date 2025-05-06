"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthIssue = AuthIssue;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
function AuthIssue(_a) {
  var onSignOut = _a.onSignOut,
    onRefresh = _a.onRefresh;
  return (0, jsx_runtime_1.jsx)("div", {
    className:
      "min-h-screen bg-background flex flex-col items-center justify-center p-4",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "bg-card border rounded-lg shadow-lg p-6 max-w-md w-full",
      children: [
        (0, jsx_runtime_1.jsx)("h2", {
          className: "text-xl font-semibold mb-4",
          children: "Authentication Issue",
        }),
        (0, jsx_runtime_1.jsx)("p", {
          className: "text-muted-foreground mb-6",
          children:
            "There was a problem loading your account information. This might be due to a temporary connection issue.",
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex gap-4 justify-end",
          children: [
            (0, jsx_runtime_1.jsxs)(button_1.Button, {
              variant: "outline",
              onClick: onSignOut,
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.LogOut, {
                  className: "mr-2 h-4 w-4",
                }),
                "Sign out",
              ],
            }),
            (0, jsx_runtime_1.jsxs)(button_1.Button, {
              onClick: onRefresh,
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                  className: "mr-2 h-4 w-4",
                }),
                "Refresh page",
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
