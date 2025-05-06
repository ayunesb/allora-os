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
exports.useStrategies = useStrategies;
var react_1 = require("react");
var useCompanyInsights_1 = require("@/hooks/useCompanyInsights");
var AuthContext_1 = require("@/context/AuthContext");
var client_1 = require("@/integrations/supabase/client");
var sonner_1 = require("sonner");
function useStrategies() {
  var _this = this;
  var _a = (0, react_1.useTransition)(),
    isPending = _a[0],
    startTransition = _a[1];
  var _b = (0, react_1.useState)([]),
    strategies = _b[0],
    setStrategies = _b[1];
  var _c = (0, react_1.useState)(true),
    isLoading = _c[0],
    setIsLoading = _c[1];
  var _d = (0, react_1.useState)(null),
    error = _d[0],
    setError = _d[1];
  var _e = (0, useCompanyInsights_1.useCompanyInsights)(),
    insights = _e.insights,
    insightsLoading = _e.isLoading;
  var profile = (0, AuthContext_1.useAuth)().profile;
  (0, react_1.useEffect)(
    function () {
      var fetchStrategies = function () {
        return __awaiter(_this, void 0, void 0, function () {
          var _a,
            realStrategies,
            fetchError,
            demoStrategies,
            strategies_1,
            strategyInsights,
            aiGeneratedStrategies_1,
            insertError,
            err_1,
            err_2;
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                if (
                  !(profile === null || profile === void 0
                    ? void 0
                    : profile.company_id)
                ) {
                  // Don't attempt to fetch without a company ID
                  setIsLoading(false);
                  return [2 /*return*/];
                }
                setIsLoading(true);
                setError(null);
                _b.label = 1;
              case 1:
                _b.trys.push([1, 7, 8, 9]);
                return [
                  4 /*yield*/,
                  client_1.supabase
                    .from("strategies")
                    .select("*")
                    .eq("company_id", profile.company_id),
                ];
              case 2:
                (_a = _b.sent()),
                  (realStrategies = _a.data),
                  (fetchError = _a.error);
                if (fetchError) throw fetchError;
                demoStrategies = [
                  {
                    id: "1",
                    title: "Expand to New Markets",
                    description:
                      "Analyze emerging markets and expand operations to increase geographical footprint and customer base.",
                    risk: "Medium",
                    risk_level: "Medium",
                    company_id: profile.company_id,
                    created_at: new Date().toISOString(),
                    executiveBot: "Market Growth Expert",
                  },
                  {
                    id: "2",
                    title: "AI Automation",
                    description:
                      "Implement AI-driven automation in workflows to increase efficiency and reduce operational costs.",
                    risk: "Low",
                    risk_level: "Low",
                    company_id: profile.company_id,
                    created_at: new Date().toISOString(),
                    executiveBot: "Technology Strategist",
                  },
                  {
                    id: "3",
                    title: "Disruptive Product Launch",
                    description:
                      "Develop revolutionary product to disrupt industry standards and gain competitive advantage.",
                    risk: "High",
                    risk_level: "High",
                    company_id: profile.company_id,
                    created_at: new Date().toISOString(),
                    executiveBot: "Innovation Director",
                  },
                ];
                strategies_1 =
                  realStrategies && realStrategies.length > 0
                    ? realStrategies
                    : demoStrategies;
                strategyInsights = insights.filter(function (insight) {
                  return insight.type === "strategy";
                });
                aiGeneratedStrategies_1 = strategyInsights.map(
                  function (insight) {
                    var _a;
                    // Ensure riskLevel is one of the valid values
                    var riskLevel = "Medium";
                    // Extract risk level from description if possible
                    if (
                      insight.description.includes("high-risk") ||
                      insight.description.includes("High risk")
                    ) {
                      riskLevel = "High";
                    } else if (
                      insight.description.includes("low-risk") ||
                      insight.description.includes("Low risk")
                    ) {
                      riskLevel = "Low";
                    }
                    // Store just the bot name as a string for executiveBot
                    // Extract just the name if primaryBot is an object, or use the string directly
                    var executiveBotName =
                      typeof insight.primaryBot === "object"
                        ? ((_a = insight.primaryBot) === null || _a === void 0
                            ? void 0
                            : _a.name) || "AI Executive"
                        : insight.primaryBot || "AI Executive";
                    return {
                      id: "ai-".concat(insight.id),
                      title: insight.title,
                      description: insight.description,
                      risk: riskLevel,
                      risk_level: riskLevel,
                      company_id: profile.company_id || "demo-company-id",
                      created_at: insight.createdAt.toISOString(),
                      executiveBot: executiveBotName,
                    };
                  },
                );
                // Combine AI strategies with existing ones
                startTransition(function () {
                  // Make sure there are no duplicates
                  var existingIds = new Set(
                    strategies_1.map(function (s) {
                      return s.id;
                    }),
                  );
                  var newAiStrategies = aiGeneratedStrategies_1.filter(
                    function (s) {
                      return !existingIds.has(s.id);
                    },
                  );
                  setStrategies(
                    __spreadArray(
                      __spreadArray([], strategies_1, true),
                      newAiStrategies,
                      true,
                    ),
                  );
                });
                if (!(realStrategies.length === 0 && profile.company_id))
                  return [3 /*break*/, 6];
                _b.label = 3;
              case 3:
                _b.trys.push([3, 5, , 6]);
                return [
                  4 /*yield*/,
                  client_1.supabase.from("strategies").insert(
                    demoStrategies.map(function (s) {
                      return {
                        title: s.title,
                        description: s.description,
                        risk_level: s.risk_level,
                        company_id: profile.company_id,
                        executiveBot: s.executiveBot,
                      };
                    }),
                  ),
                ];
              case 4:
                insertError = _b.sent().error;
                if (insertError)
                  console.error(
                    "Error inserting demo strategies:",
                    insertError,
                  );
                return [3 /*break*/, 6];
              case 5:
                err_1 = _b.sent();
                console.error("Failed to save demo strategies:", err_1);
                return [3 /*break*/, 6];
              case 6:
                return [3 /*break*/, 9];
              case 7:
                err_2 = _b.sent();
                console.error("Error fetching strategies:", err_2);
                setError(
                  new Error(err_2.message || "Failed to load strategies"),
                );
                // Use demo data as fallback on error
                setStrategies([
                  {
                    id: "1",
                    title: "Expand to New Markets",
                    description:
                      "Analyze emerging markets and expand operations to increase geographical footprint and customer base.",
                    risk: "Medium",
                    risk_level: "Medium",
                    company_id: "demo-company-id",
                    created_at: new Date().toISOString(),
                    executiveBot: "Market Growth Expert",
                  },
                  {
                    id: "2",
                    title: "AI Automation",
                    description:
                      "Implement AI-driven automation in workflows to increase efficiency and reduce operational costs.",
                    risk: "Low",
                    risk_level: "Low",
                    company_id: "demo-company-id",
                    created_at: new Date().toISOString(),
                    executiveBot: "Technology Strategist",
                  },
                ]);
                return [3 /*break*/, 9];
              case 8:
                setIsLoading(false);
                return [7 /*endfinally*/];
              case 9:
                return [2 /*return*/];
            }
          });
        });
      };
      if (!insightsLoading) {
        fetchStrategies();
      }
    },
    [
      insights,
      insightsLoading,
      profile === null || profile === void 0 ? void 0 : profile.company_id,
      startTransition,
    ],
  );
  var refetch = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, data_1, fetchError, err_3;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            setIsLoading(true);
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3, 4, 5]);
            if (
              !(profile === null || profile === void 0
                ? void 0
                : profile.company_id)
            ) {
              throw new Error("No company ID available");
            }
            return [
              4 /*yield*/,
              client_1.supabase
                .from("strategies")
                .select("*")
                .eq("company_id", profile.company_id),
            ];
          case 2:
            (_a = _b.sent()), (data_1 = _a.data), (fetchError = _a.error);
            if (fetchError) throw fetchError;
            startTransition(function () {
              setStrategies(data_1 || []);
              setError(null);
            });
            sonner_1.toast.success("Strategy data refreshed");
            return [3 /*break*/, 5];
          case 3:
            err_3 = _b.sent();
            console.error("Error refetching strategies:", err_3);
            sonner_1.toast.error("Failed to refresh strategies");
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
  return {
    strategies: strategies,
    isLoading: isLoading || isPending,
    error: error,
    refetch: refetch,
  };
}
