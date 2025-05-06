"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
var OnboardingTeam = function () {
  var navigate = (0, react_router_dom_1.useNavigate)();
  var handleFinish = function () {
    navigate("/dashboard");
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container max-w-5xl mx-auto px-4 py-12",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "text-center mb-8",
        children: [
          (0, jsx_runtime_1.jsx)("h1", {
            className: "text-3xl font-bold mb-4",
            children: "Team Setup",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-lg text-muted-foreground max-w-2xl mx-auto",
            children:
              "Invite your team members to collaborate with your AI executives.",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        className: "mb-8",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Users, {
                    className: "h-5 w-5 text-primary",
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    children: "Invite Team Members",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children:
                  "Add your colleagues to collaborate on strategies and campaigns",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsx)("p", {
              className: "text-muted-foreground",
              children: "Team invitations coming soon...",
            }),
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
            className: "flex justify-between",
            children: [
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                variant: "outline",
                onClick: function () {
                  return navigate("/onboarding/company");
                },
                children: "Back",
              }),
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                onClick: handleFinish,
                children: "Finish Setup",
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
exports.default = OnboardingTeam;
