"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var ImplementationTabContent = function (_a) {
  var strategyId = _a.strategyId,
    activeTab = _a.activeTab;
  // Content based on active tab
  var renderContent = function () {
    switch (activeTab) {
      case "overview":
        return (0, jsx_runtime_1.jsx)(OverviewTab, { strategyId: strategyId });
      case "timeline":
        return (0, jsx_runtime_1.jsx)(TimelineTab, { strategyId: strategyId });
      case "roi":
        return (0, jsx_runtime_1.jsx)(RoiTab, { strategyId: strategyId });
      case "resources":
        return (0, jsx_runtime_1.jsx)(ResourcesTab, { strategyId: strategyId });
      default:
        return (0, jsx_runtime_1.jsx)("div", {
          children: "Select a tab to view implementation details",
        });
    }
  };
  return (0, jsx_runtime_1.jsx)("div", {
    className: "mt-4",
    children: renderContent(),
  });
};
// Tab components
var OverviewTab = function (_a) {
  var strategyId = _a.strategyId;
  return (0, jsx_runtime_1.jsx)(card_1.Card, {
    children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
      className: "pt-6",
      children: [
        (0, jsx_runtime_1.jsx)("h3", {
          className: "text-lg font-medium mb-2",
          children: "Implementation Overview",
        }),
        (0, jsx_runtime_1.jsx)("p", {
          className: "text-muted-foreground",
          children:
            "This section provides a high-level overview of the strategy implementation plan.",
        }),
      ],
    }),
  });
};
var TimelineTab = function (_a) {
  var strategyId = _a.strategyId;
  return (0, jsx_runtime_1.jsx)(card_1.Card, {
    children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
      className: "pt-6",
      children: [
        (0, jsx_runtime_1.jsx)("h3", {
          className: "text-lg font-medium mb-2",
          children: "Implementation Timeline",
        }),
        (0, jsx_runtime_1.jsx)("p", {
          className: "text-muted-foreground",
          children:
            "View the timeline and milestones for this strategy implementation.",
        }),
      ],
    }),
  });
};
var RoiTab = function (_a) {
  var strategyId = _a.strategyId;
  return (0, jsx_runtime_1.jsx)(card_1.Card, {
    children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
      className: "pt-6",
      children: [
        (0, jsx_runtime_1.jsx)("h3", {
          className: "text-lg font-medium mb-2",
          children: "ROI Tracking",
        }),
        (0, jsx_runtime_1.jsx)("p", {
          className: "text-muted-foreground",
          children: "Track the return on investment for this strategy.",
        }),
      ],
    }),
  });
};
var ResourcesTab = function (_a) {
  var strategyId = _a.strategyId;
  return (0, jsx_runtime_1.jsx)(card_1.Card, {
    children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
      className: "pt-6",
      children: [
        (0, jsx_runtime_1.jsx)("h3", {
          className: "text-lg font-medium mb-2",
          children: "Resources & Documents",
        }),
        (0, jsx_runtime_1.jsx)("p", {
          className: "text-muted-foreground",
          children: "Access resources and documents related to this strategy.",
        }),
      ],
    }),
  });
};
exports.default = ImplementationTabContent;
