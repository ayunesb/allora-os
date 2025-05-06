"use strict";
// Base logger implementation
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
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var LOG_LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};
var DEFAULT_OPTIONS = {
  minLevel: process.env.NODE_ENV === "development" ? "debug" : "info",
  includeTimestamps: true,
};
var Logger = /** @class */ (function () {
  function Logger(options) {
    if (options === void 0) {
      options = {};
    }
    this.options = __assign(__assign({}, DEFAULT_OPTIONS), options);
  }
  Logger.prototype.formatMessage = function (level, message) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    var formattedMessage = message;
    // Add namespace if configured
    if (this.options.namespace) {
      formattedMessage = "["
        .concat(this.options.namespace, "] ")
        .concat(formattedMessage);
    }
    // Add timestamp if configured
    if (this.options.includeTimestamps) {
      var timestamp = new Date().toISOString();
      formattedMessage = "".concat(timestamp, " ").concat(formattedMessage);
    }
    return formattedMessage;
  };
  Logger.prototype.shouldLog = function (level) {
    return LOG_LEVELS[level] >= LOG_LEVELS[this.options.minLevel];
  };
  Logger.prototype.debug = function (message) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    if (this.shouldLog("debug")) {
      console.debug.apply(
        console,
        __spreadArray([this.formatMessage("debug", message)], args, false),
      );
    }
  };
  Logger.prototype.info = function (message) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    if (this.shouldLog("info")) {
      console.info.apply(
        console,
        __spreadArray([this.formatMessage("info", message)], args, false),
      );
    }
  };
  Logger.prototype.warn = function (message) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    if (this.shouldLog("warn")) {
      console.warn.apply(
        console,
        __spreadArray([this.formatMessage("warn", message)], args, false),
      );
    }
  };
  Logger.prototype.error = function (message) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    if (this.shouldLog("error")) {
      console.error.apply(
        console,
        __spreadArray([this.formatMessage("error", message)], args, false),
      );
    }
  };
  Logger.prototype.createSubLogger = function (namespace) {
    return new Logger(
      __assign(__assign({}, this.options), {
        namespace: this.options.namespace
          ? "".concat(this.options.namespace, ":").concat(namespace)
          : namespace,
      }),
    );
  };
  Logger.prototype.setMinLevel = function (level) {
    this.options.minLevel = level;
  };
  return Logger;
})();
// Export singleton instance
exports.logger = new Logger();
