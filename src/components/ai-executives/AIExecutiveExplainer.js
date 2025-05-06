"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIExecutiveExplainer = AIExecutiveExplainer;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var dialog_1 = require("@/components/ui/dialog");
var react_router_dom_1 = require("react-router-dom");
var executiveRoles = [
  {
    role: "ceo",
    title: "CEO Advisor",
    description:
      "Provides strategic vision and leadership guidance for your business",
    icon: (0, jsx_runtime_1.jsx)(lucide_react_1.RocketIcon, {
      className: "h-5 w-5",
    }),
    capabilities: [
      "Develop long-term business strategies",
      "Analyze competitive landscape",
      "Guide overall company direction",
      "Make high-level business recommendations",
    ],
    examples: [
      "What growth strategies should we focus on this quarter?",
      "How can we position ourselves against our competitors?",
      "What are the biggest risks to our business model?",
    ],
  },
  {
    role: "cfo",
    title: "CFO Advisor",
    description: "Offers financial insights and investment guidance",
    icon: (0, jsx_runtime_1.jsx)(lucide_react_1.SparklesIcon, {
      className: "h-5 w-5",
    }),
    capabilities: [
      "Analyze financial performance",
      "Create budget projections",
      "Develop risk management strategies",
      "Provide investment advice",
    ],
    examples: [
      "How should we allocate our marketing budget?",
      "What's the ROI potential of this new initiative?",
      "How can we improve our cash flow management?",
    ],
  },
  {
    role: "strategy",
    title: "Strategy Consultant",
    description:
      "Provides specialized advice on business growth and optimization",
    icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Brain, {
      className: "h-5 w-5",
    }),
    capabilities: [
      "Market expansion strategies",
      "Business model innovation",
      "Process optimization",
      "Customer acquisition strategies",
    ],
    examples: [
      "How can we optimize our customer acquisition funnel?",
      "What market segments should we explore next?",
      "How can we improve our operational efficiency?",
    ],
  },
];
function AIExecutiveExplainer() {
  var _a = (0, react_1.useState)(false),
    isDialogOpen = _a[0],
    setIsDialogOpen = _a[1];
  var _b = (0, react_1.useState)(null),
    selectedRole = _b[0],
    setSelectedRole = _b[1];
  var navigate = (0, react_router_dom_1.useNavigate)();
  var handleOpenRoleDialog = function (role) {
    setSelectedRole(role);
    setIsDialogOpen(true);
  };
  var startConversation = function () {
    if (selectedRole) {
      navigate("/dashboard/ai-bots?role=" + selectedRole.role);
      setIsDialogOpen(false);
    }
  };
  var navigateToDebate = function () {
    navigate("/dashboard/ai-bots#debate");
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsx)("div", {
        className: "bg-muted/30 border rounded-lg p-4",
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "flex items-start space-x-3",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.Info, {
              className: "h-5 w-5 text-primary mt-1",
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)("h3", {
                  className: "text-lg font-medium mb-2",
                  children: "How AI Executives Work",
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-muted-foreground",
                  children:
                    "Our AI executives model the thinking and expertise of world-class business leaders. They analyze your business context and provide personalized guidance on strategies, decisions, and growth opportunities.",
                }),
              ],
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "grid gap-6 md:grid-cols-3",
        children: executiveRoles.map(function (role) {
          return (0, jsx_runtime_1.jsxs)(
            card_1.Card,
            {
              className:
                "cursor-pointer hover:border-primary/50 transition-all",
              children: [
                (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                  className: "pb-2",
                  children: [
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "flex items-center justify-between",
                      children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                        className: "flex items-center text-lg",
                        children: [
                          role.icon,
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "ml-2",
                            children: role.title,
                          }),
                        ],
                      }),
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                      children: role.description,
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                  children: [
                    (0, jsx_runtime_1.jsx)("h4", {
                      className: "text-sm font-medium mb-2",
                      children: "How they can help:",
                    }),
                    (0, jsx_runtime_1.jsx)("ul", {
                      className: "text-sm text-muted-foreground space-y-1",
                      children: role.capabilities
                        .slice(0, 3)
                        .map(function (capability, index) {
                          return (0, jsx_runtime_1.jsxs)(
                            "li",
                            {
                              className: "flex items-start",
                              children: [
                                (0, jsx_runtime_1.jsx)("span", {
                                  className: "mr-2",
                                  children: "\u2022",
                                }),
                                (0, jsx_runtime_1.jsx)("span", {
                                  children: capability,
                                }),
                              ],
                            },
                            index,
                          );
                        }),
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
                  children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
                    variant: "outline",
                    className: "w-full",
                    onClick: function () {
                      return handleOpenRoleDialog(role);
                    },
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Info, {
                        className: "mr-2 h-4 w-4",
                      }),
                      "Learn More",
                    ],
                  }),
                }),
              ],
            },
            role.role,
          );
        }),
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex flex-col sm:flex-row gap-4 justify-center mt-4",
        children: [
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            onClick: navigateToDebate,
            className: "flex-1 max-w-md mx-auto",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.MessageSquare, {
                className: "mr-2 h-4 w-4",
              }),
              "Start Executive Board Meeting",
            ],
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "outline",
            onClick: function () {
              return navigate("/dashboard/ai-bots");
            },
            className: "flex-1 max-w-md mx-auto",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.PlusCircle, {
                className: "mr-2 h-4 w-4",
              }),
              "Explore All Executives",
            ],
          }),
        ],
      }),
      selectedRole &&
        (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
          open: isDialogOpen,
          onOpenChange: setIsDialogOpen,
          children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
            className: "sm:max-w-[500px]",
            children: [
              (0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, {
                children: [
                  (0, jsx_runtime_1.jsxs)(dialog_1.DialogTitle, {
                    className: "flex items-center",
                    children: [
                      selectedRole.icon,
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "ml-2",
                        children: selectedRole.title,
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, {
                    children: selectedRole.description,
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "py-4",
                children: [
                  (0, jsx_runtime_1.jsx)("h3", {
                    className: "font-medium mb-2",
                    children: "Key capabilities:",
                  }),
                  (0, jsx_runtime_1.jsx)("ul", {
                    className: "space-y-1 mb-4",
                    children: selectedRole.capabilities.map(
                      function (capability, index) {
                        return (0, jsx_runtime_1.jsxs)(
                          "li",
                          {
                            className: "flex items-start text-sm",
                            children: [
                              (0, jsx_runtime_1.jsx)("span", {
                                className: "mr-2",
                                children: "\u2022",
                              }),
                              (0, jsx_runtime_1.jsx)("span", {
                                children: capability,
                              }),
                            ],
                          },
                          index,
                        );
                      },
                    ),
                  }),
                  (0, jsx_runtime_1.jsx)("h3", {
                    className: "font-medium mb-2",
                    children: "Example questions to ask:",
                  }),
                  (0, jsx_runtime_1.jsx)("ul", {
                    className: "space-y-1",
                    children: selectedRole.examples.map(
                      function (example, index) {
                        return (0, jsx_runtime_1.jsxs)(
                          "li",
                          {
                            className: "flex items-start text-sm",
                            children: [
                              (0, jsx_runtime_1.jsx)("span", {
                                className: "mr-2",
                                children: "\u2022",
                              }),
                              (0, jsx_runtime_1.jsx)("span", {
                                children: example,
                              }),
                            ],
                          },
                          index,
                        );
                      },
                    ),
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex justify-end space-x-2",
                children: [
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    variant: "outline",
                    onClick: function () {
                      return setIsDialogOpen(false);
                    },
                    children: "Close",
                  }),
                  (0, jsx_runtime_1.jsxs)(button_1.Button, {
                    onClick: startConversation,
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.MessageSquare, {
                        className: "mr-2 h-4 w-4",
                      }),
                      "Start Conversation",
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
    ],
  });
}
exports.default = AIExecutiveExplainer;
