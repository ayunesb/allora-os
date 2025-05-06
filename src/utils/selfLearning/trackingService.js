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
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackUserAction = trackUserAction;
exports.trackStrategyFeedback = trackStrategyFeedback;
exports.trackCampaignFeedback = trackCampaignFeedback;
exports.trackScriptFeedback = trackScriptFeedback;
var supabase_1 = require("@/backend/supabase");
/**
 * Track a user action for the self-learning system
 */
function trackUserAction(
  userId_1,
  action_1,
  category_1,
  entityId_1,
  entityType_1,
) {
  return __awaiter(
    this,
    arguments,
    void 0,
    function (userId, action, category, entityId, entityType, metadata) {
      var timestamp, error_1, storedActions, error_2;
      if (metadata === void 0) {
        metadata = {};
      }
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 5, , 6]);
            timestamp = new Date().toISOString();
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            return [
              4 /*yield*/,
              supabase_1.supabase.rpc("insert_user_action", {
                p_user_id: userId,
                p_action: action,
                p_category: category,
                p_entity_id: entityId,
                p_entity_type: entityType,
                p_metadata: metadata,
                p_timestamp: timestamp,
              }),
            ];
          case 2:
            _a.sent();
            return [3 /*break*/, 4];
          case 3:
            error_1 = _a.sent();
            console.error("Error storing user action in Supabase:", error_1);
            storedActions = JSON.parse(
              localStorage.getItem("user_actions") || "[]",
            );
            storedActions.push({
              userId: userId,
              action: action,
              category: category,
              entityId: entityId,
              entityType: entityType,
              metadata: metadata,
              timestamp: timestamp,
            });
            localStorage.setItem("user_actions", JSON.stringify(storedActions));
            return [3 /*break*/, 4];
          case 4:
            return [3 /*break*/, 6];
          case 5:
            error_2 = _a.sent();
            console.error("Error tracking user action:", error_2);
            return [3 /*break*/, 6];
          case 6:
            return [2 /*return*/];
        }
      });
    },
  );
}
/**
 * Track strategy feedback to improve AI recommendations
 */
function trackStrategyFeedback(userId_1, strategyId_1, isPositive_1) {
  return __awaiter(
    this,
    arguments,
    void 0,
    function (userId, strategyId, isPositive, metadata) {
      if (metadata === void 0) {
        metadata = {};
      }
      return __generator(this, function (_a) {
        return [
          2 /*return*/,
          trackUserAction(
            userId,
            isPositive ? "strategy_approve" : "strategy_reject",
            "strategy_feedback",
            strategyId,
            "strategy",
            __assign(__assign({}, metadata), {
              rating: isPositive ? "positive" : "negative",
            }),
          ),
        ];
      });
    },
  );
}
/**
 * Track campaign feedback to improve marketing recommendations
 */
function trackCampaignFeedback(userId_1, campaignId_1, isPositive_1) {
  return __awaiter(
    this,
    arguments,
    void 0,
    function (userId, campaignId, isPositive, metadata) {
      if (metadata === void 0) {
        metadata = {};
      }
      return __generator(this, function (_a) {
        return [
          2 /*return*/,
          trackUserAction(
            userId,
            isPositive ? "campaign_approve" : "campaign_reject",
            "campaign_feedback",
            campaignId,
            "campaign",
            __assign(__assign({}, metadata), {
              rating: isPositive ? "positive" : "negative",
            }),
          ),
        ];
      });
    },
  );
}
/**
 * Track script usage and feedback to improve call/message templates
 */
function trackScriptFeedback(userId_1, scriptId_1, scriptType_1, action_1) {
  return __awaiter(
    this,
    arguments,
    void 0,
    function (userId, scriptId, scriptType, action, metadata) {
      if (metadata === void 0) {
        metadata = {};
      }
      return __generator(this, function (_a) {
        return [
          2 /*return*/,
          trackUserAction(
            userId,
            "script_".concat(action),
            "script_feedback",
            scriptId,
            "".concat(scriptType, "_script"),
            metadata,
          ),
        ];
      });
    },
  );
}
