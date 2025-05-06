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
exports.executeCampaign = void 0;
var toastService_1 = require("@/utils/toastService");
var executeCampaign = function (campaignContext) {
  return __awaiter(void 0, void 0, void 0, function () {
    var plugins, _i, plugins_1, plugin, output, error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 9, , 10]);
          return [
            4 /*yield*/,
            loadPluginsByStrategy(campaignContext.strategy_id),
          ];
        case 1:
          plugins = _a.sent();
          (_i = 0), (plugins_1 = plugins);
          _a.label = 2;
        case 2:
          if (!(_i < plugins_1.length)) return [3 /*break*/, 7];
          plugin = plugins_1[_i];
          return [4 /*yield*/, plugin.executeHandler(campaignContext)];
        case 3:
          output = _a.sent();
          // Persist KPI metrics
          return [
            4 /*yield*/,
            persistKpiMetrics({
              plugin_id: plugin.id,
              campaign_id: campaignContext.campaign_id,
              metric_type: output.metricType,
              value: output.value,
            }),
          ];
        case 4:
          // Persist KPI metrics
          _a.sent();
          // Append plugin log
          return [
            4 /*yield*/,
            appendPluginLog({
              plugin_id: plugin.id,
              campaign_id: campaignContext.campaign_id,
              timestamp: new Date(),
              output: output,
            }),
          ];
        case 5:
          // Append plugin log
          _a.sent();
          _a.label = 6;
        case 6:
          _i++;
          return [3 /*break*/, 2];
        case 7:
          // Append admin log
          return [
            4 /*yield*/,
            appendAdminLog({
              context: "campaign_execution",
              campaign_id: campaignContext.campaign_id,
              summary: "Campaign executed successfully",
            }),
          ];
        case 8:
          // Append admin log
          _a.sent();
          toastService_1.toastService.success("Campaign executed successfully");
          return [3 /*break*/, 10];
        case 9:
          error_1 = _a.sent();
          if (error_1 instanceof Error) {
            toastService_1.toastService.error(error_1.message);
            throw error_1;
          } else {
            toastService_1.toastService.error(
              "An unknown error occurred during execution.",
            );
            throw new Error("Unknown error");
          }
          return [3 /*break*/, 10];
        case 10:
          return [2 /*return*/];
      }
    });
  });
};
exports.executeCampaign = executeCampaign;
// Mock implementations for required functions
function loadPluginsByStrategy(strategy_id) {
  return __awaiter(this, void 0, void 0, function () {
    var _this = this;
    return __generator(this, function (_a) {
      // Replace with actual logic
      return [
        2 /*return*/,
        Promise.resolve([
          {
            id: 1,
            executeHandler: function (context) {
              return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                  return [
                    2 /*return*/,
                    {
                      metricType: "exampleMetric",
                      value: 100,
                    },
                  ];
                });
              });
            },
          },
        ]),
      ];
    });
  });
}
function persistKpiMetrics(arg) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [2 /*return*/];
    });
  });
}
function appendPluginLog(arg) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [2 /*return*/];
    });
  });
}
function appendAdminLog(arg) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [2 /*return*/];
    });
  });
}
