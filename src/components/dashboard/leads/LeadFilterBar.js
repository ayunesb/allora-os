"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadFilterBar = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var input_1 = require("@/components/ui/input");
var tabs_1 = require("@/components/ui/tabs");
var LeadFilterBar = function (_a) {
  var searchQuery = _a.searchQuery,
    onSearchChange = _a.onSearchChange,
    activeFilter = _a.activeFilter,
    onFilterChange = _a.onFilterChange;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex flex-col sm:flex-row gap-4 w-full sm:w-auto",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "relative w-full sm:w-72",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.Search, {
            className:
              "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground",
          }),
          (0, jsx_runtime_1.jsx)(input_1.Input, {
            placeholder: "Search leads...",
            className: "pl-8",
            value: searchQuery,
            onChange: function (e) {
              return onSearchChange(e.target.value);
            },
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(tabs_1.Tabs, {
        value: activeFilter,
        onValueChange: onFilterChange,
        className: "w-full sm:w-auto",
        children: (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
          className: "grid grid-cols-4 w-full sm:w-auto",
          children: [
            (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
              value: "all",
              children: "All",
            }),
            (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
              value: "new",
              children: "New",
            }),
            (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
              value: "contacted",
              children: "Contacted",
            }),
            (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
              value: "qualified",
              children: "Qualified",
            }),
          ],
        }),
      }),
    ],
  });
};
exports.LeadFilterBar = LeadFilterBar;
