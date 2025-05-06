"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StrategyInsightsPreview;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
function StrategyInsightsPreview(_a) {
  var analysis = _a.analysis,
    _b = _a.isLoading,
    isLoading = _b === void 0 ? false : _b;
  if (isLoading) {
    return (0, jsx_runtime_1.jsx)(card_1.Card, {
      className: "w-full h-[300px] flex items-center justify-center",
      children: (0, jsx_runtime_1.jsx)("div", {
        className: "animate-pulse",
        children: "Loading strategy insights...",
      }),
    });
  }
  if (!analysis) {
    return null;
  }
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "w-full",
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
          children: "Strategy Insights",
        }),
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className: "space-y-6",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "text-sm font-medium mb-2",
                children: "Key Strengths",
              }),
              (0, jsx_runtime_1.jsx)("ul", {
                className: "list-disc pl-5 space-y-1",
                children: analysis.strengths
                  .slice(0, 3)
                  .map(function (strength, index) {
                    return (0, jsx_runtime_1.jsx)(
                      "li",
                      {
                        className: "text-sm text-muted-foreground",
                        children: strength,
                      },
                      index,
                    );
                  }),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "text-sm font-medium mb-2",
                children: "Potential Challenges",
              }),
              (0, jsx_runtime_1.jsx)("ul", {
                className: "list-disc pl-5 space-y-1",
                children: analysis.weaknesses
                  .slice(0, 3)
                  .map(function (weakness, index) {
                    return (0, jsx_runtime_1.jsx)(
                      "li",
                      {
                        className: "text-sm text-muted-foreground",
                        children: weakness,
                      },
                      index,
                    );
                  }),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex flex-wrap gap-2",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex-1 min-w-[140px]",
                children: [
                  (0, jsx_runtime_1.jsx)("h3", {
                    className: "text-sm font-medium mb-2",
                    children: "Complexity",
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-center",
                    children: [
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "w-full bg-secondary h-2 rounded-full",
                        children: (0, jsx_runtime_1.jsx)("div", {
                          className: "bg-primary h-2 rounded-full",
                          style: {
                            width: "".concat(
                              analysis.implementationComplexity.score,
                              "%",
                            ),
                          },
                        }),
                      }),
                      (0, jsx_runtime_1.jsxs)("span", {
                        className: "ml-2 text-xs font-medium",
                        children: [
                          analysis.implementationComplexity.score,
                          "%",
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex-1 min-w-[140px]",
                children: [
                  (0, jsx_runtime_1.jsx)("h3", {
                    className: "text-sm font-medium mb-2",
                    children: "Competitive Edge",
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-center",
                    children: [
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "w-full bg-secondary h-2 rounded-full",
                        children: (0, jsx_runtime_1.jsx)("div", {
                          className: "bg-green-500 h-2 rounded-full",
                          style: {
                            width: "".concat(
                              analysis.competitiveAdvantage.score,
                              "%",
                            ),
                          },
                        }),
                      }),
                      (0, jsx_runtime_1.jsxs)("span", {
                        className: "ml-2 text-xs font-medium",
                        children: [analysis.competitiveAdvantage.score, "%"],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "text-sm font-medium mb-2",
                children: "Key Insights",
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className: "space-y-2",
                children: analysis.insights.slice(0, 2).map(function (insight) {
                  return (0, jsx_runtime_1.jsxs)(
                    "div",
                    {
                      className: "flex items-start space-x-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                          variant:
                            insight.type === "positive"
                              ? "default"
                              : insight.type === "negative"
                                ? "destructive"
                                : "outline",
                          className: "mt-0.5",
                          children:
                            insight.type === "positive"
                              ? "Pro"
                              : insight.type === "negative"
                                ? "Con"
                                : "Note",
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-sm font-medium",
                              children: insight.title,
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-xs text-muted-foreground",
                              children: insight.description,
                            }),
                          ],
                        }),
                      ],
                    },
                    insight.id,
                  );
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
