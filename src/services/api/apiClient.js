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
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
exports.configureApi = configureApi;
exports.clearCache = clearCache;
exports.request = request;
var loggingService_1 = require("@/utils/loggingService");
var errorHandling_1 = require("@/utils/api/errorHandling");
var sonner_1 = require("sonner");
// Default cache configuration
var defaultCacheConfig = {
  enabled: true,
  maxAge: 5 * 60 * 1000, // 5 minutes
  staleWhileRevalidate: true,
};
var cache = new Map();
// API client configuration
var apiConfig = {
  baseUrl: "",
  defaultHeaders: {
    "Content-Type": "application/json",
  },
  cacheConfig: __assign({}, defaultCacheConfig),
};
/**
 * Configure the API client
 */
function configureApi(config) {
  apiConfig = __assign(
    __assign(
      __assign(
        __assign({}, apiConfig),
        config.baseUrl && { baseUrl: config.baseUrl },
      ),
      config.defaultHeaders && {
        defaultHeaders: __assign(
          __assign({}, apiConfig.defaultHeaders),
          config.defaultHeaders,
        ),
      },
    ),
    config.cacheConfig && {
      cacheConfig: __assign(
        __assign({}, apiConfig.cacheConfig),
        config.cacheConfig,
      ),
    },
  );
}
/**
 * Clear the API cache
 */
function clearCache(cacheKey) {
  if (cacheKey) {
    cache.delete(cacheKey);
  } else {
    cache.clear();
  }
}
/**
 * Main request function
 */
