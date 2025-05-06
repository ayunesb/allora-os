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
exports.trainForecastModel = trainForecastModel;
exports.forecastFuture = forecastFuture;
exports.forecastExecutiveResources = forecastExecutiveResources;
exports.trainMultiForecastModels = trainMultiForecastModels;
exports.forecastMultipleFuture = forecastMultipleFuture;
var tf = require("@tensorflow/tfjs");
var loggingService_1 = require("@/utils/loggingService");
/**
 * Trains a simple forecast model based on historical data
 *
 * @param data Array of numerical data points
 * @returns Trained TensorFlow model
 */
function trainForecastModel(data) {
  return __awaiter(this, void 0, void 0, function () {
    var xs, ys, model, error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          xs = tf.tensor1d(
            data.map(function (_, i) {
              return i;
            }),
          );
          ys = tf.tensor1d(data);
          model = tf.sequential();
          model.add(
            tf.layers.dense({ units: 8, activation: "relu", inputShape: [1] }),
          );
          model.add(tf.layers.dense({ units: 8, activation: "relu" }));
          model.add(tf.layers.dense({ units: 1 }));
          // Compile the model with appropriate optimizer and loss function
          model.compile({ optimizer: "adam", loss: "meanSquaredError" });
          // Train the model
          return [
            4 /*yield*/,
            model.fit(xs, ys, {
              epochs: 500,
              verbose: 0,
            }),
          ];
        case 1:
          // Train the model
          _a.sent();
          return [2 /*return*/, model];
        case 2:
          error_1 = _a.sent();
          loggingService_1.logger.error(
            "Error training forecast model:",
            error_1,
          );
          throw error_1;
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Forecasts future values using a trained model
 *
 * @param model Trained TensorFlow model
 * @param nextX The time index to predict
 * @returns Predicted value for the given time index
 */
function forecastFuture(model, nextX) {
  return __awaiter(this, void 0, void 0, function () {
    var input, prediction, forecastedValue, error_2;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          input = tf.tensor2d([[nextX]]);
          prediction = model.predict(input);
          return [4 /*yield*/, prediction.data()];
        case 1:
          forecastedValue = _a.sent()[0];
          return [2 /*return*/, forecastedValue];
        case 2:
          error_2 = _a.sent();
          loggingService_1.logger.error(
            "Error forecasting future value:",
            error_2,
          );
          throw error_2;
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Forecasts resource points for an executive based on past performance
 *
 * @param pastResourcePoints Array of historical resource point values
 * @returns Predicted future resource point value
 */
function forecastExecutiveResources(pastResourcePoints) {
  return __awaiter(this, void 0, void 0, function () {
    var model, nextX, forecastedValue, error_3;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 3, , 4]);
          if (pastResourcePoints.length < 3) {
            return [2 /*return*/, null]; // Not enough data for meaningful prediction
          }
          return [4 /*yield*/, trainForecastModel(pastResourcePoints)];
        case 1:
          model = _a.sent();
          nextX = pastResourcePoints.length;
          return [4 /*yield*/, forecastFuture(model, nextX)];
        case 2:
          forecastedValue = _a.sent();
          return [2 /*return*/, Math.round(forecastedValue)];
        case 3:
          error_3 = _a.sent();
          loggingService_1.logger.error(
            "Error forecasting executive resources:",
            error_3,
          );
          return [2 /*return*/, null];
        case 4:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Trains multiple forecast models for different KPI types
 *
 * @param kpiData Record of KPI types to their historical data
 * @returns Record of KPI types to their trained models
 */
function trainMultiForecastModels(kpiData) {
  return __awaiter(this, void 0, void 0, function () {
    var models, _a, _b, _c, _i, kpiType, data, _d, _e, error_4;
    return __generator(this, function (_f) {
      switch (_f.label) {
        case 0:
          _f.trys.push([0, 5, , 6]);
          models = {};
          _a = kpiData;
          _b = [];
          for (_c in _a) _b.push(_c);
          _i = 0;
          _f.label = 1;
        case 1:
          if (!(_i < _b.length)) return [3 /*break*/, 4];
          _c = _b[_i];
          if (!(_c in _a)) return [3 /*break*/, 3];
          kpiType = _c;
          data = kpiData[kpiType];
          if (data.length < 3) {
            loggingService_1.logger.warn(
              "Not enough data points for KPI type ".concat(
                kpiType,
                ". Skipping model training.",
              ),
            );
            return [3 /*break*/, 3];
          }
          _d = models;
          _e = kpiType;
          return [4 /*yield*/, trainForecastModel(data)];
        case 2:
          _d[_e] = _f.sent();
          loggingService_1.logger.info(
            "Trained forecast model for KPI type: ".concat(kpiType),
          );
          _f.label = 3;
        case 3:
          _i++;
          return [3 /*break*/, 1];
        case 4:
          return [2 /*return*/, models];
        case 5:
          error_4 = _f.sent();
          loggingService_1.logger.error(
            "Error training multiple forecast models:",
            error_4,
          );
          throw error_4;
        case 6:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Forecasts future values for multiple KPI types
 *
 * @param models Record of KPI types to their trained models
 * @param nextX The time index to predict
 * @returns Record of KPI types to their predicted values
 */
function forecastMultipleFuture(models, nextX) {
  return __awaiter(this, void 0, void 0, function () {
    var forecasts, _a, _b, _c, _i, kpiType, model, _d, _e, error_5;
    return __generator(this, function (_f) {
      switch (_f.label) {
        case 0:
          _f.trys.push([0, 5, , 6]);
          forecasts = {};
          _a = models;
          _b = [];
          for (_c in _a) _b.push(_c);
          _i = 0;
          _f.label = 1;
        case 1:
          if (!(_i < _b.length)) return [3 /*break*/, 4];
          _c = _b[_i];
          if (!(_c in _a)) return [3 /*break*/, 3];
          kpiType = _c;
          model = models[kpiType];
          _d = forecasts;
          _e = kpiType;
          return [4 /*yield*/, forecastFuture(model, nextX)];
        case 2:
          _d[_e] = _f.sent();
          loggingService_1.logger.info(
            "Forecasted future value for KPI type "
              .concat(kpiType, ": ")
              .concat(forecasts[kpiType]),
          );
          _f.label = 3;
        case 3:
          _i++;
          return [3 /*break*/, 1];
        case 4:
          return [2 /*return*/, forecasts];
        case 5:
          error_5 = _f.sent();
          loggingService_1.logger.error(
            "Error forecasting multiple future values:",
            error_5,
          );
          throw error_5;
        case 6:
          return [2 /*return*/];
      }
    });
  });
}
