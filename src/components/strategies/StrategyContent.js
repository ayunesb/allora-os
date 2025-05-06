"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var skeleton_1 = require("@/components/ui/skeleton");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var StrategyCard_1 = require("@/components/strategies/StrategyCard");
var alert_1 = require("@/components/ui/alert");
var StrategyContent = function (_a) {
  var isLoading = _a.isLoading,
    error = _a.error,
    refetch = _a.refetch,
    filteredAndSortedStrategies = _a.filteredAndSortedStrategies,
    searchQuery = _a.searchQuery,
    riskFilter = _a.riskFilter,
    setSearchQuery = _a.setSearchQuery,
    setRiskFilter = _a.setRiskFilter,
    handleNewStrategy = _a.handleNewStrategy,
    handleEditStrategy = _a.handleEditStrategy,
    handleDeleteStrategy = _a.handleDeleteStrategy,
    handleViewStrategy = _a.handleViewStrategy;
  if (isLoading) {
    return (0, jsx_runtime_1.jsx)("div", {
      className:
        "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10 animate-pulse",
      children: [1, 2, 3, 4].map(function (_, index) {
        return (0, jsx_runtime_1.jsxs)(
          "div",
          {
            className: "strategy-card",
            children: [
              (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                className: "h-6 w-3/4 mb-2",
              }),
              (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                className: "h-4 w-1/4 mb-4",
              }),
              (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                className: "h-20 w-full mb-4",
              }),
              (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                className: "h-10 w-full",
              }),
            ],
          },
          index,
        );
      }),
    });
  }
  if (error) {
    var errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === "string"
          ? error
          : "An unknown error occurred";
    return (0, jsx_runtime_1.jsxs)("div", {
      className:
        "bg-secondary/40 backdrop-blur-md rounded-xl border border-border/50 p-4 sm:p-6 text-center mb-10 animate-fadeIn",
      children: [
        (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
          className:
            "h-12 w-12 text-destructive mx-auto mb-4 animate-pulse-slow",
        }),
        (0, jsx_runtime_1.jsx)("h3", {
          className: "text-xl font-bold mb-2",
          children: "Error Loading Strategies",
        }),
        (0, jsx_runtime_1.jsx)(alert_1.Alert, {
          variant: "destructive",
          className: "mb-6",
          children: (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, {
            children: errorMessage,
          }),
        }),
        (0, jsx_runtime_1.jsx)("p", {
          className: "text-muted-foreground mb-6",
          children:
            "We're having trouble loading your strategies. This could be due to a connection issue or database problem.",
        }),
        (0, jsx_runtime_1.jsxs)(button_1.Button, {
          onClick: function () {
            return refetch();
          },
          className: "min-w-[120px] animate-pulse-once button-glow",
          variant: "default",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
              className: "mr-2 h-4 w-4",
            }),
            "Retry",
          ],
        }),
      ],
    });
  }
  if (filteredAndSortedStrategies.length === 0) {
    if (searchQuery || riskFilter !== "all") {
      return (0, jsx_runtime_1.jsxs)("div", {
        className: "glassmorphism p-6 sm:p-8 text-center mb-10 animate-fadeIn",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.Search, {
            className: "h-12 w-12 text-muted-foreground mx-auto mb-4",
          }),
          (0, jsx_runtime_1.jsx)("h3", {
            className: "text-xl font-bold mb-2",
            children: "No Results Found",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-muted-foreground mb-6",
            children:
              "No strategies match your current filters. Try adjusting your search criteria.",
          }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            variant: "outline",
            onClick: function () {
              setSearchQuery("");
              setRiskFilter("all");
            },
            className: "hover-glow",
            children: "Clear Filters",
          }),
        ],
      });
    }
    return (0, jsx_runtime_1.jsx)("div", {
      className: "glassmorphism p-8 sm:p-10 text-center mb-10 animate-fadeIn",
      children: (0, jsx_runtime_1.jsxs)("div", {
        className: "flex flex-col items-center max-w-2xl mx-auto",
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            className: "bg-primary/10 rounded-full p-6 mb-6",
            children: (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
              className: "h-12 w-12 text-primary/70",
            }),
          }),
          (0, jsx_runtime_1.jsx)("h3", {
            className: "text-2xl font-bold mb-3 gradient-text",
            children: "Create Your First Strategy",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-muted-foreground mb-8 max-w-lg",
            children:
              "Develop strategic plans for your business with the help of our AI executive advisors. Get started by creating your first strategy.",
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            onClick: handleNewStrategy,
            variant: "gradient",
            size: "lg",
            className: "shadow-lg hover:shadow-primary/20",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
                className: "mr-2 h-5 w-5",
              }),
              "Create New Strategy",
            ],
          }),
        ],
      }),
    });
  }
  return (0, jsx_runtime_1.jsx)("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10",
    children: filteredAndSortedStrategies.map(function (strategy) {
      return (0, jsx_runtime_1.jsx)(
        StrategyCard_1.default,
        {
          strategy: strategy,
          onEdit: handleEditStrategy,
          onDelete: handleDeleteStrategy,
          onView: function () {
            return handleViewStrategy(strategy.id, strategy.title);
          },
        },
        strategy.id,
      );
    }),
  });
};
exports.default = StrategyContent;
