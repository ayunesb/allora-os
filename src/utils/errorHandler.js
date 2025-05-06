"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var errorHandler = function (err, req, res, next) {
  var _a;
  var statusCode = err.statusCode || 500;
  var errorMessage =
    (_a = err === null || err === void 0 ? void 0 : err.errorMessage) !==
      null && _a !== void 0
      ? _a
      : "Unknown error";
  var errorResponse = {
    statusCode: statusCode,
    errorMessage: errorMessage,
  };
  res.status(statusCode).json(errorResponse);
};
exports.errorHandler = errorHandler;
