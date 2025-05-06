"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var calendar_1 = require("@/components/ui/calendar");
var popover_1 = require("@/components/ui/popover");
var lucide_react_1 = require("lucide-react");
var date_fns_1 = require("date-fns");
var AnalyticsDateRangePicker = function (_a) {
  var dateRange = _a.dateRange,
    onDateRangeChange = _a.onDateRangeChange,
    _b = _a.className,
    className = _b === void 0 ? "" : _b;
  var _c = react_1.default.useState(false),
    isOpen = _c[0],
    setIsOpen = _c[1];
  var from = dateRange[0],
    to = dateRange[1];
  // Format the date range for display
  var formattedDateRange = react_1.default.useMemo(
    function () {
      if (from && to) {
        return ""
          .concat((0, date_fns_1.format)(from, "MMM d, yyyy"), " - ")
          .concat((0, date_fns_1.format)(to, "MMM d, yyyy"));
      }
      if (from) {
        return "From ".concat((0, date_fns_1.format)(from, "MMM d, yyyy"));
      }
      if (to) {
        return "Until ".concat((0, date_fns_1.format)(to, "MMM d, yyyy"));
      }
      return "Select date range";
    },
    [from, to],
  );
  return (0, jsx_runtime_1.jsx)("div", {
    className: className,
    children: (0, jsx_runtime_1.jsxs)(popover_1.Popover, {
      open: isOpen,
      onOpenChange: setIsOpen,
      children: [
        (0, jsx_runtime_1.jsx)(popover_1.PopoverTrigger, {
          asChild: true,
          children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "outline",
            className: "w-full justify-start",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.CalendarIcon, {
                className: "mr-2 h-4 w-4",
              }),
              formattedDateRange,
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
                (range === null || range === void 0 ? void 0 : range.to) ||
                  null,
              ]);
              if (range === null || range === void 0 ? void 0 : range.to) {
                setIsOpen(false);
              }
            },
            initialFocus: true,
          }),
        }),
      ],
    }),
  });
};
exports.default = AnalyticsDateRangePicker;
