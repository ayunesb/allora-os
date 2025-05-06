"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCurrency = void 0;
var formatCurrency = function (amount) {
  return "$".concat((amount / 100).toFixed(2));
};
exports.formatCurrency = formatCurrency;
