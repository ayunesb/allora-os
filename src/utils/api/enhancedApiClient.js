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
exports.enhancedFetch = exports.clearApiCache = void 0;
exports.useProtectedApi = useProtectedApi;
exports.useApiClient = useApiClient;
var sonner_1 = require("sonner");
var apiClient_1 = require("./apiClient");
var errorHandling_1 = require("@/utils/api/errorHandling");
var react_1 = require("react");
// API cache management
var apiCache = new Map();
var clearApiCache = function (cacheKey) {
  if (cacheKey) {
    apiCache.delete(cacheKey);
  } else {
    apiCache.clear();
  }
};
exports.clearApiCache = clearApiCache;
var enhancedFetch = function (url_1) {
  var args_1 = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    args_1[_i - 1] = arguments[_i];
  }
  return __awaiter(
    void 0,
    __spreadArray([url_1], args_1, true),
    void 0,
    function (url, options) {
      var _a,
        method,
        _b,
        headers,
        body,
        cacheKey,
        _c,
        cacheTTL,
        _d,
        retry,
        _e,
        maxRetries,
        _f,
        timeout,
        successMessage,
        errorMessage,
        effectiveCacheKey,
        cachedItem,
        controller_1,
        timeoutId,
        result,
        error_1;
      if (options === void 0) {
        options = {};
      }
      return __generator(this, function (_g) {
        switch (_g.label) {
          case 0:
            (_a = options.method),
              (method = _a === void 0 ? "GET" : _a),
              (_b = options.headers),
              (headers = _b === void 0 ? {} : _b),
              (body = options.body),
              (cacheKey = options.cacheKey),
              (_c = options.cacheTTL),
              (cacheTTL = _c === void 0 ? 5 * 60 * 1000 : _c),
              (_d = options.retry),
              (retry = _d === void 0 ? false : _d),
              (_e = options.maxRetries),
              (maxRetries = _e === void 0 ? 3 : _e),
              (_f = options.timeout),
              (timeout = _f === void 0 ? 30000 : _f),
              (successMessage = options.successMessage),
              (errorMessage = options.errorMessage);
            effectiveCacheKey =
              cacheKey ||
              ""
                .concat(method, ":")
                .concat(url, ":")
                .concat(body ? JSON.stringify(body) : "");
            // Check cache for GET requests
            if (method === "GET" && apiCache.has(effectiveCacheKey)) {
              cachedItem = apiCache.get(effectiveCacheKey);
              if (cachedItem && Date.now() - cachedItem.timestamp < cacheTTL) {
                return [
                  2 /*return*/,
                  { success: true, data: cachedItem.data, error: null },
                ];
              }
            }
            _g.label = 1;
          case 1:
            _g.trys.push([1, 3, , 4]);
            controller_1 = new AbortController();
            timeoutId = setTimeout(function () {
              return controller_1.abort();
            }, timeout);
            return [
              4 /*yield*/,
              (0, apiClient_1.fetchApi)(
                url,
                method,
                body,
                __assign(__assign({}, headers), {
                  "Content-Type": "application/json",
                }),
              ),
            ];
          case 2:
            result = _g.sent();
            clearTimeout(timeoutId);
            // Cache successful GET responses
            if (method === "GET") {
              apiCache.set(effectiveCacheKey, {
                data: result,
                timestamp: Date.now(),
              });
            }
            if (successMessage) {
              sonner_1.toast.success(successMessage);
            }
            return [2 /*return*/, { success: true, data: result, error: null }];
          case 3:
            error_1 = _g.sent();
            // Handle error with custom message if provided
            (0, errorHandling_1.handleApiError)(error_1, {
              customMessage: errorMessage,
              rethrow: false,
            });
            return [
              2 /*return*/,
              {
                success: false,
                data: null,
                error: error_1,
                statusCode: error_1.statusCode || 500,
                message: error_1.message || errorMessage || "An error occurred",
              },
            ];
          case 4:
            return [2 /*return*/];
        }
      });
    },
  );
};
exports.enhancedFetch = enhancedFetch;
function useProtectedApi(apiFunction, options) {
  var _this = this;
  if (options === void 0) {
    options = {};
  }
  var _a = (0, react_1.useState)(false),
    isLoading = _a[0],
    setIsLoading = _a[1];
  var _b = (0, react_1.useState)(null),
    error = _b[0],
    setError = _b[1];
  var execute = function (params) {
    return __awaiter(_this, void 0, void 0, function () {
      var result, err_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setIsLoading(true);
            setError(null);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [4 /*yield*/, apiFunction(params)];
          case 2:
            result = _a.sent();
            if (options.showSuccessToast) {
              sonner_1.toast.success(
                options.successMessage || "Operation completed successfully",
              );
            }
            if (options.onSuccess) {
              options.onSuccess(result);
            }
            return [2 /*return*/, result];
          case 3:
            err_1 = _a.sent();
            setError(err_1);
            if (options.showErrorToast) {
              sonner_1.toast.error(
                options.errorMessage || err_1.message || "An error occurred",
              );
            }
            if (options.onError) {
              options.onError(err_1);
            }
            (0, errorHandling_1.handleApiError)(err_1, {
              showToast: false, // We're already showing a toast above
              rethrow: false,
            });
            throw err_1;
          case 4:
            setIsLoading(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  return {
    execute: execute,
    isLoading: isLoading,
    error: error,
    fetchApi: apiClient_1.fetchApi,
  };
}
function useApiClient() {
  var _this = this;
  var _a = (0, react_1.useState)(false),
    isLoading = _a[0],
    setIsLoading = _a[1];
  var _b = (0, react_1.useState)(null),
    error = _b[0],
    setError = _b[1];
  var execute = function (endpoint_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(
      _this,
      __spreadArray([endpoint_1], args_1, true),
      void 0,
      function (endpoint, method, data, additionalHeaders) {
        var result, err_2;
        if (method === void 0) {
          method = "GET";
        }
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              setIsLoading(true);
              setError(null);
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, 4, 5]);
              return [
                4 /*yield*/,
                (0, apiClient_1.fetchApi)(
                  endpoint,
                  method,
                  data,
                  additionalHeaders,
                ),
              ];
            case 2:
              result = _a.sent();
              return [2 /*return*/, result];
            case 3:
              err_2 = _a.sent();
              setError(err_2);
              (0, errorHandling_1.handleApiError)(err_2);
              throw err_2;
            case 4:
              setIsLoading(false);
              return [7 /*endfinally*/];
            case 5:
              return [2 /*return*/];
          }
        });
      },
    );
  };
  return {
    fetchApi: apiClient_1.fetchApi,
    execute: execute,
    isLoading: isLoading,
    error: error,
  };
}
