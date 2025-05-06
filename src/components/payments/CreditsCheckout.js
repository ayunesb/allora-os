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
exports.CreditsCheckout = CreditsCheckout;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var stripePayments_1 = require("@/utils/stripePayments");
var useUser_1 = require("@/hooks/useUser");
var sonner_1 = require("sonner");
function CreditsCheckout() {
  var _this = this;
  var _a = (0, react_1.useState)(false),
    isProcessing = _a[0],
    setIsProcessing = _a[1];
  var _b = (0, react_1.useState)(null),
    selectedPackage = _b[0],
    setSelectedPackage = _b[1];
  var user = (0, useUser_1.useUser)().user;
  var creditPackages = [
    { id: "basic", credits: 100, price: 9.99 },
    { id: "standard", credits: 500, price: 39.99, popular: true },
    { id: "premium", credits: 1000, price: 69.99 },
  ];
  var handleCheckout = function (packageId) {
    return __awaiter(_this, void 0, void 0, function () {
      var pkg, session, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!user) {
              sonner_1.toast.error("You must be logged in to purchase credits");
              return [2 /*return*/];
            }
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            setIsProcessing(true);
            setSelectedPackage(packageId);
            pkg = creditPackages.find(function (p) {
              return p.id === packageId;
            });
            if (!pkg) return [2 /*return*/];
            return [
              4 /*yield*/,
              (0, stripePayments_1.createCreditPurchaseCheckout)({
                userId: user.id,
                credits: pkg.credits,
                priceUsd: pkg.price,
              }),
            ];
          case 2:
            session = _a.sent();
            // Redirect to Stripe checkout
            window.location.href = session.url;
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            console.error("Error creating checkout session:", error_1);
            sonner_1.toast.error(
              "Failed to initiate checkout. Please try again.",
            );
            return [3 /*break*/, 5];
          case 4:
            setIsProcessing(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto py-8 px-4 max-w-5xl",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "mb-8 text-center",
        children: [
          (0, jsx_runtime_1.jsx)("h1", {
            className: "text-3xl font-bold mb-2",
            children: "Purchase Credits",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-muted-foreground",
            children:
              "Add more credits to unlock additional AI-powered features.",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "grid gap-6 md:grid-cols-3",
        children: creditPackages.map(function (pkg) {
          return (0, jsx_runtime_1.jsxs)(
            card_1.Card,
            {
              className: "relative overflow-hidden ".concat(
                pkg.popular ? "border-primary shadow-md" : "",
              ),
              children: [
                pkg.popular &&
                  (0, jsx_runtime_1.jsx)("div", {
                    className:
                      "absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-medium",
                    children: "POPULAR",
                  }),
                (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                      className: "text-2xl font-bold",
                      children: [pkg.credits, " Credits"],
                    }),
                    (0, jsx_runtime_1.jsxs)(card_1.CardDescription, {
                      children: ["$", pkg.price.toFixed(2)],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  children: (0, jsx_runtime_1.jsxs)("ul", {
                    className: "space-y-2",
                    children: [
                      (0, jsx_runtime_1.jsxs)("li", {
                        className: "flex items-center",
                        children: [
                          (0, jsx_runtime_1.jsx)("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            className: "h-5 w-5 text-green-500 mr-2",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            children: (0, jsx_runtime_1.jsx)("path", {
                              d: "M20 6L9 17l-5-5",
                            }),
                          }),
                          pkg.credits,
                          " AI interactions",
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("li", {
                        className: "flex items-center",
                        children: [
                          (0, jsx_runtime_1.jsx)("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            className: "h-5 w-5 text-green-500 mr-2",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            children: (0, jsx_runtime_1.jsx)("path", {
                              d: "M20 6L9 17l-5-5",
                            }),
                          }),
                          "Advanced AI features",
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("li", {
                        className: "flex items-center",
                        children: [
                          (0, jsx_runtime_1.jsx)("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            className: "h-5 w-5 text-green-500 mr-2",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            children: (0, jsx_runtime_1.jsx)("path", {
                              d: "M20 6L9 17l-5-5",
                            }),
                          }),
                          "No monthly commitment",
                        ],
                      }),
                    ],
                  }),
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
                  children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                    className: "w-full",
                    variant: pkg.popular ? "default" : "outline",
                    onClick: function () {
                      return handleCheckout(pkg.id);
                    },
                    disabled: isProcessing && selectedPackage === pkg.id,
                    children:
                      isProcessing && selectedPackage === pkg.id
                        ? (0, jsx_runtime_1.jsxs)("span", {
                            className: "flex items-center",
                            children: [
                              (0, jsx_runtime_1.jsxs)("svg", {
                                className: "animate-spin -ml-1 mr-2 h-4 w-4",
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                children: [
                                  (0, jsx_runtime_1.jsx)("circle", {
                                    className: "opacity-25",
                                    cx: "12",
                                    cy: "12",
                                    r: "10",
                                    stroke: "currentColor",
                                    strokeWidth: "4",
                                  }),
                                  (0, jsx_runtime_1.jsx)("path", {
                                    className: "opacity-75",
                                    fill: "currentColor",
                                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
                                  }),
                                ],
                              }),
                              "Processing...",
                            ],
                          })
                        : "Purchase",
                  }),
                }),
              ],
            },
            pkg.id,
          );
        }),
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "mt-8 text-center text-sm text-muted-foreground",
        children: (0, jsx_runtime_1.jsxs)("p", {
          children: [
            "Need a custom plan? ",
            (0, jsx_runtime_1.jsx)("a", {
              href: "/contact",
              className: "text-primary hover:underline",
              children: "Contact us",
            }),
            " for enterprise solutions.",
          ],
        }),
      }),
    ],
  });
}
