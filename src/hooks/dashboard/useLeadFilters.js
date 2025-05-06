"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLeadFilters = useLeadFilters;
var react_1 = require("react");
function useLeadFilters(initialLeads) {
  if (initialLeads === void 0) {
    initialLeads = [];
  }
  var _a = (0, react_1.useState)(initialLeads),
    leads = _a[0],
    setLeads = _a[1];
  var _b = (0, react_1.useState)({
      status: "all",
      search: "",
      campaignId: undefined,
      startDate: undefined,
      endDate: undefined,
    }),
    filters = _b[0],
    setFilters = _b[1];
  // Add activeFilter state to track the active filter tab
  var _c = (0, react_1.useState)("all"),
    activeFilter = _c[0],
    setActiveFilter = _c[1];
  var updateFilters = (0, react_1.useCallback)(function (newFilters) {
    setFilters(function (prev) {
      return __assign(__assign({}, prev), newFilters);
    });
    // Update activeFilter if status is changing
    if (newFilters.status) {
      setActiveFilter(newFilters.status);
    }
  }, []);
  var resetFilters = (0, react_1.useCallback)(function () {
    setFilters({
      status: "all",
      search: "",
      campaignId: undefined,
      startDate: undefined,
      endDate: undefined,
    });
    setActiveFilter("all");
  }, []);
  var filteredLeads = (0, react_1.useMemo)(
    function () {
      return leads.filter(function (lead) {
        var _a, _b;
        // Filter by status
        if (
          filters.status &&
          filters.status !== "all" &&
          lead.status !== filters.status
        ) {
          return false;
        }
        // Filter by search term
        if (filters.search && filters.search.trim() !== "") {
          var searchTerm = filters.search.toLowerCase();
          var nameMatch = lead.name.toLowerCase().includes(searchTerm);
          var emailMatch =
            ((_a = lead.email) === null || _a === void 0
              ? void 0
              : _a.toLowerCase().includes(searchTerm)) || false;
          var phoneMatch =
            ((_b = lead.phone) === null || _b === void 0
              ? void 0
              : _b.toLowerCase().includes(searchTerm)) || false;
          if (!nameMatch && !emailMatch && !phoneMatch) {
            return false;
          }
        }
        // Filter by campaign
        if (filters.campaignId && lead.campaign_id !== filters.campaignId) {
          return false;
        }
        // Filter by date range
        if (filters.startDate || filters.endDate) {
          var leadDate = new Date(lead.created_at);
          if (filters.startDate && leadDate < filters.startDate) {
            return false;
          }
          if (filters.endDate) {
            var endDatePlus1 = new Date(filters.endDate);
            endDatePlus1.setDate(endDatePlus1.getDate() + 1);
            if (leadDate >= endDatePlus1) {
              return false;
            }
          }
        }
        // If it passes all filters, include it
        return true;
      });
    },
    [leads, filters],
  );
  var filterStats = (0, react_1.useMemo)(
    function () {
      var total = leads.length;
      var filtered = filteredLeads.length;
      var statusCounts = {};
      // Count leads by status
      leads.forEach(function (lead) {
        statusCounts[lead.status] = (statusCounts[lead.status] || 0) + 1;
      });
      return {
        total: total,
        filtered: filtered,
        percentageShown: total > 0 ? Math.round((filtered / total) * 100) : 0,
        statusCounts: statusCounts,
      };
    },
    [leads, filteredLeads],
  );
  return {
    leads: leads,
    setLeads: setLeads,
    filters: filters,
    updateFilters: updateFilters,
    resetFilters: resetFilters,
    filteredLeads: filteredLeads,
    filterStats: filterStats,
    // Add the new properties to the return object
    activeFilter: activeFilter,
    setActiveFilter: setActiveFilter,
  };
}
