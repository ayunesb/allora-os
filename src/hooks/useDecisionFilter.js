"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDecisionFilter = useDecisionFilter;
var react_1 = require("react");
function useDecisionFilter(decisions) {
  var _a = (0, react_1.useState)(""),
    executiveFilter = _a[0],
    setExecutiveFilter = _a[1];
  var _b = (0, react_1.useState)(""),
    priorityFilter = _b[0],
    setPriorityFilter = _b[1];
  var _c = (0, react_1.useState)(""),
    riskFilter = _c[0],
    setRiskFilter = _c[1];
  var _d = (0, react_1.useState)(""),
    searchQuery = _d[0],
    setSearchQuery = _d[1];
  var filteredDecisions = (0, react_1.useMemo)(
    function () {
      return decisions.filter(function (decision) {
        var _a, _b;
        var matchesExecutive = executiveFilter
          ? decision.executiveName
              .toLowerCase()
              .includes(executiveFilter.toLowerCase())
          : true;
        var matchesPriority = priorityFilter
          ? ((_a = decision.priority) === null || _a === void 0
              ? void 0
              : _a.toLowerCase()) === priorityFilter.toLowerCase()
          : true;
        var matchesRisk = riskFilter
          ? (_b = decision.riskAssessment) === null || _b === void 0
            ? void 0
            : _b.includes(riskFilter)
          : true;
        var matchesSearch = searchQuery
          ? decision.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
            decision.selectedOption
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            (decision.reasoning &&
              decision.reasoning
                .toLowerCase()
                .includes(searchQuery.toLowerCase()))
          : true;
        return (
          matchesExecutive && matchesPriority && matchesRisk && matchesSearch
        );
      });
    },
    [decisions, executiveFilter, priorityFilter, riskFilter, searchQuery],
  );
  return {
    executiveFilter: executiveFilter,
    setExecutiveFilter: setExecutiveFilter,
    priorityFilter: priorityFilter,
    setPriorityFilter: setPriorityFilter,
    riskFilter: riskFilter,
    setRiskFilter: setRiskFilter,
    searchQuery: searchQuery,
    setSearchQuery: setSearchQuery,
    filteredDecisions: filteredDecisions,
  };
}
