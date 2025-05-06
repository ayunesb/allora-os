"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var AnalyticsDateRangePicker_1 = require("./AnalyticsDateRangePicker");
var AnalyticsHeader = function (_a) {
  var isRefreshing = _a.isRefreshing,
    onRefresh = _a.onRefresh,
    _b = _a.dateRange,
    dateRange = _b === void 0 ? [null, null] : _b,
    onDateRangeChange = _a.onDateRangeChange;
  var handleDateRangeChange = function (range) {
    if (onDateRangeChange) {
      onDateRangeChange(range);
    }
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className:
      "flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsx)("h1", {
            className: "text-2xl font-bold",
            children: "Analytics Dashboard",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-muted-foreground",
            children: "Track performance metrics and campaign results",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className:
          "flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto",
        children: [
          onDateRangeChange &&
            (0, jsx_runtime_1.jsx)(AnalyticsDateRangePicker_1.default, {
              dateRange: dateRange,
              onDateRangeChange: handleDateRangeChange,
              className: "w-full sm:w-auto",
            }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "outline",
            size: "icon",
            onClick: onRefresh,
            disabled: isRefreshing,
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCcw, {
                className: "h-4 w-4 ".concat(
                  isRefreshing ? "animate-spin" : "",
                ),
              }),
              (0, jsx_runtime_1.jsx)("span", {
                className: "sr-only",
                children: "Refresh data",
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
exports.default = AnalyticsHeader;
