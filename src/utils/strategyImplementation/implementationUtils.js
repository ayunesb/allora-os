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
exports.fetchStrategyMilestones = fetchStrategyMilestones;
exports.createMilestone = createMilestone;
exports.updateMilestone = updateMilestone;
exports.deleteMilestone = deleteMilestone;
exports.calculateStrategyProgress = calculateStrategyProgress;
exports.getStatusColor = getStatusColor;
var supabase_1 = require("@/backend/supabase");
var sonner_1 = require("sonner");
// Fetch all milestones for a strategy
function fetchStrategyMilestones(strategyId) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_1;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("strategy_milestones")
              .select("*")
              .eq("strategyId", strategyId)
              .order("dueDate", { ascending: true }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            throw error;
          }
          return [2 /*return*/, data || []];
        case 2:
          error_1 = _b.sent();
          console.error("Error fetching strategy milestones:", error_1.message);
          return [2 /*return*/, []];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
// Create a new milestone
function createMilestone(milestone) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_2;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("strategy_milestones")
              .insert([
                __assign(__assign({}, milestone), {
                  created_at: new Date().toISOString(),
                }),
              ])
              .select()
              .single(),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            throw error;
          }
          sonner_1.toast.success("Milestone created successfully");
          return [2 /*return*/, data];
        case 2:
          error_2 = _b.sent();
          sonner_1.toast.error(
            "Failed to create milestone: ".concat(error_2.message),
          );
          return [2 /*return*/, null];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
// Update a milestone
function updateMilestone(id, updates) {
  return __awaiter(this, void 0, void 0, function () {
    var error, error_3;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("strategy_milestones")
              .update(updates)
              .eq("id", id),
          ];
        case 1:
          error = _a.sent().error;
          if (error) {
            throw error;
          }
          sonner_1.toast.success("Milestone updated successfully");
          return [2 /*return*/, true];
        case 2:
          error_3 = _a.sent();
          sonner_1.toast.error(
            "Failed to update milestone: ".concat(error_3.message),
          );
          return [2 /*return*/, false];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
// Delete a milestone
function deleteMilestone(id) {
  return __awaiter(this, void 0, void 0, function () {
    var error, error_4;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("strategy_milestones")
              .delete()
              .eq("id", id),
          ];
        case 1:
          error = _a.sent().error;
          if (error) {
            throw error;
          }
          sonner_1.toast.success("Milestone deleted successfully");
          return [2 /*return*/, true];
        case 2:
          error_4 = _a.sent();
          sonner_1.toast.error(
            "Failed to delete milestone: ".concat(error_4.message),
          );
          return [2 /*return*/, false];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
// Calculate overall progress for a strategy based on its milestones
function calculateStrategyProgress(milestones) {
  if (milestones.length === 0) return 0;
  var totalProgress = milestones.reduce(function (sum, milestone) {
    return sum + milestone.progress;
  }, 0);
  return Math.round(totalProgress / milestones.length);
}
// Get status color based on implementation status
function getStatusColor(status) {
  switch (status) {
    case "not_started":
      return "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200";
    case "in_progress":
      return "bg-blue-100 text-blue-700 dark:bg-blue-800/30 dark:text-blue-300";
    case "completed":
      return "bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-300";
    case "delayed":
      return "bg-amber-100 text-amber-700 dark:bg-amber-800/30 dark:text-amber-300";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
  }
}
