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
exports.allocateResources = allocateResources;
exports.adjustVoteWeight = adjustVoteWeight;
var client_1 = require("@/integrations/supabase/client");
var loggingService_1 = require("@/utils/loggingService");
require("../mocks/executivesMock"); // Import the mock implementation
function allocateResources(executiveName, outcome) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, points, updateError, err_1;
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
            loggingService_1.logger.error("Executive not found", {
              executiveName: executiveName,
              error: error,
            });
            return [2 /*return*/];
          }
          points = data.resource_points || 100;
          if (outcome === "success") {
            points += 10; // Reward 10 points for success
          } else if (outcome === "failure") {
            points -= 15; // Deduct 15 points for failure
          }
          // Keep resource points within bounds
          points = Math.max(0, Math.min(points, 500)); // Between 0 and 500
          return [
            4 /*yield*/,
            client_1.supabase
              .from("executives")
              .update({ resource_points: points })
              .eq("name", executiveName),
          ];
        case 2:
          updateError = _b.sent().error;
          if (updateError) {
            loggingService_1.logger.error("Failed to update resource points", {
              executiveName: executiveName,
              updateError: updateError,
            });
          } else {
            loggingService_1.logger.info(
              ""
                .concat(executiveName, " now has ")
                .concat(points, " Resource Points"),
            );
          }
          // Track resource points history for forecasting (using a real table)
          return [
            4 /*yield*/,
            client_1.supabase
              .from("agent_logs")
              .insert({
                agent_id: executiveName,
                tenant_id: "development",
                xp: points,
                task: "Resource allocation: ".concat(outcome),
              })
              .then(function (_a) {
                var error = _a.error;
                if (error) {
                  loggingService_1.logger.error(
                    "Failed to track resource history",
                    { executiveName: executiveName, error: error },
                  );
                }
              }),
          ];
        case 3:
          // Track resource points history for forecasting (using a real table)
          _b.sent();
          return [3 /*break*/, 5];
        case 4:
          err_1 = _b.sent();
          loggingService_1.logger.error("Error in allocateResources", {
            error: err_1,
          });
          return [3 /*break*/, 5];
        case 5:
          return [2 /*return*/];
      }
    });
  });
}
function adjustVoteWeight(points) {
  if (points >= 400) return 3; // VIP Executive
  if (points >= 250) return 2; // Senior Executive
  return 1; // Regular Executive
}
