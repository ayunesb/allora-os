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
exports.useFilters = useFilters;
var react_1 = require("react");
function useFilters() {
  var _a = (0, react_1.useState)({}),
    filters = _a[0],
    setFilters = _a[1];
  var setPostFilters = (0, react_1.useCallback)(function (newFilters) {
    setFilters(function (prevFilters) {
      return __assign(__assign({}, prevFilters), newFilters);
    });
  }, []);
  var clearFilters = (0, react_1.useCallback)(function () {
    setFilters({});
  }, []);
  return {
    filters: filters,
    setPostFilters: setPostFilters,
    clearFilters: clearFilters,
  };
}
