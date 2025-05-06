"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StrategyFilters;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
function StrategyFilters(_a) {
  var searchQuery = _a.searchQuery,
    setSearchQuery = _a.setSearchQuery,
    riskFilter = _a.riskFilter,
    setRiskFilter = _a.setRiskFilter,
    sortBy = _a.sortBy,
    setSortBy = _a.setSortBy,
    onExportAll = _a.onExportAll,
    isMobile = _a.isMobile;
  return (0, jsx_runtime_1.jsx)("div", {
    className:
      "bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4 mb-6",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "flex flex-col md:flex-row gap-3",
      children: [
        (0, jsx_runtime_1.jsxs)("div", {
          className: "relative flex-1",
          children: [
            (0, jsx_runtime_1.jsx)("input", {
              type: "text",
              placeholder: "Search strategies...",
              value: searchQuery,
              onChange: function (e) {
                return setSearchQuery(e.target.value);
              },
              className:
                "w-full py-2 px-4 pl-10 bg-gray-800/70 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500",
            }),
            (0, jsx_runtime_1.jsx)("svg", {
              className: "absolute left-3 top-3 h-4 w-4 text-gray-500",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              children: (0, jsx_runtime_1.jsx)("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
              }),
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex gap-3",
          children: [
            (0, jsx_runtime_1.jsxs)("select", {
              value: riskFilter,
              onChange: function (e) {
                return setRiskFilter(e.target.value);
              },
              className:
                "py-2 px-4 bg-gray-800/70 border border-gray-700 rounded-lg text-white appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500",
              children: [
                (0, jsx_runtime_1.jsx)("option", {
                  value: "all",
                  children: "All Risks",
                }),
                (0, jsx_runtime_1.jsx)("option", {
                  value: "Low",
                  children: "Low Risk",
                }),
                (0, jsx_runtime_1.jsx)("option", {
                  value: "Medium",
                  children: "Medium Risk",
                }),
                (0, jsx_runtime_1.jsx)("option", {
                  value: "High",
                  children: "High Risk",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("button", {
              className:
                "py-2 px-4 bg-gray-800/70 border border-gray-700 rounded-lg text-white flex items-center gap-2 hover:bg-gray-700/70 transition-colors",
              onClick: function () {
                var nextSort = sortBy === "newest" ? "oldest" : "newest";
                setSortBy(nextSort);
              },
              children: [
                (0, jsx_runtime_1.jsx)("svg", {
                  className: "h-5 w-5",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  children: (0, jsx_runtime_1.jsx)("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12",
                  }),
                }),
                "Sort",
              ],
            }),
            !isMobile &&
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "outline",
                className:
                  "hidden md:flex border-gray-700 bg-gray-800/50 hover:bg-gray-700/50",
                onClick: onExportAll,
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.FileDown, {
                    className: "mr-2 h-4 w-4",
                  }),
                  "Export All",
                ],
              }),
          ],
        }),
      ],
    }),
  });
}
