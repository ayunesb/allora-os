"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var react_router_dom_1 = require("react-router-dom");
var OnboardingProfile = function () {
  var navigate = (0, react_router_dom_1.useNavigate)();
  var handleNext = function () {
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
            children: "Your Profile",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-lg text-muted-foreground max-w-2xl mx-auto",
            children:
              "Tell us about yourself so we can personalize your experience.",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        className: "mb-8",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: "Professional Information",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children: "Help us understand your role and experience",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsx)("p", {
              className: "text-muted-foreground",
              children: "Profile form coming soon...",
            }),
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
            className: "flex justify-between",
            children: [
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                variant: "outline",
                onClick: function () {
                  return navigate("/onboarding");
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
exports.default = OnboardingProfile;
