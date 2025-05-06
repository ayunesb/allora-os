"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LearningInsights;
exports.LearningInsights = LearningInsights;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
function LearningInsights() {
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        className: "pb-2",
        children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
          className: "text-xl flex items-center",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.Brain, {
              className: "mr-2 h-5 w-5 text-primary",
            }),
            "Learning Insights",
          ],
        }),
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        children: [
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-muted-foreground text-sm",
            children:
              "Based on your recent interactions, we've identified potential areas for growth in your marketing strategy and customer engagement approach.",
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "mt-4 space-y-3",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "p-3 bg-primary/10 rounded-md",
                children: [
                  (0, jsx_runtime_1.jsx)("h4", {
                    className: "font-medium text-sm",
                    children: "Content Marketing",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-xs text-muted-foreground mt-1",
                    children:
                      "Your audience engages 2.5x more with video content compared to written posts.",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "p-3 bg-primary/10 rounded-md",
                children: [
                  (0, jsx_runtime_1.jsx)("h4", {
                    className: "font-medium text-sm",
                    children: "Lead Response Time",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-xs text-muted-foreground mt-1",
                    children:
                      "Responding within 1 hour increases conversion rate by 37% based on your data.",
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
