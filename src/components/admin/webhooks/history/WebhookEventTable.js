"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookEventTable = WebhookEventTable;
var jsx_runtime_1 = require("react/jsx-runtime");
var table_1 = require("@/components/ui/table");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
var skeleton_1 = require("@/components/ui/skeleton");
function WebhookEventTable(_a) {
  var events = _a.events,
    isLoading = _a.isLoading,
    onViewDetail = _a.onViewDetail;
  if (isLoading) {
    return (0, jsx_runtime_1.jsxs)(table_1.Table, {
      children: [
        (0, jsx_runtime_1.jsx)(table_1.TableHeader, {
          children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
            children: [
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                children: "Event Type",
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Status" }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Source" }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Date" }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                children: "Actions",
              }),
            ],
          }),
        }),
        (0, jsx_runtime_1.jsx)(table_1.TableBody, {
          children: Array.from({ length: 5 }).map(function (_, i) {
            return (0, jsx_runtime_1.jsxs)(
              table_1.TableRow,
              {
                children: [
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                      className: "h-4 w-32",
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                      className: "h-4 w-20",
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                      className: "h-4 w-48",
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                      className: "h-4 w-24",
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                      className: "h-8 w-16",
                    }),
                  }),
                ],
              },
              i,
            );
          }),
        }),
      ],
    });
  }
  if (events.length === 0) {
    return (0, jsx_runtime_1.jsx)("div", {
      className: "text-center py-12",
      children: (0, jsx_runtime_1.jsx)("p", {
        className: "text-muted-foreground",
        children: "No webhook events found matching the current filters.",
      }),
    });
  }
  // Format date function
  var formatDate = function (dateString) {
    if (!dateString) return "Unknown";
    try {
      return new Date(dateString).toLocaleString();
    } catch (error) {
      return "Invalid Date";
    }
  };
  // Get status badge color
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
  return (0, jsx_runtime_1.jsx)("div", {
    className: "rounded-md border",
    children: (0, jsx_runtime_1.jsxs)(table_1.Table, {
      children: [
        (0, jsx_runtime_1.jsx)(table_1.TableHeader, {
          children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
            children: [
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                children: "Event Type",
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Status" }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Source" }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Date" }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                className: "text-right",
                children: "Actions",
              }),
            ],
          }),
        }),
        (0, jsx_runtime_1.jsx)(table_1.TableBody, {
          children: events.map(function (event) {
            return (0, jsx_runtime_1.jsxs)(
              table_1.TableRow,
              {
                children: [
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    className: "font-medium",
                    children: event.event_type || event.eventType || "Unknown",
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    children: (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                      className: getStatusColor(event.status),
                      children: event.status,
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    className: "max-w-[200px] truncate",
                    title: event.targetUrl || event.url,
                    children:
                      event.source ||
                      (event.targetUrl || event.url
                        ? new URL(event.targetUrl || event.url || "#").hostname
                        : "Unknown"),
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    children: formatDate(
                      event.created_at || event.timestamp || "",
                    ),
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    className: "text-right",
                    children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
                      size: "sm",
                      variant: "outline",
                      onClick: function () {
                        return onViewDetail(event);
                      },
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Eye, {
                          className: "h-4 w-4 mr-1",
                        }),
                        "View",
                      ],
                    }),
                  }),
                ],
              },
              event.id,
            );
          }),
        }),
      ],
    }),
  });
}
exports.default = WebhookEventTable;
