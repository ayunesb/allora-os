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
exports.default = Pricing;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var Navbar_1 = require("@/components/Navbar");
var use_mobile_1 = require("@/hooks/use-mobile");
var PricingTier_1 = require("@/components/pricing/PricingTier");
var PricingHeader_1 = require("@/components/pricing/PricingHeader");
var FAQSection_1 = require("@/components/pricing/FAQSection");
var PlanComparisonTable_1 = require("@/components/pricing/PlanComparisonTable");
var pricingData_1 = require("@/components/pricing/pricingData");
var tabs_1 = require("@/components/ui/tabs");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
function Pricing() {
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobileView = ["xs", "mobile"].includes(breakpoint);
  var isTablet = breakpoint === "tablet";
  var _a = (0, react_1.useState)(false),
    showComparison = _a[0],
    setShowComparison = _a[1];
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "min-h-screen flex flex-col",
    children: [
      (0, jsx_runtime_1.jsx)(Navbar_1.default, {}),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex-1 container mx-auto px-4 py-8 md:py-16",
        children: [
          (0, jsx_runtime_1.jsx)(PricingHeader_1.default, {
            title: "Choose Your Executive Plan",
            description:
              "Scale your business with AI-powered strategies and tools. All plans include a 14-day money-back guarantee.",
          }),
          (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
            defaultValue: "plans",
            className: "max-w-6xl mx-auto",
            children: [
              (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                className: "grid w-full max-w-md mx-auto grid-cols-2 mb-8",
                children: [
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "plans",
                    children: "Plans",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "compare",
                    children: "Compare Features",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, {
                value: "plans",
                className: "mt-0",
                children: [
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "grid gap-4 sm:gap-8 max-w-6xl mx-auto ".concat(
                      isMobileView
                        ? "grid-cols-1"
                        : isTablet
                          ? "grid-cols-2"
                          : "md:grid-cols-3",
                    ),
                    children: pricingData_1.pricingTiers.map(
                      function (tier, i) {
                        return (0, jsx_runtime_1.jsx)(
                          PricingTier_1.default,
                          __assign({}, tier),
                          i,
                        );
                      },
                    ),
                  }),
                  !isMobileView &&
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "text-center mt-8",
                      children: [
                        (0, jsx_runtime_1.jsxs)(button_1.Button, {
                          variant: "outline",
                          onClick: function () {
                            return setShowComparison(!showComparison);
                          },
                          className: "group",
                          children: [
                            showComparison
                              ? "Hide Detailed Comparison"
                              : "Show Detailed Comparison",
                            showComparison
                              ? (0, jsx_runtime_1.jsx)(
                                  lucide_react_1.ChevronUp,
                                  {
                                    className:
                                      "ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform",
                                  },
                                )
                              : (0, jsx_runtime_1.jsx)(
                                  lucide_react_1.ChevronDown,
                                  {
                                    className:
                                      "ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform",
                                  },
                                ),
                          ],
                        }),
                        showComparison &&
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "mt-6 animate-fade-in",
                            children: (0, jsx_runtime_1.jsx)(
                              PlanComparisonTable_1.default,
                              { featureData: pricingData_1.featureComparison },
                            ),
                          }),
                      ],
                    }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "compare",
                className: "mt-0",
                children: (0, jsx_runtime_1.jsx)(
                  PlanComparisonTable_1.default,
                  { featureData: pricingData_1.featureComparison },
                ),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(FAQSection_1.default, {
            title: "Frequently Asked Questions",
            items: pricingData_1.faqItems,
          }),
        ],
      }),
    ],
  });
}
