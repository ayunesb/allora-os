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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAgentQuery = useAgentQuery;
var react_1 = require("react");
var react_query_1 = require("@tanstack/react-query");
var agent_1 = require("../agent");
var sonner_1 = require("sonner");
var loggingService_1 = require("@/utils/loggingService");
function useAgentQuery(options) {
  var _this = this;
  var _a = (0, react_1.useState)(""),
    query = _a[0],
    setQuery = _a[1];
  var _b = (0, react_1.useState)({}),
    context = _b[0],
    setContext = _b[1];
  var _c = (0, react_query_1.useQuery)({
      queryKey: ["agent-query", query, context],
      queryFn: function () {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                if (!query) {
                  return [2 /*return*/, { result: "" }];
                }
                loggingService_1.logger.info("Executing agent query", {
                  query: query,
                  contextKeys: Object.keys(context),
                });
                return [
                  4 /*yield*/,
                  (0, agent_1.runLangChainAgent)({
                    query: query,
                    context: context,
                  }),
                ];
              case 1:
                return [2 /*return*/, _a.sent()];
            }
          });
        });
      },
      enabled: options.enabled !== false && !!query,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      meta: {
        onSettled: function (_data, error) {
          if (error) {
            sonner_1.toast.error("Agent query failed", {
              description: error.message,
            });
            if (options.onError) options.onError(error);
          }
        },
      },
    }),
    data = _c.data,
    isLoading = _c.isLoading,
    error = _c.error,
    refetch = _c.refetch,
    isFetching = _c.isFetching;
  var executeQuery = function (newQuery, newContext) {
    return __awaiter(_this, void 0, void 0, function () {
      var result, err_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            setQuery(newQuery);
            if (newContext) {
              setContext(newContext);
            }
            return [4 /*yield*/, refetch()];
          case 1:
            result = _a.sent();
            if (result.data && !result.error && options.onSuccess) {
              options.onSuccess(result.data);
            }
            return [2 /*return*/, result.data];
          case 2:
            err_1 = _a.sent();
            loggingService_1.logger.error("Error executing agent query", err_1);
            sonner_1.toast.error("Failed to run agent query", {
              description: err_1.message,
            });
            throw err_1;
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  return {
    executeQuery: executeQuery,
    result: (data === null || data === void 0 ? void 0 : data.result) || "",
    toolCalls:
      (data === null || data === void 0 ? void 0 : data.toolCalls) || [],
    isLoading: isLoading || isFetching,
    error: error || (data === null || data === void 0 ? void 0 : data.error),
    setContext: setContext,
  };
}
