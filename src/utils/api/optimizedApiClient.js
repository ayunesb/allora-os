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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
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
exports.optimizedApiClient = void 0;
var sonner_1 = require("sonner");
var loggingService_1 = require("@/utils/loggingService");
var apiClient_1 = require("@/utils/api/apiClient");
/**
 * An optimized API client that focuses on performance and error recovery
 */
exports.optimizedApiClient = {
  /**
   * Fetch data with built-in retry and recovery mechanisms
   */
  fetch: function (endpoint_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(
      void 0,
      __spreadArray([endpoint_1], args_1, true),
      void 0,
      function (endpoint, options) {
        var _a,
          retryStrategy,
          _b,
          maxRetries,
          _c,
          retryDelay,
          fallbackData,
          _d,
          showToastOnError,
          fetchFunction,
          restOptions,
          attempt,
          lastError,
          _loop_1,
          state_1;
        if (options === void 0) {
          options = {};
        }
        return __generator(this, function (_e) {
          switch (_e.label) {
            case 0:
              (_a = options.retryStrategy),
                (retryStrategy = _a === void 0 ? "exponential" : _a),
                (_b = options.maxRetries),
                (maxRetries = _b === void 0 ? 3 : _b),
                (_c = options.retryDelay),
                (retryDelay = _c === void 0 ? 1000 : _c),
                (fallbackData = options.fallbackData),
                (_d = options.showToastOnError),
                (showToastOnError = _d === void 0 ? true : _d),
                (fetchFunction = options.fetchFunction),
                (restOptions = __rest(options, [
                  "retryStrategy",
                  "maxRetries",
                  "retryDelay",
                  "fallbackData",
                  "showToastOnError",
                  "fetchFunction",
                ]));
              attempt = 0;
              lastError = null;
              _loop_1 = function () {
                var response_1, error_1, delay_1;
                return __generator(this, function (_f) {
                  switch (_f.label) {
                    case 0:
                      _f.trys.push([0, 2, , 5]);
                      return [
                        4 /*yield*/,
                        (0, apiClient_1.apiRequest)(
                          // Use provided fetch function or default to standard fetch
                          fetchFunction ||
                            function () {
                              return fetch(endpoint);
                            },
                          __assign(__assign({}, restOptions), {
                            timeout: 15000,
                            retry: attempt < maxRetries,
                            maxRetries: maxRetries - attempt,
                            cacheTTL: 60000,
                            cacheKey: endpoint,
                          }),
                        ),
                      ];
                    case 1:
                      response_1 = _f.sent();
                      if (response_1.status === "success") {
                        return [
                          2 /*return*/,
                          {
                            value: {
                              data: response_1.data,
                              error: null,
                              status: "success",
                              isFallback: false,
                            },
                          },
                        ];
                      } else {
                        // Request completed but returned an error
                        throw response_1.error;
                      }
                      return [3 /*break*/, 5];
                    case 2:
                      error_1 = _f.sent();
                      lastError = error_1;
                      attempt += 1;
                      if (!(attempt <= maxRetries)) return [3 /*break*/, 4];
                      delay_1 = retryDelay;
                      if (retryStrategy === "exponential") {
                        delay_1 = retryDelay * Math.pow(2, attempt - 1);
                      } else if (retryStrategy === "linear") {
                        delay_1 = retryDelay * attempt;
                      }
                      loggingService_1.logger.warn(
                        "API request failed, retrying ("
                          .concat(attempt, "/")
                          .concat(maxRetries, ")..."),
                        {
                          endpoint: endpoint,
                          error:
                            (error_1 === null || error_1 === void 0
                              ? void 0
                              : error_1.message) || "Unknown error",
                          nextRetryDelay: delay_1,
                        },
                      );
                      // Wait before next retry
                      return [
                        4 /*yield*/,
                        new Promise(function (resolve) {
                          return setTimeout(resolve, delay_1);
                        }),
                      ];
                    case 3:
                      // Wait before next retry
                      _f.sent();
                      _f.label = 4;
                    case 4:
                      return [3 /*break*/, 5];
                    case 5:
                      return [2 /*return*/];
                  }
                });
              };
              _e.label = 1;
            case 1:
              if (!(attempt <= maxRetries)) return [3 /*break*/, 3];
              return [5 /*yield**/, _loop_1()];
            case 2:
              state_1 = _e.sent();
              if (typeof state_1 === "object")
                return [2 /*return*/, state_1.value];
              return [3 /*break*/, 1];
            case 3:
              // All retries failed
              if (showToastOnError) {
                sonner_1.toast.error(
                  (lastError === null || lastError === void 0
                    ? void 0
                    : lastError.message) ||
                    "Failed to load data after multiple attempts",
                );
              }
              loggingService_1.logger.error(
                "API request failed after ".concat(maxRetries, " attempts"),
                {
                  endpoint: endpoint,
                  error: lastError,
                },
              );
              // Return fallback data if provided
              if (fallbackData !== undefined) {
                return [
                  2 /*return*/,
                  {
                    data: fallbackData,
                    error: lastError,
                    status: "error",
                    isFallback: true,
                  },
                ];
              }
              return [
                2 /*return*/,
                {
                  data: null,
                  error: lastError,
                  status: "error",
                  isFallback: false,
                },
              ];
          }
        });
      },
    );
  },
  /**
   * Post data with improved error handling and recovery
   */
  post: function (endpoint_1, data_1) {
    var args_1 = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args_1[_i - 2] = arguments[_i];
    }
    return __awaiter(
      void 0,
      __spreadArray([endpoint_1, data_1], args_1, true),
      void 0,
      function (endpoint, data, options) {
        var _a,
          retryStrategy,
          _b,
          maxRetries,
          _c,
          showLoadingToast,
          _d,
          loadingMessage,
          restOptions,
          toastId,
          response_2,
          error_2;
        if (options === void 0) {
          options = {};
        }
        return __generator(this, function (_e) {
          switch (_e.label) {
            case 0:
              (_a = options.retryStrategy),
                (retryStrategy = _a === void 0 ? "linear" : _a),
                (_b = options.maxRetries),
                (maxRetries = _b === void 0 ? 2 : _b),
                (_c = options.showLoadingToast),
                (showLoadingToast = _c === void 0 ? false : _c),
                (_d = options.loadingMessage),
                (loadingMessage = _d === void 0 ? "Processing request..." : _d),
                (restOptions = __rest(options, [
                  "retryStrategy",
                  "maxRetries",
                  "showLoadingToast",
                  "loadingMessage",
                ]));
              if (showLoadingToast) {
                toastId = sonner_1.toast.loading(loadingMessage);
              }
              _e.label = 1;
            case 1:
              _e.trys.push([1, 3, , 4]);
              return [
                4 /*yield*/,
                exports.optimizedApiClient.fetch(
                  endpoint,
                  __assign(__assign({}, restOptions), {
                    retryStrategy: retryStrategy,
                    maxRetries: maxRetries,
                    showToastOnError: false,
                    method: "POST",
                    headers: __assign(
                      { "Content-Type": "application/json" },
                      options.headers || {},
                    ),
                    body: JSON.stringify(data),
                  }),
                ),
              ];
            case 2:
              response_2 = _e.sent();
              if (response_2.status === "success") {
                if (toastId) {
                  sonner_1.toast.success(options.successMessage || "Success", {
                    id: toastId,
                  });
                }
                return [2 /*return*/, response_2];
              } else {
                throw response_2.error;
              }
              return [3 /*break*/, 4];
            case 3:
              error_2 = _e.sent();
              if (toastId) {
                sonner_1.toast.error(
                  (error_2 === null || error_2 === void 0
                    ? void 0
                    : error_2.message) ||
                    options.errorMessage ||
                    "Request failed",
                  { id: toastId },
                );
              }
              return [
                2 /*return*/,
                {
                  data: null,
                  error: error_2,
                  status: "error",
                  isFallback: false,
                },
              ];
            case 4:
              return [2 /*return*/];
          }
        });
      },
    );
  },
  /**
   * Clear cache for specific endpoint or all endpoints
   */
  clearCache: function (endpoint) {
    (0, apiClient_1.clearApiCache)(endpoint);
  },
};
