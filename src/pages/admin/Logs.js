"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var LogSecurityAlert_1 = require("@/components/admin/LogSecurityAlert");
var LogsPage = function (_a) {
  var logs = _a.logs;
  return (0, jsx_runtime_1.jsx)("div", {
    children: logs.map(function (log) {
      return (0, jsx_runtime_1.jsx)(
        LogSecurityAlert_1.LogSecurityAlert,
        { level: log.level, message: log.message },
        log.id,
      );
    }),
  });
};
exports.default = LogsPage;
