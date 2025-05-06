"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
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
exports.WebhookEventFilters = WebhookEventFilters;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var input_1 = require("@/components/ui/input");
var select_1 = require("@/components/ui/select");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var popover_1 = require("@/components/ui/popover");
var calendar_1 = require("@/components/ui/calendar");
var date_fns_1 = require("date-fns");
var DatePickerWithRange = function (_a) {
  var dateRange = _a.dateRange,
    onDateRangeChange = _a.onDateRangeChange;
  var from = dateRange[0],
    to = dateRange[1];
  var _b = react_1.default.useState(false),
    isCalendarOpen = _b[0],
    setIsCalendarOpen = _b[1];
  var handleSelectDate = function (date) {
    var newDateRange;
    if (!from) {
      newDateRange = [date, null];
    } else if (!to) {
      newDateRange = from > date ? [date, from] : [from, date];
      setIsCalendarOpen(false);
    } else {
      newDateRange = [date, null];
    }
    onDateRangeChange(newDateRange);
  };
  return (0, jsx_runtime_1.jsxs)(popover_1.Popover, {
    open: isCalendarOpen,
    onOpenChange: setIsCalendarOpen,
    children: [
      (0, jsx_runtime_1.jsx)(popover_1.PopoverTrigger, {
        asChild: true,
        children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
          variant: "outline",
          className: "justify-start text-left font-normal w-full",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.CalendarIcon, {
              className: "mr-2 h-4 w-4",
            }),
            from && to
              ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                  children: [
                    (0, date_fns_1.format)(from, "PP"),
                    " - ",
                    (0, date_fns_1.format)(to, "PP"),
                  ],
                })
              : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {
                  children: "Select date range",
                }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(popover_1.PopoverContent, {
        className: "w-auto p-0",
        align: "start",
        children: (0, jsx_runtime_1.jsx)(calendar_1.Calendar, {
          mode: "range",
          selected: {
            from: from,
            to: to,
          },
          onSelect: function (range) {
            onDateRangeChange([
              (range === null || range === void 0 ? void 0 : range.from) ||
                null,
              (range === null || range === void 0 ? void 0 : range.to) || null,
            ]);
          },
          initialFocus: true,
        }),
      }),
    ],
  });
};
function WebhookEventFilters(_a) {
  var filters = _a.filters,
    onFilterChange = _a.onFilterChange,
    availableTypes = _a.availableTypes;
  var handleTypeChange = function (type) {
    var webhookType = type;
    var currentTypes = filters.types || [];
    // Toggle the type selection
    var newTypes = currentTypes.includes(webhookType)
      ? currentTypes.filter(function (t) {
          return t !== webhookType;
        })
      : __spreadArray(
          __spreadArray([], currentTypes, true),
          [webhookType],
          false,
        );
    onFilterChange(__assign(__assign({}, filters), { types: newTypes }));
  };
  var handleStatusChange = function (status) {
    onFilterChange(__assign(__assign({}, filters), { status: status }));
  };
  var handleSearchChange = function (e) {
    onFilterChange(__assign(__assign({}, filters), { search: e.target.value }));
  };
  var handleDateRangeChange = function (dateRange) {
    onFilterChange(__assign(__assign({}, filters), { dateRange: dateRange }));
  };
  var clearFilters = function () {
    onFilterChange({
      types: [],
      status: "",
      dateRange: [null, null],
      search: "",
    });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid grid-cols-1 md:grid-cols-4 gap-4",
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            children: (0, jsx_runtime_1.jsx)(input_1.Input, {
              placeholder: "Search webhooks...",
              value: filters.search,
              onChange: handleSearchChange,
              className: "w-full",
            }),
          }),
          (0, jsx_runtime_1.jsx)("div", {
            children: (0, jsx_runtime_1.jsxs)(select_1.Select, {
              value: filters.status,
              onValueChange: handleStatusChange,
              children: [
                (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                  children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                    placeholder: "Filter by status",
                  }),
                }),
                (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                  children: [
                    (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                      value: "",
                      children: "All Statuses",
                    }),
                    (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                      value: "success",
                      children: "Success",
                    }),
                    (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                      value: "failed",
                      children: "Failed",
                    }),
                    (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                      value: "pending",
                      children: "Pending",
                    }),
                  ],
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)("div", {
            children: (0, jsx_runtime_1.jsx)(DatePickerWithRange, {
              dateRange: filters.dateRange,
              onDateRangeChange: handleDateRangeChange,
            }),
          }),
          (0, jsx_runtime_1.jsx)("div", {
            children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
              onClick: clearFilters,
              variant: "outline",
              className: "w-full",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.X, {
                  className: "h-4 w-4 mr-2",
                }),
                "Clear Filters",
              ],
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "flex flex-wrap gap-2",
        children: availableTypes.map(function (type) {
          return (0, jsx_runtime_1.jsx)(
            button_1.Button,
            {
              variant: filters.types.includes(type) ? "default" : "outline",
              size: "sm",
              onClick: function () {
                return handleTypeChange(type);
              },
              className: "capitalize",
              children: type,
            },
            type,
          );
        }),
      }),
    ],
  });
}
exports.default = WebhookEventFilters;
