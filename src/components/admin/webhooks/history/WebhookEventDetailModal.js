"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var dialog_1 = require("@/components/ui/dialog");
var date_fns_1 = require("date-fns");
var badge_1 = require("@/components/ui/badge");
var JsonViewer_1 = require("@/components/JsonViewer");
var WebhookEventDetailModal = function (_a) {
  var event = _a.event,
    isOpen = _a.isOpen,
    onClose = _a.onClose;
  var getStatusBadge = function (status) {
    switch (status.toLowerCase()) {
      case "success":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          className: "bg-green-500/10 text-green-500 border-green-500/20",
          children: "Success",
        });
      case "failed":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          className: "bg-red-500/10 text-red-500 border-red-500/20",
          children: "Failed",
        });
      case "pending":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
          children: "Pending",
        });
      default:
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          variant: "outline",
          children: status,
        });
    }
  };
  var formattedDate =
    event.created_at || event.timestamp
      ? (0, date_fns_1.format)(
          new Date(event.created_at || event.timestamp),
          "PPP p",
        )
      : "Unknown date";
  return (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
    open: isOpen,
    onOpenChange: onClose,
    children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
      className: "max-w-3xl",
      children: [
        (0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, {
          children: [
            (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, {
              children: "Webhook Event Details",
            }),
            (0, jsx_runtime_1.jsxs)(dialog_1.DialogDescription, {
              className: "flex items-center gap-2",
              children: [
                getStatusBadge(event.status),
                (0, jsx_runtime_1.jsx)("span", {
                  className: "text-muted-foreground",
                  children: formattedDate,
                }),
              ],
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "grid gap-4",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)("h3", {
                  className: "text-sm font-medium mb-2",
                  children: "Event Information",
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className:
                    "bg-muted/50 rounded-lg p-3 grid grid-cols-2 gap-2 text-sm",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-muted-foreground",
                          children: "Event Type",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "font-mono",
                          children:
                            event.event_type || event.eventType || event.type,
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-muted-foreground",
                          children: "Source",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          children: event.source || "Unknown",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-muted-foreground",
                          children: "Target URL",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "font-mono truncate",
                          children: event.targetUrl || event.url || "N/A",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-muted-foreground",
                          children: "Duration",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          children: event.duration
                            ? "".concat(event.duration, "ms")
                            : "Not available",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)("h3", {
                  className: "text-sm font-medium mb-2",
                  children: "Payload",
                }),
                (0, jsx_runtime_1.jsx)("div", {
                  className:
                    "bg-muted/50 rounded-lg p-3 max-h-[200px] overflow-auto",
                  children: (0, jsx_runtime_1.jsx)(JsonViewer_1.default, {
                    data: event.payload || {},
                  }),
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)("h3", {
                  className: "text-sm font-medium mb-2",
                  children: "Response",
                }),
                (0, jsx_runtime_1.jsx)("div", {
                  className:
                    "bg-muted/50 rounded-lg p-3 max-h-[200px] overflow-auto",
                  children: (0, jsx_runtime_1.jsx)(JsonViewer_1.default, {
                    data: event.response || {},
                  }),
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
};
exports.default = WebhookEventDetailModal;
