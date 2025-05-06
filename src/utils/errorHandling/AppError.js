"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationError = void 0;
exports.createAppError = createAppError;
var errorTypes_1 = require("./errorTypes");
/**
 * Creates an application error with standardized structure
 */
var ApplicationError = /** @class */ (function () {
  function ApplicationError(_a) {
    var message = _a.message,
      _b = _a.code,
      code = _b === void 0 ? errorTypes_1.ErrorType.UNKNOWN : _b,
      data = _a.data,
      source = _a.source,
      _c = _a.isCritical,
      isCritical = _c === void 0 ? false : _c;
    this.message = message;
    this.code = code;
    this.data = data;
    this.timestamp = new Date();
    this.source = source;
    this.isCritical = isCritical;
  }
  ApplicationError.prototype.toString = function () {
    return "[".concat(this.code, "] ").concat(this.message);
  };
  return ApplicationError;
})();
exports.ApplicationError = ApplicationError;
/**
 * Factory function to create an AppError instance
 */
function createAppError(message, code, data, source, isCritical) {
  if (code === void 0) {
    code = errorTypes_1.ErrorType.UNKNOWN;
  }
  if (isCritical === void 0) {
    isCritical = false;
  }
  return new ApplicationError({
    message: message,
    code: code,
    data: data,
    source: source,
    isCritical: isCritical,
  });
}
