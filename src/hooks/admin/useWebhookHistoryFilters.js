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
exports.useWebhookHistoryFilters = useWebhookHistoryFilters;
var react_1 = require("react");
function useWebhookHistoryFilters() {
  var _a = (0, react_1.useState)({
      types: [],
      status: "",
      dateRange: [null, null],
      search: "",
    }),
    filter = _a[0],
    setFilter = _a[1];
  var updateFilter = function (newFilter) {
    setFilter(function (prev) {
      return __assign(__assign({}, prev), newFilter);
    });
  };
  var resetFilter = function () {
    setFilter({
      types: [],
      status: "",
      dateRange: [null, null],
      search: "",
    });
  };
  var setTypeFilter = function (types) {
    updateFilter({ types: types });
  };
  var setStatusFilter = function (status) {
    updateFilter({ status: status });
  };
  var setDateRangeFilter = function (dateRange) {
    updateFilter({ dateRange: dateRange });
  };
  var setSearchFilter = function (search) {
    updateFilter({ search: search });
  };
  return {
    filter: filter,
    updateFilter: updateFilter,
    resetFilter: resetFilter,
    setTypeFilter: setTypeFilter,
    setStatusFilter: setStatusFilter,
    setDateRangeFilter: setDateRangeFilter,
    setSearchFilter: setSearchFilter,
  };
}
exports.default = useWebhookHistoryFilters;
