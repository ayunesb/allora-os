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
exports.default = LaunchReadinessCheck;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var alert_1 = require("@/components/ui/alert");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
var launchReadiness_1 = require("@/utils/launchReadiness");
var sonner_1 = require("sonner");
function LaunchReadinessCheck() {
  var _a = (0, react_1.useState)(null),
    readinessStatus = _a[0],
    setReadinessStatus = _a[1];
  var _b = (0, react_1.useState)(false),
    isChecking = _b[0],
    setIsChecking = _b[1];
  (0, react_1.useEffect)(function () {
    performReadinessCheck();
  }, []);
  function performReadinessCheck() {
    return __awaiter(this, void 0, void 0, function () {
      var status_1, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setIsChecking(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [4 /*yield*/, (0, launchReadiness_1.checkLaunchReadiness)()];
          case 2:
            status_1 = _a.sent();
            setReadinessStatus(status_1);
            // Show toast with overall status
            if (status_1.overallStatus === "ready") {
              sonner_1.toast.success("All systems ready for launch!");
            } else if (status_1.overallStatus === "warning") {
              sonner_1.toast.warning(
                "System can be launched with some warnings",
              );
            } else {
              sonner_1.toast.error("System is not ready for launch");
            }
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            console.error("Error performing readiness check:", error_1);
            sonner_1.toast.error("Failed to complete readiness check");
            return [3 /*break*/, 5];
          case 4:
            setIsChecking(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  }
  function getApiStatusBadge(status) {
    switch (status) {
      case "connected":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          className: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
          children: "Connected",
        });
      case "error":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          variant: "destructive",
          children: "Error",
        });
      case "not_configured":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          variant: "outline",
          className: "text-muted-foreground",
          children: "Not Configured",
        });
      default:
        return null;
    }
  }
  function getStatusIcon(status) {
    if (
      status === true ||
      status === "ready" ||
      status === "connected" ||
      status === "high"
    ) {
      return (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
        className: "h-4 w-4 text-green-500",
      });
    } else if (status === "warning" || status === "medium") {
      return (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
        className: "h-4 w-4 text-yellow-500",
      });
    } else {
      return (0, jsx_runtime_1.jsx)(lucide_react_1.X, {
        className: "h-4 w-4 text-red-500",
      });
    }
  }
  if (!readinessStatus) {
    return (0, jsx_runtime_1.jsxs)(card_1.Card, {
      children: [
        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              children: "Launch Readiness Check",
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
              children: "Checking system readiness...",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
          className: "flex justify-center py-6",
          children: (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
            className: "h-8 w-8 animate-spin text-primary/70",
          }),
        }),
      ],
    });
  }
  var overallStatusClasses =
    readinessStatus.overallStatus === "ready"
      ? "bg-green-500/10 text-green-500 border-green-200"
      : readinessStatus.overallStatus === "warning"
        ? "bg-yellow-500/10 text-yellow-600 border-yellow-200"
        : "bg-red-500/10 text-red-600 border-red-200";
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "relative overflow-hidden border-primary/10",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center justify-between",
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                className: "text-xl md:text-2xl",
                children: "Launch Readiness Check",
              }),
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "secondary",
                size: "sm",
                onClick: performReadinessCheck,
                disabled: isChecking,
                className: "h-8 gap-1",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                    className: "h-3.5 w-3.5 ".concat(
                      isChecking ? "animate-spin" : "",
                    ),
                  }),
                  "Refresh",
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: "System readiness check for production launch",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className: "space-y-6",
        children: [
          (0, jsx_runtime_1.jsxs)(alert_1.Alert, {
            variant: "default",
            className: "".concat(overallStatusClasses, " border"),
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [
                  readinessStatus.overallStatus === "ready"
                    ? (0, jsx_runtime_1.jsx)(lucide_react_1.ShieldCheck, {
                        className: "h-5 w-5",
                      })
                    : readinessStatus.overallStatus === "warning"
                      ? (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
                          className: "h-5 w-5",
                        })
                      : (0, jsx_runtime_1.jsx)(lucide_react_1.X, {
                          className: "h-5 w-5",
                        }),
                  (0, jsx_runtime_1.jsx)(alert_1.AlertTitle, {
                    className: "font-medium",
                    children:
                      readinessStatus.overallStatus === "ready"
                        ? "Ready for Launch"
                        : readinessStatus.overallStatus === "warning"
                          ? "Launch with Caution"
                          : "Not Ready for Launch",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, {
                className: "mt-2 text-sm",
                children:
                  readinessStatus.overallStatus === "ready"
                    ? "All systems have been checked and are ready for production deployment."
                    : readinessStatus.overallStatus === "warning"
                      ? "System can be launched but some non-critical items need attention."
                      : "The system is not ready for launch. Please address the issues highlighted below.",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "text-lg font-medium mb-3",
                children: "API Connections",
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className:
                  "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className:
                      "bg-card border border-border rounded-lg p-3 flex justify-between items-center",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                          (0, jsx_runtime_1.jsx)("div", {
                            className:
                              "h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center",
                            children: (0, jsx_runtime_1.jsx)(
                              lucide_react_1.ShieldCheck,
                              { className: "h-4 w-4 text-primary" },
                            ),
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            children: [
                              (0, jsx_runtime_1.jsx)("div", {
                                className: "font-medium text-sm",
                                children: "Stripe",
                              }),
                              (0, jsx_runtime_1.jsx)("div", {
                                className: "text-xs text-muted-foreground",
                                children: "Payments & Billing",
                              }),
                            ],
                          }),
                        ],
                      }),
                      getApiStatusBadge(readinessStatus.apis.stripe),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className:
                      "bg-card border border-border rounded-lg p-3 flex justify-between items-center",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                          (0, jsx_runtime_1.jsx)("div", {
                            className:
                              "h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center",
                            children: (0, jsx_runtime_1.jsx)(
                              lucide_react_1.ShieldCheck,
                              { className: "h-4 w-4 text-primary" },
                            ),
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            children: [
                              (0, jsx_runtime_1.jsx)("div", {
                                className: "font-medium text-sm",
                                children: "Postmark",
                              }),
                              (0, jsx_runtime_1.jsx)("div", {
                                className: "text-xs text-muted-foreground",
                                children: "Email Delivery",
                              }),
                            ],
                          }),
                        ],
                      }),
                      getApiStatusBadge(readinessStatus.apis.postmark),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className:
                      "bg-card border border-border rounded-lg p-3 flex justify-between items-center",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                          (0, jsx_runtime_1.jsx)("div", {
                            className:
                              "h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center",
                            children: (0, jsx_runtime_1.jsx)(
                              lucide_react_1.ShieldCheck,
                              { className: "h-4 w-4 text-primary" },
                            ),
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            children: [
                              (0, jsx_runtime_1.jsx)("div", {
                                className: "font-medium text-sm",
                                children: "Twilio",
                              }),
                              (0, jsx_runtime_1.jsx)("div", {
                                className: "text-xs text-muted-foreground",
                                children: "WhatsApp & SMS",
                              }),
                            ],
                          }),
                        ],
                      }),
                      getApiStatusBadge(readinessStatus.apis.twilio),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className:
                      "bg-card border border-border rounded-lg p-3 flex justify-between items-center",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                          (0, jsx_runtime_1.jsx)("div", {
                            className:
                              "h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center",
                            children: (0, jsx_runtime_1.jsx)(
                              lucide_react_1.ShieldCheck,
                              { className: "h-4 w-4 text-primary" },
                            ),
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            children: [
                              (0, jsx_runtime_1.jsx)("div", {
                                className: "font-medium text-sm",
                                children: "Heygen",
                              }),
                              (0, jsx_runtime_1.jsx)("div", {
                                className: "text-xs text-muted-foreground",
                                children: "Video Generation",
                              }),
                            ],
                          }),
                        ],
                      }),
                      getApiStatusBadge(readinessStatus.apis.heygen),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className:
                      "bg-card border border-border rounded-lg p-3 flex justify-between items-center",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                          (0, jsx_runtime_1.jsx)("div", {
                            className:
                              "h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center",
                            children: (0, jsx_runtime_1.jsx)(
                              lucide_react_1.ShieldCheck,
                              { className: "h-4 w-4 text-primary" },
                            ),
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            children: [
                              (0, jsx_runtime_1.jsx)("div", {
                                className: "font-medium text-sm",
                                children: "OpenAI",
                              }),
                              (0, jsx_runtime_1.jsx)("div", {
                                className: "text-xs text-muted-foreground",
                                children: "AI & Content",
                              }),
                            ],
                          }),
                        ],
                      }),
                      getApiStatusBadge(readinessStatus.apis.openai),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-6",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                children: [
                  (0, jsx_runtime_1.jsx)("h3", {
                    className: "text-lg font-medium mb-3",
                    children: "Database & Data",
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className:
                      "space-y-2 bg-secondary/20 p-4 rounded-lg border border-border",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center justify-between",
                        children: [
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "text-sm font-medium",
                            children: "Database Status",
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex items-center gap-1",
                            children: [
                              getStatusIcon(readinessStatus.database.status),
                              (0, jsx_runtime_1.jsx)("span", {
                                className: "text-sm",
                                children:
                                  readinessStatus.database.status === "ready"
                                    ? "Ready"
                                    : "Error",
                              }),
                            ],
                          }),
                        ],
                      }),
                      readinessStatus.database.message &&
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "text-xs text-muted-foreground",
                          children: readinessStatus.database.message,
                        }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                children: [
                  (0, jsx_runtime_1.jsx)("h3", {
                    className: "text-lg font-medium mb-3",
                    children: "Compliance",
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className:
                      "space-y-2 bg-secondary/20 p-4 rounded-lg border border-border",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center justify-between",
                        children: [
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "text-sm font-medium",
                            children: "WhatsApp Opt-In/Out",
                          }),
                          (0, jsx_runtime_1.jsx)("div", {
                            children: getStatusIcon(
                              readinessStatus.compliance.whatsappOptIn,
                            ),
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center justify-between",
                        children: [
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "text-sm font-medium",
                            children: "Email Unsubscribe",
                          }),
                          (0, jsx_runtime_1.jsx)("div", {
                            children: getStatusIcon(
                              readinessStatus.compliance.emailUnsubscribe,
                            ),
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center justify-between",
                        children: [
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "text-sm font-medium",
                            children: "Billing Compliance",
                          }),
                          (0, jsx_runtime_1.jsx)("div", {
                            children: getStatusIcon(
                              readinessStatus.compliance.billingCompliance,
                            ),
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center justify-between",
                        children: [
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "text-sm font-medium",
                            children: "API Security Level",
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex items-center gap-1",
                            children: [
                              getStatusIcon(
                                readinessStatus.compliance.apiSecurityLevel,
                              ),
                              (0, jsx_runtime_1.jsx)("span", {
                                className: "text-sm capitalize",
                                children:
                                  readinessStatus.compliance.apiSecurityLevel,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "text-lg font-medium mb-3",
                children: "Features Status",
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className:
                  "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className:
                      "bg-secondary/20 rounded-lg border border-border p-3",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center justify-between mb-1",
                        children: [
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "text-sm font-medium",
                            children: "Authentication",
                          }),
                          (0, jsx_runtime_1.jsx)("div", {
                            children: getStatusIcon(
                              readinessStatus.features.authentication,
                            ),
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "text-xs text-muted-foreground",
                        children: "User login & registration",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className:
                      "bg-secondary/20 rounded-lg border border-border p-3",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center justify-between mb-1",
                        children: [
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "text-sm font-medium",
                            children: "Onboarding",
                          }),
                          (0, jsx_runtime_1.jsx)("div", {
                            children: getStatusIcon(
                              readinessStatus.features.onboarding,
                            ),
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "text-xs text-muted-foreground",
                        children: "User setup process",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className:
                      "bg-secondary/20 rounded-lg border border-border p-3",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center justify-between mb-1",
                        children: [
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "text-sm font-medium",
                            children: "Strategies",
                          }),
                          (0, jsx_runtime_1.jsx)("div", {
                            children: getStatusIcon(
                              readinessStatus.features.strategies,
                            ),
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "text-xs text-muted-foreground",
                        children: "Business strategies",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className:
                      "bg-secondary/20 rounded-lg border border-border p-3",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center justify-between mb-1",
                        children: [
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "text-sm font-medium",
                            children: "Campaigns",
                          }),
                          (0, jsx_runtime_1.jsx)("div", {
                            children: getStatusIcon(
                              readinessStatus.features.campaigns,
                            ),
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "text-xs text-muted-foreground",
                        children: "Marketing campaigns",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className:
                      "bg-secondary/20 rounded-lg border border-border p-3",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center justify-between mb-1",
                        children: [
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "text-sm font-medium",
                            children: "AI Debate",
                          }),
                          (0, jsx_runtime_1.jsx)("div", {
                            children: getStatusIcon(
                              readinessStatus.features.aiDebate,
                            ),
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "text-xs text-muted-foreground",
                        children: "Executive debate feature",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className:
                      "bg-secondary/20 rounded-lg border border-border p-3",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center justify-between mb-1",
                        children: [
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "text-sm font-medium",
                            children: "Welcome Video",
                          }),
                          (0, jsx_runtime_1.jsx)("div", {
                            children: getStatusIcon(
                              readinessStatus.features.welcomeVideo,
                            ),
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "text-xs text-muted-foreground",
                        children: "Personalized video",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className:
                      "bg-secondary/20 rounded-lg border border-border p-3",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center justify-between mb-1",
                        children: [
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "text-sm font-medium",
                            children: "Billing",
                          }),
                          (0, jsx_runtime_1.jsx)("div", {
                            children: getStatusIcon(
                              readinessStatus.features.billing,
                            ),
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "text-xs text-muted-foreground",
                        children: "Subscription management",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
        className:
          "flex flex-col sm:flex-row justify-between gap-4 border-t pt-6",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "text-sm text-muted-foreground",
            children: ["Last checked: ", new Date().toLocaleString()],
          }),
          readinessStatus.overallStatus === "ready" &&
            (0, jsx_runtime_1.jsxs)(button_1.Button, {
              className: "w-full sm:w-auto gap-2",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.ExternalLink, {
                  className: "h-4 w-4",
                }),
                "Launch to Production",
              ],
            }),
          readinessStatus.overallStatus === "warning" &&
            (0, jsx_runtime_1.jsxs)(button_1.Button, {
              variant: "secondary",
              className: "w-full sm:w-auto gap-2",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
                  className: "h-4 w-4",
                }),
                "Launch with Warnings",
              ],
            }),
          readinessStatus.overallStatus === "not_ready" &&
            (0, jsx_runtime_1.jsxs)(button_1.Button, {
              variant: "secondary",
              className: "w-full sm:w-auto gap-2",
              disabled: true,
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.X, {
                  className: "h-4 w-4",
                }),
                "Fix Issues to Launch",
              ],
            }),
        ],
      }),
    ],
  });
}
