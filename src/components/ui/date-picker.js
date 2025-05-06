"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatePicker = DatePicker;
var jsx_runtime_1 = require("react/jsx-runtime");
var date_fns_1 = require("date-fns");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
var button_1 = require("@/components/ui/button");
var calendar_1 = require("@/components/ui/calendar");
var popover_1 = require("@/components/ui/popover");
function DatePicker(_a) {
  var date = _a.date,
    setDate = _a.setDate,
    _b = _a.label,
    label = _b === void 0 ? "Pick a date" : _b,
    className = _a.className;
  return (0, jsx_runtime_1.jsxs)(popover_1.Popover, {
    children: [
      (0, jsx_runtime_1.jsx)(popover_1.PopoverTrigger, {
        asChild: true,
        children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
          variant: "outline",
          className: (0, utils_1.cn)(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className,
          ),
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, {
              className: "mr-2 h-4 w-4",
            }),
            date
              ? (0, date_fns_1.format)(date, "PPP")
              : (0, jsx_runtime_1.jsx)("span", { children: label }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(popover_1.PopoverContent, {
        className: "w-auto p-0",
        align: "start",
        children: (0, jsx_runtime_1.jsx)(calendar_1.Calendar, {
          mode: "single",
          selected: date,
          onSelect: setDate,
          initialFocus: true,
          className: (0, utils_1.cn)("p-3 pointer-events-auto"),
        }),
      }),
    ],
  });
}
