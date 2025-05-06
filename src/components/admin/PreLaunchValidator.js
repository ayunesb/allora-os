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
exports.default = PreLaunchValidator;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var alert_1 = require("@/components/ui/alert");
var lucide_react_1 = require("lucide-react");
var launchValidator_1 = require("@/utils/launchValidator");
var sonner_1 = require("sonner");
function PreLaunchValidator() {
  var _this = this;
  var _a = (0, react_1.useState)(false),
    isValidating = _a[0],
    setIsValidating = _a[1];
  var _b = (0, react_1.useState)(null),
    validationResult = _b[0],
    setValidationResult = _b[1];
  var runValidation = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var result, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setIsValidating(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              (0, launchValidator_1.validateProductionReadiness)(),
            ];
          case 2:
            result = _a.sent();
            setValidationResult(result);
            if (result.ready) {
              sonner_1.toast.success(
                "All production readiness checks passed! 🚀",
              );
            } else {
              sonner_1.toast.error(
                "".concat(
                  result.issues.length,
                  " issues found that need to be fixed before going live",
                ),
              );
            }
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            console.error("Validation error:", error_1);
            sonner_1.toast.error("Failed to complete readiness validation");
            return [3 /*break*/, 5];
          case 4:
            setIsValidating(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            children: "Production Readiness Validator",
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: "Verify that your application is ready for production",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: validationResult
          ? (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-4",
              children: [
                (0, jsx_runtime_1.jsx)("div", {
                  className: "p-4 rounded-lg border ".concat(
                    validationResult.ready
                      ? "bg-green-50 border-green-200"
                      : "bg-amber-50 border-amber-200",
                  ),
                  children: validationResult.ready
                    ? (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-start gap-3",
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
                            className: "h-5 w-5 text-green-500 mt-0.5",
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            children: [
                              (0, jsx_runtime_1.jsx)("h3", {
                                className: "font-medium text-green-800",
                                children: "Ready for Production!",
                              }),
                              (0, jsx_runtime_1.jsx)("p", {
                                className: "text-sm text-green-700",
                                children:
                                  "All validation checks have passed. Your application is ready to go live.",
                              }),
                            ],
                          }),
                        ],
                      })
                    : (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-start gap-3",
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
                            className: "h-5 w-5 text-amber-500 mt-0.5",
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            children: [
                              (0, jsx_runtime_1.jsx)("h3", {
                                className: "font-medium text-amber-800",
                                children: "Not Ready for Production",
                              }),
                              (0, jsx_runtime_1.jsxs)("p", {
                                className: "text-sm text-amber-700",
                                children: [
                                  validationResult.issues.length,
                                  " issue(s) need to be resolved before going live.",
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                }),
                validationResult.issues.length > 0 &&
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, jsx_runtime_1.jsx)("h3", {
                        className: "font-medium",
                        children: "Issues to Resolve:",
                      }),
                      validationResult.issues.map(function (issue, index) {
                        return (0, jsx_runtime_1.jsxs)(
                          alert_1.Alert,
                          {
                            variant: "destructive",
                            className: "bg-red-50 text-red-800 border-red-200",
                            children: [
                              (0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, {
                                className: "h-4 w-4 text-red-500",
                              }),
                              (0, jsx_runtime_1.jsxs)(alert_1.AlertTitle, {
                                children: ["Issue #", index + 1],
                              }),
                              (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, {
                                children: issue.message,
                              }),
                            ],
                          },
                          index,
                        );
                      }),
                    ],
                  }),
                validationResult.passedChecks.length > 0 &&
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, jsx_runtime_1.jsx)("h3", {
                        className: "font-medium",
                        children: "Passed Checks:",
                      }),
                      validationResult.passedChecks.map(
                        function (check, index) {
                          return (0, jsx_runtime_1.jsxs)(
                            alert_1.Alert,
                            {
                              variant: "default",
                              className:
                                "bg-green-50 text-green-800 border-green-200",
                              children: [
                                (0, jsx_runtime_1.jsx)(
                                  lucide_react_1.CheckCircle,
                                  { className: "h-4 w-4 text-green-500" },
                                ),
                                (0, jsx_runtime_1.jsx)(
                                  alert_1.AlertDescription,
                                  { children: check.message },
                                ),
                              ],
                            },
                            index,
                          );
                        },
                      ),
                    ],
                  }),
              ],
            })
          : (0, jsx_runtime_1.jsx)("div", {
              className: "text-center py-6",
              children: (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground mb-4",
                children:
                  "Run a production readiness check to verify that your application is ready for launch. This will validate authentication, database, security settings, and API connections.",
              }),
            }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
        children: (0, jsx_runtime_1.jsx)(button_1.Button, {
          onClick: runValidation,
          disabled: isValidating,
          className: "w-full",
          children: isValidating
            ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                    className: "mr-2 h-4 w-4 animate-spin",
                  }),
                  "Running Validation...",
                ],
              })
            : "Validate Production Readiness",
        }),
      }),
    ],
  });
}
