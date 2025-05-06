"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateRangePicker = DateRangePicker;
var jsx_runtime_1 = require("react/jsx-runtime");
var date_fns_1 = require("date-fns");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
var button_1 = require("@/components/ui/button");
var popover_1 = require("@/components/ui/popover");
var calendar_1 = require("@/components/ui/calendar");
function DateRangePicker(_a) {
  var className = _a.className,
    value = _a.value,
    onChange = _a.onChange;
  return (0, jsx_runtime_1.jsx)("div", {
    className: (0, utils_1.cn)("grid gap-2", className),
    children: (0, jsx_runtime_1.jsxs)(popover_1.Popover, {
      children: [
        (0, jsx_runtime_1.jsx)(popover_1.PopoverTrigger, {
          asChild: true,
          children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
            id: "date",
            variant: "outline",
            className: (0, utils_1.cn)(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground",
            ),
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, {
                className: "mr-2 h-4 w-4",
              }),
              (value === null || value === void 0 ? void 0 : value.from)
                ? value.to
                  ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                      children: [
                        (0, date_fns_1.format)(value.from, "LLL dd, y"),
                        " -",
                        " ",
                        (0, date_fns_1.format)(value.to, "LLL dd, y"),
                      ],
                    })
                  : (0, date_fns_1.format)(value.from, "LLL dd, y")
                : (0, jsx_runtime_1.jsx)("span", {
                    children: "Pick a date range",
                  }),
            ],
          }),
        }),
        (0, jsx_runtime_1.jsx)(popover_1.PopoverContent, {
          className: "w-auto p-0",
          align: "start",
          children: (0, jsx_runtime_1.jsx)(calendar_1.Calendar, {
            initialFocus: true,
            mode: "range",
            defaultMonth:
              value === null || value === void 0 ? void 0 : value.from,
            selected: value,
            onSelect: onChange,
            numberOfMonths: 2,
          }),
        }),
      ],
    }),
  });
}
