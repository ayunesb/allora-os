"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var date_fns_1 = require("date-fns");
var lucide_react_1 = require("lucide-react");
var JsonViewer_1 = require("@/components/JsonViewer");
var StatusBadge_1 = require("./StatusBadge");
var EventDetailsPanel = function (_a) {
  var event = _a.event,
    _b = _a.expanded,
    expanded = _b === void 0 ? false : _b;
  if (!expanded) return null;
  // Format the date to relative time
  var relativeTime =
    event.created_at || event.timestamp
      ? (0, date_fns_1.formatDistanceToNow)(
          new Date(event.created_at || event.timestamp),
          { addSuffix: true },
        )
      : "Unknown time";
  // Format webhook type with proper capitalization
  var formatWebhookType = function (type) {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };
  var webhookType =
    event.webhookType || event.webhook_type || event.type || "Unknown";
  var eventType = event.eventType || event.event_type || "Unknown";
  var url = event.targetUrl || event.url || "No URL";
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "bg-muted/30 p-4 rounded-md space-y-4 text-sm",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-start gap-2 mb-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Hash, {
                    className: "h-4 w-4 text-muted-foreground mt-0.5",
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    children: [
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "text-muted-foreground block",
                        children: "ID",
                      }),
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "font-mono text-xs",
                        children: event.id,
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-start gap-2 mb-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, {
                    className: "h-4 w-4 text-muted-foreground mt-0.5",
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    children: [
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "text-muted-foreground block",
                        children: "Time",
                      }),
                      (0, jsx_runtime_1.jsx)("span", {
                        children: relativeTime,
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-start gap-2 mb-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Server, {
                    className: "h-4 w-4 text-muted-foreground mt-0.5",
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    children: [
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "text-muted-foreground block",
                        children: "Type",
                      }),
                      (0, jsx_runtime_1.jsx)("span", {
                        children: formatWebhookType(webhookType),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-start gap-2 mb-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.MessageSquare, {
                    className: "h-4 w-4 text-muted-foreground mt-0.5",
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    children: [
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "text-muted-foreground block",
                        children: "Event",
                      }),
                      (0, jsx_runtime_1.jsx)("span", { children: eventType }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-start gap-2 mb-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, {
                    className: "h-4 w-4 text-muted-foreground mt-0.5",
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    children: [
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "text-muted-foreground block",
                        children: "Duration",
                      }),
                      (0, jsx_runtime_1.jsx)("span", {
                        children: event.duration
                          ? "".concat(event.duration, "ms")
                          : "N/A",
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-start gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                    className: "h-4 w-4 text-muted-foreground mt-0.5",
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    children: [
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "text-muted-foreground block",
                        children: "Status",
                      }),
                      (0, jsx_runtime_1.jsx)(StatusBadge_1.default, {
                        status: event.status,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsx)("span", {
            className: "text-muted-foreground block mb-1",
            children: "Target URL",
          }),
          (0, jsx_runtime_1.jsx)("code", {
            className: "text-xs break-all block p-2 bg-muted rounded",
            children: url,
          }),
        ],
      }),
      event.payload &&
        (0, jsx_runtime_1.jsxs)("div", {
          children: [
            (0, jsx_runtime_1.jsx)("span", {
              className: "text-muted-foreground block mb-1",
              children: "Payload",
            }),
            (0, jsx_runtime_1.jsx)("div", {
              className: "max-h-60 overflow-auto rounded border",
              children: (0, jsx_runtime_1.jsx)(JsonViewer_1.default, {
                data: event.payload,
              }),
            }),
          ],
        }),
      event.response &&
        (0, jsx_runtime_1.jsxs)("div", {
          children: [
            (0, jsx_runtime_1.jsx)("span", {
              className: "text-muted-foreground block mb-1",
              children: "Response",
            }),
            (0, jsx_runtime_1.jsx)("div", {
              className: "max-h-60 overflow-auto rounded border",
              children: (0, jsx_runtime_1.jsx)(JsonViewer_1.default, {
                data: event.response,
              }),
            }),
          ],
        }),
    ],
  });
};
exports.default = EventDetailsPanel;
