"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDetailsModal = EventDetailsModal;
var jsx_runtime_1 = require("react/jsx-runtime");
var dialog_1 = require("@/components/ui/dialog");
var badge_1 = require("@/components/ui/badge");
var separator_1 = require("@/components/ui/separator");
// Simple JSON viewer component
var JsonViewer = function (_a) {
  var data = _a.data;
  return (0, jsx_runtime_1.jsx)("pre", {
    className: "bg-muted p-4 rounded-md overflow-auto max-h-96 text-xs",
    children: JSON.stringify(data, null, 2),
  });
};
// Format date function
var formatDateTimeString = function (dateString) {
  if (!dateString) return "Unknown";
  try {
    var date = new Date(dateString);
    return date.toLocaleString();
  } catch (error) {
    return "Invalid Date";
  }
};
function EventDetailsModal(_a) {
  var event = _a.event,
    isOpen = _a.isOpen,
    onClose = _a.onClose;
  if (!event) return null;
  // Determine status color
  var getStatusColor = function (status) {
    switch (status) {
      case "success":
        return "bg-green-500 text-white";
      case "failed":
        return "bg-red-500 text-white";
      case "pending":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };
  return (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
    open: isOpen,
    onOpenChange: function () {
      return onClose();
    },
    children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
      className: "max-w-3xl max-h-[80vh] overflow-y-auto",
      children: [
        (0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, {
          children: [
            (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, {
              children: "Webhook Event Details",
            }),
            (0, jsx_runtime_1.jsxs)(dialog_1.DialogDescription, {
              children: ["Event ID: ", event.id],
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "space-y-4",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "grid grid-cols-2 gap-4",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  children: [
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-sm font-medium",
                      children: "Event Type",
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-sm",
                      children:
                        event.event_type ||
                        event.eventType ||
                        event.type ||
                        "Unknown",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  children: [
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-sm font-medium",
                      children: "Status",
                    }),
                    (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                      className: getStatusColor(event.status),
                      children: event.status,
                    }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "grid grid-cols-2 gap-4",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  children: [
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-sm font-medium",
                      children: "Created At",
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-sm",
                      children: formatDateTimeString(
                        event.created_at || event.timestamp || "",
                      ),
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  children: [
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-sm font-medium",
                      children: "Webhook Type",
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-sm capitalize",
                      children: event.webhookType || event.type || "custom",
                    }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-sm font-medium",
                  children: "Target URL",
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-sm break-all",
                  children: event.targetUrl || event.url || "N/A",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(separator_1.Separator, {}),
            event.response &&
              (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    children: [
                      (0, jsx_runtime_1.jsx)("h3", {
                        className: "text-sm font-medium",
                        children: "Response",
                      }),
                      (0, jsx_runtime_1.jsx)(JsonViewer, {
                        data: event.response,
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(separator_1.Separator, {}),
                ],
              }),
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)("h3", {
                  className: "text-sm font-medium",
                  children: "Payload",
                }),
                (0, jsx_runtime_1.jsx)(JsonViewer, {
                  data: event.payload || {},
                }),
              ],
            }),
            event.responseCode &&
              event.responseCode >= 400 &&
              (0, jsx_runtime_1.jsxs)("div", {
                className:
                  "mt-4 p-4 border border-red-300 rounded-md bg-red-50 dark:bg-red-900/20",
                children: [
                  (0, jsx_runtime_1.jsx)("h3", {
                    className:
                      "text-sm font-medium text-red-700 dark:text-red-400",
                    children: "Error Code",
                  }),
                  (0, jsx_runtime_1.jsxs)("p", {
                    className: "text-sm text-red-600 dark:text-red-400",
                    children: ["Response code: ", event.responseCode],
                  }),
                ],
              }),
          ],
        }),
      ],
    }),
  });
}
exports.default = EventDetailsModal;
