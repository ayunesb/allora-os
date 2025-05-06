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
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
var CaseStudy = function (_a) {
  var title = _a.title,
    industry = _a.industry,
    challenge = _a.challenge,
    solution = _a.solution,
    results = _a.results;
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "h-full flex flex-col",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            className: "flex justify-between items-start mb-2",
            children: (0, jsx_runtime_1.jsx)(badge_1.Badge, {
              variant: "outline",
              className:
                "px-2 py-0.5 bg-primary/10 text-primary font-normal text-xs",
              children: industry,
            }),
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            className: "text-xl",
            children: title,
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className: "flex-1 flex flex-col",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-4 flex-1",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                children: [
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm font-medium text-muted-foreground",
                    children: "Challenge:",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm",
                    children: challenge,
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                children: [
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm font-medium text-muted-foreground",
                    children: "Solution:",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm",
                    children: solution,
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "mt-6 pt-4 border-t",
            children: [
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-sm font-medium mb-3",
                children: "Results:",
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className: "grid grid-cols-2 gap-3",
                children: results.map(function (result, index) {
                  return (0, jsx_runtime_1.jsxs)(
                    "div",
                    {
                      className: "flex items-center space-x-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(result.icon, {
                          className: "h-4 w-4 text-primary",
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-sm font-medium",
                              children: result.value,
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-xs text-muted-foreground",
                              children: result.label,
                            }),
                          ],
                        }),
                      ],
                    },
                    index,
                  );
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
var OutcomeShowcase = function () {
  var caseStudies = [
    {
      title: "SaaS Startup Accelerated Growth",
      industry: "Software",
      challenge:
        "Early-stage SaaS startup struggling with low conversion rates and unclear market positioning.",
      solution:
        "AI executive team identified ideal customer profile and created targeted marketing strategy with optimized pricing model.",
      results: [
        {
          icon: lucide_react_1.TrendingUp,
          label: "Revenue Growth",
          value: "+156%",
        },
        {
          icon: lucide_react_1.BarChart3,
          label: "Conversion Rate",
          value: "+43%",
        },
        { icon: lucide_react_1.Clock, label: "Time to Market", value: "-65%" },
        {
          icon: lucide_react_1.Zap,
          label: "Customer Acq. Cost",
          value: "-38%",
        },
      ],
    },
    {
      title: "Retail Brand Expansion",
      industry: "E-commerce",
      challenge:
        "Mid-market retailer facing increasing competition and plateauing growth in primary market.",
      solution:
        "AI identified new market segments and created targeted expansion strategy with optimized logistics plan.",
      results: [
        {
          icon: lucide_react_1.TrendingUp,
          label: "Market Share",
          value: "+12%",
        },
        { icon: lucide_react_1.BarChart3, label: "New Markets", value: "3" },
        {
          icon: lucide_react_1.Clock,
          label: "Strategy Dev. Time",
          value: "5 days",
        },
        { icon: lucide_react_1.Zap, label: "Implementation", value: "8 weeks" },
      ],
    },
    {
      title: "Professional Services Transformation",
      industry: "Consulting",
      challenge:
        "Established consulting firm facing declining margins and difficulty adapting to changing client needs.",
      solution:
        "AI executive debate resulted in strategic pivot to specialized service offerings with value-based pricing.",
      results: [
        {
          icon: lucide_react_1.TrendingUp,
          label: "Profit Margin",
          value: "+22%",
        },
        {
          icon: lucide_react_1.BarChart3,
          label: "Client Retention",
          value: "95%",
        },
        { icon: lucide_react_1.Clock, label: "Decision Time", value: "-78%" },
        { icon: lucide_react_1.Zap, label: "Team Utilization", value: "+31%" },
      ],
    },
  ];
  return (0, jsx_runtime_1.jsx)("div", {
    className: "bg-gradient-to-b from-background to-primary/5 py-12 md:py-16",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "container mx-auto px-4",
      children: [
        (0, jsx_runtime_1.jsxs)("div", {
          className: "text-center mb-10",
          children: [
            (0, jsx_runtime_1.jsx)("h2", {
              className: "text-3xl md:text-4xl font-bold mb-4",
              children: "Real Results, Real Businesses",
            }),
            (0, jsx_runtime_1.jsx)("p", {
              className: "text-muted-foreground max-w-2xl mx-auto",
              children:
                "See how businesses like yours achieved measurable growth with Allora AI's executive advisory platform.",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)("div", {
          className: "grid grid-cols-1 md:grid-cols-3 gap-6",
          children: caseStudies.map(function (study, index) {
            return (0, jsx_runtime_1.jsx)(
              CaseStudy,
              __assign({}, study),
              index,
            );
          }),
        }),
      ],
    }),
  });
};
exports.default = OutcomeShowcase;
