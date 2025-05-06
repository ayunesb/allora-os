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
exports.getCompanyDashboardAnalytics =
  exports.getSystemAnalytics =
  exports.getPredictiveAnalytics =
  exports.getLeadAnalytics =
  exports.getDebateAnalytics =
  exports.getConsultationAnalytics =
  exports.getCompanyUserAnalytics =
    void 0;
var sonner_1 = require("sonner");
// Get company user analytics (mock implementation)
var getCompanyUserAnalytics = function (companyId) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      try {
        // In a real implementation, this would query the Supabase database
        // For now, return mock data
        return [
          2 /*return*/,
          {
            totalUsers: 12,
            activeUsers: 8,
            inactiveUsers: 4,
            usersByRole: {
              admin: 2,
              user: 10,
            },
          },
        ];
      } catch (error) {
        console.error("Error fetching company user analytics:", error.message);
        sonner_1.toast.error("Analytics error: ".concat(error.message));
        // Return empty data on error
        return [
          2 /*return*/,
          {
            totalUsers: 0,
            activeUsers: 0,
            inactiveUsers: 0,
            usersByRole: {},
          },
        ];
      }
      return [2 /*return*/];
    });
  });
};
exports.getCompanyUserAnalytics = getCompanyUserAnalytics;
// Get AI consultation analytics (mock implementation)
var getConsultationAnalytics = function (companyId) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      try {
        // In a real implementation, this would query the Supabase database
        // For now, return mock data
        return [
          2 /*return*/,
          {
            totalConsultations: 24,
            consultationsByBot: {
              "Elon Musk": 8,
              "Warren Buffett": 6,
              "Satya Nadella": 4,
              "Ruth Porat": 3,
              "Sheryl Sandberg": 2,
              Other: 1,
            },
            consultationsByTopic: {
              Strategy: 10,
              Finance: 8,
              Operations: 4,
              Marketing: 2,
            },
            averageConsultationLength: 12, // minutes
          },
        ];
      } catch (error) {
        console.error("Error fetching consultation analytics:", error.message);
        sonner_1.toast.error("Analytics error: ".concat(error.message));
        // Return empty data on error
        return [
          2 /*return*/,
          {
            totalConsultations: 0,
            consultationsByBot: {},
            consultationsByTopic: {},
            averageConsultationLength: 0,
          },
        ];
      }
      return [2 /*return*/];
    });
  });
};
exports.getConsultationAnalytics = getConsultationAnalytics;
// Get AI debate analytics (mock implementation)
var getDebateAnalytics = function (companyId) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      try {
        // In a real implementation, this would query the Supabase database
        // For now, return mock data
        return [
          2 /*return*/,
          {
            totalDebates: 8,
            debatesByTopic: {
              "Growth Strategy": 3,
              "Market Expansion": 2,
              "Product Development": 2,
              "Cost Reduction": 1,
            },
            averageParticipants: 4.5,
            averageMessages: 28,
          },
        ];
      } catch (error) {
        console.error("Error fetching debate analytics:", error.message);
        sonner_1.toast.error("Analytics error: ".concat(error.message));
        // Return empty data on error
        return [
          2 /*return*/,
          {
            totalDebates: 0,
            debatesByTopic: {},
            averageParticipants: 0,
            averageMessages: 0,
          },
        ];
      }
      return [2 /*return*/];
    });
  });
};
exports.getDebateAnalytics = getDebateAnalytics;
// Get lead analytics (mock implementation)
var getLeadAnalytics = function (companyId) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      try {
        // In a real implementation, this would query the Supabase database
        // For now, return mock data
        return [
          2 /*return*/,
          {
            totalLeads: 183,
            leadsBySource: {
              Website: 85,
              LinkedIn: 48,
              Referral: 25,
              Event: 15,
              Other: 10,
            },
            leadsByStatus: {
              new: 52,
              contacted: 68,
              qualified: 32,
              proposal: 15,
              negotiation: 10,
              closed: 6,
            },
            conversionRate: 3.28,
            averageLeadScore: 42,
          },
        ];
      } catch (error) {
        console.error("Error fetching lead analytics:", error.message);
        sonner_1.toast.error("Analytics error: ".concat(error.message));
        // Return empty data on error
        return [
          2 /*return*/,
          {
            totalLeads: 0,
            leadsBySource: {},
            leadsByStatus: {},
            conversionRate: 0,
            averageLeadScore: 0,
          },
        ];
      }
      return [2 /*return*/];
    });
  });
};
exports.getLeadAnalytics = getLeadAnalytics;
// Get predictive analytics (mock implementation)
var getPredictiveAnalytics = function (companyId) {
  return __awaiter(void 0, void 0, void 0, function () {
    var leadForecast, revenueForecast, engagementForecast;
    return __generator(this, function (_a) {
      try {
        leadForecast = generateForecastData("leads");
        revenueForecast = generateForecastData("revenue");
        engagementForecast = generateForecastData("engagement");
        return [
          2 /*return*/,
          {
            leadForecast: leadForecast,
            revenueForecast: revenueForecast,
            engagementForecast: engagementForecast,
          },
        ];
      } catch (error) {
        console.error("Error generating predictive analytics:", error.message);
        sonner_1.toast.error(
          "Predictive analytics error: ".concat(error.message),
        );
        // Return empty data on error
        return [
          2 /*return*/,
          {
            leadForecast: [],
            revenueForecast: [],
            engagementForecast: [],
          },
        ];
      }
      return [2 /*return*/];
    });
  });
};
exports.getPredictiveAnalytics = getPredictiveAnalytics;
// Helper to generate forecast data
function generateForecastData(type) {
  var data = [];
  var now = new Date();
  // Historical data (6 months)
  for (var i = 6; i > 0; i--) {
    var date = new Date(now);
    date.setMonth(date.getMonth() - i);
    var value = void 0;
    switch (type) {
      case "leads":
        value = 50 + (6 - i) * 10 + Math.random() * 20;
        break;
      case "revenue":
        value = 10000 + (6 - i) * 1500 + Math.random() * 2000;
        break;
      case "engagement":
        value = 40 + (6 - i) * 5 + Math.random() * 10;
        break;
      default:
        value = 100 + Math.random() * 50;
    }
    data.push({
      date: date.toISOString().split("T")[0],
      actual: value,
      predicted: value,
    });
  }
  // Forecast data (6 months)
  var lastValue = data[data.length - 1].actual;
  for (var i = 1; i <= 6; i++) {
    var date = new Date(now);
    date.setMonth(date.getMonth() + i);
    var predictedValue = void 0;
    var confidenceInterval = void 0;
    switch (type) {
      case "leads":
        predictedValue = lastValue * (1 + 0.08 * i) - Math.sin(i) * 10;
        confidenceInterval = 10 * i;
        break;
      case "revenue":
        predictedValue = lastValue * (1 + 0.05 * i);
        confidenceInterval = 1000 * i;
        break;
      case "engagement":
        predictedValue = lastValue * (1 + 0.03 * i) + Math.cos(i) * 5;
        confidenceInterval = 5 * i;
        break;
      default:
        predictedValue = lastValue * (1 + 0.05 * i);
        confidenceInterval = 20 * i;
    }
    data.push({
      date: date.toISOString().split("T")[0],
      predicted: predictedValue,
      upperBound: predictedValue + confidenceInterval,
      lowerBound: Math.max(0, predictedValue - confidenceInterval),
    });
  }
  return data;
}
// Get system analytics for administrators (mock implementation)
var getSystemAnalytics = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      try {
        // In a real implementation, this would query system logs and metrics
        // For now, return mock data
        return [
          2 /*return*/,
          {
            apiCalls: 2458,
            errorRate: 0.023, // 2.3%
            averageResponseTime: 246, // ms
            activeSubscriptions: 48,
          },
        ];
      } catch (error) {
        console.error("Error fetching system analytics:", error.message);
        sonner_1.toast.error("Analytics error: ".concat(error.message));
        // Return empty data on error
        return [
          2 /*return*/,
          {
            apiCalls: 0,
            errorRate: 0,
            averageResponseTime: 0,
            activeSubscriptions: 0,
          },
        ];
      }
      return [2 /*return*/];
    });
  });
};
exports.getSystemAnalytics = getSystemAnalytics;
// Get analytics dashboard data for company admins
var getCompanyDashboardAnalytics = function (companyId) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a,
      userAnalytics,
      consultationAnalytics,
      debateAnalytics,
      leadAnalytics,
      predictiveAnalytics,
      error_1;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            Promise.all([
              (0, exports.getCompanyUserAnalytics)(companyId),
              (0, exports.getConsultationAnalytics)(companyId),
              (0, exports.getDebateAnalytics)(companyId),
              (0, exports.getLeadAnalytics)(companyId),
              (0, exports.getPredictiveAnalytics)(companyId),
            ]),
          ];
        case 1:
          (_a = _b.sent()),
            (userAnalytics = _a[0]),
            (consultationAnalytics = _a[1]),
            (debateAnalytics = _a[2]),
            (leadAnalytics = _a[3]),
            (predictiveAnalytics = _a[4]);
          return [
            2 /*return*/,
            {
              userAnalytics: userAnalytics,
              consultationAnalytics: consultationAnalytics,
              debateAnalytics: debateAnalytics,
              leadAnalytics: leadAnalytics,
              predictiveAnalytics: predictiveAnalytics,
            },
          ];
        case 2:
          error_1 = _b.sent();
          console.error("Error fetching dashboard analytics:", error_1.message);
          sonner_1.toast.error(
            "Dashboard analytics error: ".concat(error_1.message),
          );
          throw error_1;
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
exports.getCompanyDashboardAnalytics = getCompanyDashboardAnalytics;
