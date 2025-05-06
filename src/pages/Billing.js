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
exports.default = Billing;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_helmet_async_1 = require("react-helmet-async");
var PageErrorBoundary_1 = require("@/components/errorHandling/PageErrorBoundary");
var SubscriptionManagement_1 = require("@/components/subscription/SubscriptionManagement");
var card_1 = require("@/components/ui/card");
var tabs_1 = require("@/components/ui/tabs");
var useSubscription_1 = require("@/hooks/useSubscription");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var PricingTier_1 = require("@/components/pricing/PricingTier");
var stripeHelpers_1 = require("@/utils/stripeHelpers");
var sonner_1 = require("sonner");
function Billing() {
  var _this = this;
  var _a = (0, react_1.useState)("subscription"),
    activeTab = _a[0],
    setActiveTab = _a[1];
  var _b = (0, react_1.useState)([]),
    products = _b[0],
    setProducts = _b[1];
  var _c = (0, react_1.useState)(true),
    isLoadingProducts = _c[0],
    setIsLoadingProducts = _c[1];
  var subscription = (0, useSubscription_1.useSubscription)().subscription;
  (0, react_1.useEffect)(function () {
    var fetchProducts = function () {
      return __awaiter(_this, void 0, void 0, function () {
        var productsData, error_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2, 3, 4]);
              setIsLoadingProducts(true);
              return [4 /*yield*/, (0, stripeHelpers_1.getProducts)()];
            case 1:
              productsData = _a.sent();
              setProducts(productsData);
              return [3 /*break*/, 4];
            case 2:
              error_1 = _a.sent();
              console.error("Failed to fetch products:", error_1);
              sonner_1.toast.error("Failed to load pricing plans");
              return [3 /*break*/, 4];
            case 3:
              setIsLoadingProducts(false);
              return [7 /*endfinally*/];
            case 4:
              return [2 /*return*/];
          }
        });
      });
    };
    fetchProducts();
  }, []);
  var handleUpgradePlan = function () {
    setActiveTab("plans");
  };
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsx)(react_helmet_async_1.Helmet, {
        children: (0, jsx_runtime_1.jsx)("title", {
          children: "Billing & Subscription - Allora AI",
        }),
      }),
      (0, jsx_runtime_1.jsx)(PageErrorBoundary_1.PageErrorBoundary, {
        pageName: "Billing & Subscription",
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "container mx-auto px-4 py-6",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className:
                "flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  children: [
                    (0, jsx_runtime_1.jsx)("h1", {
                      className: "text-2xl font-bold tracking-tight",
                      children: "Billing & Subscription",
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-muted-foreground mt-1",
                      children:
                        "Manage your subscription plan and billing information",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(button_1.Button, {
                  variant: "ghost",
                  size: "sm",
                  className: "mt-2 sm:mt-0 gap-1",
                  onClick: function () {
                    return window.open(
                      "mailto:support@allora-ai.com",
                      "_blank",
                    );
                  },
                  children: [
                    "Need help? Contact Support",
                    (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, {
                      className: "h-4 w-4",
                    }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
              defaultValue: "subscription",
              value: activeTab,
              onValueChange: setActiveTab,
              children: [
                (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                  className: "mb-4",
                  children: [
                    (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                      value: "subscription",
                      children: "Current Subscription",
                    }),
                    (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                      value: "plans",
                      children: "Available Plans",
                    }),
                    (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                      value: "history",
                      children: "Billing History",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, {
                  value: "subscription",
                  className: "space-y-4",
                  children: [
                    (0, jsx_runtime_1.jsx)(SubscriptionManagement_1.default, {
                      onUpgradePlan: handleUpgradePlan,
                    }),
                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                          children: [
                            (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                              className: "flex items-center gap-2",
                              children: [
                                (0, jsx_runtime_1.jsx)(
                                  lucide_react_1.CreditCard,
                                  { className: "h-5 w-5" },
                                ),
                                "Payment Methods",
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                              children:
                                "Manage your payment methods and billing details",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                          children: [
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-sm text-muted-foreground mb-4",
                              children:
                                "Payment methods can be managed through the Stripe Customer Portal.",
                            }),
                            (0, jsx_runtime_1.jsxs)(button_1.Button, {
                              variant: "outline",
                              onClick: function () {
                                return (
                                  (subscription === null ||
                                  subscription === void 0
                                    ? void 0
                                    : subscription.isActive) &&
                                  handleUpgradePlan()
                                );
                              },
                              children: [
                                "View Payment Methods",
                                (0, jsx_runtime_1.jsx)(
                                  lucide_react_1.ArrowRight,
                                  { className: "ml-2 h-4 w-4" },
                                ),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                  value: "plans",
                  className: "space-y-4",
                  children: (0, jsx_runtime_1.jsxs)("div", {
                    children: [
                      (0, jsx_runtime_1.jsx)("h2", {
                        className: "text-xl font-semibold mb-1",
                        children: "Available Plans",
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "text-muted-foreground mb-4",
                        children:
                          "Choose the plan that best fits your business needs",
                      }),
                      isLoadingProducts
                        ? (0, jsx_runtime_1.jsx)("div", {
                            className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                            children: [1, 2, 3].map(function (i) {
                              return (0, jsx_runtime_1.jsxs)(
                                card_1.Card,
                                {
                                  className: "animate-pulse",
                                  children: [
                                    (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                                      children: [
                                        (0, jsx_runtime_1.jsx)("div", {
                                          className:
                                            "h-7 bg-muted rounded-md w-1/2 mb-2",
                                        }),
                                        (0, jsx_runtime_1.jsx)("div", {
                                          className:
                                            "h-4 bg-muted rounded-md w-3/4",
                                        }),
                                      ],
                                    }),
                                    (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                                      children: (0, jsx_runtime_1.jsx)("div", {
                                        className: "space-y-3",
                                        children: [1, 2, 3, 4].map(
                                          function (j) {
                                            return (0, jsx_runtime_1.jsx)(
                                              "div",
                                              {
                                                className:
                                                  "h-4 bg-muted rounded-md w-full",
                                              },
                                              j,
                                            );
                                          },
                                        ),
                                      }),
                                    }),
                                  ],
                                },
                                i,
                              );
                            }),
                          })
                        : (0, jsx_runtime_1.jsx)("div", {
                            className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                            children:
                              products.length > 0
                                ? products
                                    .filter(function (product) {
                                      return product.active;
                                    })
                                    .map(function (product) {
                                      var _a, _b, _c, _d, _e;
                                      var price =
                                        typeof product.default_price ===
                                        "object"
                                          ? product.default_price
                                          : null;
                                      var priceAmount = (
                                        price === null || price === void 0
                                          ? void 0
                                          : price.unit_amount
                                      )
                                        ? "$".concat(
                                            (price.unit_amount / 100).toFixed(
                                              2,
                                            ),
                                          )
                                        : "Custom";
                                      var features = (
                                        (_a = product.metadata) === null ||
                                        _a === void 0
                                          ? void 0
                                          : _a.features
                                      )
                                        ? JSON.parse(product.metadata.features)
                                        : ((_b = product.description) ===
                                            null || _b === void 0
                                            ? void 0
                                            : _b.split(", ")) || [];
                                      var isCurrentPlan =
                                        (subscription === null ||
                                        subscription === void 0
                                          ? void 0
                                          : subscription.planId) === product.id;
                                      return (0, jsx_runtime_1.jsx)(
                                        PricingTier_1.default,
                                        {
                                          title: product.name,
                                          price: priceAmount,
                                          description:
                                            product.description || "",
                                          features: features,
                                          buttonText: isCurrentPlan
                                            ? "Current Plan"
                                            : "Subscribe",
                                          priceId:
                                            typeof price === "object"
                                              ? price === null ||
                                                price === void 0
                                                ? void 0
                                                : price.id
                                              : product.default_price,
                                          buttonVariant: isCurrentPlan
                                            ? "outline"
                                            : "default",
                                          currentPlan: isCurrentPlan,
                                          isRecommended:
                                            ((_c = product.metadata) === null ||
                                            _c === void 0
                                              ? void 0
                                              : _c.recommended) === "true",
                                          popular:
                                            ((_d = product.metadata) === null ||
                                            _d === void 0
                                              ? void 0
                                              : _d.popular) === "true",
                                          isEnterprise:
                                            ((_e = product.metadata) === null ||
                                            _e === void 0
                                              ? void 0
                                              : _e.enterprise) === "true",
                                        },
                                        product.id,
                                      );
                                    })
                                : (0, jsx_runtime_1.jsx)("div", {
                                    className: "col-span-3 text-center py-8",
                                    children: (0, jsx_runtime_1.jsx)("p", {
                                      className: "text-muted-foreground",
                                      children: "No pricing plans available",
                                    }),
                                  }),
                          }),
                    ],
                  }),
                }),
                (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                  value: "history",
                  children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
                    children: [
                      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                        children: [
                          (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                            className: "flex items-center gap-2",
                            children: [
                              (0, jsx_runtime_1.jsx)(lucide_react_1.Receipt, {
                                className: "h-5 w-5",
                              }),
                              "Billing History",
                            ],
                          }),
                          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                            children:
                              "View your previous invoices and payment history",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                        children: [
                          (0, jsx_runtime_1.jsx)("p", {
                            className: "text-sm text-muted-foreground mb-4",
                            children:
                              "Access to your complete billing history is available through the Stripe Customer Portal.",
                          }),
                          (0, jsx_runtime_1.jsxs)(button_1.Button, {
                            variant: "outline",
                            onClick: function () {
                              return __awaiter(
                                _this,
                                void 0,
                                void 0,
                                function () {
                                  var openCustomerPortal;
                                  return __generator(this, function (_a) {
                                    switch (_a.label) {
                                      case 0:
                                        openCustomerPortal = (0,
                                        useSubscription_1.useSubscription)()
                                          .openCustomerPortal;
                                        return [
                                          4 /*yield*/,
                                          openCustomerPortal(),
                                        ];
                                      case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                    }
                                  });
                                },
                              );
                            },
                            children: [
                              "View Billing History",
                              (0, jsx_runtime_1.jsx)(
                                lucide_react_1.ArrowRight,
                                { className: "ml-2 h-4 w-4" },
                              ),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
