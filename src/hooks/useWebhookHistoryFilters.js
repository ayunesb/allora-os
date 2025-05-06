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
function useWebhookHistoryFilters(initialFilters) {
  var _a = (0, react_1.useState)(initialFilters || {}),
    filters = _a[0],
    setFilters = _a[1];
  var updateFilter = function (key, value) {
    setFilters(function (prev) {
      var _a;
      return __assign(__assign({}, prev), ((_a = {}), (_a[key] = value), _a));
    });
  };
  var clearFilters = function () {
    setFilters({});
  };
  return {
    filters: filters,
    updateFilter: updateFilter,
    clearFilters: clearFilters,
  };
}
