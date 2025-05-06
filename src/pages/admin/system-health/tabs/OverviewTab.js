"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OverviewTab;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var progress_1 = require("@/components/ui/progress");
var lucide_react_1 = require("lucide-react");
var statusUtils_1 = require("../utils/statusUtils");
function OverviewTab(_a) {
  var services = _a.services;
  var calculateHealthPercentage = function () {
    if (services.length === 0) return 0;
    var healthyServices = services.filter(function (s) {
      return s.status === "healthy";
    }).length;
    var degradedServices = services.filter(function (s) {
      return s.status === "degraded";
    }).length;
    return Math.round(
      ((healthyServices + degradedServices * 0.5) / services.length) * 100,
    );
  };
  var healthPercentage = calculateHealthPercentage();
  var getServicesByStatus = function (status) {
    return services.filter(function (service) {
      return service.status === status;
    });
  };
  var healthyServices = getServicesByStatus("healthy");
  var degradedServices = getServicesByStatus("degraded");
  var downServices = getServicesByStatus("down");
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            className: "pb-2",
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: "System Health Overview",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children: "Overall system performance and health metrics",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "flex flex-col gap-4",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-2",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex justify-between text-sm",
                      children: [
                        (0, jsx_runtime_1.jsxs)("span", {
                          children: ["System Health: ", healthPercentage, "%"],
                        }),
                        (0, jsx_runtime_1.jsxs)("span", {
                          children: [
                            healthyServices.length,
                            "/",
                            services.length,
                            " Services Operational",
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                      value: healthPercentage,
                      className: "h-2",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "grid grid-cols-1 md:grid-cols-3 gap-4 mt-4",
                  children: [
                    (0, jsx_runtime_1.jsx)(card_1.Card, {
                      className: "bg-green-50 border-green-200",
                      children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                        className: "p-4 flex justify-between items-center",
                        children: [
                          (0, jsx_runtime_1.jsxs)("div", {
                            children: [
                              (0, jsx_runtime_1.jsx)("div", {
                                className: "text-sm font-medium text-green-700",
                                children: "Healthy",
                              }),
                              (0, jsx_runtime_1.jsx)("div", {
                                className: "text-2xl font-bold text-green-800",
                                children: healthyServices.length,
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
                            className: "h-8 w-8 text-green-500",
                          }),
                        ],
                      }),
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.Card, {
                      className: "bg-amber-50 border-amber-200",
                      children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                        className: "p-4 flex justify-between items-center",
                        children: [
                          (0, jsx_runtime_1.jsxs)("div", {
                            children: [
                              (0, jsx_runtime_1.jsx)("div", {
                                className: "text-sm font-medium text-amber-700",
                                children: "Degraded",
                              }),
                              (0, jsx_runtime_1.jsx)("div", {
                                className: "text-2xl font-bold text-amber-800",
                                children: degradedServices.length,
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
                            className: "h-8 w-8 text-amber-500",
                          }),
                        ],
                      }),
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.Card, {
                      className: "bg-red-50 border-red-200",
                      children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                        className: "p-4 flex justify-between items-center",
                        children: [
                          (0, jsx_runtime_1.jsxs)("div", {
                            children: [
                              (0, jsx_runtime_1.jsx)("div", {
                                className: "text-sm font-medium text-red-700",
                                children: "Down",
                              }),
                              (0, jsx_runtime_1.jsx)("div", {
                                className: "text-2xl font-bold text-red-800",
                                children: downServices.length,
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, {
                            className: "h-8 w-8 text-red-500",
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            className: "pb-2",
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: "Recent Activity",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children: "Recent system events and status changes",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-4",
              children: [
                services.slice(0, 3).map(function (service) {
                  return (0, jsx_runtime_1.jsxs)(
                    "div",
                    {
                      className:
                        "flex items-start space-x-3 border-b pb-3 last:border-0 last:pb-0",
                      children: [
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "mt-0.5",
                          children: (0, statusUtils_1.getStatusIcon)(
                            service.status,
                          ),
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex-1",
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex justify-between",
                              children: [
                                (0, jsx_runtime_1.jsx)("span", {
                                  className: "font-medium",
                                  children: service.name,
                                }),
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className:
                                    "flex items-center text-sm text-muted-foreground",
                                  children: [
                                    (0, jsx_runtime_1.jsx)(
                                      lucide_react_1.Clock,
                                      { className: "h-3 w-3 mr-1" },
                                    ),
                                    (0, jsx_runtime_1.jsx)("span", {
                                      children: new Date(
                                        service.lastChecked,
                                      ).toLocaleTimeString(),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-sm text-muted-foreground",
                              children: service.details,
                            }),
                          ],
                        }),
                      ],
                    },
                    service.id,
                  );
                }),
                services.length === 0 &&
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "text-center py-6 text-muted-foreground",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Server, {
                        className: "h-10 w-10 mx-auto mb-2 opacity-30",
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        children: "No recent activity to display",
                      }),
                    ],
                  }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
