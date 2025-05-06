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
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
var use_mobile_1 = require("@/hooks/use-mobile");
var useSubscription_1 = require("@/hooks/useSubscription");
var sonner_1 = require("sonner");
var tooltip_1 = require("@/components/ui/tooltip");
var PricingTier = function (_a) {
  var title = _a.title,
    price = _a.price,
    description = _a.description,
    features = _a.features,
    buttonText = _a.buttonText,
    priceId = _a.priceId,
    _b = _a.buttonVariant,
    buttonVariant = _b === void 0 ? "default" : _b,
    _c = _a.popular,
    popular = _c === void 0 ? false : _c,
    _d = _a.emoji,
    emoji = _d === void 0 ? "✅" : _d,
    _e = _a.isRecommended,
    isRecommended = _e === void 0 ? false : _e,
    _f = _a.isEnterprise,
    isEnterprise = _f === void 0 ? false : _f,
    _g = _a.currentPlan,
    currentPlan = _g === void 0 ? false : _g;
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobileView = ["xs", "mobile"].includes(breakpoint);
  var _h = (0, useSubscription_1.useSubscription)(),
    subscribeToPlan = _h.subscribeToPlan,
    isSubscribing = _h.isSubscribing,
    subscription = _h.subscription;
  var handleSubscribe = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (isEnterprise) {
              sonner_1.toast.info(
                "Please contact our sales team for enterprise plans",
              );
              return [2 /*return*/];
            }
            if (!priceId) {
              sonner_1.toast.info("Please contact sales for this plan");
              return [2 /*return*/];
            }
            // If user is already subscribed to this plan
            if (currentPlan) {
              sonner_1.toast.info("You are already subscribed to this plan");
              return [2 /*return*/];
            }
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            return [4 /*yield*/, subscribeToPlan(priceId)];
          case 2:
            _a.sent();
            return [3 /*break*/, 4];
          case 3:
            error_1 = _a.sent();
            console.error("Error creating checkout:", error_1);
            sonner_1.toast.error("An error occurred. Please try again later.");
            return [3 /*break*/, 4];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  // Custom badge component
  var Badge = function (_a) {
    var children = _a.children,
      variant = _a.variant;
    var bgColor =
      variant === "popular"
        ? "bg-primary"
        : variant === "recommended"
          ? "bg-green-600"
          : "bg-blue-600";
    var textColor = "text-white";
    return (0, jsx_runtime_1.jsx)("div", {
      className: "py-1 px-4 "
        .concat(bgColor, " ")
        .concat(textColor, " text-center text-sm font-medium"),
      children: children,
    });
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "flex flex-col ".concat(
      popular
        ? "border-primary shadow-lg"
        : isRecommended
          ? "border-green-500 shadow-lg"
          : currentPlan
            ? "border-blue-500 shadow-lg"
            : "",
    ),
    children: [
      popular &&
        (0, jsx_runtime_1.jsx)(Badge, {
          variant: "popular",
          children: "Most Popular",
        }),
      isRecommended &&
        (0, jsx_runtime_1.jsx)(Badge, {
          variant: "recommended",
          children: "Recommended",
        }),
      currentPlan &&
        (0, jsx_runtime_1.jsx)(Badge, {
          variant: "current",
          children: "Current Plan",
        }),
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className: isMobileView ? "px-4 py-3" : undefined,
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            className: "text-xl",
            children: title,
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: description,
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "mt-4",
            children: [
              (0, jsx_runtime_1.jsx)("span", {
                className: "text-3xl font-bold",
                children: price,
              }),
              price !== "Custom" &&
                (0, jsx_runtime_1.jsx)("span", {
                  className: "text-muted-foreground",
                  children: " /month",
                }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        className: "flex-1 ".concat(isMobileView ? "px-4 py-3 pt-0" : ""),
        children: (0, jsx_runtime_1.jsx)("ul", {
          className: "space-y-3",
          children: features.map(function (feature, i) {
            return (0, jsx_runtime_1.jsxs)(
              "li",
              {
                className: "flex items-start",
                children: [
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "mr-2 text-primary",
                    children: emoji,
                  }),
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "".concat(isMobileView ? "text-xs" : "text-sm"),
                    children: feature,
                  }),
                ],
              },
              i,
            );
          }),
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
        className: isMobileView ? "px-4 py-3" : undefined,
        children: isEnterprise
          ? (0, jsx_runtime_1.jsx)(tooltip_1.TooltipProvider, {
              children: (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, {
                children: [
                  (0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, {
                    asChild: true,
                    children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
                      variant: buttonVariant,
                      className: "w-full",
                      onClick: handleSubscribe,
                      children: [
                        "Contact Sales",
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Info, {
                          className: "h-4 w-4 ml-2 opacity-70",
                        }),
                      ],
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, {
                    children: (0, jsx_runtime_1.jsx)("p", {
                      children:
                        "Enterprise plans include custom pricing and features",
                    }),
                  }),
                ],
              }),
            })
          : currentPlan
            ? (0, jsx_runtime_1.jsx)(button_1.Button, {
                variant: "outline",
                className: "w-full cursor-default",
                disabled: true,
                children: "Current Plan",
              })
            : priceId
              ? (0, jsx_runtime_1.jsx)(button_1.Button, {
                  variant: buttonVariant,
                  className: "w-full",
                  onClick: handleSubscribe,
                  disabled: isSubscribing,
                  children: isSubscribing ? "Processing..." : buttonText,
                })
              : (0, jsx_runtime_1.jsx)(button_1.Button, {
                  variant: buttonVariant,
                  className: "w-full",
                  children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
                    to: "/signup",
                    className: "w-full",
                    children: buttonText,
                  }),
                }),
      }),
    ],
  });
};
exports.default = PricingTier;
