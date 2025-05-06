"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatSessionTime = exports.formatRevenue = void 0;
var formatRevenue = function (amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount);
};
exports.formatRevenue = formatRevenue;
var formatSessionTime = function (seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = Math.round(seconds % 60);
  return "".concat(minutes, "m ").concat(remainingSeconds, "s");
};
exports.formatSessionTime = formatSessionTime;
