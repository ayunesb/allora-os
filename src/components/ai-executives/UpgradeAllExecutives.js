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
exports.UpgradeAllExecutives = UpgradeAllExecutives;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var progress_1 = require("@/components/ui/progress");
var integrationService_1 = require("@/utils/executive-os/integrationService");
var executiveBots_1 = require("@/backend/executiveBots");
var lucide_react_1 = require("lucide-react");
var botRoleUtils_1 = require("@/utils/consultation/botRoleUtils");
var sonner_1 = require("sonner");
function UpgradeAllExecutives(_a) {
  var _this = this;
  var onUpgradeComplete = _a.onUpgradeComplete;
  var _b = (0, react_1.useState)(false),
    isLoading = _b[0],
    setIsLoading = _b[1];
  var _c = (0, react_1.useState)(0),
    progress = _c[0],
    setProgress = _c[1];
  var _d = (0, react_1.useState)(0),
    upgradedCount = _d[0],
    setUpgradedCount = _d[1];
  var _e = (0, react_1.useState)(0),
    failedCount = _e[0],
    setFailedCount = _e[1];
  var _f = (0, react_1.useState)(false),
    isComplete = _f[0],
    setIsComplete = _f[1];
  // Format executives for upgrade
  var getAllExecutives = function () {
    var executives = [];
    for (
      var _i = 0, _a = Object.entries(executiveBots_1.executiveBots);
      _i < _a.length;
      _i++
    ) {
      var _b = _a[_i],
        role = _b[0],
        names = _b[1];
      for (var _c = 0, names_1 = names; _c < names_1.length; _c++) {
        var name_1 = names_1[_c];
        executives.push({
          name: name_1,
          role: (0, botRoleUtils_1.formatRoleTitle)(role),
        });
      }
    }
    return executives;
  };
  var handleUpgradeAll = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var executives, totalExecutives_1, progressInterval_1, result, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setIsLoading(true);
            setProgress(0);
            setUpgradedCount(0);
            setFailedCount(0);
            setIsComplete(false);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            executives = getAllExecutives();
            totalExecutives_1 = executives.length;
            progressInterval_1 = setInterval(function () {
              setProgress(function (prev) {
                if (prev >= 95) {
                  clearInterval(progressInterval_1);
                  return 95;
                }
                return prev + 85 / totalExecutives_1;
              });
            }, 800);
            return [
              4 /*yield*/,
              (0, integrationService_1.upgradeAllExecutiveBots)(executives),
            ];
          case 2:
            result = _a.sent();
            clearInterval(progressInterval_1);
            setProgress(100);
            setUpgradedCount(result.success);
            setFailedCount(result.failed);
            setIsComplete(true);
            if (onUpgradeComplete && result.upgraded.length > 0) {
              onUpgradeComplete(result.upgraded);
            }
            sonner_1.toast.success(
              "Upgraded ".concat(result.success, " executives"),
              {
                description:
                  result.failed > 0
                    ? "".concat(
                        result.failed,
                        " executives could not be upgraded",
                      )
                    : "All executives successfully integrated with Executive OS",
              },
            );
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            console.error("Error upgrading all bots:", error_1);
            sonner_1.toast.error("Upgrade process failed", {
              description:
                "An unexpected error occurred during the upgrade process.",
            });
            setProgress(0);
            setIsComplete(true);
            return [3 /*break*/, 5];
          case 4:
            setIsLoading(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  var resetUpgrade = function () {
    setProgress(0);
    setUpgradedCount(0);
    setFailedCount(0);
    setIsComplete(false);
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "border border-primary/20 shadow-sm",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className: "pb-2",
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            className: "text-lg font-medium",
            children: "Executive OS Integration",
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children:
              "Upgrade all AI executives with enhanced cognitive capabilities",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        className: "pb-2",
        children: isComplete
          ? (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-4",
              children: [
                (0, jsx_runtime_1.jsx)("div", {
                  className: "flex justify-center",
                  children:
                    failedCount === 0
                      ? (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex items-center gap-2 text-primary",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
                              className: "h-8 w-8",
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              className: "text-xl font-medium",
                              children: "Complete",
                            }),
                          ],
                        })
                      : (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex items-center gap-2 text-amber-500",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
                              className: "h-8 w-8",
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              className: "text-xl font-medium",
                              children: "Partially Complete",
                            }),
                          ],
                        }),
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "grid grid-cols-2 gap-4 text-center",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "text-2xl font-bold text-primary",
                          children: upgradedCount,
                        }),
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "text-sm text-muted-foreground",
                          children: "Upgraded",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "text-2xl font-bold text-red-500",
                          children: failedCount,
                        }),
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "text-sm text-muted-foreground",
                          children: "Failed",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)("div", {
                  className: "text-sm text-muted-foreground",
                  children: (0, jsx_runtime_1.jsx)("p", {
                    children:
                      "All upgraded executives now have Enhanced Executive OS capabilities including First Principles Thinking, OODA Loop, and Decision Frameworks.",
                  }),
                }),
              ],
            })
          : (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-4",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-2",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex justify-between text-sm mb-1",
                      children: [
                        (0, jsx_runtime_1.jsx)("span", {
                          children: "Integration Progress",
                        }),
                        (0, jsx_runtime_1.jsxs)("span", {
                          children: [Math.round(progress), "%"],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                      value: progress,
                      className: "h-2",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-1 text-sm",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex justify-between",
                      children: [
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "text-muted-foreground",
                          children: "Thinking Models",
                        }),
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "font-medium",
                          children: "First Principles, OODA Loop",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex justify-between",
                      children: [
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "text-muted-foreground",
                          children: "Decision Framework",
                        }),
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "font-medium",
                          children: "3x3 Priorities, Eisenhower Matrix",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex justify-between",
                      children: [
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "text-muted-foreground",
                          children: "Delegation System",
                        }),
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "font-medium",
                          children: "5 Levels (Default: Level 3)",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex justify-between",
                      children: [
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "text-muted-foreground",
                          children: "Mental Models",
                        }),
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "font-medium",
                          children: "Custom Per Executive",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
        className: "pt-2",
        children: isComplete
          ? (0, jsx_runtime_1.jsx)(button_1.Button, {
              className: "w-full",
              variant: "outline",
              onClick: resetUpgrade,
              children: "Reset",
            })
          : (0, jsx_runtime_1.jsx)(button_1.Button, {
              className: "w-full",
              variant: "default",
              disabled: isLoading,
              onClick: handleUpgradeAll,
              children: isLoading
                ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowUpCircle, {
                        className: "mr-2 h-4 w-4 animate-spin",
                      }),
                      "Upgrading All Executives...",
                    ],
                  })
                : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowUpCircle, {
                        className: "mr-2 h-4 w-4",
                      }),
                      "Upgrade All Executives",
                    ],
                  }),
            }),
      }),
    ],
  });
}
