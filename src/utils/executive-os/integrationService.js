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
exports.upgradeExecutiveBot = upgradeExecutiveBot;
exports.upgradeAllExecutiveBots = upgradeAllExecutiveBots;
var loggingService_1 = require("@/utils/loggingService");
var client_1 = require("@/integrations/supabase/client");
var sonner_1 = require("sonner");
var executiveOS_1 = require("./executiveOS");
var executiveBoostService_1 = require("./executiveBoostService");
var roleStrategies_1 = require("./roleStrategies");
/**
 * Integrate Executive OS capabilities with an AI bot
 */
function upgradeExecutiveBot(botName, botRole) {
  return __awaiter(this, void 0, void 0, function () {
    var enhancements,
      strategicFocus,
      integrationResult,
      error,
      dbError_1,
      upgradedBot,
      error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 5, , 6]);
          loggingService_1.logger.info(
            "Starting Executive OS integration for "
              .concat(botName, " (")
              .concat(botRole, ")"),
          );
          enhancements = (0, executiveBoostService_1.getExecutiveEnhancements)(
            botName,
          );
          strategicFocus = (0, roleStrategies_1.determineStrategicFocus)(
            botRole,
          );
          integrationResult = (0, executiveOS_1.integrateExecutiveOS)(
            botName,
            enhancements.boost.name,
            strategicFocus,
          );
          _a.label = 1;
        case 1:
          _a.trys.push([1, 3, , 4]);
          return [
            4 /*yield*/,
            client_1.supabase.from("executive_os_integrations").insert({
              bot_name: botName,
              bot_role: botRole,
              cognitive_boost: enhancements.boost.name,
              mental_model: enhancements.model.name,
              strategic_focus: strategicFocus,
              integration_date: new Date().toISOString(),
            }),
          ];
        case 2:
          error = _a.sent().error;
          if (error) {
            loggingService_1.logger.warn(
              "Error storing Executive OS integration for ".concat(
                botName,
                ":",
              ),
              error,
            );
          }
          return [3 /*break*/, 4];
        case 3:
          dbError_1 = _a.sent();
          loggingService_1.logger.warn(
            "Database operation failed for Executive OS integration:",
            dbError_1,
          );
          return [3 /*break*/, 4];
        case 4:
          upgradedBot = {
            name: botName,
            role: botRole,
            modeledAfter: botName,
            personalityTraits: (0,
            executiveBoostService_1.determinePersonalityTraits)(
              botName,
              botRole,
            ),
            thinkingModels: [
              "First Principles",
              "OODA Loop",
              "Inversion",
              "80/20 Rule",
            ],
            decisionFramework: [
              "3x3 Priorities",
              "Eisenhower Matrix",
              "Speed on low-stakes",
            ],
            delegationLevel: 3,
            cognitiveBoost: enhancements.boost.name,
            mentalModel: enhancements.model.name,
            lastIntegrationDate: new Date().toISOString(),
            strategicFocus: strategicFocus,
          };
          // Show success message
          sonner_1.toast.success(
            "".concat(botName, " upgraded with Executive OS"),
            {
              description: "Integrated "
                .concat(enhancements.boost.name, " boost and ")
                .concat(enhancements.model.name),
            },
          );
          return [2 /*return*/, upgradedBot];
        case 5:
          error_1 = _a.sent();
          loggingService_1.logger.error(
            "Failed to upgrade executive bot ".concat(botName, ":"),
            error_1,
          );
          sonner_1.toast.error("Failed to upgrade ".concat(botName), {
            description: "The executive OS integration encountered an error",
          });
          return [2 /*return*/, null];
        case 6:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Upgrade multiple executive bots at once
 */
function upgradeAllExecutiveBots(executives) {
  return __awaiter(this, void 0, void 0, function () {
    var upgraded, successCount, failedCount, _i, executives_1, exec, result;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          upgraded = [];
          successCount = 0;
          failedCount = 0;
          (_i = 0), (executives_1 = executives);
          _a.label = 1;
        case 1:
          if (!(_i < executives_1.length)) return [3 /*break*/, 4];
          exec = executives_1[_i];
          return [4 /*yield*/, upgradeExecutiveBot(exec.name, exec.role)];
        case 2:
          result = _a.sent();
          if (result) {
            upgraded.push(result);
            successCount++;
          } else {
            failedCount++;
          }
          _a.label = 3;
        case 3:
          _i++;
          return [3 /*break*/, 1];
        case 4:
          return [
            2 /*return*/,
            {
              success: successCount,
              failed: failedCount,
              upgraded: upgraded,
            },
          ];
      }
    });
  });
}
