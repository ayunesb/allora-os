"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTableRow = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var table_1 = require("@/components/ui/table");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var StatusBadge_1 = require("./StatusBadge");
var date_fns_1 = require("date-fns");
var EventTableRow = function (_a) {
  var event = _a.event,
    onViewDetails = _a.onViewDetails,
    onRetry = _a.onRetry;
  var _b = (0, react_1.useState)(false),
    expanded = _b[0],
    setExpanded = _b[1];
  var formatTimestamp = function (timestamp) {
    try {
      return (0, date_fns_1.format)(
        new Date(timestamp),
        "MMM dd, yyyy HH:mm:ss",
      );
    } catch (e) {
      return "Invalid date";
    }
  };
  var toggleExpand = function () {
    setExpanded(!expanded);
  };
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
        className: "group hover:bg-muted/50",
        children: [
          (0, jsx_runtime_1.jsx)(table_1.TableCell, {
            children: (0, jsx_runtime_1.jsx)(StatusBadge_1.default, {
              status: event.status,
            }),
          }),
          (0, jsx_runtime_1.jsxs)(table_1.TableCell, {
            children: [
              (0, jsx_runtime_1.jsx)("div", {
                className: "font-medium",
                children: event.type || "Unknown",
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className: "text-xs text-muted-foreground md:hidden",
                children: event.webhook_type,
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(table_1.TableCell, {
            className: "hidden md:table-cell",
            children: event.webhook_type || "Unknown",
          }),
          (0, jsx_runtime_1.jsx)(table_1.TableCell, {
            className: "hidden md:table-cell",
            children: formatTimestamp(event.timestamp),
          }),
          (0, jsx_runtime_1.jsx)(table_1.TableCell, {
            className: "text-right",
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "flex justify-end items-center space-x-2",
              children: [
                (0, jsx_runtime_1.jsxs)(button_1.Button, {
                  variant: "ghost",
                  size: "icon",
                  onClick: toggleExpand,
                  className: "h-8 w-8",
                  children: [
                    expanded
                      ? (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronUp, {
                          className: "h-4 w-4",
                        })
                      : (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDown, {
                          className: "h-4 w-4",
                        }),
                    (0, jsx_runtime_1.jsx)("span", {
                      className: "sr-only",
                      children: "Toggle details",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(button_1.Button, {
                  variant: "ghost",
                  size: "icon",
                  onClick: function () {
                    return onViewDetails && onViewDetails(event);
                  },
                  className: "h-8 w-8",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Eye, {
                      className: "h-4 w-4",
                    }),
                    (0, jsx_runtime_1.jsx)("span", {
                      className: "sr-only",
                      children: "View details",
                    }),
                  ],
                }),
                event.status === "failed" &&
                  (0, jsx_runtime_1.jsxs)(button_1.Button, {
                    variant: "ghost",
                    size: "icon",
                    onClick: function () {
                      return onRetry && onRetry(event);
                    },
                    className: "h-8 w-8 text-yellow-500 hover:text-yellow-600",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Repeat, {
                        className: "h-4 w-4",
                      }),
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "sr-only",
                        children: "Retry webhook",
                      }),
                    ],
                  }),
              ],
            }),
          }),
        ],
      }),
      expanded &&
        (0, jsx_runtime_1.jsx)(table_1.TableRow, {
          children: (0, jsx_runtime_1.jsx)(table_1.TableCell, {
            colSpan: 5,
            className: "p-0",
            children: (0, jsx_runtime_1.jsx)("div", {
              className: "p-4 bg-muted/30 border-t border-b",
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    children: [
                      (0, jsx_runtime_1.jsx)("h4", {
                        className: "text-sm font-medium mb-1",
                        children: "Request URL",
                      }),
                      (0, jsx_runtime_1.jsx)("pre", {
                        className:
                          "text-xs bg-background p-2 rounded overflow-x-auto",
                        children: event.url || "N/A",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    children: [
                      (0, jsx_runtime_1.jsx)("h4", {
                        className: "text-sm font-medium mb-1",
                        children: "Response",
                      }),
                      (0, jsx_runtime_1.jsx)("pre", {
                        className:
                          "text-xs bg-background p-2 rounded overflow-x-auto",
                        children: event.response || "No response data",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "md:col-span-2",
                    children: [
                      (0, jsx_runtime_1.jsx)("h4", {
                        className: "text-sm font-medium mb-1",
                        children: "Payload",
                      }),
                      (0, jsx_runtime_1.jsx)("pre", {
                        className:
                          "text-xs bg-background p-2 rounded overflow-x-auto",
                        children:
                          JSON.stringify(event.payload, null, 2) ||
                          "No payload data",
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
        }),
    ],
  });
};
exports.EventTableRow = EventTableRow;
exports.default = exports.EventTableRow;
