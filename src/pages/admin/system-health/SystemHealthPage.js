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
exports.default = SystemHealthPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var sonner_1 = require("sonner");
var lucide_react_1 = require("lucide-react");
var SystemHealthHeader_1 = require("./SystemHealthHeader");
var SystemHealthTabs_1 = require("./SystemHealthTabs");
function SystemHealthPage() {
  var _this = this;
  var _a = (0, react_1.useState)("overview"),
    activeTab = _a[0],
    setActiveTab = _a[1];
  var _b = (0, react_1.useState)(true),
    isLoading = _b[0],
    setIsLoading = _b[1];
  var _c = (0, react_1.useState)([]),
    services = _c[0],
    setServices = _c[1];
  var _d = (0, react_1.useState)({
      status: "healthy",
      percentage: 100,
    }),
    systemHealth = _d[0],
    setSystemHealth = _d[1];
  var _e = (0, react_1.useState)([]),
    data = _e[0],
    setData = _e[1];
  (0, react_1.useEffect)(function () {
    var fetchSystemHealth = function () {
      return __awaiter(_this, void 0, void 0, function () {
        var mockServices,
          totalServices,
          healthyServices,
          degradedServices,
          status_1,
          healthPercentage,
          error_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2, 3, 4]);
              setIsLoading(true);
              // Simulate API call to fetch system health data
              return [
                4 /*yield*/,
                new Promise(function (resolve) {
                  return setTimeout(resolve, 1000);
                }),
              ];
            case 1:
              // Simulate API call to fetch system health data
              _a.sent();
              mockServices = [
                {
                  id: "1",
                  name: "Database",
                  description: "Supabase database connection",
                  status: "healthy",
                  lastChecked: new Date().toISOString(),
                  responseTime: 45,
                  details: "All database functions operating normally",
                },
                {
                  id: "2",
                  name: "Authentication",
                  description: "User authentication service",
                  status: "healthy",
                  lastChecked: new Date().toISOString(),
                  responseTime: 32,
                  details: "Authentication service functioning correctly",
                },
                {
                  id: "3",
                  name: "API Server",
                  description: "Backend API services",
                  status: "healthy",
                  lastChecked: new Date().toISOString(),
                  responseTime: 78,
                  details:
                    "All API endpoints responding within expected parameters",
                },
                {
                  id: "4",
                  name: "Storage",
                  description: "File storage service",
                  status: "healthy",
                  lastChecked: new Date().toISOString(),
                  responseTime: 120,
                  details:
                    "Storage buckets accessible and functioning correctly",
                },
                {
                  id: "5",
                  name: "Email Service",
                  description: "Email delivery service via Postmark",
                  status: "healthy",
                  lastChecked: new Date().toISOString(),
                  responseTime: 254,
                  details: "Email delivery service operational",
                },
              ];
              setServices(mockServices);
              totalServices = mockServices.length;
              healthyServices = mockServices.filter(function (s) {
                return s.status === "healthy";
              }).length;
              degradedServices = mockServices.filter(function (s) {
                return s.status === "degraded";
              }).length;
              status_1 = "healthy";
              if (healthyServices < totalServices && healthyServices > 0) {
                status_1 = "degraded";
              } else if (healthyServices === 0) {
                status_1 = "down";
              }
              healthPercentage = Math.round(
                ((healthyServices + degradedServices * 0.5) / totalServices) *
                  100,
              );
              setSystemHealth({
                status: status_1,
                percentage: healthPercentage,
              });
              sonner_1.toast.success("System health data refreshed");
              return [3 /*break*/, 4];
            case 2:
              error_1 = _a.sent();
              console.error("Error fetching system health:", error_1);
              sonner_1.toast.error("Failed to fetch system health data");
              return [3 /*break*/, 4];
            case 3:
              setIsLoading(false);
              return [7 /*endfinally*/];
            case 4:
              return [2 /*return*/];
          }
        });
      });
    };
    fetchSystemHealth();
  }, []);
  var handleTabChange = function (value) {
    setActiveTab(value);
  };
  var getStatusBadge = function (status) {
    switch (status) {
      case "healthy":
        return (0, jsx_runtime_1.jsxs)("div", {
          className: "flex items-center",
          children: [
            (0, jsx_runtime_1.jsx)(badge_1.Badge, {
              variant: "outline",
              className: "bg-green-50 text-green-700 border-green-200",
              children: "Healthy",
            }),
            (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
              className: "h-4 w-4 text-green-500 ml-2",
            }),
          ],
        });
      case "degraded":
        return (0, jsx_runtime_1.jsxs)("div", {
          className: "flex items-center",
          children: [
            (0, jsx_runtime_1.jsx)(badge_1.Badge, {
              variant: "outline",
              className: "bg-amber-50 text-amber-700 border-amber-200",
              children: "Degraded",
            }),
            (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
              className: "h-4 w-4 text-amber-500 ml-2",
            }),
          ],
        });
      case "down":
        return (0, jsx_runtime_1.jsxs)("div", {
          className: "flex items-center",
          children: [
            (0, jsx_runtime_1.jsx)(badge_1.Badge, {
              variant: "outline",
              className: "bg-red-50 text-red-700 border-red-200",
              children: "Down",
            }),
            (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
              className: "h-4 w-4 text-red-500 ml-2",
            }),
          ],
        });
      default:
        return null;
    }
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsx)(SystemHealthHeader_1.default, {}),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
            className: "pb-2",
            children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
              className: "flex justify-between",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Server, {
                      className: "mr-2 h-5 w-5 text-primary",
                    }),
                    "System Status",
                  ],
                }),
                getStatusBadge(systemHealth.status),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "flex flex-col md:flex-row gap-4",
              children: [
                (0, jsx_runtime_1.jsx)(card_1.Card, {
                  className: "flex-1 bg-muted/50",
                  children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                    className: "p-4 flex items-center gap-3",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Database, {
                        className: "h-8 w-8 text-primary",
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        children: [
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "text-sm font-medium",
                            children: "Database",
                          }),
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "text-xs text-muted-foreground",
                            children: "Operational",
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                (0, jsx_runtime_1.jsx)(card_1.Card, {
                  className: "flex-1 bg-muted/50",
                  children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                    className: "p-4 flex items-center gap-3",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Network, {
                        className: "h-8 w-8 text-primary",
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        children: [
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "text-sm font-medium",
                            children: "API",
                          }),
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "text-xs text-muted-foreground",
                            children: "Operational",
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                (0, jsx_runtime_1.jsx)(card_1.Card, {
                  className: "flex-1 bg-muted/50",
                  children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                    className: "p-4 flex items-center gap-3",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Server, {
                        className: "h-8 w-8 text-primary",
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        children: [
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "text-sm font-medium",
                            children: "Services",
                          }),
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "text-xs text-muted-foreground",
                            children: "Operational",
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(SystemHealthTabs_1.default, {
        activeTab: activeTab,
        onTabChange: handleTabChange,
        services: services,
        systemHealth: systemHealth,
      }),
    ],
  });
}
