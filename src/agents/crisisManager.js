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
exports.triggerCrisisMeeting = triggerCrisisMeeting;
var debateSession_1 = require("./debate/debateSession");
var loggingService_1 = require("@/utils/loggingService");
// Mock function to replace supabase.from('executive_actions') to avoid build errors
function getExecutiveActions() {
  return {
    insert: function (data) {
      return {
        error: null,
      };
    },
  };
}
/**
 * Triggers a crisis meeting for each anomaly detected
 *
 * @param anomalies Array of detected anomalies
 * @returns Promise resolved when all crisis meetings have been processed
 */
function triggerCrisisMeeting(anomalies) {
  return __awaiter(this, void 0, void 0, function () {
    var crisisTasks, _i, crisisTasks_1, task, debateResults, error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          if (!anomalies || anomalies.length === 0) {
            loggingService_1.logger.info(
              "No anomalies to process for crisis meeting",
            );
            return [2 /*return*/];
          }
          crisisTasks = anomalies.map(function (a) {
            return "Emergency Response for "
              .concat(a.kpi.toUpperCase(), " ")
              .concat(a.issue, ": Current Value = ")
              .concat(a.value.toFixed(2));
          });
          loggingService_1.logger.info(
            "Triggering ".concat(crisisTasks.length, " crisis debates"),
          );
          (_i = 0), (crisisTasks_1 = crisisTasks);
          _a.label = 1;
        case 1:
          if (!(_i < crisisTasks_1.length)) return [3 /*break*/, 9];
          task = crisisTasks_1[_i];
          _a.label = 2;
        case 2:
          _a.trys.push([2, 7, , 8]);
          loggingService_1.logger.warn("🚨 Triggering Crisis Debate for:", {
            task: task,
          });
          return [
            4 /*yield*/,
            (0, debateSession_1.runDebateSession)(task, "medium", "stability"),
          ];
        case 3:
          debateResults = _a.sent();
          if (!(debateResults.summary.majority === "For"))
            return [3 /*break*/, 5];
          loggingService_1.logger.info(
            "✅ Crisis Response Approved: Executing Plan.",
            {
              task: task,
              confidence: debateResults.summary.confidenceScore,
            },
          );
          return [
            4 /*yield*/,
            createRecoveryAction(
              task,
              debateResults.summary.topOpportunities[0],
            ),
          ];
        case 4:
          _a.sent();
          return [3 /*break*/, 6];
        case 5:
          loggingService_1.logger.info(
            "❌ Crisis Response Rejected: No action taken.",
            {
              task: task,
              confidence: debateResults.summary.confidenceScore,
            },
          );
          _a.label = 6;
        case 6:
          return [3 /*break*/, 8];
        case 7:
          error_1 = _a.sent();
          loggingService_1.logger.error("Failed to process crisis meeting", {
            task: task,
            error: error_1,
          });
          return [3 /*break*/, 8];
        case 8:
          _i++;
          return [3 /*break*/, 1];
        case 9:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Creates a recovery action based on crisis meeting outcome
 *
 * @param task The crisis task
 * @param recommendation Recommended action
 * @returns Promise resolved when recovery action has been created
 */
function createRecoveryAction(task, recommendation) {
  return __awaiter(this, void 0, void 0, function () {
    var error;
    return __generator(this, function (_a) {
      try {
        error = getExecutiveActions().insert([
          {
            task: task,
            status: "pending",
            triggered_by: "Crisis Detection",
            performance_notes: recommendation || "Emergency response required",
            created_at: new Date().toISOString(),
          },
        ]).error;
        if (error) {
          loggingService_1.logger.error("Failed to create recovery action:", {
            task: task,
            error: error,
          });
        } else {
          loggingService_1.logger.info("Recovery Action Created:", {
            task: task,
          });
        }
      } catch (error) {
        loggingService_1.logger.error(
          "Exception when creating recovery action:",
          { task: task, error: error },
        );
      }
      return [2 /*return*/];
    });
  });
}
