"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuditLogFilters;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var select_1 = require("@/components/ui/select");
var input_1 = require("@/components/ui/input");
var button_1 = require("@/components/ui/button");
var calendar_1 = require("@/components/ui/calendar");
var popover_1 = require("@/components/ui/popover");
var date_fns_1 = require("date-fns");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
var use_mobile_1 = require("@/hooks/use-mobile");
function AuditLogFilters(_a) {
  var actionFilter = _a.actionFilter,
    setActionFilter = _a.setActionFilter,
    userFilter = _a.userFilter,
    setUserFilter = _a.setUserFilter,
    date = _a.date,
    setDate = _a.setDate,
    onExportLogs = _a.onExportLogs;
  var resetFilters = function () {
    setActionFilter("all");
    setUserFilter("");
    setDate(undefined);
  };
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobileView = ["xs", "mobile"].includes(breakpoint);
  var _b = (0, react_1.useState)(!isMobileView),
    showFilters = _b[0],
    setShowFilters = _b[1];
  // Only show filter toggle on mobile
  var toggleFilters = function () {
    setShowFilters(!showFilters);
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4",
    children: [
      isMobileView &&
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex items-center justify-between",
          children: [
            (0, jsx_runtime_1.jsxs)(button_1.Button, {
              variant: "outline",
              size: "sm",
              onClick: toggleFilters,
              className: "flex items-center",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Filter, {
                  className: "h-4 w-4 mr-2",
                }),
                showFilters ? "Hide Filters" : "Show Filters",
              ],
            }),
            (0, jsx_runtime_1.jsxs)(button_1.Button, {
              variant: "outline",
              size: "sm",
              onClick: onExportLogs,
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Download, {
                  className: "h-4 w-4 mr-2",
                }),
                "Export",
              ],
            }),
          ],
        }),
      (showFilters || !isMobileView) &&
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex flex-col md:flex-row gap-4 items-end",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-2 w-full md:w-48",
              children: [
                (0, jsx_runtime_1.jsx)("label", {
                  className: "text-sm font-medium",
                  children: "Action Type",
                }),
                (0, jsx_runtime_1.jsxs)(select_1.Select, {
                  value: actionFilter,
                  onValueChange: setActionFilter,
                  children: [
                    (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                      children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                        placeholder: "All actions",
                      }),
                    }),
                    (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                      children: [
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "all",
                          children: "All actions",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "DATA_ACCESS",
                          children: "Data Access",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "DATA_MODIFICATION",
                          children: "Data Modification",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "AUTHENTICATION",
                          children: "Authentication",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "SYSTEM_CHANGE",
                          children: "System Change",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "EXPORT",
                          children: "Export",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-2 w-full md:w-60",
              children: [
                (0, jsx_runtime_1.jsx)("label", {
                  className: "text-sm font-medium",
                  children: "User",
                }),
                (0, jsx_runtime_1.jsx)(input_1.Input, {
                  placeholder: "Search by user",
                  value: userFilter,
                  onChange: function (e) {
                    return setUserFilter(e.target.value);
                  },
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-2 w-full md:w-48",
              children: [
                (0, jsx_runtime_1.jsx)("label", {
                  className: "text-sm font-medium",
                  children: "Date",
                }),
                (0, jsx_runtime_1.jsxs)(popover_1.Popover, {
                  children: [
                    (0, jsx_runtime_1.jsx)(popover_1.PopoverTrigger, {
                      asChild: true,
                      children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
                        variant: "outline",
                        className: (0, utils_1.cn)(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground",
                        ),
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, {
                            className: "mr-2 h-4 w-4",
                          }),
                          date
                            ? (0, date_fns_1.format)(date, "PPP")
                            : "Pick a date",
                        ],
                      }),
                    }),
                    (0, jsx_runtime_1.jsx)(popover_1.PopoverContent, {
                      className: "w-auto p-0",
                      children: (0, jsx_runtime_1.jsx)(calendar_1.Calendar, {
                        mode: "single",
                        selected: date,
                        onSelect: setDate,
                        initialFocus: true,
                      }),
                    }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              variant: "outline",
              size: isMobileView ? "sm" : "default",
              onClick: resetFilters,
              children: "Reset",
            }),
            !isMobileView &&
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                className: "ml-auto",
                variant: "outline",
                onClick: onExportLogs,
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Download, {
                    className: "mr-2 h-4 w-4",
                  }),
                  "Export Logs",
                ],
              }),
          ],
        }),
      (actionFilter !== "all" || userFilter || date) &&
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex items-center gap-2 text-sm text-muted-foreground",
          children: [
            (0, jsx_runtime_1.jsx)("span", { children: "Active filters:" }),
            actionFilter !== "all" &&
              (0, jsx_runtime_1.jsxs)("span", {
                className: "bg-muted px-2 py-1 rounded-md flex items-center",
                children: [
                  "Action: ",
                  actionFilter,
                  (0, jsx_runtime_1.jsx)(lucide_react_1.X, {
                    className: "h-3 w-3 ml-1 cursor-pointer",
                    onClick: function () {
                      return setActionFilter("all");
                    },
                  }),
                ],
              }),
            userFilter &&
              (0, jsx_runtime_1.jsxs)("span", {
                className: "bg-muted px-2 py-1 rounded-md flex items-center",
                children: [
                  "User: ",
                  userFilter,
                  (0, jsx_runtime_1.jsx)(lucide_react_1.X, {
                    className: "h-3 w-3 ml-1 cursor-pointer",
                    onClick: function () {
                      return setUserFilter("");
                    },
                  }),
                ],
              }),
            date &&
              (0, jsx_runtime_1.jsxs)("span", {
                className: "bg-muted px-2 py-1 rounded-md flex items-center",
                children: [
                  "Date: ",
                  (0, date_fns_1.format)(date, "PP"),
                  (0, jsx_runtime_1.jsx)(lucide_react_1.X, {
                    className: "h-3 w-3 ml-1 cursor-pointer",
                    onClick: function () {
                      return setDate(undefined);
                    },
                  }),
                ],
              }),
          ],
        }),
    ],
  });
}
