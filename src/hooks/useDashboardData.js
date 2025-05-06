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
exports.useDashboardData = useDashboardData;
var react_query_1 = require("@tanstack/react-query");
// Mock data fetching function - this would connect to your API
var fetchDashboardData = function (userId) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      if (!userId) {
        throw new Error("User ID is required");
      }
      // Simulate API call
      return [
        2 /*return*/,
        new Promise(function (resolve) {
          setTimeout(function () {
            resolve({
              recommendations: [
                {
                  id: "rec-1", // Changed from numeric to string ID
                  title: "Optimize your lead scoring model",
                  description:
                    "Fine-tune your lead scoring model based on recent conversion patterns",
                  type: "strategy",
                  executiveBot: {
                    name: "Mark Cuban",
                    role: "Marketing Strategist",
                  },
                  expectedImpact: 78,
                  timeframe: "2-4 weeks",
                },
                {
                  id: "rec-2", // Changed from numeric to string ID
                  title: "Schedule executive debate",
                  description:
                    "Schedule a debate between AI executives about your latest strategy",
                  type: "strategy",
                  executiveBot: {
                    name: "Satya Nadella",
                    role: "CEO",
                  },
                  expectedImpact: 65,
                  timeframe: "Immediate",
                },
                {
                  id: "rec-3", // Changed from numeric to string ID
                  title: "Review campaign performance",
                  description:
                    "Your recent campaigns show promising results with room for optimization",
                  type: "campaign",
                  executiveBot: {
                    name: "Gary Vaynerchuk",
                    role: "Marketing Expert",
                  },
                  expectedImpact: 82,
                  timeframe: "1-2 weeks",
                },
              ],
              metrics: {
                leadConversion: 12.4,
                campaignROI: 3.2,
                engagementRate: 28.7,
              },
              recentActivities: [
                {
                  id: 1,
                  type: "strategy",
                  title: "New market expansion strategy created",
                  date: new Date(),
                },
                {
                  id: 2,
                  type: "lead",
                  title: "Lead scoring model updated",
                  date: new Date(Date.now() - 86400000),
                },
              ],
            });
          }, 500);
        }),
      ];
    });
  });
};
function useDashboardData(userId) {
  return (0, react_query_1.useQuery)({
    queryKey: ["dashboardData", userId],
    queryFn: function () {
      return fetchDashboardData(userId);
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
