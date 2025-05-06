"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === "function" ? Iterator : Object).prototype,
      );
    return (
      (g.next = verb(0)),
      (g["throw"] = verb(1)),
      (g["return"] = verb(2)),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.executeWithRetry = exports.executeWebhook = void 0;
var loggingService_1 = require("@/utils/loggingService");
/**
 * Helper to add jitter to retry delay to prevent thundering herd
 */
var addJitter = function (delay) {
  var jitterFactor = 0.2; // 20% jitter
  var jitterAmount = delay * jitterFactor;
  return delay + Math.random() * jitterAmount * 2 - jitterAmount;
};
/**
 * Execute a single webhook call with improved error handling and logging
 */
var executeWebhook = function (url, payload, type, eventType) {
  return __awaiter(void 0, void 0, void 0, function () {
    var controller_1,
      timeoutId,
      startTime,
      response_1,
      endTime,
      duration,
      error_1,
      errorDetails;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 5, , 6]);
          // Log the request with security measures
          loggingService_1.logger.info(
            "Executing ".concat(type, " webhook for event: ").concat(eventType),
            {
              webhookType: type,
              eventType: eventType,
              targetUrl: url.replace(/\/[^/]*$/, "/***"), // Redact the end of the URL for security
            },
          );
          controller_1 = new AbortController();
          timeoutId = setTimeout(function () {
            return controller_1.abort();
          }, 30000);
          startTime = performance.now();
          _a.label = 1;
        case 1:
          _a.trys.push([1, , 3, 4]);
          return [
            4 /*yield*/,
            fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
              signal: controller_1.signal,
              mode: "no-cors", // Use no-cors for cross-origin webhooks
            }),
          ];
        case 2:
          response_1 = _a.sent();
          endTime = performance.now();
          duration = endTime - startTime;
          loggingService_1.logger.info(
            "Webhook execution completed in ".concat(duration.toFixed(2), "ms"),
            {
              webhookType: type,
              eventType: eventType,
              duration: duration,
            },
          );
          // Since we're using no-cors, we can't actually check the response status
          // Instead, we'll assume success unless there's an error thrown
          return [
            2 /*return*/,
            {
              success: true,
              message: "Webhook executed successfully (no-cors mode)",
              statusCode: 200,
              responseData: { mode: "no-cors" },
              duration: duration,
            },
          ];
        case 3:
          clearTimeout(timeoutId);
          return [7 /*endfinally*/];
        case 4:
          return [3 /*break*/, 6];
        case 5:
          error_1 = _a.sent();
          errorDetails = {
            webhookType: type,
            eventType: eventType,
            errorType: error_1.name,
            errorMessage: error_1.message,
            stack: error_1.stack,
          };
          // Check if this was an abort error (timeout)
          if (error_1.name === "AbortError") {
            loggingService_1.logger.warn(
              "Webhook execution timed out after 30 seconds",
              errorDetails,
            );
            return [
              2 /*return*/,
              {
                success: false,
                message: "Webhook execution timed out after 30 seconds",
                error: new Error("Timeout"),
              },
            ];
          }
          // Network errors
          if (
            error_1.name === "TypeError" &&
            error_1.message.includes("Failed to fetch")
          ) {
            loggingService_1.logger.error(
              "Network error during webhook execution",
              errorDetails,
            );
            return [
              2 /*return*/,
              {
                success: false,
                message: "Network error: unable to reach webhook URL",
                error: error_1,
              },
            ];
          }
          // Generic error fallback
          loggingService_1.logger.error(
            "Webhook execution failed with error: ".concat(error_1.message),
            errorDetails,
          );
          return [
            2 /*return*/,
            {
              success: false,
              message:
                error_1.message || "Unknown error during webhook execution",
              error: error_1,
            },
          ];
        case 6:
          return [2 /*return*/];
      }
    });
  });
};
exports.executeWebhook = executeWebhook;
/**
 * Execute a webhook with enhanced retry logic and performance monitoring
 */
