"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminDashboard;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var typography_1 = require("@/components/ui/typography");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
function AdminDashboard() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto px-4 py-4 sm:py-6 space-y-4 sm:space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className:
          "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
        children: [
          (0, jsx_runtime_1.jsx)(typography_1.TypographyH1, {
            className: "text-xl sm:text-2xl",
            children: "Admin Dashboard",
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex gap-2",
            children: [
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                variant: "outline",
                size: "sm",
                children: "Refresh",
              }),
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                variant: "outline",
                size: "sm",
                children: "Export",
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
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
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-center justify-between",
                    children: [
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "text-2xl font-bold",
                        children: "5,243",
                      }),
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Users, {
                        className: "h-5 w-5 text-muted-foreground",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
                    className: "text-xs mt-1",
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
                  children: "System Uptime",
                }),
              }),
              (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-center justify-between",
                    children: [
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "text-2xl font-bold",
                        children: "99.98%",
                      }),
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Server, {
                        className: "h-5 w-5 text-muted-foreground",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
                    className: "text-xs mt-1",
                    children: "Last 30 days",
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
                  children: "AI Executions",
                }),
              }),
              (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-center justify-between",
                    children: [
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "text-2xl font-bold",
                        children: "18,432",
                      }),
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Activity, {
                        className: "h-5 w-5 text-muted-foreground",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
                    className: "text-xs mt-1",
                    children: "+28% from last month",
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
                  children: "Security Status",
                }),
              }),
              (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-center justify-between",
                    children: [
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "text-2xl font-bold text-green-500",
                        children: "Secure",
                      }),
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                        className: "h-5 w-5 text-green-500",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
                    className: "text-xs mt-1",
                    children: "All systems protected",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            className: "lg:col-span-2",
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                children: [
                  (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    className: "text-base sm:text-lg",
                    children: "System Activity",
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                    children: "Overview of platform usage and trends",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: (0, jsx_runtime_1.jsx)("div", {
                  className:
                    "h-[300px] sm:h-[350px] flex items-center justify-center border border-dashed rounded-lg",
                  children: (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
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
                    className: "text-base sm:text-lg",
                    children: "Quick Actions",
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                    children: "Common administrative tasks",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                className: "space-y-2",
                children: [
                  (0, jsx_runtime_1.jsxs)(button_1.Button, {
                    variant: "outline",
                    className: "w-full justify-start",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Users, {
                        className: "h-4 w-4 mr-2",
                      }),
                      "Manage Users",
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)(button_1.Button, {
                    variant: "outline",
                    className: "w-full justify-start",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Database, {
                        className: "h-4 w-4 mr-2",
                      }),
                      "Database Management",
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)(button_1.Button, {
                    variant: "outline",
                    className: "w-full justify-start",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                        className: "h-4 w-4 mr-2",
                      }),
                      "Security Dashboard",
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)(button_1.Button, {
                    variant: "outline",
                    className: "w-full justify-start",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Activity, {
                        className: "h-4 w-4 mr-2",
                      }),
                      "View System Logs",
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
