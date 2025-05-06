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
exports.useStrategyTracking = useStrategyTracking;
var react_1 = require("react");
var sonner_1 = require("sonner");
var client_1 = require("@/integrations/supabase/client");
var AuthContext_1 = require("@/context/AuthContext");
var zapierEventTriggers_1 = require("@/utils/zapierEventTriggers");
function useStrategyTracking() {
  var _this = this;
  var _a = (0, react_1.useState)(false),
    isApproving = _a[0],
    setIsApproving = _a[1];
  var _b = (0, react_1.useState)(false),
    isRejecting = _b[0],
    setIsRejecting = _b[1];
  var _c = (0, react_1.useState)(false),
    isSharing = _c[0],
    setIsSharing = _c[1];
  var _d = (0, AuthContext_1.useAuth)(),
    user = _d.user,
    profile = _d.profile;
  // Check if user is logged in
  var isLoggedIn = !!(user === null || user === void 0 ? void 0 : user.id);
  var trackApproval = (0, react_1.useCallback)(
    function (strategyId, strategyTitle) {
      return __awaiter(_this, void 0, void 0, function () {
        var error, updateError, error_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (
                !(user === null || user === void 0 ? void 0 : user.id) ||
                !(profile === null || profile === void 0
                  ? void 0
                  : profile.company_id)
              ) {
                sonner_1.toast.error(
                  "You must be logged in to approve strategies",
                );
                return [2 /*return*/, false];
              }
              setIsApproving(true);
              _a.label = 1;
            case 1:
              _a.trys.push([1, 5, 6, 7]);
              return [
                4 /*yield*/,
                client_1.supabase.from("strategy_actions").insert({
                  strategy_id: strategyId,
                  user_id: user.id,
                  action_type: "approve",
                  details: {
                    approved_at: new Date().toISOString(),
                    approved_by: user.email || "Unknown user",
                  },
                }),
              ];
            case 2:
              error = _a.sent().error;
              if (error) {
                console.error("Error recording strategy approval:", error);
                sonner_1.toast.error("Failed to record strategy approval");
                return [2 /*return*/, false];
              }
              return [
                4 /*yield*/,
                client_1.supabase
                  .from("strategies")
                  .update({
                    status: "approved",
                    approved_by: user.id,
                    approved_at: new Date().toISOString(),
                  })
                  .eq("id", strategyId),
              ];
            case 3:
              updateError = _a.sent().error;
              if (updateError) {
                console.error("Error updating strategy status:", updateError);
                sonner_1.toast.error("Failed to update strategy status");
                return [2 /*return*/, false];
              }
              // Trigger Zapier workflow for strategy approval
              return [
                4 /*yield*/,
                (0, zapierEventTriggers_1.onStrategyApproved)({
                  strategyId: strategyId,
                  strategyTitle: strategyTitle,
                  companyId: profile.company_id,
                  approvedBy: user.email || user.id,
                }),
              ];
            case 4:
              // Trigger Zapier workflow for strategy approval
              _a.sent();
              sonner_1.toast.success("Strategy approved successfully");
              return [2 /*return*/, true];
            case 5:
              error_1 = _a.sent();
              console.error("Error in strategy approval process:", error_1);
              sonner_1.toast.error("An unexpected error occurred");
              return [2 /*return*/, false];
            case 6:
              setIsApproving(false);
              return [7 /*endfinally*/];
            case 7:
              return [2 /*return*/];
          }
        });
      });
    },
    [user, profile],
  );
  var trackRejection = (0, react_1.useCallback)(
    function (strategyId, reason) {
      return __awaiter(_this, void 0, void 0, function () {
        var error, updateError, error_2;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!(user === null || user === void 0 ? void 0 : user.id)) {
                sonner_1.toast.error(
                  "You must be logged in to reject strategies",
                );
                return [2 /*return*/, false];
              }
              setIsRejecting(true);
              _a.label = 1;
            case 1:
              _a.trys.push([1, 4, 5, 6]);
              return [
                4 /*yield*/,
                client_1.supabase.from("strategy_actions").insert({
                  strategy_id: strategyId,
                  user_id: user.id,
                  action_type: "reject",
                  details: {
                    rejected_at: new Date().toISOString(),
                    rejected_by: user.email || "Unknown user",
                    reason: reason,
                  },
                }),
              ];
            case 2:
              error = _a.sent().error;
              if (error) {
                console.error("Error recording strategy rejection:", error);
                sonner_1.toast.error("Failed to record strategy rejection");
                return [2 /*return*/, false];
              }
              return [
                4 /*yield*/,
                client_1.supabase
                  .from("strategies")
                  .update({
                    status: "rejected",
                    rejected_by: user.id,
                    rejected_at: new Date().toISOString(),
                  })
                  .eq("id", strategyId),
              ];
            case 3:
              updateError = _a.sent().error;
              if (updateError) {
                console.error("Error updating strategy status:", updateError);
                sonner_1.toast.error("Failed to update strategy status");
                return [2 /*return*/, false];
              }
              sonner_1.toast.success("Strategy rejected successfully");
              return [2 /*return*/, true];
            case 4:
              error_2 = _a.sent();
              console.error("Error in strategy rejection process:", error_2);
              sonner_1.toast.error("An unexpected error occurred");
              return [2 /*return*/, false];
            case 5:
              setIsRejecting(false);
              return [7 /*endfinally*/];
            case 6:
              return [2 /*return*/];
          }
        });
      });
    },
    [user],
  );
  var trackShare = (0, react_1.useCallback)(
    function (strategyId, shareDetails) {
      return __awaiter(_this, void 0, void 0, function () {
        var error, error_3;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!(user === null || user === void 0 ? void 0 : user.id)) {
                sonner_1.toast.error(
                  "You must be logged in to share strategies",
                );
                return [2 /*return*/, false];
              }
              setIsSharing(true);
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, 4, 5]);
              return [
                4 /*yield*/,
                client_1.supabase.from("strategy_actions").insert({
                  strategy_id: strategyId,
                  user_id: user.id,
                  action_type: "share",
                  details: __assign(
                    {
                      shared_at: new Date().toISOString(),
                      shared_by: user.email || "Unknown user",
                    },
                    shareDetails,
                  ),
                }),
              ];
            case 2:
              error = _a.sent().error;
              if (error) {
                console.error("Error recording strategy share:", error);
                sonner_1.toast.error("Failed to record strategy share");
                return [2 /*return*/, false];
              }
              sonner_1.toast.success("Strategy shared successfully");
              return [2 /*return*/, true];
            case 3:
              error_3 = _a.sent();
              console.error("Error in strategy share process:", error_3);
              sonner_1.toast.error("An unexpected error occurred");
              return [2 /*return*/, false];
            case 4:
              setIsSharing(false);
              return [7 /*endfinally*/];
            case 5:
              return [2 /*return*/];
          }
        });
      });
    },
    [user],
  );
  // Add missing methods for strategy updates and filtering
  var trackStrategyUpdate = (0, react_1.useCallback)(
    function (strategyId, title, riskLevel) {
      return __awaiter(_this, void 0, void 0, function () {
        var error, error_4;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!(user === null || user === void 0 ? void 0 : user.id)) {
                sonner_1.toast.error(
                  "You must be logged in to update strategies",
                );
                return [2 /*return*/, false];
              }
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, , 4]);
              return [
                4 /*yield*/,
                client_1.supabase.from("strategy_actions").insert({
                  strategy_id: strategyId,
                  user_id: user.id,
                  action_type: "update",
                  details: {
                    updated_at: new Date().toISOString(),
                    updated_by: user.email || "Unknown user",
                    title: title,
                    risk_level: riskLevel,
                  },
                }),
              ];
            case 2:
              error = _a.sent().error;
              if (error) {
                console.error("Error recording strategy update:", error);
                return [2 /*return*/, false];
              }
              return [2 /*return*/, true];
            case 3:
              error_4 = _a.sent();
              console.error("Error tracking strategy update:", error_4);
              return [2 /*return*/, false];
            case 4:
              return [2 /*return*/];
          }
        });
      });
    },
    [user],
  );
  var trackStrategyFilter = (0, react_1.useCallback)(
    function (filterType, filterValue) {
      if (!(user === null || user === void 0 ? void 0 : user.id)) return;
      console.log(
        "User filtered strategies by "
          .concat(filterType, ": ")
          .concat(filterValue),
      );
      // Here you could record this in analytics or in supabase
    },
    [user],
  );
  return {
    trackApproval: trackApproval,
    trackRejection: trackRejection,
    trackShare: trackShare,
    trackStrategyUpdate: trackStrategyUpdate,
    trackStrategyFilter: trackStrategyFilter,
    isApproving: isApproving,
    isRejecting: isRejecting,
    isSharing: isSharing,
    isLoggedIn: isLoggedIn,
  };
}
