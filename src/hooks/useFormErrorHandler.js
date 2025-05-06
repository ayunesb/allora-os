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
exports.useFormErrorHandler = useFormErrorHandler;
var react_1 = require("react");
var sonner_1 = require("sonner");
var loggingService_1 = require("@/utils/loggingService");
function useFormErrorHandler(form, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.showToast,
    showToast = _a === void 0 ? true : _a,
    _b = options.logErrors,
    logErrors = _b === void 0 ? true : _b;
  var _c = (0, react_1.useState)({}),
    serverErrors = _c[0],
    setServerErrors = _c[1];
  /**
   * Maps server-side validation errors to form fields
   */
  var handleServerValidationErrors = (0, react_1.useCallback)(
    function (errors) {
      // Clear existing errors first
      setServerErrors({});
      // Set field errors from server response
      Object.entries(errors).forEach(function (_a) {
        var field = _a[0],
          messages = _a[1];
        if (messages && messages.length > 0) {
          form.setError(field, {
            type: "server",
            message: messages[0],
          });
          setServerErrors(function (prev) {
            var _a;
            return __assign(
              __assign({}, prev),
              ((_a = {}), (_a[field] = messages[0]), _a),
            );
          });
        }
      });
      if (logErrors) {
        loggingService_1.logger.warn("Form validation errors:", errors);
      }
      if (showToast) {
        sonner_1.toast.error("Please correct the errors in the form");
      }
    },
    [form, logErrors, showToast],
  );
  /**
   * Handle API or submission errors
   */
  var handleSubmissionError = (0, react_1.useCallback)(
    function (error) {
      var _a;
      // Check if this is a validation error with field-specific messages
      if (
        error.code === "VALIDATION_ERROR" &&
        ((_a = error.context) === null || _a === void 0
          ? void 0
          : _a.fieldErrors)
      ) {
        handleServerValidationErrors(error.context.fieldErrors);
        return;
      }
      // Generic error handling
      if (showToast) {
        sonner_1.toast.error(
          error.message || "An error occurred while submitting the form",
        );
      }
      if (logErrors) {
        loggingService_1.logger.error("Form submission error:", error);
      }
      // Set a generic form error
      form.setError("root.serverError", {
        type: "server",
        message: error.message || "An error occurred",
      });
      setServerErrors(function (prev) {
        return __assign(__assign({}, prev), {
          form: error.message || "An error occurred",
        });
      });
    },
    [form, handleServerValidationErrors, logErrors, showToast],
  );
  /**
   * Get a single server error by field name
   */
  var getServerError = (0, react_1.useCallback)(
    function (field) {
      return serverErrors[field];
    },
    [serverErrors],
  );
  /**
   * Clear all server errors
   */
  var clearServerErrors = (0, react_1.useCallback)(function () {
    setServerErrors({});
  }, []);
  /**
   * Format client-side validation errors for logging
   */
  var formatClientErrors = (0, react_1.useCallback)(function (errors) {
    return Object.entries(errors).reduce(function (acc, _a) {
      var key = _a[0],
        value = _a[1];
      // Fixed type error by safely accessing the error message
      var message = value === null || value === void 0 ? void 0 : value.message;
      acc[key] = typeof message === "string" ? message : "Invalid value";
      return acc;
    }, {});
  }, []);
  return {
    serverErrors: serverErrors,
    getServerError: getServerError,
    clearServerErrors: clearServerErrors,
    handleServerValidationErrors: handleServerValidationErrors,
    handleSubmissionError: handleSubmissionError,
    formatClientErrors: formatClientErrors,
  };
}
