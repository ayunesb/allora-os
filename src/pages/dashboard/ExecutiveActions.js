"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var typography_1 = require("@/components/ui/typography");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
var ExecutiveActions = function () {
  // Sample data - in a real app, this would come from an API
  var actions = [
    {
      id: "1",
      task: "Increase marketing budget for Q2",
      status: "completed",
      executiveName: "CMO",
      completedAt: "2025-04-10T15:30:00Z",
      result: "Increased budget by 15% based on Q1 performance metrics",
    },
    {
      id: "2",
      task: "Review sales team performance",
      status: "pending",
      executiveName: "CEO",
      triggeredBy: "Weekly Review",
    },
    {
      id: "3",
      task: "Optimize cloud infrastructure costs",
      status: "failed",
      executiveName: "CTO",
      error: "Insufficient data to make optimization decision",
    },
  ];
  var getStatusBadge = function (status) {
    switch (status) {
      case "completed":
        return (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
          className: "bg-green-100 text-green-800 border-green-300",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
              className: "h-3 w-3 mr-1",
            }),
            " Completed",
          ],
        });
      case "pending":
        return (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
          className: "bg-amber-100 text-amber-800 border-amber-300",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, {
              className: "h-3 w-3 mr-1",
            }),
            " Pending",
          ],
        });
      case "failed":
        return (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
          className: "bg-red-100 text-red-800 border-red-300",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
              className: "h-3 w-3 mr-1",
            }),
            " Failed",
          ],
        });
      default:
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, { children: status });
    }
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container px-4 py-6",
    children: [
      (0, jsx_runtime_1.jsx)(typography_1.PageTitle, {
        title: "Executive Actions",
        description:
          "Track and manage executive decisions and automated actions",
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "mt-8 space-y-4",
        children: actions.map(function (action) {
          return (0, jsx_runtime_1.jsxs)(
            card_1.Card,
            {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                  className: "pb-2",
                  children: (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex justify-between items-start",
                    children: [
                      (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                        className: "text-lg font-medium",
                        children: action.task,
                      }),
                      getStatusBadge(action.status),
                    ],
                  }),
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  children: (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex justify-between text-sm",
                        children: [
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "text-muted-foreground",
                            children: "Executive:",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "font-medium",
                            children: action.executiveName,
                          }),
                        ],
                      }),
                      action.completedAt &&
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex justify-between text-sm",
                          children: [
                            (0, jsx_runtime_1.jsx)("span", {
                              className: "text-muted-foreground",
                              children: "Completed:",
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              children: new Date(
                                action.completedAt,
                              ).toLocaleString(),
                            }),
                          ],
                        }),
                      action.triggeredBy &&
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex justify-between text-sm",
                          children: [
                            (0, jsx_runtime_1.jsx)("span", {
                              className: "text-muted-foreground",
                              children: "Triggered by:",
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              children: action.triggeredBy,
                            }),
                          ],
                        }),
                      action.result &&
                        (0, jsx_runtime_1.jsx)("div", {
                          className:
                            "mt-4 p-3 bg-green-50 text-green-800 rounded-md text-sm",
                          children: action.result,
                        }),
                      action.error &&
                        (0, jsx_runtime_1.jsxs)("div", {
                          className:
                            "mt-4 p-3 bg-red-50 text-red-800 rounded-md text-sm",
                          children: ["Error: ", action.error],
                        }),
                    ],
                  }),
                }),
              ],
            },
            action.id,
          );
        }),
      }),
    ],
  });
};
exports.default = ExecutiveActions;
