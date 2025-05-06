"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntroductionState = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var react_router_dom_1 = require("react-router-dom");
var IntroductionState = function (_a) {
  var sampleDebate = _a.sampleDebate,
    onStartNewDebate = _a.onStartNewDebate;
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "shadow-md",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className: "pb-2",
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            className: "text-lg",
            children: "AI Executive Boardroom",
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children:
              "Preview of an executive debate - start your own to get personalized insights",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className: "space-y-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "text-md font-semibold",
                children: "Sample Topic",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children: sampleDebate.topic,
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "text-md font-semibold",
                children: "Preview",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children: sampleDebate.summary,
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "text-md font-semibold",
                children: "How It Works",
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "mt-4 space-y-4",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-start gap-3",
                    children: [
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "bg-primary/10 p-2 rounded-full",
                        children: (0, jsx_runtime_1.jsx)(
                          lucide_react_1.PlusCircle,
                          { className: "h-5 w-5 text-primary" },
                        ),
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        children: [
                          (0, jsx_runtime_1.jsx)("h4", {
                            className: "text-sm font-medium",
                            children: "Start a Debate",
                          }),
                          (0, jsx_runtime_1.jsx)("p", {
                            className: "text-xs text-muted-foreground",
                            children:
                              "Set a business topic for your AI executives to discuss",
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-start gap-3",
                    children: [
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "bg-primary/10 p-2 rounded-full",
                        children: (0, jsx_runtime_1.jsx)(
                          lucide_react_1.MessageSquare,
                          { className: "h-5 w-5 text-primary" },
                        ),
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        children: [
                          (0, jsx_runtime_1.jsx)("h4", {
                            className: "text-sm font-medium",
                            children: "Watch the Discussion",
                          }),
                          (0, jsx_runtime_1.jsx)("p", {
                            className: "text-xs text-muted-foreground",
                            children:
                              "See different perspectives from AI executives with diverse expertise",
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-start gap-3",
                    children: [
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "bg-primary/10 p-2 rounded-full",
                        children: (0, jsx_runtime_1.jsx)(
                          lucide_react_1.AlertTriangle,
                          { className: "h-5 w-5 text-primary" },
                        ),
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        children: [
                          (0, jsx_runtime_1.jsx)("h4", {
                            className: "text-sm font-medium",
                            children: "Get Strategic Insights",
                          }),
                          (0, jsx_runtime_1.jsx)("p", {
                            className: "text-xs text-muted-foreground",
                            children:
                              "Receive actionable strategies based on the debate outcome",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "mt-6 flex justify-center",
            children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
              variant: "default",
              onClick: onStartNewDebate,
              className: "px-8",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.PlusCircle, {
                  className: "mr-2 h-4 w-4",
                }),
                "Start Your First Debate",
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "text-center mt-4",
            children: (0, jsx_runtime_1.jsxs)("p", {
              className: "text-xs text-muted-foreground",
              children: [
                "Or ",
                (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
                  to: "/dashboard/strategies",
                  className: "text-primary hover:underline",
                  children: "view strategic recommendations",
                }),
                " based on previous debates",
              ],
            }),
          }),
        ],
      }),
    ],
  });
};
exports.IntroductionState = IntroductionState;
