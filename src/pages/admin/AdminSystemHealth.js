"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminSystemHealth;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var typography_1 = require("@/components/ui/typography");
var progress_1 = require("@/components/ui/progress");
var tabs_1 = require("@/components/ui/tabs");
var badge_1 = require("@/components/ui/badge");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
function AdminSystemHealth() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto px-4 py-6 space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className:
          "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
        children: [
          (0, jsx_runtime_1.jsx)(typography_1.TypographyH1, {
            children: "System Health",
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "outline",
            className: "w-full sm:w-auto",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                className: "h-4 w-4 mr-2",
              }),
              "Refresh Status",
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                className: "pb-2",
                children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                  className: "text-base font-medium flex items-center",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Server, {
                      className: "h-4 w-4 mr-2 text-primary",
                    }),
                    "API Status",
                  ],
                }),
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center justify-between",
                  children: [
                    (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                      variant: "outline",
                      className:
                        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30",
                      children: "Operational",
                    }),
                    (0, jsx_runtime_1.jsx)(typography_1.TypographySmall, {
                      children: "100% uptime",
                    }),
                  ],
                }),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                className: "pb-2",
                children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                  className: "text-base font-medium flex items-center",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Database, {
                      className: "h-4 w-4 mr-2 text-primary",
                    }),
                    "Database",
                  ],
                }),
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center justify-between",
                  children: [
                    (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                      variant: "outline",
                      className:
                        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30",
                      children: "Operational",
                    }),
                    (0, jsx_runtime_1.jsx)(typography_1.TypographySmall, {
                      children: "99.9% uptime",
                    }),
                  ],
                }),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                className: "pb-2",
                children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                  className: "text-base font-medium flex items-center",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Activity, {
                      className: "h-4 w-4 mr-2 text-primary",
                    }),
                    "AI Services",
                  ],
                }),
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center justify-between",
                  children: [
                    (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                      variant: "outline",
                      className:
                        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/30",
                      children: "Degraded",
                    }),
                    (0, jsx_runtime_1.jsx)(typography_1.TypographySmall, {
                      children: "95.5% uptime",
                    }),
                  ],
                }),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                className: "pb-2",
                children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                  className: "text-base font-medium flex items-center",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, {
                      className: "h-4 w-4 mr-2 text-primary",
                    }),
                    "Response Time",
                  ],
                }),
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center justify-between",
                  children: [
                    (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                      variant: "outline",
                      className:
                        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30",
                      children: "145ms",
                    }),
                    (0, jsx_runtime_1.jsx)(typography_1.TypographySmall, {
                      children: "-5% from avg",
                    }),
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
        defaultValue: "overview",
        className: "w-full",
        children: [
          (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
            className: "w-full max-w-md mb-4",
            children: [
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "overview",
                className: "flex-1",
                children: "Overview",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "performance",
                className: "flex-1",
                children: "Performance",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "logs",
                className: "flex-1",
                children: "System Logs",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "overview",
            children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
              children: [
                (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                  children: [
                    (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                      children: "System Overview",
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                      children: "Current status of all application components",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                  className: "space-y-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-2",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex justify-between items-center",
                          children: [
                            (0, jsx_runtime_1.jsxs)("span", {
                              className: "flex items-center",
                              children: [
                                (0, jsx_runtime_1.jsx)(lucide_react_1.Server, {
                                  className: "h-4 w-4 mr-2",
                                }),
                                "API Services",
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                              variant: "outline",
                              className:
                                "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                              children: "Healthy",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                          value: 100,
                          className: "h-2",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-2",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex justify-between items-center",
                          children: [
                            (0, jsx_runtime_1.jsxs)("span", {
                              className: "flex items-center",
                              children: [
                                (0, jsx_runtime_1.jsx)(
                                  lucide_react_1.Database,
                                  { className: "h-4 w-4 mr-2" },
                                ),
                                "Database Connectivity",
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                              variant: "outline",
                              className:
                                "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                              children: "Healthy",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                          value: 100,
                          className: "h-2",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-2",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex justify-between items-center",
                          children: [
                            (0, jsx_runtime_1.jsxs)("span", {
                              className: "flex items-center",
                              children: [
                                (0, jsx_runtime_1.jsx)(
                                  lucide_react_1.Activity,
                                  { className: "h-4 w-4 mr-2" },
                                ),
                                "AI Processing",
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                              variant: "outline",
                              className:
                                "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
                              children: "Degraded",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                          value: 70,
                          className: "h-2",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-2",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex justify-between items-center",
                          children: [
                            (0, jsx_runtime_1.jsxs)("span", {
                              className: "flex items-center",
                              children: [
                                (0, jsx_runtime_1.jsx)(lucide_react_1.Cpu, {
                                  className: "h-4 w-4 mr-2",
                                }),
                                "Server Resources",
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                              variant: "outline",
                              className:
                                "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                              children: "Healthy",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                          value: 85,
                          className: "h-2",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "performance",
            children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
              children: [
                (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                  children: [
                    (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                      children: "Performance Metrics",
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                      children: "System performance over the last 24 hours",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  children: (0, jsx_runtime_1.jsx)("div", {
                    className:
                      "h-[300px] flex items-center justify-center border border-dashed rounded-lg",
                    children: (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
                      children:
                        "Performance metrics chart will be displayed here",
                    }),
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
                      children: "System Logs",
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                      children: "Recent system events and errors",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  children: (0, jsx_runtime_1.jsx)("div", {
                    className: "border rounded-lg overflow-hidden",
                    children: (0, jsx_runtime_1.jsx)("div", {
                      className: "overflow-x-auto",
                      children: (0, jsx_runtime_1.jsxs)("table", {
                        className: "w-full text-sm",
                        children: [
                          (0, jsx_runtime_1.jsx)("thead", {
                            children: (0, jsx_runtime_1.jsxs)("tr", {
                              className: "bg-muted/50",
                              children: [
                                (0, jsx_runtime_1.jsx)("th", {
                                  className: "px-4 py-3 text-left font-medium",
                                  children: "Timestamp",
                                }),
                                (0, jsx_runtime_1.jsx)("th", {
                                  className: "px-4 py-3 text-left font-medium",
                                  children: "Level",
                                }),
                                (0, jsx_runtime_1.jsx)("th", {
                                  className: "px-4 py-3 text-left font-medium",
                                  children: "Service",
                                }),
                                (0, jsx_runtime_1.jsx)("th", {
                                  className: "px-4 py-3 text-left font-medium",
                                  children: "Message",
                                }),
                              ],
                            }),
                          }),
                          (0, jsx_runtime_1.jsxs)("tbody", {
                            className: "divide-y",
                            children: [
                              (0, jsx_runtime_1.jsxs)("tr", {
                                children: [
                                  (0, jsx_runtime_1.jsx)("td", {
                                    className: "px-4 py-3 whitespace-nowrap",
                                    children: "2025-04-14 08:45:22",
                                  }),
                                  (0, jsx_runtime_1.jsx)("td", {
                                    className: "px-4 py-3",
                                    children: (0, jsx_runtime_1.jsx)(
                                      badge_1.Badge,
                                      {
                                        variant: "outline",
                                        className:
                                          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                                        children: "INFO",
                                      },
                                    ),
                                  }),
                                  (0, jsx_runtime_1.jsx)("td", {
                                    className: "px-4 py-3",
                                    children: "API",
                                  }),
                                  (0, jsx_runtime_1.jsx)("td", {
                                    className: "px-4 py-3",
                                    children: "System startup complete",
                                  }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsxs)("tr", {
                                children: [
                                  (0, jsx_runtime_1.jsx)("td", {
                                    className: "px-4 py-3 whitespace-nowrap",
                                    children: "2025-04-14 08:47:15",
                                  }),
                                  (0, jsx_runtime_1.jsx)("td", {
                                    className: "px-4 py-3",
                                    children: (0, jsx_runtime_1.jsx)(
                                      badge_1.Badge,
                                      {
                                        variant: "outline",
                                        className:
                                          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
                                        children: "WARN",
                                      },
                                    ),
                                  }),
                                  (0, jsx_runtime_1.jsx)("td", {
                                    className: "px-4 py-3",
                                    children: "AI Service",
                                  }),
                                  (0, jsx_runtime_1.jsx)("td", {
                                    className: "px-4 py-3",
                                    children:
                                      "High latency detected in model responses",
                                  }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsxs)("tr", {
                                children: [
                                  (0, jsx_runtime_1.jsx)("td", {
                                    className: "px-4 py-3 whitespace-nowrap",
                                    children: "2025-04-14 09:12:33",
                                  }),
                                  (0, jsx_runtime_1.jsx)("td", {
                                    className: "px-4 py-3",
                                    children: (0, jsx_runtime_1.jsx)(
                                      badge_1.Badge,
                                      {
                                        variant: "outline",
                                        className:
                                          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                                        children: "INFO",
                                      },
                                    ),
                                  }),
                                  (0, jsx_runtime_1.jsx)("td", {
                                    className: "px-4 py-3",
                                    children: "Database",
                                  }),
                                  (0, jsx_runtime_1.jsx)("td", {
                                    className: "px-4 py-3",
                                    children:
                                      "Scheduled backup completed successfully",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
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
