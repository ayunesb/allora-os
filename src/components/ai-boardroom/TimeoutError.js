"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeoutError = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var HelpTooltip_1 = require("@/components/help/HelpTooltip");
var TimeoutError = function (_a) {
  var onRefresh = _a.onRefresh;
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "shadow-md",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className: "pb-2",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex justify-between items-center",
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                className: "text-lg",
                children: "AI Executive Boardroom",
              }),
              (0, jsx_runtime_1.jsx)(HelpTooltip_1.HelpTooltip, {
                content: (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-1",
                  children: [
                    (0, jsx_runtime_1.jsx)("p", {
                      children:
                        "Executive debates occasionally require more processing time than expected.",
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      children:
                        "This is typically due to high system load or complexity of the debate topic.",
                    }),
                  ],
                }),
                children: (0, jsx_runtime_1.jsx)(lucide_react_1.Info, {
                  className: "h-4 w-4 text-muted-foreground cursor-help",
                }),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: "Taking longer than expected...",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className: "flex flex-col items-center justify-center py-6",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
            className: "h-10 w-10 text-amber-500 mb-4",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-sm text-muted-foreground mb-4",
            children:
              "The debate is taking longer than usual to load. This may be due to:",
          }),
          (0, jsx_runtime_1.jsxs)("ul", {
            className:
              "text-sm text-muted-foreground mb-4 list-disc pl-5 space-y-1 text-left w-full",
            children: [
              (0, jsx_runtime_1.jsx)("li", {
                children: "High complexity of the selected debate topic",
              }),
              (0, jsx_runtime_1.jsx)("li", {
                children: "Temporary connectivity issues with our AI services",
              }),
              (0, jsx_runtime_1.jsx)("li", {
                children: "High system load during peak usage times",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            variant: "default",
            onClick: onRefresh,
            className: "mt-2",
            children: "Refresh the Page",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-xs text-muted-foreground mt-3",
            children:
              "If the problem persists after refreshing, try selecting a different debate topic or contact support.",
          }),
        ],
      }),
    ],
  });
};
exports.TimeoutError = TimeoutError;
