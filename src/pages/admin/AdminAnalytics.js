"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminAnalytics;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var typography_1 = require("@/components/ui/typography");
var tabs_1 = require("@/components/ui/tabs");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
function AdminAnalytics() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto px-4 py-6 space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className:
          "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
        children: [
          (0, jsx_runtime_1.jsx)(typography_1.TypographyH1, {
            children: "Analytics Dashboard",
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex flex-col sm:flex-row gap-2 w-full sm:w-auto",
            children: [
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "outline",
                className: "w-full sm:w-auto",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, {
                    className: "h-4 w-4 mr-2",
                  }),
                  "Date Range",
                ],
              }),
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "outline",
                className: "w-full sm:w-auto",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Download, {
                    className: "h-4 w-4 mr-2",
                  }),
                  "Export",
                ],
              }),
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "outline",
                className: "w-full sm:w-auto",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                    className: "h-4 w-4 mr-2",
                  }),
                  "Refresh",
                ],
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid grid-cols-1 md:grid-cols-4 gap-4",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                className: "pb-2",
                children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  className: "text-sm font-medium text-muted-foreground",
                  children: "Total Users",
                }),
              }),
              (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                children: [
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "text-2xl font-bold",
                    children: "5,243",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-xs text-muted-foreground mt-1",
                    children: "+12% from last month",
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                className: "pb-2",
                children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  className: "text-sm font-medium text-muted-foreground",
                  children: "Active Users",
                }),
              }),
              (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                children: [
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "text-2xl font-bold",
                    children: "3,872",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-xs text-muted-foreground mt-1",
                    children: "+8% from last month",
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                className: "pb-2",
                children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  className: "text-sm font-medium text-muted-foreground",
                  children: "Avg. Session Time",
                }),
              }),
              (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                children: [
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "text-2xl font-bold",
                    children: "14m 32s",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-xs text-muted-foreground mt-1",
                    children: "+2m from last month",
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                className: "pb-2",
                children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  className: "text-sm font-medium text-muted-foreground",
                  children: "Conversion Rate",
                }),
              }),
              (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                children: [
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "text-2xl font-bold",
                    children: "5.28%",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-xs text-muted-foreground mt-1",
                    children: "+0.4% from last month",
                  }),
                ],
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
                children: "Overview",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "users",
                children: "Users",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "engagement",
                children: "Engagement",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "ai",
                children: "AI Performance",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "overview",
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
              children: [
                (0, jsx_runtime_1.jsxs)(card_1.Card, {
                  className: "lg:row-span-2",
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                      children: [
                        (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                          children: "User Activity",
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                          children: "Daily active users over time",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                      children: (0, jsx_runtime_1.jsx)("div", {
                        className:
                          "h-[400px] flex items-center justify-center border border-dashed rounded-lg",
                        children: (0, jsx_runtime_1.jsx)("p", {
                          className: "text-muted-foreground",
                          children: "Activity chart will display here",
                        }),
                      }),
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(card_1.Card, {
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                      children: [
                        (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                          children: "Top Features",
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                          children: "Most used platform features",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                      children: (0, jsx_runtime_1.jsx)("div", {
                        className:
                          "h-[180px] flex items-center justify-center border border-dashed rounded-lg",
                        children: (0, jsx_runtime_1.jsx)("p", {
                          className: "text-muted-foreground",
                          children: "Feature usage chart will display here",
                        }),
                      }),
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(card_1.Card, {
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                      children: [
                        (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                          children: "Geographical Distribution",
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                          children: "User distribution by region",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                      children: (0, jsx_runtime_1.jsx)("div", {
                        className:
                          "h-[180px] flex items-center justify-center border border-dashed rounded-lg",
                        children: (0, jsx_runtime_1.jsx)("p", {
                          className: "text-muted-foreground",
                          children: "Map visualization will display here",
                        }),
                      }),
                    }),
                  ],
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "users",
            children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
              children: [
                (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                  children: [
                    (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                      children: "User Demographics",
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                      children: "User analysis by demographics",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  children: (0, jsx_runtime_1.jsx)("div", {
                    className:
                      "h-[400px] flex items-center justify-center border border-dashed rounded-lg",
                    children: (0, jsx_runtime_1.jsx)("p", {
                      className: "text-muted-foreground",
                      children: "Demographics charts will display here",
                    }),
                  }),
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "engagement",
            children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
              children: [
                (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                  children: [
                    (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                      children: "Engagement Metrics",
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                      children: "User engagement with platform",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  children: (0, jsx_runtime_1.jsx)("div", {
                    className:
                      "h-[400px] flex items-center justify-center border border-dashed rounded-lg",
                    children: (0, jsx_runtime_1.jsx)("p", {
                      className: "text-muted-foreground",
                      children: "Engagement metrics will display here",
                    }),
                  }),
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "ai",
            children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
              children: [
                (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                  children: [
                    (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                      children: "AI Performance Metrics",
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                      children: "Performance of AI components",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  children: (0, jsx_runtime_1.jsx)("div", {
                    className:
                      "h-[400px] flex items-center justify-center border border-dashed rounded-lg",
                    children: (0, jsx_runtime_1.jsx)("p", {
                      className: "text-muted-foreground",
                      children: "AI performance metrics will display here",
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
