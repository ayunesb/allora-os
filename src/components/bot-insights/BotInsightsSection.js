"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BotInsightsSection;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var tabs_1 = require("@/components/ui/tabs");
var BotInsightCard_1 = require("./BotInsightCard");
var useCompanyInsights_1 = require("@/hooks/useCompanyInsights");
var InsightDetailsDialog_1 = require("./InsightDetailsDialog");
var skeleton_1 = require("@/components/ui/skeleton");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var react_router_dom_1 = require("react-router-dom");
function BotInsightsSection() {
  var _a = (0, useCompanyInsights_1.useCompanyInsights)(),
    insights = _a.insights,
    isLoading = _a.isLoading,
    error = _a.error;
  var _b = (0, react_1.useState)(null),
    selectedInsight = _b[0],
    setSelectedInsight = _b[1];
  var _c = (0, react_1.useState)(false),
    detailsOpen = _c[0],
    setDetailsOpen = _c[1];
  var _d = (0, react_1.useState)("all"),
    activeTab = _d[0],
    setActiveTab = _d[1];
  // Handle viewing insight details
  var handleViewDetails = function (insight) {
    setSelectedInsight(insight);
    setDetailsOpen(true);
  };
  // Filter insights based on active tab
  var getFilteredInsights = function () {
    if (activeTab === "all") return insights;
    return insights.filter(function (insight) {
      return insight.type === activeTab;
    });
  };
  // Loading skeletons
  if (isLoading) {
    return (0, jsx_runtime_1.jsxs)("div", {
      className: "space-y-6",
      children: [
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex items-center gap-4",
          children: [
            (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
              className: "h-10 w-40",
            }),
            (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
              className: "h-10 w-48",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)("div", {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
          children: [1, 2, 3].map(function (i) {
            return (0, jsx_runtime_1.jsx)(
              skeleton_1.Skeleton,
              { className: "h-64 w-full" },
              i,
            );
          }),
        }),
      ],
    });
  }
  // Error state
  if (error) {
    return (0, jsx_runtime_1.jsxs)(card_1.Card, {
      className: "border-destructive/50",
      children: [
        (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
          className: "text-destructive",
          children: "Error loading insights",
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
          children: (0, jsx_runtime_1.jsx)("p", {
            className: "text-sm",
            children:
              "We encountered a problem while generating insights. Please try again later.",
          }),
        }),
      ],
    });
  }
  // No insights available
  if (insights.length === 0) {
    return (0, jsx_runtime_1.jsx)(card_1.Card, {
      className: "border-dotted",
      children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className:
          "flex flex-col items-center justify-center py-10 text-center",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.BadgeInfo, {
            className: "h-10 w-10 text-muted-foreground mb-4",
          }),
          (0, jsx_runtime_1.jsx)("h3", {
            className: "text-lg font-medium mb-2",
            children: "No AI insights available",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-muted-foreground max-w-md mb-4",
            children:
              "To generate executive advisor insights, please complete your company details in your profile.",
          }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            asChild: true,
            children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
              to: "/dashboard/profile",
              children: "Update Company Information",
            }),
          }),
        ],
      }),
    });
  }
  var filteredInsights = getFilteredInsights();
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
        value: activeTab,
        onValueChange: setActiveTab,
        children: [
          (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
            children: [
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "all",
                children: "All Insights",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "strategy",
                children: "Strategies",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "campaign",
                children: "Campaigns",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "call_script",
                children: "Call Scripts",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: activeTab,
            className: "mt-6",
            children:
              filteredInsights.length === 0
                ? (0, jsx_runtime_1.jsx)(card_1.Card, {
                    children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                      className:
                        "flex flex-col items-center justify-center py-10 text-center",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.BadgeInfo, {
                          className: "h-10 w-10 text-muted-foreground mb-4",
                        }),
                        (0, jsx_runtime_1.jsx)("h3", {
                          className: "text-lg font-medium mb-2",
                          children: "No insights found",
                        }),
                        (0, jsx_runtime_1.jsxs)("p", {
                          className: "text-muted-foreground max-w-md",
                          children: [
                            "We couldn't find any ",
                            activeTab !== "all" ? activeTab + " " : "",
                            "insights. Try selecting a different filter.",
                          ],
                        }),
                      ],
                    }),
                  })
                : (0, jsx_runtime_1.jsx)("div", {
                    className:
                      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                    children: filteredInsights.map(function (insight) {
                      return (0, jsx_runtime_1.jsx)(
                        BotInsightCard_1.default,
                        { insight: insight, onViewDetails: handleViewDetails },
                        insight.id,
                      );
                    }),
                  }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(InsightDetailsDialog_1.default, {
        insight: selectedInsight,
        open: detailsOpen,
        onOpenChange: setDetailsOpen,
      }),
    ],
  });
}
