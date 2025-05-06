"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialMediaFilters = SocialMediaFilters;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var card_1 = require("@/components/ui/card");
var select_1 = require("@/components/ui/select");
var date_fns_1 = require("date-fns");
function SocialMediaFilters(_a) {
  var currentMonth = _a.currentMonth,
    onMonthChange = _a.onMonthChange,
    searchQuery = _a.searchQuery,
    onSearchChange = _a.onSearchChange,
    selectedPlatform = _a.selectedPlatform,
    onPlatformChange = _a.onPlatformChange,
    selectedStatus = _a.selectedStatus,
    onStatusChange = _a.onStatusChange,
    onApplyFilters = _a.onApplyFilters,
    onClearFilters = _a.onClearFilters;
  return (0, jsx_runtime_1.jsx)(card_1.Card, {
    children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
      className: "p-4",
      children: (0, jsx_runtime_1.jsxs)("form", {
        onSubmit: onApplyFilters,
        className: "grid grid-cols-1 md:grid-cols-5 gap-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "relative",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Search, {
                className:
                  "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground",
              }),
              (0, jsx_runtime_1.jsx)(input_1.Input, {
                placeholder: "Search posts...",
                className: "pl-8",
                value: searchQuery,
                onChange: function (e) {
                  return onSearchChange(e.target.value);
                },
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(select_1.Select, {
            value: selectedPlatform,
            onValueChange: onPlatformChange,
            children: [
              (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                  placeholder: "Platform",
                }),
              }),
              (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                children: [
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "",
                    children: "All Platforms",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "Facebook",
                    children: "Facebook",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "Instagram",
                    children: "Instagram",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "LinkedIn",
                    children: "LinkedIn",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "Twitter",
                    children: "Twitter",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "TikTok",
                    children: "TikTok",
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(select_1.Select, {
            value: selectedStatus,
            onValueChange: onStatusChange,
            children: [
              (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                  placeholder: "Status",
                }),
              }),
              (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                children: [
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "",
                    children: "All Statuses",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "draft",
                    children: "Draft",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "scheduled",
                    children: "Scheduled",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "published",
                    children: "Published",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "failed",
                    children: "Failed",
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)("div", {
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center space-x-2",
              children: [
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  variant: "outline",
                  type: "button",
                  onClick: function () {
                    return onMonthChange(
                      (0, date_fns_1.subMonths)(currentMonth, 1),
                    );
                  },
                  size: "icon",
                  children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronLeft, {
                    className: "h-4 w-4",
                  }),
                }),
                (0, jsx_runtime_1.jsx)("span", {
                  className: "font-medium",
                  children: (0, date_fns_1.format)(currentMonth, "MMMM yyyy"),
                }),
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  variant: "outline",
                  type: "button",
                  onClick: function () {
                    return onMonthChange(
                      (0, date_fns_1.addMonths)(currentMonth, 1),
                    );
                  },
                  size: "icon",
                  children: (0, jsx_runtime_1.jsx)(
                    lucide_react_1.ChevronRight,
                    { className: "h-4 w-4" },
                  ),
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex space-x-2",
            children: [
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                type: "submit",
                variant: "default",
                className: "w-full",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Filter, {
                    className: "mr-2 h-4 w-4",
                  }),
                  "Apply Filters",
                ],
              }),
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                type: "button",
                variant: "outline",
                onClick: onClearFilters,
                children: "Clear",
              }),
            ],
          }),
        ],
      }),
    }),
  });
}
