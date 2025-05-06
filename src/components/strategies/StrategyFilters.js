"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var input_1 = require("@/components/ui/input");
var select_1 = require("@/components/ui/select");
var button_1 = require("@/components/ui/button");
var dropdown_menu_1 = require("@/components/ui/dropdown-menu");
var use_mobile_1 = require("@/hooks/use-mobile");
var StrategyFilters = function (_a) {
  var searchQuery = _a.searchQuery,
    setSearchQuery = _a.setSearchQuery,
    riskFilter = _a.riskFilter,
    setRiskFilter = _a.setRiskFilter,
    sortBy = _a.sortBy,
    setSortBy = _a.setSortBy;
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobileOrTablet = breakpoint === "mobile" || breakpoint === "tablet";
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex flex-col sm:flex-row gap-4 mb-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "relative flex-grow",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.Search, {
            className:
              "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground",
          }),
          (0, jsx_runtime_1.jsx)(input_1.Input, {
            placeholder: "Search strategies...",
            className: "pl-8",
            value: searchQuery,
            onChange: function (e) {
              return setSearchQuery(e.target.value);
            },
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex ".concat(isMobileOrTablet ? "w-full" : "", " gap-2"),
        children: [
          (0, jsx_runtime_1.jsxs)(select_1.Select, {
            value: riskFilter,
            onValueChange: setRiskFilter,
            children: [
              (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                className: isMobileOrTablet ? "flex-1" : "w-[140px]",
                children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                  placeholder: "Risk Level",
                }),
              }),
              (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                children: [
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "all",
                    children: "All Risks",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "Low",
                    children: "Low Risk",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "Medium",
                    children: "Medium Risk",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "High",
                    children: "High Risk",
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, {
            children: [
              (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, {
                asChild: true,
                children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
                  variant: "outline",
                  className: "gap-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.SlidersHorizontal, {
                      className: "h-4 w-4",
                    }),
                    !isMobileOrTablet && "Sort",
                  ],
                }),
              }),
              (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuContent, {
                align: "end",
                children: [
                  (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, {
                    onClick: function () {
                      return setSortBy("newest");
                    },
                    className: sortBy === "newest" ? "bg-accent" : "",
                    children: "Newest First",
                  }),
                  (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, {
                    onClick: function () {
                      return setSortBy("oldest");
                    },
                    className: sortBy === "oldest" ? "bg-accent" : "",
                    children: "Oldest First",
                  }),
                  (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, {
                    onClick: function () {
                      return setSortBy("alphabetical");
                    },
                    className: sortBy === "alphabetical" ? "bg-accent" : "",
                    children: "Alphabetical",
                  }),
                  (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, {
                    onClick: function () {
                      return setSortBy("risk");
                    },
                    className: sortBy === "risk" ? "bg-accent" : "",
                    children: "By Risk Level",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
exports.default = StrategyFilters;
