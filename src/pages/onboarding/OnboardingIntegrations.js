"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
var OnboardingIntegrations = function () {
  var navigate = (0, react_router_dom_1.useNavigate)();
  var handleNext = function () {
    navigate("/onboarding/ai-workflow");
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container max-w-5xl mx-auto px-4 py-12",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "text-center mb-8",
        children: [
          (0, jsx_runtime_1.jsx)("h1", {
            className: "text-3xl font-bold mb-4",
            children: "Connect Your Services",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-lg text-muted-foreground max-w-2xl mx-auto",
            children:
              "Integrate your existing services with Allora AI to enhance your experience.",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        className: "mb-8",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: "Integrations",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children: "Connect your existing tools and services",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
            className: "space-y-6",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                children: [
                  (0, jsx_runtime_1.jsx)(card_1.Card, {
                    className:
                      "border-dashed border-2 p-4 cursor-pointer hover:bg-muted/50 transition-colors",
                    children: (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center gap-3",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.PlusCircle, {
                          className: "h-8 w-8 text-muted-foreground",
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("h3", {
                              className: "font-medium",
                              children: "Connect CRM",
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-sm text-muted-foreground",
                              children: "Salesforce, HubSpot, etc.",
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.Card, {
                    className:
                      "border-dashed border-2 p-4 cursor-pointer hover:bg-muted/50 transition-colors",
                    children: (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center gap-3",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.PlusCircle, {
                          className: "h-8 w-8 text-muted-foreground",
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("h3", {
                              className: "font-medium",
                              children: "Connect Calendar",
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-sm text-muted-foreground",
                              children: "Google Calendar, Outlook",
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.Card, {
                    className:
                      "border-dashed border-2 p-4 cursor-pointer hover:bg-muted/50 transition-colors",
                    children: (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center gap-3",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.PlusCircle, {
                          className: "h-8 w-8 text-muted-foreground",
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("h3", {
                              className: "font-medium",
                              children: "Connect Email",
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-sm text-muted-foreground",
                              children: "Gmail, Outlook, etc.",
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.Card, {
                    className:
                      "border-dashed border-2 p-4 cursor-pointer hover:bg-muted/50 transition-colors",
                    children: (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center gap-3",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.PlusCircle, {
                          className: "h-8 w-8 text-muted-foreground",
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("h3", {
                              className: "font-medium",
                              children: "Connect Analytics",
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-sm text-muted-foreground",
                              children: "Google Analytics, etc.",
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-sm text-muted-foreground",
                children: "You can skip this step and add integrations later.",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
            className: "flex justify-between",
            children: [
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                variant: "outline",
                onClick: function () {
                  return navigate("/onboarding/team");
                },
                children: "Back",
              }),
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                onClick: handleNext,
                children: "Continue",
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
exports.default = OnboardingIntegrations;
