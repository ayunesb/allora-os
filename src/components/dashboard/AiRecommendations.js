"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var badge_1 = require("@/components/ui/badge");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var avatar_1 = require("@/components/ui/avatar");
var progress_bar_1 = require("@/components/ui/progress-bar");
var sonner_1 = require("sonner");
var AiRecommendations = function (_a) {
  var children = _a.children,
    _b = _a.variant,
    variant = _b === void 0 ? "default" : _b,
    _c = _a.size,
    size = _c === void 0 ? "expanded" : _c;
  var _d = (0, react_1.useState)({}),
    feedbackState = _d[0],
    setFeedbackState = _d[1];
  var handleFeedback = function (index, isPositive) {
    setFeedbackState(function (prev) {
      var _a;
      return __assign(
        __assign({}, prev),
        ((_a = {}), (_a[index] = isPositive ? "liked" : "disliked"), _a),
      );
    });
    sonner_1.toast.success(
      isPositive
        ? "Thank you for your positive feedback!"
        : "Thank you for your feedback. We'll improve our recommendations.",
    );
  };
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex justify-between items-center mb-4",
        children: [
          (0, jsx_runtime_1.jsx)("h2", {
            className: "text-2xl font-bold",
            children: "AI Executive Recommendations",
          }),
          (0, jsx_runtime_1.jsx)(badge_1.Badge, {
            variant: "outline",
            className: "bg-primary/10 text-primary",
            children: "Executive Team",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-10",
        children: recommendations.map(function (rec, index) {
          return (0, jsx_runtime_1.jsxs)(
            card_1.Card,
            {
              className:
                "border-primary/10 hover:border-primary/30 transition-all",
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                  className: "pb-2",
                  children: (0, jsx_runtime_1.jsx)("div", {
                    className: "flex justify-between",
                    children: (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex items-center gap-1 mb-1",
                          children: [
                            (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                              variant: "outline",
                              className: "capitalize",
                              children: rec.type,
                            }),
                            (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                              variant: "outline",
                              className:
                                "bg-amber-500/10 text-amber-500 capitalize",
                              children: rec.timeframe,
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                          className: "text-lg",
                          children: rec.title,
                        }),
                      ],
                    }),
                  }),
                }),
                (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "mb-4 flex items-start gap-3",
                      children: [
                        (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, {
                          className: "h-8 w-8 border border-primary/20",
                          children: [
                            (0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, {
                              src: "/avatars/".concat(
                                rec.executiveBot.name
                                  .toLowerCase()
                                  .replace(/\s+/g, "-"),
                                ".png",
                              ),
                              alt: rec.executiveBot.name,
                            }),
                            (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, {
                              children: rec.executiveBot.name.charAt(0),
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex-1",
                          children: [
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-muted-foreground text-sm mb-2",
                              children: rec.description,
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              className:
                                "flex items-center justify-between text-xs text-muted-foreground mb-1",
                              children: [
                                (0, jsx_runtime_1.jsx)("span", {
                                  children: "Expected Impact",
                                }),
                                (0, jsx_runtime_1.jsxs)("span", {
                                  children: [rec.expectedImpact, "%"],
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)(progress_bar_1.ProgressBar, {
                              value: rec.expectedImpact,
                              max: 100,
                              className: "h-1.5",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className:
                        "text-xs text-muted-foreground flex items-center",
                      children: [
                        (0, jsx_runtime_1.jsx)("span", {
                          children: "Recommended by: ",
                        }),
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "font-medium ml-1",
                          children: rec.executiveBot.name,
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
                  className: "flex justify-between border-t pt-4",
                  children: [
                    feedbackState[index] === "liked"
                      ? (0, jsx_runtime_1.jsxs)(button_1.Button, {
                          variant: "outline",
                          size: "sm",
                          className: "text-green-500",
                          disabled: true,
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
                              className: "mr-2 h-4 w-4",
                            }),
                            "Approved",
                          ],
                        })
                      : (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex gap-2",
                          children: [
                            (0, jsx_runtime_1.jsxs)(button_1.Button, {
                              variant: "outline",
                              size: "sm",
                              onClick: function () {
                                return onApprove(index);
                              },
                              children: [
                                (0, jsx_runtime_1.jsx)(
                                  lucide_react_1.ThumbsUp,
                                  { className: "mr-2 h-4 w-4" },
                                ),
                                "Approve",
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)(button_1.Button, {
                              variant: "ghost",
                              size: "sm",
                              onClick: function () {
                                return handleFeedback(index, false);
                              },
                              className: "text-muted-foreground",
                              children: (0, jsx_runtime_1.jsx)(
                                lucide_react_1.ThumbsDown,
                                { className: "mr-2 h-4 w-4 h-3 w-3" },
                              ),
                            }),
                          ],
                        }),
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      variant: "ghost",
                      size: "sm",
                      asChild: true,
                      children: (0, jsx_runtime_1.jsx)(
                        react_router_dom_1.Link,
                        {
                          to: "/dashboard/".concat(
                            rec.type === "strategy"
                              ? "strategies"
                              : rec.type === "campaign"
                                ? "campaigns"
                                : "calls",
                          ),
                          children: "View Details",
                        },
                      ),
                    }),
                  ],
                }),
              ],
            },
            index,
          );
        }),
      }),
    ],
  });
};
exports.default = AiRecommendations;