var executeWithRetry = function (url_1, payload_1, type_1, eventType_1) {
  var args_1 = [];
  for (var _i = 4; _i < arguments.length; _i++) {
    args_1[_i - 4] = arguments[_i];
  }
  return __awaiter(
    void 0,
    __spreadArray([url_1, payload_1, type_1, eventType_1], args_1, true),
    void 0,
    function (url, payload, type, eventType, options) {
      var _a,
        maxRetries,
        _b,
        initialDelay,
        _c,
        backoffFactor,
        _d,
        maxDelay,
        _e,
        jitter,
        _f,
        onRetry,
        attempt,
        lastError,
        retrySpan,
        _loop_1,
        state_1;
      if (options === void 0) {
        options = {};
      }
      return __generator(this, function (_g) {
        switch (_g.label) {
          case 0:
            (_a = options.maxRetries),
              (maxRetries = _a === void 0 ? 3 : _a),
              (_b = options.initialDelay),
              (initialDelay = _b === void 0 ? 1000 : _b),
              (_c = options.backoffFactor),
              (backoffFactor = _c === void 0 ? 2 : _c),
              (_d = options.maxDelay),
              (maxDelay = _d === void 0 ? 30000 : _d),
              (_e = options.jitter),
              (jitter = _e === void 0 ? true : _e),
              (_f = options.onRetry),
              (onRetry = _f === void 0 ? function () {} : _f);
            attempt = 0;
            retrySpan = loggingService_1.logger.start(
              "webhook_retry_".concat(type, "_").concat(eventType),
              {
                webhookType: type,
                eventType: eventType,
                maxRetries: maxRetries,
              },
            );
            _g.label = 1;
          case 1:
            _g.trys.push([1, , 5, 6]);
            _loop_1 = function () {
              var result, error_2, delay, actualDelay;
              return __generator(this, function (_h) {
                switch (_h.label) {
                  case 0:
                    _h.trys.push([0, 2, , 3]);
                    return [
                      4 /*yield*/,
                      (0, exports.executeWebhook)(
                        url,
                        payload,
                        type,
                        eventType,
                      ),
                    ];
                  case 1:
                    result = _h.sent();
                    // If successful, return the result
                    if (result.success) {
                      if (attempt > 0) {
                        loggingService_1.logger.info(
                          "Successfully executed "
                            .concat(type, " webhook after ")
                            .concat(attempt, " retries"),
                        );
                      }
                      return [2 /*return*/, { value: result }];
                    }
                    // If not successful but no error was thrown, still consider it an error
                    if (result.error) {
                      lastError = result.error;
                    } else {
                      lastError = new Error(
                        result.message || "Webhook execution failed",
                      );
                    }
                    // If we're out of retries, throw the last error
                    if (attempt >= maxRetries) {
                      throw lastError;
                    }
                    return [3 /*break*/, 3];
                  case 2:
                    error_2 = _h.sent();
                    lastError = error_2;
                    // If we're out of retries, throw the error
                    if (attempt >= maxRetries) {
                      throw error_2;
                    }
                    return [3 /*break*/, 3];
                  case 3:
                    delay = Math.min(
                      initialDelay * Math.pow(backoffFactor, attempt),
                      maxDelay,
                    );
                    actualDelay = jitter ? addJitter(delay) : delay;
                    // Call onRetry callback
                    onRetry(attempt + 1, actualDelay, lastError);
                    // Log retry attempt with more context
                    loggingService_1.logger.warn(
                      "Retrying "
                        .concat(type, " webhook, attempt ")
                        .concat(attempt + 1, " of ")
                        .concat(maxRetries, " after ")
                        .concat(actualDelay, "ms delay"),
                      {
                        webhookType: type,
                        eventType: eventType,
                        attempt: attempt + 1,
                        delay: actualDelay,
                        error:
                          lastError === null || lastError === void 0
                            ? void 0
                            : lastError.message,
                        retryStrategy: "exponential_backoff_with_jitter",
                      },
                    );
                    // Wait before retrying
                    return [
                      4 /*yield*/,
                      new Promise(function (resolve) {
                        return setTimeout(resolve, actualDelay);
                      }),
                    ];
                  case 4:
                    // Wait before retrying
                    _h.sent();
                    attempt++;
                    return [2 /*return*/];
                }
              });
            };
            _g.label = 2;
          case 2:
            if (!(attempt <= maxRetries)) return [3 /*break*/, 4];
            return [5 /*yield**/, _loop_1()];
          case 3:
            state_1 = _g.sent();
            if (typeof state_1 === "object")
              return [2 /*return*/, state_1.value];
            return [3 /*break*/, 2];
          case 4:
            return [3 /*break*/, 6];
          case 5:
            // Ensure retrySpan is closed only once
            retrySpan();
            return [7 /*endfinally*/];
          case 6:
            // We should never reach here, but if we do, return a failure
            return [
              2 /*return*/,
              {
                success: false,
                message:
                  (lastError === null || lastError === void 0
                    ? void 0
                    : lastError.message) || "Maximum retries exceeded",
                error: lastError,
              },
            ];
        }
      });
    },
  );
};
exports.executeWithRetry = executeWithRetry;
