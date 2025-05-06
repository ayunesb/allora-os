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
exports.useWebhookHistory = useWebhookHistory;
var react_1 = require("react");
var supabase_1 = require("@/backend/supabase");
function useWebhookHistory(_a) {
  var _this = this;
  var _b = _a === void 0 ? {} : _a,
    _c = _b.limit,
    limit = _c === void 0 ? 50 : _c,
    initialFilter = _b.initialFilter;
  var _d = (0, react_1.useState)([]),
    events = _d[0],
    setEvents = _d[1];
  var _e = (0, react_1.useState)(true),
    isLoading = _e[0],
    setIsLoading = _e[1];
  var _f = (0, react_1.useState)(null),
    error = _f[0],
    setError = _f[1];
  var _g = (0, react_1.useState)(0),
    total = _g[0],
    setTotal = _g[1];
  var fetchHistory = (0, react_1.useCallback)(
    function () {
      var args_1 = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args_1[_i] = arguments[_i];
      }
      return __awaiter(
        _this,
        __spreadArray([], args_1, true),
        void 0,
        function (_a) {
          var query,
            mappedEventType,
            _b,
            data,
            error_1,
            count,
            transformedEvents,
            err_1;
          var _c = _a === void 0 ? {} : _a,
            eventType = _c.eventType,
            status = _c.status,
            fromDate = _c.fromDate,
            toDate = _c.toDate;
          return __generator(this, function (_d) {
            switch (_d.label) {
              case 0:
                _d.trys.push([0, 2, 3, 4]);
                setIsLoading(true);
                setError(null);
                query = supabase_1.supabase
                  .from("webhook_logs")
                  .select("*", { count: "exact" });
                // Apply filters if provided
                if (eventType) {
                  mappedEventType = eventType;
                  if (eventType === "lead.created") {
                    mappedEventType = "lead.created";
                  }
                  query = query.eq("message_type", mappedEventType);
                }
                if (status) {
                  query = query.eq("status", status);
                }
                if (fromDate) {
                  query = query.gte("created_at", fromDate.toISOString());
                }
                if (toDate) {
                  query = query.lte("created_at", toDate.toISOString());
                }
                // Order by created_at desc and limit results
                query = query
                  .order("created_at", { ascending: false })
                  .limit(limit);
                return [4 /*yield*/, query];
              case 1:
                (_b = _d.sent()),
                  (data = _b.data),
                  (error_1 = _b.error),
                  (count = _b.count);
                if (error_1) throw error_1;
                transformedEvents = (data || []).map(function (event) {
                  return {
                    id: event.id,
                    webhook_id: event.webhook_id || "",
                    event_type: event.message_type,
                    status: event.status,
                    created_at: event.created_at,
                    payload: event.payload || {},
                    targetUrl: event.url,
                    webhookType: "custom", // Default value, should be updated based on URL or other logic
                    timestamp: event.created_at,
                    response: event.response,
                    // Legacy field aliases for backward compatibility
                    url: event.url,
                  };
                });
                setEvents(transformedEvents);
                setTotal(count || 0);
                return [3 /*break*/, 4];
              case 2:
                err_1 = _d.sent();
                console.error("Error fetching webhook history:", err_1);
                setError(
                  err_1 instanceof Error ? err_1.message : "Unknown error",
                );
                return [3 /*break*/, 4];
              case 3:
                setIsLoading(false);
                return [7 /*endfinally*/];
              case 4:
                return [2 /*return*/];
            }
          });
        },
      );
    },
    [limit],
  );
  // Initial fetch with any provided filters
  (0, react_1.useEffect)(
    function () {
      fetchHistory(initialFilter || {});
    },
    [fetchHistory, initialFilter],
  );
  return {
    events: events,
    isLoading: isLoading,
    error: error,
    total: total,
    fetchHistory: fetchHistory,
  };
}
exports.default = useWebhookHistory;
