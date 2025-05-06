"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var WebhookHistoryTab = function (_a) {
  var events = _a.events,
    onRefresh = _a.onRefresh,
    isLoading = _a.isLoading;
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className: "flex flex-row items-center justify-between",
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            children: "Webhook Event History",
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "outline",
            size: "sm",
            onClick: onRefresh,
            disabled: isLoading,
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                className: "h-4 w-4 mr-2",
              }),
              "Refresh",
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: isLoading
          ? (0, jsx_runtime_1.jsx)("div", {
              className: "text-center py-8",
              children: "Loading webhook events...",
            })
          : events.length === 0
            ? (0, jsx_runtime_1.jsxs)("div", {
                className: "text-center py-8",
                children: [
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-muted-foreground",
                    children: "No webhook events have been recorded yet.",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm text-muted-foreground mt-1",
                    children:
                      "Events will appear here once webhooks are triggered.",
                  }),
                ],
              })
            : (0, jsx_runtime_1.jsx)("div", {
                className: "space-y-4",
                children: events.map(function (event) {
                  return (0, jsx_runtime_1.jsxs)(
                    "div",
                    {
                      className: "p-4 border rounded-lg",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex justify-between mb-2",
                          children: [
                            (0, jsx_runtime_1.jsx)("span", {
                              className: "font-medium",
                              children: event.event_type,
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              className: "text-sm ".concat(
                                event.status === "success"
                                  ? "text-green-500"
                                  : event.status === "failed"
                                    ? "text-red-500"
                                    : "text-amber-500",
                              ),
                              children: event.status,
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "text-sm text-muted-foreground",
                          children: [
                            (0, jsx_runtime_1.jsxs)("p", {
                              children: [
                                "Target: ",
                                event.targetUrl || event.url,
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("p", {
                              children: [
                                "Time: ",
                                new Date(
                                  event.timestamp || event.created_at,
                                ).toLocaleString(),
                              ],
                            }),
                          ],
                        }),
                      ],
                    },
                    event.id,
                  );
                }),
              }),
      }),
    ],
  });
};
exports.default = WebhookHistoryTab;
