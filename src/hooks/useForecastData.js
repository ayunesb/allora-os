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
exports.useForecastData = useForecastData;
var react_1 = require("react");
var client_1 = require("@/integrations/supabase/client");
var forecaster_1 = require("@/agents/forecaster");
var anomalyDetector_1 = require("@/agents/anomalyDetector");
var crisisManager_1 = require("@/agents/crisisManager");
var sonner_1 = require("sonner");
// Default thresholds for different KPI types
var DEFAULT_THRESHOLDS = {
  revenue: { min: 50000, max: 1000000 },
  churn: { min: 0, max: 0.2 },
  user_growth: { min: 100, max: 10000 },
  retention: { min: 0.6, max: 1.0 },
  conversion_rate: { min: 0.02, max: 0.2 },
  executive_resources: { min: 50, max: 450 },
};
function useForecastData() {
  var _this = this;
  var _a = (0, react_1.useState)({}),
    kpiData = _a[0],
    setKpiData = _a[1];
  var _b = (0, react_1.useState)({}),
    forecasts = _b[0],
    setForecasts = _b[1];
  var _c = (0, react_1.useState)([]),
    anomalies = _c[0],
    setAnomalies = _c[1];
  var _d = (0, react_1.useState)({}),
    recommendations = _d[0],
    setRecommendations = _d[1];
  var _e = (0, react_1.useState)(true),
    loading = _e[0],
    setLoading = _e[1];
  var _f = (0, react_1.useState)(false),
    refreshing = _f[0],
    setRefreshing = _f[1];
  // Function to fetch KPI data and generate forecasts
  var fetchAndForecast = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var types,
        dataMap,
        _i,
        types_1,
        type,
        data,
        _a,
        resourceHistory,
        error,
        _b,
        kpiHistory,
        error,
        models,
        nextX,
        multiForecast,
        detectedAnomalies,
        anomalyRecommendations,
        error_1;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _c.trys.push([0, 10, 11, 12]);
            setLoading(true);
            types = ["revenue", "churn", "user_growth", "executive_resources"];
            dataMap = {};
            (_i = 0), (types_1 = types);
            _c.label = 1;
          case 1:
            if (!(_i < types_1.length)) return [3 /*break*/, 7];
            type = types_1[_i];
            data = void 0;
            if (!(type === "executive_resources")) return [3 /*break*/, 3];
            return [
              4 /*yield*/,
              client_1.supabase
                .from("executive_resource_history")
                .select("resource_points, created_at")
                .order("created_at", { ascending: true }),
            ];
          case 2:
            (_a = _c.sent()), (resourceHistory = _a.data), (error = _a.error);
            if (!error && resourceHistory && resourceHistory.length > 0) {
              data = resourceHistory.map(function (entry) {
                return entry.resource_points;
              });
            }
            return [3 /*break*/, 5];
          case 3:
            return [
              4 /*yield*/,
              client_1.supabase
                .from("kpi_history")
                .select("*")
                .eq("type", type)
                .order("timestamp", { ascending: true }),
            ];
          case 4:
            (_b = _c.sent()), (kpiHistory = _b.data), (error = _b.error);
            if (!error && kpiHistory && kpiHistory.length > 0) {
              data = kpiHistory.map(function (entry) {
                return entry.value;
              });
            }
            _c.label = 5;
          case 5:
            // If we have data, add it to our map
            if (data && data.length) {
              dataMap[type] = data;
            } else {
              // Generate synthetic data for demo purposes
              dataMap[type] = generateSyntheticData(type, 12);
            }
            _c.label = 6;
          case 6:
            _i++;
            return [3 /*break*/, 1];
          case 7:
            // Store the KPI data
            setKpiData(dataMap);
            return [
              4 /*yield*/,
              (0, forecaster_1.trainMultiForecastModels)(dataMap),
            ];
          case 8:
            models = _c.sent();
            nextX = Math.max.apply(
              Math,
              Object.values(dataMap).map(function (arr) {
                return arr.length;
              }),
            );
            return [
              4 /*yield*/,
              (0, forecaster_1.forecastMultipleFuture)(models, nextX),
            ];
          case 9:
            multiForecast = _c.sent();
            // Store the forecasts
            setForecasts(multiForecast);
            detectedAnomalies = (0, anomalyDetector_1.detectAnomalies)(
              multiForecast,
              DEFAULT_THRESHOLDS,
            );
            setAnomalies(detectedAnomalies);
            anomalyRecommendations = (0,
            anomalyDetector_1.getAnomalyRecommendations)(detectedAnomalies);
            setRecommendations(anomalyRecommendations);
            // If anomalies are found, trigger crisis meeting
            if (detectedAnomalies.length > 0) {
              (0, crisisManager_1.triggerCrisisMeeting)(detectedAnomalies);
            }
            return [3 /*break*/, 12];
          case 10:
            error_1 = _c.sent();
            console.error("Error in forecast generation:", error_1);
            sonner_1.toast.error(
              "Failed to generate forecasts. Please try again.",
            );
            return [3 /*break*/, 12];
          case 11:
            setLoading(false);
            setRefreshing(false);
            return [7 /*endfinally*/];
          case 12:
            return [2 /*return*/];
        }
      });
    });
  };
  // Generate synthetic data for demo purposes
  var generateSyntheticData = function (type, count) {
    var data = [];
    var base = 0;
    switch (type) {
      case "revenue":
        base = 100000;
        for (var i = 0; i < count; i++) {
          data.push(base + Math.random() * 20000 - 10000);
        }
        break;
      case "churn":
        base = 0.05;
        for (var i = 0; i < count; i++) {
          data.push(base + Math.random() * 0.06 - 0.03);
        }
        break;
      case "user_growth":
        base = 500;
        for (var i = 0; i < count; i++) {
          data.push(base + Math.random() * 300 - 150);
        }
        break;
      case "executive_resources":
        base = 200;
        for (var i = 0; i < count; i++) {
          data.push(base + Math.random() * 60 - 30);
        }
        break;
      default:
        for (var i = 0; i < count; i++) {
          data.push(Math.random() * 100);
        }
    }
    return data;
  };
  // Refresh forecasts
  var handleRefresh = function () {
    setRefreshing(true);
    fetchAndForecast();
  };
  // Fetch data on component mount
  (0, react_1.useEffect)(function () {
    fetchAndForecast();
  }, []);
  return {
    kpiData: kpiData,
    forecasts: forecasts,
    anomalies: anomalies,
    recommendations: recommendations,
    loading: loading,
    refreshing: refreshing,
    handleRefresh: handleRefresh,
  };
}
