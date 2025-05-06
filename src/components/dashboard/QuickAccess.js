"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
var QuickAccess = function () {
  var navigate = (0, react_router_dom_1.useNavigate)();
  var links = [
    {
      title: "Executives",
      description: "Manage your AI executive team",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Users, {
        className: "h-5 w-5",
      }),
      path: "/dashboard/executives",
    },
    {
      title: "Leads",
      description: "View and manage your leads",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Users, {
        className: "h-5 w-5",
      }),
      path: "/dashboard/leads",
    },
    {
      title: "Campaigns",
      description: "Create and manage campaigns",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Briefcase, {
        className: "h-5 w-5",
      }),
      path: "/dashboard/campaigns",
    },
    {
      title: "Analytics",
      description: "View analytics and insights",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.BarChart3, {
        className: "h-5 w-5",
      }),
      path: "/dashboard/analytics",
    },
    {
      title: "Strategies",
      description: "Browse and implement strategies",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.LineChart, {
        className: "h-5 w-5",
      }),
      path: "/dashboard/strategies",
    },
    {
      title: "Calls",
      description: "Schedule and manage calls",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Phone, {
        className: "h-5 w-5",
      }),
      path: "/dashboard/calls",
    },
    {
      title: "Risk Analysis",
      description: "Risk assessment heatmap",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.PieChart, {
        className: "h-5 w-5",
      }),
      path: "/dashboard/risk-heatmap",
    },
    {
      title: "Forecasting",
      description: "KPI predictions & anomaly detection",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, {
        className: "h-5 w-5",
      }),
      path: "/dashboard/forecast",
    },
  ];
  var handleNavigate = function (path) {
    navigate(path);
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            children: "Quick Access",
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: "Access key features and tools",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsx)("div", {
          className: "grid grid-cols-2 md:grid-cols-4 gap-4",
          children: links.map(function (link) {
            return (0, jsx_runtime_1.jsxs)(
              "div",
              {
                className:
                  "p-4 flex flex-col items-center justify-center rounded-lg border bg-card text-card-foreground shadow hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer",
                onClick: function () {
                  return handleNavigate(link.path);
                },
                children: [
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "mb-2 rounded-full p-2 bg-primary/10",
                    children: link.icon,
                  }),
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "text-sm font-medium text-center",
                    children: link.title,
                  }),
                ],
              },
              link.title,
            );
          }),
        }),
      }),
    ],
  });
};
exports.default = QuickAccess;
