"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProductionDataPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
function ProductionDataPage() {
  var navigate = (0, react_router_dom_1.useNavigate)();
  var _a = react_1.default.useState(false),
    isProductionMode = _a[0],
    setIsProductionMode = _a[1];
  var toggleProductionMode = function () {
    if (!isProductionMode) {
      if (
        window.confirm(
          "Are you sure you want to switch to production mode? This will affect live data.",
        )
      ) {
        setIsProductionMode(true);
      }
    } else {
      setIsProductionMode(false);
    }
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className:
          "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6",
        children: [
          (0, jsx_runtime_1.jsx)("h2", {
            className: "text-3xl font-bold tracking-tight",
            children: "Production Data Management",
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex gap-2",
            children: [
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "outline",
                size: "sm",
                className: "gap-2",
                onClick: function () {
                  return window.location.reload();
                },
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                    className: "h-4 w-4",
                  }),
                  "Refresh",
                ],
              }),
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: isProductionMode ? "destructive" : "default",
                size: "sm",
                className: "gap-2",
                onClick: toggleProductionMode,
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRightLeft, {
                    className: "h-4 w-4",
                  }),
                  isProductionMode
                    ? "Switch to Development"
                    : "Switch to Production",
                ],
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "bg-muted/30 rounded-lg p-4 mb-6 flex items-center",
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            className: "mr-4",
            children: (0, jsx_runtime_1.jsx)(badge_1.Badge, {
              variant: isProductionMode ? "destructive" : "default",
              className: "px-3 py-1",
              children: isProductionMode
                ? "PRODUCTION MODE"
                : "DEVELOPMENT MODE",
            }),
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "text-sm",
            children: isProductionMode
              ? "You are currently modifying production data. All changes will affect the live system."
              : "You are in development mode. Changes won't affect the production system.",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid grid-cols-1 md:grid-cols-3 gap-6",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                className: "pb-2",
                children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                  className: "flex items-center text-base",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Database, {
                      className: "mr-2 h-5 w-5 text-primary",
                    }),
                    "Database Status",
                  ],
                }),
              }),
              (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "text-sm",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex justify-between mb-2",
                        children: [
                          (0, jsx_runtime_1.jsx)("span", {
                            children: "Connection:",
                          }),
                          (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                            variant: "outline",
                            className:
                              "bg-green-50 text-green-700 border-green-200",
                            children: "Connected",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex justify-between mb-2",
                        children: [
                          (0, jsx_runtime_1.jsx)("span", {
                            children: "Tables:",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "font-medium",
                            children: "32",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex justify-between mb-2",
                        children: [
                          (0, jsx_runtime_1.jsx)("span", {
                            children: "RLS Policies:",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "font-medium",
                            children: "12",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex justify-between",
                        children: [
                          (0, jsx_runtime_1.jsx)("span", {
                            children: "Functions:",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "font-medium",
                            children: "8",
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    variant: "outline",
                    size: "sm",
                    className: "w-full mt-4",
                    onClick: function () {
                      return navigate("/admin/entities");
                    },
                    children: "Manage Database",
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
                  className: "flex items-center text-base",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.ServerCrash, {
                      className: "mr-2 h-5 w-5 text-primary",
                    }),
                    "API Services",
                  ],
                }),
              }),
              (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "text-sm",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex justify-between mb-2",
                        children: [
                          (0, jsx_runtime_1.jsx)("span", {
                            children: "Status:",
                          }),
                          (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                            variant: "outline",
                            className:
                              "bg-green-50 text-green-700 border-green-200",
                            children: "Operational",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex justify-between mb-2",
                        children: [
                          (0, jsx_runtime_1.jsx)("span", {
                            children: "Edge Functions:",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "font-medium",
                            children: "5",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex justify-between mb-2",
                        children: [
                          (0, jsx_runtime_1.jsx)("span", {
                            children: "Webhooks:",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "font-medium",
                            children: "3",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex justify-between",
                        children: [
                          (0, jsx_runtime_1.jsx)("span", {
                            children: "Response Time:",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "font-medium",
                            children: "124ms",
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    variant: "outline",
                    size: "sm",
                    className: "w-full mt-4",
                    onClick: function () {
                      return navigate("/admin/webhooks");
                    },
                    children: "Manage Services",
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
                  className: "flex items-center text-base",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                      className: "mr-2 h-5 w-5 text-primary",
                    }),
                    "Security Status",
                  ],
                }),
              }),
              (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "text-sm",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex justify-between mb-2",
                        children: [
                          (0, jsx_runtime_1.jsx)("span", {
                            children: "Status:",
                          }),
                          (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                            variant: "outline",
                            className:
                              "bg-green-50 text-green-700 border-green-200",
                            children: "Secure",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex justify-between mb-2",
                        children: [
                          (0, jsx_runtime_1.jsx)("span", {
                            children: "API Keys:",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "font-medium",
                            children: "4",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex justify-between mb-2",
                        children: [
                          (0, jsx_runtime_1.jsx)("span", {
                            children: "Auth Providers:",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "font-medium",
                            children: "3",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex justify-between",
                        children: [
                          (0, jsx_runtime_1.jsx)("span", {
                            children: "Last Audit:",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "font-medium",
                            children: "2 days ago",
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    variant: "outline",
                    size: "sm",
                    className: "w-full mt-4",
                    onClick: function () {
                      return navigate("/admin/audit");
                    },
                    children: "Run Security Audit",
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
