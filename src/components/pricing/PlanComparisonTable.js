"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var table_1 = require("@/components/ui/table");
var scroll_area_1 = require("@/components/ui/scroll-area");
var tooltip_1 = require("@/components/ui/tooltip");
var pricingData_1 = require("./pricingData");
var use_mobile_1 = require("@/hooks/use-mobile");
var badge_1 = require("@/components/ui/badge");
var PlanComparisonTable = function (_a) {
  var featureData = _a.featureData;
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobileView = ["xs", "mobile"].includes(breakpoint);
  if (isMobileView) {
    return (0, jsx_runtime_1.jsx)(MobilePlanComparison, {
      featureData: featureData,
    });
  }
  return (0, jsx_runtime_1.jsx)("div", {
    className: "mt-10 border rounded-lg overflow-hidden",
    children: (0, jsx_runtime_1.jsx)(scroll_area_1.ScrollArea, {
      className: "w-full",
      children: (0, jsx_runtime_1.jsx)("div", {
        className: "min-w-[800px]",
        children: (0, jsx_runtime_1.jsxs)(table_1.Table, {
          children: [
            (0, jsx_runtime_1.jsx)(table_1.TableHeader, {
              children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
                className: "bg-muted/50",
                children: [
                  (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                    className: "w-[280px]",
                    children: "Features",
                  }),
                  pricingData_1.pricingTiers.map(function (tier, index) {
                    return (0, jsx_runtime_1.jsxs)(
                      table_1.TableHead,
                      {
                        className: "text-center",
                        children: [
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "font-bold",
                            children: tier.title,
                          }),
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "text-2xl font-bold mt-2",
                            children: tier.price,
                          }),
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "text-muted-foreground text-xs mt-1",
                            children: "/month",
                          }),
                        ],
                      },
                      index,
                    );
                  }),
                ],
              }),
            }),
            (0, jsx_runtime_1.jsxs)(table_1.TableBody, {
              children: [
                featureData.map(function (category, categoryIndex) {
                  return (0, jsx_runtime_1.jsxs)(
                    react_1.default.Fragment,
                    {
                      children: [
                        (0, jsx_runtime_1.jsx)(table_1.TableRow, {
                          className: "bg-muted/30",
                          children: (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                            colSpan: 4,
                            className: "font-bold",
                            children: category.category,
                          }),
                        }),
                        category.features.map(function (feature, featureIndex) {
                          return (0, jsx_runtime_1.jsxs)(
                            table_1.TableRow,
                            {
                              children: [
                                (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                                  className: "py-4",
                                  children: (0, jsx_runtime_1.jsxs)("div", {
                                    className: "flex items-start gap-2",
                                    children: [
                                      (0, jsx_runtime_1.jsxs)("div", {
                                        children: [
                                          (0, jsx_runtime_1.jsx)("div", {
                                            className: "font-medium",
                                            children: feature.name,
                                          }),
                                          feature.description &&
                                            (0, jsx_runtime_1.jsx)("div", {
                                              className:
                                                "text-muted-foreground text-xs mt-1",
                                              children: feature.description,
                                            }),
                                        ],
                                      }),
                                      feature.description &&
                                        (0, jsx_runtime_1.jsx)(
                                          tooltip_1.TooltipProvider,
                                          {
                                            children: (0, jsx_runtime_1.jsxs)(
                                              tooltip_1.Tooltip,
                                              {
                                                children: [
                                                  (0, jsx_runtime_1.jsx)(
                                                    tooltip_1.TooltipTrigger,
                                                    {
                                                      asChild: true,
                                                      children: (0,
                                                      jsx_runtime_1.jsx)(
                                                        lucide_react_1.HelpCircle,
                                                        {
                                                          className:
                                                            "h-4 w-4 text-muted-foreground shrink-0 mt-1",
                                                        },
                                                      ),
                                                    },
                                                  ),
                                                  (0, jsx_runtime_1.jsx)(
                                                    tooltip_1.TooltipContent,
                                                    {
                                                      children: (0,
                                                      jsx_runtime_1.jsx)("p", {
                                                        className:
                                                          "max-w-[200px] text-xs",
                                                        children:
                                                          feature.description,
                                                      }),
                                                    },
                                                  ),
                                                ],
                                              },
                                            ),
                                          },
                                        ),
                                    ],
                                  }),
                                }),
                                (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                                  className: "text-center py-4",
                                  children: renderFeatureValue(feature.starter),
                                }),
                                (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                                  className: "text-center py-4 bg-primary/5",
                                  children: renderFeatureValue(feature.growth),
                                }),
                                (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                                  className: "text-center py-4",
                                  children: renderFeatureValue(
                                    feature.enterprise,
                                  ),
                                }),
                              ],
                            },
                            "".concat(categoryIndex, "-").concat(featureIndex),
                          );
                        }),
                      ],
                    },
                    categoryIndex,
                  );
                }),
                (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
                  children: [
                    (0, jsx_runtime_1.jsx)(table_1.TableCell, {}),
                    pricingData_1.pricingTiers.map(function (tier, index) {
                      return (0, jsx_runtime_1.jsx)(
                        table_1.TableCell,
                        {
                          className: "text-center p-4",
                          children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                            variant: tier.buttonVariant,
                            className: "w-full",
                            onClick: function () {
                              return handlePlanSelect(tier.priceId, tier.title);
                            },
                            children: tier.buttonText,
                          }),
                        },
                        index,
                      );
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
    }),
  });
};
var MobilePlanComparison = function (_a) {
  var featureData = _a.featureData;
  var selectedPlan = pricingData_1.pricingTiers[1]; // Default to Growth plan for mobile
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "mt-8 space-y-8",
    children: [
      (0, jsx_runtime_1.jsx)("div", {
        className: "flex justify-center space-x-2 mb-4",
        children: pricingData_1.pricingTiers.map(function (tier, index) {
          return (0, jsx_runtime_1.jsx)(
            badge_1.Badge,
            {
              variant:
                tier.title === selectedPlan.title ? "default" : "outline",
              className: "cursor-pointer px-3 py-1",
              children: tier.title,
            },
            index,
          );
        }),
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "border rounded-lg overflow-hidden",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "bg-muted/50 p-4 text-center border-b",
            children: [
              (0, jsx_runtime_1.jsx)("div", {
                className: "font-bold text-xl",
                children: selectedPlan.title,
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "text-2xl font-bold mt-2",
                children: [
                  selectedPlan.price,
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "text-sm font-normal",
                    children: "/month",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className: "text-muted-foreground text-sm mt-1",
                children: selectedPlan.description,
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "divide-y",
            children: featureData.map(function (category, categoryIndex) {
              return (0, jsx_runtime_1.jsxs)(
                "div",
                {
                  children: [
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "p-3 font-bold bg-muted/30",
                      children: category.category,
                    }),
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "divide-y",
                      children: category.features.map(
                        function (feature, featureIndex) {
                          var value = getPlanValue(
                            feature,
                            selectedPlan.title.toLowerCase(),
                          );
                          return (0, jsx_runtime_1.jsxs)(
                            "div",
                            {
                              className:
                                "p-3 flex justify-between items-center",
                              children: [
                                (0, jsx_runtime_1.jsxs)("div", {
                                  children: [
                                    (0, jsx_runtime_1.jsx)("div", {
                                      className: "font-medium",
                                      children: feature.name,
                                    }),
                                    feature.description &&
                                      (0, jsx_runtime_1.jsx)("div", {
                                        className:
                                          "text-muted-foreground text-xs mt-1",
                                        children: feature.description,
                                      }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)("div", {
                                  className: "ml-3",
                                  children: renderFeatureValue(value),
                                }),
                              ],
                            },
                            "".concat(categoryIndex, "-").concat(featureIndex),
                          );
                        },
                      ),
                    }),
                  ],
                },
                categoryIndex,
              );
            }),
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "p-4 border-t",
            children: (0, jsx_runtime_1.jsx)(button_1.Button, {
              variant: selectedPlan.buttonVariant,
              className: "w-full",
              onClick: function () {
                return handlePlanSelect(
                  selectedPlan.priceId,
                  selectedPlan.title,
                );
              },
              children: selectedPlan.buttonText,
            }),
          }),
        ],
      }),
    ],
  });
};
function renderFeatureValue(value) {
  if (typeof value === "boolean") {
    return value
      ? (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
          className: "mx-auto h-5 w-5 text-green-500",
        })
      : (0, jsx_runtime_1.jsx)(lucide_react_1.X, {
          className: "mx-auto h-5 w-5 text-muted-foreground",
        });
  }
  if (value === "Basic") {
    return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
      variant: "outline",
      className: "bg-blue-50",
      children: "Basic",
    });
  }
  if (value === "Advanced" || value === "Full access") {
    return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
      variant: "outline",
      className: "bg-green-50 border-green-200 text-green-700",
      children: "Advanced",
    });
  }
  if (
    value.includes("Enterprise") ||
    value.includes("Custom") ||
    value === "Full access" ||
    value === "All channels" ||
    value.includes("24/7")
  ) {
    return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
      className: "bg-purple-100 text-purple-800 hover:bg-purple-100",
      children: value,
    });
  }
  if (value.includes("Limited")) {
    return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
      variant: "outline",
      className: "bg-amber-50 border-amber-200 text-amber-700",
      children: value,
    });
  }
  return (0, jsx_runtime_1.jsx)("span", {
    className: "text-sm",
    children: value,
  });
}
function getPlanValue(feature, planName) {
  return feature[planName];
}
function handlePlanSelect(priceId, planName) {
  if (!priceId) {
    // For Enterprise plan
    window.location.href = "/signup";
    return;
  }
  // For plans with priceId
  // You would trigger the Stripe checkout here
  console.log(
    "Selected plan: ".concat(planName, " with priceId: ").concat(priceId),
  );
}
exports.default = PlanComparisonTable;
