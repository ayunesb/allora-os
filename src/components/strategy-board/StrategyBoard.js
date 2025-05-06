"use strict";
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StrategyBoard;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var useStrategies_1 = require("@/hooks/useStrategies");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var input_1 = require("@/components/ui/input");
var select_1 = require("@/components/ui/select");
var StrategyGrid_1 = require("./StrategyGrid");
var react_router_dom_1 = require("react-router-dom");
var sonner_1 = require("sonner");
var dialog_1 = require("@/components/ui/dialog");
var skeleton_1 = require("@/components/ui/skeleton");
function StrategyBoard() {
  var navigate = (0, react_router_dom_1.useNavigate)();
  var _a = (0, useStrategies_1.useStrategies)(),
    strategies = _a.strategies,
    isLoading = _a.isLoading,
    error = _a.error,
    refetch = _a.refetch;
  var _b = (0, react_1.useState)(""),
    searchQuery = _b[0],
    setSearchQuery = _b[1];
  var _c = (0, react_1.useState)("all"),
    riskFilter = _c[0],
    setRiskFilter = _c[1];
  var _d = (0, react_1.useState)("newest"),
    sortOrder = _d[0],
    setSortOrder = _d[1];
  var _e = (0, react_1.useState)(false),
    showStrategyDialog = _e[0],
    setShowStrategyDialog = _e[1];
  var _f = (0, react_1.useState)(null),
    selectedStrategy = _f[0],
    setSelectedStrategy = _f[1];
  // Filter and sort strategies
  var filteredAndSortedStrategies = react_1.default.useMemo(
    function () {
      var filtered = strategies;
      // Apply search filter
      if (searchQuery) {
        var query_1 = searchQuery.toLowerCase();
        filtered = filtered.filter(function (strategy) {
          return (
            strategy.title.toLowerCase().includes(query_1) ||
            (strategy.description &&
              strategy.description.toLowerCase().includes(query_1))
          );
        });
      }
      // Apply risk filter
      if (riskFilter !== "all") {
        filtered = filtered.filter(function (strategy) {
          // Get risk level from any of the available properties
          var riskValue = strategy.risk || strategy.risk_level || "Medium";
          return riskValue.toLowerCase() === riskFilter.toLowerCase();
        });
      }
      // Apply sorting
      return __spreadArray([], filtered, true).sort(function (a, b) {
        if (sortOrder === "newest") {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        } else if (sortOrder === "oldest") {
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        } else if (sortOrder === "riskHigh") {
          var riskA = a.risk || a.risk_level || "Medium";
          var riskB = b.risk || b.risk_level || "Medium";
          var riskOrder = { High: 3, Medium: 2, Low: 1 };
          return riskOrder[riskB] - riskOrder[riskA];
        } else if (sortOrder === "riskLow") {
          var riskA = a.risk || a.risk_level || "Medium";
          var riskB = b.risk || b.risk_level || "Medium";
          var riskOrder = { High: 3, Medium: 2, Low: 1 };
          return riskOrder[riskA] - riskOrder[riskB];
        }
        return 0;
      });
    },
    [strategies, searchQuery, riskFilter, sortOrder],
  );
  var handleNewStrategy = function () {
    navigate("/dashboard/strategies/new");
  };
  var handleViewStrategy = function (strategy) {
    setSelectedStrategy(strategy);
    setShowStrategyDialog(true);
  };
  var handleDebate = function (strategy) {
    navigate(
      "/dashboard/debate?strategyId="
        .concat(strategy.id, "&title=")
        .concat(encodeURIComponent(strategy.title)),
    );
  };
  var handleExport = function (strategy) {
    sonner_1.toast.success("Strategy exported to PDF", {
      description: '"'.concat(strategy.title, '" has been exported.'),
    });
  };
  if (error) {
    return (0, jsx_runtime_1.jsxs)("div", {
      className: "flex flex-col items-center justify-center p-8 text-center",
      children: [
        (0, jsx_runtime_1.jsx)("div", {
          className: "text-destructive mb-4",
          children: (0, jsx_runtime_1.jsx)("svg", {
            className: "h-10 w-10 mx-auto",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            children: (0, jsx_runtime_1.jsx)("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
            }),
          }),
        }),
        (0, jsx_runtime_1.jsx)("h3", {
          className: "text-xl font-bold mb-2",
          children: "Error Loading Strategies",
        }),
        (0, jsx_runtime_1.jsx)("p", {
          className: "text-muted-foreground mb-4",
          children: "We encountered a problem loading your strategies.",
        }),
        (0, jsx_runtime_1.jsxs)(button_1.Button, {
          onClick: refetch,
          variant: "outline",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
              className: "mr-2 h-4 w-4",
            }),
            "Try Again",
          ],
        }),
      ],
    });
  }
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex flex-col sm:flex-row justify-between gap-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex flex-col sm:flex-row gap-3 w-full sm:w-auto",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "relative w-full sm:w-80",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Search, {
                    className:
                      "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground",
                  }),
                  (0, jsx_runtime_1.jsx)(input_1.Input, {
                    placeholder: "Search strategies...",
                    className: "pl-9",
                    value: searchQuery,
                    onChange: function (e) {
                      return setSearchQuery(e.target.value);
                    },
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex gap-3",
                children: [
                  (0, jsx_runtime_1.jsxs)(select_1.Select, {
                    value: riskFilter,
                    onValueChange: setRiskFilter,
                    children: [
                      (0, jsx_runtime_1.jsxs)(select_1.SelectTrigger, {
                        className: "w-full sm:w-36",
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.Filter, {
                            className: "mr-2 h-4 w-4",
                          }),
                          (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                            placeholder: "Filter",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                        children: [
                          (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                            value: "all",
                            children: "All Risks",
                          }),
                          (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                            value: "low",
                            children: "Low Risk",
                          }),
                          (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                            value: "medium",
                            children: "Medium Risk",
                          }),
                          (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                            value: "high",
                            children: "High Risk",
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)(select_1.Select, {
                    value: sortOrder,
                    onValueChange: setSortOrder,
                    children: [
                      (0, jsx_runtime_1.jsxs)(select_1.SelectTrigger, {
                        className: "w-full sm:w-36",
                        children: [
                          (0, jsx_runtime_1.jsx)(
                            lucide_react_1.ArrowDownWideNarrow,
                            { className: "mr-2 h-4 w-4" },
                          ),
                          (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                            placeholder: "Sort",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                        children: [
                          (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                            value: "newest",
                            children: "Newest First",
                          }),
                          (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                            value: "oldest",
                            children: "Oldest First",
                          }),
                          (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                            value: "riskHigh",
                            children: "Highest Risk",
                          }),
                          (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                            value: "riskLow",
                            children: "Lowest Risk",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            onClick: handleNewStrategy,
            className: "shrink-0",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
                className: "mr-2 h-4 w-4",
              }),
              "New Strategy",
            ],
          }),
        ],
      }),
      isLoading
        ? (0, jsx_runtime_1.jsx)("div", {
            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
            children: Array.from({ length: 6 }).map(function (_, i) {
              return (0, jsx_runtime_1.jsx)(
                skeleton_1.Skeleton,
                { className: "h-64 w-full" },
                i,
              );
            }),
          })
        : filteredAndSortedStrategies.length === 0
          ? (0, jsx_runtime_1.jsxs)("div", {
              className:
                "bg-muted/30 border border-border rounded-lg p-8 text-center",
              children: [
                (0, jsx_runtime_1.jsx)("h3", {
                  className: "text-xl font-bold mb-2",
                  children: "No strategies found",
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-muted-foreground mb-4",
                  children:
                    searchQuery || riskFilter !== "all"
                      ? "No strategies match your search criteria. Try adjusting your filters."
                      : "Get started by creating your first business strategy.",
                }),
                searchQuery || riskFilter !== "all"
                  ? (0, jsx_runtime_1.jsx)(button_1.Button, {
                      variant: "outline",
                      onClick: function () {
                        setSearchQuery("");
                        setRiskFilter("all");
                      },
                      children: "Clear Filters",
                    })
                  : (0, jsx_runtime_1.jsxs)(button_1.Button, {
                      onClick: handleNewStrategy,
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
                          className: "mr-2 h-4 w-4",
                        }),
                        "Create Strategy",
                      ],
                    }),
              ],
            })
          : (0, jsx_runtime_1.jsx)(StrategyGrid_1.default, {
              strategies: filteredAndSortedStrategies,
              onDebate: handleDebate,
              onExport: handleExport,
              onViewStrategy: handleViewStrategy,
            }),
      selectedStrategy &&
        (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
          open: showStrategyDialog,
          onOpenChange: setShowStrategyDialog,
          children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
            className: "max-w-3xl",
            children: [
              (0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, {
                children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, {
                  children: selectedStrategy.title,
                }),
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-4",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    children: [
                      (0, jsx_runtime_1.jsx)("h4", {
                        className: "font-medium text-sm",
                        children: "Description",
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "text-muted-foreground mt-1",
                        children: selectedStrategy.description,
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex flex-wrap gap-4",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        children: [
                          (0, jsx_runtime_1.jsx)("h4", {
                            className: "font-medium text-sm",
                            children: "Risk Level",
                          }),
                          (0, jsx_runtime_1.jsx)("p", {
                            className: "text-muted-foreground mt-1",
                            children:
                              selectedStrategy.risk ||
                              selectedStrategy.risk_level ||
                              "Medium",
                          }),
                        ],
                      }),
                      selectedStrategy.timeframe &&
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("h4", {
                              className: "font-medium text-sm",
                              children: "Timeframe",
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-muted-foreground mt-1",
                              children: selectedStrategy.timeframe,
                            }),
                          ],
                        }),
                      selectedStrategy.impact &&
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("h4", {
                              className: "font-medium text-sm",
                              children: "Expected Impact",
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-muted-foreground mt-1",
                              children: selectedStrategy.impact,
                            }),
                          ],
                        }),
                      selectedStrategy.executiveBot &&
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("h4", {
                              className: "font-medium text-sm",
                              children: "Proposed By",
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-muted-foreground mt-1",
                              children: selectedStrategy.executiveBot,
                            }),
                          ],
                        }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex justify-between mt-6",
                    children: [
                      (0, jsx_runtime_1.jsx)(button_1.Button, {
                        variant: "outline",
                        onClick: function () {
                          return setShowStrategyDialog(false);
                        },
                        children: "Close",
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex gap-2",
                        children: [
                          (0, jsx_runtime_1.jsx)(button_1.Button, {
                            variant: "secondary",
                            onClick: function () {
                              return handleDebate(selectedStrategy);
                            },
                            children: "Discuss in AI Boardroom",
                          }),
                          (0, jsx_runtime_1.jsx)(button_1.Button, {
                            onClick: function () {
                              return handleExport(selectedStrategy);
                            },
                            children: "Export Strategy",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
    ],
  });
}
