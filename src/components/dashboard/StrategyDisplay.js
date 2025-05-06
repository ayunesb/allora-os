"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StrategyDisplay;
exports.StrategyDisplay = StrategyDisplay;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
function StrategyDisplay() {
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        className: "pb-2",
        children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
          className: "text-xl flex items-center",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.GitBranch, {
              className: "mr-2 h-5 w-5 text-primary",
            }),
            "Strategy Overview",
          ],
        }),
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        children: [
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-muted-foreground text-sm",
            children:
              "Your current business strategies are focused on market expansion and customer retention. The AI executive team has provided insights based on your company profile.",
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "mt-4 space-y-3",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "p-3 bg-primary/10 rounded-md",
                children: [
                  (0, jsx_runtime_1.jsx)("h4", {
                    className: "font-medium text-sm",
                    children: "Market Penetration",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-xs text-muted-foreground mt-1",
                    children:
                      "Focus on existing markets with current products to increase market share.",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "p-3 bg-primary/10 rounded-md",
                children: [
                  (0, jsx_runtime_1.jsx)("h4", {
                    className: "font-medium text-sm",
                    children: "Product Development",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-xs text-muted-foreground mt-1",
                    children:
                      "Develop new products for existing markets based on customer feedback.",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
