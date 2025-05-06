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
exports.createCustomer =
  exports.getProducts =
  exports.changeSubscriptionPlan =
  exports.reactivateSubscription =
  exports.cancelSubscription =
  exports.createCustomerPortalSession =
  exports.createCheckoutSession =
  exports.getSubscriptionDetails =
    void 0;
var supabase_1 = require("@/backend/supabase");
// Fetch current subscription details
var getSubscriptionDetails = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a, userData, userError, _b, data, error, error_1;
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          _c.trys.push([0, 3, , 4]);
          return [4 /*yield*/, supabase_1.supabase.auth.getUser()];
        case 1:
          (_a = _c.sent()), (userData = _a.data), (userError = _a.error);
          if (
            userError ||
            !(userData === null || userData === void 0 ? void 0 : userData.user)
          ) {
            return [
              2 /*return*/,
              { isActive: false, error: "User not authenticated" },
            ];
          }
          return [
            4 /*yield*/,
            supabase_1.supabase.functions.invoke("check-subscription"),
          ];
        case 2:
          (_b = _c.sent()), (data = _b.data), (error = _b.error);
          if (error) {
            console.error("Error checking subscription:", error);
            return [
              2 /*return*/,
              {
                isActive: false,
                error: "Failed to check subscription status: ".concat(
                  error.message,
                ),
              },
            ];
          }
          // Return the subscription details
          return [
            2 /*return*/,
            {
              isActive: data.subscribed,
              planName: data.subscription_tier,
              expiresAt: data.subscription_end,
              status: data.subscribed ? "active" : "canceled",
            },
          ];
        case 3:
          error_1 = _c.sent();
          console.error("Error in getSubscriptionDetails:", error_1);
          return [
            2 /*return*/,
            {
              isActive: false,
              error:
                error_1 instanceof Error ? error_1.message : "Unknown error",
            },
          ];
        case 4:
          return [2 /*return*/];
      }
    });
  });
};
exports.getSubscriptionDetails = getSubscriptionDetails;
// Create a checkout session
var createCheckoutSession = function (priceId, successUrl, cancelUrl) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error, error_2;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase_1.supabase.functions.invoke("stripe", {
              body: {
                action: "create-checkout-session",
                priceId: priceId,
                successUrl: successUrl,
                cancelUrl: cancelUrl,
              },
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          return [
            2 /*return*/,
            {
              url: data.url,
              sessionId: data.sessionId,
            },
          ];
        case 2:
          error_2 = _b.sent();
          console.error("Error creating checkout session:", error_2);
          return [
            2 /*return*/,
            {
              url: null,
              error:
                error_2 instanceof Error
                  ? error_2.message
                  : "Failed to create checkout session",
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
exports.createCheckoutSession = createCheckoutSession;
// Create a customer portal session
var createCustomerPortalSession = function (returnUrl) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error, error_3;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase_1.supabase.functions.invoke("stripe", {
              body: {
                action: "create-customer-portal",
                returnUrl: returnUrl,
              },
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          return [2 /*return*/, { url: data.url }];
        case 2:
          error_3 = _b.sent();
          console.error("Error creating customer portal session:", error_3);
          return [
            2 /*return*/,
            {
              url: null,
              error:
                error_3 instanceof Error
                  ? error_3.message
                  : "Failed to create customer portal session",
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
exports.createCustomerPortalSession = createCustomerPortalSession;
// Cancel a subscription
var cancelSubscription = function (subscriptionId) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error, error_4;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase_1.supabase.functions.invoke("stripe", {
              body: {
                action: "cancel-subscription",
                subscriptionId: subscriptionId,
              },
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          return [2 /*return*/, { success: true }];
        case 2:
          error_4 = _b.sent();
          console.error("Error canceling subscription:", error_4);
          return [
            2 /*return*/,
            {
              success: false,
              error:
                error_4 instanceof Error
                  ? error_4.message
                  : "Failed to cancel subscription",
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
exports.cancelSubscription = cancelSubscription;
// Reactivate a canceled subscription
var reactivateSubscription = function (subscriptionId) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error, error_5;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase_1.supabase.functions.invoke("stripe", {
              body: {
                action: "reactivate-subscription",
                subscriptionId: subscriptionId,
              },
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          return [2 /*return*/, { success: true }];
        case 2:
          error_5 = _b.sent();
          console.error("Error reactivating subscription:", error_5);
          return [
            2 /*return*/,
            {
              success: false,
              error:
                error_5 instanceof Error
                  ? error_5.message
                  : "Failed to reactivate subscription",
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
exports.reactivateSubscription = reactivateSubscription;
// Change subscription plan
var changeSubscriptionPlan = function (subscriptionId, newPriceId) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error, error_6;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase_1.supabase.functions.invoke("stripe", {
              body: {
                action: "change-subscription-plan",
                subscriptionId: subscriptionId,
                newPriceId: newPriceId,
              },
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          return [2 /*return*/, { success: true }];
        case 2:
          error_6 = _b.sent();
          console.error("Error changing subscription plan:", error_6);
          return [
            2 /*return*/,
            {
              success: false,
              error:
                error_6 instanceof Error
                  ? error_6.message
                  : "Failed to change subscription plan",
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
exports.changeSubscriptionPlan = changeSubscriptionPlan;
// Get available products and prices
var getProducts = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error, error_7;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase_1.supabase.functions.invoke("stripe", {
              body: { action: "get-products" },
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          return [2 /*return*/, data.products || []];
        case 2:
          error_7 = _b.sent();
          console.error("Error fetching products:", error_7);
          return [2 /*return*/, []];
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
exports.getProducts = getProducts;
// Create a customer in Stripe
var createCustomer = function (email, name) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error, error_8;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase_1.supabase.functions.invoke("stripe", {
              body: {
                action: "create-customer",
                email: email,
                name: name,
              },
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          return [2 /*return*/, { customerId: data.customerId }];
        case 2:
          error_8 = _b.sent();
          console.error("Error creating customer:", error_8);
          return [
            2 /*return*/,
            {
              error:
                error_8 instanceof Error
                  ? error_8.message
                  : "Failed to create customer",
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
exports.createCustomer = createCustomer;
