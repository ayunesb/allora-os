"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SystemHealth;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_helmet_async_1 = require("react-helmet-async");
var card_1 = require("@/components/ui/card");
var tabs_1 = require("@/components/ui/tabs");
var separator_1 = require("@/components/ui/separator");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var PerformanceMetrics_1 = require("@/components/monitoring/PerformanceMetrics");
var AlertsPanel_1 = require("@/components/monitoring/AlertsPanel");
var monitoring_1 = require("@/utils/monitoring");
var use_toast_1 = require("@/components/ui/use-toast");
function SystemHealth() {
  var _a = (0, react_1.useState)("overview"),
    activeTab = _a[0],
    setActiveTab = _a[1];
  var _b = (0, react_1.useState)([]),
    services = _b[0],
    setServices = _b[1];
  var _c = (0, react_1.useState)(false),
    loading = _c[0],
    setLoading = _c[1];
  var toast = (0, use_toast_1.useToast)().toast;
  // Simulate fetching service health on load
  (0, react_1.useEffect)(function () {
    checkServiceHealth();
    // Set up periodic health checks
    var interval = setInterval(checkServiceHealth, 60000);
    return function () {
      return clearInterval(interval);
    };
  }, []);
  // Simulate service health check
  var checkServiceHealth = function () {
    setLoading(true);
    // Simulate API call delay
    setTimeout(function () {
      var mockServices = [
        {
          name: "Authentication Service",
          status: Math.random() > 0.9 ? "degraded" : "healthy",
          latency: Math.floor(Math.random() * 100) + 50,
          lastChecked: new Date(),
        },
        {
          name: "Database",
          status: Math.random() > 0.95 ? "down" : "healthy",
          latency: Math.floor(Math.random() * 50) + 20,
          lastChecked: new Date(),
        },
        {
          name: "API Gateway",
          status: "healthy",
          latency: Math.floor(Math.random() * 80) + 40,
          lastChecked: new Date(),
        },
        {
          name: "Storage Service",
          status: Math.random() > 0.92 ? "degraded" : "healthy",
          latency: Math.floor(Math.random() * 120) + 30,
          lastChecked: new Date(),
        },
        {
          name: "AI Processing",
          status: "healthy",
          latency: Math.floor(Math.random() * 150) + 70,
          lastChecked: new Date(),
        },
        {
          name: "Notification Service",
          status: Math.random() > 0.97 ? "down" : "healthy",
          latency: Math.floor(Math.random() * 60) + 30,
          lastChecked: new Date(),
        },
      ];
      // Add messages for non-healthy services
      mockServices.forEach(function (service) {
        if (service.status === "degraded") {
          service.message = "High latency detected";
          // Log warning for degraded services
          monitoring_1.monitoring.triggerAlert(
            "".concat(service.name, " Degraded"),
            ""
              .concat(service.name, " is experiencing high latency (")
              .concat(service.latency, "ms)"),
            "warning",
            { service: service.name, latency: service.latency },
          );
        } else if (service.status === "down") {
          service.message = "Service is unavailable";
          // Log error for down services
          monitoring_1.monitoring.triggerAlert(
            "".concat(service.name, " Unavailable"),
            "".concat(service.name, " is currently down"),
            "critical",
            { service: service.name, time: new Date().toISOString() },
          );
          // Show toast for down services
          toast({
            title: "".concat(service.name, " Down"),
            description: "".concat(service.name, " is currently unavailable"),
            variant: "destructive",
          });
        }
      });
      setServices(mockServices);
      setLoading(false);
      // Log success
      monitoring_1.monitoring.triggerAlert(
        "Health Check Completed",
        "Checked ".concat(mockServices.length, " services"),
        "info",
        {
          healthy: mockServices.filter(function (s) {
            return s.status === "healthy";
          }).length,
          degraded: mockServices.filter(function (s) {
            return s.status === "degraded";
          }).length,
          down: mockServices.filter(function (s) {
            return s.status === "down";
          }).length,
        },
      );
    }, 1000);
  };
  // Calculate overall system health
  var calculateSystemHealth = function () {
    if (!services.length) return { status: "healthy", percentage: 100 };
    var downServices = services.filter(function (s) {
      return s.status === "down";
    }).length;
    var degradedServices = services.filter(function (s) {
      return s.status === "degraded";
    }).length;
    if (downServices > 0) {
      // If any service is down, system is down
      var percentage = 100 - (downServices / services.length) * 100;
      return { status: "down", percentage: percentage };
    } else if (degradedServices > 0) {
      // If any service is degraded, system is degraded
      var percentage = 100 - (degradedServices / services.length) * 50;
      return { status: "degraded", percentage: percentage };
    } else {
      return { status: "healthy", percentage: 100 };
    }
  };
  var systemHealth = calculateSystemHealth();
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
  // Get status color class
  var getStatusColorClass = function (status) {
    switch (status) {
      case "healthy":
        return "bg-green-50 text-green-700 border-green-200";
      case "degraded":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "down":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "";
    }
  };
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsx)(react_helmet_async_1.Helmet, {
        children: (0, jsx_runtime_1.jsx)("title", {
          children: "System Health Dashboard | Allora AI",
        }),
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "container mx-auto px-4 py-8",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex justify-between items-center mb-6",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                children: [
                  (0, jsx_runtime_1.jsx)("h1", {
                    className: "text-3xl font-bold tracking-tight",
                    children: "System Health",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-muted-foreground",
                    children: "Monitor system performance and service status",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                onClick: checkServiceHealth,
                disabled: loading,
                className: "flex items-center",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                    className: "mr-2 h-4 w-4 ".concat(
                      loading ? "animate-spin" : "",
                    ),
                  }),
                  "Refresh",
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
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
                        className:
                          "flex items-center justify-between text-sm mb-1",
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
                          style: {
                            width: "".concat(systemHealth.percentage, "%"),
                          },
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
                              className:
                                "w-3 h-3 rounded-full bg-green-500 mr-2",
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              children: "Operational",
                            }),
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
          }),
          (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
            defaultValue: "overview",
            value: activeTab,
            onValueChange: function (value) {
              return setActiveTab(value);
            },
            children: [
              (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                className: "grid w-full grid-cols-3 mb-6",
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
                    value: "alerts",
                    children: "Alerts",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "overview",
                className: "space-y-6",
                children: (0, jsx_runtime_1.jsxs)("div", {
                  className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                      className: "md:col-span-2",
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                          children: [
                            (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                              className: "flex items-center",
                              children: [
                                (0, jsx_runtime_1.jsx)(
                                  lucide_react_1.BarChart3,
                                  { className: "h-5 w-5 mr-2" },
                                ),
                                "Real-time Metrics",
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                              children:
                                "System performance and resource utilization",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                          children: (0, jsx_runtime_1.jsx)(
                            PerformanceMetrics_1.default,
                            {},
                          ),
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                          children: [
                            (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                              children: "Recent Alerts",
                            }),
                            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                              children:
                                "Latest system alerts and notifications",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                          children: (0, jsx_runtime_1.jsx)(
                            AlertsPanel_1.default,
                            { maxAlerts: 3 },
                          ),
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                          children: [
                            (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                              children: "Service Status",
                            }),
                            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                              children: "Current status of critical services",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                          children: (0, jsx_runtime_1.jsxs)("div", {
                            className: "space-y-4",
                            children: [
                              services.slice(0, 4).map(function (service) {
                                return (0, jsx_runtime_1.jsxs)(
                                  "div",
                                  {
                                    className:
                                      "flex items-center justify-between",
                                    children: [
                                      (0, jsx_runtime_1.jsxs)("div", {
                                        className: "flex items-center",
                                        children: [
                                          getStatusIcon(service.status),
                                          (0, jsx_runtime_1.jsx)("span", {
                                            className: "ml-2",
                                            children: service.name,
                                          }),
                                        ],
                                      }),
                                      (0, jsx_runtime_1.jsx)("span", {
                                        className:
                                          "text-sm px-2 py-1 rounded-full ".concat(
                                            getStatusColorClass(service.status),
                                          ),
                                        children: service.status,
                                      }),
                                    ],
                                  },
                                  service.name,
                                );
                              }),
                              services.length > 4 &&
                                (0, jsx_runtime_1.jsx)(button_1.Button, {
                                  variant: "outline",
                                  size: "sm",
                                  className: "w-full mt-2",
                                  onClick: function () {
                                    return setActiveTab("services");
                                  },
                                  children: "View All Services",
                                }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "services",
                children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                      children: [
                        (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                          children: "Service Health",
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                          children: "Detailed status of all system services",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                      children: (0, jsx_runtime_1.jsx)("div", {
                        className: "space-y-4",
                        children: services.map(function (service) {
                          return (0, jsx_runtime_1.jsxs)(
                            "div",
                            {
                              children: [
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className:
                                    "flex items-center justify-between mb-2",
                                  children: [
                                    (0, jsx_runtime_1.jsxs)("div", {
                                      className: "flex items-center",
                                      children: [
                                        getStatusIcon(service.status),
                                        (0, jsx_runtime_1.jsx)("span", {
                                          className: "ml-2 font-medium",
                                          children: service.name,
                                        }),
                                      ],
                                    }),
                                    (0, jsx_runtime_1.jsx)("span", {
                                      className:
                                        "text-sm px-2 py-1 rounded-full ".concat(
                                          getStatusColorClass(service.status),
                                        ),
                                      children: service.status,
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className:
                                    "grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-md text-sm",
                                  children: [
                                    (0, jsx_runtime_1.jsxs)("div", {
                                      children: [
                                        (0, jsx_runtime_1.jsx)("span", {
                                          className: "text-muted-foreground",
                                          children: "Latency:",
                                        }),
                                        (0, jsx_runtime_1.jsxs)("span", {
                                          className: "ml-2 font-medium",
                                          children: [service.latency, "ms"],
                                        }),
                                      ],
                                    }),
                                    (0, jsx_runtime_1.jsxs)("div", {
                                      children: [
                                        (0, jsx_runtime_1.jsx)("span", {
                                          className: "text-muted-foreground",
                                          children: "Last Checked:",
                                        }),
                                        (0, jsx_runtime_1.jsxs)("span", {
                                          className: "ml-2 font-medium",
                                          children: [
                                            service.lastChecked
                                              ? service.lastChecked.toLocaleTimeString()
                                              : "N/A",
                                            " ",
                                          ],
                                        }),
                                      ],
                                    }),
                                    service.message &&
                                      (0, jsx_runtime_1.jsxs)("div", {
                                        className: "col-span-2",
                                        children: [
                                          (0, jsx_runtime_1.jsx)("span", {
                                            className: "text-muted-foreground",
                                            children: "Message:",
                                          }),
                                          (0, jsx_runtime_1.jsx)("span", {
                                            className: "ml-2 font-medium",
                                            children: service.message,
                                          }),
                                        ],
                                      }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)(separator_1.Separator, {
                                  className: "my-4",
                                }),
                              ],
                            },
                            service.name,
                          );
                        }),
                      }),
                    }),
                  ],
                }),
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "alerts",
                children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                      children: [
                        (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                          children: "System Alerts",
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                          children: "Real-time alerts and notifications",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                      children: [
                        (0, jsx_runtime_1.jsx)(AlertsPanel_1.default, {
                          maxAlerts: 10,
                        }),
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "mt-6",
                          children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                            variant: "outline",
                            onClick: function () {
                              // Generate test alerts
                              monitoring_1.monitoring.triggerAlert(
                                "Test Warning Alert",
                                "This is a test warning alert",
                                "warning",
                                { source: "SystemHealth", test: true },
                              );
                              monitoring_1.monitoring.triggerAlert(
                                "Test Error Alert",
                                "This is a test error alert",
                                "error",
                                { source: "SystemHealth", test: true },
                              );
                              toast({
                                title: "Test Alerts Generated",
                                description:
                                  "Created test warning and error alerts",
                              });
                            },
                            children: "Generate Test Alert",
                          }),
                        }),
                      ],
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
