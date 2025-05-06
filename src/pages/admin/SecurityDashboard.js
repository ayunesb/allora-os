"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SecurityDashboard;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_helmet_async_1 = require("react-helmet-async");
var card_1 = require("@/components/ui/card");
var tabs_1 = require("@/components/ui/tabs");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
function SecurityDashboard() {
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsx)(react_helmet_async_1.Helmet, {
        children: (0, jsx_runtime_1.jsx)("title", {
          children: "Security Dashboard | Allora AI",
        }),
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "container mx-auto px-4 py-8",
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            className: "flex justify-between items-center mb-6",
            children: (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)("h1", {
                  className: "text-3xl font-bold tracking-tight",
                  children: "Security Dashboard",
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-muted-foreground",
                  children: "Monitor and manage security settings",
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
            defaultValue: "overview",
            children: [
              (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                className: "grid w-full grid-cols-4 mb-6",
                children: [
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "overview",
                    children: "Overview",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "access",
                    children: "Access Control",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "data",
                    children: "Data Protection",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "logs",
                    children: "Audit Logs",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, {
                value: "overview",
                className: "space-y-6",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6",
                    children: [
                      (0, jsx_runtime_1.jsxs)(card_1.Card, {
                        children: [
                          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                            className: "pb-2",
                            children: (0, jsx_runtime_1.jsxs)(
                              card_1.CardTitle,
                              {
                                className: "text-lg flex items-center",
                                children: [
                                  (0, jsx_runtime_1.jsx)(
                                    lucide_react_1.Shield,
                                    { className: "h-5 w-5 mr-2" },
                                  ),
                                  "Security Status",
                                ],
                              },
                            ),
                          }),
                          (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex items-center",
                                children: [
                                  (0, jsx_runtime_1.jsx)("div", {
                                    className:
                                      "w-3 h-3 rounded-full bg-green-500 mr-2",
                                  }),
                                  (0, jsx_runtime_1.jsx)("span", {
                                    className: "font-medium",
                                    children: "Protected",
                                  }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsx)("p", {
                                className: "text-sm text-muted-foreground mt-1",
                                children:
                                  "All security systems are operational",
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)(card_1.Card, {
                        children: [
                          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                            className: "pb-2",
                            children: (0, jsx_runtime_1.jsxs)(
                              card_1.CardTitle,
                              {
                                className: "text-lg flex items-center",
                                children: [
                                  (0, jsx_runtime_1.jsx)(lucide_react_1.Lock, {
                                    className: "h-5 w-5 mr-2",
                                  }),
                                  "Last Audit",
                                ],
                              },
                            ),
                          }),
                          (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                            children: [
                              (0, jsx_runtime_1.jsx)("p", {
                                className: "font-medium",
                                children: "April 10, 2025",
                              }),
                              (0, jsx_runtime_1.jsx)("p", {
                                className: "text-sm text-muted-foreground",
                                children: "No critical issues found",
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)(card_1.Card, {
                        children: [
                          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                            className: "pb-2",
                            children: (0, jsx_runtime_1.jsxs)(
                              card_1.CardTitle,
                              {
                                className: "text-lg flex items-center",
                                children: [
                                  (0, jsx_runtime_1.jsx)(
                                    lucide_react_1.AlertTriangle,
                                    { className: "h-5 w-5 mr-2" },
                                  ),
                                  "Threats Detected",
                                ],
                              },
                            ),
                          }),
                          (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                            children: [
                              (0, jsx_runtime_1.jsx)("p", {
                                className: "font-medium",
                                children: "0 active threats",
                              }),
                              (0, jsx_runtime_1.jsx)("p", {
                                className: "text-sm text-muted-foreground",
                                children: "6 threats blocked this month",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)(card_1.Card, {
                    children: [
                      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                        children: [
                          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                            children: "Security Overview",
                          }),
                          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                            children:
                              "System-wide security status and recent events",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                        children: [
                          (0, jsx_runtime_1.jsx)("p", {
                            children:
                              "Security dashboard content will appear here.",
                          }),
                          (0, jsx_runtime_1.jsx)(button_1.Button, {
                            className: "mt-4",
                            children: "Run Security Scan",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "access",
                children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                      children: [
                        (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                          children: "Access Control",
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                          children: "Manage user permissions and roles",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                      children: (0, jsx_runtime_1.jsx)("p", {
                        children: "Access control management will appear here.",
                      }),
                    }),
                  ],
                }),
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "data",
                children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                      children: [
                        (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                          children: "Data Protection",
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                          children: "Encryption settings and data compliance",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                      children: (0, jsx_runtime_1.jsx)("p", {
                        children: "Data protection settings will appear here.",
                      }),
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
                          children: "Audit Logs",
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                          children: "Security events and user activity",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                      children: (0, jsx_runtime_1.jsx)("p", {
                        children: "Audit logs will appear here.",
                      }),
                    }),
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
