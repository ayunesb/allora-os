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
exports.checkActionOutcome = checkActionOutcome;
var client_1 = require("@/integrations/supabase/client");
var loggingService_1 = require("@/utils/loggingService");
var selfCoach_1 = require("./selfCoach");
function checkActionOutcome(actionId, task) {
  return __awaiter(this, void 0, void 0, function () {
    var succeeded,
      outcome,
      notes,
      _a,
      data,
      error,
      actionData,
      executiveName,
      executiveRole,
      coachingNote,
      _b;
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          loggingService_1.logger.info(
            "Checking outcome for task: ".concat(task),
          );
          succeeded = Math.random() > 0.3;
          outcome = succeeded ? "success" : "failure";
          notes = succeeded
            ? "Task completed successfully. Target achieved."
            : "Task failed. Metrics below target.";
          return [
            4 /*yield*/,
            client_1.supabase
              .from("executive_actions")
              .update({
                outcome: outcome,
                performance_notes: notes,
              })
              .eq("id", actionId),
          ];
        case 1:
          (_a = _c.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            loggingService_1.logger.error("Failed to update action outcome", {
              error: error,
            });
            return [
              2 /*return*/,
              { outcome: "unknown", notes: "Error updating outcome" },
            ];
          }
          // Update executive memory with outcome
          return [
            4 /*yield*/,
            updateExecutiveMemoryWithOutcome(task, outcome, notes),
          ];
        case 2:
          // Update executive memory with outcome
          _c.sent();
          return [
            4 /*yield*/,
            client_1.supabase
              .from("executive_actions")
              .select("executive_name, executive_role")
              .eq("id", actionId)
              .single(),
          ];
        case 3:
          actionData = _c.sent().data;
          executiveName =
            (actionData === null || actionData === void 0
              ? void 0
              : actionData.executive_name) || "System";
          executiveRole =
            (actionData === null || actionData === void 0
              ? void 0
              : actionData.executive_role) || "Executive";
          return [
            4 /*yield*/,
            (0, selfCoach_1.generateSelfCoachingNote)(
              executiveName,
              executiveRole,
              task,
              outcome,
              notes,
            ),
          ];
        case 4:
          coachingNote = _c.sent();
          _b = selfCoach_1.saveCoachingNoteToMemory;
          return [4 /*yield*/, getCurrentUserId()];
        case 5:
          // Save coaching note to memory
          return [
            4 /*yield*/,
            _b.apply(void 0, [_c.sent(), executiveName, task, coachingNote]),
          ];
        case 6:
          // Save coaching note to memory
          _c.sent();
          loggingService_1.logger.info("Outcome updated successfully", {
            outcome: outcome,
            notes: notes,
          });
          return [2 /*return*/, { outcome: outcome, notes: notes }];
      }
    });
  });
}
function updateExecutiveMemoryWithOutcome(task, outcome, notes) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, _b, _c;
    var _d;
    return __generator(this, function (_e) {
      switch (_e.label) {
        case 0:
          _c = (_b = client_1.supabase.from("executive_memory")).insert;
          _d = {};
          return [4 /*yield*/, getCurrentUserId()];
        case 1:
          return [
            4 /*yield*/,
            _c.apply(_b, [
              [
                ((_d.user_id = _e.sent()),
                (_d.executive_name = "System"),
                (_d.task = "Outcome Analysis for: ".concat(task)),
                (_d.decision = "Result: "
                  .concat(outcome.toUpperCase(), " - ")
                  .concat(notes)),
                _d),
              ],
            ]),
          ];
        case 2:
          (_a = _e.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            loggingService_1.logger.error(
              "Failed to update executive memory with outcome",
              { error: error },
            );
          }
          return [2 /*return*/];
      }
    });
  });
}
// Utility function to get current user ID
function getCurrentUserId() {
  return __awaiter(this, void 0, void 0, function () {
    var user, error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [4 /*yield*/, client_1.supabase.auth.getUser()];
        case 1:
          user = _a.sent().data.user;
          return [
            2 /*return*/,
            (user === null || user === void 0 ? void 0 : user.id) || "unknown",
          ];
        case 2:
          error_1 = _a.sent();
          loggingService_1.logger.error("Failed to get current user", {
            error: error_1,
          });
          return [2 /*return*/, "unknown"];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
