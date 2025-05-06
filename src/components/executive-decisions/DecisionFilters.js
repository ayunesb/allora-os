"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecisionFilters = DecisionFilters;
var jsx_runtime_1 = require("react/jsx-runtime");
var input_1 = require("@/components/ui/input");
var select_1 = require("@/components/ui/select");
function DecisionFilters(_a) {
  var executiveFilter = _a.executiveFilter,
    setExecutiveFilter = _a.setExecutiveFilter,
    priorityFilter = _a.priorityFilter,
    setPriorityFilter = _a.setPriorityFilter,
    riskFilter = _a.riskFilter,
    setRiskFilter = _a.setRiskFilter,
    searchQuery = _a.searchQuery,
    setSearchQuery = _a.setSearchQuery;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex flex-wrap gap-4 mb-8",
    children: [
      (0, jsx_runtime_1.jsx)(input_1.Input, {
        type: "text",
        placeholder: "Search by task or decision...",
        value: searchQuery,
        onChange: function (e) {
          return setSearchQuery(e.target.value);
        },
        className: "max-w-sm",
      }),
      (0, jsx_runtime_1.jsx)(input_1.Input, {
        type: "text",
        placeholder: "Filter by Executive...",
        value: executiveFilter,
        onChange: function (e) {
          return setExecutiveFilter(e.target.value);
        },
        className: "max-w-sm",
      }),
      (0, jsx_runtime_1.jsxs)(select_1.Select, {
        value: priorityFilter,
        onValueChange: setPriorityFilter,
        children: [
          (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
            className: "w-[180px]",
            children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
              placeholder: "All Priorities",
            }),
          }),
          (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
            children: [
              (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                value: "",
                children: "All Priorities",
              }),
              (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                value: "high",
                children: "High",
              }),
              (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                value: "medium",
                children: "Medium",
              }),
              (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                value: "low",
                children: "Low",
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(select_1.Select, {
        value: riskFilter,
        onValueChange: setRiskFilter,
        children: [
          (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
            className: "w-[180px]",
            children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
              placeholder: "All Risks",
            }),
          }),
          (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
            children: [
              (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                value: "",
                children: "All Risks",
              }),
              [1, 2, 3, 4, 5].map(function (score) {
                return (0, jsx_runtime_1.jsx)(
                  select_1.SelectItem,
                  { value: score.toString(), children: score.toString() },
                  score,
                );
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
