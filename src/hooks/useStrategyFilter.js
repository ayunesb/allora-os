"use strict";
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStrategyFilter = useStrategyFilter;
var react_1 = require("react");
function useStrategyFilter(strategies) {
  if (strategies === void 0) {
    strategies = [];
  }
  var _a = (0, react_1.useState)(""),
    searchQuery = _a[0],
    setSearchQuery = _a[1];
  var _b = (0, react_1.useState)("all"),
    riskFilter = _b[0],
    setRiskFilter = _b[1];
  var _c = (0, react_1.useState)("newest"),
    sortBy = _c[0],
    setSortBy = _c[1];
  var filteredStrategies = (0, react_1.useMemo)(
    function () {
      return (strategies || []).filter(function (strategy) {
        if (
          searchQuery &&
          !strategy.title.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }
        if (riskFilter !== "all") {
          var strategyRisk = strategy.risk || strategy.risk_level;
          if (strategyRisk !== riskFilter) {
            return false;
          }
        }
        return true;
      });
    },
    [strategies, searchQuery, riskFilter],
  );
  var sortedStrategies = (0, react_1.useMemo)(
    function () {
      return __spreadArray([], filteredStrategies, true).sort(function (a, b) {
        switch (sortBy) {
          case "alphabetical":
            return a.title.localeCompare(b.title);
          case "risk": {
            var riskOrder = { High: 0, Medium: 1, Low: 2 };
            var riskA = a.risk || a.risk_level || "Medium";
            var riskB = b.risk || b.risk_level || "Medium";
            return riskOrder[riskA] - riskOrder[riskB];
          }
          case "newest":
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          case "oldest":
            return (
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
            );
          default:
            return 0;
        }
      });
    },
    [filteredStrategies, sortBy],
  );
  return {
    searchQuery: searchQuery,
    setSearchQuery: setSearchQuery,
    riskFilter: riskFilter,
    setRiskFilter: setRiskFilter,
    sortBy: sortBy,
    setSortBy: setSortBy,
    sortedStrategies: sortedStrategies,
  };
}
