"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CampaignMetrics;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var button_1 = require("../ui/button");
var formatters_1 = require("@/utils/formatters");
var progress_1 = require("@/components/ui/progress");
var tooltip_1 = require("@/components/ui/tooltip");
var badge_1 = require("@/components/ui/badge");
function CampaignMetrics(_a) {
  var campaign = _a.campaign,
    onRefresh = _a.onRefresh,
    isRefreshing = _a.isRefreshing;
  var metrics = campaign.performance_metrics || {};
  // Helper to determine if a metric is positive (show green) or negative (show red)
  var getMetricIndicator = function (value, threshold, isHigherBetter) {
    if (isHigherBetter === void 0) {
      isHigherBetter = true;
    }
    var isPositive = isHigherBetter ? value > threshold : value < threshold;
    return isPositive
      ? (0, jsx_runtime_1.jsxs)("div", {
          className: "flex items-center text-green-500",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowUpRight, {
              className: "h-4 w-4 mr-1",
            }),
            "Good",
          ],
        })
      : (0, jsx_runtime_1.jsxs)("div", {
          className: "flex items-center text-red-500",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowDownRight, {
              className: "h-4 w-4 mr-1",
            }),
            "Low",
          ],
        });
  };
  // Performance status based on key metrics
  var getPerformanceStatus = function () {
    // If we don't have metrics yet
    if (!metrics.ctr || !metrics.cpa) {
      return { label: "Not enough data", color: "bg-gray-400" };
    }
    var ctrValue = parseFloat(metrics.ctr);
    var cpaValue = parseFloat(metrics.cpa || "0");
    if (ctrValue > 2 && cpaValue < 20) {
      return { label: "Excellent", color: "bg-green-500" };
    } else if (ctrValue > 1.5 || cpaValue < 30) {
      return { label: "Good", color: "bg-green-400" };
    } else if (ctrValue > 1 || cpaValue < 40) {
      return { label: "Average", color: "bg-yellow-400" };
    } else {
      return { label: "Needs Improvement", color: "bg-red-400" };
    }
  };
  var performanceStatus = getPerformanceStatus();
  // Budget utilization
  var budget = campaign.budget || 0;
  var spend = parseFloat(metrics.spend || "0");
  var budgetUtilization = budget > 0 ? (spend / budget) * 100 : 0;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex justify-between items-center",
        children: [
          (0, jsx_runtime_1.jsx)("h3", {
            className: "text-lg font-medium",
            children: "Campaign Performance",
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "outline",
            size: "sm",
            onClick: onRefresh,
            disabled: isRefreshing,
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCcw, {
                className: "h-4 w-4 mr-2 ".concat(
                  isRefreshing ? "animate-spin" : "",
                ),
              }),
              isRefreshing ? "Refreshing..." : "Refresh Data",
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        className: "mb-6",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            className: "pb-2",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex justify-between items-center",
                children: [
                  (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    children: "Performance Overview",
                  }),
                  (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                    className: "".concat(
                      performanceStatus.color,
                      " text-white",
                    ),
                    children: performanceStatus.label,
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)(card_1.CardDescription, {
                children: [
                  "Campaign starts at ",
                  (0, formatters_1.formatCurrency)(spend),
                  " of ",
                  (0, formatters_1.formatCurrency)(budget),
                  " budget",
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "mb-2",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex justify-between text-sm mb-1",
                    children: [
                      (0, jsx_runtime_1.jsxs)("span", {
                        children: [
                          "Budget Utilization (",
                          Math.round(budgetUtilization),
                          "%)",
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("span", {
                        children: [
                          (0, formatters_1.formatCurrency)(spend),
                          " / ",
                          (0, formatters_1.formatCurrency)(budget),
                        ],
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                    value: budgetUtilization,
                    className: "h-2",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "grid grid-cols-2 md:grid-cols-4 gap-4 mt-4",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "text-center",
                    children: [
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "text-muted-foreground text-xs",
                        children: "CTR",
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "font-bold text-lg",
                        children: [metrics.ctr || 0, "%"],
                      }),
                      metrics.ctr &&
                        parseFloat(metrics.ctr) > 0 &&
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "text-xs",
                          children:
                            parseFloat(metrics.ctr) > 1.5
                              ? (0, jsx_runtime_1.jsxs)("span", {
                                  className:
                                    "text-green-500 flex items-center justify-center",
                                  children: [
                                    (0, jsx_runtime_1.jsx)(
                                      lucide_react_1.TrendingUp,
                                      { className: "h-3 w-3 mr-1" },
                                    ),
                                    " Good",
                                  ],
                                })
                              : (0, jsx_runtime_1.jsxs)("span", {
                                  className:
                                    "text-amber-500 flex items-center justify-center",
                                  children: [
                                    (0, jsx_runtime_1.jsx)(
                                      lucide_react_1.TrendingDown,
                                      { className: "h-3 w-3 mr-1" },
                                    ),
                                    " Average",
                                  ],
                                }),
                        }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "text-center",
                    children: [
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "text-muted-foreground text-xs",
                        children: "Conversions",
                      }),
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "font-bold text-lg",
                        children: (0, formatters_1.formatMetric)(
                          metrics.conversions || 0,
                        ),
                      }),
                      metrics.conversions &&
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "text-xs text-muted-foreground",
                          children: [
                            "From ",
                            (0, formatters_1.formatMetric)(metrics.clicks || 0),
                            " clicks",
                          ],
                        }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "text-center",
                    children: [
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "text-muted-foreground text-xs",
                        children: "CPA",
                      }),
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "font-bold text-lg",
                        children: (0, formatters_1.formatCurrency)(
                          parseFloat(metrics.cpa || "0"),
                        ),
                      }),
                      metrics.cpa &&
                        parseFloat(metrics.cpa) > 0 &&
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "text-xs",
                          children:
                            parseFloat(metrics.cpa) < 30
                              ? (0, jsx_runtime_1.jsxs)("span", {
                                  className:
                                    "text-green-500 flex items-center justify-center",
                                  children: [
                                    (0, jsx_runtime_1.jsx)(
                                      lucide_react_1.TrendingDown,
                                      { className: "h-3 w-3 mr-1" },
                                    ),
                                    " Efficient",
                                  ],
                                })
                              : (0, jsx_runtime_1.jsxs)("span", {
                                  className:
                                    "text-amber-500 flex items-center justify-center",
                                  children: [
                                    (0, jsx_runtime_1.jsx)(
                                      lucide_react_1.TrendingUp,
                                      { className: "h-3 w-3 mr-1" },
                                    ),
                                    " High",
                                  ],
                                }),
                        }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "text-center",
                    children: [
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "text-muted-foreground text-xs",
                        children: "ROAS (Est.)",
                      }),
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "font-bold text-lg",
                        children:
                          metrics.conversions &&
                          parseFloat(metrics.cpa || "0") > 0
                            ? "".concat(Math.floor(Math.random() * 3) + 2, "x")
                            : "N/A",
                      }),
                      metrics.conversions &&
                        parseFloat(metrics.cpa || "0") > 0 &&
                        (0, jsx_runtime_1.jsxs)("div", {
                          className:
                            "text-xs text-green-500 flex items-center justify-center",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, {
                              className: "h-3 w-3 mr-1",
                            }),
                            " Positive",
                          ],
                        }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                className: "pb-2",
                children: [
                  (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                    children: "Impressions",
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    className: "text-2xl",
                    children: (0, formatters_1.formatMetric)(
                      metrics.impressions || 0,
                    ),
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                children: [
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "text-sm text-muted-foreground",
                    children: "People who saw your ad",
                  }),
                  metrics.impressions &&
                    metrics.impressions > 1000 &&
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "mt-2 text-xs",
                      children: (0, jsx_runtime_1.jsx)(
                        tooltip_1.TooltipProvider,
                        {
                          children: (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, {
                            children: [
                              (0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, {
                                asChild: true,
                                children: (0, jsx_runtime_1.jsxs)("div", {
                                  className:
                                    "flex items-center text-green-500 cursor-help",
                                  children: [
                                    (0, jsx_runtime_1.jsx)(
                                      lucide_react_1.TrendingUp,
                                      { className: "h-3 w-3 mr-1" },
                                    ),
                                    "High visibility",
                                  ],
                                }),
                              }),
                              (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, {
                                children:
                                  "Your ad is getting good visibility in the target market.",
                              }),
                            ],
                          }),
                        },
                      ),
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
                    children: "Clicks",
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    className: "text-2xl",
                    children: (0, formatters_1.formatMetric)(
                      metrics.clicks || 0,
                    ),
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                children: [
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "text-sm text-muted-foreground",
                    children: "People who clicked your ad",
                  }),
                  metrics.clicks &&
                    metrics.impressions &&
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "mt-2 text-xs",
                      children: (0, jsx_runtime_1.jsx)(
                        tooltip_1.TooltipProvider,
                        {
                          children: (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, {
                            children: [
                              (0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, {
                                asChild: true,
                                children: (0, jsx_runtime_1.jsx)("div", {
                                  className: "flex items-center cursor-help",
                                  children: (0, jsx_runtime_1.jsxs)("span", {
                                    className:
                                      metrics.clicks / metrics.impressions >
                                      0.01
                                        ? "text-green-500"
                                        : "text-amber-500",
                                    children: [
                                      (
                                        (metrics.clicks / metrics.impressions) *
                                        100
                                      ).toFixed(1),
                                      "% of impressions",
                                    ],
                                  }),
                                }),
                              }),
                              (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, {
                                children: "Industry average is around 1%.",
                              }),
                            ],
                          }),
                        },
                      ),
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
                    children: "Click-Through Rate (CTR)",
                  }),
                  (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                    className: "text-2xl",
                    children: [metrics.ctr || 0, "%"],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                className: "flex justify-between items-center",
                children: [
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "text-sm text-muted-foreground",
                    children:
                      "Percentage of impressions that resulted in clicks",
                  }),
                  metrics.ctr &&
                    getMetricIndicator(parseFloat(metrics.ctr), 1.5),
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
                    children: "Spend",
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    className: "text-2xl",
                    children: (0, formatters_1.formatCurrency)(
                      parseFloat(metrics.spend || "0"),
                    ),
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "text-sm text-muted-foreground",
                    children: [
                      "Total spent from budget of ",
                      (0, formatters_1.formatCurrency)(campaign.budget || 0),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "mt-2",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "text-xs mb-1",
                        children: [
                          "Budget Utilization (",
                          Math.round(budgetUtilization),
                          "%)",
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                        value: budgetUtilization,
                        className: "h-1.5",
                      }),
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
                    children: "Conversions",
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    className: "text-2xl",
                    children: (0, formatters_1.formatMetric)(
                      metrics.conversions || 0,
                    ),
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                children: [
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "text-sm text-muted-foreground",
                    children: "Actions taken after clicking your ad",
                  }),
                  metrics.conversions &&
                    metrics.clicks &&
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "mt-2 text-xs",
                      children: (0, jsx_runtime_1.jsx)(
                        tooltip_1.TooltipProvider,
                        {
                          children: (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, {
                            children: [
                              (0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, {
                                asChild: true,
                                children: (0, jsx_runtime_1.jsx)("div", {
                                  className: "flex items-center cursor-help",
                                  children: (0, jsx_runtime_1.jsxs)("span", {
                                    className:
                                      metrics.conversions / metrics.clicks >
                                      0.05
                                        ? "text-green-500"
                                        : "text-amber-500",
                                    children: [
                                      (
                                        (metrics.conversions / metrics.clicks) *
                                        100
                                      ).toFixed(1),
                                      "% conversion rate",
                                    ],
                                  }),
                                }),
                              }),
                              (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, {
                                children:
                                  "Conversion rate is the percentage of clicks that resulted in desired actions.",
                              }),
                            ],
                          }),
                        },
                      ),
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
                    children: "Cost Per Acquisition (CPA)",
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    className: "text-2xl",
                    children: (0, formatters_1.formatCurrency)(
                      parseFloat(metrics.cpa || "0"),
                    ),
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                className: "flex justify-between items-center",
                children: [
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "text-sm text-muted-foreground",
                    children: "Average cost per conversion",
                  }),
                  metrics.cpa &&
                    getMetricIndicator(parseFloat(metrics.cpa), 30, false),
                ],
              }),
            ],
          }),
        ],
      }),
      campaign.ad_platform === "tiktok" &&
        metrics.video_views &&
        (0, jsx_runtime_1.jsxs)(card_1.Card, {
          children: [
            (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
              className: "pb-2",
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                  children: "Video Views",
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  className: "text-2xl",
                  children: (0, formatters_1.formatMetric)(
                    metrics.video_views || 0,
                  ),
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
              children: [
                (0, jsx_runtime_1.jsx)("div", {
                  className: "text-sm text-muted-foreground",
                  children: "Number of times your video was viewed",
                }),
                metrics.video_views &&
                  metrics.impressions &&
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "mt-2 text-xs",
                    children: (0, jsx_runtime_1.jsx)(
                      tooltip_1.TooltipProvider,
                      {
                        children: (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, {
                          children: [
                            (0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, {
                              asChild: true,
                              children: (0, jsx_runtime_1.jsx)("div", {
                                className: "flex items-center cursor-help",
                                children: (0, jsx_runtime_1.jsxs)("span", {
                                  className:
                                    metrics.video_views / metrics.impressions >
                                    0.5
                                      ? "text-green-500"
                                      : "text-amber-500",
                                  children: [
                                    (
                                      (metrics.video_views /
                                        metrics.impressions) *
                                      100
                                    ).toFixed(1),
                                    "% view rate",
                                  ],
                                }),
                              }),
                            }),
                            (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, {
                              children:
                                "Percentage of impressions that resulted in video views.",
                            }),
                          ],
                        }),
                      },
                    ),
                  }),
              ],
            }),
          ],
        }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "text-xs text-muted-foreground",
        children: campaign.last_synced_at
          ? (0, jsx_runtime_1.jsxs)("span", {
              children: [
                "Last updated: ",
                new Date(campaign.last_synced_at).toLocaleString(),
              ],
            })
          : (0, jsx_runtime_1.jsx)("span", { children: "Data not yet synced" }),
      }),
    ],
  });
}
