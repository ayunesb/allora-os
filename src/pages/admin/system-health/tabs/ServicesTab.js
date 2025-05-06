"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ServicesTab;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var statusUtils_1 = require("../utils/statusUtils");
function ServicesTab(_a) {
  var services = _a.services;
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className: "pb-2",
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            children: "Service Status",
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: "Detailed status of all system services",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "space-y-4",
          children: [
            services.map(function (service) {
              return (0, jsx_runtime_1.jsxs)(
                card_1.Card,
                {
                  className: "mb-4 overflow-hidden",
                  children: [
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "w-full h-1 ".concat(
                        service.status === "healthy"
                          ? "bg-green-500"
                          : service.status === "degraded"
                            ? "bg-amber-500"
                            : "bg-red-500",
                      ),
                    }),
                    (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                      className: "p-4",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex justify-between items-start mb-2",
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              children: [
                                (0, jsx_runtime_1.jsx)("h3", {
                                  className: "font-semibold text-lg",
                                  children: service.name,
                                }),
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "text-sm text-muted-foreground",
                                  children: service.description,
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                              variant: "outline",
                              className: (0, statusUtils_1.getStatusColorClass)(
                                service.status,
                              ),
                              children: (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex items-center gap-1",
                                children: [
                                  (0, jsx_runtime_1.jsx)("div", {
                                    className: "flex-shrink-0",
                                    children: (0, statusUtils_1.getStatusIcon)(
                                      service.status,
                                    ),
                                  }),
                                  (0, jsx_runtime_1.jsx)("span", {
                                    className: "capitalize",
                                    children: service.status,
                                  }),
                                ],
                              }),
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "grid grid-cols-2 gap-4 mt-4",
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              children: [
                                (0, jsx_runtime_1.jsx)("div", {
                                  className: "text-sm text-muted-foreground",
                                  children: "Response Time",
                                }),
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "font-medium",
                                  children: [service.responseTime, " ms"],
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              children: [
                                (0, jsx_runtime_1.jsx)("div", {
                                  className: "text-sm text-muted-foreground",
                                  children: "Last Checked",
                                }),
                                (0, jsx_runtime_1.jsx)("div", {
                                  className: "font-medium",
                                  children: new Date(
                                    service.lastChecked,
                                  ).toLocaleString(),
                                }),
                              ],
                            }),
                          ],
                        }),
                        service.details &&
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "mt-4 pt-4 border-t",
                            children: [
                              (0, jsx_runtime_1.jsx)("div", {
                                className: "text-sm text-muted-foreground",
                                children: "Details",
                              }),
                              (0, jsx_runtime_1.jsx)("div", {
                                className: "font-medium",
                                children: service.details,
                              }),
                            ],
                          }),
                      ],
                    }),
                  ],
                },
                service.id,
              );
            }),
            services.length === 0 &&
              (0, jsx_runtime_1.jsx)("div", {
                className: "text-center py-12 text-muted-foreground",
                children: (0, jsx_runtime_1.jsx)("p", {
                  children: "No services to display",
                }),
              }),
          ],
        }),
      }),
    ],
  });
}
