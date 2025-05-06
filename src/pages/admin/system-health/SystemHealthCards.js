"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SystemHealthCards;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
function SystemHealthCards(props) {
  var systemHealth = props.systemHealth,
    services = props.services;
  // Get health status icon
  var getStatusIcon = function (status) {
    switch (status) {
      case "healthy":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, {
          className: "h-5 w-5 text-green-500",
        });
      case "degraded":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.Activity, {
          className: "h-5 w-5 text-amber-500",
        });
      case "down":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, {
          className: "h-5 w-5 text-red-500",
        });
      default:
        return null;
    }
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        className: "border-l-4 ".concat(
          systemHealth.status === "healthy"
            ? "border-l-green-500"
            : systemHealth.status === "degraded"
              ? "border-l-amber-500"
              : "border-l-red-500",
        ),
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
            className: "pb-2",
            children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
              className: "text-lg flex items-center",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                  className: "h-5 w-5 mr-2",
                }),
                "System Status",
              ],
            }),
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center",
                children: [
                  getStatusIcon(systemHealth.status),
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "ml-2 font-medium capitalize",
                    children: systemHealth.status,
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-sm text-muted-foreground mt-1",
                children:
                  systemHealth.status === "healthy"
                    ? "All systems operational"
                    : systemHealth.status === "degraded"
                      ? "Some services degraded"
                      : "Critical services down",
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
            className: "pb-2",
            children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
              className: "text-lg flex items-center",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Cpu, {
                  className: "h-5 w-5 mr-2",
                }),
                "Service Health",
              ],
            }),
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center justify-between text-sm mb-1",
                children: [
                  (0, jsx_runtime_1.jsxs)("span", {
                    children: [
                      services.filter(function (s) {
                        return s.status === "healthy";
                      }).length,
                      " Healthy",
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("span", {
                    children: [
                      services.filter(function (s) {
                        return s.status !== "healthy";
                      }).length,
                      " Issues",
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className:
                  "w-full h-2 bg-gray-100 rounded-full overflow-hidden",
                children: (0, jsx_runtime_1.jsx)("div", {
                  className: "h-full bg-green-500",
                  style: { width: "".concat(systemHealth.percentage, "%") },
                }),
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
            className: "pb-2",
            children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
              className: "text-lg flex items-center",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Globe, {
                  className: "h-5 w-5 mr-2",
                }),
                "API Status",
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center justify-between",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center",
                  children: [
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "w-3 h-3 rounded-full bg-green-500 mr-2",
                    }),
                    (0, jsx_runtime_1.jsx)("span", { children: "Operational" }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)("span", {
                  className: "text-sm text-muted-foreground",
                  children: "Avg: 87ms",
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
