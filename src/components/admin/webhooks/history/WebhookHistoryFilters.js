"use strict";
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WebhookHistoryFilters;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var select_1 = require("@/components/ui/select");
var popover_1 = require("@/components/ui/popover");
var calendar_1 = require("@/components/ui/calendar");
var date_fns_1 = require("date-fns");
var lucide_react_1 = require("lucide-react");
var badge_1 = require("@/components/ui/badge");
var typeOptions = ["zapier", "custom", "slack", "github", "stripe", "notion"];
var statusOptions = ["success", "failed", "pending"];
function WebhookHistoryFilters(_a) {
  var filter = _a.filter,
    onFilterChange = _a.onFilterChange,
    onResetFilters = _a.onResetFilters;
  var _b = (0, react_1.useState)(false),
    datePopoverOpen = _b[0],
    setDatePopoverOpen = _b[1];
  var types = filter.types,
    status = filter.status,
    dateRange = filter.dateRange,
    search = filter.search;
  // Handle type selection/deselection
  var handleTypeSelect = function (type) {
    if (types.includes(type)) {
      onFilterChange({
        types: types.filter(function (t) {
          return t !== type;
        }),
      });
    } else {
      onFilterChange({
        types: __spreadArray(__spreadArray([], types, true), [type], false),
      });
    }
  };
  // Format date range for display
  var formatDateRange = function () {
    var start = dateRange[0],
      end = dateRange[1];
    if (start && end) {
      return ""
        .concat((0, date_fns_1.format)(start, "MMM d, yyyy"), " - ")
        .concat((0, date_fns_1.format)(end, "MMM d, yyyy"));
    }
    if (start) {
      return "From ".concat((0, date_fns_1.format)(start, "MMM d, yyyy"));
    }
    if (end) {
      return "Until ".concat((0, date_fns_1.format)(end, "MMM d, yyyy"));
    }
    return "All dates";
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4 mb-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex items-center justify-between",
        children: [
          (0, jsx_runtime_1.jsx)("h3", {
            className: "text-sm font-semibold",
            children: "Filter Webhook Events",
          }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            variant: "ghost",
            size: "sm",
            onClick: onResetFilters,
            className: "h-7 text-xs",
            children: "Reset filters",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-1",
            children: [
              (0, jsx_runtime_1.jsx)(label_1.Label, {
                htmlFor: "search",
                className: "text-xs",
                children: "Search",
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex",
                children: [
                  (0, jsx_runtime_1.jsx)(input_1.Input, {
                    id: "search",
                    placeholder: "Search by URL or payload",
                    value: search,
                    onChange: function (e) {
                      return onFilterChange({ search: e.target.value });
                    },
                    className: "h-8 text-xs",
                  }),
                  search &&
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      variant: "ghost",
                      size: "icon",
                      className: "h-8 w-8",
                      onClick: function () {
                        return onFilterChange({ search: "" });
                      },
                      children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, {
                        className: "h-3 w-3",
                      }),
                    }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-1",
            children: [
              (0, jsx_runtime_1.jsx)(label_1.Label, {
                htmlFor: "status",
                className: "text-xs",
                children: "Status",
              }),
              (0, jsx_runtime_1.jsxs)(select_1.Select, {
                value: status,
                onValueChange: function (value) {
                  return onFilterChange({ status: value });
                },
                children: [
                  (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                    id: "status",
                    className: "h-8 text-xs",
                    children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                      placeholder: "All statuses",
                    }),
                  }),
                  (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                    children: [
                      (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                        value: "",
                        children: "All statuses",
                      }),
                      statusOptions.map(function (s) {
                        return (0, jsx_runtime_1.jsx)(
                          select_1.SelectItem,
                          { value: s, children: s },
                          s,
                        );
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-1",
            children: [
              (0, jsx_runtime_1.jsx)(label_1.Label, {
                className: "text-xs",
                children: "Date Range",
              }),
              (0, jsx_runtime_1.jsxs)(popover_1.Popover, {
                open: datePopoverOpen,
                onOpenChange: setDatePopoverOpen,
                children: [
                  (0, jsx_runtime_1.jsx)(popover_1.PopoverTrigger, {
                    asChild: true,
                    children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
                      variant: "outline",
                      className:
                        "w-full justify-start text-left h-8 text-xs font-normal",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.CalendarIcon, {
                          className: "mr-2 h-3 w-3",
                        }),
                        formatDateRange(),
                      ],
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(popover_1.PopoverContent, {
                    className: "w-auto p-0",
                    align: "start",
                    children: (0, jsx_runtime_1.jsx)(calendar_1.Calendar, {
                      mode: "range",
                      selected: {
                        from: dateRange[0] || undefined,
                        to: dateRange[1] || undefined,
                      },
                      onSelect: function (range) {
                        onFilterChange({
                          dateRange: [
                            (range === null || range === void 0
                              ? void 0
                              : range.from) || null,
                            (range === null || range === void 0
                              ? void 0
                              : range.to) || null,
                          ],
                        });
                        setDatePopoverOpen(false);
                      },
                      initialFocus: true,
                    }),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-1",
        children: [
          (0, jsx_runtime_1.jsx)(label_1.Label, {
            className: "text-xs",
            children: "Webhook Types",
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "flex flex-wrap gap-2",
            children: typeOptions.map(function (type) {
              return (0, jsx_runtime_1.jsxs)(
                badge_1.Badge,
                {
                  variant: types.includes(type) ? "default" : "outline",
                  className: "cursor-pointer",
                  onClick: function () {
                    return handleTypeSelect(type);
                  },
                  children: [
                    type,
                    types.includes(type) &&
                      (0, jsx_runtime_1.jsx)(lucide_react_1.X, {
                        className: "ml-1 h-3 w-3",
                      }),
                  ],
                },
                type,
              );
            }),
          }),
        ],
      }),
      (types.length > 0 || status || dateRange[0] || dateRange[1] || search) &&
        (0, jsx_runtime_1.jsxs)("div", {
          className:
            "pt-2 flex items-center gap-2 flex-wrap text-xs text-muted-foreground",
          children: [
            (0, jsx_runtime_1.jsx)("span", { children: "Active filters:" }),
            types.length > 0 &&
              (0, jsx_runtime_1.jsxs)("span", {
                children: [
                  types.length,
                  " type",
                  types.length !== 1 ? "s" : "",
                ],
              }),
            status &&
              (0, jsx_runtime_1.jsxs)("span", {
                children: ["Status: ", status],
              }),
            (dateRange[0] || dateRange[1]) &&
              (0, jsx_runtime_1.jsxs)("span", {
                children: ["Date: ", formatDateRange()],
              }),
            search &&
              (0, jsx_runtime_1.jsxs)("span", {
                children: ['Search: "', search, '"'],
              }),
          ],
        }),
    ],
  });
}
