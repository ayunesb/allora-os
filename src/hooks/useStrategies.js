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
exports.useStrategies = useStrategies;
var react_1 = require("react");
var sonner_1 = require("sonner");
var useAuthState_1 = require("@/hooks/useAuthState");
var AuthContext_1 = require("@/context/AuthContext");
var supabase_1 = require("@/backend/supabase");
var errorHandling_1 = require("@/utils/api/errorHandling");
function useStrategies() {
  var _this = this;
  var _a = (0, react_1.useState)([]),
    strategies = _a[0],
    setStrategies = _a[1];
  var _b = (0, react_1.useState)(true),
    isLoading = _b[0],
    setIsLoading = _b[1];
  var _c = (0, react_1.useState)(null),
    error = _c[0],
    setError = _c[1];
  var _d = (0, react_1.useState)(false),
    isCreating = _d[0],
    setIsCreating = _d[1];
  var _e = (0, react_1.useState)(false),
    isUpdating = _e[0],
    setIsUpdating = _e[1];
  var _f = (0, react_1.useState)(false),
    isDeleting = _f[0],
    setIsDeleting = _f[1];
  var user = (0, useAuthState_1.useAuthState)().user;
  var profile = (0, AuthContext_1.useAuth)().profile;
  var fetchStrategies = (0, react_1.useCallback)(
    function () {
      return __awaiter(_this, void 0, void 0, function () {
        var _a, data, error_1, demoStrategies, strategiesWithExecs, err_1;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              if (
                !(profile === null || profile === void 0
                  ? void 0
                  : profile.company_id)
              ) {
                setStrategies([]);
                setIsLoading(false);
                return [2 /*return*/];
              }
              setIsLoading(true);
              setError(null);
              _b.label = 1;
            case 1:
              _b.trys.push([1, 3, 4, 5]);
              return [
                4 /*yield*/,
                supabase_1.supabase
                  .from("strategies")
                  .select("*")
                  .eq("company_id", profile.company_id)
                  .order("created_at", { ascending: false }),
              ];
            case 2:
              (_a = _b.sent()), (data = _a.data), (error_1 = _a.error);
              if (error_1) {
                throw error_1;
              }
              // If there's no data yet, create demo strategies with AI executive attribution
              if (!data || data.length === 0) {
                demoStrategies = generateDemoStrategies(
                  profile.company_id,
                  profile === null || profile === void 0
                    ? void 0
                    : profile.industry,
                );
                setStrategies(demoStrategies);
              } else {
                strategiesWithExecs = data.map(function (strategy) {
                  if (!strategy.executiveBot) {
                    return __assign(__assign({}, strategy), {
                      executiveBot: getRandomExecutive(),
                    });
                  }
                  return strategy;
                });
                setStrategies(strategiesWithExecs);
              }
              return [3 /*break*/, 5];
            case 3:
              err_1 = _b.sent();
              console.error("Error fetching strategies:", err_1);
              setError(err_1);
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
    [
      profile === null || profile === void 0 ? void 0 : profile.company_id,
      profile === null || profile === void 0 ? void 0 : profile.industry,
    ],
  );
  var getRandomExecutive = function () {
    var executives = [
      "Elon Musk",
      "Steve Jobs",
      "Jeff Bezos",
      "Warren Buffett",
      "Satya Nadella",
      "Bill Gates",
      "Tim Cook",
    ];
    return executives[Math.floor(Math.random() * executives.length)];
  };
  var generateDemoStrategies = function (companyId, industry) {
    // Customize demo strategies based on industry
    var industryName = industry || "Technology";
    return [
      {
        id: "demo-1",
        title: "".concat(industryName, " Market Expansion"),
        description: "Strategically expand into adjacent ".concat(
          industryName.toLowerCase(),
          " markets where existing capabilities can be leveraged with minimal additional investment.",
        ),
        company_id: companyId,
        risk: "Medium",
        riskLevel: "Medium",
        risk_level: "Medium",
        tags: ["growth", "expansion"],
        created_at: new Date().toISOString(),
        executiveBot: "Elon Musk",
        impact: "High",
        timeframe: "6-12 months",
      },
      {
        id: "demo-2",
        title: "Operational Excellence Program",
        description:
          "Implement a systematic review of all operational processes to identify and eliminate inefficiencies, reduce costs, and improve quality.",
        company_id: companyId,
        risk: "Low",
        riskLevel: "Low",
        risk_level: "Low",
        tags: ["operations", "efficiency"],
        created_at: new Date(Date.now() - 86400000).toISOString(),
        executiveBot: "Tim Cook",
        impact: "Medium",
        timeframe: "3-6 months",
      },
      {
        id: "demo-3",
        title: "Strategic Innovation Initiative",
        description:
          "Establish a dedicated innovation lab to explore disruptive technologies and business models that could create new revenue streams.",
        company_id: companyId,
        risk: "High",
        riskLevel: "High",
        risk_level: "High",
        tags: ["innovation", "growth"],
        created_at: new Date(Date.now() - 172800000).toISOString(),
        executiveBot: "Steve Jobs",
        impact: "Very High",
        timeframe: "12-18 months",
      },
    ];
  };
  (0, react_1.useEffect)(
    function () {
      fetchStrategies();
    },
    [fetchStrategies],
  );
  var createStrategy = (0, react_1.useCallback)(
    function (strategyData) {
      return __awaiter(_this, void 0, void 0, function () {
        var executiveBot, riskValue, _a, data_1, error_2, err_2;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              if (
                !(profile === null || profile === void 0
                  ? void 0
                  : profile.company_id)
              ) {
                sonner_1.toast.error("Company profile not found");
                return [2 /*return*/, null];
              }
              setIsCreating(true);
              _b.label = 1;
            case 1:
              _b.trys.push([1, 3, 4, 5]);
              executiveBot = strategyData.executiveBot || getRandomExecutive();
              riskValue =
                strategyData.risk ||
                strategyData.riskLevel ||
                strategyData.risk_level ||
                "Medium";
              return [
                4 /*yield*/,
                supabase_1.supabase
                  .from("strategies")
                  .insert([
                    __assign(__assign({}, strategyData), {
                      company_id: profile.company_id,
                      risk: riskValue,
                      riskLevel: riskValue,
                      executiveBot: executiveBot,
                      created_at: new Date().toISOString(),
                    }),
                  ])
                  .select(),
              ];
            case 2:
              (_a = _b.sent()), (data_1 = _a.data), (error_2 = _a.error);
              if (error_2) {
                throw error_2;
              }
              sonner_1.toast.success("Strategy created successfully");
              if (data_1 && data_1.length > 0) {
                setStrategies(function (prev) {
                  return __spreadArray([data_1[0]], prev, true);
                });
                return [2 /*return*/, data_1[0]];
              }
              // Refetch to ensure we have the latest data
              fetchStrategies();
              return [2 /*return*/, null];
            case 3:
              err_2 = _b.sent();
              console.error("Error creating strategy:", err_2);
              (0, errorHandling_1.handleApiError)(err_2, {
                customMessage: "Failed to create strategy",
              });
              return [2 /*return*/, null];
            case 4:
              setIsCreating(false);
              return [7 /*endfinally*/];
            case 5:
              return [2 /*return*/];
          }
        });
      });
    },
    [
      profile === null || profile === void 0 ? void 0 : profile.company_id,
      fetchStrategies,
    ],
  );
  var updateStrategy = (0, react_1.useCallback)(
    function (strategyId, updates) {
      return __awaiter(_this, void 0, void 0, function () {
        var error_3, err_3;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (
                !(profile === null || profile === void 0
                  ? void 0
                  : profile.company_id)
              ) {
                sonner_1.toast.error("Company profile not found");
                return [2 /*return*/, false];
              }
              setIsUpdating(true);
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, 4, 5]);
              // Ensure risk field is updated when riskLevel changes
              if (updates.riskLevel && !updates.risk) {
                updates.risk = updates.riskLevel;
              } else if (updates.risk && !updates.riskLevel) {
                updates.riskLevel = updates.risk;
              }
              return [
                4 /*yield*/,
                supabase_1.supabase
                  .from("strategies")
                  .update(updates)
                  .eq("id", strategyId)
                  .eq("company_id", profile.company_id),
              ];
            case 2:
              error_3 = _a.sent().error;
              if (error_3) {
                throw error_3;
              }
              sonner_1.toast.success("Strategy updated successfully");
              // Update the local state
              setStrategies(function (prev) {
                return prev.map(function (strategy) {
                  return strategy.id === strategyId
                    ? __assign(__assign({}, strategy), updates)
                    : strategy;
                });
              });
              return [2 /*return*/, true];
            case 3:
              err_3 = _a.sent();
              console.error("Error updating strategy:", err_3);
              (0, errorHandling_1.handleApiError)(err_3, {
                customMessage: "Failed to update strategy",
              });
              return [2 /*return*/, false];
            case 4:
              setIsUpdating(false);
              return [7 /*endfinally*/];
            case 5:
              return [2 /*return*/];
          }
        });
      });
    },
    [profile === null || profile === void 0 ? void 0 : profile.company_id],
  );
  var deleteStrategy = (0, react_1.useCallback)(
    function (strategyId) {
      return __awaiter(_this, void 0, void 0, function () {
        var error_4, err_4;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (
                !(profile === null || profile === void 0
                  ? void 0
                  : profile.company_id)
              ) {
                sonner_1.toast.error("Company profile not found");
                return [2 /*return*/, false];
              }
              setIsDeleting(true);
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, 4, 5]);
              return [
                4 /*yield*/,
                supabase_1.supabase
                  .from("strategies")
                  .delete()
                  .eq("id", strategyId)
                  .eq("company_id", profile.company_id),
              ];
            case 2:
              error_4 = _a.sent().error;
              if (error_4) {
                throw error_4;
              }
              sonner_1.toast.success("Strategy deleted successfully");
              // Update the local state
              setStrategies(function (prev) {
                return prev.filter(function (strategy) {
                  return strategy.id !== strategyId;
                });
              });
              return [2 /*return*/, true];
            case 3:
              err_4 = _a.sent();
              console.error("Error deleting strategy:", err_4);
              (0, errorHandling_1.handleApiError)(err_4, {
                customMessage: "Failed to delete strategy",
              });
              return [2 /*return*/, false];
            case 4:
              setIsDeleting(false);
              return [7 /*endfinally*/];
            case 5:
              return [2 /*return*/];
          }
        });
      });
    },
    [profile === null || profile === void 0 ? void 0 : profile.company_id],
  );
  var refetch = (0, react_1.useCallback)(
    function () {
      fetchStrategies();
    },
    [fetchStrategies],
  );
  return {
    strategies: strategies,
    isLoading: isLoading,
    error: error,
    createStrategy: createStrategy,
    isCreating: isCreating,
    updateStrategy: updateStrategy,
    isUpdating: isUpdating,
    deleteStrategy: deleteStrategy,
    isDeleting: isDeleting,
    refetch: fetchStrategies,
  };
}
