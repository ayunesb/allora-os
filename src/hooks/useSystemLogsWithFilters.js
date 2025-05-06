"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSystemLogsWithFilters = void 0;
var react_1 = require("react");
var useSystemLogsWithFilters = function (logs, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = (0, react_1.useState)([]),
    filteredLogs = _a[0],
    setFilteredLogs = _a[1];
  (0, react_1.useEffect)(
    function () {
      var result = logs;
      if (options.filterByLevel) {
        result = result.filter(function (log) {
          return log.level === options.filterByLevel;
        });
      }
      if (options.searchTerm) {
        result = result.filter(function (log) {
          return options.searchTerm && log.message.includes(options.searchTerm);
        });
      }
      setFilteredLogs(result);
    },
    [logs, options.filterByLevel, options.searchTerm],
  );
  return filteredLogs;
};
exports.useSystemLogsWithFilters = useSystemLogsWithFilters;
