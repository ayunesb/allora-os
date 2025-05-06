"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SystemHealthTabs;
var jsx_runtime_1 = require("react/jsx-runtime");
var tabs_1 = require("@/components/ui/tabs");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
function SystemHealthTabs(_a) {
  var activeTab = _a.activeTab,
    onTabChange = _a.onTabChange,
    services = _a.services,
    systemHealth = _a.systemHealth;
  var navigate = (0, react_router_dom_1.useNavigate)();
  var handleFix = function (serviceId) {
    // In a real implementation, this would call an API to attempt to fix the service
    console.log("Attempting to fix service: ".concat(serviceId));
    // For demo purposes, let's navigate to the diagnostics page
    navigate("/admin/diagnostics", {
      state: { serviceToFix: serviceId },
    });
  };
  return (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
    value: activeTab,
    onValueChange: onTabChange,
    className: "w-full",
    children: [
      (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
        className: "mb-4",
        children: [
          (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
            value: "overview",
            children: "Overview",
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
            value: "services",
            children: "Services",
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
            value: "logs",
            children: "System Logs",
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
            value: "performance",
            children: "Performance",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
        value: "overview",
        className: "space-y-4",
        children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
              children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: "System Overview",
              }),
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardContent, {
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "flex flex-col gap-4",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-center justify-between",
                    children: [
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "text-lg",
                        children: "Overall Health",
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "text-lg font-semibold",
                        children: [systemHealth.percentage, "%"],
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "w-full bg-muted rounded-full h-4",
                    children: (0, jsx_runtime_1.jsx)("div", {
                      className: "h-4 rounded-full ".concat(
                        systemHealth.status === "healthy"
                          ? "bg-green-500"
                          : systemHealth.status === "degraded"
                            ? "bg-amber-500"
                            : "bg-destructive",
                      ),
                      style: { width: "".concat(systemHealth.percentage, "%") },
                    }),
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "grid grid-cols-1 md:grid-cols-3 gap-4 mt-4",
                    children: [
                      (0, jsx_runtime_1.jsx)(card_1.Card, {
                        className: "bg-muted/40",
                        children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                          className: "p-4 flex flex-col items-center gap-2",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Server, {
                              className: "h-8 w-8 text-primary",
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "text-center",
                              children: [
                                (0, jsx_runtime_1.jsx)("div", {
                                  className: "font-semibold",
                                  children: "API Services",
                                }),
                                (0, jsx_runtime_1.jsx)("div", {
                                  className: "text-sm text-muted-foreground",
                                  children: "Operational",
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                      (0, jsx_runtime_1.jsx)(card_1.Card, {
                        className: "bg-muted/40",
                        children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                          className: "p-4 flex flex-col items-center gap-2",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Database, {
                              className: "h-8 w-8 text-primary",
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "text-center",
                              children: [
                                (0, jsx_runtime_1.jsx)("div", {
                                  className: "font-semibold",
                                  children: "Database",
                                }),
                                (0, jsx_runtime_1.jsx)("div", {
                                  className: "text-sm text-muted-foreground",
                                  children: "Operational",
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                      (0, jsx_runtime_1.jsx)(card_1.Card, {
                        className: "bg-muted/40",
                        children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                          className: "p-4 flex flex-col items-center gap-2",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Activity, {
                              className: "h-8 w-8 text-primary",
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "text-center",
                              children: [
                                (0, jsx_runtime_1.jsx)("div", {
                                  className: "font-semibold",
                                  children: "Storage",
                                }),
                                (0, jsx_runtime_1.jsx)("div", {
                                  className: "text-sm text-muted-foreground",
                                  children: "Operational",
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex justify-end gap-2 mt-4",
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
                        variant: "outline",
                        size: "sm",
                        className: "gap-2",
                        onClick: function () {
                          var reportData = {
                            timestamp: new Date().toISOString(),
                            health: systemHealth,
                            services: services,
                          };
                          var blob = new Blob(
                            [JSON.stringify(reportData, null, 2)],
                            { type: "application/json" },
                          );
                          var url = URL.createObjectURL(blob);
                          var a = document.createElement("a");
                          a.href = url;
                          a.download = "health-report-".concat(
                            new Date().toISOString().split("T")[0],
                            ".json",
                          );
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                          URL.revokeObjectURL(url);
                        },
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.Download, {
                            className: "h-4 w-4",
                          }),
                          "Export Report",
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
        value: "services",
        className: "space-y-4",
        children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
              children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: "Service Status",
              }),
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardContent, {
              children: (0, jsx_runtime_1.jsx)("div", {
                className: "space-y-4",
                children: services.map(function (service) {
                  return (0, jsx_runtime_1.jsxs)(
                    "div",
                    {
                      className: "border rounded-lg p-4",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex items-center justify-between mb-2",
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex items-center gap-2",
                              children: [
                                (0, jsx_runtime_1.jsx)(lucide_react_1.Server, {
                                  className: "h-5 w-5 text-primary",
                                }),
                                (0, jsx_runtime_1.jsx)("div", {
                                  className: "font-semibold",
                                  children: service.name,
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)("div", {
                              className:
                                "px-2 py-1 rounded-full text-xs ".concat(
                                  service.status === "healthy"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                    : service.status === "degraded"
                                      ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
                                ),
                              children: service.status,
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-muted-foreground mb-3",
                          children: service.description,
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className:
                            "flex justify-between items-center text-xs text-muted-foreground",
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              children: [
                                "Last checked: ",
                                new Date(
                                  service.lastChecked,
                                ).toLocaleTimeString(),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              children: [
                                "Response time: ",
                                service.responseTime || "N/A",
                                " ms",
                              ],
                            }),
                          ],
                        }),
                        service.status !== "healthy" &&
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "mt-3 flex gap-2 justify-end",
                            children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
                              variant: "outline",
                              size: "sm",
                              className: "gap-1",
                              onClick: function () {
                                return handleFix(service.id);
                              },
                              children: [
                                (0, jsx_runtime_1.jsx)(lucide_react_1.Wrench, {
                                  className: "h-3 w-3",
                                }),
                                "Fix Issue",
                              ],
                            }),
                          }),
                      ],
                    },
                    service.id,
                  );
                }),
              }),
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
        value: "logs",
        className: "space-y-4",
        children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
              children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: "System Logs",
              }),
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardContent, {
              children: (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children: "System logs will be displayed here.",
              }),
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
        value: "performance",
        className: "space-y-4",
        children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
              children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: "Performance Metrics",
              }),
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardContent, {
              children: (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children: "Performance metrics will be displayed here.",
              }),
            }),
          ],
        }),
      }),
    ],
  });
}
