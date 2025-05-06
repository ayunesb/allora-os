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
exports.testApiEndpoint = exports.runStressTest = void 0;
var loggingService_1 = require("@/utils/loggingService");
/**
 * Run a stress test on a specified operation
 * @param operation The async function to test
 * @param options Configuration for the stress test
 * @returns Promise that resolves to test results
 */
var runStressTest = function (operation, options) {
  return __awaiter(void 0, void 0, void 0, function () {
    var startTime,
      results,
      concurrency,
      _a,
      delayBetweenBatches,
      _b,
      batchSize,
      _c,
      timeout,
      _d,
      logPerformance,
      onProgress,
      progress,
      responseTimes,
      serverErrors,
      clientErrors,
      timeouts,
      timeoutPromise,
      executeOperations,
      totalDuration,
      p95Index,
      p99Index,
      finalResult,
      error_1,
      totalDuration;
    return __generator(this, function (_e) {
      switch (_e.label) {
        case 0:
          startTime = Date.now();
          results = [];
          (concurrency = options.concurrency),
            (_a = options.delayBetweenBatches),
            (delayBetweenBatches = _a === void 0 ? 0 : _a),
            (_b = options.batchSize),
            (batchSize = _b === void 0 ? Math.min(10, concurrency) : _b),
            (_c = options.timeout),
            (timeout = _c === void 0 ? 60000 : _c),
            (_d = options.logPerformance),
            (logPerformance = _d === void 0 ? true : _d),
            (onProgress = options.onProgress);
          progress = {
            totalOperations: concurrency,
            completedOperations: 0,
            successfulOperations: 0,
            failedOperations: 0,
            percentComplete: 0,
            elapsedTime: 0,
            currentConcurrency: 0,
            averageResponseTime: 0,
          };
          responseTimes = [];
          serverErrors = 0;
          clientErrors = 0;
          timeouts = 0;
          loggingService_1.logger.info(
            "Starting stress test with ".concat(
              concurrency,
              " concurrent operations",
            ),
            {
              concurrency: concurrency,
              batchSize: batchSize,
              delayBetweenBatches: delayBetweenBatches,
              timeout: timeout,
            },
          );
          _e.label = 1;
        case 1:
          _e.trys.push([1, 3, , 4]);
          timeoutPromise = new Promise(function (_, reject) {
            setTimeout(function () {
              return reject(
                new Error("Stress test timed out after ".concat(timeout, "ms")),
              );
            }, timeout);
          });
          executeOperations = function () {
            return __awaiter(void 0, void 0, void 0, function () {
              var i,
                currentBatchSize,
                batchStartTime,
                operationsPerMs,
                remainingOperations,
                batchPromises,
                batchResults,
                batchDuration;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    i = 0;
                    _a.label = 1;
                  case 1:
                    if (!(i < concurrency)) return [3 /*break*/, 5];
                    currentBatchSize = Math.min(batchSize, concurrency - i);
                    batchStartTime = Date.now();
                    progress.currentConcurrency = currentBatchSize;
                    // Update progress
                    if (onProgress) {
                      progress.elapsedTime = Date.now() - startTime;
                      progress.percentComplete =
                        (progress.completedOperations /
                          progress.totalOperations) *
                        100;
                      if (progress.completedOperations > 0) {
                        operationsPerMs =
                          progress.completedOperations / progress.elapsedTime;
                        remainingOperations =
                          progress.totalOperations -
                          progress.completedOperations;
                        progress.estimatedTimeRemaining =
                          remainingOperations / operationsPerMs;
                      }
                      onProgress(progress);
                    }
                    batchPromises = Array.from({
                      length: currentBatchSize,
                    }).map(function () {
                      return __awaiter(void 0, void 0, void 0, function () {
                        var operationStart, duration, error_2, duration;
                        return __generator(this, function (_a) {
                          switch (_a.label) {
                            case 0:
                              operationStart = Date.now();
                              _a.label = 1;
                            case 1:
                              _a.trys.push([1, 3, 4, 5]);
                              return [4 /*yield*/, operation()];
                            case 2:
                              _a.sent();
                              duration = Date.now() - operationStart;
                              responseTimes.push(duration);
                              progress.successfulOperations++;
                              return [
                                2 /*return*/,
                                { success: true, duration: duration },
                              ];
                            case 3:
                              error_2 = _a.sent();
                              duration = Date.now() - operationStart;
                              progress.failedOperations++;
                              // Categorize errors
                              if (error_2.name === "TimeoutError") {
                                timeouts++;
                              } else if (error_2.status >= 500) {
                                serverErrors++;
                              } else if (error_2.status >= 400) {
                                clientErrors++;
                              }
                              return [
                                2 /*return*/,
                                {
                                  success: false,
                                  duration: duration,
                                  error: error_2,
                                  statusCode: error_2.status,
                                },
                              ];
                            case 4:
                              progress.completedOperations++;
                              return [7 /*endfinally*/];
                            case 5:
                              return [2 /*return*/];
                          }
                        });
                      });
                    });
                    return [4 /*yield*/, Promise.all(batchPromises)];
                  case 2:
                    batchResults = _a.sent();
                    results.push.apply(results, batchResults);
                    // Calculate current metrics
                    if (responseTimes.length > 0) {
                      progress.averageResponseTime =
                        responseTimes.reduce(function (sum, time) {
                          return sum + time;
                        }, 0) / responseTimes.length;
                    }
                    // Log batch results
                    if (logPerformance) {
                      batchDuration = Date.now() - batchStartTime;
                      loggingService_1.logger.info(
                        "Completed batch "
                          .concat(Math.floor(i / batchSize) + 1, "/")
                          .concat(Math.ceil(concurrency / batchSize)),
                        {
                          batchSize: currentBatchSize,
                          duration: batchDuration,
                          successRate:
                            batchResults.filter(function (r) {
                              return r.success;
                            }).length / currentBatchSize,
                          averageResponseTime:
                            batchResults.reduce(function (sum, r) {
                              return sum + r.duration;
                            }, 0) / currentBatchSize,
                        },
                      );
                    }
                    if (
                      !(delayBetweenBatches > 0 && i + batchSize < concurrency)
                    )
                      return [3 /*break*/, 4];
                    return [
                      4 /*yield*/,
                      new Promise(function (resolve) {
                        return setTimeout(resolve, delayBetweenBatches);
                      }),
                    ];
                  case 3:
                    _a.sent();
                    _a.label = 4;
                  case 4:
                    i += batchSize;
                    return [3 /*break*/, 1];
                  case 5:
                    return [2 /*return*/];
                }
              });
            });
          };
          // Run the operations with timeout
          return [
            4 /*yield*/,
            Promise.race([executeOperations(), timeoutPromise]),
          ];
        case 2:
          // Run the operations with timeout
          _e.sent();
          totalDuration = Date.now() - startTime;
          responseTimes.sort(function (a, b) {
            return a - b;
          });
          p95Index = Math.floor(responseTimes.length * 0.95);
          p99Index = Math.floor(responseTimes.length * 0.99);
          finalResult = __assign(__assign({}, progress), {
            success: progress.failedOperations === 0,
            elapsedTime: totalDuration,
            percentComplete: 100,
            averageResponseTime: responseTimes.length
              ? responseTimes.reduce(function (sum, time) {
                  return sum + time;
                }, 0) / responseTimes.length
              : 0,
            detailedMetrics: {
              maxResponseTime: responseTimes.length
                ? Math.max.apply(Math, responseTimes)
                : 0,
              minResponseTime: responseTimes.length
                ? Math.min.apply(Math, responseTimes)
                : 0,
              p95ResponseTime: responseTimes.length
                ? responseTimes[p95Index]
                : 0,
              p99ResponseTime: responseTimes.length
                ? responseTimes[p99Index]
                : 0,
              errorRate: progress.totalOperations
                ? progress.failedOperations / progress.totalOperations
                : 0,
              operationsPerSecond:
                (progress.totalOperations / totalDuration) * 1000,
              totalDuration: totalDuration,
              serverErrors: serverErrors,
              clientErrors: clientErrors,
              timeouts: timeouts,
            },
          });
          loggingService_1.logger.info("Stress test completed", {
            totalOperations: finalResult.totalOperations,
            successRate:
              finalResult.successfulOperations / finalResult.totalOperations,
            averageResponseTime: finalResult.averageResponseTime,
            duration: finalResult.elapsedTime,
            operationsPerSecond:
              finalResult.detailedMetrics.operationsPerSecond,
          });
          return [2 /*return*/, finalResult];
        case 3:
          error_1 = _e.sent();
          totalDuration = Date.now() - startTime;
          loggingService_1.logger.error("Stress test failed", error_1, {
            completedOperations: progress.completedOperations,
            duration: totalDuration,
          });
          return [
            2 /*return*/,
            __assign(__assign({}, progress), {
              success: false,
              elapsedTime: totalDuration,
              error: error_1,
              message:
                error_1 instanceof Error
                  ? error_1.message
                  : "Unknown error during stress test",
              detailedMetrics: {
                maxResponseTime: responseTimes.length
                  ? Math.max.apply(Math, responseTimes)
                  : 0,
                minResponseTime: responseTimes.length
                  ? Math.min.apply(Math, responseTimes)
                  : 0,
                p95ResponseTime: 0,
                p99ResponseTime: 0,
                errorRate: progress.totalOperations
                  ? progress.failedOperations / progress.totalOperations
                  : 1,
                operationsPerSecond:
                  (progress.completedOperations / totalDuration) * 1000,
                totalDuration: totalDuration,
                serverErrors: serverErrors,
                clientErrors: clientErrors,
                timeouts: timeouts,
              },
            }),
          ];
        case 4:
          return [2 /*return*/];
      }
    });
  });
};
exports.runStressTest = runStressTest;
/**
 * Run a performance test on a specific API endpoint
 * @param endpoint The API endpoint URL to test
 * @param method HTTP method to use
 * @param options Stress test configuration
 * @param payload Optional data to send with each request
 * @returns Promise that resolves to test results
 */
