"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var AuthContext_1 = require("@/context/AuthContext");
var OnboardingWelcome = function () {
  var navigate = (0, react_router_dom_1.useNavigate)();
  var profile = (0, AuthContext_1.useAuth)().profile;
  var handleContinue = function () {
    navigate("/onboarding/company");
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container max-w-5xl mx-auto px-4 py-12",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "text-center mb-8",
        children: [
          (0, jsx_runtime_1.jsx)("h1", {
            className: "text-3xl font-bold mb-4",
            children: "Welcome to Allora AI",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-lg text-muted-foreground max-w-2xl mx-auto",
            children:
              "Your AI-powered executive advisory platform. Let's get you set up with a personalized experience.",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        className: "mb-8",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                children: [
                  "Welcome, ",
                  (profile === null || profile === void 0
                    ? void 0
                    : profile.name) || "there",
                  "!",
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children:
                  "Allora AI will help you make better business decisions with AI-powered insights.",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-4",
              children: [
                (0, jsx_runtime_1.jsx)("p", {
                  children: "Here's what you can expect from Allora AI:",
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "grid md:grid-cols-2 gap-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "p-4 border rounded-lg bg-primary/5",
                      children: [
                        (0, jsx_runtime_1.jsx)("h3", {
                          className: "font-medium mb-2",
                          children: "AI Executive Team",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-muted-foreground",
                          children:
                            "Access a virtual board of AI executives with specialized expertise in different business domains.",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "p-4 border rounded-lg bg-primary/5",
                      children: [
                        (0, jsx_runtime_1.jsx)("h3", {
                          className: "font-medium mb-2",
                          children: "Strategic Decision Making",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-muted-foreground",
                          children:
                            "Get data-driven insights and recommendations tailored to your business context.",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "p-4 border rounded-lg bg-primary/5",
                      children: [
                        (0, jsx_runtime_1.jsx)("h3", {
                          className: "font-medium mb-2",
                          children: "Real-world Integration",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-muted-foreground",
                          children:
                            "Connect with your business tools like Stripe, Calendly, and more for actionable intelligence.",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "p-4 border rounded-lg bg-primary/5",
                      children: [
                        (0, jsx_runtime_1.jsx)("h3", {
                          className: "font-medium mb-2",
                          children: "Personalized Strategy",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-muted-foreground",
                          children:
                            "Receive strategies tailored to your industry, company size, and risk appetite.",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
            className: "flex justify-end",
            children: (0, jsx_runtime_1.jsx)(button_1.Button, {
              onClick: handleContinue,
              children: "Continue to Setup",
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "text-center text-sm text-muted-foreground",
        children: (0, jsx_runtime_1.jsx)("p", {
          children:
            "This will only take a few minutes to complete. Your information helps us personalize your experience.",
        }),
      }),
    ],
  });
};
exports.default = OnboardingWelcome;
