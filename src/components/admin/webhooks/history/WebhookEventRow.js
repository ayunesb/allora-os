"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var table_1 = require("@/components/ui/table");
var badge_1 = require("@/components/ui/badge");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var formatting_1 = require("@/utils/formatting");
var dateUtils_1 = require("@/utils/dateUtils");
var WebhookEventRow = function (_a) {
  var event = _a.event,
    onViewDetail = _a.onViewDetail;
  // Helper function to determine status badge variant
  var getStatusVariant = function (status) {
    switch (status.toLowerCase()) {
      case "success":
        return {
          variant: "success",
          label: "Success",
          className: "bg-green-500/10 text-green-500 border-green-500/20",
        };
      case "failed":
        return {
          variant: "destructive",
          label: "Failed",
          className: "bg-red-500/10 text-red-500 border-red-500/20",
        };
      case "pending":
        return {
          variant: "outline",
          label: "Pending",
          className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        };
      default:
        return {
          variant: "secondary",
          label: status,
          className: "",
        };
    }
  };
  // Determine the badge variant based on status
  var statusConfig = getStatusVariant(event.status);
  // Either use eventType or event_type property based on which one exists
  var eventType =
    event.eventType || event.event_type || event.type || "unknown";
  // Use the URL from either targetUrl or url property
  var url = event.targetUrl || event.url || "";
  // Format the timestamp
  var timestamp = event.timestamp || event.created_at;
  var formattedTime = timestamp
    ? (0, dateUtils_1.formatRelativeTime)(timestamp)
    : "Unknown time";
  return (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
    children: [
      (0, jsx_runtime_1.jsx)(table_1.TableCell, {
        children: (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          variant: "outline",
          className: statusConfig.className,
          children: statusConfig.label,
        }),
      }),
      (0, jsx_runtime_1.jsx)(table_1.TableCell, {
        children: (0, jsx_runtime_1.jsx)("span", {
          className: "font-mono text-xs",
          children: eventType,
        }),
      }),
      (0, jsx_runtime_1.jsx)(table_1.TableCell, {
        children: (0, jsx_runtime_1.jsx)("span", {
          className: "text-xs truncate block max-w-[200px]",
          title: url,
          children: (0, formatting_1.truncateUrl)(url),
        }),
      }),
      (0, jsx_runtime_1.jsx)(table_1.TableCell, {
        children: (0, jsx_runtime_1.jsx)("span", {
          className: "text-xs text-muted-foreground whitespace-nowrap",
          children: formattedTime,
        }),
      }),
      (0, jsx_runtime_1.jsx)(table_1.TableCell, {
        className: "text-right",
        children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
          variant: "ghost",
          size: "sm",
          onClick: onViewDetail,
          className: "h-8 w-8 p-0",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.Eye, {
              className: "h-4 w-4",
            }),
            (0, jsx_runtime_1.jsx)("span", {
              className: "sr-only",
              children: "View Details",
            }),
          ],
        }),
      }),
    ],
  });
};
exports.default = WebhookEventRow;
