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
exports.useSubscription = useSubscription;
var react_1 = require("react");
var sonner_1 = require("sonner");
var stripe_1 = require("@/backend/stripe");
/**
 * Custom hook for managing subscriptions
 * @returns Functions and state for subscription management
 */
function useSubscription() {
  var _this = this;
  var _a = (0, react_1.useState)(true),
    isLoading = _a[0],
    setIsLoading = _a[1];
  var _b = (0, react_1.useState)(null),
    subscription = _b[0],
    setSubscription = _b[1];
  var _c = (0, react_1.useState)(false),
    isSubscribing = _c[0],
    setIsSubscribing = _c[1];
  var _d = (0, react_1.useState)(false),
    isUpdating = _d[0],
    setIsUpdating = _d[1];
  // Fetch subscription details
  var fetchSubscriptionDetails = (0, react_1.useCallback)(function () {
    return __awaiter(_this, void 0, void 0, function () {
      var details, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, 3, 4]);
            setIsLoading(true);
            return [4 /*yield*/, (0, stripe_1.getSubscriptionDetails)()];
          case 1:
            details = _a.sent();
            setSubscription(details);
            return [3 /*break*/, 4];
          case 2:
            error_1 = _a.sent();
            console.error("Error fetching subscription details:", error_1);
            sonner_1.toast.error("Failed to load subscription information");
            return [3 /*break*/, 4];
          case 3:
            setIsLoading(false);
            return [7 /*endfinally*/];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  }, []);
  // Load subscription data on mount
  (0, react_1.useEffect)(
    function () {
      fetchSubscriptionDetails();
    },
    [fetchSubscriptionDetails],
  );
  // Subscribe to a plan
  var subscribeToPlan = function (priceId, successUrl, cancelUrl) {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, url, error, error_2;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 2, 3, 4]);
            setIsSubscribing(true);
            return [
              4 /*yield*/,
              (0, stripe_1.createCheckoutSession)(
                priceId,
                successUrl,
                cancelUrl,
              ),
            ];
          case 1:
            (_a = _b.sent()), (url = _a.url), (error = _a.error);
            if (error) {
              throw new Error(error);
            }
            if (url) {
              window.location.href = url;
              return [2 /*return*/, true];
            } else {
              throw new Error("No checkout URL returned");
            }
            return [3 /*break*/, 4];
          case 2:
            error_2 = _b.sent();
            sonner_1.toast.error(
              "Failed to create checkout session: ".concat(error_2.message),
            );
            return [2 /*return*/, false];
          case 3:
            setIsSubscribing(false);
            return [7 /*endfinally*/];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  // Open the customer portal
  var openCustomerPortal = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, url, error, error_3;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 2, 3, 4]);
            setIsUpdating(true);
            return [4 /*yield*/, (0, stripe_1.createCustomerPortalSession)()];
          case 1:
            (_a = _b.sent()), (url = _a.url), (error = _a.error);
            if (error) {
              throw new Error(error);
            }
            if (url) {
              window.location.href = url;
              return [2 /*return*/, true];
            } else {
              throw new Error("No portal URL returned");
            }
            return [3 /*break*/, 4];
          case 2:
            error_3 = _b.sent();
            sonner_1.toast.error(
              "Failed to access billing portal: ".concat(error_3.message),
            );
            return [2 /*return*/, false];
          case 3:
            setIsUpdating(false);
            return [7 /*endfinally*/];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  // Cancel a subscription
  var cancelCurrentSubscription = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, success, error, error_4;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (
              !(subscription === null || subscription === void 0
                ? void 0
                : subscription.subscriptionId)
            ) {
              sonner_1.toast.error("No active subscription to cancel");
              return [2 /*return*/, false];
            }
            _b.label = 1;
          case 1:
            _b.trys.push([1, 4, 5, 6]);
            setIsUpdating(true);
            return [
              4 /*yield*/,
              (0, stripe_1.cancelSubscription)(subscription.subscriptionId),
            ];
          case 2:
            (_a = _b.sent()), (success = _a.success), (error = _a.error);
            if (!success) {
              throw new Error(error || "Failed to cancel subscription");
            }
            sonner_1.toast.success(
              "Your subscription will be canceled at the end of the billing period",
            );
            return [4 /*yield*/, fetchSubscriptionDetails()];
          case 3:
            _b.sent();
            return [2 /*return*/, true];
          case 4:
            error_4 = _b.sent();
            sonner_1.toast.error(
              "Failed to cancel subscription: ".concat(error_4.message),
            );
            return [2 /*return*/, false];
          case 5:
            setIsUpdating(false);
            return [7 /*endfinally*/];
          case 6:
            return [2 /*return*/];
        }
      });
    });
  };
  // Reactivate a subscription
  var reactivateCurrentSubscription = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, success, error, error_5;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (
              !(subscription === null || subscription === void 0
                ? void 0
                : subscription.subscriptionId)
            ) {
              sonner_1.toast.error("No subscription to reactivate");
              return [2 /*return*/, false];
            }
            _b.label = 1;
          case 1:
            _b.trys.push([1, 4, 5, 6]);
            setIsUpdating(true);
            return [
              4 /*yield*/,
              (0, stripe_1.reactivateSubscription)(subscription.subscriptionId),
            ];
          case 2:
            (_a = _b.sent()), (success = _a.success), (error = _a.error);
            if (!success) {
              throw new Error(error || "Failed to reactivate subscription");
            }
            sonner_1.toast.success("Your subscription has been reactivated");
            return [4 /*yield*/, fetchSubscriptionDetails()];
          case 3:
            _b.sent();
            return [2 /*return*/, true];
          case 4:
            error_5 = _b.sent();
            sonner_1.toast.error(
              "Failed to reactivate subscription: ".concat(error_5.message),
            );
            return [2 /*return*/, false];
          case 5:
            setIsUpdating(false);
            return [7 /*endfinally*/];
          case 6:
            return [2 /*return*/];
        }
      });
    });
  };
  // Change subscription plan
  var changePlan = function (newPriceId) {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, success, error, error_6;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (
              !(subscription === null || subscription === void 0
                ? void 0
                : subscription.subscriptionId)
            ) {
              sonner_1.toast.error("No active subscription to change");
              return [2 /*return*/, false];
            }
            _b.label = 1;
          case 1:
            _b.trys.push([1, 4, 5, 6]);
            setIsUpdating(true);
            return [
              4 /*yield*/,
              (0, stripe_1.changeSubscriptionPlan)(
                subscription.subscriptionId,
                newPriceId,
              ),
            ];
          case 2:
            (_a = _b.sent()), (success = _a.success), (error = _a.error);
            if (!success) {
              throw new Error(error || "Failed to change subscription plan");
            }
            sonner_1.toast.success("Your subscription plan has been updated");
            return [4 /*yield*/, fetchSubscriptionDetails()];
          case 3:
            _b.sent();
            return [2 /*return*/, true];
          case 4:
            error_6 = _b.sent();
            sonner_1.toast.error(
              "Failed to change subscription plan: ".concat(error_6.message),
            );
            return [2 /*return*/, false];
          case 5:
            setIsUpdating(false);
            return [7 /*endfinally*/];
          case 6:
            return [2 /*return*/];
        }
      });
    });
  };
  return {
    subscription: subscription,
    isLoading: isLoading,
    isSubscribing: isSubscribing,
    isUpdating: isUpdating,
    subscribeToPlan: subscribeToPlan,
    openCustomerPortal: openCustomerPortal,
    cancelCurrentSubscription: cancelCurrentSubscription,
    reactivateCurrentSubscription: reactivateCurrentSubscription,
    changePlan: changePlan,
    refresh: fetchSubscriptionDetails,
  };
}
