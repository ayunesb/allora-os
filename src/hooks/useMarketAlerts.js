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
exports.useMarketAlerts = useMarketAlerts;
var react_1 = require("react");
var sonner_1 = require("sonner");
function useMarketAlerts() {
  var _this = this;
  var _a = (0, react_1.useState)([]),
    alerts = _a[0],
    setAlerts = _a[1];
  var checkForAlerts = (0, react_1.useCallback)(function () {
    return __awaiter(_this, void 0, void 0, function () {
      var mockAlerts, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            // In a real implementation, this would call an API to get market alerts
            // For now, we'll use mock data
            // Simulate a delay for API call
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 500);
              }),
            ];
          case 1:
            // In a real implementation, this would call an API to get market alerts
            // For now, we'll use mock data
            // Simulate a delay for API call
            _a.sent();
            // ~25% chance of getting an alert
            if (Math.random() > 0.75) {
              mockAlerts = [
                {
                  id: "alert-".concat(Date.now()),
                  message:
                    "Consider updating your Expansion Strategy in light of recent AI industry developments.",
                  affectedStrategies: [
                    "Market Expansion",
                    "Digital Transformation",
                  ],
                  trendReport: {
                    title:
                      "AI Industry Developments: Strategic Impact Analysis",
                    content:
                      "Recent advancements in artificial intelligence technologies are reshaping market dynamics across industries. This report analyzes the strategic implications for businesses looking to capitalize on these trends.",
                    insights: [
                      "Large language models are becoming increasingly accessible to businesses of all sizes",
                      "AI automation is reducing operational costs by an average of 23% in early adopter companies",
                      "Competitor analysis shows 67% of market leaders have integrated AI into their core business processes",
                      "Customer behavior data indicates a 34% increase in preference for AI-enhanced products and services",
                    ],
                    recommendations: [
                      "Update your Market Expansion strategy to prioritize AI-ready markets first",
                      "Allocate resources to reskill teams in AI implementation and management",
                      "Consider strategic partnerships with AI technology providers",
                      "Develop an AI ethics framework to ensure responsible implementation",
                      "Implement a phased approach to digital transformation with clear ROI metrics",
                    ],
                    relatedStrategies: [
                      "Market Expansion",
                      "Digital Transformation",
                      "Product Development",
                      "Competitive Positioning",
                    ],
                    externalLink: "https://example.com/ai-trends",
                  },
                },
              ];
              setAlerts(mockAlerts);
            }
            return [3 /*break*/, 3];
          case 2:
            error_1 = _a.sent();
            console.error("Error checking for market alerts:", error_1);
            return [3 /*break*/, 3];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  }, []);
  var dismissAlert = (0, react_1.useCallback)(function (alertId) {
    setAlerts(function (current) {
      return current.filter(function (alert) {
        return alert.id !== alertId;
      });
    });
    sonner_1.toast.success("Alert dismissed");
  }, []);
  (0, react_1.useEffect)(
    function () {
      checkForAlerts();
      // In a real app, set up a polling interval or websocket connection
      var interval = setInterval(checkForAlerts, 30 * 60 * 1000); // Check every 30 minutes
      return function () {
        return clearInterval(interval);
      };
    },
    [checkForAlerts],
  );
  return {
    alerts: alerts,
    dismissAlert: dismissAlert,
    checkForAlerts: checkForAlerts,
  };
}
