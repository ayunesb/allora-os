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
exports.default = ShopifyOptimizationDashboard;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var shopifyOptimization_1 = require("@/utils/shopifyOptimization");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var tabs_1 = require("@/components/ui/tabs");
var progress_1 = require("@/components/ui/progress");
var lucide_react_1 = require("lucide-react");
function ShopifyOptimizationDashboard(_a) {
  var _this = this;
  var storeId = _a.storeId;
  var _b = (0, react_1.useState)(null),
    report = _b[0],
    setReport = _b[1];
  var _c = (0, react_1.useState)(true),
    isLoading = _c[0],
    setIsLoading = _c[1];
  var _d = (0, react_1.useState)(null),
    implementing = _d[0],
    setImplementing = _d[1];
  (0, react_1.useEffect)(
    function () {
      loadReport();
    },
    [storeId],
  );
  var loadReport = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var reportData;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setIsLoading(true);
            return [
              4 /*yield*/,
              (0, shopifyOptimization_1.analyzeShopifyStore)(storeId),
            ];
          case 1:
            reportData = _a.sent();
            if (reportData) {
              setReport(reportData);
            }
            setIsLoading(false);
            return [2 /*return*/];
        }
      });
    });
  };
  var handleImplement = function (recommendationId) {
    return __awaiter(_this, void 0, void 0, function () {
      var success, updatedRecommendations;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setImplementing(recommendationId);
            return [
              4 /*yield*/,
              (0, shopifyOptimization_1.implementOptimization)(
                storeId,
                recommendationId,
              ),
            ];
          case 1:
            success = _a.sent();
            if (success && report) {
              updatedRecommendations = report.recommendations.map(
                function (rec) {
                  if (rec.id === recommendationId) {
                    return __assign(__assign({}, rec), { implemented: true });
                  }
                  return rec;
                },
              );
              setReport(
                __assign(__assign({}, report), {
                  recommendations: updatedRecommendations,
                }),
              );
            }
            setImplementing(null);
            return [2 /*return*/];
        }
      });
    });
  };
  var getImpactColor = function (impact) {
    switch (impact) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-amber-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };
  var getEffortColor = function (effort) {
    switch (effort) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-amber-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };
  var getCategoryBadge = function (category) {
    switch (category) {
      case "seo":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          variant: "outline",
          className: "bg-blue-50",
          children: "SEO",
        });
      case "product":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          variant: "outline",
          className: "bg-green-50",
          children: "Product",
        });
      case "checkout":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          variant: "outline",
          className: "bg-purple-50",
          children: "Checkout",
        });
      case "design":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          variant: "outline",
          className: "bg-indigo-50",
          children: "Design",
        });
      case "performance":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          variant: "outline",
          className: "bg-amber-50",
          children: "Performance",
        });
      case "marketing":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          variant: "outline",
          className: "bg-pink-50",
          children: "Marketing",
        });
      default:
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          variant: "outline",
          children: category,
        });
    }
  };
  if (isLoading) {
    return (0, jsx_runtime_1.jsxs)("div", {
      className: "p-6",
      children: [
        (0, jsx_runtime_1.jsx)("div", {
          className: "flex justify-between items-center mb-6",
          children: (0, jsx_runtime_1.jsx)("h2", {
            className: "text-2xl font-bold",
            children: "Shopify Store Optimization",
          }),
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
          children: [
            (0, jsx_runtime_1.jsxs)(card_1.Card, {
              className: "animate-pulse",
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                  className: "pb-2",
                  children: (0, jsx_runtime_1.jsx)("div", {
                    className: "h-6 bg-gray-200 rounded w-1/2",
                  }),
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  children: (0, jsx_runtime_1.jsx)("div", {
                    className: "h-20 bg-gray-200 rounded",
                  }),
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(card_1.Card, {
              className: "animate-pulse",
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                  className: "pb-2",
                  children: (0, jsx_runtime_1.jsx)("div", {
                    className: "h-6 bg-gray-200 rounded w-1/2",
                  }),
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  children: (0, jsx_runtime_1.jsx)("div", {
                    className: "h-20 bg-gray-200 rounded",
                  }),
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(card_1.Card, {
              className: "animate-pulse",
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                  className: "pb-2",
                  children: (0, jsx_runtime_1.jsx)("div", {
                    className: "h-6 bg-gray-200 rounded w-1/2",
                  }),
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  children: (0, jsx_runtime_1.jsx)("div", {
                    className: "h-20 bg-gray-200 rounded",
                  }),
                }),
              ],
            }),
          ],
        }),
      ],
    });
  }
  if (!report) {
    return (0, jsx_runtime_1.jsx)("div", {
      className: "p-6",
      children: (0, jsx_runtime_1.jsxs)("div", {
        className: "text-center py-12",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
            className: "h-12 w-12 text-amber-500 mx-auto mb-4",
          }),
          (0, jsx_runtime_1.jsx)("h3", {
            className: "text-xl font-semibold mb-2",
            children: "Store Analysis Failed",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-gray-500 mb-6",
            children:
              "We couldn't analyze your Shopify store. Please check your connection.",
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            onClick: loadReport,
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                className: "h-4 w-4 mr-2",
              }),
              "Try Again",
            ],
          }),
        ],
      }),
    });
  }
  var implementedCount = report.recommendations.filter(function (rec) {
    return rec.implemented;
  }).length;
  var totalCount = report.recommendations.length;
  var percentageComplete =
    totalCount > 0 ? (implementedCount / totalCount) * 100 : 0;
  // Group recommendations by category
  var categorizedRecommendations = {};
  report.recommendations.forEach(function (rec) {
    if (!categorizedRecommendations[rec.category]) {
      categorizedRecommendations[rec.category] = [];
    }
    categorizedRecommendations[rec.category].push(rec);
  });
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "p-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex justify-between items-center mb-6",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("h2", {
                className: "text-2xl font-bold",
                children: "Shopify Store Optimization",
              }),
              (0, jsx_runtime_1.jsxs)("p", {
                className: "text-gray-500",
                children: [
                  "Last analyzed: ",
                  new Date(report.lastUpdated).toLocaleString(),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            onClick: loadReport,
            variant: "outline",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                className: "h-4 w-4 mr-2",
              }),
              "Refresh Analysis",
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                className: "pb-2",
                children: [
                  (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                    children: "Store Health Score",
                  }),
                  (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                    className: "text-3xl",
                    children: [report.score, "/100"],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                children: [
                  (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                    value: report.score,
                    className: "h-2 mt-2",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm mt-2",
                    children:
                      report.score >= 80
                        ? "Excellent"
                        : report.score >= 60
                          ? "Good"
                          : report.score >= 40
                            ? "Needs Improvement"
                            : "Critical Issues",
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                className: "pb-2",
                children: [
                  (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                    children: "Optimizations Implemented",
                  }),
                  (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                    className: "text-3xl",
                    children: [implementedCount, "/", totalCount],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                children: [
                  (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                    value: percentageComplete,
                    className: "h-2 mt-2",
                  }),
                  (0, jsx_runtime_1.jsxs)("p", {
                    className: "text-sm mt-2",
                    children: [
                      percentageComplete,
                      "% of recommendations completed",
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                className: "pb-2",
                children: [
                  (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                    children: "High Impact Issues",
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    className: "text-3xl",
                    children: report.recommendations.filter(function (rec) {
                      return rec.impact === "high" && !rec.implemented;
                    }).length,
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
                      className: "h-5 w-5 text-amber-500 mr-2",
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-sm",
                      children:
                        report.recommendations.filter(function (rec) {
                          return rec.impact === "high" && !rec.implemented;
                        }).length > 0
                          ? "Critical issues need attention"
                          : "No critical issues found",
                    }),
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
        defaultValue: "all",
        className: "w-full",
        children: [
          (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
            className: "mb-6",
            children: [
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "all",
                children: "All Recommendations",
              }),
              Object.keys(categorizedRecommendations).map(function (category) {
                return (0, jsx_runtime_1.jsx)(
                  tabs_1.TabsTrigger,
                  {
                    value: category,
                    children:
                      category.charAt(0).toUpperCase() + category.slice(1),
                  },
                  category,
                );
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "all",
            className: "mt-0",
            children: (0, jsx_runtime_1.jsx)("div", {
              className: "grid gap-4",
              children: report.recommendations.map(function (recommendation) {
                return (0, jsx_runtime_1.jsxs)(
                  card_1.Card,
                  {
                    className: recommendation.implemented
                      ? "border-green-200 bg-green-50"
                      : "",
                    children: [
                      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                        className: "pb-2",
                        children: (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex justify-between items-start",
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              children: [
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "flex items-center mb-1",
                                  children: [
                                    getCategoryBadge(recommendation.category),
                                    (0, jsx_runtime_1.jsxs)("span", {
                                      className:
                                        "ml-2 text-xs font-medium ".concat(
                                          getImpactColor(recommendation.impact),
                                        ),
                                      children: [
                                        recommendation.impact.toUpperCase(),
                                        " IMPACT",
                                      ],
                                    }),
                                    (0, jsx_runtime_1.jsxs)("span", {
                                      className:
                                        "ml-2 text-xs font-medium ".concat(
                                          getEffortColor(recommendation.effort),
                                        ),
                                      children: [
                                        recommendation.effort.toUpperCase(),
                                        " EFFORT",
                                      ],
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                                  className: "text-lg flex items-center",
                                  children: [
                                    recommendation.implemented &&
                                      (0, jsx_runtime_1.jsx)(
                                        lucide_react_1.Check,
                                        {
                                          className:
                                            "h-5 w-5 text-green-500 mr-2",
                                        },
                                      ),
                                    recommendation.title,
                                  ],
                                }),
                              ],
                            }),
                            recommendation.automated &&
                              (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                                variant: "outline",
                                className: "bg-blue-50",
                                children: [
                                  (0, jsx_runtime_1.jsx)(lucide_react_1.Zap, {
                                    className: "h-3 w-3 mr-1",
                                  }),
                                  "Automated",
                                ],
                              }),
                          ],
                        }),
                      }),
                      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                        children: (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-gray-500",
                          children: recommendation.description,
                        }),
                      }),
                      (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
                        children: recommendation.implemented
                          ? (0, jsx_runtime_1.jsxs)(button_1.Button, {
                              variant: "ghost",
                              className: "text-green-600",
                              disabled: true,
                              children: [
                                (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
                                  className: "h-4 w-4 mr-2",
                                }),
                                "Implemented",
                              ],
                            })
                          : (0, jsx_runtime_1.jsx)(button_1.Button, {
                              onClick: function () {
                                return handleImplement(recommendation.id);
                              },
                              disabled: implementing === recommendation.id,
                              children:
                                implementing === recommendation.id
                                  ? (0, jsx_runtime_1.jsxs)(
                                      jsx_runtime_1.Fragment,
                                      {
                                        children: [
                                          (0, jsx_runtime_1.jsx)(
                                            lucide_react_1.RefreshCw,
                                            {
                                              className:
                                                "h-4 w-4 mr-2 animate-spin",
                                            },
                                          ),
                                          "Implementing...",
                                        ],
                                      },
                                    )
                                  : (0, jsx_runtime_1.jsxs)(
                                      jsx_runtime_1.Fragment,
                                      {
                                        children: [
                                          (0, jsx_runtime_1.jsx)(
                                            lucide_react_1.ArrowUpRight,
                                            { className: "h-4 w-4 mr-2" },
                                          ),
                                          "Implement ",
                                          recommendation.automated
                                            ? "Automatically"
                                            : "Now",
                                        ],
                                      },
                                    ),
                            }),
                      }),
                    ],
                  },
                  recommendation.id,
                );
              }),
            }),
          }),
          Object.entries(categorizedRecommendations).map(function (_a) {
            var category = _a[0],
              recommendations = _a[1];
            return (0, jsx_runtime_1.jsx)(
              tabs_1.TabsContent,
              {
                value: category,
                className: "mt-0",
                children: (0, jsx_runtime_1.jsx)("div", {
                  className: "grid gap-4",
                  children: recommendations.map(function (recommendation) {
                    return (0, jsx_runtime_1.jsxs)(
                      card_1.Card,
                      {
                        className: recommendation.implemented
                          ? "border-green-200 bg-green-50"
                          : "",
                        children: [
                          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                            className: "pb-2",
                            children: (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex justify-between items-start",
                              children: [
                                (0, jsx_runtime_1.jsxs)("div", {
                                  children: [
                                    (0, jsx_runtime_1.jsxs)("div", {
                                      className: "flex items-center mb-1",
                                      children: [
                                        getCategoryBadge(
                                          recommendation.category,
                                        ),
                                        (0, jsx_runtime_1.jsxs)("span", {
                                          className:
                                            "ml-2 text-xs font-medium ".concat(
                                              getImpactColor(
                                                recommendation.impact,
                                              ),
                                            ),
                                          children: [
                                            recommendation.impact.toUpperCase(),
                                            " IMPACT",
                                          ],
                                        }),
                                        (0, jsx_runtime_1.jsxs)("span", {
                                          className:
                                            "ml-2 text-xs font-medium ".concat(
                                              getEffortColor(
                                                recommendation.effort,
                                              ),
                                            ),
                                          children: [
                                            recommendation.effort.toUpperCase(),
                                            " EFFORT",
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                                      className: "text-lg flex items-center",
                                      children: [
                                        recommendation.implemented &&
                                          (0, jsx_runtime_1.jsx)(
                                            lucide_react_1.Check,
                                            {
                                              className:
                                                "h-5 w-5 text-green-500 mr-2",
                                            },
                                          ),
                                        recommendation.title,
                                      ],
                                    }),
                                  ],
                                }),
                                recommendation.automated &&
                                  (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                                    variant: "outline",
                                    className: "bg-blue-50",
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        lucide_react_1.Zap,
                                        { className: "h-3 w-3 mr-1" },
                                      ),
                                      "Automated",
                                    ],
                                  }),
                              ],
                            }),
                          }),
                          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                            children: (0, jsx_runtime_1.jsx)("p", {
                              className: "text-sm text-gray-500",
                              children: recommendation.description,
                            }),
                          }),
                          (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
                            children: recommendation.implemented
                              ? (0, jsx_runtime_1.jsxs)(button_1.Button, {
                                  variant: "ghost",
                                  className: "text-green-600",
                                  disabled: true,
                                  children: [
                                    (0, jsx_runtime_1.jsx)(
                                      lucide_react_1.Check,
                                      { className: "h-4 w-4 mr-2" },
                                    ),
                                    "Implemented",
                                  ],
                                })
                              : (0, jsx_runtime_1.jsx)(button_1.Button, {
                                  onClick: function () {
                                    return handleImplement(recommendation.id);
                                  },
                                  disabled: implementing === recommendation.id,
                                  children:
                                    implementing === recommendation.id
                                      ? (0, jsx_runtime_1.jsxs)(
                                          jsx_runtime_1.Fragment,
                                          {
                                            children: [
                                              (0, jsx_runtime_1.jsx)(
                                                lucide_react_1.RefreshCw,
                                                {
                                                  className:
                                                    "h-4 w-4 mr-2 animate-spin",
                                                },
                                              ),
                                              "Implementing...",
                                            ],
                                          },
                                        )
                                      : (0, jsx_runtime_1.jsxs)(
                                          jsx_runtime_1.Fragment,
                                          {
                                            children: [
                                              (0, jsx_runtime_1.jsx)(
                                                lucide_react_1.ArrowUpRight,
                                                { className: "h-4 w-4 mr-2" },
                                              ),
                                              "Implement ",
                                              recommendation.automated
                                                ? "Automatically"
                                                : "Now",
                                            ],
                                          },
                                        ),
                                }),
                          }),
                        ],
                      },
                      recommendation.id,
                    );
                  }),
                }),
              },
              category,
            );
          }),
        ],
      }),
    ],
  });
}
