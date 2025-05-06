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
exports.updateExecutivePerformance = updateExecutivePerformance;
var client_1 = require("@/integrations/supabase/client");
var loggingService_1 = require("@/utils/loggingService");
require("../mocks/executivesMock"); // Import the mock implementation
/**
 * Updates an executive's performance metrics based on action outcomes
 *
 * @param executiveName The name of the executive
 * @param outcome The outcome of the action ('success' or 'failure')
 */
function updateExecutivePerformance(executiveName, outcome) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, updates, updateError, err_1;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 4, , 5]);
          return [
            4 /*yield*/,
            client_1.supabase
              .from("executives")
              .select("*")
              .eq("name", executiveName)
              .single(),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error || !data) {
            loggingService_1.logger.error(
              "Executive not found: ".concat(executiveName),
              { error: error },
            );
            return [2 /*return*/];
          }
          updates = {};
          if (outcome === "success") {
            updates.successful_actions = (data.successful_actions || 0) + 1;
            // Every 5 successful actions, increase star rating (max 5)
            if (updates.successful_actions % 5 === 0 && data.star_rating < 5) {
              updates.star_rating = (data.star_rating || 0) + 1;
              // Potentially promote the executive based on rating
              if (updates.star_rating >= 4 && data.level !== "Senior") {
                updates.level = "Senior";
                loggingService_1.logger.info(
                  "".concat(executiveName, " promoted to Senior Executive!"),
                );
              }
            }
          } else if (outcome === "failure") {
            updates.failed_actions = (data.failed_actions || 0) + 1;
            // Every 3 failed actions, decrease star rating (min 1)
            if (updates.failed_actions % 3 === 0 && data.star_rating > 1) {
              updates.star_rating = data.star_rating - 1;
              // Potentially demote the executive based on rating
              if (updates.star_rating <= 2 && data.level === "Senior") {
                updates.level = "Junior";
                loggingService_1.logger.info(
                  "".concat(executiveName, " demoted to Junior Executive."),
                );
              }
            }
          }
          return [
            4 /*yield*/,
            client_1.supabase
              .from("executives")
              .update(updates)
              .eq("name", executiveName),
          ];
        case 2:
          updateError = _b.sent().error;
          if (updateError) {
            loggingService_1.logger.error(
              "Failed to update executive performance: ".concat(executiveName),
              { error: updateError },
            );
          } else {
            loggingService_1.logger.info(
              "Updated performance for "
                .concat(executiveName, ": ")
                .concat(outcome),
            );
          }
          // Log the performance update in agent_logs (a real table)
          return [
            4 /*yield*/,
            client_1.supabase.from("agent_logs").insert({
              agent_id: executiveName,
              tenant_id: "development",
              success: outcome === "success",
              xp: outcome === "success" ? 10 : -5,
              task: "Performance update: ".concat(outcome),
            }),
          ];
        case 3:
          // Log the performance update in agent_logs (a real table)
          _b.sent();
          return [3 /*break*/, 5];
        case 4:
          err_1 = _b.sent();
          loggingService_1.logger.error("Error in updateExecutivePerformance", {
            error: err_1,
          });
          return [3 /*break*/, 5];
        case 5:
          return [2 /*return*/];
      }
    });
  });
}
