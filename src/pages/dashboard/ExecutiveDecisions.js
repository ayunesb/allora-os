"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ExecutiveDecisions;
var jsx_runtime_1 = require("react/jsx-runtime");
var page_title_1 = require("@/components/ui/page-title");
var DecisionFilters_1 = require("@/components/executive-decisions/DecisionFilters");
var DecisionTable_1 = require("@/components/executive-decisions/DecisionTable");
var PdfExport_1 = require("@/components/executive-decisions/PdfExport");
var useDecisions_1 = require("@/hooks/useDecisions");
var useDecisionFilter_1 = require("@/hooks/useDecisionFilter");
function ExecutiveDecisions() {
  var _a = (0, useDecisions_1.useDecisions)(),
    decisions = _a.decisions,
    loading = _a.loading,
    error = _a.error;
  var _b = (0, useDecisionFilter_1.useDecisionFilter)(decisions),
    executiveFilter = _b.executiveFilter,
    setExecutiveFilter = _b.setExecutiveFilter,
    priorityFilter = _b.priorityFilter,
    setPriorityFilter = _b.setPriorityFilter,
    riskFilter = _b.riskFilter,
    setRiskFilter = _b.setRiskFilter,
    searchQuery = _b.searchQuery,
    setSearchQuery = _b.setSearchQuery,
    filteredDecisions = _b.filteredDecisions;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto py-6",
    children: [
      (0, jsx_runtime_1.jsx)(page_title_1.PageTitle, {
        title: "Executive Decision Log",
        description: "Review decisions made by your AI executive team",
        children: "Executive Decision Log",
      }),
      (0, jsx_runtime_1.jsx)(DecisionFilters_1.DecisionFilters, {
        executiveFilter: executiveFilter,
        setExecutiveFilter: setExecutiveFilter,
        priorityFilter: priorityFilter,
        setPriorityFilter: setPriorityFilter,
        riskFilter: riskFilter,
        setRiskFilter: setRiskFilter,
        searchQuery: searchQuery,
        setSearchQuery: setSearchQuery,
      }),
      (0, jsx_runtime_1.jsx)(PdfExport_1.PdfExport, {
        decisions: filteredDecisions,
      }),
      (0, jsx_runtime_1.jsx)(DecisionTable_1.DecisionTable, {
        decisions: filteredDecisions,
        loading: loading,
        error: error,
      }),
    ],
  });
}