var testApiEndpoint = function (endpoint_1) {
  var args_1 = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    args_1[_i - 1] = arguments[_i];
  }
  return __awaiter(
    void 0,
    __spreadArray([endpoint_1], args_1, true),
    void 0,
    function (endpoint, method, options, payload) {
      var operation;
      if (method === void 0) {
        method = "GET";
      }
      return __generator(this, function (_a) {
        loggingService_1.logger.info(
          "Testing API endpoint: ".concat(method, " ").concat(endpoint),
          {
            method: method,
            endpoint: endpoint,
            concurrency: options.concurrency,
            payload: payload ? true : false,
          },
        );
        operation = function () {
          return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    fetch(
                      endpoint,
                      __assign(
                        {
                          method: method,
                          headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                          },
                        },
                        payload && { body: JSON.stringify(payload) },
                      ),
                    ),
                  ];
                case 1:
                  response = _a.sent();
                  if (!response.ok) {
                    throw {
                      status: response.status,
                      statusText: response.statusText,
                      message: "Request failed with status: ".concat(
                        response.status,
                      ),
                    };
                  }
                  return [4 /*yield*/, response.json()];
                case 2:
                  return [2 /*return*/, _a.sent()];
              }
            });
          });
        };
        return [2 /*return*/, (0, exports.runStressTest)(operation, options)];
      });
    },
  );
};
exports.testApiEndpoint = testApiEndpoint;
