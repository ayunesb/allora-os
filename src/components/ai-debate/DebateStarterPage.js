"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DebateStarterPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var ExecutiveDebate_1 = require("./ExecutiveDebate");
var lucide_react_1 = require("lucide-react");
function DebateStarterPage() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-8",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsx)("h1", {
            className: "text-3xl font-bold tracking-tight",
            children: "Executive Debate",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-muted-foreground mt-2",
            children:
              "Start a new AI-powered executive debate to generate strategic insights for your business",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid grid-cols-1 md:grid-cols-4 gap-6",
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            className: "md:col-span-3",
            children: (0, jsx_runtime_1.jsx)(ExecutiveDebate_1.default, {}),
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "space-y-6",
            children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                  className: "pb-3",
                  children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                    className: "flex items-center gap-2 text-lg",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Brain, {
                        className: "h-5 w-5 text-primary",
                      }),
                      (0, jsx_runtime_1.jsx)("span", {
                        children: "How It Works",
                      }),
                    ],
                  }),
                }),
                (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                  className: "space-y-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-start gap-3",
                      children: [
                        (0, jsx_runtime_1.jsx)("div", {
                          className:
                            "flex-shrink-0 bg-primary/10 p-2 rounded-full",
                          children: (0, jsx_runtime_1.jsx)(
                            lucide_react_1.Users,
                            { className: "h-4 w-4 text-primary" },
                          ),
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("h4", {
                              className: "text-sm font-medium",
                              children: "Select Executives",
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-xs text-muted-foreground",
                              children:
                                "Choose which AI executives will participate in your debate",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-start gap-3",
                      children: [
                        (0, jsx_runtime_1.jsx)("div", {
                          className:
                            "flex-shrink-0 bg-primary/10 p-2 rounded-full",
                          children: (0, jsx_runtime_1.jsx)(
                            lucide_react_1.Lightbulb,
                            { className: "h-4 w-4 text-primary" },
                          ),
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("h4", {
                              className: "text-sm font-medium",
                              children: "Define Your Topic",
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-xs text-muted-foreground",
                              children:
                                "Choose a business challenge or opportunity to discuss",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-start gap-3",
                      children: [
                        (0, jsx_runtime_1.jsx)("div", {
                          className:
                            "flex-shrink-0 bg-primary/10 p-2 rounded-full",
                          children: (0, jsx_runtime_1.jsx)(
                            lucide_react_1.Brain,
                            { className: "h-4 w-4 text-primary" },
                          ),
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("h4", {
                              className: "text-sm font-medium",
                              children: "Review & Apply",
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-xs text-muted-foreground",
                              children:
                                "Get actionable insights from diverse executive perspectives",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
