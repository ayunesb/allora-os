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
exports.LogsPanel = LogsPanel;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var input_1 = require("@/components/ui/input");
var select_1 = require("@/components/ui/select");
var client_1 = require("@/integrations/supabase/client");
var button_1 = require("@/components/ui/button");
var exportUtils_1 = require("@/utils/exportUtils");
var lucide_react_1 = require("lucide-react");
function LogsPanel(_a) {
  var _this = this;
  var _b = _a.maxLogs,
    maxLogs = _b === void 0 ? 100 : _b,
    _c = _a.showFilters,
    showFilters = _c === void 0 ? true : _c,
    tenantId = _a.tenantId;
  var _d = (0, react_1.useState)([]),
    logs = _d[0],
    setLogs = _d[1];
  var _e = (0, react_1.useState)(true),
    isLoading = _e[0],
    setIsLoading = _e[1];
  var _f = (0, react_1.useState)(""),
    filter = _f[0],
    setFilter = _f[1];
  var _g = (0, react_1.useState)(""),
    actionType = _g[0],
    setActionType = _g[1];
  var _h = (0, react_1.useState)(""),
    result = _h[0],
    setResult = _h[1];
  var fetchLogs = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var query, _a, data, error, error_1;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            setIsLoading(true);
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3, 4, 5]);
            query = client_1.supabase
              .from("audit_logs")
              .select("*")
              .order("timestamp", { ascending: false })
              .limit(maxLogs);
            // Apply filters
            if (tenantId) {
              query = query.eq("tenant_id", tenantId);
            }
            if (actionType) {
              query = query.eq("action", actionType);
            }
            if (result) {
              query = query.eq("result", result);
            }
            return [4 /*yield*/, query];
          case 2:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error) throw error;
            setLogs(data || []);
            return [3 /*break*/, 5];
          case 3:
            error_1 = _b.sent();
            console.error("Failed to fetch logs:", error_1);
            return [3 /*break*/, 5];
          case 4:
            setIsLoading(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  (0, react_1.useEffect)(
    function () {
      fetchLogs();
    },
    [tenantId, actionType, result],
  );
  // Filter logs based on search input
  var filteredLogs = filter
    ? logs.filter(function (log) {
        return JSON.stringify(log).toLowerCase().includes(filter.toLowerCase());
      })
    : logs;
  // Extract unique action types for filter dropdown
  var actionTypes = __spreadArray(
    [],
    new Set(
      logs.map(function (log) {
        return log.action;
      }),
    ),
    true,
  );
  var resultTypes = __spreadArray(
    [],
    new Set(
      logs
        .map(function (log) {
          return log.result;
        })
        .filter(Boolean),
    ),
    true,
  );
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className: "pb-3 flex flex-row items-center justify-between",
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            children: "Activity Logs",
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "ghost",
            size: "sm",
            onClick: fetchLogs,
            disabled: isLoading,
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                className: "h-4 w-4 mr-2 ".concat(
                  isLoading ? "animate-spin" : "",
                ),
              }),
              isLoading ? "Loading..." : "Refresh",
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        children: [
          showFilters &&
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex flex-col gap-4 mb-6 sm:flex-row",
              children: [
                (0, jsx_runtime_1.jsx)(input_1.Input, {
                  placeholder: "Filter logs...",
                  value: filter,
                  onChange: function (e) {
                    return setFilter(e.target.value);
                  },
                  className: "sm:max-w-[220px]",
                }),
                (0, jsx_runtime_1.jsxs)(select_1.Select, {
                  value: actionType,
                  onValueChange: setActionType,
                  children: [
                    (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                      className: "sm:max-w-[180px]",
                      children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                        placeholder: "Action Type",
                      }),
                    }),
                    (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                      children: [
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "",
                          children: "All Actions",
                        }),
                        actionTypes.map(function (type) {
                          return (0, jsx_runtime_1.jsx)(
                            select_1.SelectItem,
                            { value: type, children: type },
                            type,
                          );
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(select_1.Select, {
                  value: result,
                  onValueChange: setResult,
                  children: [
                    (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                      className: "sm:max-w-[180px]",
                      children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                        placeholder: "Result",
                      }),
                    }),
                    (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                      children: [
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "",
                          children: "All Results",
                        }),
                        resultTypes.map(function (type) {
                          return (0, jsx_runtime_1.jsx)(
                            select_1.SelectItem,
                            { value: type, children: type },
                            type,
                          );
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          isLoading
            ? (0, jsx_runtime_1.jsx)("div", {
                className: "py-10 text-center",
                children: (0, jsx_runtime_1.jsx)("p", {
                  className: "text-muted-foreground",
                  children: "Loading logs...",
                }),
              })
            : filteredLogs.length === 0
              ? (0, jsx_runtime_1.jsx)("div", {
                  className: "py-10 text-center",
                  children: (0, jsx_runtime_1.jsx)("p", {
                    className: "text-muted-foreground",
                    children: "No logs found",
                  }),
                })
              : (0, jsx_runtime_1.jsx)("div", {
                  className: "space-y-3",
                  children: filteredLogs.map(function (log) {
                    return (0, jsx_runtime_1.jsxs)(
                      card_1.Card,
                      {
                        className: "p-3 text-sm",
                        children: [
                          (0, jsx_runtime_1.jsxs)("div", {
                            className:
                              "flex flex-wrap justify-between gap-2 mb-1",
                            children: [
                              (0, jsx_runtime_1.jsxs)("span", {
                                className: "font-semibold",
                                children: [
                                  log.action,
                                  " ",
                                  log.resource && "- ".concat(log.resource),
                                ],
                              }),
                              (0, jsx_runtime_1.jsx)("span", {
                                className: "text-muted-foreground",
                                children: (0, exportUtils_1.formatDate)(
                                  log.timestamp,
                                ),
                              }),
                            ],
                          }),
                          log.result &&
                            (0, jsx_runtime_1.jsx)("div", {
                              className:
                                "inline-flex px-2 py-0.5 rounded-full text-xs ".concat(
                                  log.result === "success"
                                    ? "bg-green-100 text-green-800"
                                    : log.result === "error"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-gray-100 text-gray-800",
                                ),
                              children: log.result,
                            }),
                          log.details &&
                            (0, jsx_runtime_1.jsx)("pre", {
                              className:
                                "mt-2 p-2 bg-muted text-xs overflow-auto rounded max-h-28",
                              children:
                                typeof log.details === "object"
                                  ? JSON.stringify(log.details, null, 2)
                                  : log.details,
                            }),
                        ],
                      },
                      log.id,
                    );
                  }),
                }),
        ],
      }),
    ],
  });
}
