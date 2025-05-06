"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminWebhooks;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var typography_1 = require("@/components/ui/typography");
var tabs_1 = require("@/components/ui/tabs");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var lucide_react_1 = require("lucide-react");
function AdminWebhooks() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto px-4 py-6 space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className:
          "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
        children: [
          (0, jsx_runtime_1.jsx)(typography_1.TypographyH1, {
            children: "Webhook Management",
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            className: "w-full sm:w-auto",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
                className: "h-4 w-4 mr-2",
              }),
              "Add Webhook",
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
        defaultValue: "active",
        className: "w-full",
        children: [
          (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
            className: "w-full max-w-md mb-4",
            children: [
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "active",
                className: "flex-1",
                children: "Active Webhooks",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "logs",
                className: "flex-1",
                children: "History",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "settings",
                className: "flex-1",
                children: "Settings",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "active",
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-4",
              children: [
                (0, jsx_runtime_1.jsxs)(card_1.Card, {
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                      className: "pb-3",
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                          className: "flex items-center",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Webhook, {
                              className: "h-5 w-5 mr-2 text-primary",
                            }),
                            "System Events",
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                          children: "Webhook URLs for system-level events",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                      children: (0, jsx_runtime_1.jsxs)("div", {
                        className: "space-y-4",
                        children: [
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "space-y-2",
                            children: [
                              (0, jsx_runtime_1.jsx)(label_1.Label, {
                                htmlFor: "user-events",
                                children: "User Events",
                              }),
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                  (0, jsx_runtime_1.jsx)(input_1.Input, {
                                    id: "user-events",
                                    placeholder:
                                      "https://your-server.com/webhooks/users",
                                  }),
                                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                                    variant: "outline",
                                    size: "sm",
                                    children: "Test",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "space-y-2",
                            children: [
                              (0, jsx_runtime_1.jsx)(label_1.Label, {
                                htmlFor: "system-events",
                                children: "System Events",
                              }),
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                  (0, jsx_runtime_1.jsx)(input_1.Input, {
                                    id: "system-events",
                                    placeholder:
                                      "https://your-server.com/webhooks/system",
                                  }),
                                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                                    variant: "outline",
                                    size: "sm",
                                    children: "Test",
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
                (0, jsx_runtime_1.jsxs)(card_1.Card, {
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                      className: "pb-3",
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                          className: "flex items-center",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Link, {
                              className: "h-5 w-5 mr-2 text-primary",
                            }),
                            "Integration Webhooks",
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                          children: "Connect third-party services",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                      children: (0, jsx_runtime_1.jsxs)("div", {
                        className: "space-y-4",
                        children: [
                          (0, jsx_runtime_1.jsxs)(button_1.Button, {
                            variant: "outline",
                            className: "w-full justify-between",
                            children: [
                              "Connect to Zapier",
                              (0, jsx_runtime_1.jsx)(
                                lucide_react_1.ArrowRight,
                                { className: "h-4 w-4 ml-2" },
                              ),
                            ],
                          }),
                          (0, jsx_runtime_1.jsxs)(button_1.Button, {
                            variant: "outline",
                            className: "w-full justify-between",
                            children: [
                              "Connect to Slack",
                              (0, jsx_runtime_1.jsx)(
                                lucide_react_1.ArrowRight,
                                { className: "h-4 w-4 ml-2" },
                              ),
                            ],
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "logs",
            children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
              children: [
                (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                  children: [
                    (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                      children: "Webhook History",
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                      children:
                        "Recent webhook events and their delivery status",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  children: (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
                    children:
                      "No webhook events recorded yet. They will appear here once activity begins.",
                  }),
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "settings",
            children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
              children: [
                (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                  children: [
                    (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                      children: "Webhook Settings",
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                      children: "Configure your webhook handling preferences",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  children: (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-4",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center justify-between",
                        children: [
                          (0, jsx_runtime_1.jsx)(label_1.Label, {
                            htmlFor: "retry-attempts",
                            children: "Retry Attempts",
                          }),
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "flex items-center space-x-2",
                            children: (0, jsx_runtime_1.jsx)(input_1.Input, {
                              id: "retry-attempts",
                              type: "number",
                              defaultValue: 3,
                              className: "w-20",
                            }),
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center justify-between",
                        children: [
                          (0, jsx_runtime_1.jsx)(label_1.Label, {
                            htmlFor: "timeout",
                            children: "Request Timeout (ms)",
                          }),
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "flex items-center space-x-2",
                            children: (0, jsx_runtime_1.jsx)(input_1.Input, {
                              id: "timeout",
                              type: "number",
                              defaultValue: 3000,
                              className: "w-20",
                            }),
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)(button_1.Button, {
                        className: "mt-4",
                        children: "Save Settings",
                      }),
                    ],
                  }),
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
