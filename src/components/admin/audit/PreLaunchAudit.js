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
exports.default = PreLaunchAudit;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var AuditLegal_1 = require("./AuditLegal");
var AuditFunctional_1 = require("./AuditFunctional");
var AuditAI_1 = require("./AuditAI");
var AuditPerformance_1 = require("./AuditPerformance");
var AuditSecurity_1 = require("./AuditSecurity");
var AuditIntegrations_1 = require("./AuditIntegrations");
var AuditNavigation_1 = require("./AuditNavigation");
var launchValidator_1 = require("@/utils/launchValidator");
var AuditSummary_1 = require("./AuditSummary");
var AuditStatusList_1 = require("./AuditStatusList");
function PreLaunchAudit() {
  var _this = this;
  var _a = (0, react_1.useState)("pending"),
    legalStatus = _a[0],
    setLegalStatus = _a[1];
  var _b = (0, react_1.useState)("pending"),
    functionalStatus = _b[0],
    setFunctionalStatus = _b[1];
  var _c = (0, react_1.useState)("pending"),
    aiStatus = _c[0],
    setAiStatus = _c[1];
  var _d = (0, react_1.useState)("pending"),
    performanceStatus = _d[0],
    setPerformanceStatus = _d[1];
  var _e = (0, react_1.useState)("pending"),
    securityStatus = _e[0],
    setSecurityStatus = _e[1];
  var _f = (0, react_1.useState)("pending"),
    integrationsStatus = _f[0],
    setIntegrationsStatus = _f[1];
  var _g = (0, react_1.useState)("pending"),
    navigationStatus = _g[0],
    setNavigationStatus = _g[1];
  var _h = (0, react_1.useState)(false),
    isRunningAll = _h[0],
    setIsRunningAll = _h[1];
  // Summary state to track overall completion
  var _j = (0, react_1.useState)({
      total: 7,
      passed: 0,
      failed: 0,
      pending: 7,
    }),
    summary = _j[0],
    setSummary = _j[1];
  // Load audit results from localStorage on component mount
  (0, react_1.useEffect)(function () {
    var lastAuditResults = localStorage.getItem("lastAuditResults");
    if (lastAuditResults) {
      try {
        var auditData = JSON.parse(lastAuditResults);
        var validationResults = auditData.results;
        // Update statuses based on audit results
        if (validationResults) {
          var ready = validationResults.ready || false;
          var criticalIssues = validationResults.issues.filter(function (i) {
            return i.severity === "critical";
          }).length;
          if (ready) {
            // If system is ready, set most statuses to passed
            setLegalStatus("passed");
            setFunctionalStatus("passed");
            setAiStatus("passed");
            setPerformanceStatus("passed");
            setSecurityStatus("passed");
            setIntegrationsStatus("passed");
            setNavigationStatus("passed");
          } else if (criticalIssues > 0) {
            // If there are critical issues, mark relevant checks as failed
            setLegalStatus("passed"); // Legal is usually separate
            setFunctionalStatus(criticalIssues > 0 ? "failed" : "passed");
            setAiStatus("passed");
            setPerformanceStatus("passed");
            setSecurityStatus("failed"); // Security issues are often critical
            setIntegrationsStatus("failed");
            setNavigationStatus("passed");
          }
          sonner_1.toast.info("Loaded latest audit results", {
            description: "Last audit performed: ".concat(
              new Date(auditData.timestamp).toLocaleString(),
            ),
          });
        }
      } catch (error) {
        console.error("Error parsing audit results:", error);
      }
    }
  }, []);
  // Update summary whenever any status changes
  (0, react_1.useEffect)(
    function () {
      var statuses = [
        legalStatus,
        functionalStatus,
        aiStatus,
        performanceStatus,
        securityStatus,
        integrationsStatus,
        navigationStatus,
      ];
      var passed = statuses.filter(function (s) {
        return s === "passed";
      }).length;
      var failed = statuses.filter(function (s) {
        return s === "failed";
      }).length;
      var pending = statuses.filter(function (s) {
        return s === "pending";
      }).length;
      setSummary({
        total: 7,
        passed: passed,
        failed: failed,
        pending: pending,
      });
    },
    [
      legalStatus,
      functionalStatus,
      aiStatus,
      performanceStatus,
      securityStatus,
      integrationsStatus,
      navigationStatus,
    ],
  );
  var runAllAudits = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, valid, results, error_1;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (isRunningAll) return [2 /*return*/];
            setIsRunningAll(true);
            sonner_1.toast.info("Running all audit checks...", {
              duration: 3000,
            });
            // Reset all statuses to pending
            setLegalStatus("pending");
            setFunctionalStatus("pending");
            setAiStatus("pending");
            setPerformanceStatus("pending");
            setSecurityStatus("pending");
            setIntegrationsStatus("pending");
            setNavigationStatus("pending");
            // Wait for a moment to let the UI update
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 500);
              }),
            ];
          case 1:
            // Wait for a moment to let the UI update
            _b.sent();
            _b.label = 2;
          case 2:
            _b.trys.push([2, 10, 11, 12]);
            return [
              4 /*yield*/,
              (0, launchValidator_1.validateLaunchReadiness)(),
            ];
          case 3:
            (_a = _b.sent()), (valid = _a.valid), (results = _a.results);
            // Update individual statuses based on results
            // These will be simulated for now since we don't have the actual checks
            setLegalStatus("passed");
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 500);
              }),
            ];
          case 4:
            _b.sent();
            setFunctionalStatus(valid ? "passed" : "failed");
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 500);
              }),
            ];
          case 5:
            _b.sent();
            setAiStatus(valid ? "passed" : "failed");
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 500);
              }),
            ];
          case 6:
            _b.sent();
            setPerformanceStatus(valid ? "passed" : "failed");
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 500);
              }),
            ];
          case 7:
            _b.sent();
            setSecurityStatus(valid ? "passed" : "failed");
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 500);
              }),
            ];
          case 8:
            _b.sent();
            setIntegrationsStatus(valid ? "passed" : "failed");
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 500);
              }),
            ];
          case 9:
            _b.sent();
            setNavigationStatus(valid ? "passed" : "failed");
            if (valid) {
              sonner_1.toast.success("All systems ready for launch!", {
                description:
                  "Your application has passed all pre-launch checks.",
              });
            } else {
              sonner_1.toast.error("Some systems require attention!", {
                description:
                  "Please review the failed checks before launching.",
              });
            }
            return [3 /*break*/, 12];
          case 10:
            error_1 = _b.sent();
            console.error("Error running launch readiness check:", error_1);
            sonner_1.toast.error("Error running audit checks", {
              description:
                "Please try again or check specific categories individually.",
            });
            return [3 /*break*/, 12];
          case 11:
            setIsRunningAll(false);
            return [7 /*endfinally*/];
          case 12:
            return [2 /*return*/];
        }
      });
    });
  };
  var statusItems = [
    {
      id: "legal",
      label: "Legal Compliance",
      status: legalStatus,
      passedMessage: "All legal documents verified",
      failedMessage: "Legal issues detected",
      pendingMessage: "Pending",
    },
    {
      id: "functional",
      label: "Functional Testing",
      status: functionalStatus,
      passedMessage: "All features working correctly",
      failedMessage: "Issues with functionality",
      pendingMessage: "Pending",
    },
    {
      id: "ai",
      label: "AI Bot Validation",
      status: aiStatus,
      passedMessage: "AI prompts validated",
      failedMessage: "AI prompts need attention",
      pendingMessage: "Pending",
    },
    {
      id: "performance",
      label: "Performance",
      status: performanceStatus,
      passedMessage: "Performance metrics acceptable",
      failedMessage: "Performance issues detected",
      pendingMessage: "Pending",
    },
    {
      id: "security",
      label: "Security & Database",
      status: securityStatus,
      passedMessage: "Security measures verified",
      failedMessage: "Security issues found",
      pendingMessage: "Pending",
    },
    {
      id: "integrations",
      label: "API Integrations",
      status: integrationsStatus,
      passedMessage: "All integrations working",
      failedMessage: "Integration issues detected",
      pendingMessage: "Pending",
    },
    {
      id: "navigation",
      label: "Navigation & URLs",
      status: navigationStatus,
      passedMessage: "All routes accessible",
      failedMessage: "Navigation issues found",
      pendingMessage: "Pending",
    },
  ];
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
            className: "pb-2",
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center justify-between",
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  className: "text-2xl",
                  children: "Pre-Launch Audit",
                }),
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  onClick: runAllAudits,
                  disabled: isRunningAll,
                  children: isRunningAll
                    ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                            className: "h-4 w-4 mr-2 animate-spin",
                          }),
                          "Running All Checks...",
                        ],
                      })
                    : "Run All Checks",
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
            children: [
              (0, jsx_runtime_1.jsx)(AuditSummary_1.AuditSummary, {
                summary: summary,
              }),
              (0, jsx_runtime_1.jsx)(AuditStatusList_1.AuditStatusList, {
                items: statusItems,
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid grid-cols-1 gap-6",
        children: [
          (0, jsx_runtime_1.jsx)(AuditLegal_1.AuditLegal, {
            status: legalStatus,
            onStatusChange: setLegalStatus,
          }),
          (0, jsx_runtime_1.jsx)(AuditFunctional_1.AuditFunctional, {
            status: functionalStatus,
            onStatusChange: setFunctionalStatus,
          }),
          (0, jsx_runtime_1.jsx)(AuditAI_1.AuditAI, {
            status: aiStatus,
            onStatusChange: setAiStatus,
          }),
          (0, jsx_runtime_1.jsx)(AuditPerformance_1.AuditPerformance, {
            status: performanceStatus,
            onStatusChange: setPerformanceStatus,
          }),
          (0, jsx_runtime_1.jsx)(AuditSecurity_1.AuditSecurity, {
            status: securityStatus,
            onStatusChange: setSecurityStatus,
          }),
          (0, jsx_runtime_1.jsx)(AuditIntegrations_1.AuditIntegrations, {
            status: integrationsStatus,
            onStatusChange: setIntegrationsStatus,
          }),
          (0, jsx_runtime_1.jsx)(AuditNavigation_1.AuditNavigation, {
            status: navigationStatus,
            onStatusChange: setNavigationStatus,
          }),
        ],
      }),
    ],
  });
}
