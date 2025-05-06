"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showToast = exports.toast = void 0;
var react_toastify_1 = require("react-toastify");
exports.toast = react_toastify_1.toast;
var showToast = function (message) {
  (0, exports.toast)(message);
};
exports.showToast = showToast;
