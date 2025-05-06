"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignStats = CampaignStats;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var TikTokIcon_1 = require("@/components/icons/TikTokIcon");
function CampaignStats(_a) {
  var campaigns = _a.campaigns;
  var formatCurrency = function (value) {
    return "$".concat(
      value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    );
  };
  // Helper function to safely access nested properties
  var getMetricValue = function (campaign, metricPath, defaultValue) {
    if (defaultValue === void 0) {
      defaultValue = 0;
    }
    if (!campaign.performance_metrics) return defaultValue;
    var parts = metricPath.split(".");
    var current = campaign.performance_metrics;
    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
      var part = parts_1[_i];
      if (current === undefined || current === null) return defaultValue;
      current = current[part];
    }
    // Convert string to number if needed
    if (typeof current === "string") {
      var parsed = parseFloat(current);
      return isNaN(parsed) ? defaultValue : parsed;
    }
    return typeof current === "number" ? current : defaultValue;
  };
  var totalBudget = campaigns.reduce(function (sum, campaign) {
    return sum + (campaign.budget || 0);
  }, 0);
  var totalActiveSpend = campaigns
    .filter(function (c) {
      return c.deployment_status === "deployed" && c.payment_status === "paid";
    })
    .reduce(function (sum, campaign) {
      var spend = getMetricValue(campaign, "spend");
      return sum + spend;
    }, 0);
  var totalImpressions = campaigns
    .filter(function (c) {
      return c.deployment_status === "deployed" && c.payment_status === "paid";
    })
    .reduce(function (sum, campaign) {
      var impressions = getMetricValue(campaign, "impressions");
      return sum + impressions;
    }, 0);
  var totalClicks = campaigns
    .filter(function (c) {
      return c.deployment_status === "deployed" && c.payment_status === "paid";
    })
    .reduce(function (sum, campaign) {
      var clicks = getMetricValue(campaign, "clicks");
      return sum + clicks;
    }, 0);
  // Handle counting platforms safely
  var countPlatforms = function () {
    var metaCount = campaigns.filter(function (c) {
      return (c.ad_platform || c.platform) === "meta";
    }).length;
    var tiktokCount = campaigns.filter(function (c) {
      return (c.ad_platform || c.platform) === "tiktok";
    }).length;
    return {
      hasMeta: metaCount > 0,
      hasTiktok: tiktokCount > 0,
      metaCount: metaCount,
      tiktokCount: tiktokCount,
    };
  };
  var platforms = countPlatforms();
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            className: "pb-2",
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children: "Total Campaigns",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                className: "text-3xl",
                children: campaigns.length,
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "text-muted-foreground",
              children: [
                campaigns.filter(function (c) {
                  return c.deployment_status === "deployed";
                }).length,
                " active",
              ],
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            className: "pb-2",
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children: "Total Budget",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                className: "text-3xl",
                children: formatCurrency(totalBudget),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "text-muted-foreground",
              children: [formatCurrency(totalActiveSpend), " spent"],
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            className: "pb-2",
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children: "Total Impressions",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                className: "text-3xl",
                children: totalImpressions.toLocaleString(),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "text-muted-foreground",
              children: [totalClicks.toLocaleString(), " clicks"],
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            className: "pb-2",
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children: "Platforms",
              }),
              (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                className: "text-3xl flex gap-2",
                children: [
                  platforms.hasMeta &&
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Facebook, {
                      className: "h-8 w-8 text-blue-600",
                    }),
                  platforms.hasTiktok &&
                    (0, jsx_runtime_1.jsx)(TikTokIcon_1.TikTokIcon, {
                      className: "h-8 w-8",
                    }),
                  !platforms.hasMeta && !platforms.hasTiktok && "None",
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "text-muted-foreground",
              children: [
                platforms.metaCount,
                " Meta,\u00A0",
                platforms.tiktokCount,
                " TikTok",
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
