"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditSummary = AuditSummary;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var badge_1 = require("@/components/ui/badge");
var button_1 = require("@/components/ui/button");
function AuditSummary() {
  var auditData = [
    {
      name: "Core Features",
      items: [
        {
          name: "Dashboard",
          status: "PASS",
          description: "Dashboard page loads and displays correctly",
        },
        {
          name: "Onboarding",
          status: "PASS",
          description: "Onboarding flow works correctly",
        },
        {
          name: "Strategy Board",
          status: "WARN",
          description:
            "Strategy board loads but has performance issues with large datasets",
          recommendation:
            "Implement virtualized lists for large strategy collections",
        },
        {
          name: "AI Agents",
          status: "WARN",
          description: "AI agent components have type inconsistencies",
          recommendation:
            "Update component props to use UnifiedBot type consistently",
        },
      ],
    },
    {
      name: "Responsiveness",
      items: [
        {
          name: "Mobile Layout",
          status: "WARN",
          description: "Some components overflow on small screens",
          recommendation: "Add responsive classes to container elements",
        },
        {
          name: "Tablet Layout",
          status: "PASS",
          description: "UI works correctly on tablet devices",
        },
        {
          name: "Grid System",
          status: "WARN",
          description: "Inconsistent grid layouts across sections",
          recommendation:
            "Standardize on consistent grid patterns using Tailwind's grid classes",
        },
      ],
    },
    {
      name: "Design Consistency",
      items: [
        {
          name: "Component Usage",
          status: "WARN",
          description:
            "Some components use custom styles instead of ShadCN patterns",
          recommendation:
            "Refactor custom styled components to use ShadCN UI primitives",
        },
        {
          name: "Spacing",
          status: "PASS",
          description: "Spacing is consistent across most components",
        },
      ],
    },
    {
      name: "Context Safety",
      items: [
        {
          name: "User Context",
          status: "FAIL",
          description: "User context not consistently guarded for null values",
          recommendation: "Add null checks to all user context references",
        },
        {
          name: "Auth Provider",
          status: "PASS",
          description: "Auth provider is properly configured at the root",
        },
        {
          name: "Role Checking",
          status: "WARN",
          description: "Inconsistent role checking patterns",
          recommendation:
            "Use createAuthCompatibilityLayer consistently across components",
        },
      ],
    },
    {
      name: "Component UX",
      items: [
        {
          name: "Loading States",
          status: "WARN",
          description: "Some components missing loading states",
          recommendation:
            "Add Skeleton components to all async data fetching components",
        },
        {
          name: "Error Handling",
          status: "WARN",
          description: "Error messages inconsistently displayed",
          recommendation: "Implement unified error alert system",
        },
        {
          name: "Accessibility",
          status: "PASS",
          description: "Components include necessary ARIA attributes",
        },
      ],
    },
    {
      name: "Security",
      items: [
        {
          name: "Route Protection",
          status: "PASS",
          description: "Routes properly protected with role-based checks",
        },
        {
          name: "API Calls",
          status: "WARN",
          description: "Some Supabase calls missing error handling",
          recommendation: "Wrap all Supabase calls in try/catch blocks",
        },
      ],
    },
  ];
  var getStatusIcon = function (status) {
    switch (status) {
      case "PASS":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
          className: "h-4 w-4 text-green-500",
        });
      case "WARN":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
          className: "h-4 w-4 text-yellow-500",
        });
      case "FAIL":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.X, {
          className: "h-4 w-4 text-red-500",
        });
      default:
        return (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
          className: "h-4 w-4",
        });
    }
  };
  var getStatusClass = function (status) {
    switch (status) {
      case "PASS":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "WARN":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "FAIL":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };
  // Calculate overall statistics
  var stats = auditData.reduce(function (acc, category) {
    category.items.forEach(function (item) {
      acc[item.status] = (acc[item.status] || 0) + 1;
    });
    return acc;
  }, {});
  var totalItems = Object.values(stats).reduce(function (sum, count) {
    return sum + count;
  }, 0);
  var passPercentage = Math.round(((stats.PASS || 0) / totalItems) * 100);
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "w-full",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
            className: "flex justify-between items-center",
            children: [
              (0, jsx_runtime_1.jsx)("span", {
                children: "Production Readiness Audit",
              }),
              (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                className: "text-sm ".concat(
                  passPercentage >= 80
                    ? "bg-green-500/10 text-green-500"
                    : passPercentage >= 60
                      ? "bg-yellow-500/10 text-yellow-500"
                      : "bg-red-500/10 text-red-500",
                ),
                children: [passPercentage, "% Ready"],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children:
              "Assessment of application readiness for production deployment",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className: "space-y-6",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex justify-between text-sm",
            children: [
              (0, jsx_runtime_1.jsx)("div", {
                className: "flex items-center gap-1",
                children: (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                  variant: "outline",
                  className:
                    "bg-green-500/10 text-green-500 border-green-500/20",
                  children: [stats.PASS || 0, " Passed"],
                }),
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className: "flex items-center gap-1",
                children: (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                  variant: "outline",
                  className:
                    "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
                  children: [stats.WARN || 0, " Warnings"],
                }),
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className: "flex items-center gap-1",
                children: (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                  variant: "outline",
                  className: "bg-red-500/10 text-red-500 border-red-500/20",
                  children: [stats.FAIL || 0, " Failures"],
                }),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "space-y-6",
            children: auditData.map(function (category, idx) {
              return (0, jsx_runtime_1.jsxs)(
                "div",
                {
                  className: "space-y-2",
                  children: [
                    (0, jsx_runtime_1.jsx)("h3", {
                      className: "text-lg font-medium",
                      children: category.name,
                    }),
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "rounded-md border bg-card",
                      children: category.items.map(function (item, itemIdx) {
                        return (0, jsx_runtime_1.jsxs)(
                          "div",
                          {
                            className: "flex justify-between p-3 ".concat(
                              itemIdx !== category.items.length - 1
                                ? "border-b"
                                : "",
                            ),
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "space-y-1",
                                children: [
                                  (0, jsx_runtime_1.jsxs)("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                      getStatusIcon(item.status),
                                      (0, jsx_runtime_1.jsx)("span", {
                                        className: "font-medium",
                                        children: item.name,
                                      }),
                                    ],
                                  }),
                                  (0, jsx_runtime_1.jsx)("p", {
                                    className: "text-sm text-muted-foreground",
                                    children: item.description,
                                  }),
                                  item.recommendation &&
                                    (0, jsx_runtime_1.jsxs)("p", {
                                      className: "text-xs text-primary",
                                      children: [
                                        "Recommendation: ",
                                        item.recommendation,
                                      ],
                                    }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                                variant: "outline",
                                className: getStatusClass(item.status),
                                children: item.status,
                              }),
                            ],
                          },
                          itemIdx,
                        );
                      }),
                    }),
                  ],
                },
                idx,
              );
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
        className: "flex justify-between",
        children: [
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            variant: "outline",
            children: "Export Report",
          }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            children: "Run New Audit",
          }),
        ],
      }),
    ],
  });
}
exports.default = AuditSummary;
