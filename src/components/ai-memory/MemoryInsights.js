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
exports.default = MemoryInsights;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var useAiMemory_1 = require("@/hooks/useAiMemory");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var AuthContext_1 = require("@/context/AuthContext");
var progress_1 = require("@/components/ui/progress");
var skeleton_1 = require("@/components/ui/skeleton");
var badge_1 = require("@/components/ui/badge");
var useAiModelPreferences_1 = require("@/hooks/useAiModelPreferences");
function MemoryInsights() {
  var _this = this;
  var _a = (0, useAiMemory_1.useAiMemory)(),
    getLearningInsights = _a.getLearningInsights,
    recentMemories = _a.recentMemories;
  var user = (0, AuthContext_1.useAuth)().user;
  var preferences = (0, useAiModelPreferences_1.useAiModelPreferences)()
    .preferences;
  var _b = (0, react_1.useState)(null),
    insights = _b[0],
    setInsights = _b[1];
  var _c = (0, react_1.useState)(false),
    isLoading = _c[0],
    setIsLoading = _c[1];
  var fetchInsights = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var data, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!user) return [2 /*return*/];
            setIsLoading(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [4 /*yield*/, getLearningInsights()];
          case 2:
            data = _a.sent();
            setInsights(data);
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            console.error("Error fetching learning insights:", error_1);
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
  (0, react_1.useEffect)(
    function () {
      fetchInsights();
    },
    [user],
  );
  if (!user) return null;
  // Calculate learning effectiveness if data is available
  var learningEffectiveness = insights
    ? Math.min(
        100,
        Math.round(
          (insights.positiveInteractions /
            (insights.positiveInteractions + insights.negativeInteractions ||
              1)) *
            100,
        ),
      )
    : 0;
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        className: "pb-3",
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "flex justify-between items-start",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                  className: "text-base flex items-center gap-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Brain, {
                      className: "h-4 w-4",
                    }),
                    "AI Memory Insights",
                  ],
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                  children:
                    "How the AI system is learning from your interactions",
                }),
              ],
            }),
            (
              preferences === null || preferences === void 0
                ? void 0
                : preferences.enableLearning
            )
              ? (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                  variant: "outline",
                  className: "bg-green-50 text-green-700 border-green-200",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Zap, {
                      className: "h-3 w-3 mr-1",
                    }),
                    "Learning Active",
                  ],
                })
              : (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                  variant: "outline",
                  className: "bg-amber-50 text-amber-700 border-amber-200",
                  children: "Learning Disabled",
                }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        className: "space-y-4",
        children: isLoading
          ? (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-3",
              children: [
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-20 w-full",
                }),
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-16 w-full",
                }),
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-16 w-full",
                }),
              ],
            })
          : insights
            ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "grid grid-cols-2 gap-3",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "p-3 border rounded-md",
                        children: [
                          (0, jsx_runtime_1.jsxs)("div", {
                            className:
                              "flex items-center gap-2 text-sm font-medium mb-1",
                            children: [
                              (0, jsx_runtime_1.jsx)(lucide_react_1.BarChart, {
                                className: "h-4 w-4 text-blue-500",
                              }),
                              "Total Interactions",
                            ],
                          }),
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "text-2xl font-bold",
                            children:
                              insights.positiveInteractions +
                                insights.negativeInteractions || 0,
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "p-3 border rounded-md",
                        children: [
                          (0, jsx_runtime_1.jsxs)("div", {
                            className:
                              "flex items-center gap-2 text-sm font-medium mb-1",
                            children: [
                              (0, jsx_runtime_1.jsx)(
                                lucide_react_1.TrendingUp,
                                { className: "h-4 w-4 text-green-500" },
                              ),
                              "Learning Effectiveness",
                            ],
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex flex-col gap-1",
                            children: [
                              (0, jsx_runtime_1.jsxs)("span", {
                                className: "text-xl font-bold",
                                children: [learningEffectiveness, "%"],
                              }),
                              (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                                value: learningEffectiveness,
                                className: "h-2",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "grid grid-cols-2 gap-3",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "p-3 border rounded-md",
                        children: [
                          (0, jsx_runtime_1.jsxs)("div", {
                            className:
                              "flex items-center gap-2 text-sm font-medium mb-1",
                            children: [
                              (0, jsx_runtime_1.jsx)(lucide_react_1.ThumbsUp, {
                                className: "h-4 w-4 text-green-500",
                              }),
                              "Positive Feedback",
                            ],
                          }),
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "text-xl font-bold text-green-600",
                            children: insights.positiveInteractions || 0,
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "p-3 border rounded-md",
                        children: [
                          (0, jsx_runtime_1.jsxs)("div", {
                            className:
                              "flex items-center gap-2 text-sm font-medium mb-1",
                            children: [
                              (0, jsx_runtime_1.jsx)(
                                lucide_react_1.ThumbsDown,
                                { className: "h-4 w-4 text-red-500" },
                              ),
                              "Areas for Improvement",
                            ],
                          }),
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "text-xl font-bold text-red-600",
                            children: insights.negativeInteractions || 0,
                          }),
                        ],
                      }),
                    ],
                  }),
                  insights.topTopics &&
                    insights.topTopics.length > 0 &&
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "p-3 border rounded-md",
                      children: [
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "text-sm font-medium mb-2",
                          children: "Top Learning Topics",
                        }),
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "flex flex-wrap gap-2",
                          children: insights.topTopics.map(function (topic, i) {
                            return (0, jsx_runtime_1.jsx)(
                              badge_1.Badge,
                              {
                                variant: "secondary",
                                className: "bg-blue-50 text-blue-700",
                                children: topic,
                              },
                              i,
                            );
                          }),
                        }),
                      ],
                    }),
                  insights.positiveTopic &&
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "p-3 border rounded-md bg-green-50",
                      children: [
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "text-sm font-medium mb-1 text-green-700",
                          children: "Strongest Knowledge Area",
                        }),
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "text-base text-green-800",
                          children: insights.positiveTopic,
                        }),
                      ],
                    }),
                  insights.negativeTopic &&
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "p-3 border rounded-md bg-amber-50",
                      children: [
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "text-sm font-medium mb-1 text-amber-700",
                          children: "Focus Area for Improvement",
                        }),
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "text-base text-amber-800",
                          children: insights.negativeTopic,
                        }),
                      ],
                    }),
                ],
              })
            : (0, jsx_runtime_1.jsx)("div", {
                className: "text-center py-3 text-muted-foreground",
                children:
                  "No learning insights available yet. Continue interacting with the AI advisors to generate insights.",
              }),
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
        children: [
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "ghost",
            size: "sm",
            onClick: fetchInsights,
            disabled: isLoading,
            className: "mr-2",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Database, {
                className: "h-4 w-4 mr-2",
              }),
              "Refresh Insights",
            ],
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "outline",
            size: "sm",
            disabled:
              isLoading ||
              !(preferences === null || preferences === void 0
                ? void 0
                : preferences.enableLearning),
            onClick: function () {
              return window.open("/dashboard/ai-settings", "_self");
            },
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Brain, {
                className: "h-4 w-4 mr-2",
              }),
              "Manage Learning",
            ],
          }),
        ],
      }),
    ],
  });
}
