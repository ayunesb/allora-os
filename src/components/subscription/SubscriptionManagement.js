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
exports.default = SubscriptionManagement;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var useSubscription_1 = require("@/hooks/useSubscription");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var alert_dialog_1 = require("@/components/ui/alert-dialog");
function SubscriptionManagement(_a) {
  var _this = this;
  var onUpgradePlan = _a.onUpgradePlan;
  var _b = (0, useSubscription_1.useSubscription)(),
    subscription = _b.subscription,
    isLoading = _b.isLoading,
    isUpdating = _b.isUpdating,
    openCustomerPortal = _b.openCustomerPortal,
    cancelCurrentSubscription = _b.cancelCurrentSubscription,
    reactivateCurrentSubscription = _b.reactivateCurrentSubscription,
    refresh = _b.refresh;
  var _c = (0, react_1.useState)(false),
    showCancelDialog = _c[0],
    setShowCancelDialog = _c[1];
  var formatDate = function (dateString) {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  var handleCancelSubscription = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var success;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, cancelCurrentSubscription()];
          case 1:
            success = _a.sent();
            if (success) {
              setShowCancelDialog(false);
            }
            return [2 /*return*/];
        }
      });
    });
  };
  var handleReactivateSubscription = function () {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, reactivateCurrentSubscription()];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  var handleManageBilling = function () {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, openCustomerPortal()];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  if (isLoading) {
    return (0, jsx_runtime_1.jsxs)(card_1.Card, {
      className: "w-full",
      children: [
        (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
          children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
            className: "flex items-center gap-2",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                className: "h-5 w-5 animate-spin",
              }),
              "Loading Subscription Info",
            ],
          }),
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
          children: (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)("div", {
                className: "h-6 bg-muted rounded-md animate-pulse",
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className: "h-6 bg-muted rounded-md animate-pulse w-3/4",
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className: "h-6 bg-muted rounded-md animate-pulse w-1/2",
              }),
            ],
          }),
        }),
      ],
    });
  }
  if (
    !(subscription === null || subscription === void 0
      ? void 0
      : subscription.isActive)
  ) {
    return (0, jsx_runtime_1.jsxs)(card_1.Card, {
      className: "w-full",
      children: [
        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
          children: [
            (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
              className: "flex items-center gap-2",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
                  className: "h-5 w-5 text-amber-500",
                }),
                "No Active Subscription",
              ],
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
              children: "You currently don't have an active subscription plan.",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
          children: [
            (0, jsx_runtime_1.jsx)("p", {
              className: "text-sm text-muted-foreground mb-4",
              children:
                "Upgrade to a paid plan to access premium features including:",
            }),
            (0, jsx_runtime_1.jsxs)("ul", {
              className: "text-sm space-y-1 list-disc pl-4 mb-4",
              children: [
                (0, jsx_runtime_1.jsx)("li", {
                  children: "Advanced AI strategy recommendations",
                }),
                (0, jsx_runtime_1.jsx)("li", {
                  children: "Campaign automation and management",
                }),
                (0, jsx_runtime_1.jsx)("li", {
                  children: "Lead scoring and nurturing",
                }),
                (0, jsx_runtime_1.jsx)("li", {
                  children: "Integration with marketing platforms",
                }),
              ],
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
          children: (0, jsx_runtime_1.jsx)(button_1.Button, {
            onClick: onUpgradePlan,
            className: "w-full",
            children: "View Pricing Plans",
          }),
        }),
      ],
    });
  }
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        className: "w-full",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                className: "flex items-center gap-2",
                children: [
                  subscription.cancelAtPeriodEnd
                    ? (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
                        className: "h-5 w-5 text-amber-500",
                      })
                    : (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
                        className: "h-5 w-5 text-green-500",
                      }),
                  subscription.cancelAtPeriodEnd
                    ? "Subscription Ending"
                    : "Active Subscription",
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children: subscription.planName || "Premium Plan",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsx)("div", {
              className: "space-y-4",
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "grid grid-cols-2 gap-2 text-sm",
                children: [
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "text-muted-foreground",
                    children: "Status:",
                  }),
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "font-medium",
                    children:
                      subscription.status === "active"
                        ? (0, jsx_runtime_1.jsx)("span", {
                            className: "text-green-600 dark:text-green-400",
                            children: "Active",
                          })
                        : subscription.status === "canceled"
                          ? (0, jsx_runtime_1.jsx)("span", {
                              className: "text-red-600 dark:text-red-400",
                              children: "Canceled",
                            })
                          : subscription.status === "trialing"
                            ? (0, jsx_runtime_1.jsx)("span", {
                                className: "text-blue-600 dark:text-blue-400",
                                children: "Trial",
                              })
                            : subscription.status,
                  }),
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "text-muted-foreground",
                    children: subscription.cancelAtPeriodEnd
                      ? "Ends on:"
                      : "Renews on:",
                  }),
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "font-medium",
                    children: formatDate(subscription.currentPeriodEnd),
                  }),
                  subscription.cancelAtPeriodEnd &&
                    (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                      children: [
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "text-muted-foreground",
                          children: "Status after end date:",
                        }),
                        (0, jsx_runtime_1.jsx)("span", {
                          className:
                            "font-medium text-red-600 dark:text-red-400",
                          children: "Canceled",
                        }),
                      ],
                    }),
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "text-muted-foreground",
                    children: "Subscription started:",
                  }),
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "font-medium",
                    children: formatDate(subscription.createdAt),
                  }),
                ],
              }),
            }),
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
            className:
              "flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0",
            children: [
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "outline",
                className: "w-full sm:w-auto",
                onClick: handleManageBilling,
                disabled: isUpdating,
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.CreditCard, {
                    className: "mr-2 h-4 w-4",
                  }),
                  isUpdating ? "Processing..." : "Manage Billing",
                ],
              }),
              subscription.cancelAtPeriodEnd
                ? (0, jsx_runtime_1.jsxs)(button_1.Button, {
                    className: "w-full sm:w-auto",
                    onClick: handleReactivateSubscription,
                    disabled: isUpdating,
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, {
                        className: "mr-2 h-4 w-4",
                      }),
                      isUpdating ? "Processing..." : "Reactivate Subscription",
                    ],
                  })
                : (0, jsx_runtime_1.jsx)(button_1.Button, {
                    variant: "destructive",
                    className: "w-full sm:w-auto",
                    onClick: function () {
                      return setShowCancelDialog(true);
                    },
                    disabled: isUpdating,
                    children: isUpdating
                      ? "Processing..."
                      : "Cancel Subscription",
                  }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(alert_dialog_1.AlertDialog, {
        open: showCancelDialog,
        onOpenChange: setShowCancelDialog,
        children: (0, jsx_runtime_1.jsxs)(alert_dialog_1.AlertDialogContent, {
          children: [
            (0, jsx_runtime_1.jsxs)(alert_dialog_1.AlertDialogHeader, {
              children: [
                (0, jsx_runtime_1.jsx)(alert_dialog_1.AlertDialogTitle, {
                  children: "Are you sure you want to cancel?",
                }),
                (0, jsx_runtime_1.jsxs)(alert_dialog_1.AlertDialogDescription, {
                  children: [
                    "Your subscription will remain active until the end of your current billing period on ",
                    formatDate(
                      subscription === null || subscription === void 0
                        ? void 0
                        : subscription.currentPeriodEnd,
                    ),
                    ". After this date, you'll lose access to premium features.",
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(alert_dialog_1.AlertDialogFooter, {
              children: [
                (0, jsx_runtime_1.jsx)(alert_dialog_1.AlertDialogCancel, {
                  children: "Keep Subscription",
                }),
                (0, jsx_runtime_1.jsx)(alert_dialog_1.AlertDialogAction, {
                  onClick: handleCancelSubscription,
                  className: "bg-destructive text-destructive-foreground",
                  children: "Cancel Subscription",
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
