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
exports.SystemHealthCheck = SystemHealthCheck;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var monitoring_1 = require("@/utils/monitoring"); // Ensure this utility exists
var separator_1 = require("@/components/ui/separator");
var sonner_1 = require("sonner");
function SystemHealthCheck() {
  var _this = this;
  var _a = (0, react_1.useState)(null),
    healthCheck = _a[0],
    setHealthCheck = _a[1];
  var _b = (0, react_1.useState)(false),
    loading = _b[0],
    setLoading = _b[1];
  var _c = (0, react_1.useState)(null),
    lastChecked = _c[0],
    setLastChecked = _c[1];
  (0, react_1.useEffect)(function () {
    // Run initial health check when component mounts
    runHealthCheck();
  }, []);
  var runHealthCheck = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var result, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setLoading(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [4 /*yield*/, (0, monitoring_1.checkSystemHealth)()];
          case 2:
            result = _a.sent();
            setHealthCheck(result);
            setLastChecked(new Date());
            // Provide toast notification based on system status
            if (result.status === "unhealthy") {
              sonner_1.toast.error(
                "System health issues detected. Please review.",
              );
            } else if (result.status === "degraded") {
              sonner_1.toast.warning(
                "Some system services are experiencing issues.",
              );
            } else {
              sonner_1.toast.success(
                "System is up to date and running smoothly.",
              );
            }
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            console.error("Health check failed:", error_1);
            sonner_1.toast.error("Failed to perform system health check.");
            return [3 /*break*/, 5];
          case 4:
            setLoading(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  var getStatusIcon = function (status) {
    switch (status) {
      case "healthy":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.CircleCheck, {
          className: "h-5 w-5 text-green-500",
        });
      case "degraded":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.CircleAlert, {
          className: "h-5 w-5 text-amber-500",
        });
      case "unhealthy":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.AlertOctagon, {
          className: "h-5 w-5 text-destructive",
        });
    }
  };
  var getStatusBadge = function (status) {
    switch (status) {
      case "healthy":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          className: "bg-green-500",
          children: "Healthy",
        });
      case "degraded":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          className: "bg-amber-500",
          children: "Degraded",
        });
      case "unhealthy":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          variant: "destructive",
          children: "Unhealthy",
        });
    }
  };
  if (!healthCheck) {
    return (0, jsx_runtime_1.jsx)(card_1.Card, {
      children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        className: "flex justify-center items-center py-12",
        children: (0, jsx_runtime_1.jsx)("div", {
          className:
            "animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full",
        }),
      }),
    });
  }
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex justify-between items-center",
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: "System Status",
              }),
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                variant: "outline",
                size: "sm",
                onClick: runHealthCheck,
                disabled: loading,
                children: loading ? "Checking..." : "Refresh Status",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children:
              "Real-time monitoring of system services and overall health",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "space-y-4",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center justify-between",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center gap-2",
                  children: [
                    getStatusIcon(healthCheck.status),
                    (0, jsx_runtime_1.jsx)("span", {
                      className: "font-medium",
                      children: "Overall Status:",
                    }),
                    getStatusBadge(healthCheck.status),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className:
                    "text-sm text-muted-foreground flex items-center gap-1",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, {
                      className: "h-4 w-4",
                    }),
                    (0, jsx_runtime_1.jsxs)("span", {
                      children: [
                        "Last checked: ",
                        lastChecked
                          ? lastChecked.toLocaleTimeString()
                          : "Never",
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(separator_1.Separator, {}),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-3",
              children: [
                (0, jsx_runtime_1.jsx)("h4", {
                  className: "font-medium text-sm",
                  children: "Service Status",
                }),
                (0, jsx_runtime_1.jsx)("div", {
                  className: "grid gap-2",
                  children: Object.entries(healthCheck.services).map(
                    function (_a) {
                      var serviceName = _a[0],
                        serviceHealth = _a[1];
                      return (0, jsx_runtime_1.jsxs)(
                        "div",
                        {
                          className: "flex items-center justify-between py-1",
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex items-center gap-2",
                              children: [
                                getStatusIcon(serviceHealth.status),
                                (0, jsx_runtime_1.jsx)("span", {
                                  className: "capitalize",
                                  children: serviceName,
                                }),
                              ],
                            }),
                            getStatusBadge(serviceHealth.status),
                          ],
                        },
                        serviceName,
                      );
                    },
                  ),
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
