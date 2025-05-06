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
exports.default = LaunchCheck;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var tabs_1 = require("@/components/ui/tabs");
var VerificationContent_1 = require("@/components/admin/launch-verification/VerificationContent");
var LaunchInfoBox_1 = require("@/components/admin/launch-verification/LaunchInfoBox");
var LaunchProgress_1 = require("@/components/admin/launch-verification/LaunchProgress");
var useLaunchVerification_1 = require("@/hooks/admin/useLaunchVerification");
var useLaunchProcess_1 = require("@/components/admin/launch-verification/useLaunchProcess");
var sonner_1 = require("sonner");
function LaunchCheck() {
  var _this = this;
  var _a = (0, react_1.useState)("verification"),
    activeTab = _a[0],
    setActiveTab = _a[1];
  var _b = (0, useLaunchVerification_1.useLaunchVerification)(),
    runValidation = _b.runValidation,
    validationResults = _b.validationResults,
    isChecking = _b.isChecking,
    lastCheckTime = _b.lastCheckTime,
    validationStatus = _b.validationStatus;
  var _c = (0, useLaunchProcess_1.useLaunchProcess)(),
    isLaunching = _c.isLaunching,
    launchStep = _c.launchStep,
    isComplete = _c.isComplete,
    launchFirstCustomerFlow = _c.launchFirstCustomerFlow;
  // Fix the missing argument issue
  var handleRunValidation = function () {
    runValidation({ type: "full" });
  };
  var handleLaunch = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var success;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!validationResults || validationStatus !== "passed") {
              sonner_1.toast.error(
                "Cannot launch until all verification checks pass",
              );
              return [2 /*return*/];
            }
            return [4 /*yield*/, launchFirstCustomerFlow()];
          case 1:
            success = _a.sent();
            if (success) {
              sonner_1.toast.success(
                "Launch successful! Your system is now live.",
              );
            } else {
              sonner_1.toast.error(
                "Launch failed. Please check the logs and try again.",
              );
            }
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className:
          "flex flex-col md:flex-row md:justify-between md:items-center gap-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("h1", {
                className: "text-2xl font-bold",
                children: "Launch Verification",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children: "Verify your system is ready for production",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex gap-2",
            children: [
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                variant: "outline",
                onClick: handleRunValidation,
                disabled: isChecking,
                children: "Run Validation",
              }),
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                onClick: handleLaunch,
                disabled: isLaunching || validationStatus !== "passed",
                children: isLaunching ? "Launching..." : "Launch System",
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid grid-cols-1 md:grid-cols-3 gap-6",
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            className: "md:col-span-2",
            children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                  className: "pb-3",
                  children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    children: "System Verification",
                  }),
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  children: (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
                    defaultValue: "verification",
                    value: activeTab,
                    onValueChange: setActiveTab,
                    children: [
                      (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                        className: "mb-4",
                        children: [
                          (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                            value: "verification",
                            children: "Verification",
                          }),
                          (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                            value: "launch",
                            children: "Launch Process",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                        value: "verification",
                        children: (0, jsx_runtime_1.jsx)(
                          VerificationContent_1.VerificationContent,
                          {
                            results: validationResults,
                            isChecking: isChecking,
                          },
                        ),
                      }),
                      (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                        value: "launch",
                        children: (0, jsx_runtime_1.jsx)(
                          LaunchProgress_1.LaunchProgress,
                          {
                            isLaunching: isLaunching,
                            currentStep: launchStep,
                            isComplete: isComplete,
                          },
                        ),
                      }),
                    ],
                  }),
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)("div", {
            children: (0, jsx_runtime_1.jsx)(LaunchInfoBox_1.LaunchInfoBox, {
              lastCheckTime: lastCheckTime,
              status: validationStatus,
              onRunCheck: handleRunValidation,
              isChecking: isChecking,
            }),
          }),
        ],
      }),
    ],
  });
}
