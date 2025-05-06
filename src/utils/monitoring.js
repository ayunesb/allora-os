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
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.monitoring = void 0;
exports.checkSystemHealth = checkSystemHealth;
exports.reportInfo = reportInfo;
exports.reportWarning = reportWarning;
exports.reportError = reportError;
exports.reportCritical = reportCritical;
var client_1 = require("@/integrations/supabase/client");
var uuid_1 = require("uuid");
var MonitoringSystem = /** @class */ (function () {
  function MonitoringSystem() {
    this.alerts = [];
    this.listeners = [];
    this.performanceMetrics = [];
    this.timers = {};
    this.gaugeMetrics = [];
    this.timingMetrics = [];
    // Initialize with some system alerts if needed
    this.alerts = [];
  }
  // Alert Management
  MonitoringSystem.prototype.getRecentAlerts = function (count) {
    if (count === void 0) {
      count = 10;
    }
    return __spreadArray([], this.alerts, true)
      .sort(function (a, b) {
        return b.timestamp.getTime() - a.timestamp.getTime();
      })
      .slice(0, count);
  };
  MonitoringSystem.prototype.getAlerts = function (severity) {
    if (!severity) return __spreadArray([], this.alerts, true);
    return this.alerts.filter(function (alert) {
      return alert.severity === severity;
    });
  };
  MonitoringSystem.prototype.triggerAlert = function (
    title,
    message,
    severity,
    metadata,
  ) {
    if (severity === void 0) {
      severity = "info";
    }
    var newAlert = {
      id: (0, uuid_1.v4)(),
      title: title,
      message: message,
      severity: severity,
      timestamp: new Date(),
      acknowledged: false,
      metadata: metadata,
    };
    this.alerts.push(newAlert);
    // Notify listeners
    this.notifyListeners();
    // Persist to database if critical or error
    if (severity === "critical" || severity === "error") {
      this.persistAlert(newAlert);
    }
    return newAlert;
  };
  MonitoringSystem.prototype.dismissAlert = function (alertId) {
    var alertIndex = this.alerts.findIndex(function (a) {
      return a.id === alertId;
    });
    if (alertIndex >= 0) {
      this.alerts.splice(alertIndex, 1);
      this.notifyListeners();
    }
  };
  MonitoringSystem.prototype.acknowledgeAlert = function (alertId) {
    var alert = this.alerts.find(function (a) {
      return a.id === alertId;
    });
    if (alert) {
      alert.acknowledged = true;
      this.notifyListeners();
    }
  };
  MonitoringSystem.prototype.clearAlerts = function () {
    this.alerts = [];
    this.notifyListeners();
  };
  // Listeners
  MonitoringSystem.prototype.addListener = function (listener) {
    var _this = this;
    this.listeners.push(listener);
    return function () {
      _this.listeners = _this.listeners.filter(function (l) {
        return l !== listener;
      });
    };
  };
  MonitoringSystem.prototype.notifyListeners = function () {
    for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
      var listener = _a[_i];
      listener(__spreadArray([], this.alerts, true));
    }
  };
  // Alert Persistence
  MonitoringSystem.prototype.persistAlert = function (alert) {
    return __awaiter(this, void 0, void 0, function () {
      var error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [
              4 /*yield*/,
              client_1.supabase.from("system_alerts").insert({
                alert_id: alert.id,
                title: alert.title,
                message: alert.message,
                severity: alert.severity,
                timestamp: alert.timestamp.toISOString(),
                metadata: alert.metadata,
              }),
            ];
          case 1:
            _a.sent();
            return [3 /*break*/, 3];
          case 2:
            error_1 = _a.sent();
            console.error("Failed to persist alert:", error_1);
            return [3 /*break*/, 3];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  // Performance Tracking
  MonitoringSystem.prototype.startApiTimer = function (name) {
    this.timers[name] = performance.now();
  };
  MonitoringSystem.prototype.endApiTimer = function (name) {
    if (!this.timers[name]) return null;
    var startTime = this.timers[name];
    var endTime = performance.now();
    var duration = endTime - startTime;
    this.recordPerformanceMetric({
      name: name,
      value: duration,
      unit: "ms",
      timestamp: new Date(),
    });
    // Clean up timer
    delete this.timers[name];
    return duration;
  };
  MonitoringSystem.prototype.recordPerformanceMetric = function (metric) {
    this.performanceMetrics.push(metric);
    // If response time is too slow, create an alert
    if (metric.name.includes("api") && metric.value > 1000) {
      this.triggerAlert(
        "Slow API Response",
        "".concat(metric.name, " took ").concat(metric.value, "ms to complete"),
        "warning",
        { metric: metric },
      );
    }
  };
  // New method for gauge metrics
  MonitoringSystem.prototype.setGauge = function (
    name,
    value,
    min,
    max,
    unit,
    thresholds,
  ) {
    if (min === void 0) {
      min = 0;
    }
    if (max === void 0) {
      max = 100;
    }
    if (unit === void 0) {
      unit = "%";
    }
    var metric = {
      name: name,
      value: value,
      min: min,
      max: max,
      unit: unit,
      thresholds: thresholds,
      timestamp: new Date(),
    };
    // Update existing gauge or add new one
    var existingIndex = this.gaugeMetrics.findIndex(function (g) {
      return g.name === name;
    });
    if (existingIndex >= 0) {
      this.gaugeMetrics[existingIndex] = metric;
    } else {
      this.gaugeMetrics.push(metric);
    }
    // Check thresholds and trigger alerts if necessary
    if (thresholds) {
      if (value >= thresholds.critical) {
        this.triggerAlert(
          "Critical ".concat(name),
          ""
            .concat(name, " is at ")
            .concat(value)
            .concat(unit, ", which exceeds critical threshold of ")
            .concat(thresholds.critical)
            .concat(unit),
          "critical",
          { metric: metric },
        );
      } else if (value >= thresholds.warning) {
        this.triggerAlert(
          "Warning ".concat(name),
          ""
            .concat(name, " is at ")
            .concat(value)
            .concat(unit, ", which exceeds warning threshold of ")
            .concat(thresholds.warning)
            .concat(unit),
          "warning",
          { metric: metric },
        );
      }
    }
  };
  // Get all gauge metrics
  MonitoringSystem.prototype.getGaugeMetrics = function () {
    return __spreadArray([], this.gaugeMetrics, true);
  };
  // New method for timing metrics
  MonitoringSystem.prototype.recordTiming = function (
    name,
    duration,
    category,
  ) {
    if (category === void 0) {
      category = "general";
    }
    var metric = {
      name: name,
      duration: duration,
      category: category,
      timestamp: new Date(),
    };
    this.timingMetrics.push(metric);
    // Alert on slow operations
    if (duration > 3000) {
      this.triggerAlert(
        "Slow Operation",
        "".concat(name, " took ").concat(duration, "ms to complete"),
        "warning",
        { metric: metric },
      );
    }
  };
  // Get timing metrics
  MonitoringSystem.prototype.getTimingMetrics = function (category) {
    if (category) {
      return __spreadArray([], this.timingMetrics, true).filter(function (m) {
        return m.category === category;
      });
    }
    return __spreadArray([], this.timingMetrics, true);
  };
  MonitoringSystem.prototype.getPerformanceMetrics = function (limit) {
    if (limit === void 0) {
      limit = 100;
    }
    return __spreadArray([], this.performanceMetrics, true)
      .sort(function (a, b) {
        return b.timestamp.getTime() - a.timestamp.getTime();
      })
      .slice(0, limit);
  };
  return MonitoringSystem;
})();
// Singleton instance
exports.monitoring = new MonitoringSystem();
// Utility functions for health check
function checkSystemHealth() {
  return __awaiter(this, void 0, void 0, function () {
    var supabaseCheck, services, overallStatus, error_2;
    var _a;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 4, , 5]);
          return [4 /*yield*/, checkSupabaseConnection()];
        case 1:
          supabaseCheck = _b.sent();
          _a = {
            database: supabaseCheck,
          };
          return [4 /*yield*/, checkAuthService()];
        case 2:
          _a.authentication = _b.sent();
          return [4 /*yield*/, checkApiService()];
        case 3:
          services = ((_a.api = _b.sent()), _a);
          overallStatus = determineOverallStatus(services);
          return [
            2 /*return*/,
            {
              status: overallStatus,
              services: services,
              environment: import.meta.env.MODE || "development",
              version: import.meta.env.VITE_APP_VERSION || "1.0.0",
              uptime: process.uptime ? process.uptime() * 1000 : undefined,
            },
          ];
        case 4:
          error_2 = _b.sent();
          console.error("System health check failed:", error_2);
          return [
            2 /*return*/,
            {
              status: "unhealthy",
              services: {},
              environment: import.meta.env.MODE || "development",
            },
          ];
        case 5:
          return [2 /*return*/];
      }
    });
  });
}
function checkSupabaseConnection() {
  return __awaiter(this, void 0, void 0, function () {
    var start, _a, data, error, responseTime, _b;
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          _c.trys.push([0, 2, , 3]);
          start = Date.now();
          return [
            4 /*yield*/,
            client_1.supabase.from("system_settings").select("key").limit(1),
          ];
        case 1:
          (_a = _c.sent()), (data = _a.data), (error = _a.error);
          responseTime = Date.now() - start;
          if (error) {
            return [
              2 /*return*/,
              {
                status: "unhealthy",
                responseTime: responseTime,
              },
            ];
          }
          return [
            2 /*return*/,
            {
              status: responseTime < 500 ? "healthy" : "degraded",
              responseTime: responseTime,
            },
          ];
        case 2:
          _b = _c.sent();
          return [
            2 /*return*/,
            {
              status: "unhealthy",
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
function checkAuthService() {
  return __awaiter(this, void 0, void 0, function () {
    var start, data, responseTime, _a;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          start = Date.now();
          return [4 /*yield*/, client_1.supabase.auth.getSession()];
        case 1:
          data = _b.sent().data;
          responseTime = Date.now() - start;
          return [
            2 /*return*/,
            {
              status: responseTime < 300 ? "healthy" : "degraded",
              responseTime: responseTime,
            },
          ];
        case 2:
          _a = _b.sent();
          return [
            2 /*return*/,
            {
              status: "unhealthy",
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
function checkApiService() {
  return __awaiter(this, void 0, void 0, function () {
    var start, responseTime;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          start = Date.now();
          return [
            4 /*yield*/,
            new Promise(function (resolve) {
              return setTimeout(resolve, 100);
            }),
          ];
        case 1:
          _a.sent();
          responseTime = Date.now() - start;
          return [
            2 /*return*/,
            {
              status: responseTime < 200 ? "healthy" : "degraded",
              responseTime: responseTime,
            },
          ];
      }
    });
  });
}
function determineOverallStatus(services) {
  var statuses = Object.values(services).map(function (service) {
    return service.status;
  });
  if (
    statuses.some(function (status) {
      return status === "unhealthy";
    })
  )
    return "unhealthy";
  if (
    statuses.some(function (status) {
      return status === "degraded";
    })
  )
    return "degraded";
  return "healthy";
}
// Helper functions for reporting different types of alerts
function reportInfo(title, message, metadata) {
  return exports.monitoring.triggerAlert(title, message, "info", metadata);
}
function reportWarning(title, message, metadata) {
  return exports.monitoring.triggerAlert(title, message, "warning", metadata);
}
function reportError(title, message, metadata) {
  return exports.monitoring.triggerAlert(title, message, "error", metadata);
}
function reportCritical(title, message, metadata) {
  return exports.monitoring.triggerAlert(title, message, "critical", metadata);
}
