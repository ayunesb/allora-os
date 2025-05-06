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
exports.useApiQuery = useApiQuery;
var react_1 = require("react");
var enhancedApiClient_1 = require("@/utils/api/enhancedApiClient");
/**
 * Hook for fetching data from an API with caching, retries, and optimized performance
 */
function useApiQuery(url, options) {
  var _this = this;
  if (options === void 0) {
    options = {};
  }
  var _a = options.initialData,
    initialData = _a === void 0 ? null : _a,
    _b = options.enabled,
    enabled = _b === void 0 ? true : _b,
    refetchInterval = options.refetchInterval,
    onSuccess = options.onSuccess,
    onError = options.onError,
    select = options.select,
    fetchOptions = __rest(options, [
      "initialData",
      "enabled",
      "refetchInterval",
      "onSuccess",
      "onError",
      "select",
    ]);
  var _c = (0, react_1.useState)(initialData),
    data = _c[0],
    setData = _c[1];
  var _d = (0, react_1.useState)(enabled),
    isLoading = _d[0],
    setIsLoading = _d[1];
  var _e = (0, react_1.useState)(false),
    isError = _e[0],
    setIsError = _e[1];
  var _f = (0, react_1.useState)(null),
    error = _f[0],
    setError = _f[1];
  var fetchOptionsRef = (0, react_1.useRef)(fetchOptions);
  var onSuccessRef = (0, react_1.useRef)(onSuccess);
  var onErrorRef = (0, react_1.useRef)(onError);
  var selectRef = (0, react_1.useRef)(select);
  // Update refs when dependencies change
  (0, react_1.useEffect)(
    function () {
      fetchOptionsRef.current = fetchOptions;
      onSuccessRef.current = onSuccess;
      onErrorRef.current = onError;
      selectRef.current = select;
    },
    [fetchOptions, onSuccess, onError, select],
  );
  // Create fetch function
  var fetchData = (0, react_1.useCallback)(
    function () {
      return __awaiter(_this, void 0, void 0, function () {
        var response_1, processedData, err_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!enabled) return [2 /*return*/];
              setIsLoading(true);
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, 4, 5]);
              return [
                4 /*yield*/,
                (0, enhancedApiClient_1.enhancedFetch)(
                  url,
                  fetchOptionsRef.current,
                ),
              ];
            case 2:
              response_1 = _a.sent();
              if (response_1.success && response_1.data !== null) {
                processedData = selectRef.current
                  ? selectRef.current(response_1.data)
                  : response_1.data;
                setData(processedData);
                setIsError(false);
                setError(null);
                if (onSuccessRef.current) {
                  onSuccessRef.current(processedData);
                }
              } else {
                setIsError(true);
                setError(response_1.error || "Unknown error");
                if (onErrorRef.current) {
                  onErrorRef.current(response_1.error);
                }
              }
              return [3 /*break*/, 5];
            case 3:
              err_1 = _a.sent();
              setIsError(true);
              setError(err_1);
              if (onErrorRef.current) {
                onErrorRef.current(err_1);
              }
              return [3 /*break*/, 5];
            case 4:
              setIsLoading(false);
              return [7 /*endfinally*/];
            case 5:
              return [2 /*return*/];
          }
        });
      });
    },
    [url, enabled],
  );
  // Initial fetch and refetch interval
  (0, react_1.useEffect)(
    function () {
      if (!enabled) return;
      fetchData();
      var intervalId = null;
      if (refetchInterval && refetchInterval > 0) {
        intervalId = window.setInterval(fetchData, refetchInterval);
      }
      return function () {
        if (intervalId !== null) {
          clearInterval(intervalId);
        }
      };
    },
    [fetchData, enabled, refetchInterval],
  );
  // Clear cache function
  var clearCacheAndRefetch = (0, react_1.useCallback)(
    function () {
      var cacheKey =
        fetchOptionsRef.current.cacheKey ||
        "GET:"
          .concat(url, ":")
          .concat(
            fetchOptionsRef.current.body
              ? JSON.stringify(fetchOptionsRef.current.body)
              : "",
          );
      (0, enhancedApiClient_1.clearApiCache)(cacheKey);
      return fetchData();
    },
    [url, fetchData],
  );
  // Reset function
  var reset = (0, react_1.useCallback)(
    function () {
      setData(initialData);
      setIsError(false);
      setError(null);
    },
    [initialData],
  );
  return {
    data: data,
    isLoading: isLoading,
    isError: isError,
    error: error,
    refetch: fetchData,
    reset: reset,
    clearCache: clearCacheAndRefetch,
  };
}