function request(url_1) {
  return __awaiter(this, arguments, void 0, function (url, options) {
    var _a,
      cacheKey,
      _b,
      skipCache,
      cacheTTL,
      _c,
      suppressErrors,
      customErrorHandler,
      successMessage,
      errorMessage,
      fetchOptions,
      headers,
      cachedEntry,
      now,
      response_1,
      data,
      ttl,
      oldestKey,
      error_1;
    if (options === void 0) {
      options = {};
    }
    return __generator(this, function (_d) {
      switch (_d.label) {
        case 0:
          (_a = options.cacheKey),
            (cacheKey = _a === void 0 ? url : _a),
            (_b = options.skipCache),
            (skipCache = _b === void 0 ? false : _b),
            (cacheTTL = options.cacheTTL),
            (_c = options.suppressErrors),
            (suppressErrors = _c === void 0 ? false : _c),
            (customErrorHandler = options.customErrorHandler),
            (successMessage = options.successMessage),
            (errorMessage = options.errorMessage),
            (fetchOptions = __rest(options, [
              "cacheKey",
              "skipCache",
              "cacheTTL",
              "suppressErrors",
              "customErrorHandler",
              "successMessage",
              "errorMessage",
            ]));
          headers = new Headers(fetchOptions.headers);
          Object.entries(apiConfig.defaultHeaders).forEach(function (_a) {
            var key = _a[0],
              value = _a[1];
            if (!headers.has(key)) {
              headers.set(key, value);
            }
          });
          // Check cache if enabled and not skipped
          if (apiConfig.cacheConfig.enabled && !skipCache) {
            cachedEntry = cache.get(cacheKey);
            if (cachedEntry) {
              now = Date.now();
              // If cache is still valid, return it
              if (cachedEntry.expires > now) {
                loggingService_1.logger.debug(
                  "Using cached data for ".concat(cacheKey),
                );
                return [
                  2 /*return*/,
                  {
                    data: cachedEntry.data,
                    error: null,
                    status: "success",
                    isCached: true,
                  },
                ];
              }
              // If staleWhileRevalidate is enabled, return stale data and refresh in background
              if (apiConfig.cacheConfig.staleWhileRevalidate) {
                loggingService_1.logger.debug(
                  "Using stale data for ".concat(
                    cacheKey,
                    " while revalidating",
                  ),
                );
                // Fetch fresh data in background
                setTimeout(function () {
                  loggingService_1.logger.debug(
                    "Background revalidation for ".concat(cacheKey),
                  );
                  request(
                    url,
                    __assign(__assign({}, options), { skipCache: true }),
                  );
                }, 0);
                return [
                  2 /*return*/,
                  {
                    data: cachedEntry.data,
                    error: null,
                    status: "success",
                    isCached: true,
                  },
                ];
              }
            }
          }
          _d.label = 1;
        case 1:
          _d.trys.push([1, 4, , 5]);
          loggingService_1.logger.debug("Fetching ".concat(url));
          return [
            4 /*yield*/,
            fetch(
              apiConfig.baseUrl + url,
              __assign(__assign({}, fetchOptions), { headers: headers }),
            ),
          ];
        case 2:
          response_1 = _d.sent();
          if (!response_1.ok) {
            throw {
              status: response_1.status,
              statusText: response_1.statusText,
              url: url,
              method: fetchOptions.method || "GET",
            };
          }
          return [4 /*yield*/, response_1.json()];
        case 3:
          data = _d.sent();
          // Show success message if provided
          if (successMessage) {
            sonner_1.toast.success(successMessage);
          }
          // Cache the response if caching is enabled
          if (apiConfig.cacheConfig.enabled && !skipCache) {
            ttl = cacheTTL || apiConfig.cacheConfig.maxAge;
            cache.set(cacheKey, {
              data: data,
              timestamp: Date.now(),
              expires: Date.now() + ttl,
            });
            // Prune old cache entries if there are too many
            if (cache.size > 100) {
              // Max 100 entries
              oldestKey = Array.from(cache.entries()).sort(function (a, b) {
                return a[1].timestamp - b[1].timestamp;
              })[0][0];
              cache.delete(oldestKey);
            }
          }
          return [
            2 /*return*/,
            {
              data: data,
              error: null,
              status: "success",
              isCached: false,
            },
          ];
        case 4:
          error_1 = _d.sent();
          // Don't handle the error if suppressed
          if (!suppressErrors) {
            if (customErrorHandler) {
              customErrorHandler(error_1);
            } else {
              (0, errorHandling_1.handleApiError)(error_1, {
                showToast: true,
                customMessage: errorMessage,
              });
            }
          }
          loggingService_1.logger.error("Request failed for ".concat(url), {
            error: error_1,
          });
          return [
            2 /*return*/,
            {
              data: null,
              error:
                error_1 instanceof Error ? error_1 : new Error(String(error_1)),
              status: "error",
              isCached: false,
            },
          ];
        case 5:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Convenient method shortcuts
 */
exports.api = {
  get: function (url, options) {
    return request(url, __assign({ method: "GET" }, options));
  },
  post: function (url, data, options) {
    return request(
      url,
      __assign({ method: "POST", body: JSON.stringify(data) }, options),
    );
  },
  put: function (url, data, options) {
    return request(
      url,
      __assign({ method: "PUT", body: JSON.stringify(data) }, options),
    );
  },
  patch: function (url, data, options) {
    return request(
      url,
      __assign({ method: "PATCH", body: JSON.stringify(data) }, options),
    );
  },
  delete: function (url, options) {
    return request(url, __assign({ method: "DELETE" }, options));
  },
  // Helper for uploading files
  upload: function (url, formData, options) {
    // Don't set Content-Type for multipart/form-data - browser sets it with boundary
    var _a = options || {},
      headers = _a.headers,
      rest = __rest(_a, ["headers"]);
    var customHeaders =
      headers instanceof Headers ? Object.fromEntries(headers) : headers;
    return request(
      url,
      __assign(
        {
          method: "POST",
          body: formData,
          headers: __assign({}, customHeaders),
        },
        rest,
      ),
    );
  },
};
// Ensure 'payload' matches the expected type
apiClient.post("/endpoint", { data: payload });
