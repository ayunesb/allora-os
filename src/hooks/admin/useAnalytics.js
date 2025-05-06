"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAnalytics = useAnalytics;
var react_1 = require("react");
function useAnalytics() {
  var _a = (0, react_1.useState)(null),
    systemAnalytics = _a[0],
    setSystemAnalytics = _a[1];
  var _b = (0, react_1.useState)(null),
    dashboardAnalytics = _b[0],
    setDashboardAnalytics = _b[1];
  return {
    systemAnalytics: systemAnalytics,
    dashboardAnalytics: dashboardAnalytics,
    setSystemAnalytics: setSystemAnalytics,
    setDashboardAnalytics: setDashboardAnalytics,
  };
}
