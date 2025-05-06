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
exports.handleError = handleError;
var sonner_1 = require("sonner");
var loggingService_1 = require("@/utils/loggingService");
function handleError(error, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.showToast,
    showToast = _a === void 0 ? true : _a,
    _b = options.logToConsole,
    logToConsole = _b === void 0 ? true : _b,
    _c = options.logToService,
    logToService = _c === void 0 ? true : _c,
    _d = options.context,
    context = _d === void 0 ? {} : _d,
    _e = options.friendlyMessage,
    friendlyMessage =
      _e === void 0 ? "An error occurred. Please try again." : _e,
    type = options.type;
  // Extract error message
  var errorMessage =
    (error === null || error === void 0 ? void 0 : error.message) ||
    String(error);
  var errorType =
    (error === null || error === void 0 ? void 0 : error.type) ||
    "UNEXPECTED_ERROR";
  var errorDetails = __assign(
    {
      message: errorMessage,
      stack: error === null || error === void 0 ? void 0 : error.stack,
      type: type || errorType,
    },
    context,
  );
  // Log to console
  if (logToConsole) {
    console.error("Error:", errorMessage, errorDetails);
  }
  // Log to service
  if (logToService) {
    loggingService_1.logger.error(errorMessage, errorDetails);
  }
  // Show toast notification
  if (showToast) {
    sonner_1.toast.error(friendlyMessage, {
      description:
        errorMessage.length > 100
          ? errorMessage.substring(0, 100) + "..."
          : errorMessage,
    });
  }
}
