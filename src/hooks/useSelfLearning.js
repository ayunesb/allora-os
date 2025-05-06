"use strict";
/**
 * Self-Learning Hook for Allora AI
 *
 * This hook provides functionality to track user actions and system events
 * for continuous learning and improvement of the platform.
 */
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSelfLearning = useSelfLearning;
var react_1 = require("react");
var AuthContext_1 = require("@/context/AuthContext");
var sonner_1 = require("sonner");
var loggingService_1 = require("@/utils/loggingService");
var getLearningInsights_1 = require("@/utils/selfLearning/insights/getLearningInsights");
function useSelfLearning() {
  var _this = this;
  var _a = (0, AuthContext_1.useAuth)(),
    user = _a.user,
    profile = _a.profile;
  var _b = (0, react_1.useState)(true),
    isTracking = _b[0],
    setIsTracking = _b[1];
  /**
   * Tracks a user action for self-learning purposes
   */
  var trackAction = (0, react_1.useCallback)(
    function (actionType, category, entityId, entityType, metadata) {
      if (!isTracking) return false;
      try {
        var actionData = {
          actionType: actionType,
          category: category,
          entityId: entityId,
          entityType: entityType,
          metadata: metadata,
          timestamp: new Date().toISOString(),
        };
        // Log the action to console in development
        loggingService_1.logger.info(
          "[Self-Learning] Action tracked: ".concat(actionType),
          {
            category: category,
            userId:
              (user === null || user === void 0 ? void 0 : user.id) ||
              "anonymous",
            companyId:
              (profile === null || profile === void 0
                ? void 0
                : profile.company_id) || "unknown",
            entityId: entityId,
            entityType: entityType,
          },
        );
        // In a real implementation, we would store this in the database
        // For now, we'll just store it in localStorage for demonstration
        var storedActions = localStorage.getItem("allora_tracked_actions");
        var actions = storedActions ? JSON.parse(storedActions) : [];
        actions.push(
          __assign(__assign({}, actionData), {
            userId:
              (user === null || user === void 0 ? void 0 : user.id) ||
              "anonymous",
            companyId:
              (profile === null || profile === void 0
                ? void 0
                : profile.company_id) || "unknown",
          }),
        );
        localStorage.setItem("allora_tracked_actions", JSON.stringify(actions));
        return true;
      } catch (error) {
        loggingService_1.logger.error(
          "Error tracking action for self-learning",
          error,
        );
        return false;
      }
    },
    [
      isTracking,
      user === null || user === void 0 ? void 0 : user.id,
      profile === null || profile === void 0 ? void 0 : profile.company_id,
    ],
  );
  /**
   * Enables or disables action tracking
   */
  var setTrackingEnabled = (0, react_1.useCallback)(function (enabled) {
    setIsTracking(enabled);
    localStorage.setItem("allora_tracking_enabled", String(enabled));
    if (enabled) {
      sonner_1.toast.success("Self-learning tracking enabled");
    } else {
      sonner_1.toast.info("Self-learning tracking disabled");
    }
  }, []);
  /**
   * Clears all tracked actions
   */
  var clearTrackedActions = (0, react_1.useCallback)(function () {
    localStorage.removeItem("allora_tracked_actions");
    sonner_1.toast.success("Self-learning data cleared");
  }, []);
  /**
   * Retrieves user insights based on tracked actions
   */
  var getInsights = (0, react_1.useCallback)(
    function () {
      return __awaiter(_this, void 0, void 0, function () {
        var insights, error_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!(user === null || user === void 0 ? void 0 : user.id)) {
                return [2 /*return*/, []];
              }
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, , 4]);
              return [
                4 /*yield*/,
                (0, getLearningInsights_1.getLearningInsights)(user.id),
              ];
            case 2:
              insights = _a.sent();
              return [2 /*return*/, insights];
            case 3:
              error_1 = _a.sent();
              loggingService_1.logger.error(
                "Error getting learning insights",
                error_1,
              );
              sonner_1.toast.error("Could not load learning insights");
              return [2 /*return*/, []];
            case 4:
              return [2 /*return*/];
          }
        });
      });
    },
    [user === null || user === void 0 ? void 0 : user.id],
  );
  /**
   * Retrieves AI recommendations based on user behavior and preferences
   */
  var getRecommendations = (0, react_1.useCallback)(
    function () {
      return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          if (!(user === null || user === void 0 ? void 0 : user.id)) {
            return [
              2 /*return*/,
              { strategies: [], executives: [], topics: [] },
            ];
          }
          try {
            // This would typically fetch recommendations from an API
            // For now, returning mock data
            return [
              2 /*return*/,
              {
                strategies: [
                  {
                    id: "s1",
                    title: "Market Expansion",
                    riskLevel: "medium",
                    score: 85,
                  },
                  {
                    id: "s2",
                    title: "Cost Optimization",
                    riskLevel: "low",
                    score: 75,
                  },
                  {
                    id: "s3",
                    title: "Product Innovation",
                    riskLevel: "high",
                    score: 92,
                  },
                ],
                executives: [
                  { id: "e1", name: "Marketing Director", affinity: 92 },
                  { id: "e2", name: "CFO", affinity: 78 },
                  { id: "e3", name: "CTO", affinity: 65 },
                ],
                topics: [
                  { id: "t1", name: "Digital Marketing", relevance: 95 },
                  { id: "t2", name: "Financial Planning", relevance: 82 },
                  { id: "t3", name: "Technology Stack", relevance: 79 },
                ],
              },
            ];
          } catch (error) {
            loggingService_1.logger.error(
              "Error getting recommendations",
              error,
            );
            sonner_1.toast.error("Could not load recommendations");
            return [
              2 /*return*/,
              { strategies: [], executives: [], topics: [] },
            ];
          }
          return [2 /*return*/];
        });
      });
    },
    [user === null || user === void 0 ? void 0 : user.id],
  );
  return {
    trackAction: trackAction,
    isTracking: isTracking,
    setTrackingEnabled: setTrackingEnabled,
    clearTrackedActions: clearTrackedActions,
    getInsights: getInsights,
    getRecommendations: getRecommendations,
  };
}
