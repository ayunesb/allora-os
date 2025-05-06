"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OnboardingWorkflow;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var tabs_1 = require("@/components/ui/tabs");
var lucide_react_1 = require("lucide-react");
var AuthContext_1 = require("@/context/AuthContext");
var ExecutiveWorkflowContext_1 = require("@/context/ExecutiveWorkflowContext");
var CompanyProfileForm_1 = require("@/components/onboarding/CompanyProfileForm");
var button_1 = require("@/components/ui/button");
var react_router_dom_1 = require("react-router-dom");
function OnboardingWorkflow() {
  var profile = (0, AuthContext_1.useAuth)().profile;
  var _a = (0, ExecutiveWorkflowContext_1.useExecutiveWorkflow)(),
    hasGeneratedContent = _a.hasGeneratedContent,
    isLoading = _a.isLoading;
  var _b = (0, react_1.useState)("profile"),
    activeTab = _b[0],
    setActiveTab = _b[1];
  var navigate = (0, react_router_dom_1.useNavigate)();
  // If content has been generated, show completion state
  if (hasGeneratedContent) {
    return (0, jsx_runtime_1.jsx)("div", {
      className: "container mx-auto px-4 py-12 max-w-4xl",
      children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
        className: "border-green-200",
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
            className: "pb-4",
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "flex flex-col items-center text-center mb-4",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, {
                  className: "h-16 w-16 text-green-500 mb-2",
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  className: "text-2xl",
                  children: "AI Executive Workflow Generated!",
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                  className: "text-lg",
                  children:
                    "Your AI executive team has created strategies, campaigns, and scripts based on your company profile.",
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
            className: "space-y-4",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                children: [
                  (0, jsx_runtime_1.jsxs)(button_1.Button, {
                    onClick: function () {
                      return navigate("/dashboard/strategies");
                    },
                    className: "flex items-center justify-between",
                    size: "lg",
                    children: [
                      (0, jsx_runtime_1.jsx)("span", {
                        children: "View Business Strategies",
                      }),
                      (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {
                        className: "ml-2 h-4 w-4",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)(button_1.Button, {
                    onClick: function () {
                      return navigate("/dashboard/campaigns");
                    },
                    className: "flex items-center justify-between",
                    variant: "outline",
                    size: "lg",
                    children: [
                      (0, jsx_runtime_1.jsx)("span", {
                        children: "View Marketing Campaigns",
                      }),
                      (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {
                        className: "ml-2 h-4 w-4",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)(button_1.Button, {
                    onClick: function () {
                      return navigate("/dashboard/calls");
                    },
                    className: "flex items-center justify-between",
                    variant: "outline",
                    size: "lg",
                    children: [
                      (0, jsx_runtime_1.jsx)("span", {
                        children: "View Communication Scripts",
                      }),
                      (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {
                        className: "ml-2 h-4 w-4",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)(button_1.Button, {
                    onClick: function () {
                      return navigate("/dashboard/ai-bots");
                    },
                    className: "flex items-center justify-between",
                    variant: "outline",
                    size: "lg",
                    children: [
                      (0, jsx_runtime_1.jsx)("span", {
                        children: "View AI Executive Debate",
                      }),
                      (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {
                        className: "ml-2 h-4 w-4",
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                onClick: function () {
                  return navigate("/dashboard");
                },
                className: "w-full mt-4",
                variant: "secondary",
                children: "Go to Dashboard",
              }),
            ],
          }),
        ],
      }),
    });
  }
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto px-4 py-12 max-w-5xl",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "text-center mb-8",
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            className: "flex justify-center mb-4",
            children: (0, jsx_runtime_1.jsx)(lucide_react_1.BrainCircuit, {
              className: "h-16 w-16 text-primary",
            }),
          }),
          (0, jsx_runtime_1.jsx)("h1", {
            className: "text-3xl font-bold",
            children: "AI Executive Workflow",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-muted-foreground mt-2",
            children:
              "Get personalized business strategies, marketing campaigns, and communication scripts from your AI executive team",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
        value: activeTab,
        onValueChange: setActiveTab,
        className: "space-y-6",
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            className: "flex justify-center",
            children: (0, jsx_runtime_1.jsx)(tabs_1.TabsList, {
              className: "grid w-full max-w-md grid-cols-1",
              children: (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "profile",
                disabled: isLoading,
                children: "Company Profile",
              }),
            }),
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "profile",
            className: "space-y-4",
            children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
              children: [
                (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                  children: [
                    (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                      children: "Company Profile",
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                      children:
                        "Provide information about your company to generate personalized AI executive recommendations",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  children: (0, jsx_runtime_1.jsx)(
                    CompanyProfileForm_1.default,
                    {},
                  ),
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
