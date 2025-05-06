"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
var OnboardingAIWorkflow = function () {
  var navigate = (0, react_router_dom_1.useNavigate)();
  var handleNext = function () {
    navigate("/onboarding/complete");
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container max-w-5xl mx-auto px-4 py-12",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "text-center mb-8",
        children: [
          (0, jsx_runtime_1.jsx)("h1", {
            className: "text-3xl font-bold mb-4",
            children: "Customize Your AI Workflow",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-lg text-muted-foreground max-w-2xl mx-auto",
            children:
              "Select how you want to interact with your AI executive team.",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        className: "mb-8",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: "AI Executive Team Preferences",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children:
                  "Customize how your AI executives will collaborate and assist you",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            className: "space-y-6",
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-4",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-start gap-3 p-3 border rounded-md",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, {
                      className: "h-5 w-5 text-primary mt-0.5",
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)("h3", {
                          className: "font-medium",
                          children: "Proactive Insights",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-muted-foreground",
                          children:
                            "Allow your AI executives to proactively generate insights based on your company data",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-start gap-3 p-3 border rounded-md",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, {
                      className: "h-5 w-5 text-primary mt-0.5",
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)("h3", {
                          className: "font-medium",
                          children: "Executive Debates",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-muted-foreground",
                          children:
                            "Enable your AI executives to debate strategic decisions with various perspectives",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-start gap-3 p-3 border rounded-md",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, {
                      className: "h-5 w-5 text-primary mt-0.5",
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)("h3", {
                          className: "font-medium",
                          children: "Risk Analysis",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-muted-foreground",
                          children:
                            "Your AI team will analyze risk factors for every strategic suggestion",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-start gap-3 p-3 border rounded-md",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, {
                      className: "h-5 w-5 text-primary mt-0.5",
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)("h3", {
                          className: "font-medium",
                          children: "Implementation Planning",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-muted-foreground",
                          children:
                            "Get detailed implementation plans for approved strategies",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
            className: "flex justify-between",
            children: [
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                variant: "outline",
                onClick: function () {
                  return navigate("/onboarding/integrations");
                },
                children: "Back",
              }),
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                onClick: handleNext,
                children: "Finish Setup",
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
exports.default = OnboardingAIWorkflow;
